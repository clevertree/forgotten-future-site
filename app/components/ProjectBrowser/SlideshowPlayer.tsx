'use client';

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { X, Play, Pause, ChevronLeft, ChevronRight, Settings2, ImageIcon, Maximize, Minimize } from 'lucide-react';
import { STORY_REPO_BASE } from '@/lib/remoteFiles';
import { getImageUrl } from '@/lib/browserUtils';

export interface SlideshowConfig {
    recursive: boolean;
    random: boolean;
    animate: boolean;
    interval: number;
}

interface SlideshowPlayerProps {
    images: string[];
    onClose: () => void;
    config: SlideshowConfig;
    onChangeConfig: (config: SlideshowConfig) => void;
}

const ANIMATIONS = [
    'animate-ken-burns-zoom-in',
    'animate-ken-burns-zoom-out',
    'animate-ken-burns-pan-right',
    'animate-ken-burns-pan-left',
];

export const SlideshowPlayer: React.FC<SlideshowPlayerProps> = ({
    images,
    onClose,
    config,
    onChangeConfig
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [showControls, setShowControls] = useState(true);
    const [lastInteraction, setLastInteraction] = useState(Date.now());
    const [queue, setQueue] = useState<number[]>([]);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Watch for fullscreen changes (e.g. Esc key)
    useEffect(() => {
        const handleFsChange = () => setIsFullscreen(!!document.fullscreenElement);
        document.addEventListener('fullscreenchange', handleFsChange);
        return () => document.removeEventListener('fullscreenchange', handleFsChange);
    }, []);

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            containerRef.current?.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    };

    // Initialize or reshuffle queue when config or images change
    useEffect(() => {
        let newQueue = Array.from({ length: images.length }, (_, i) => i);
        if (config.random) {
            for (let i = newQueue.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [newQueue[i], newQueue[j]] = [newQueue[j], newQueue[i]];
            }
        }
        setQueue(newQueue);
        setCurrentIndex(0);
    }, [config.random, images.length]);

    const nextSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    }, [images.length]);

    const prevSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    }, [images.length]);

    useEffect(() => {
        if (!isPlaying || images.length === 0) return;
        const timer = setInterval(nextSlide, config.interval * 1000);
        return () => clearInterval(timer);
    }, [isPlaying, nextSlide, config.interval, images.length]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === ' ') setIsPlaying(!isPlaying);
            if (e.key === 'ArrowRight') nextSlide();
            if (e.key === 'ArrowLeft') prevSlide();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose, isPlaying, nextSlide, prevSlide]);

    // Handle idle UI fading
    useEffect(() => {
        const interval = setInterval(() => {
            if (Date.now() - lastInteraction > 3000) {
                setShowControls(false);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [lastInteraction]);

    const handleInteraction = () => {
        setShowControls(true);
        setLastInteraction(Date.now());
    };

    const currentImageIdx = queue[currentIndex] ?? 0;
    const currentImagePath = images[currentImageIdx];
    const nextImageIdx = queue[(currentIndex + 1) % images.length] ?? 0;
    const nextImagePath = images[nextImageIdx];

    // Pick a deterministic but seemingly random animation for each index
    const animationClass = useMemo(() => {
        if (!config.animate) return '';
        return ANIMATIONS[currentImageIdx % ANIMATIONS.length];
    }, [currentImageIdx, config.animate]);

    if (images.length === 0) {
        return (
            <div className="fixed inset-0 z-[2000] bg-black flex flex-col items-center justify-center text-slate-400 p-6">
                <ImageIcon size={64} className="mb-4 opacity-20" />
                <h2 className="text-xl font-bold text-white mb-2">No Images Found</h2>
                <p className="text-sm opacity-60">Try changing the search scope to recursive.</p>
                <button
                    onClick={onClose}
                    className="mt-8 px-6 py-2 rounded-full border border-white/20 hover:bg-white/10 transition-colors"
                >
                    Close Slideshow
                </button>
            </div>
        );
    }

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[2000] bg-black overflow-hidden cursor-none"
            style={{ cursor: showControls ? 'default' : 'none' }}
            onMouseMove={handleInteraction}
            onClick={handleInteraction}
        >
            {/* Background images for cross-fade */}
            <div className="absolute inset-0 z-0">
                {images.map((img, idx) => {
                    const isActive = idx === currentImageIdx;
                    return (
                        <div
                            key={img}
                            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${isActive ? 'opacity-100' : 'opacity-0'}`}
                            style={{
                                backgroundImage: `url(${getImageUrl(STORY_REPO_BASE + img, 1920)})`,
                                backgroundSize: 'contain',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                '--slideshow-duration': `${config.interval}s`
                            } as any}
                        >
                            {isActive && (
                                <div className={`w-full h-full ${animationClass}`}
                                    style={{
                                        backgroundImage: `url(${getImageUrl(STORY_REPO_BASE + img, 1920)})`,
                                        backgroundSize: 'contain',
                                        backgroundPosition: 'center',
                                        backgroundRepeat: 'no-repeat'
                                    }}
                                />
                            )}
                        </div>
                    );
                })}
            </div>

            {/* UI Overlays */}
            <div className={`absolute inset-0 z-10 transition-opacity duration-500 bg-gradient-to-t from-black/60 via-transparent to-black/60 pointer-events-none ${showControls ? 'opacity-100' : 'opacity-0'}`} />

            {/* Top Bar */}
            <div className={`absolute top-0 left-0 right-0 z-20 p-6 flex items-center justify-between transition-transform duration-500 ${showControls ? 'translate-y-0' : '-translate-y-full'}`}>
                <div className="flex flex-col">
                    <span className="text-white font-bold text-lg tracking-tight drop-shadow-lg">
                        {currentImagePath.split('/').pop()?.replace(/-/g, ' ')}
                    </span>
                    <span className="text-white/40 text-xs font-mono">
                        {currentIndex + 1} / {images.length} • {currentImagePath}
                    </span>
                </div>
                <button
                    onClick={onClose}
                    className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-md pointer-events-auto"
                >
                    <X size={24} />
                </button>
            </div>

            {/* Controls Bar */}
            <div className={`absolute bottom-0 left-0 right-0 z-20 p-8 flex flex-col items-center gap-6 transition-transform duration-500 ${showControls ? 'translate-y-0' : 'translate-y-full'}`}>
                <div className="flex items-center gap-8 pointer-events-auto">
                    <button onClick={prevSlide} className="text-white/60 hover:text-white transition-colors">
                        <ChevronLeft size={48} />
                    </button>
                    <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="w-20 h-20 rounded-full bg-cyan-500 hover:bg-cyan-400 text-black flex items-center justify-center transition-all shadow-xl shadow-cyan-500/20"
                    >
                        {isPlaying ? <Pause size={40} fill="currentColor" /> : <Play size={40} fill="currentColor" className="ml-2" />}
                    </button>
                    <button onClick={nextSlide} className="text-white/60 hover:text-white transition-colors">
                        <ChevronRight size={48} />
                    </button>
                </div>

                <div className="flex items-center gap-4 bg-black/40 backdrop-blur-xl p-4 rounded-2xl border border-white/10 pointer-events-auto">
                    <div className="flex items-center gap-2 px-3 border-r border-white/10">
                        <span className="text-[10px] uppercase font-bold text-white/40">Speed</span>
                        <select
                            value={config.interval}
                            onChange={(e) => onChangeConfig({ ...config, interval: Number(e.target.value) })}
                            className="bg-transparent text-white text-sm outline-none cursor-pointer"
                        >
                            {[3, 5, 8, 10, 15, 30].map(v => <option key={v} value={v} className="bg-slate-900">{v}s</option>)}
                        </select>
                    </div>

                    <label className="flex items-center gap-2 px-3 border-r border-white/10 cursor-pointer group">
                        <input
                            type="checkbox"
                            checked={config.random}
                            onChange={(e) => onChangeConfig({ ...config, random: e.target.checked })}
                            className="hidden"
                        />
                        <span className={`text-[10px] uppercase font-bold transition-colors ${config.random ? 'text-cyan-400' : 'text-white/40'}`}>Shuffle</span>
                    </label>

                    <label className="flex items-center gap-2 px-3 border-r border-white/10 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={config.recursive}
                            onChange={(e) => onChangeConfig({ ...config, recursive: e.target.checked })}
                            className="hidden"
                        />
                        <span className={`text-[10px] uppercase font-bold transition-colors ${config.recursive ? 'text-cyan-400' : 'text-white/40'}`}>Recursive</span>
                    </label>

                    <label className="flex items-center gap-2 px-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={config.animate}
                            onChange={(e) => onChangeConfig({ ...config, animate: e.target.checked })}
                            className="hidden"
                        />
                        <span className={`text-[10px] uppercase font-bold transition-colors ${config.animate ? 'text-cyan-400' : 'text-white/40'}`}>Animation</span>
                    </label>

                    <button
                        onClick={toggleFullscreen}
                        className="flex items-center gap-2 px-3 border-l border-white/10 text-white/40 hover:text-cyan-400 transition-colors"
                        title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
                    >
                        {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
                        <span className="text-[10px] uppercase font-bold">Fullscreen</span>
                    </button>
                </div>
            </div>
        </div>
    );
};
