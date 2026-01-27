'use client';

import { useState, useEffect, useMemo } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { STORY_REPO_BASE, getStoryIndex, getStoryFile, FileTree } from '@/lib/remoteFiles';
import { isDir, isImage, isVideo, formatSlug } from '@/lib/browserUtils';

export function useFileBrowser() {
    const params = useParams();
    const searchParams = useSearchParams();
    const [index, setIndex] = useState<FileTree | null>(null);
    const [content, setContent] = useState<string | null>(null);
    const [metadata, setMetadata] = useState<any>(null);
    const [imageLoaded, setImageLoaded] = useState<string | null>(null);
    const [videoLoaded, setVideoLoaded] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const slug = useMemo(() => {
        if (params.slug) return formatSlug(params.slug);
        const pathParam = searchParams.get('path');
        if (pathParam) return pathParam.split('/').filter(Boolean);
        return [];
    }, [params.slug, searchParams]);

    const currentPath = useMemo(() => slug.join('/'), [slug]);

    useEffect(() => {
        async function load() {
            window.scrollTo(0, 0);
            try {
                if (!index) setLoading(true);

                setError(null);
                setImageLoaded(null);
                setVideoLoaded(null);
                setContent(null);
                setMetadata(null);

                const idx = await getStoryIndex();
                setIndex(idx);

                if (currentPath) {
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
                        setLoading(true);
                        try {
                            if (isImage(currentPath)) {
                                setImageLoaded(`${STORY_REPO_BASE}${currentPath}`);
                            } else if (isVideo(currentPath)) {
                                setVideoLoaded(`${STORY_REPO_BASE}${currentPath}`);
                            } else {
                                const fileContent = await getStoryFile(currentPath);
                                setContent(fileContent);
                            }
                        } catch (e) {
                            setError(`Failed to load file: ${currentPath}. It may have been relocated.`);
                        }
                    } else if (ptr) {
                        const possiblePages = ['page.md', 'README.md', 'index.md'];
                        let foundPage = false;
                        for (const page of possiblePages) {
                            if (ptr[page] !== undefined && !isDir(ptr[page])) {
                                setLoading(true);
                                try {
                                    const fileContent = await getStoryFile(`${currentPath}/${page}`);
                                    setContent(fileContent);
                                    foundPage = true;
                                    break;
                                } catch (e) {
                                    // Silently continue to next possible page
                                }
                            }
                        }
                        if (!foundPage) setContent(null);
                    } else {
                        setError(`Resource not found: ${currentPath}`);
                    }
                } else {
                    setContent(null);
                }
            } catch (err) {
                console.error(err);
                if (!index) {
                    setError('Failed to load storage index. Is GitHub up?');
                } else {
                    setError('An unexpected error occurred while browsing.');
                }
            } finally {
                setLoading(false);
            }
        }
        load();
    }, [currentPath, slug, index]);

    const siblings = useMemo(() => {
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

        const siblingFiles = Object.keys(parent)
            .filter(k => k !== '_count' && !isDir(parent[k]))
            .sort();

        const indexInParent = siblingFiles.indexOf(fileName);
        if (indexInParent === -1) return { prev: null, next: null };

        const prevIdx = (indexInParent - 1 + siblingFiles.length) % siblingFiles.length;
        const nextIdx = (indexInParent + 1) % siblingFiles.length;

        const prevPath = [...parentPath, siblingFiles[prevIdx]].join('/');
        const nextPath = [...parentPath, siblingFiles[nextIdx]].join('/');

        return {
            prev: prevPath,
            next: nextPath,
            prevName: siblingFiles[prevIdx],
            nextName: siblingFiles[nextIdx],
            currentIdx: indexInParent + 1,
            total: siblingFiles.length
        };
    }, [index, slug]);

    const navigation = useMemo(() => {
        if (!index) return { currentLevel: null, browsePathSegments: [], browsePath: '', isViewingFile: false, topSections: [] };

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
        const topSections = Object.keys(index).filter(k => k !== '_count' && isDir(index[k]));

        return { currentLevel, browsePathSegments, browsePath, isViewingFile, topSections };
    }, [index, slug, content, imageLoaded, videoLoaded, currentPath]);

    return {
        index,
        content,
        metadata,
        imageLoaded,
        videoLoaded,
        loading,
        error,
        slug,
        currentPath,
        ...siblings,
        ...navigation
    };
}
