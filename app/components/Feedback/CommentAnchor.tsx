'use client';

import React from 'react';
import { MessageSquarePlus } from 'lucide-react';

interface CommentAnchorProps {
    children: React.ReactNode;
    path: string;
    anchorId: string;
    onOpenComment: (path: string, anchorId: string) => void;
    isActive: boolean;
}

export const CommentAnchor: React.FC<CommentAnchorProps> = ({
    children,
    path,
    anchorId,
    onOpenComment,
    isActive
}) => {
    const isStatic = process.env.NEXT_PUBLIC_IS_STATIC === 'true';
    if (!isActive || isStatic) return <>{children}</>;

    return (
        <div className="relative group">
            {/* Visual highlight on hover */}
            <div className="transition-all duration-300 group-hover:bg-cyan-500/5 rounded-lg group-hover:ring-1 group-hover:ring-cyan-500/20">
                {children}
            </div>

            {/* 
        The button is positioned outside the main flow. 
        We use a negative left position but a large padding/width 
        on a bridge element to ensure the mouse doesn't lose focus 
        when moving from the content to the button.
      */}
            <div className="absolute -left-12 top-0 h-full w-12 flex items-start justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onOpenComment(path, anchorId);
                    }}
                    className="p-2 text-cyan-500 hover:text-cyan-400 hover:scale-110 transition-transform bg-black/50 backdrop-blur-sm rounded-lg border border-cyan-500/30 shadow-[0_0_10px_rgba(6,182,212,0.2)] mt-1"
                    title="Add comment"
                >
                    <MessageSquarePlus size={20} />
                </button>
            </div>
        </div>
    );
};
