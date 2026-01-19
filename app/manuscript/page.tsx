'use client';

import React, { useState, useRef, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { fetchManuscript, fetchRemoteManuscript, Chapter, Part, ManuscriptVersion } from '../../lib/manuscript';

function ManuscriptContent() {
    const searchParams = useSearchParams();
    const editionParam = searchParams.get('edition');

    const scrollContainerRef = useRef<HTMLDivElement | null>(null);
    const router = useRouter();

    const [chapters, setChapters] = useState<Chapter[]>([]);
    const [parts, setParts] = useState<Part[]>([]);
    const [draftVersion, setDraftVersion] = useState<string | undefined>();
    const [isLoading, setIsLoading] = useState(true);
    const [version, setVersion] = useState<ManuscriptVersion>(editionParam === '13plus' ? '13plus' : 'youngadult');
    const [notification, setNotification] = useState<string | null>(null);
    const [speakingId, setSpeakingId] = useState<number | null>(null);

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

        const plainText = text
            .replace(/[#*_~`\[\]()]/g, '')
            .replace(/>\s+/g, '')
            .replace(/\n+/g, ' ');

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

                // Try to find a good breaking point (sentence or space)
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

                // Only alert on critical errors (not when we manually stop/cancel)
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

    const fullManuscriptId = 9999;
    const manuscriptText = chapters.map(c => `${c.title}. ${c.content}`).join(' ');

    useEffect(() => {
        setIsLoading(true);
        let mounted = true;
        let lastVersion: string | undefined;
        let lastCount = 0;

        const syncWithRemote = async (showNotification: boolean) => {
            const remoteData = await fetchRemoteManuscript(version);
            if (!mounted || !remoteData || remoteData.chapters.length === 0) return;

            const isUpdated = remoteData.draftVersion !== lastVersion ||
                remoteData.chapters.length !== lastCount;

            if (isUpdated) {
                setChapters(remoteData.chapters);
                setParts(remoteData.parts);
                setDraftVersion(remoteData.draftVersion);

                if (showNotification) {
                    const versionInfo = remoteData.updatedDate ? `v${remoteData.draftVersion} (${remoteData.updatedDate})` : `v${remoteData.draftVersion}`;
                    setNotification(`Aether-Drive Updated: ${versionInfo}`);
                    setTimeout(() => setNotification(null), 5000);
                }

                lastVersion = remoteData.draftVersion;
                lastCount = remoteData.chapters.length;
            }
        };

        const loadInitial = async () => {
            const data = await fetchManuscript(version);
            if (!mounted) return;

            setChapters(data.chapters);
            setParts(data.parts);
            setDraftVersion(data.draftVersion);

            lastVersion = data.draftVersion;
            lastCount = data.chapters.length;

            setIsLoading(false);

            // Initial silent sync - page loads will have an update within the first fetch
            // but we don't notify the user yet.
            await syncWithRemote(false);
        };

        loadInitial();

        // Check for updates every 60 seconds, only notifying if version changes after initial load
        const intervalId = setInterval(() => {
            syncWithRemote(true);
        }, 60000);

        return () => {
            mounted = false;
            clearInterval(intervalId);
        };
    }, [version]);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        const container = scrollContainerRef.current;
        if (element && container) {
            container.scrollTo({
                top: element.offsetTop,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="container mx-auto px-6 py-12 relative">
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
                <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="text-2xl font-bold text-glow text-cyan-400">
                        Full Manuscript
                    </div>
                    <div className="text-[10px] text-zinc-600 italic text-center">
                        Listen to the entire document using browser-native speech synthesis.
                    </div>
                    <div className="w-full pt-4">
                        <button
                            onClick={() => toggleSpeech(fullManuscriptId, manuscriptText)}
                            className={`w-full py-2 rounded text-xs font-bold uppercase tracking-widest transition-all border ${speakingId === fullManuscriptId
                                ? 'bg-cyan-500 text-black border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.5)]'
                                : 'bg-transparent text-cyan-500 border-cyan-500/30 hover:bg-cyan-500/10'
                                }`}
                        >
                            {speakingId === fullManuscriptId ? '⏹ Stop Audio' : '▶ Play Full Text'}
                        </button>
                    </div>
                </div>
            </header>

            <div className="flex flex-col lg:flex-row gap-12">
                {/* Audiobook Sidebar */}
                <aside className="lg:w-1/3 no-print order-1 lg:order-1">
                    <div className="glass-panel sticky top-32">
                        <div className="bg-black/50 p-6 rounded border border-white/5 mb-6">
                            <div className="flex flex-col items-center justify-center space-y-4">
                                <div className="text-2xl font-bold text-glow text-cyan-400">
                                    Full Manuscript
                                </div>
                                <div className="text-[10px] text-zinc-600 italic text-center">
                                    Listen to the entire document using browser-native speech synthesis.
                                </div>
                                <div className="w-full pt-4">
                                    <button
                                        onClick={() => toggleSpeech(fullManuscriptId, manuscriptText)}
                                        className={`w-full py-2 rounded text-xs font-bold uppercase tracking-widest transition-all border ${speakingId === fullManuscriptId
                                            ? 'bg-cyan-500 text-black border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.5)]'
                                            : 'bg-transparent text-cyan-500 border-cyan-500/30 hover:bg-cyan-500/10'
                                            }`}
                                    >
                                        {speakingId === fullManuscriptId ? '⏹ Stop Audio' : '▶ Play Full Text'}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed mb-6 italic">
                            Tip: For the best experience, try different system voices in your browser settings.
                        </p>
                        <div className="space-y-4">
                            <Link href={`/manuscript/full-text?edition=${version}`} className="block text-center text-xs font-bold text-cyan-500 uppercase tracking-widest border border-cyan-500/30 py-3 rounded hover:bg-cyan-500/10 transition-all">
                                Read as Full Text
                            </Link>
                            <div className="pt-4 border-t border-white/5">
                                <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-3 font-bold">Recommended Text-to-Speech:</p>
                                <ul className="text-[10px] text-zinc-600 space-y-3">
                                    <li className="flex flex-col">
                                        <a href="https://chromewebstore.google.com/detail/read-aloud-a-text-to-spee/hdhinadidafjejdhmfkjgnolgjacajbc" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-cyan-400 underline decoration-zinc-800 underline-offset-2 transition-colors">• Read Aloud</a>
                                        <span>Chrome / Edge extension</span>
                                    </li>
                                    <li className="flex flex-col">
                                        <a href="https://www.naturalreaders.com/online/" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-cyan-400 underline decoration-zinc-800 underline-offset-2 transition-colors">• NaturalReader</a>
                                        <span>Browser extension / App</span>
                                    </li>
                                    <li className="flex flex-col">
                                        <a href="https://speechify.com/" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-cyan-400 underline decoration-zinc-800 underline-offset-2 transition-colors">• Speechify</a>
                                        <span>Focused reading tool</span>
                                    </li>
                                    <li className="flex flex-col mt-2 pt-2 border-t border-white/5 uppercase tracking-tighter">
                                        <span className="text-cyan-500/50">Pro Tip:</span>
                                        <span>On mobile, use Google's "Listen to this page" in Chrome.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Chapters List */}
                <div className="lg:w-2/3 order-2 lg:order-2">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
                        <h1 className="text-3xl md:text-4xl text-glow uppercase tracking-tighter">Manuscript: Lem's Memories</h1>
                        {draftVersion && <div className="text-[10px] text-zinc-500 uppercase tracking-widest bg-white/5 px-3 py-1 rounded border border-white/5">Draft: v{draftVersion}</div>}
                    </div>

                    {/* Section Tabs */}
                    <div className="flex flex-wrap gap-2 mb-8 sticky top-20 md:top-28 z-10 bg-black/80 backdrop-blur-sm py-4 border-b border-white/5 no-print">
                        {parts.map((section) => (
                            <button
                                key={section.id}
                                onClick={() => scrollToSection(section.id)}
                                className="px-4 py-1 md:py-2 rounded text-[10px] font-bold uppercase tracking-widest border border-cyan-500/30 text-cyan-500 hover:bg-cyan-500/10 transition-all active:scale-95"
                            >
                                {section.title}
                            </button>
                        ))}
                    </div>

                    <div ref={scrollContainerRef} className="space-y-12 h-[calc(100vh)] overflow-y-auto pr-4 scroll-smooth custom-scrollbar relative">
                        {isLoading ? (
                            <div className="flex flex-col items-center justify-center py-24 text-zinc-500 uppercase tracking-widest text-xs">
                                <div className="mb-4 animate-pulse">Scanning Aether-Drive...</div>
                            </div>
                        ) : parts.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-24 text-zinc-500 uppercase tracking-widest text-xs">
                                <div className="mb-4 text-red-500/50">Connection Failed: Data Not Found</div>
                                <button
                                    onClick={() => window.location.reload()}
                                    className="text-cyan-500 hover:text-cyan-400 underline underline-offset-4"
                                >
                                    Retry Archive Sync
                                </button>
                            </div>
                        ) : (
                            parts.map((section) => (
                                <div key={section.id} id={section.id} className="pt-8 first:pt-0">
                                    <h2 className="text-xl mb-2 text-cyan-400 uppercase tracking-widest flex items-center gap-4">
                                        <span className="h-px bg-cyan-900 flex-grow"></span>
                                        {section.title}
                                        <span className="h-px bg-cyan-900 flex-grow"></span>
                                    </h2>
                                    <p className="text-xs text-zinc-500 italic mb-8 text-center max-w-xl mx-auto">
                                        {section.summary}
                                    </p>
                                    <div className="space-y-6">
                                        {section.chapters
                                            .map((chapter) => (
                                                <div
                                                    key={chapter.id}
                                                    id={`chapter-${chapter.id}`}
                                                    className="glass-panel hover:border-cyan-500/50 transition-colors group scroll-mt-24"
                                                >
                                                    <div className="flex justify-between items-start mb-2">
                                                        <h3 className="text-xl group-hover:text-cyan-400 transition-colors">
                                                            Chapter {chapter.id}: {chapter.title}
                                                        </h3>
                                                        <span className="text-xs text-zinc-500 uppercase tracking-widest pt-1">PHASE VI DRAFT</span>
                                                    </div>
                                                    <p className="text-sm text-gray-400 leading-relaxed">
                                                        {chapter.summary}
                                                    </p>
                                                    <div className="mt-4 flex flex-wrap gap-4 no-print items-center">
                                                        <Link
                                                            href={`/manuscript/full-text?edition=${version}#chapter-${chapter.id}`}
                                                            className="text-[10px] font-bold text-cyan-500 uppercase tracking-[0.2em] border border-cyan-900 px-4 py-1.5 rounded hover:bg-cyan-900/20 transition-all"
                                                        >
                                                            Read Chapter
                                                        </Link>
                                                        <button
                                                            onClick={() => toggleSpeech(chapter.id, chapter.content)}
                                                            className={`flex items-center gap-2 px-4 py-1.5 rounded border text-[10px] font-bold uppercase tracking-[0.2em] transition-all ${speakingId === chapter.id
                                                                ? 'bg-cyan-500 text-black border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.5)]'
                                                                : 'bg-transparent text-cyan-500 border-cyan-500/30 hover:bg-cyan-500/10'
                                                                }`}
                                                        >
                                                            {speakingId === chapter.id ? (
                                                                <>
                                                                    <span className="relative flex h-1.5 w-1.5">
                                                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75"></span>
                                                                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-black"></span>
                                                                    </span>
                                                                    Stop Listening
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <span>▶</span> AI Voice (BETA)
                                                                </>
                                                            )}
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            ))
                        )}
                        {!isLoading && parts.length > 0 && (
                            <div className="mt-16 p-8 border border-dashed border-white/10 text-center rounded-lg mb-12">
                                <p className="text-zinc-600 text-sm italic">
                                    The First Edition of Lem's Memories is complete.
                                    Further aetheric logs may be uncompiled in future iterations.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {!isLoading && parts.length > 0 && (
                <section className="mt-24 border-t border-zinc-900 pt-16 scroll-mt-24">
                    <h2 className="text-2xl font-light tracking-[0.2em] mb-12 text-zinc-100 flex items-center uppercase">
                        <span className="w-8 h-px bg-cyan-900 mr-4"></span>
                        AI-Driven Narrative Methodology
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
                        <div className="space-y-6">
                            <h3 className="text-cyan-400 text-sm font-bold uppercase tracking-[0.2em]">The Composition Loop</h3>
                            <p className="text-zinc-400 text-sm leading-relaxed">
                                The manuscript is developed through a recursive multi-stage process. Each chapter begins as a high-fidelity narrative plan, which is then expanded into prose using specialized LLM agents adhering to strict stylistic constraints.
                            </p>
                            <p className="text-zinc-400 text-sm leading-relaxed">
                                Following initial composition, the text undergoes repeated <strong>QA drills</strong>. These cycles allow us to "drill down" into specific details—cross-referencing established lore, refining atmospheric density, and ensuring the technical resonance of the Aether-Drive logs remain consistent across all chapters.
                            </p>
                        </div>
                        <div className="space-y-6">
                            <h3 className="text-cyan-400 text-sm font-bold uppercase tracking-[0.2em]">Two Stylistic Streams</h3>
                            <div className="border-l border-white/10 pl-6 py-2 space-y-4">
                                <div>
                                    <h4 className="text-white text-xs font-bold uppercase mb-1">Young Adult Edition</h4>
                                    <p className="text-zinc-500 text-xs leading-relaxed">
                                        Focuses on Lem's immediate, grounded perspective. It uses visceral, laymen's terms to explore mature themes of systemic control, identity, and the weight of restoration.
                                    </p>
                                </div>
                                <div>
                                    <h4 className="text-white text-xs font-bold uppercase mb-1">13+ Core Edition</h4>
                                    <p className="text-zinc-500 text-xs leading-relaxed">
                                        Adopts a grounded, direct tone that focuses on the transition between eras. It emphasizes the technical scale of the Great Fry and the tactical struggle against the Core, while ensuring the narrative remains accessible by avoiding dense metaphorical flourishes.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {!isLoading && parts.length > 0 && (
                <section id="outstanding-questions" className="mt-20 border-t border-zinc-900 pt-16 scroll-mt-24">
                    <h2 className="text-2xl font-light tracking-[0.2em] mb-12 text-zinc-100 flex items-center">
                        <span className="w-8 h-px bg-cyan-900 mr-4"></span>
                        OUTSTANDING NARRATIVE QUESTIONS
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="glass-panel p-6 border-zinc-900/50">
                            <h3 className="text-cyan-400 text-xs font-bold uppercase tracking-[0.2em] mb-4">Gorgon Autonomy</h3>
                            <p className="text-zinc-400 text-sm leading-relaxed">
                                Following Lem's final transmission of the Core authorization keys, how will the newly liberated Gorgons establish their own social order? Will they integrate with human survivors or form an independent mechanical civilization?
                            </p>
                        </div>
                        <div className="glass-panel p-6 border-zinc-900/50">
                            <h3 className="text-cyan-400 text-xs font-bold uppercase tracking-[0.2em] mb-4">The Lunar Debris Stabilization</h3>
                            <p className="text-zinc-400 text-sm leading-relaxed">
                                With the Capacitor Pyramid's reset blocked and the "Great Update" applied, will the lunar debris field remain in a stable orbit, or will the changes in aetheric density lead to a slow orbital decay?
                            </p>
                        </div>
                        <div className="glass-panel p-6 border-zinc-900/50">
                            <h3 className="text-cyan-400 text-xs font-bold uppercase tracking-[0.2em] mb-4">Core Remnants</h3>
                            <p className="text-zinc-400 text-sm leading-relaxed">
                                Where did the surviving Core personnel (publicly known as Archivists) retreat after the fall of Cradle Zero? Are there other hidden "Cradle" facilities capable of sustaining their leadership, or is Elowen Vane truly the only "Archivist" left?
                            </p>
                        </div>
                        <div className="glass-panel p-6 border-zinc-900/50">
                            <h3 className="text-cyan-400 text-xs font-bold uppercase tracking-[0.2em] mb-4">The Path of Fragments</h3>
                            <p className="text-zinc-400 text-sm leading-relaxed">
                                What new ecosystems will emerge from the merged Wood and Water aetheric signatures across the planetary debris field? How will the "Grown" technology continue to evolve without Lem's direct influence?
                            </p>
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}

export default function ManuscriptPage() {
    return (
        <Suspense fallback={
            <div className="container mx-auto px-6 py-24 text-center text-zinc-500 uppercase tracking-widest text-xs">
                Accessing Aether-Drive...
            </div>
        }>
            <ManuscriptContent />
        </Suspense>
    );
}
