'use client';

import React from 'react';
import { ManuscriptVersion } from '../../lib/manuscript';

interface VersionSwitchProps {
    version: ManuscriptVersion;
    onVersionChange: (v: ManuscriptVersion) => void;
}

export const VersionSwitch: React.FC<VersionSwitchProps> = ({ version, onVersionChange }) => {
    return (
        <div className="flex items-center gap-2 bg-primary/5 p-1 rounded-lg border border-primary/10 no-print">
            <button
                onClick={() => onVersionChange('13plus')}
                className={`px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-widest transition-all ${version === '13plus'
                    ? 'btn-toggle-active'
                    : 'btn-toggle-inactive'
                    }`}
            >
                13+
            </button>
            <button
                onClick={() => onVersionChange('youngadult')}
                className={`px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-widest transition-all ${version === 'youngadult'
                    ? 'bg-element-ethics text-white shadow-md shadow-element-ethics/50'
                    : 'btn-toggle-inactive'
                    }`}
            >
                Young Adult
            </button>
        </div>
    );
};
