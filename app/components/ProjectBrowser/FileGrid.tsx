'use client';

import React from 'react';
import Link from 'next/link';
import { Folder, File } from 'lucide-react';
import { STORY_REPO_BASE } from '@/lib/remoteFiles';
import { isDir, isImage, isVideo, getImageUrl } from '@/lib/browserUtils';

interface FileGridProps {
    currentLevel: any;
    browsePath: string;
}

export const FileGrid: React.FC<FileGridProps> = ({ currentLevel, browsePath }) => {
    if (!currentLevel) {
        return (
            <div className="text-slate-500 dark:text-slate-400 h-64 flex items-center justify-center border border-dashed border-slate-300 dark:border-white/5 rounded-2xl italic">
                Empty or binary vessel. No readable data found.
            </div>
        );
    }

    const items = Object.keys(currentLevel).filter(k => k !== '_count');

    if (items.length === 0) {
        return (
            <div className="text-slate-500 dark:text-slate-400 h-32 flex items-center justify-center border border-dashed border-slate-300 dark:border-white/5 rounded-2xl italic">
                No files found.
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map(name => {
                const value = currentLevel[name];
                const targetIsDir = isDir(value);
                const path = browsePath ? `${browsePath}/${name}` : name;
                const count = targetIsDir ? value?._count : 0;
                const title = value?._title;
                const lqip = value?._lqip;
                const isImg = !targetIsDir && isImage(name);
                const isVid = !targetIsDir && isVideo(name);

                return (
                    <Link
                        key={name}
                        href={`/browser/${path}`}
                        className="group p-4 rounded-xl border border-slate-200 dark:border-white/5 bg-white dark:bg-white/[0.02] hover:bg-slate-50 dark:hover:bg-white/[0.05] hover:border-cyan-500/30 transition-all flex flex-col gap-3 shadow-sm hover:shadow-md dark:shadow-none"
                    >
                        <div className="flex items-center justify-between gap-2 overflow-hidden">
                            <div className="flex items-center gap-2 min-w-0 flex-1">
                                {targetIsDir ? (
                                    <Folder
                                        className="text-cyan-600 dark:text-cyan-500/50 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors shrink-0"
                                        size={20}
                                    />
                                ) : (
                                    <File className="text-slate-400 dark:text-slate-500/50 shrink-0" size={20} />
                                )}
                                <span className="text-sm font-bold text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white truncate">
                                    {name.replace(/-/g, ' ')}
                                </span>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                                {targetIsDir && (
                                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-black/40 text-slate-500 dark:text-slate-500">
                                        {count} files
                                    </span>
                                )}
                                {isImg && (
                                    <span className="text-[10px] px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400">
                                        Image
                                    </span>
                                )}
                                {isVid && (
                                    <span className="text-[10px] px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400">
                                        Video
                                    </span>
                                )}
                            </div>
                        </div>

                        {isImg && (
                            <div className="aspect-video w-full relative rounded-lg overflow-hidden border border-slate-100 dark:border-white/5 bg-slate-900/5 dark:bg-black/20">
                                {lqip && (
                                    <div
                                        className="absolute inset-0 blur-xl scale-110 opacity-50"
                                        style={{ backgroundImage: `url(${lqip})`, backgroundSize: 'cover' }}
                                    />
                                )}
                                <img
                                    src={getImageUrl(`${STORY_REPO_BASE}${path}`, 400)}
                                    alt={name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 relative z-10"
                                    loading="lazy"
                                />
                            </div>
                        )}

                        {isVid && (
                            <div className="aspect-video w-full relative rounded-lg overflow-hidden border border-slate-100 dark:border-white/5 bg-slate-900/5 dark:bg-black/20 flex items-center justify-center">
                                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                                    <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-purple-500 border-b-[8px] border-b-transparent ml-1" />
                                </div>
                            </div>
                        )}

                        {title && (
                            <div className="flex flex-col min-w-0">
                                <span className="text-[11px] text-cyan-600 dark:text-cyan-400 font-medium truncate">
                                    {title}
                                </span>
                            </div>
                        )}
                    </Link>
                );
            })}
        </div>
    );
};
