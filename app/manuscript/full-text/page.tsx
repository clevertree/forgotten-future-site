'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { fetchManuscript, Chapter, Part } from '../../../lib/manuscript';

export default function FullTextManuscript() {
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
                    const element = document.getElementById(id);
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 100);
            }
        });
    }, []);

    return (
        <div className="container mx-auto px-6 lg:px-12 py-12">
            <div className="mb-12 flex justify-between items-center no-print">
                <Link href="/manuscript" className="text-cyan-500 hover:text-cyan-400 font-bold uppercase tracking-widest text-xs flex items-center gap-2">
                    ← Back to Manuscript Page
                </Link>

                <div className="flex items-center gap-4">
                    <span className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] border border-white/10 px-3 py-1 rounded">
                        Optimized for Text-to-Speech
                    </span>
                </div>
            </div>

            <header className="mb-16 text-center lg:text-left lg:pl-[25%]">
                <h1 className="text-6xl font-black mb-4 tracking-tighter text-glow">FORGOTTEN FUTURE</h1>
                <h2 className="text-xl text-cyan-400 uppercase tracking-[0.3em]">The Full Manuscript Draft</h2>
                <div className="mt-8 p-4 border border-cyan-500/20 bg-cyan-500/5 rounded text-xs text-zinc-400 uppercase tracking-widest leading-relaxed max-w-3xl">
                    Note: This draft covers the <strong className="text-cyan-400">Complete First Edition</strong>.
                    All chapters of the Aether-Drive logs have been decrypted and rendered into prose.
                </div>
            </header>

            <div className="flex flex-col lg:flex-row gap-12 relative">
                {/* Navigation Sidebar */}
                <aside className="lg:w-1/4 no-print order-2 lg:order-1">
                    <div className="glass-panel sticky top-36 max-h-[70vh] overflow-y-auto custom-scrollbar p-6">
                        <h2 className="text-sm font-bold text-cyan-500 uppercase tracking-[0.2em] mb-6 border-b border-white/10 pb-2">
                            Navigation
                        </h2>
                        <div className="space-y-8">
                            {/* SIDEBAR_START (dynamic) */}
                            <div>
                                <div className="text-[10px] text-zinc-500 uppercase tracking-widest mb-3">Navigation</div>
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

                <article className="lg:w-3/4 space-y-24 pb-[100vh] order-1 lg:order-2">
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
                                        {part.summary && (
                                            <p className="text-cyan-400 italic text-sm max-w-2xl mx-auto tracking-wide">
                                                {part.summary}
                                            </p>
                                        )}
                                    </header>

                                    {part.chapters.map((chapter) => (
                                        <section
                                            key={chapter.id}
                                            id={`chapter-${chapter.id}`}
                                            className="prose prose-invert max-w-none scroll-mt-32"
                                        >
                                            <h3 className="text-3xl font-bold mb-8 text-white flex items-center gap-4">
                                                <span className="text-cyan-500 text-sm font-mono uppercase tracking-widest">
                                                    Chapter {chapter.id}
                                                </span>
                                                {chapter.title}
                                            </h3>
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
                                    <h3 className="text-3xl font-bold mb-8 text-white flex items-center gap-4">
                                        <span className="text-cyan-500 text-sm font-mono uppercase tracking-widest">
                                            Chapter {chapter.id}
                                        </span>
                                        {chapter.title}
                                    </h3>
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

