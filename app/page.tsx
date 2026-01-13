'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { prefixPath } from '@/lib/utils';

export default function Home() {
    const images = [
        prefixPath('/media/teaser/hero_front_bg.png'),
        prefixPath('/media/teaser/hero_lem_moon.png'),
        prefixPath('/media/teaser/hero_incubating_cube.png'),
        prefixPath('/media/teaser/hero_witch_humanoids.png'),
        prefixPath('/media/teaser/hero_melting_building.png')
    ];
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 6000); // 6 second fade interval
        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className="flex flex-col items-center">
            {/* Hero Section */}
            <section className="relative w-full h-[70vh] md:h-[80vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    {images.map((src, i) => (
                        <div
                            key={src}
                            className={`absolute inset-0 transition-opacity duration-[3000ms] mix-blend-overlay ${i === currentIndex ? 'opacity-100' : 'opacity-0'
                                }`}
                        >
                            <Image
                                src={src}
                                alt="Atmospheric Background"
                                fill
                                priority={i === 0}
                                className="object-cover"
                                sizes="100vw"
                            />
                        </div>
                    ))}
                    <div className="absolute inset-0 bg-gradient-to-b from-cyan-900/10 via-black/60 to-black"></div>
                </div>
                <div className="z-10 w-full max-w-2xl p-6 md:p-10 rounded-2xl bg-black/40 backdrop-blur-[4px] border border-white/5">
                    <h1 className="text-3xl md:text-5xl font-black mb-4 tracking-tighter text-glow">
                        STARS DIE
                    </h1>
                    <p className="text-sm md:text-lg text-gray-400 mb-8 tracking-wide max-w-xl mx-auto leading-relaxed">
                        A thousand years of human history, erased in a single Cataclysm.
                        A new Dark Age has begun.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
                        <Link href="/manuscript" className="px-8 py-3 md:py-4 bg-cyan-500 text-black font-bold uppercase tracking-widest hover:bg-cyan-400 transition-all text-sm md:text-base">
                            Read Manuscript
                        </Link>
                        <Link href="/story" className="px-8 py-3 md:py-4 border border-white/20 hover:bg-white/10 font-bold uppercase tracking-widest transition-all text-sm md:text-base">
                            Explore Lore
                        </Link>
                    </div>
                </div>
            </section>

            {/* Development Status */}
            <section className="w-full max-w-7xl mx-auto px-6 -mt-8 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Story Status */}
                    <div className="glass-panel group hover:border-cyan-500/30 transition-all">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-zinc-400 text-xs font-bold uppercase tracking-widest">Repository: Story</h3>
                            <span className="text-[10px] bg-cyan-500/10 text-cyan-500 px-2 py-0.5 rounded border border-cyan-500/20">v0.9.2</span>
                        </div>
                        <div className="space-y-3 mb-6">
                            <div className="text-[10px] text-zinc-500 font-mono leading-tight">
                                <div className="flex gap-2">
                                    <span className="text-cyan-500/50">a4cc73d</span>
                                    <span className="truncate">v0.9.2: Sync chapter counts and metadata</span>
                                </div>
                                <div className="flex gap-2">
                                    <span className="text-cyan-500/50">d42abbe</span>
                                    <span className="truncate">Add COMMIT_HISTORY.md and update Copilot instructions</span>
                                </div>
                                <div className="flex gap-2">
                                    <span className="text-cyan-500/50">e88a195</span>
                                    <span className="truncate">Add Chapter 79 and update manuscript, synopsis, and planning docs</span>
                                </div>
                            </div>
                        </div>
                        <a href="https://github.com/clevertree/ff-story/commits/main/" target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold text-cyan-500 uppercase tracking-widest hover:text-cyan-400 inline-flex items-center gap-2">
                            GitHub Source <span className="text-lg">→</span>
                        </a>
                    </div>

                    {/* Teaser Status */}
                    <div className="glass-panel group hover:border-cyan-500/30 transition-all">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-zinc-400 text-xs font-bold uppercase tracking-widest">Repository: Teaser</h3>
                            <span className="text-[10px] bg-cyan-500/10 text-cyan-500 px-2 py-0.5 rounded border border-cyan-500/20">v0.9.2</span>
                        </div>
                        <div className="space-y-3 mb-6">
                            <div className="text-[10px] text-zinc-500 font-mono leading-tight">
                                <div className="flex gap-2">
                                    <span className="text-cyan-500/50">c9e4b01</span>
                                    <span className="truncate">v0.9.2: Sync chapter counts and metadata</span>
                                </div>
                                <div className="flex gap-2">
                                    <span className="text-cyan-500/50">1c42552</span>
                                    <span className="truncate">Add COMMIT_HISTORY.md and update Copilot instructions</span>
                                </div>
                                <div className="flex gap-2">
                                    <span className="text-cyan-500/50">5b67a57</span>
                                    <span className="truncate">Update Copilot instructions and bump version</span>
                                </div>
                            </div>
                        </div>
                        <a href="https://github.com/clevertree/ff-teaser/commits/main/" target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold text-cyan-500 uppercase tracking-widest hover:text-cyan-400 inline-flex items-center gap-2">
                            GitHub Source <span className="text-lg">→</span>
                        </a>
                    </div>

                    {/* Website Status */}
                    <div className="glass-panel group hover:border-cyan-500/30 transition-all">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-zinc-400 text-xs font-bold uppercase tracking-widest">Repository: Site</h3>
                            <span className="text-[10px] bg-cyan-500/10 text-cyan-500 px-2 py-0.5 rounded border border-cyan-500/20">v0.9.4</span>
                        </div>
                        <div className="space-y-3 mb-6">
                            <div className="text-[10px] text-zinc-500 font-mono leading-tight">
                                <div className="flex gap-2">
                                    <span className="text-cyan-500/50">...</span>
                                    <span className="truncate">v0.9.4: Fix Chapter 79 synchronization and development status</span>
                                </div>
                                <div className="flex gap-2">
                                    <span className="text-cyan-500/50">f0bf24a</span>
                                    <span className="truncate">Sync manuscript chapters and update settings structure</span>
                                </div>
                                <div className="flex gap-2">
                                    <span className="text-cyan-500/50">cc1426b</span>
                                    <span className="truncate">Add COMMIT_HISTORY.md and update Copilot instructions</span>
                                </div>
                            </div>
                        </div>
                        <a href="https://github.com/clevertree/forgotten-future-site/commits/master/" target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold text-cyan-500 uppercase tracking-widest hover:text-cyan-400 inline-flex items-center gap-2">
                            GitHub Source <span className="text-lg">→</span>
                        </a>
                    </div>
                </div>
            </section>

            {/* Narrative Intro */}
            <section className="container mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center">
                <div className="glass-panel">
                    <h2 className="text-3xl mb-6">The Great Fry</h2>
                    <p className="text-gray-300 leading-relaxed mb-6">
                        When the Moon shattered, it wasn't just stone that fell. The Lunar Capacitor discharge—the event now known as
                        the <strong>Great Fry</strong>—incinerated the electronic foundations of our world. A hundred thousand years
                        of data, culture, and history vanished in a blinding flash.
                    </p>
                    <p className="text-gray-300 leading-relaxed">
                        In the aftermath, the <strong>Archivists</strong> emerged from the shadows of the Technocratic Core,
                        offering a new world of "no want and no pain." But their utopia is built on a lie: the
                        <strong>Thousand-Year Fallacy</strong>, a rewritten history designed to keep humanity in a state of
                        contented amnesia.
                    </p>
                </div>
                <div className="relative aspect-square bg-gray-900 rounded-lg overflow-hidden border border-white/10">
                    <Image
                        src={prefixPath('/media/teaser/hero_great_fry.png')}
                        alt="The Great Fry"
                        fill
                        className="absolute inset-0 w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                </div>
            </section>

            {/* The Elements */}
            <section className="w-full bg-zinc-900/50 py-24">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl md:text-4xl text-center mb-16 underline decoration-cyan-500 underline-offset-8">THE FIVE ELEMENTS</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
                        {[
                            { name: 'LEM', element: 'Wood', desc: 'Hidden in suburban anonymity until the Cataclysm revealed his nature.' },
                            { name: 'RAHU', element: 'Fire', desc: 'The exiled broadcast of the Moon, twisted into the Archivists\' propaganda.' },
                            { name: 'LYNN', element: 'Water', desc: 'Her software legacy remains as a spectral guide in the Aether-Drive.' },
                            { name: 'TOR', element: 'Earth', desc: 'A general whose obedience shattered with the Moon, now a wanderer seeking purpose.' },
                            { name: 'METAL', element: 'Order', desc: 'Shared-consciousness enforcers led by Tor and Rahu. Physically powerful, but devoid of individual spirits.' }
                        ].map((vessel) => (
                            <div key={vessel.name} className="glass-panel text-center">
                                <h3 className="text-xl mb-2">{vessel.name}</h3>
                                <span className="text-xs text-cyan-500 uppercase tracking-[0.2em] mb-4 block">{vessel.element}</span>
                                <p className="text-sm text-gray-400 leading-relaxed">{vessel.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="container mx-auto px-6 py-24 text-center">
                <h2 className="text-3xl mb-8">Witness the Revelation</h2>
                <p className="max-w-xl mx-auto text-gray-400 mb-12">
                    Forgotten Future is an AI-driven sci-fi novel and cross-media project.
                    Join us as we document the transition from the After Time to the final reincarnation.
                </p>
                <Link href="/media" className="text-cyan-400 hover:text-cyan-300 font-bold uppercase tracking-widest transition-colors">
                    View Teaser & Media →
                </Link>
            </section>
        </div>
    );
}
