'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getBrowserLink } from '@/lib/browserUtils';

interface NavControlsProps {
    prev: string | null;
    next: string | null;
    prevName?: string;
    nextName?: string;
    currentIdx?: number;
    total?: number;
}

export const NavControls: React.FC<NavControlsProps> = ({
    prev,
    next,
    prevName,
    nextName,
    currentIdx,
    total
}) => {
    if (!prev || !next || (total !== undefined && total <= 1)) return null;

    return (
        <div className="flex items-center justify-between w-full max-w-4xl mb-6 bg-white/5 dark:bg-white/5 p-2 rounded-lg border border-slate-200 dark:border-white/5 shadow-sm overflow-hidden">
            <Link
                href={getBrowserLink(prev)}
                className="flex items-center gap-2 p-2 hover:bg-cyan-500/10 hover:text-cyan-500 rounded-lg transition-colors text-slate-400 group min-w-0 flex-1"
                title={`Previous: ${prevName}`}
            >
                <ChevronLeft size={24} className="flex-shrink-0" />
                <span className="text-[10px] font-mono truncate hidden sm:block opacity-60 group-hover:opacity-100">
                    {prevName?.replace(/-/g, ' ')}
                </span>
            </Link>

            <div className="px-4 text-xs font-mono text-slate-500 whitespace-nowrap border-x border-slate-200 dark:border-white/5 mx-2">
                <span className="text-cyan-500 font-bold">{currentIdx}</span> / {total}
            </div>

            <Link
                href={getBrowserLink(next)}
                className="flex items-center gap-2 p-2 hover:bg-cyan-500/10 hover:text-cyan-500 rounded-lg transition-colors text-slate-400 group min-w-0 flex-1 justify-end text-right"
                title={`Next: ${nextName}`}
            >
                <span className="text-[10px] font-mono truncate hidden sm:block opacity-60 group-hover:opacity-100">
                    {nextName?.replace(/-/g, ' ')}
                </span>
                <ChevronRight size={24} className="flex-shrink-0" />
            </Link>
        </div>
    );
};
