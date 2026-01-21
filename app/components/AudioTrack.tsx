'use client';

import React from 'react';
import { prefixPath } from '@/lib/utils';

interface AudioTrackProps {
    title: string;
    description: string;
    path: string;
    artist?: string;
}

export const AudioTrack: React.FC<AudioTrackProps> = ({ title, description, path, artist = 'Protricity' }) => {
    return (
        <div className="glass-panel p-6 border-l-4 border-l-cyan-500 hover:bg-white/[0.03] transition-colors">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex-1">
                    <h3 className="text-lg font-bold uppercase tracking-wider text-cyan-400 mb-1">{title}</h3>
                    <p className="text-sm text-gray-500 italic mb-2 md:mb-1">{description}</p>
                    <a
                        href="https://soundcloud.com/ari-asulin"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] text-cyan-500/60 uppercase tracking-widest hover:text-cyan-400 transition-colors flex items-center gap-1"
                    >
                        Artist: {artist}
                    </a>
                </div>
                <div className="w-full md:w-96">
                    <audio controls className="w-full h-8 accent-cyan-500">
                        <source src={prefixPath(path)} type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
                </div>
            </div>
        </div>
    );
};
