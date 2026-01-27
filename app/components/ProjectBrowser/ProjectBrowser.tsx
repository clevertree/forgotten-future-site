'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useFileBrowser } from '@/lib/hooks/useFileBrowser';
import { Sidebar } from './Sidebar';
import { Breadcrumbs } from './Breadcrumbs';
import { FileGrid } from './FileGrid';
import { ContentViewer } from './ContentViewer';
import { SlideshowControls } from './SlideshowControls';
import { SlideshowPlayer, SlideshowConfig } from './SlideshowPlayer';
import { getAllImages, getBrowserLink } from '@/lib/browserUtils';
import Link from 'next/link';

const DEFAULT_CONFIG: SlideshowConfig = {
    recursive: true,
    random: false,
    animate: true,
    interval: 8,
};

export default function ProjectBrowser() {
    const {
        index,
        content,
        metadata,
        imageLoaded,
        videoLoaded,
        loading,
        error,
        slug,
        currentPath,
        currentLevel,
        browsePathSegments,
        browsePath,
        isViewingFile,
        topSections,
        prev,
        next,
        prevName,
        nextName,
        currentIdx,
        total
    } = useFileBrowser();

    const [isSlideshowActive, setIsSlideshowActive] = useState(false);
    const [config, setConfig] = useState<SlideshowConfig>(DEFAULT_CONFIG);

    // Persist and load config
    useEffect(() => {
        const saved = localStorage.getItem('ff-slideshow-config');
        if (saved) {
            try {
                setConfig(JSON.parse(saved));
            } catch (e) {
                console.error('Failed to load slideshow config', e);
            }
        }
    }, []);

    const updateConfig = (newConfig: SlideshowConfig) => {
        setConfig(newConfig);
        localStorage.setItem('ff-slideshow-config', JSON.stringify(newConfig));
    };

    // Auto-pause slideshow on navigation
    useEffect(() => {
        setIsSlideshowActive(false);
    }, [slug]);

    const slideshowImages = useMemo(() => {
        if (!index) return [];
        // If we are at root, collect all. If deep, collect from currentLevel.
        return getAllImages(currentLevel || index, browsePath, config.recursive);
    }, [index, currentLevel, browsePath, config.recursive]);

    if (loading && !index) {
        return <div className="container mx-auto p-12 text-center text-slate-500 animate-pulse">Initializing Neural Link...</div>;
    }

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-slate-50/50 dark:bg-black/20">
            <Sidebar
                index={index}
                browsePath={browsePath}
                browsePathSegments={browsePathSegments}
                topSections={topSections}
                currentLevel={currentLevel}
            />

            <main className="flex-1 p-6 md:p-12 overflow-x-hidden">
                <div className="flex items-start justify-between gap-4 mb-8">
                    <div className="min-w-0 flex-1">
                        <Breadcrumbs slug={slug} />
                    </div>
                    <div className="shrink-0 pt-0.5">
                        <SlideshowControls
                            config={config}
                            onChangeConfig={updateConfig}
                            onStart={() => setIsSlideshowActive(true)}
                        />
                    </div>
                </div>

                {error ? (
                    <div className="container mx-auto p-12 text-center">
                        <div className="text-red-500 mb-4 font-mono text-sm">{error}</div>
                        <Link 
                            href={getBrowserLink()}
                            className="text-xs text-cyan-500 hover:underline"
                        >
                            Back to Root
                        </Link>
                    </div>
                ) : loading ? (
                    <div className="text-slate-500 dark:text-slate-400 animate-pulse">Decrypting vessel...</div>
                ) : (content || imageLoaded || videoLoaded) ? (
                    <ContentViewer
                        content={content}
                        imageLoaded={imageLoaded}
                        videoLoaded={videoLoaded}
                        metadata={metadata}
                        currentPath={currentPath}
                        isViewingFile={isViewingFile}
                        prev={prev}
                        next={next}
                        prevName={prevName}
                        nextName={nextName}
                        currentIdx={currentIdx}
                        total={total}
                    />
                ) : (
                    <FileGrid
                        currentLevel={currentLevel}
                        browsePath={browsePath}
                    />
                )}
            </main>

            {isSlideshowActive && (
                <SlideshowPlayer
                    images={slideshowImages}
                    onClose={() => setIsSlideshowActive(false)}
                    config={config}
                    onChangeConfig={updateConfig}
                />
            )}
        </div>
    );
}
