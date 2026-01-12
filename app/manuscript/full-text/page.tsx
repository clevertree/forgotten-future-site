'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MessageSquare, CheckCircle2 } from 'lucide-react';
import { CommentAnchor } from '../../components/Feedback/CommentAnchor';
import { CommentPopup } from '../../components/Feedback/CommentPopup';
import { SuccessPopup } from '../../components/Feedback/SuccessPopup';
import { chapters } from './chapters';

export default function FullTextManuscript() {
    const isStatic = process.env.NEXT_PUBLIC_IS_STATIC === 'true';
    const [isFeedbackMode, setIsFeedbackMode] = useState(!isStatic);
    const [activeComment, setActiveComment] = useState<{ path: string; anchorId: string } | null>(null);
    const [submittedPrUrl, setSubmittedPrUrl] = useState<string | null>(null);

    const sections = [
        { title: 'I: Shattered Approach', range: [1, 15] },
        { title: 'II: Thousand-Year Fallacy', range: [16, 29] },
        { title: 'III: White Forest', range: [30, 40] },
        { title: 'IV: Analog Dawn', range: [41, 58] },
        { title: 'V: Great Stalemate', range: [59, 68] },
    ];

    return (
        <div className="container mx-auto px-6 lg:px-12 py-12">
            <div className="mb-12 flex justify-between items-center no-print">
                <Link href="/manuscript" className="text-cyan-500 hover:text-cyan-400 font-bold uppercase tracking-widest text-xs flex items-center gap-2">
                    ← Back to Manuscript Page
                </Link>

                <div className="flex items-center gap-4">
                    {submittedPrUrl && (
                        <div className="flex items-center gap-2 text-green-400 text-[10px] uppercase font-bold animate-pulse">
                            <CheckCircle2 size={12} /> PR Created
                        </div>
                    )}
                    {!isStatic && (
                        <button
                            onClick={() => setIsFeedbackMode(!isFeedbackMode)}
                            className={`flex items-center gap-2 px-4 py-1.5 rounded-full border transition-all text-[10px] uppercase font-bold tracking-widest ${isFeedbackMode
                                ? 'bg-cyan-500 border-cyan-400 text-black shadow-[0_0_15px_rgba(6,182,212,0.5)]'
                                : 'bg-black border-white/10 text-zinc-500 hover:border-white/30'
                                }`}
                        >
                            <MessageSquare size={12} />
                            {isFeedbackMode ? 'Feedback Mode: ON' : 'Feedback Mode: OFF'}
                        </button>
                    )}
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
                    All 68 chapters of the Aether-Drive logs have been decrypted and rendered into prose.
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
                            {sections.map((section) => (
                                <div key={section.title}>
                                    <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3">
                                        {section.title}
                                    </h3>
                                    <ul className="space-y-2 border-l border-white/5 pl-4">
                                        {chapters
                                            .filter(c => c.id >= section.range[0] && c.id <= section.range[1])
                                            .map(chapter => (
                                                <li key={chapter.id}>
                                                    <a
                                                        href={`#chapter-${chapter.id}`}
                                                        className="text-[10px] text-zinc-400 hover:text-cyan-400 transition-colors block py-0.5 leading-tight uppercase tracking-tighter"
                                                    >
                                                        {chapter.id}. {chapter.title}
                                                    </a>
                                                </li>
                                            ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </aside>

                <article className="lg:w-3/4 space-y-24 pb-32 order-1 lg:order-2">
                    {chapters.map((chapter) => (
                        <section key={chapter.id} id={`chapter-${chapter.id}`} className="prose prose-invert max-w-none scroll-mt-32">
                            <h3 className="text-3xl font-bold mb-8 text-white flex items-center gap-4">
                                <span className="text-cyan-500 text-sm font-mono uppercase tracking-widest">Chapter {chapter.id}</span>
                                {chapter.title}
                            </h3>
                            <div className="text-zinc-300 leading-[2] text-lg space-y-6">
                                {chapter.content.split('\n\n').map((para, i) => {
                                    const paraId = `ch${chapter.id}-p${i + 1}`;
                                    return (
                                        <CommentAnchor
                                            key={paraId}
                                            path="manuscript"
                                            anchorId={paraId}
                                            isActive={isFeedbackMode}
                                            onOpenComment={(path, anchorId) => setActiveComment({ path, anchorId })}
                                        >
                                            <p>{para.trim()}</p>
                                        </CommentAnchor>
                                    );
                                })}
                            </div>
                        </section>
                    ))}
                </article>
            </div>

            {activeComment && (
                <CommentPopup
                    path={activeComment.path}
                    anchorId={activeComment.anchorId}
                    onClose={() => setActiveComment(null)}
                    onSuccess={(url) => {
                        setSubmittedPrUrl(url);
                    }}
                />
            )}

            {submittedPrUrl && (
                <SuccessPopup
                    prUrl={submittedPrUrl}
                    onClose={() => setSubmittedPrUrl(null)}
                />
            )}

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

