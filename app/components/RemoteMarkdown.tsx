'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface RemoteMarkdownProps {
    content: string;
    basePath?: string;
}

export function RemoteMarkdown({ content, basePath }: RemoteMarkdownProps) {
    return (
        <div className="prose dark:prose-invert max-w-none 
            prose-headings:text-glow prose-headings:uppercase prose-headings:tracking-tighter
            prose-a:text-cyan-600 dark:prose-a:text-cyan-400 hover:prose-a:text-cyan-500 dark:hover:prose-a:text-cyan-300
            prose-strong:text-slate-900 dark:prose-strong:text-white prose-strong:font-bold
            prose-code:text-pink-600 dark:prose-code:text-pink-400 prose-code:bg-pink-400/10 prose-code:px-1 prose-code:rounded
            prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-800
            prose-img:rounded-lg prose-img:border prose-img:border-slate-800
        ">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content}
            </ReactMarkdown>
        </div>
    );
}
