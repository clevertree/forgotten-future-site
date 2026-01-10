'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { MessageSquare, CheckCircle2 } from 'lucide-react';
import { CommentAnchor } from '../components/Feedback/CommentAnchor';
import { CommentPopup } from '../components/Feedback/CommentPopup';
import { SuccessPopup } from '../components/Feedback/SuccessPopup';

export default function MediaPage() {
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
    const [isFeedbackMode, setIsFeedbackMode] = useState(true);
    const [activeComment, setActiveComment] = useState<{ path: string; anchorId: string } | null>(null);
    const [submittedPrUrl, setSubmittedPrUrl] = useState<string | null>(null);

    const images = [
        { src: '/media/teaser/hero_redacted_prophecy.png', title: 'Redacted Prophecy', meta: 'Initial Contact Record' },
        { src: '/media/teaser/hero_synodic_walkers.png', title: 'First Wave', meta: 'The Fallacy Broadcast' },
        { src: '/media/teaser/hero_disintegrating_moon.png', title: 'The Great Fry', meta: 'Day 0 Post-Reset' },
        { src: '/media/teaser/hero_windows_sigh.png', title: 'Windows Sigh', meta: 'Structural Meltdown' },
        { src: '/media/teaser/hero_great_fry.png', title: 'Self-replicating machine', meta: 'Synodic Shard Accumulation' },
        { src: '/media/teaser/hero_lightning_scars.png', title: 'Lightning Scars', meta: 'Electrical Resonance' },
        { src: '/media/teaser/hero_melting_building.png', title: 'Resonance Meltdown', meta: 'Resonance Meltdown' },
        { src: '/media/teaser/hero_pillar_of_fire.png', title: 'Cradle Zero', meta: 'Decade of Revelation' },
        { src: '/media/teaser/hero_incubating_cube.png', title: 'Reincarnation', meta: 'Vessel Synthesis' },
        { src: '/media/teaser/hero_witch_humanoids.png', title: 'The Vanguard', meta: 'Metal Vessel Activation' },
        { src: '/media/teaser/hero_lem_moon.png', title: 'Isolation', meta: 'Lunar Surface Fragment' },
        { src: '/media/teaser/hero_front_bg.png', title: 'The Desert Base', meta: 'Post-Fry Adaptation' },
        { src: '/media/teaser/hero_2_mechanical_white_forest_2.png', title: 'Mechanical Forest', meta: 'Synodic Flora Evolution' },
        { src: '/media/teaser/hero_3_desert_base_3.png', title: 'The Core Technocracy', meta: 'Cradle Zero Outpost' },
        { src: '/media/teaser/ff-title.png', title: 'Logo Concept', meta: 'Official Wuxing Alignment' },
    ];

    const openImage = (index: number) => setSelectedImageIndex(index);
    const closeImage = () => setSelectedImageIndex(null);
    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setSelectedImageIndex((prev) => (prev !== null ? (prev - 1 + images.length) % images.length : null));
    };
    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setSelectedImageIndex((prev) => (prev !== null ? (prev + 1) % images.length : null));
    };

    return (
        <div className="container mx-auto px-6 lg:px-16 py-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-cyan-500/30 pb-8">
                <h1 className="text-3xl md:text-5xl text-glow uppercase tracking-tighter transition-all">RECORDS OF THE REVELATION</h1>

                <div className="flex items-center gap-4 no-print">
                    {submittedPrUrl && (
                        <div className="flex items-center gap-2 text-green-400 text-[10px] uppercase font-bold animate-pulse">
                            <CheckCircle2 size={12} /> PR Created
                        </div>
                    )}
                    <button
                        onClick={() => setIsFeedbackMode(!isFeedbackMode)}
                        className={`flex items-center gap-2 px-6 py-2 rounded-full border transition-all text-[10px] uppercase font-bold tracking-widest ${isFeedbackMode
                                ? 'bg-cyan-500 border-cyan-400 text-black shadow-[0_0_15px_rgba(6,182,212,0.5)]'
                                : 'bg-black border-white/10 text-zinc-500 hover:border-white/30'
                            }`}
                    >
                        <MessageSquare size={12} />
                        {isFeedbackMode ? 'Selection Mode: ON' : 'Feedback Mode'}
                    </button>
                </div>
            </div>

            {/* Featured Teaser Section */}
            <section className="mb-24">
                <h2 className="text-xl md:text-2xl mb-8 border-b border-cyan-500/30 pb-2 uppercase tracking-widest">Animated Teaser</h2>
                <div className="glass-panel p-6 md:p-10">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-2">
                                <h3 className="text-2xl md:text-3xl font-black text-glow uppercase">Stars Die Teaser</h3>
                                <div className="flex">
                                    <span className="text-[10px] bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 px-2 py-0.5 rounded uppercase tracking-[0.2em] animate-pulse">Coming Soon</span>
                                </div>
                            </div>
                            <p className="text-cyan-500 text-sm mb-6 uppercase tracking-widest font-bold">
                                Featuring song by Porcupine Tree • 1995
                            </p>
                            <p className="text-gray-400 mb-8 leading-relaxed">
                                This teaser serves as the atmospheric threshold for the <strong>Forgotten Future</strong> narrative.
                                It depicts the final moments of the Pre-Time era, the shattering of the Moon, and the
                                descent of the stadium-sized Monoliths.
                                <br /><br />
                                <span className="text-zinc-500 italic text-xs">Note: The full animated sequence is currently in production. The records below represent the finalized visual atmosphere and auditory foundation.</span>
                            </p>
                            <div className="bg-zinc-900/80 p-6 rounded-lg border border-white/5">
                                <p className="text-xs text-zinc-500 uppercase tracking-widest mb-4">Teaser Audio Stream</p>
                                <audio controls className="w-full h-8 accent-cyan-500">
                                    <source src="/media/teaser/stars_die.mp3" type="audio/mpeg" />
                                    Your browser does not support the audio element.
                                </audio>
                            </div>
                        </div>
                        <div className="relative aspect-video bg-black rounded-lg overflow-hidden border border-white/10 group">
                            <Image
                                src="/media/teaser/ff-title.png"
                                alt="Forgotten Future Logo"
                                fill
                                className="object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700"
                            />
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <span className="bg-cyan-500/20 text-cyan-400 text-[10px] uppercase tracking-[0.4em] px-4 py-2 border border-cyan-500/30 backdrop-blur-sm">
                                    Visual Preview
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Visual Archive Section */}
            <section className="mb-24">
                <div className="flex items-center justify-between mb-8 border-b border-cyan-500/30 pb-2">
                    <h2 className="text-xl md:text-2xl uppercase tracking-widest">Visual Schematics</h2>
                    <span className="text-[9px] text-zinc-500 uppercase tracking-widest italic opacity-50">May contain visual spoilers</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {images.map((item, i) => {
                        const imageId = item.title.toLowerCase().replace(/[^a-z0-9]/g, '-');
                        return (
                            <CommentAnchor
                                key={i}
                                path="media"
                                anchorId={imageId}
                                isActive={isFeedbackMode}
                                onOpenComment={(path, anchorId) => setActiveComment({ path, anchorId })}
                            >
                                <div className="glass-panel group cursor-pointer overflow-hidden" onClick={() => !isFeedbackMode && openImage(i)}>
                                    <div className="relative aspect-video bg-zinc-900 mb-4 overflow-hidden rounded">
                                        <Image
                                            src={item.src}
                                            alt={item.title}
                                            fill
                                            className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500"
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        />
                                    </div>
                                    <h3 className="text-sm uppercase tracking-widest mb-1 text-cyan-400 group-hover:text-glow transition-all">{item.title}</h3>
                                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest">{item.meta}</p>
                                </div>
                            </CommentAnchor>
                        );
                    })}
                </div>
            </section>

            {/* Full Page Image Viewer */}
            {selectedImageIndex !== null && (
                <div
                    className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12 animate-in fade-in duration-300"
                    onClick={closeImage}
                >
                    <button
                        className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-[110]"
                        onClick={closeImage}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <button
                        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 bg-white/5 hover:bg-white/10 border border-white/10 p-4 rounded-full text-white transition-all z-[110]"
                        onClick={prevImage}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <button
                        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 bg-white/5 hover:bg-white/10 border border-white/10 p-4 rounded-full text-white transition-all z-[110]"
                        onClick={nextImage}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    <div className="relative max-w-6xl w-full h-full flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
                        <div className="relative w-full h-[70vh] flex items-center justify-center">
                            <Image
                                src={images[selectedImageIndex].src}
                                alt={images[selectedImageIndex].title}
                                fill
                                className="object-contain shadow-2xl shadow-cyan-500/10"
                                priority
                                sizes="100vw"
                            />
                        </div>
                        <div className="mt-8 text-center">
                            <h3 className="text-2xl font-bold text-cyan-400 uppercase tracking-widest mb-2">{images[selectedImageIndex].title}</h3>
                            <p className="text-zinc-500 uppercase tracking-[0.2em] text-xs">{images[selectedImageIndex].meta}</p>
                            <p className="mt-4 text-zinc-600 text-[10px] uppercase tracking-widest">{selectedImageIndex + 1} / {images.length}</p>
                        </div>
                    </div>
                </div>
            )}

            {activeComment && (
                <CommentPopup
                    path={activeComment.path}
                    anchorId={activeComment.anchorId}
                    onClose={() => setActiveComment(null)}
                    onSuccess={(url) => {
                        setSubmittedPrUrl(url);
                    }}
                />
            )}

            {submittedPrUrl && (
                <SuccessPopup 
                    prUrl={submittedPrUrl} 
                    onClose={() => setSubmittedPrUrl(null)} 
                />
            )}
        </div>
    );
}

