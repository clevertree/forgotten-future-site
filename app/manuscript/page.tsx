'use client';

import React, { useState, useRef, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { fetchManuscript, Chapter, Part, ManuscriptVersion } from '../../lib/manuscript';

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

    const fullManuscriptId = 9999;
    const manuscriptText = chapters.map(c => `${c.title}. ${c.content}`).join(' ');

    const prevChaptersRef = useRef<Chapter[]>([]);

    const toggleSpeech = (id: number, text: string) => {
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

        const utterance = new SpeechSynthesisUtterance(plainText);
        utterance.onend = () => setSpeakingId(null);
        utterance.onerror = () => setSpeakingId(null);
        utterance.rate = 1.0;
        
        window.speechSynthesis.speak(utterance);
        setSpeakingId(id);
    };

    useEffect(() => {
        setIsLoading(true);
        const loadManuscript = (isRefresh = false) => {
            fetchManuscript(version).then(data => {
                if (data.chapters.length > 0) {
                    if (isRefresh && prevChaptersRef.current.length > 0) {
                        const changedChapters = data.chapters.filter((ch, index) => {
                            const prev = prevChaptersRef.current[index];
                            return !prev || prev.content !== ch.content || prev.title !== ch.title;
                        });

                        if (changedChapters.length > 0) {
                            const titles = changedChapters.map(ch => `Ch ${ch.id}`).join(', ');
                            setNotification(`Refreshed: ${titles}`);
                            setTimeout(() => setNotification(null), 10000);
                        }
                    }
                    setChapters(data.chapters);
                    setParts(data.parts);
                    setDraftVersion(data.draftVersion);
                    prevChaptersRef.current = data.chapters;
                }
                setIsLoading(false);

                // Handle hash-based scrolling after data loads
                if (!isRefresh && window.location.hash) {
                    setTimeout(() => {
                        const id = window.location.hash.replace('#', '');
                        scrollToSection(id);
                    }, 100);
                }
            });
        };

        loadManuscript();

        // Polling: attempt to refresh once per 60 seconds
        const intervalId = setInterval(() => loadManuscript(true), 60000);

        return () => clearInterval(intervalId);
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
                <div className="fixed bottom-8 right-8 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
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

            {/* Floating Speech Control */}
            {speakingId && (
                <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 no-print animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="bg-zinc-950/90 backdrop-blur-md border border-cyan-500/50 px-8 py-4 rounded-full shadow-[0_0_30px_rgba(6,182,212,0.2)] flex items-center gap-6">
                        <div className="flex items-center gap-3">
                            <div className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
                            </div>
                            <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-[0.2em]">
                                Reading Chapter {speakingId}
                            </span>
                        </div>
                        <div className="h-4 w-px bg-white/10"></div>
                        <button 
                            onClick={() => {
                                window.speechSynthesis.cancel();
                                setSpeakingId(null);
                            }}
                            className="text-[10px] font-black text-white uppercase tracking-widest hover:text-cyan-400 transition-colors flex items-center gap-2"
                        >
                            <span>■</span> Stop
                        </button>
                    </div>
                </div>
            )}

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
                                        className={`w-full py-2 rounded text-xs font-bold uppercase tracking-widest transition-all border ${
                                            speakingId === fullManuscriptId
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
                                                            className={`flex items-center gap-2 px-4 py-1.5 rounded border text-[10px] font-bold uppercase tracking-[0.2em] transition-all ${
                                                                speakingId === chapter.id 
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
                                Following initial composition, the text undergoes repeated <strong>QA drills</strong>. These cycles allow us to "drill down" into specific details—cross-referencing established lore, refining atmospheric density, and ensuring the technical resonance of the Aether-Drive logs remain consistent across all 78 chapters.
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
                                        Adopts a cinematic heroic tone. It emphasizes the grand scale of the Great Fry and the tactical struggle against the Core, while limiting religious, controversial elements, and themes of cultural appropriation to keep the focus on the adventure.
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
                            <h3 className="text-cyan-400 text-xs font-bold uppercase tracking-[0.2em] mb-4">Archivist Remnants</h3>
                            <p className="text-zinc-400 text-sm leading-relaxed">
                                Where did the surviving Archivist personnel from Cradle Zero retreat after the fall of the base? Are there other hidden "Cradle" facilities capable of sustaining their leadership?
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
