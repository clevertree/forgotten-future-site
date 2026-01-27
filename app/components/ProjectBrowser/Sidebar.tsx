'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Folder, Home, Search, ChevronRight } from 'lucide-react';
import { FileTree } from '@/lib/remoteFiles';
import { isDir } from '@/lib/browserUtils';

interface SidebarProps {
    index: FileTree | null;
    browsePath: string;
    browsePathSegments: string[];
    topSections: string[];
    currentLevel: any;
}

export const Sidebar: React.FC<SidebarProps> = ({
    index,
    browsePath,
    browsePathSegments,
    topSections,
    currentLevel
}) => {
    const router = useRouter();
    const [isSectionOpen, setIsSectionOpen] = useState(false);
    const [isSubDirOpen, setIsSubDirOpen] = useState(false);

    return (
        <aside className="w-full md:w-80 border-r border-slate-200 dark:border-white/5 bg-white dark:bg-black/40 backdrop-blur-sm p-6 md:overflow-y-auto max-h-screen sticky top-0 z-40">
            <div className="flex items-center gap-2 mb-8 text-glow uppercase tracking-widest text-sm opacity-70 text-slate-900 dark:text-white">
                <Search size={14} />
                <span>Project Browser</span>
            </div>

            <div className="hidden md:flex md:flex-col space-y-1">
                <Link href="/browser" className={`flex items-center gap-2 px-3 py-2 rounded transition-colors ${!browsePath ? 'bg-cyan-500/20 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5'}`}>
                    <Home size={16} />
                    <span>Root</span>
                    <span className="ml-auto text-[10px] opacity-40">({index?._count || 0})</span>
                </Link>

                {topSections.map(section => {
                    const sectionData = (index as any)[section];
                    const active = browsePathSegments[0] === section;
                    const count = sectionData?._count || 0;
                    const title = sectionData?._title;
                    return (
                        <Link
                            key={section}
                            href={`/browser/${section}`}
                            className={`flex items-center gap-2 px-3 py-2 rounded transition-colors ${active ? 'bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 font-bold' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5'}`}
                        >
                            <Folder size={16} className={active ? 'text-cyan-600 dark:text-cyan-400' : 'text-slate-400 dark:text-slate-500'} />
                            <span className="capitalize">{title || section.replace(/-/g, ' ')}</span>
                            <span className="ml-auto text-[10px] opacity-40">({count})</span>
                        </Link>
                    );
                })}
            </div>

            {/* Mobile Navigation Dropdowns */}
            <div className="md:hidden space-y-6">
                <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-slate-500 px-1 opacity-60">Navigate Section</label>
                    <div className="relative">
                        <button
                            onClick={() => setIsSectionOpen(!isSectionOpen)}
                            className="w-full flex items-center justify-between bg-background dark:bg-black/40 border border-foreground/10 rounded-xl p-4 text-sm outline-none focus:ring-2 focus:ring-cyan-500/30 transition-all font-medium text-foreground"
                        >
                            <div className="flex items-center gap-2">
                                <Home size={16} className="text-cyan-500" />
                                <span>
                                    {browsePathSegments[0]
                                        ? ((index as any)?.[browsePathSegments[0]]?._title || browsePathSegments[0].replace(/-/g, ' '))
                                        : "Root Explorer"}
                                </span>
                            </div>
                            <ChevronRight className={`transition-transform duration-300 ${isSectionOpen ? 'rotate-90' : 'rotate-0'}`} size={16} />
                        </button>

                        {isSectionOpen && (
                            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl shadow-2xl z-[100] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                                <div className="max-h-[60vh] overflow-y-auto py-2">
                                    <button
                                        onClick={() => { router.push('/browser'); setIsSectionOpen(false); }}
                                        className={`w-full text-left px-4 py-3 text-sm hover:bg-cyan-500/10 transition-colors flex items-center justify-between ${!browsePath ? 'text-cyan-600 dark:text-cyan-400 font-bold bg-cyan-500/5' : 'text-slate-600 dark:text-slate-400'}`}
                                    >
                                        <span>Root Explorer</span>
                                        <span className="text-[10px] opacity-40">({index?._count || 0})</span>
                                    </button>
                                    {topSections.map(section => {
                                        const sectionData = (index as any)[section];
                                        const active = browsePathSegments[0] === section;
                                        const count = sectionData?._count || 0;
                                        const title = sectionData?._title;
                                        return (
                                            <button
                                                key={section}
                                                onClick={() => { router.push(`/browser/${section}`); setIsSectionOpen(false); }}
                                                className={`w-full text-left px-4 py-3 text-sm hover:bg-cyan-500/10 transition-colors flex items-center justify-between ${active ? 'text-cyan-600 dark:text-cyan-400 font-bold bg-cyan-500/5' : 'text-slate-600 dark:text-slate-400'}`}
                                            >
                                                <span className="capitalize">{title || section.replace(/-/g, ' ')}</span>
                                                <span className="text-[10px] opacity-40">({count})</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {browsePathSegments.length > 0 && currentLevel && Object.keys(currentLevel).some(k => k !== '_count' && isDir(currentLevel[k])) && (
                    <div className="space-y-1 animate-in slide-in-from-top-2 duration-300">
                        <label className="text-[10px] uppercase tracking-widest text-cyan-600 dark:text-cyan-500 px-1 font-bold">In This Directory</label>
                        <div className="relative">
                            <button
                                onClick={() => setIsSubDirOpen(!isSubDirOpen)}
                                className="w-full flex items-center justify-between bg-cyan-500/5 dark:bg-cyan-500/10 border border-cyan-500/20 dark:border-cyan-500/20 rounded-xl p-4 text-sm outline-none focus:ring-2 focus:ring-cyan-500/30 transition-all font-bold text-cyan-600 dark:text-cyan-400"
                            >
                                <div className="flex items-center gap-2 truncate">
                                    <Folder size={16} />
                                    <span>Explore Sub-folders</span>
                                </div>
                                <ChevronRight className={`transition-transform duration-300 ${isSubDirOpen ? 'rotate-90' : 'rotate-0'}`} size={16} />
                            </button>

                            {isSubDirOpen && (
                                <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 border border-cyan-500/20 dark:border-white/10 rounded-xl shadow-2xl z-[100] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                                    <div className="max-h-[60vh] overflow-y-auto py-2">
                                        <button
                                            onClick={() => { router.push(`/browser/${browsePathSegments.slice(0, -1).join('/')}`); setIsSubDirOpen(false); }}
                                            className="w-full text-left px-4 py-3 text-sm text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                                        >
                                            ... Back to Parent
                                        </button>
                                        {Object.keys(currentLevel).filter(k => k !== '_count' && isDir(currentLevel[k])).map(name => {
                                            const path = browsePath ? `${browsePath}/${name}` : name;
                                            const sectionData = currentLevel[name];
                                            const count = sectionData?._count || 0;
                                            const title = sectionData?._title;
                                            return (
                                                <button
                                                    key={name}
                                                    onClick={() => { router.push(`/browser/${path}`); setIsSubDirOpen(false); }}
                                                    className="w-full text-left px-4 py-3 text-sm text-slate-700 dark:text-slate-300 hover:bg-cyan-500/10 transition-colors flex items-center justify-between"
                                                >
                                                    <span className="truncate">{title || name.replace(/-/g, ' ')}</span>
                                                    <span className="text-[10px] opacity-40 flex-shrink-0">({count})</span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {browsePathSegments.length > 0 && currentLevel && Object.keys(currentLevel).some(k => k !== '_count' && isDir(currentLevel[k])) && (
                <div className="hidden md:block mt-8 pt-8 border-t border-slate-200 dark:border-white/5">
                    <div className="px-3 mb-2 text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-500">Sub-Directories</div>
                    <div className="space-y-1">
                        {Object.keys(currentLevel).filter(k => k !== '_count' && isDir(currentLevel[k])).map(name => {
                            const path = browsePath ? `${browsePath}/${name}` : name;
                            const active = browsePathSegments.includes(name);
                            const sectionData = currentLevel[name];
                            const count = sectionData?._count || 0;
                            const title = sectionData?._title;
                            return (
                                <Link
                                    key={name}
                                    href={`/browser/${path}`}
                                    className={`flex items-center gap-2 px-3 py-1.5 rounded text-sm transition-colors ${active ? 'text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'}`}
                                >
                                    <ChevronRight size={12} className={active ? 'rotate-90' : ''} />
                                    <span>{title || name.replace(/-/g, ' ')}</span>
                                    <span className="ml-auto text-[10px] opacity-30">({count})</span>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            )}
        </aside>
    );
};
