'use client';

import { useState, useEffect } from 'react';

type StoryVersion = 'YOUNG_ADULT' | '13_PLUS';

export default function VersionSwitch() {
    const [version, setVersion] = useState<StoryVersion>('YOUNG_ADULT');

    useEffect(() => {
        const stored = localStorage.getItem('ff_story_version') as StoryVersion;
        if (stored === '13_PLUS' || stored === 'YOUNG_ADULT') {
            setVersion(stored);
        }
    }, []);

    const toggleVersion = (v: StoryVersion) => {
        setVersion(v);
        localStorage.setItem('ff_story_version', v);
        window.dispatchEvent(new Event('storage'));
        // We also trigger a custom event for easier listening
        window.dispatchEvent(new CustomEvent('versionChange', { detail: v }));
    };

    return (
        <div className="flex gap-2 p-1 bg-zinc-900 border border-white/10 rounded-lg">
            <button
                onClick={() => toggleVersion('YOUNG_ADULT')}
                className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest transition-all rounded ${
                    version === 'YOUNG_ADULT'
                        ? 'bg-cyan-500 text-black'
                        : 'text-zinc-500 hover:text-white'
                }`}
            >
                YA Version
            </button>
            <button
                onClick={() => toggleVersion('13_PLUS')}
                className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest transition-all rounded ${
                    version === '13_PLUS'
                        ? 'bg-cyan-500 text-black'
                        : 'text-zinc-500 hover:text-white'
                }`}
            >
                13+ Version
            </button>
        </div>
    );
}
