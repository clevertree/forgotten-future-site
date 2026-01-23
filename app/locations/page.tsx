'use client';

import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import { ImageModal } from '../components/ImageModal';
import { prefixPath } from '@/lib/utils';
import { InfoCard } from '../components/InfoCard';

interface Location {
    id: string;
    name: string;
    category: string;
    images: { src: string; alt: string }[];
}

const LOCATIONS: Location[] = [
    { 
        id: 'moon', 
        name: 'The Moon', 
        category: 'Celestial', 
        images: [{ src: prefixPath('/media/settings/after-time/moon.png'), alt: 'The Shattered Cradle - Lunar Fragments' }]
    },
    { 
        id: 'fire-city', 
        name: 'Fire City (Cradle Zero)', 
        category: 'Industrial', 
        images: [
            { src: prefixPath('/media/settings/after-time/fire_city.png'), alt: 'Fire City - The Energy Nests' },
            { src: prefixPath('/media/settings/after-time/fire_city2.png'), alt: 'Fire City - Surface Vents' },
            { src: prefixPath('/media/settings/after-time/cradle_zero_as_fire_city.png'), alt: 'Cradle Zero as a Fire City' }
        ]
    },
    { 
        id: 'white-forest', 
        name: 'The White Forest', 
        category: 'Ecological', 
        images: [
            { src: prefixPath('/media/settings/after-time/white_forest.png'), alt: 'The White Forest - Mechanical-Biological Hybrid' },
            { src: prefixPath('/media/settings/after-time/white_forest2.png'), alt: 'White Forest - Internal Glow' }
        ]
    },
    { 
        id: 'northern-villages', 
        name: 'Northern Villages', 
        category: 'Settlement', 
        images: [
            { src: prefixPath('/media/settings/after-time/northern_villages_ait_aman.png'), alt: 'Northern Villages - Ait Aman' },
            { src: prefixPath('/media/settings/after-time/northern_villages.png'), alt: 'Northern Villages - Human Resistance' },
            { src: prefixPath('/media/settings/after-time/northern_villages2.png'), alt: 'Northern Villages - Winter Settlement' }
        ]
    },
    { 
        id: 'megacities', 
        name: 'The Megacities', 
        category: 'Urban', 
        images: [
            { src: prefixPath('/media/settings/after-time/megacities.png'), alt: 'Megacities - Archivist Control Hubs' },
            { src: prefixPath('/media/settings/after-time/megacities2.png'), alt: 'Megacities - Aerial View' }
        ]
    },
    { 
        id: 'dead-zone', 
        name: 'The Equatorial Dead Zone', 
        category: 'Wasteland', 
        images: [{ src: prefixPath('/media/settings/after-time/dead_zone.png'), alt: 'The Dead Zone - Scorched Earth' }]
    },
    { 
        id: 'gorgons', 
        name: 'Gorgon Settlements', 
        category: 'Entity Habitat', 
        images: [
            { src: prefixPath('/media/entities/gorgons/gorgons-landscape.png'), alt: 'Gorgon Builders' },
            { src: prefixPath('/media/entities/gorgons/gorgons-landscape2.png'), alt: 'Gorgon Industrial Site' }
        ]
    },
    { id: 'map1', name: 'Global Projection', category: 'Geography', images: [{ src: prefixPath('/media/geography/map1.png'), alt: 'Global Map of the After Time' }] },
    { id: 'map2', name: 'The Ember Basin', category: 'Geography', images: [{ src: prefixPath('/media/geography/map2.png'), alt: 'Detailed Map of the Ember Basin' }] },
    { id: 'map3', name: 'The High Enclave', category: 'Geography', images: [{ src: prefixPath('/media/geography/map3.png'), alt: 'Topographical Map of the High Enclave' }] },
    { id: 'map4', name: 'Silver Bight Coastline', category: 'Geography', images: [{ src: prefixPath('/media/geography/map4.png'), alt: 'The Silver Bight and White Forest' }] },
    { id: 'map5', name: 'Core Infrastructure', category: 'Geography', images: [{ src: prefixPath('/media/geography/map5.png'), alt: 'Network of Cable Trails and Beacons' }] },
];

export default function LocationsPage() {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [imageIndex, setImageIndex] = useState(0);

    const selectedItem = selectedId
        ? LOCATIONS.find((l) => l.id === selectedId)
        : null;

    const handleNext = useCallback(() => {
        if (!selectedItem) return;
        if (imageIndex < selectedItem.images.length - 1) {
            setImageIndex(imageIndex + 1);
        } else {
            // Go to next location
            const currentIndex = LOCATIONS.findIndex((l) => l.id === selectedId);
            const nextIndex = (currentIndex + 1) % LOCATIONS.length;
            setSelectedId(LOCATIONS[nextIndex].id);
            setImageIndex(0);
        }
    }, [selectedItem, imageIndex, selectedId]);

    const handlePrev = useCallback(() => {
        if (!selectedItem) return;
        if (imageIndex > 0) {
            setImageIndex(imageIndex - 1);
        } else {
            // Go to previous location's last image
            const currentIndex = LOCATIONS.findIndex((l) => l.id === selectedId);
            const prevIndex = (currentIndex - 1 + LOCATIONS.length) % LOCATIONS.length;
            const prevItem = LOCATIONS[prevIndex];
            setSelectedId(prevItem.id);
            setImageIndex(prevItem.images.length - 1);
        }
    }, [selectedItem, imageIndex, selectedId]);

    const handleImageClick = (id: string, index = 0) => {
        setSelectedId(id);
        setImageIndex(index);
    };

    const handleClose = useCallback(() => {
        setSelectedId(null);
        setImageIndex(0);
    }, []);

    const currentImage = selectedItem?.images[imageIndex];

    return (
        <>
            {selectedItem && currentImage && (
                <ImageModal
                    image={{
                        src: currentImage.src,
                        alt: currentImage.alt,
                        title: `${selectedItem.name} ${selectedItem.images.length > 1 ? `(${imageIndex + 1}/${selectedItem.images.length})` : ''}`,
                        meta: currentImage.alt
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
                        <InfoCard
                            title="The Moon"
                            subtitle="The Shattered Cradle"
                            borderColor="border-l-slate-400"
                            subtitleColor="text-slate-400"
                            slideshowImages={LOCATIONS.find(l => l.id === 'moon')?.images}
                            onClick={() => handleImageClick('moon')}
                            description={
                                <p>
                                    No longer a solid sphere, the Moon is a cluster of massive fragments held by erratic gravity. It houses the <strong className="text-white">Farside Cannon</strong> and the <strong className="text-white">Cradle Prime</strong> pyramid, the headquarters for the Archivist Council.
                                </p>
                            }
                        />

                        {/* Fire City */}
                        <InfoCard
                            title="Fire City (Cradle Zero)"
                            subtitle="The Energy Nests"
                            borderColor="border-l-red-600"
                            subtitleColor="text-red-500"
                            slideshowImages={LOCATIONS.find(l => l.id === 'fire-city')?.images}
                            onClick={() => handleImageClick('fire-city')}
                            description={
                                <p>
                                    Burning mountains of technology where machines consolidate energy. These cities stay permanently ionized with arcs of electricity feeding vertical pillars of fire that reach the upper atmosphere.
                                </p>
                            }
                        />

                        {/* White Forest */}
                        <InfoCard
                            title="The White Forest"
                            subtitle="Analog Sanctuary"
                            borderColor="border-l-green-600"
                            subtitleColor="text-green-500"
                            slideshowImages={LOCATIONS.find(l => l.id === 'white-forest')?.images}
                            onClick={() => handleImageClick('white-forest')}
                            description={
                                <p>
                                    A mechanical-biological hybrid ecosystem where white, crystalline trees grow from scavenged metal. It is immune to Archivist signals, serving as the home of <strong className="text-white">Myrr's Analog Sanctuary</strong>.
                                </p>
                            }
                        />

                        {/* Megacities */}
                        <InfoCard
                            title="The Megacities"
                            subtitle="Archivist Control Hubs"
                            borderColor="border-l-blue-400"
                            subtitleColor="text-blue-400"
                            slideshowImages={LOCATIONS.find(l => l.id === 'megacities')?.images}
                            onClick={() => handleImageClick('megacities')}
                            description={
                                <p>
                                    Vast high-tech urban centers established by the Core to maintain order. They represent the "Sterile Sky"—perfectly controlled environments that shield their residents from the chaos of the After Time.
                                </p>
                            }
                        />
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 mt-12">
                        {/* Northern Villages */}
                        <InfoCard
                            title="Northern Villages"
                            subtitle="Human Resistance"
                            borderColor="border-l-amber-600"
                            subtitleColor="text-amber-500"
                            imageHeight="h-32"
                            slideshowImages={LOCATIONS.find(l => l.id === 'northern-villages')?.images}
                            onClick={() => handleImageClick('northern-villages')}
                            description={
                                <p className="text-sm">
                                    Far from the direct heat of the Fire Cities, independent human settlements survive in the shadows, repurposing Synodic tech to endure the smog.
                                </p>
                            }
                        />

                        {/* Equatorial Dead Zone */}
                        <InfoCard
                            title="Equatorial Dead Zone"
                            subtitle="Scorched Territory"
                            borderColor="border-l-zinc-700"
                            subtitleColor="text-zinc-500"
                            imageHeight="h-32"
                            slideshowImages={LOCATIONS.find(l => l.id === 'dead-zone')?.images}
                            onClick={() => handleImageClick('dead-zone')}
                            description={
                                <p className="text-sm">
                                    The vitrified remains of the planet's mid-section, scorched by the initial descent and maintained by the extreme thermal output of Cradle Zero.
                                </p>
                            }
                        />
                    </div>
                </section>

                <section className="mb-20">
                    <h2 className="text-2xl mb-8 border-b border-cyan-500/30 pb-2 uppercase tracking-widest text-cyan-400">Mechanical Ecology</h2>
                    <InfoCard
                        layout="horizontal"
                        title="Gorgons & Synodics"
                        subtitle="Mechanical Entities"
                        borderColor="border-l-violet-500"
                        subtitleColor="text-violet-400"
                        slideshowImages={LOCATIONS.find(l => l.id === 'gorgons')?.images}
                        onClick={() => handleImageClick('gorgons')}
                        description={
                            <>
                                <p>
                                    The landscape is inhabited by <span className="text-white">Synodic entities</span>—from the stadium-sized <strong className="text-white">Monoliths</strong> that dismantle power grids to the nimble <strong className="text-white">Striders</strong> used for patrols.
                                </p>
                                <p>
                                    The <strong className="text-white">Gorgons (Builders)</strong> are wise, metallic mechanical entities engineered on the Moon. They inhabit Fire Cities and pilot Striders, maintaining the infrastructure of the machine world while remaining tethered to the Core's secret Master Lock.
                                </p>
                                <p>
                                    These entities are Fire-aligned, requiring constant heat sources to maintain function, which is why they cluster around the massive energy output of the Fire Cities.
                                </p>
                            </>
                        }
                    />
                </section>

                <section className="mb-20">
                    <h2 className="text-2xl mb-8 border-b border-cyan-500/30 pb-2 uppercase tracking-widest text-cyan-400">Geography & Strategic Maps</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {['map1', 'map2', 'map3', 'map4', 'map5'].map((mapId) => {
                            const map = LOCATIONS.find(l => l.id === mapId);
                            if (!map) return null;
                            const firstImage = map.images[0];
                            return (
                                <div 
                                    key={mapId}
                                    className="group relative cursor-pointer overflow-hidden border border-cyan-500/20 hover:border-cyan-400 transition-all aspect-square bg-slate-900"
                                    onClick={() => handleImageClick(mapId)}
                                >
                                    <Image
                                        src={firstImage.src}
                                        alt={firstImage.alt}
                                        fill
                                        className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 300px"
                                    />
                                    <div className="absolute inset-x-0 bottom-0 p-2 bg-black/80 transform translate-y-full group-hover:translate-y-0 transition-transform">
                                        <p className="text-[10px] uppercase tracking-tighter text-cyan-400 font-bold">{map.name}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="mt-6 p-4 border border-l-4 border-cyan-500/20 border-l-cyan-500 bg-cyan-950/20">
                        <p className="text-sm text-cyan-200/80 italic">
                            Strategic cartography recovered from the Archivist network, detailing the three primary zones: the Ember Basin, the High Enclave, and the Silver Bight.
                        </p>
                    </div>
                </section>

            </div>
        </>
    );
}
