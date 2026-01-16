'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function RedirectHandler() {
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const isPwa = searchParams.get('pwa') === '1';
        if (!isPwa) return;

        const lastReadChapter = localStorage.getItem('ff-last-read-chapter');
        const lastReadEdition = localStorage.getItem('ff-last-read-edition') || 'youngadult';

        if (lastReadChapter) {
            router.replace(`/manuscript/full-text?edition=${lastReadEdition}#${lastReadChapter}`);
        } else {
            router.replace(`/manuscript${lastReadEdition === '13plus' ? '?edition=13plus' : ''}`);
        }
    }, [router, searchParams]);

    return null;
}

export default function PwaRedirect() {
    return (
        <Suspense fallback={null}>
            <RedirectHandler />
        </Suspense>
    );
}
