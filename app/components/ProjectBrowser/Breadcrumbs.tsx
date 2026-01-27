'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbsProps {
    slug: string[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ slug }) => {
    return (
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-500 overflow-x-auto whitespace-nowrap pb-2">
            <Link href="/browser" className="hover:text-cyan-600 dark:hover:text-cyan-400">root</Link>
            {slug.map((segment, i) => (
                <React.Fragment key={i}>
                    <ChevronRight size={10} />
                    <Link href={`/browser/${slug.slice(0, i + 1).join('/')}`} className="hover:text-cyan-600 dark:hover:text-cyan-400">
                        {segment}
                    </Link>
                </React.Fragment>
            ))}
        </div>
    );
};
