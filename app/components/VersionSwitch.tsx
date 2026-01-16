'use client';

import React from 'react';
import { ManuscriptVersion } from '../../lib/manuscript';

interface VersionSwitchProps {
    version: ManuscriptVersion;
    onVersionChange: (v: ManuscriptVersion) => void;
}

export const VersionSwitch: React.FC<VersionSwitchProps> = ({ version, onVersionChange }) => {
    return (
        <div className="flex items-center gap-2 bg-black/40 p-1 rounded-lg border border-white/10 no-print">
            <button
                onClick={() => onVersionChange('13plus')}
                className={`px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-widest transition-all ${version === '13plus'
                        ? 'bg-cyan-500 text-black shadow-[0_0_10px_rgba(6,182,212,0.5)]'
                        : 'text-zinc-500 hover:text-zinc-300'
                    }`}
            >
                13+
            </button>
            <button
                onClick={() => onVersionChange('youngadult')}
                className={`px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-widest transition-all ${version === 'youngadult'
                        ? 'bg-purple-500 text-white shadow-[0_0_10px_rgba(168,85,247,0.5)]'
                        : 'text-zinc-500 hover:text-zinc-300'
                    }`}
            >
                Young Adult
            </button>
        </div>
    );
};
