import React, { Suspense } from 'react';
import ProjectBrowser from '../../components/ProjectBrowser/ProjectBrowser';

export function generateStaticParams() {
    return [
        { slug: [] }
    ];
}

export default function BrowserPage() {
    return (
        <Suspense fallback={<div>Loading Browser...</div>}>
            <ProjectBrowser />
        </Suspense>
    );
}
