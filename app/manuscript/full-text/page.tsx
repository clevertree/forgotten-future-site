'use client';

import React, { useState, useEffect, Suspense } from 'react';
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
    const [isLoading, setIsLoading] = useState(true);
    const [version, setVersion] = useState<ManuscriptVersion>(editionParam === '13plus' ? '13plus' : 'youngadult');

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
        fetchManuscript(version).then(data => {
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
        <div className="container mx-auto px-6 lg:px-12 py-12">
               <header className="mb-16 text-center lg:text-left lg:pl-[25%]">
                <h1 className="text-6xl font-black mb-4 tracking-tighter text-glow">FORGOTTEN FUTURE</h1>
                <h2 className="text-xl text-cyan-400 uppercase tracking-[0.3em]">The Full Manuscript Draft</h2>
              <span className="hidden md:block text-[10px] text-zinc-500 uppercase">
                        Optimized for Text-to-Speech
                    </span>
                <div className="mt-4 p-4 border border-cyan-500/20 bg-cyan-500/5 rounded text-xs text-zinc-400 uppercase tracking-widest leading-relaxed max-w-3xl">
                    Note: This draft covers the <strong className="text-cyan-400 font-bold">{version === '13plus' ? '13+ Core Edition' : 'Young Adult Edition'}</strong>.
                    All chapters of the Aether-Drive logs have been decrypted and rendered into prose.
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

