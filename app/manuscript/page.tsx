'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { fetchManuscript, Chapter, Part } from '../../lib/manuscript';

export default function ManuscriptPage() {
    const [playingId, setPlayingId] = useState<number | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const scrollContainerRef = useRef<HTMLDivElement | null>(null);
    const router = useRouter();

    const [chapters, setChapters] = useState<Chapter[]>([]);
    const [parts, setParts] = useState<Part[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchManuscript().then(data => {
            if (data.chapters.length > 0) {
                setChapters(data.chapters);
                setParts(data.parts);
            }
            setIsLoading(false);

            // Handle hash-based scrolling after data loads
            if (window.location.hash) {
                setTimeout(() => {
                    const id = window.location.hash.replace('#', '');
                    scrollToSection(id);
                }, 100);
            }
        });
    }, []);



    const togglePlay = (id: number, url: string) => {
        if (playingId === id) {
            audioRef.current?.pause();
            setPlayingId(null);
        } else {
            setPlayingId(id);
            if (audioRef.current) {
                audioRef.current.src = url;
                audioRef.current.play();
            }
        }
    };

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
        <div className="container mx-auto px-6 py-12">
            {/* Hidden audio element for global control */}
            <audio
                ref={audioRef}
                onEnded={() => setPlayingId(null)}
                className="hidden"
            />

            <div className="flex flex-col lg:flex-row gap-12">
                {/* Audiobook Sidebar */}
                <aside className="lg:w-1/3 no-print order-2 lg:order-1">
                    <div className="glass-panel sticky top-32">
                        <h2 className="text-xl mb-4 underline underline-offset-4 decoration-cyan-500 text-center lg:text-left">Full Audiobook (Coming soon)</h2>
                        <div className="bg-black/50 p-6 rounded border border-white/5 mb-6">
                            <div className="flex flex-col items-center justify-center space-y-4">
                                <div className="text-xs text-zinc-500 uppercase tracking-widest">Available Now</div>
                                <div className="text-2xl font-bold text-glow text-cyan-400">
                                    {chapters.length > 0 ? `Chapter ${chapters[0].id}` : 'Chapter 1'}
                                </div>
                                <div className="text-[10px] text-zinc-600 italic text-center">
                                    "{chapters.length > 0 ? chapters[0].title : 'Loading...'}" <br />
                                    (Narrated by Fable)
                                </div>
                                <div className="w-full pt-4">
                                    <button
                                        onClick={() => togglePlay(chapters.length > 0 ? chapters[0].id : 1, '/audio/manuscript/chapter_01.mp3')}
                                        className={`w-full py-2 rounded text-xs font-bold uppercase tracking-widest transition-all border ${(playingId === (chapters.length > 0 ? chapters[0].id : 1))
                                            ? 'bg-cyan-500 text-black border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.5)]'
                                            : 'bg-transparent text-cyan-500 border-cyan-500/30 hover:bg-cyan-500/10'
                                            }`}
                                    >
                                        {(playingId === (chapters.length > 0 ? chapters[0].id : 1)) ? '⏸ Playing' : '▶ Play Audio'}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed mb-6">
                            Audio is generated iteratively. Each chapter is narrated as the draft stabilizes to ensure narrative accuracy.
                        </p>
                        <div className="space-y-4">
                            <Link href="/manuscript/full-text" className="block text-center text-xs font-bold text-cyan-500 uppercase tracking-widest border border-cyan-500/30 py-3 rounded hover:bg-cyan-500/10 transition-all">
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
                <div className="lg:w-2/3 order-1 lg:order-2">
                    <h1 className="text-3xl md:text-4xl mb-8 text-glow uppercase tracking-tighter">Manuscript: Lem's Memories</h1>

                    {/* Section Tabs */}
                    <div className="flex flex-wrap gap-2 mb-8 sticky top-20 z-10 bg-black/80 backdrop-blur-sm py-4 border-b border-white/5 no-print">
                        {parts.map((section) => (
                            <button
                                key={section.id}
                                onClick={() => scrollToSection(section.id)}
                                className="px-4 py-2 rounded text-[10px] font-bold uppercase tracking-widest border border-cyan-500/30 text-cyan-500 hover:bg-cyan-500/10 transition-all active:scale-95"
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
                                                            href={`/manuscript/full-text#chapter-${chapter.id}`}
                                                            className="text-[10px] font-bold text-cyan-500 uppercase tracking-[0.2em] border border-cyan-900 px-4 py-1.5 rounded hover:bg-cyan-900/20 transition-all"
                                                        >
                                                            Read Chapter
                                                        </Link>
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
