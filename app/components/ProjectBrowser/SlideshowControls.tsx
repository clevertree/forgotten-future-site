'use client';

import React from 'react';
import { Play, Shuffle, Layers } from 'lucide-react';
import { SlideshowConfig } from './SlideshowPlayer';

interface SlideshowControlsProps {
    config: SlideshowConfig;
    onChangeConfig: (config: SlideshowConfig) => void;
    onStart: () => void;
}

export const SlideshowControls: React.FC<SlideshowControlsProps> = ({ config, onChangeConfig, onStart }) => {
    return (
        <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1 mr-2 px-2 py-1 bg-slate-100 dark:bg-white/5 rounded-lg border border-slate-200 dark:border-white/5">
                <button
                    onClick={() => onChangeConfig({ ...config, random: !config.random })}
                    className={`p-1 rounded transition-colors ${config.random ? 'text-cyan-500 bg-cyan-500/10' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
                    title={config.random ? "Shuffle: ON" : "Shuffle: OFF"}
                >
                    <Shuffle size={14} />
                </button>
                <div className="w-px h-3 bg-slate-300 dark:bg-white/10 mx-1" />
                <button
                    onClick={() => onChangeConfig({ ...config, recursive: !config.recursive })}
                    className={`p-1 rounded transition-colors ${config.recursive ? 'text-cyan-500 bg-cyan-500/10' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
                    title={config.recursive ? "Recursive: ON" : "Recursive: OFF"}
                >
                    <Layers size={14} />
                </button>
            </div>

            <button
                onClick={onStart}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-black hover:bg-cyan-600 dark:hover:bg-cyan-400 transition-all group shadow-lg shadow-cyan-500/10"
                title="Start Slideshow"
            >
                <Play size={14} fill="currentColor" className="group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold uppercase tracking-wider">
                    Play
                </span>
            </button>
        </div>
    );
};
