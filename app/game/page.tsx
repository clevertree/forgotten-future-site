'use client';

import React from 'react';
import { Gamepad2, Monitor, Smartphone, Cpu, Music, Server, Zap, Users, Layers, Box, Target, Camera } from 'lucide-react';
import { prefixPath } from '@/lib/utils';
import { AudioTrack } from '../components/AudioTrack';

export default function GamePage() {
    const songs = [
        {
            path: '/media/game/songs/Ambient_Forest.mp3',
            title: 'Ambient Forest',
            description: 'Song concept for White Forest and the electric snake'
        },
        {
            path: '/media/game/songs/Forgotten_Future_-_Desolation_Title_Theme.mp3',
            title: 'Desolation Title Theme',
            description: 'Song concept for title theme'
        },
        {
            path: '/media/game/songs/Forgotten_Future_-_Intro_Mission_Demo.mp3',
            title: 'Intro Mission Demo',
            description: 'Song concept for moon mission theme at beginning of story'
        },
        {
            path: '/media/game/songs/MMX2_Bubble_Crab_-_Sea.mp3',
            title: 'Deep Sea Exploration',
            description: 'Song concept inspired by the BubbleCrab level in the game Mega Man X2 which might appear in a location only featured in the game and just mentioned in the book'
        },
        {
            path: '/media/game/songs/Traveling_in_Rain_Original_2005.mp3',
            title: 'Traveling in Rain',
            description: 'Song concept for traveling'
        }
    ];

    return (
        <div className="container mx-auto px-6 lg:px-16 py-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-cyan-500/30 pb-8">
                <h1 className="text-3xl md:text-5xl text-glow uppercase tracking-tighter transition-all flex items-center gap-4">
                    <Gamepad2 className="text-cyan-400" size={40} />
                    Game Concept
                </h1>
            </div>

            {/* Vision Section */}
            <section className="mb-24">
                <h2 className="text-xl md:text-2xl mb-8 border-b border-cyan-500/30 pb-2 uppercase tracking-widest">The Multi-Platform Vision</h2>
                <div className="glass-panel p-8 md:p-12 mb-12">
                    <p className="text-[rgb(var(--foreground-secondary-rgb))] text-lg leading-relaxed mb-8">
                        The world of <strong>Forgotten Future</strong> is designed to be experienced beyond the written word.
                        Our long-term goal is to develop a comprehensive game that translates the atmospheric tension,
                        complex moral choices, and unique tech-noir aesthetic into an interactive format.
                    </p>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="flex flex-col items-center p-6 bg-[rgb(var(--foreground-rgb))]/5 rounded-xl border border-[rgb(var(--foreground-rgb))]/10 text-center">
                            <Monitor className="text-cyan-600 dark:text-cyan-400 mb-4" size={32} />
                            <h3 className="uppercase tracking-widest font-bold mb-2">PC & Console</h3>
                            <p className="text-sm text-[rgb(var(--foreground-muted-rgb))]">High-fidelity environments and immersive record of the Great Fry's aftermath.</p>
                        </div>
                        <div className="flex flex-col items-center p-6 bg-[rgb(var(--foreground-rgb))]/5 rounded-xl border border-[rgb(var(--foreground-rgb))]/10 text-center">
                            <Smartphone className="text-cyan-600 dark:text-cyan-400 mb-4" size={32} />
                            <h3 className="uppercase tracking-widest font-bold mb-2">Mobile</h3>
                            <p className="text-sm text-[rgb(var(--foreground-muted-rgb))]">Strategic deployment and narrative expansion via mobile-optimized interfaces.</p>
                        </div>
                        <div className="flex flex-col items-center p-6 bg-[rgb(var(--foreground-rgb))]/5 rounded-xl border border-[rgb(var(--foreground-rgb))]/10 text-center">
                            <Cpu className="text-cyan-600 dark:text-cyan-400 mb-4" size={32} />
                            <h3 className="uppercase tracking-widest font-bold mb-2">Cloud Integration</h3>
                            <p className="text-sm text-[rgb(var(--foreground-muted-rgb))]">A persistent world that evolves across all platforms using cloud-based narrative state.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Engine Section */}
            <section className="mb-24">
                <h2 className="text-xl md:text-2xl mb-8 border-b border-cyan-500/30 pb-2 uppercase tracking-widest flex items-center gap-3">
                    <Server className="text-cyan-600 dark:text-cyan-400" size={24} />
                    Distributed Rendering Architecture
                </h2>
                <div className="grid lg:grid-cols-2 gap-12">
                    <div className="space-y-8">
                        <p className="text-[rgb(var(--foreground-muted-rgb))] leading-relaxed">
                            We are developing a paradigm-shifting game engine where rendering and world-state management
                            are split between a high-performance server and the local client. By streaming assets and
                            logical states in real-time, we unlock features impossible in traditional engines.
                        </p>

                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <Users className="text-cyan-600 dark:text-cyan-400 shrink-0" size={24} />
                                <div>
                                    <h4 className="font-bold uppercase tracking-wider text-sm mb-1">Inherent Multiplayer & Scalability</h4>
                                    <p className="text-xs text-[rgb(var(--foreground-muted-rgb))]">Every session is inherently networked. Players are assigned to characters in a descending order of priority, starting with the primary protagonists, allowing for seamless collaborative storytelling.</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <Layers className="text-cyan-600 dark:text-cyan-400 shrink-0" size={24} />
                                <div>
                                    <h4 className="font-bold uppercase tracking-wider text-sm mb-1">Simultaneous Location Rendering</h4>
                                    <p className="text-xs text-[rgb(var(--foreground-muted-rgb))]">The engine can render 2, 3, or 4+ disparate locations on a single screen simultaneously. Witness events unfolding across the globe in real-time without context switching.</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <Zap className="text-cyan-600 dark:text-cyan-400 shrink-0" size={24} />
                                <div>
                                    <h4 className="font-bold uppercase tracking-wider text-sm mb-1">Zero Loading Times</h4>
                                    <p className="text-xs text-[rgb(var(--foreground-muted-rgb))]">The split-rendering model ensures that assets are always ready. There are no loading screens, transitions, or interruptions to the narrative flow.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="glass-panel p-8 flex flex-col justify-center border-l-cyan-600/30 dark:border-l-cyan-500/50 border-l-4">
                        <h3 className="text-xl font-black text-glow uppercase mb-4">Hybrid Deployment</h3>
                        <p className="text-sm text-[rgb(var(--foreground-muted-rgb))] mb-6 italic">
                            "The engine adapts to the hardware, not the other way around."
                        </p>
                        <ul className="space-y-4 text-sm">
                            <li className="flex gap-3 text-[rgb(var(--foreground-secondary-rgb))]">
                                <span className="text-cyan-600 dark:text-cyan-400">•</span>
                                <div>
                                    <strong>Low-Powered Devices:</strong> Utilize free public edge-servers to handle the heavy lifting of state and resource management.
                                </div>
                            </li>
                            <li className="flex gap-3 text-[rgb(var(--foreground-secondary-rgb))]">
                                <span className="text-cyan-600 dark:text-cyan-400">•</span>
                                <div>
                                    <strong>High-Powered Systems:</strong> Multi-threaded desktop rigs can run both the server and client locally for maximum performance and offline redundancy.
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Mechanics Section */}
            <section className="mb-24">
                <h2 className="text-xl md:text-2xl mb-8 border-b border-cyan-500/30 pb-2 uppercase tracking-widest flex items-center gap-3">
                    <Box className="text-cyan-600 dark:text-cyan-400" size={24} />
                    Perspective & Motion
                </h2>
                <div className="glass-panel p-8 md:p-12">
                    <div className="grid lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-2">
                            <h3 className="text-2xl font-black text-glow uppercase mb-6 flex items-center gap-3">
                                <span className="text-cyan-600 dark:text-cyan-400">Beyond 2.5D</span>
                            </h3>
                            <p className="text-[rgb(var(--foreground-secondary-rgb))] leading-relaxed mb-6">
                                <strong>Forgotten Future</strong> hopes to redefine the platforming experience through a "3D-capable 2D" framework.
                                While motion is primarily locked to a two-dimensional axis (horizontal and vertical), the world
                                and characters exist in a fully realized 3D space, allowing for radical shifts in perspective.
                            </p>
                            <div className="grid sm:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400">
                                        <Camera size={18} />
                                        <h4 className="font-bold uppercase tracking-tight text-sm">Dynamic 3rd Person</h4>
                                    </div>
                                    <p className="text-xs text-[rgb(var(--foreground-muted-rgb))] leading-relaxed">Most gameplay adopts a traditional sideview perspective of the protagonist, focusing on precision movement and environmental navigation.</p>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400">
                                        <Target size={18} />
                                        <h4 className="font-bold uppercase tracking-tight text-sm">Universal Tracking</h4>
                                    </div>
                                    <p className="text-xs text-[rgb(var(--foreground-muted-rgb))] leading-relaxed">The character possesses a unique <strong>Focusing Ability</strong> that can lock onto any object in the 3D environment, regardless of direction.</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-[rgb(var(--foreground-rgb))]/5 p-6 rounded-lg border border-[rgb(var(--foreground-rgb))]/10 space-y-6">
                            <h4 className="text-xs font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400 border-b border-cyan-500/10 pb-2">Technical Maneuver: Focus Rotation</h4>
                            <p className="text-xs text-[rgb(var(--foreground-muted-rgb))] leading-relaxed">
                                When Focus is activated, the camera dynamically shifts behind the protagonist,
                                rotating in full 3D space to track the target's movement.
                                This creates a seamless transition between platforming and situational "POV" tracking.
                            </p>
                            <div className="flex justify-center py-4">
                                <div className="relative w-16 h-16 border border-cyan-500/20 rounded-full flex items-center justify-center">
                                    <div className="absolute inset-0 border-t border-cyan-500 animate-spin" />
                                    <Target className="text-cyan-600 dark:text-cyan-500/50" size={32} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Audio Archive Section */}
            <section className="mb-24">
                <h2 className="text-xl md:text-2xl mb-8 border-b border-cyan-500/30 pb-2 uppercase tracking-widest flex items-center gap-3">
                    <Music className="text-cyan-600 dark:text-cyan-400" size={24} />
                    Auditory Concepts
                </h2>
                <p className="text-[rgb(var(--foreground-muted-rgb))] mb-12">
                    These compositions serve as the tonal foundation for the interactive experience.
                    Each track corresponds to specific narrative beats or environmental concepts from the manuscript.
                </p>

                <div className="space-y-6">
                    {songs.map((song, index) => (
                        <AudioTrack
                            key={index}
                            title={song.title}
                            description={song.description}
                            path={song.path}
                        />
                    ))}
                </div>
            </section>

            <section className="text-center py-12 border-t border-[rgb(var(--foreground-rgb))]/10">
                <p className="text-[rgb(var(--foreground-muted-rgb))] text-xs uppercase tracking-[0.4em] mb-4">Development Status: Iterative Prototype Phasing</p>
                <div className="inline-block px-4 py-1 border border-cyan-500/20 rounded-full">
                    <span className="text-cyan-600 dark:text-cyan-400 text-[10px] uppercase font-bold tracking-widest">Active Research & Development</span>
                </div>
            </section>
        </div>
    );
}
