'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { fetchManuscript, Chapter, Part, ManuscriptVersion } from '../../../lib/manuscript';
import { VersionSwitch } from '../../components/VersionSwitch';

function FullTextContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const editionParam = searchParams.get('edition');

    const [chapters, setChapters] = useState<Chapter[]>([]);
    const [parts, setParts] = useState<Part[]>([]);
    const [draftVersion, setDraftVersion] = useState<string | undefined>();
    const [isLoading, setIsLoading] = useState(true);
    const [version, setVersion] = useState<ManuscriptVersion>(editionParam === '13plus' ? '13plus' : 'youngadult');
    const [notification, setNotification] = useState<string | null>(null);
    const [speakingId, setSpeakingId] = useState<number | null>(null);

    const prevChaptersRef = useRef<Chapter[]>([]);

    const toggleSpeech = React.useCallback((id: number, text: string) => {
        if (typeof window === 'undefined') return;

        if (!window.speechSynthesis) {
            alert("Your browser does not support Text-to-Speech playback. Please try a modern browser like Chrome or Safari.");
            return;
        }

        if (speakingId === id) {
            window.speechSynthesis.cancel();
            setSpeakingId(null);
            return;
        }

        window.speechSynthesis.cancel();

        // Simple markdown stripping for better TTS
        const plainText = text
            .replace(/[#*_~`\[\]()]/g, '') // remove symbols
            .replace(/>\s+/g, '')          // remove blockquotes
            .replace(/\n+/g, ' ');         // collapse newlines

        // Chunking for long text (browsers have limits per utterance)
        const chunks: string[] = [];
        const maxChunkLen = 3000;

        if (plainText.length > maxChunkLen) {
            let currentPath = plainText;
            while (currentPath.length > 0) {
                if (currentPath.length <= maxChunkLen) {
                    chunks.push(currentPath);
                    break;
                }

                let breakIdx = currentPath.lastIndexOf('.', maxChunkLen);
                if (breakIdx === -1 || breakIdx < maxChunkLen * 0.5) {
                    breakIdx = currentPath.lastIndexOf(' ', maxChunkLen);
                }

                if (breakIdx === -1) breakIdx = maxChunkLen;

                chunks.push(currentPath.substring(0, breakIdx + 1));
                currentPath = currentPath.substring(breakIdx + 1).trim();
            }
        } else {
            chunks.push(plainText);
        }

        let currentChunk = 0;

        const speakNextChunk = () => {
            if (currentChunk >= chunks.length) {
                setSpeakingId(null);
                return;
            }

            const utterance = new SpeechSynthesisUtterance(chunks[currentChunk]);

            utterance.onstart = () => {
                if (currentChunk === 0) setSpeakingId(id);
            };

            utterance.onend = () => {
                currentChunk++;
                speakNextChunk();
            };

            utterance.onerror = (event) => {
                console.error("SpeechSynthesis error details:", {
                    error: event.error,
                    message: (event as any).message,
                    event: event
                });

                if (event.error !== 'interrupted' && event.error !== 'canceled') {
                    setSpeakingId(null);

                    const errorType = event.error || (event as any).message || "Unknown Code";

                    if (event.error === 'not-allowed') {
                        alert("Playback blocked: Please ensure your device is not in 'Silent Mode' and that you have interacted with the page recently.");
                    } else if (event.error === 'network') {
                        alert("Speech failed: This voice requires an internet connection which was lost.");
                    } else {
                        alert(`Speech playback failed (${errorType}). Note: Some mobile browsers require the screen to stay on.`);
                    }
                }
            };

            utterance.rate = 1.0;
            utterance.pitch = 1.0;
            utterance.volume = 1.0;

            if (window.speechSynthesis.paused) {
                window.speechSynthesis.resume();
            }

            window.speechSynthesis.speak(utterance);
        };

        try {
            // Small delay to ensure cancel() has finished clearing the queue
            setTimeout(() => {
                speakNextChunk();
            }, 100);
        } catch (err) {
            console.error("Speech initiation failed:", err);
            alert("Failed to initialize speech engines.");
            setSpeakingId(null);
        }
    }, [speakingId]);

    useEffect(() => {
        const handleRequest = (e: Event) => {
            const ce = e as CustomEvent;
            const targetId = ce.detail?.chapterId;
            if (speakingId) {
                window.speechSynthesis.cancel();
                setSpeakingId(null);
            } else if (targetId) {
                const ch = chapters.find(c => c.id === targetId);
                if (ch) toggleSpeech(ch.id, ch.content);
            }
        };
        window.addEventListener('ff-request-tts', handleRequest);
        return () => window.removeEventListener('ff-request-tts', handleRequest);
    }, [speakingId, chapters, toggleSpeech]);

    useEffect(() => {
        window.dispatchEvent(new CustomEvent('ff-tts-status', { detail: { speakingId } }));
    }, [speakingId]);

    const handleVersionChange = (newVersion: ManuscriptVersion) => {
        setVersion(newVersion);
        const params = new URLSearchParams(window.location.search);
        if (newVersion === 'youngadult') {
            params.set('edition', 'youngadult');
        } else {
            params.delete('edition');
        }
        router.replace(`${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`, { scroll: false });
    };

    useEffect(() => {
        setIsLoading(true);
        const loadManuscript = (forceRemote = false) => {
            fetchManuscript(version, forceRemote).then(data => {
                if (data.chapters.length > 0) {
                    if (forceRemote && data.draftVersion !== draftVersion && draftVersion !== undefined) {
                        const versionInfo = data.updatedDate ? `v${data.draftVersion} (${data.updatedDate})` : `v${data.draftVersion}`;
                        setNotification(`Archive Updated: ${versionInfo}`);
                        setTimeout(() => setNotification(null), 10000);
                    }
                    setChapters(data.chapters);
                    setParts(data.parts);
                    setDraftVersion(data.draftVersion);
                    prevChaptersRef.current = data.chapters;
                }
                setIsLoading(false);

                // Handle hash-based scrolling after data loads (only on first load)
                if (!forceRemote && window.location.hash) {
                    setTimeout(() => {
                        const id = window.location.hash.replace('#', '');
                        const element = document.getElementById(id);
                        if (element) {
                            element.scrollIntoView({ behavior: 'smooth' });
                        }
                    }, 100);
                }
            });
        };

        // 1. Load local version immediately for speed
        loadManuscript(false);

        // 2. Check for remote updates immediately after
        const remoteCheckTimeout = setTimeout(() => loadManuscript(true), 2000);

        // 3. Polling: attempt to refresh from GitHub once per 60 seconds
        const intervalId = setInterval(() => loadManuscript(true), 60000);

        return () => {
            clearTimeout(remoteCheckTimeout);
            clearInterval(intervalId);
        };
    }, [version]);

    // Track scroll position to save last read chapter
    useEffect(() => {
        if (isLoading || chapters.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const id = entry.target.id;
                        if (id.startsWith('chapter-')) {
                            localStorage.setItem('ff-last-read-chapter', id);
                            localStorage.setItem('ff-last-read-edition', version);
                        }
                    }
                });
            },
            { threshold: 0.1, rootMargin: '-10% 0px -80% 0px' }
        );

        const chapterElements = document.querySelectorAll('section[id^="chapter-"]');
        chapterElements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, [isLoading, chapters, version]);

    return (
        <div className="container mx-auto px-6 lg:px-12 py-12 relative">
            {/* Content Refresh Notification */}
            {notification && (
                <div className="fixed top-28 right-8 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="bg-cyan-500 text-black px-6 py-3 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.5)] font-bold text-xs uppercase tracking-widest flex items-center gap-3">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-black"></span>
                        </span>
                        {notification}
                        <button onClick={() => setNotification(null)} className="hover:opacity-60 transition-opacity">✕</button>
                    </div>
                </div>
            )}

            <header className="mb-16 text-center lg:text-left lg:pl-[25%] relative">

                <h1 className="text-6xl font-black mb-4 tracking-tighter text-glow">FORGOTTEN FUTURE</h1>
                <h2 className="text-xl text-cyan-400 uppercase tracking-[0.3em]">The Full Manuscript Draft</h2>
                {draftVersion && (
                    <span className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] border border-white/5 bg-white/5 px-3 py-1 rounded">
                        Draft: v{draftVersion}
                    </span>
                )}
                <div className="mt-6 flex flex-wrap gap-4 no-print">
                    <button
                        onClick={() => {
                            const fullText = chapters.map(c => `Chapter ${c.id}: ${c.title}. ${c.content}`).join(' ');
                            toggleSpeech(999, fullText);
                        }}
                        className={`flex items-center gap-3 px-6 py-2 rounded-full border text-[10px] font-bold uppercase tracking-[0.2em] transition-all ${speakingId === 999
                            ? 'bg-cyan-500 text-black border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.5)]'
                            : 'bg-white/5 text-cyan-400 border-white/10 hover:bg-white/10'
                            }`}
                    >
                        {speakingId === 999 ? (
                            <>
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-black"></span>
                                </span>
                                Stop Full Audio
                            </>
                        ) : (
                            <>
                                <span>▶</span> Listen to Full Manuscript (BETA)
                            </>
                        )}
                    </button>
                </div>
                <div className="mt-4 p-4 border border-cyan-500/20 bg-cyan-500/5 rounded text-xs text-zinc-400 uppercase tracking-widest leading-relaxed max-w-3xl">
                    Note: This draft covers the <strong className="text-cyan-400 font-bold">{version === '13plus' ? '13+ Core Edition' : 'Young Adult Edition'}</strong>.
                    Optimized for Text-to-Speech
                </div>

            </header>

            <div className="flex flex-col lg:flex-row gap-12 relative">
                {/* Navigation Sidebar */}
                <aside className="lg:w-1/4 no-print order-1 lg:order-1">
                    <div className="glass-panel sticky top-36 max-h-[70vh] overflow-y-auto custom-scrollbar p-6">
                        <Link href={`/manuscript${version === 'youngadult' ? '' : '?edition=13plus'}`} className="text-cyan-500/60 hover:text-cyan-400 font-bold uppercase tracking-widest text-[10px] flex items-center gap-2 mb-2 border-b border-white/5 transition-colors">
                            ← Back to List
                        </Link>

                        <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-2">
                            <h2 className="text-[10px] font-bold text-cyan-500 uppercase tracking-[0.2em]">
                                Navigation
                            </h2>
                            <div className="scale-75 origin-right mr-2">
                                <VersionSwitch version={version} onVersionChange={handleVersionChange} />
                            </div>
                        </div>

                        <div className="space-y-8">
                            {/* SIDEBAR_START (dynamic) */}
                            <div>
                                <div className="space-y-6">
                                    {parts.map((section, idx) => (
                                        <div key={idx}>
                                            <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3">
                                                {section.title}
                                            </h3>
                                            <ul className="space-y-2 border-l border-white/5 pl-4">
                                                {section.chapters.map((c) => (
                                                    <li key={c.id}>
                                                        <a href={`#chapter-${c.id}`} className="text-[10px] text-zinc-400 hover:text-cyan-400 transition-colors block py-0.5 leading-tight uppercase tracking-tighter">
                                                            {c.id}. {c.title}
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* SIDEBAR_END */}
                        </div>
                    </div>
                </aside>

                <article className="lg:w-3/4 space-y-24 pb-[100vh] order-2 lg:order-2">
                    {/* ARTICLE_START */}
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-24 text-zinc-500 uppercase tracking-widest text-xs">
                            <div className="mb-4 animate-pulse">Decrypting Aether-Logs...</div>
                        </div>
                    ) : chapters.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-24 text-zinc-500 uppercase tracking-widest text-xs">
                            <div className="mb-4 text-red-500/50">Link Severed: Records Inaccessible</div>
                            <button
                                onClick={() => window.location.reload()}
                                className="text-cyan-500 hover:text-cyan-400 underline underline-offset-4"
                            >
                                Re-establish Connection
                            </button>
                        </div>
                    ) : (
                        parts.length > 0 ? (
                            parts.map((part, pIdx) => (
                                <div key={pIdx} className="space-y-24">
                                    <header className="border-y border-white/5 py-12 mb-16 text-center">
                                        <h2 className="text-4xl font-black tracking-widest text-white uppercase mb-4">{part.title}</h2>
                                    </header>

                                    {part.chapters.map((chapter) => (
                                        <section
                                            key={chapter.id}
                                            id={`chapter-${chapter.id}`}
                                            className="prose prose-invert max-w-none scroll-mt-32"
                                        >
                                            <div className="flex items-center justify-between mb-8 group">
                                                <h3 className="text-3xl font-bold text-white flex items-center gap-4 m-0">
                                                    <span className="text-cyan-500 text-sm font-mono uppercase tracking-widest">
                                                        Chapter {chapter.id}
                                                    </span>
                                                    {chapter.title}
                                                </h3>
                                                <button
                                                    onClick={() => toggleSpeech(chapter.id, chapter.content)}
                                                    className={`no-print flex items-center gap-2 px-4 py-2 rounded-full border text-[10px] font-bold uppercase tracking-widest transition-all ${speakingId === chapter.id
                                                        ? 'bg-cyan-500 text-black border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.5)]'
                                                        : 'bg-transparent text-cyan-500 border-cyan-500/30 hover:bg-cyan-500/10'
                                                        }`}
                                                >
                                                    {speakingId === chapter.id ? (
                                                        <>
                                                            <span className="relative flex h-2 w-2">
                                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75"></span>
                                                                <span className="relative inline-flex rounded-full h-2 w-2 bg-black"></span>
                                                            </span>
                                                            Stop Listening
                                                        </>
                                                    ) : (
                                                        <>
                                                            <span>▶</span> Listen
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                            <div className="text-zinc-300 leading-[2] text-lg space-y-6">
                                                <ReactMarkdown>{chapter.content}</ReactMarkdown>
                                            </div>
                                        </section>
                                    ))}
                                </div>
                            ))
                        ) : (
                            chapters.map((chapter) => (
                                <section
                                    key={chapter.id}
                                    id={`chapter-${chapter.id}`}
                                    className="prose prose-invert max-w-none scroll-mt-32"
                                >
                                    <div className="flex items-center justify-between mb-8 group">
                                        <h3 className="text-3xl font-bold text-white flex items-center gap-4 m-0">
                                            <span className="text-cyan-500 text-sm font-mono uppercase tracking-widest">
                                                Chapter {chapter.id}
                                            </span>
                                            {chapter.title}
                                        </h3>
                                        <button
                                            onClick={() => toggleSpeech(chapter.id, chapter.content)}
                                            className={`no-print flex items-center gap-2 px-4 py-2 rounded-full border text-[10px] font-bold uppercase tracking-widest transition-all ${speakingId === chapter.id
                                                ? 'bg-cyan-500 text-black border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.5)]'
                                                : 'bg-transparent text-cyan-500 border-cyan-500/30 hover:bg-cyan-500/10'
                                                }`}
                                        >
                                            {speakingId === chapter.id ? (
                                                <>
                                                    <span className="relative flex h-2 w-2">
                                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75"></span>
                                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-black"></span>
                                                    </span>
                                                    Stop Listening
                                                </>
                                            ) : (
                                                <>
                                                    <span>▶</span> Listen
                                                </>
                                            )}
                                        </button>
                                    </div>
                                    <div className="text-zinc-300 leading-[2] text-lg space-y-6">
                                        <ReactMarkdown>{chapter.content}</ReactMarkdown>
                                    </div>
                                </section>
                            ))
                        )
                    )}
                    {/* ARTICLE_END */}
                </article>
            </div>

            <footer className="border-t border-white/10 py-12 text-center">
                <p className="text-zinc-500 text-sm italic mb-4">
                    End of First Edition Manuscript. The Aether-Drive reaches its limit of recall.
                </p>
                <p className="text-[10px] text-zinc-600 uppercase tracking-widest">
                    Protocol: Full Sync | Archive ID: FF-MAN-MAX
                </p>
            </footer>
        </div>
    );
}

export default function FullTextManuscript() {
    return (
        <Suspense fallback={
            <div className="container mx-auto px-6 py-24 text-center text-zinc-500 uppercase tracking-widest text-xs">
                Syncing with Archive...
            </div>
        }>
            <FullTextContent />
        </Suspense>
    );
}

