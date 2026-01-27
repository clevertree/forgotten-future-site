'use client';

import React from 'react';
import { RemoteMarkdown } from '@/app/components/RemoteMarkdown';
import { NavControls } from './NavControls';
import { STORY_REPO_BASE } from '@/lib/remoteFiles';
import { getImageUrl } from '@/lib/browserUtils';

interface ContentViewerProps {
    content: string | null;
    imageLoaded: string | null;
    videoLoaded: string | null;
    metadata: any;
    currentPath: string;
    isViewingFile: boolean;
    prev: string | null;
    next: string | null;
    prevName?: string;
    nextName?: string;
    currentIdx?: number;
    total?: number;
}

export const ContentViewer: React.FC<ContentViewerProps> = ({
    content,
    imageLoaded,
    videoLoaded,
    metadata,
    currentPath,
    isViewingFile,
    prev,
    next,
    prevName,
    nextName,
    currentIdx,
    total
}) => {
    const gitHubLink = `${STORY_REPO_BASE.replace('raw.githubusercontent.com', 'github.com').replace('/main/', '/blob/main/')}${currentPath}`;

    const renderHeader = () => isViewingFile && (
        <NavControls
            prev={prev}
            next={next}
            prevName={prevName}
            nextName={nextName}
            currentIdx={currentIdx}
            total={total}
        />
    );

    const renderFooter = () => isViewingFile && (
        <div className="pt-8 border-t border-slate-200 dark:border-white/5 flex justify-between items-center">
            <span className="text-xs text-slate-500 font-mono tracking-tighter">{currentPath}</span>
            <a
                href={gitHubLink}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-cyan-500 hover:underline"
            >
                Open Original
            </a>
        </div>
    );

    if (content) {
        return (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                {renderHeader()}
                <RemoteMarkdown
                    content={content}
                    basePath={`${STORY_REPO_BASE}${currentPath.includes('/') ? currentPath.split('/').slice(0, -1).join('/') : ''}`}
                />
                {renderFooter()}
            </div>
        );
    }

    if (imageLoaded) {
        return (
            <div className="flex flex-col items-center gap-6 animate-in fade-in zoom-in duration-500">
                {renderHeader()}
                <div className="relative group max-w-4xl w-full">
                    {metadata?._lqip && (
                        <div
                            className="absolute inset-0 blur-2xl scale-105 opacity-50 rounded-2xl"
                            style={{ backgroundImage: `url(${metadata._lqip})`, backgroundSize: 'cover' }}
                        />
                    )}
                    <img
                        src={getImageUrl(imageLoaded, 1200)}
                        alt={currentPath}
                        className="rounded-2xl shadow-2xl border border-slate-200 dark:border-white/10 w-full relative z-10"
                    />
                    <div className="mt-4 flex justify-between items-center px-2">
                        <span className="text-xs text-slate-500 font-mono tracking-tighter">{currentPath}</span>
                        <a
                            href={gitHubLink}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs text-cyan-500 hover:underline"
                        >
                            Open Original
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    if (videoLoaded) {
        return (
            <div className="flex flex-col items-center gap-6 animate-in fade-in zoom-in duration-500">
                {renderHeader()}
                <div className="relative group max-w-4xl w-full">
                    <video
                        src={videoLoaded}
                        controls
                        className="rounded-2xl shadow-2xl border border-slate-200 dark:border-white/10 w-full"
                    />
                    <div className="mt-4 flex justify-between items-center px-2">
                        <span className="text-xs text-slate-500 font-mono tracking-tighter">{currentPath}</span>
                        <a
                            href={gitHubLink}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs text-cyan-500 hover:underline"
                        >
                            Open Original
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    return null;
};
