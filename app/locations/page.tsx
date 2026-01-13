'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ImageModal } from '../components/ImageModal';
import { prefixPath } from '@/lib/utils';

interface Location {
    id: string;
    name: string;
    src: string;
    alt: string;
    category: string;
}

const LOCATIONS: Location[] = [
    { id: 'moon', name: 'The Moon', category: 'Celestial', src: prefixPath('/media/settings/after-time/moon.png'), alt: 'The Shattered Cradle - Lunar Fragments' },
    { id: 'fire-city', name: 'Fire City (Cradle Zero)', category: 'Industrial', src: prefixPath('/media/settings/after-time/fire_city.png'), alt: 'Fire City - The Energy Nests' },
    { id: 'white-forest', name: 'The White Forest', category: 'Ecological', src: prefixPath('/media/settings/after-time/white_forest.png'), alt: 'The White Forest - Mechanical-Biological Hybrid' },
    { id: 'northern-villages', name: 'Northern Villages', category: 'Settlement', src: prefixPath('/media/settings/after-time/northern_villages.png'), alt: 'Northern Villages - Human Resistance' },
    { id: 'megacities', name: 'The Megacities', category: 'Urban', src: prefixPath('/media/settings/after-time/megacities.png'), alt: 'Megacities - Archivist Control Hubs' },
    { id: 'dead-zone', name: 'The Equatorial Dead Zone', category: 'Wasteland', src: prefixPath('/media/settings/after-time/dead_zone.png'), alt: 'The Dead Zone - Scorched Earth' },
    { id: 'gorgons', name: 'Gorgon Settlements', category: 'Entity Habitat', src: prefixPath('/media/entities/gorgons/gorgons-landscape.png'), alt: 'Gorgon Builders' },
];

export default function LocationsPage() {
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const selectedItem = selectedId
        ? LOCATIONS.find((l) => l.id === selectedId)
        : null;

    const currentIndex = selectedId ? LOCATIONS.findIndex((l) => l.id === selectedId) : -1;

    const handleNext = () => {
        if (currentIndex < LOCATIONS.length - 1) {
            setSelectedId(LOCATIONS[currentIndex + 1].id);
        } else {
            setSelectedId(LOCATIONS[0].id);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setSelectedId(LOCATIONS[currentIndex - 1].id);
        } else {
            setSelectedId(LOCATIONS[LOCATIONS.length - 1].id);
        }
    };

    const handleImageClick = (id: string) => {
        setSelectedId(id);
    };

    const handleClose = () => {
        setSelectedId(null);
    };

    return (
        <>
            {selectedItem && (
                <ImageModal
                    image={{
                        src: selectedItem.src,
                        alt: selectedItem.alt,
                        title: selectedItem.name
                    }}
                    onClose={handleClose}
                    onNext={handleNext}
                    onPrev={handlePrev}
                />
            )}

            <div className="container mx-auto px-6 py-12 max-w-5xl">
                <h1 className="text-3xl md:text-5xl text-glow uppercase tracking-tighter mb-12">Locations & Environments</h1>

                <section className="mb-20">
                    <h2 className="text-2xl mb-8 border-b border-cyan-500/30 pb-2 uppercase tracking-widest text-cyan-400">The After Time</h2>
                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Moon */}
                        <div className="glass-panel p-6 border-l-4 border-l-slate-400">
                            <div className="relative h-48 mb-6 overflow-hidden rounded bg-black/40 cursor-pointer group" onClick={() => handleImageClick('moon')}>
                                <Image
                                    src={prefixPath('/media/settings/after-time/moon.png')}
                                    alt="The Moon - The Shattered Cradle"
                                    fill
                                    className="object-cover object-center w-full h-full opacity-80 group-hover:opacity-100 transition-opacity"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                    <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity">Explore</span>
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold mb-1">The Moon</h3>
                            <p className="text-sm text-slate-400 uppercase tracking-widest mb-4 font-semibold">The Shattered Cradle</p>
                            <div className="space-y-4 text-gray-300">
                                <p>
                                    No longer a solid sphere, the Moon is a cluster of massive fragments held by erratic gravity. It houses the <strong className="text-white">Farside Cannon</strong> and the <strong className="text-white">Cradle Prime</strong> pyramid, the headquarters for the Archivist Council.
                                </p>
                            </div>
                        </div>

                        {/* Fire City */}
                        <div className="glass-panel p-6 border-l-4 border-l-red-600">
                            <div className="relative h-48 mb-6 overflow-hidden rounded bg-black/40 cursor-pointer group" onClick={() => handleImageClick('fire-city')}>
                                <Image
                                    src={prefixPath('/media/settings/after-time/fire_city.png')}
                                    alt="Fire City (Cradle Zero)"
                                    fill
                                    className="object-cover object-center w-full h-full opacity-80 group-hover:opacity-100 transition-opacity"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                    <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity">Explore</span>
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold mb-1">Fire City (Cradle Zero)</h3>
                            <p className="text-sm text-red-500 uppercase tracking-widest mb-4 font-semibold">The Energy Nests</p>
                            <div className="space-y-4 text-gray-300">
                                <p>
                                    Burning mountains of technology where machines consolidate energy. These cities stay permanently ionized with arcs of electricity feeding vertical pillars of fire that reach the upper atmosphere.
                                </p>
                            </div>
                        </div>

                        {/* White Forest */}
                        <div className="glass-panel p-6 border-l-4 border-l-green-600">
                            <div className="relative h-48 mb-6 overflow-hidden rounded bg-black/40 cursor-pointer group" onClick={() => handleImageClick('white-forest')}>
                                <Image
                                    src={prefixPath('/media/settings/after-time/white_forest.png')}
                                    alt="The White Forest"
                                    fill
                                    className="object-cover object-center w-full h-full opacity-80 group-hover:opacity-100 transition-opacity"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                    <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity">Explore</span>
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold mb-1">The White Forest</h3>
                            <p className="text-sm text-green-500 uppercase tracking-widest mb-4 font-semibold">Analog Sanctuary</p>
                            <div className="space-y-4 text-gray-300">
                                <p>
                                    A mechanical-biological hybrid ecosystem where white, crystalline trees grow from scavenged metal. It is immune to Archivist signals, serving as the home of <strong className="text-white">Myrr's Analog Sanctuary</strong>.
                                </p>
                            </div>
                        </div>

                        {/* Megacities */}
                        <div className="glass-panel p-6 border-l-4 border-l-blue-400">
                            <div className="relative h-48 mb-6 overflow-hidden rounded bg-black/40 cursor-pointer group" onClick={() => handleImageClick('megacities')}>
                                <Image
                                    src={prefixPath('/media/settings/after-time/megacities.png')}
                                    alt="The Megacities"
                                    fill
                                    className="object-cover object-center w-full h-full opacity-80 group-hover:opacity-100 transition-opacity"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                    <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity">Explore</span>
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold mb-1">The Megacities</h3>
                            <p className="text-sm text-blue-400 uppercase tracking-widest mb-4 font-semibold">Archivist Control Hubs</p>
                            <div className="space-y-4 text-gray-300">
                                <p>
                                    Vast high-tech urban centers established by the Core to maintain order. They represent the "Sterile Sky"—perfectly controlled environments that shield their residents from the chaos of the After Time.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mb-20">
                    <h2 className="text-2xl mb-8 border-b border-cyan-500/30 pb-2 uppercase tracking-widest text-cyan-400">Mechanical Ecology</h2>
                    <div className="glass-panel p-8 border-l-4 border-l-violet-500 overflow-hidden relative">
                        <div className="flex flex-col md:flex-row gap-8 items-start">
                            <div className="md:w-1/3 relative h-64 overflow-hidden rounded bg-black/40 cursor-pointer group" onClick={() => handleImageClick('gorgons')}>
                                <Image
                                    src={prefixPath('/media/entities/gorgons/gorgons-landscape.png')}
                                    alt="Gorgons - The Builders"
                                    fill
                                    className="object-cover object-top w-full h-full opacity-80 group-hover:opacity-100 transition-opacity"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                    <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity">Explore</span>
                                </div>
                            </div>
                            <div className="md:w-2/3">
                                <h3 className="text-2xl font-bold mb-1">Gorgons & Synodics</h3>
                                <p className="text-sm text-violet-400 uppercase tracking-widest mb-4 font-semibold">Mechanical Entities</p>
                                <div className="space-y-4 text-gray-300 leading-relaxed">
                                    <p>
                                        The landscape is inhabited by <span className="text-white">Synodic entities</span>—from the stadium-sized <strong className="text-white">Monoliths</strong> that dismantle power grids to the nimble <strong className="text-white">Striders</strong> used for patrols.
                                    </p>
                                    <p>
                                        The <strong className="text-white">Gorgons (Builders)</strong> are wise, metallic mechanical entities engineered on the Moon. They inhabit Fire Cities and pilot Striders, maintaining the infrastructure of the machine world while remaining tethered to the Core's secret Master Lock.
                                    </p>
                                    <p>
                                        These entities are Fire-aligned, requiring constant heat sources to maintain function, which is why they cluster around the massive energy output of the Fire Cities.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mb-20 grid md:grid-cols-2 gap-8">
                    <div className="glass-panel p-6 border-l-4 border-l-amber-600">
                         <div className="relative h-32 mb-6 overflow-hidden rounded bg-black/40 cursor-pointer group" onClick={() => handleImageClick('northern-villages')}>
                                <Image
                                    src={prefixPath('/media/settings/after-time/northern_villages.png')}
                                    alt="Northern Villages"
                                    fill
                                    className="object-cover object-center w-full h-full opacity-80 group-hover:opacity-100 transition-opacity"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                    <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity">Explore</span>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold mb-1">Northern Villages</h3>
                            <p className="text-xs text-amber-500 uppercase tracking-widest mb-4 font-semibold">Human Resistance</p>
                            <p className="text-gray-300 text-sm">
                                Far from the direct heat of the Fire Cities, independent human settlements survive in the shadows, repurposing Synodic tech to endure the smog.
                            </p>
                    </div>

                    <div className="glass-panel p-6 border-l-4 border-l-zinc-700">
                         <div className="relative h-32 mb-6 overflow-hidden rounded bg-black/40 cursor-pointer group" onClick={() => handleImageClick('dead-zone')}>
                                <Image
                                    src={prefixPath('/media/settings/after-time/dead_zone.png')}
                                    alt="Equatorial Dead Zone"
                                    fill
                                    className="object-cover object-center w-full h-full opacity-80 group-hover:opacity-100 transition-opacity"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                    <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity">Explore</span>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold mb-1">Equatorial Dead Zone</h3>
                            <p className="text-xs text-zinc-500 uppercase tracking-widest mb-4 font-semibold">Scorched Territory</p>
                            <p className="text-gray-300 text-sm">
                                The vitrified remains of the planet's mid-section, scorched by the initial descent and maintained by the extreme thermal output of Cradle Zero.
                            </p>
                    </div>
                </section>
            </div>
        </>
    );
}
