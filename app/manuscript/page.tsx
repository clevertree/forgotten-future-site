'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';

export default function ManuscriptPage() {
    const [playingId, setPlayingId] = useState<number | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const chapters = [
        {
            id: 1,
            title: 'An Ordinary Distance',
            summary: "Lem's suburban life shatters as machines appear on the horizon.",
            audio: '/audio/manuscript/chapter_01.mp3'
        },
        {
            id: 2,
            title: 'Lynn',
            summary: 'Lynn arrives and forces Lem into activation.',
            audio: '/audio/manuscript/chapter_02.mp3' // Placeholder if it exists or we plan to generate it
        },
        { id: 3, title: 'The Doorway', summary: 'Lem discovers he is not human; Lynn installs remote compulsion.' },
        { id: 4, title: 'Drafted', summary: 'Lem is embedded with soldiers for a desperate Moon mission.' },
        { id: 5, title: 'The Briefing He Never Had', summary: 'Soldiers discuss psychological warfare and hidden truths.' },
        { id: 6, title: 'The Near Moon', summary: 'Visual confirmation that the Moon is not what humanity was taught.' },
        { id: 7, title: 'Zenith', summary: 'Ship reaches lunar altitude; Lynn makes a ruthless decision.' },
        { id: 8, title: 'The Shattered Approach', summary: 'The Moon begins to fragment; The Caucasian Eagle is struck.' },
    ];

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
                        <h2 className="text-xl mb-4 underline underline-offset-4 decoration-cyan-500 text-center lg:text-left">Full Audiobook</h2>
                        <div className="bg-black/50 p-6 rounded border border-white/5 mb-6">
                            <div className="flex flex-col items-center justify-center space-y-4">
                                <div className="text-xs text-zinc-500 uppercase tracking-widest">Available Now</div>
                                <div className="text-2xl font-bold text-glow text-cyan-400">Chapter 1</div>
                                <div className="text-[10px] text-zinc-600 italic text-center">
                                    "An Ordinary Distance" <br />
                                    (Narrated by Fable)
                                </div>
                                <div className="w-full pt-4">
                                    <button
                                        onClick={() => togglePlay(1, '/audio/manuscript/chapter_01.mp3')}
                                        className={`w-full py-2 rounded text-xs font-bold uppercase tracking-widest transition-all border ${playingId === 1
                                            ? 'bg-cyan-500 text-black border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.5)]'
                                            : 'bg-transparent text-cyan-500 border-cyan-500/30 hover:bg-cyan-500/10'
                                            }`}
                                    >
                                        {playingId === 1 ? '⏸ Playing' : '▶ Play Audio'}
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
                    <h1 className="text-3xl md:text-4xl mb-8 text-glow uppercase tracking-tighter">Manuscript: Part 1 - Awakening</h1>
                    <p className="text-gray-400 mb-12 italic border-l-2 border-cyan-500 pl-4">
                        This manuscript represents Lem's objective, perfect-recall memories. Unlike the redacted historical
                        records of the Archivists, these pages are the unvarnished causality of the First Wave.
                    </p>

                    <div className="space-y-6">
                        {chapters.map((chapter) => (
                            <div key={chapter.id} className="glass-panel hover:border-cyan-500/50 transition-colors cursor-pointer group">
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

                                    <button
                                        disabled={!chapter.audio}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (chapter.audio) togglePlay(chapter.id, chapter.audio);
                                        }}
                                        className={`text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded transition-all border ${!chapter.audio
                                            ? 'border-zinc-800 text-zinc-700 cursor-not-allowed opacity-50'
                                            : playingId === chapter.id
                                                ? 'bg-cyan-500 text-black border-cyan-500'
                                                : 'border-cyan-500/30 text-cyan-500 hover:bg-cyan-500/10'
                                            }`}
                                    >
                                        {playingId === chapter.id ? '⏸ Pause' : '▶ Play Audio'}
                                    </button>

                                    {chapter.audio && (
                                        <div className="flex items-center gap-2 text-zinc-500 ml-2">
                                            <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse"></span>
                                            <span className="text-[10px] uppercase tracking-widest font-bold">Live</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 p-8 border border-dashed border-white/10 text-center rounded-lg">
                        <p className="text-zinc-600 text-sm italic">
                            Further chapters are currently undergoing Lore Hardening.
                            Check back as the Aether-Drive logs are decrypted.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
