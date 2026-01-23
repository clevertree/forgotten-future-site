'use client';

import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import { MessageSquare, CheckCircle2 } from 'lucide-react';
import { CommentAnchor } from '../components/Feedback/CommentAnchor';
import { CommentPopup } from '../components/Feedback/CommentPopup';
import { SuccessPopup } from '../components/Feedback/SuccessPopup';
import { ImageModal } from '../components/ImageModal';
import { prefixPath } from '../../lib/utils';
import { AudioTrack } from '../components/AudioTrack';

export default function MediaPage() {
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
    const [isFeedbackMode, setIsFeedbackMode] = useState(false);
    const [activeComment, setActiveComment] = useState<{ path: string; anchorId: string } | null>(null);
    const [submittedPrUrl, setSubmittedPrUrl] = useState<string | null>(null);

    const isStatic = process.env.NEXT_PUBLIC_IS_STATIC === 'true';

    const images = [
        { src: prefixPath('/media/teaser/hero_redacted_prophecy.png'), title: 'Redacted Prophecy', meta: 'Initial Contact Record' },
        { src: prefixPath('/media/teaser/hero_synodic_walkers.png'), title: 'First Wave', meta: 'The Fallacy Broadcast' },
        { src: prefixPath('/media/teaser/hero_disintegrating_moon.png'), title: 'The Great Fry', meta: 'Day 0 Post-Reset' },
        { src: prefixPath('/media/teaser/hero_windows_sigh.png'), title: 'Windows Sigh', meta: 'Structural Meltdown' },
        { src: prefixPath('/media/teaser/hero_great_fry.png'), title: 'Self-replicating machine', meta: 'Synodic Shard Accumulation' },
        { src: prefixPath('/media/teaser/hero_lightning_scars.png'), title: 'Lightning Scars', meta: 'Electrical Resonance' },
        { src: prefixPath('/media/teaser/hero_melting_building.png'), title: 'Resonance Meltdown', meta: 'Resonance Meltdown' },
        { src: prefixPath('/media/teaser/hero_pillar_of_fire.png'), title: 'Cradle Zero', meta: 'Decade of Revelation' },
        { src: prefixPath('/media/teaser/hero_incubating_cube.png'), title: 'Reincarnation', meta: 'Vessel Synthesis' },
        { src: prefixPath('/media/teaser/hero_witch_humanoids.png'), title: 'The Vanguard', meta: 'Metal Vessel Activation' },
        { src: prefixPath('/media/teaser/hero_lem_moon.png'), title: 'Isolation', meta: 'Lunar Surface Fragment' },
        { src: prefixPath('/media/teaser/hero_front_bg.png'), title: 'The Desert Base', meta: 'Post-Fry Adaptation' },
        { src: prefixPath('/media/teaser/hero_2_mechanical_white_forest_2.png'), title: 'Mechanical Forest', meta: 'Synodic Flora Evolution' },
        { src: prefixPath('/media/teaser/hero_3_desert_base_3.png'), title: 'The Core Technocracy', meta: 'Cradle Zero Outpost' },
        { src: prefixPath('/media/teaser/ff-title.png'), title: 'Logo Concept', meta: 'Official Wuxing Alignment' },
    ];

    const openImage = (index: number) => setSelectedImageIndex(index);
    const closeImage = useCallback(() => setSelectedImageIndex(null), []);

    const handleNext = useCallback(() => {
        setSelectedImageIndex((prev) => (prev !== null ? (prev + 1) % images.length : null));
    }, [images.length]);

    const handlePrev = useCallback(() => {
        setSelectedImageIndex((prev) => (prev !== null ? (prev - 1 + images.length) % images.length : null));
    }, [images.length]);

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
                    {!isStatic && (
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
                    )}
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
                            <div className="mt-8">
                                <AudioTrack
                                    title="Stars Die"
                                    description="Teaser Audio Stream • Porcupine Tree (1995)"
                                    path="/media/teaser/stars_die.mp3"
                                    artist="Porcupine Tree"
                                />
                            </div>
                        </div>
                        <div
                            className="relative aspect-video bg-black rounded-lg overflow-hidden border border-white/10 group cursor-pointer"
                            onClick={() => openImage(images.length - 1)}
                        >
                            <Image
                                src={prefixPath('/media/teaser/ff-title.png')}
                                alt="Forgotten Future Logo"
                                fill
                                className="object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                            />
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <span className="bg-cyan-500/20 text-cyan-400 text-[10px] uppercase tracking-[0.4em] px-4 py-2 border border-cyan-500/30 backdrop-blur-sm group-hover:bg-cyan-500/40 transition-colors">
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
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
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
                <ImageModal
                    image={{
                        src: images[selectedImageIndex].src,
                        alt: images[selectedImageIndex].title,
                        title: images[selectedImageIndex].title,
                        meta: images[selectedImageIndex].meta
                    }}
                    onClose={closeImage}
                    onNext={handleNext}
                    onPrev={handlePrev}
                />
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

