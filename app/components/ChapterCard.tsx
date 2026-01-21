'use client';

import React from 'react';

interface Chapter {
    id: number;
    title: string;
    timestamp?: string;
    content: string;
}

interface ChapterCardProps {
    chapter: Chapter;
    isSpeaking: boolean;
    onToggleSpeech: (id: number, text: string) => void;
    className?: string;
}

export const ChapterCard: React.FC<ChapterCardProps> = ({ 
    chapter, 
    isSpeaking, 
    onToggleSpeech,
    className = ''
}) => {
    return (
        <div
            id={`chapter-${chapter.id}`}
            className={`glass-panel hover:border-cyan-500/50 transition-colors group scroll-mt-24 ${className}`}
        >
            <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div>
                        <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                            {chapter.title}
                        </h3>
                        {chapter.timestamp && (
                            <div className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1">
                                EST. {chapter.timestamp}
                            </div>
                        )}
                    </div>
                    <button
                        onClick={() => onToggleSpeech(chapter.id, chapter.content)}
                        className={`px-4 py-1.5 rounded text-[10px] font-bold uppercase tracking-widest transition-all border ${isSpeaking
                            ? 'bg-cyan-500 text-black border-cyan-500'
                            : 'bg-transparent text-cyan-500 border-cyan-500/30 hover:bg-cyan-500/10'
                            }`}
                    >
                        {isSpeaking ? '⏹ Stop' : '▶ Listen'}
                    </button>
                </div>
                <div className="prose prose-invert prose-sm max-w-none text-zinc-400 leading-relaxed">
                    {chapter.content.split('\n').map((para, i) => (
                        para.trim() && <p key={i}>{para}</p>
                    ))}
                </div>
            </div>
        </div>
    );
};
