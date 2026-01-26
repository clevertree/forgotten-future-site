'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { STORY_REPO_BASE, getStoryIndex, getStoryFile, FileTree } from '@/lib/remoteFiles';
import { RemoteMarkdown } from '../../components/RemoteMarkdown';
import { Folder, File, ChevronRight, Home, Search, ChevronLeft } from 'lucide-react';

export default function BrowserPage() {
    const params = useParams();
    const [index, setIndex] = useState<FileTree | null>(null);
    const [content, setContent] = useState<string | null>(null);
    const [metadata, setMetadata] = useState<any>(null);
    const [imageLoaded, setImageLoaded] = useState<string | null>(null);
    const [videoLoaded, setVideoLoaded] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const slug = useMemo(() => Array.isArray(params.slug) ? params.slug : (params.slug ? [params.slug] : []), [params.slug]);
    const currentPath = slug.join('/');

    // Helper to determine if a value in the tree is a directory
    const isDir = (val: any) => val !== null && typeof val === 'object' && '_count' in val;

    // Get sibling files for navigation
    const getSiblings = () => {
        if (!index || slug.length === 0) return { prev: null, next: null };
        const parentPath = slug.slice(0, -1);
        const fileName = slug[slug.length - 1];
        
        let parent: any = index;
        for (const segment of parentPath) {
            if (parent && typeof parent === 'object' && segment in parent) {
                parent = parent[segment];
            } else {
                return { prev: null, next: null };
            }
        }

        if (!parent || typeof parent !== 'object') return { prev: null, next: null };

        const siblings = Object.keys(parent)
            .filter(k => k !== '_count' && !isDir(parent[k]))
            .sort();

        const indexInParent = siblings.indexOf(fileName);
        if (indexInParent === -1) return { prev: null, next: null };

        const prevIdx = (indexInParent - 1 + siblings.length) % siblings.length;
        const nextIdx = (indexInParent + 1) % siblings.length;

        const prevPath = [...parentPath, siblings[prevIdx]].join('/');
        const nextPath = [...parentPath, siblings[nextIdx]].join('/');

        return {
            prev: prevPath,
            next: nextPath,
            prevName: siblings[prevIdx],
            nextName: siblings[nextIdx],
            currentIdx: indexInParent + 1,
            total: siblings.length
        };
    };

    const { prev, next, prevName, nextName, currentIdx, total } = getSiblings();

    // Helper to determine if a file is an image
    const isImage = (path: string) => /\.(jpg|jpeg|png|gif|svg|webp)$/i.test(path);
    const isVideo = (path: string) => /\.(mp4|webm|ogg)$/i.test(path);

    const getImageUrl = (url: string, width: number = 800) => {
        return `/api/image?path=${encodeURIComponent(url)}&w=${width}`;
    };

    useEffect(() => {
        async function load() {
            try {
                setLoading(true);
                setImageLoaded(null);
                setVideoLoaded(null);
                setContent(null);
                setMetadata(null);
                const idx = await getStoryIndex();
                setIndex(idx);

                if (currentPath) {
                    // Navigate the tree to find if this is a file or directory
                    let ptr: any = idx;
                    let targetIsFile = false;

                    for (const segment of slug) {
                        if (ptr && typeof ptr === 'object' && segment in ptr) {
                            if (!isDir(ptr[segment])) {
                                targetIsFile = true;
                                setMetadata(ptr[segment]);
                                break;
                            }
                            ptr = ptr[segment];
                        } else {
                            ptr = null;
                            break;
                        }
                    }

                    if (targetIsFile) {
                        if (isImage(currentPath)) {
                            setImageLoaded(`${STORY_REPO_BASE}${currentPath}`);
                        } else if (isVideo(currentPath)) {
                            setVideoLoaded(`${STORY_REPO_BASE}${currentPath}`);
                        } else {
                            const fileContent = await getStoryFile(currentPath);
                            setContent(fileContent);
                        }
                    } else if (ptr) {
                        // Directory - check for page.md or README.md
                        const possiblePages = ['page.md', 'README.md', 'index.md'];
                        let foundPage = false;
                        for (const page of possiblePages) {
                            if (ptr[page] !== undefined && !isDir(ptr[page])) {
                                const fileContent = await getStoryFile(`${currentPath}/${page}`);
                                setContent(fileContent);
                                foundPage = true;
                                break;
                            }
                        }
                        if (!foundPage) setContent(null);
                    }
                } else {
                    setContent(null);
                }
            } catch (err) {
                console.error(err);
                setError('Failed to load storage. Is GitHub up?');
            } finally {
                setLoading(false);
            }
        }
        load();
    }, [currentPath, slug]);

    if (loading && !index) {
        return <div className="container mx-auto p-12 text-center text-slate-500 animate-pulse">Initializing Neural Link...</div>;
    }

    // Resolve current navigation level and actual directory base
    let currentLevel: any = index;
    let browsePathSegments: string[] = [];

    for (const segment of slug) {
        if (currentLevel && isDir(currentLevel[segment])) {
            currentLevel = currentLevel[segment];
            browsePathSegments.push(segment);
        } else {
            break;
        }
    }

    const browsePath = browsePathSegments.join('/');
    const isViewingFile = (content !== null || imageLoaded !== null || videoLoaded !== null) && currentPath !== browsePath;

    // Grouping top sections for sidebar
    const topSections = index ? Object.keys(index).filter(k => k !== '_count' && isDir(index[k])) : [];

    const NavControls = () => {
        if (!prev || !next || total <= 1) return null;
        return (
            <div className="flex items-center justify-between w-full max-w-4xl mb-6 bg-white/5 dark:bg-white/5 p-2 rounded-lg border border-slate-200 dark:border-white/5 shadow-sm overflow-hidden">
                <Link 
                    href={`/browser/${prev}`}
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
                    href={`/browser/${next}`}
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

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-slate-50/50 dark:bg-black/20">
            {/* Sidebar */}
            <aside className="w-full md:w-80 border-r border-slate-200 dark:border-white/5 bg-white dark:bg-black/40 backdrop-blur-sm p-6 overflow-y-auto max-h-screen sticky top-0">
                <div className="flex items-center gap-2 mb-8 text-glow uppercase tracking-widest text-sm opacity-70 text-slate-900 dark:text-white">
                    <Search size={14} />
                    <span>Story Explorer</span>
                </div>

                <div className="space-y-1">
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

                {browsePathSegments.length > 0 && currentLevel && (
                    <div className="mt-8 pt-8 border-t border-slate-200 dark:border-white/5">
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

            {/* Main Content */}
            <main className="flex-1 p-6 md:p-12 overflow-x-hidden">
                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-500 mb-8 overflow-x-auto whitespace-nowrap pb-2">
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

                {loading ? (
                    <div className="text-slate-500 dark:text-slate-400 animate-pulse">Decrypting vessel...</div>
                ) : content ? (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        {isViewingFile && <NavControls />}
                        <RemoteMarkdown content={content} basePath={`${STORY_REPO_BASE}${currentPath.includes('/') ? currentPath.split('/').slice(0, -1).join('/') : ''}`} />
                        {isViewingFile && (
                            <div className="pt-8 border-t border-slate-200 dark:border-white/5 flex justify-between items-center">
                                <span className="text-xs text-slate-500 font-mono tracking-tighter">{currentPath}</span>
                                <a 
                                    href={`${STORY_REPO_BASE.replace('raw.githubusercontent.com', 'github.com').replace('/main/', '/blob/main/')}${currentPath}`}
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="text-xs text-cyan-500 hover:underline"
                                >
                                    Open Original
                                </a>
                            </div>
                        )}
                    </div>
                ) : imageLoaded ? (
                    <div className="flex flex-col items-center gap-6 animate-in fade-in zoom-in duration-500">
                        <NavControls />
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
                                    href={imageLoaded.replace('raw.githubusercontent.com', 'github.com').replace('/main/', '/blob/main/')} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="text-xs text-cyan-500 hover:underline"
                                >
                                    Open Original
                                </a>
                            </div>
                        </div>
                    </div>
                ) : videoLoaded ? (
                    <div className="flex flex-col items-center gap-6 animate-in fade-in zoom-in duration-500">
                        <NavControls />
                        <div className="relative group max-w-4xl w-full">
                            <video 
                                src={videoLoaded} 
                                controls 
                                className="rounded-2xl shadow-2xl border border-slate-200 dark:border-white/10 w-full"
                            />
                            <div className="mt-4 flex justify-between items-center px-2">
                                <span className="text-xs text-slate-500 font-mono tracking-tighter">{currentPath}</span>
                                <a 
                                    href={videoLoaded.replace('raw.githubusercontent.com', 'github.com').replace('/main/', '/blob/main/')} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="text-xs text-cyan-500 hover:underline"
                                >
                                    Open Original
                                </a>
                            </div>
                        </div>
                    </div>
                ) : currentLevel ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Object.keys(currentLevel).filter(k => k !== '_count').map(name => {
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
                                    <div className="flex items-center justify-between">
                                        {targetIsDir ? <Folder className="text-cyan-600 dark:text-cyan-500/50 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors" size={20} /> : <File className="text-slate-400 dark:text-slate-500/50" size={20} />}
                                        {targetIsDir && <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-black/40 text-slate-500 dark:text-slate-500">{count} files</span>}
                                        {isImg && <span className="text-[10px] px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400">Image</span>}
                                        {isVid && <span className="text-[10px] px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400">Video</span>}
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

                                    <div className="flex flex-col min-w-0">
                                        {title && (
                                            <span className="text-[11px] text-cyan-600 dark:text-cyan-400 font-medium truncate mb-0.5">
                                                {title}
                                            </span>
                                        )}
                                        <span className="text-sm font-bold text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white truncate">
                                            {name.replace(/-/g, ' ')}
                                        </span>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                ) : (
                    <div className="text-slate-500 dark:text-slate-400 h-64 flex items-center justify-center border border-dashed border-slate-300 dark:border-white/5 rounded-2xl italic">
                        Empty or binary vessel. No readable data found.
                    </div>
                )}
            </main>
        </div>
    );
}
