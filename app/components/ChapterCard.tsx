'use client';

import React from 'react';
import Link from 'next/link';

interface Chapter {
    id: number;
    title: string;
    timestamp?: string;
    content: string;
    summary?: string;
}

interface ChapterCardProps {
    chapter: Chapter;
    isSpeaking: boolean;
    onToggleSpeech: (id: number, text: string) => void;
    className?: string;
    readMoreHref?: string;
}

export const ChapterCard: React.FC<ChapterCardProps> = ({
    chapter,
    isSpeaking,
    onToggleSpeech,
    className = '',
    readMoreHref
}) => {
    return (
        <div
            id={`chapter-${chapter.id}`}
            className={`glass-panel hover:border-cyan-500/50 transition-colors group scroll-mt-24 not-prose ${className}`}
        >
            <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div>
                        <h3 className="text-xl font-bold group-hover:text-cyan-400 transition-colors">
                            Chapter {chapter.id}: {chapter.title}
                        </h3>
                        {chapter.timestamp && (
                            <div className="text-[10px] text-muted uppercase tracking-widest mt-1">
                                EST. {chapter.timestamp}
                            </div>
                        )}
                    </div>
                    <div className='flex items-center gap-4'>
                        <button
                            onClick={() => onToggleSpeech(chapter.id, chapter.summary || chapter.content)}
                            className={`px-4 py-1.5 rounded text-[10px] font-bold uppercase tracking-widest transition-all border ${isSpeaking
                                ? 'bg-cyan-500 text-white border-cyan-500'
                                : 'bg-transparent text-cyan-500 border-cyan-500/30 hover:bg-cyan-500/10'
                                }`}
                        >
                            {isSpeaking ? '⏹ Stop' : '▶ Listen'}
                        </button>
                        {readMoreHref && (
                            <Link
                                href={readMoreHref}
                                className="text-xs font-bold text-cyan-500 uppercase tracking-[0.2em] hover:text-cyan-400 transition-colors flex items-center gap-2"
                            >
                                Read Full Chapter
                                <span className="text-[10px]">»</span>
                            </Link>
                        )}
                    </div>
                </div>
                <div className="prose dark:prose-invert prose-sm max-w-none text-secondary leading-relaxed italic">
                    {(chapter.summary || chapter.content).split('\n').map((para, i) => (
                        para.trim() && <p key={i}>{para}</p>
                    ))}
                </div>
            </div>
        </div>
    );
};
