'use client';

import React from 'react';
import { useFileBrowser } from '@/lib/hooks/useFileBrowser';
import { Sidebar } from './Sidebar';
import { Breadcrumbs } from './Breadcrumbs';
import { FileGrid } from './FileGrid';
import { ContentViewer } from './ContentViewer';

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

    if (loading && !index) {
        return <div className="container mx-auto p-12 text-center text-slate-500 animate-pulse">Initializing Neural Link...</div>;
    }

    if (error) {
        return <div className="container mx-auto p-12 text-center text-red-500">{error}</div>;
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
                <Breadcrumbs slug={slug} />

                {loading ? (
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
        </div>
    );
}
