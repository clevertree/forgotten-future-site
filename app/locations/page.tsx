'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ImageModal } from '../components/ImageModal';
import { prefixPath } from '@/lib/utils';
import { InfoCard } from '../components/InfoCard';

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
                        <InfoCard
                            title="The Moon"
                            subtitle="The Shattered Cradle"
                            borderColor="border-l-slate-400"
                            subtitleColor="text-slate-400"
                            imageSrc={prefixPath('/media/settings/after-time/moon.png')}
                            imageAlt="The Moon - The Shattered Cradle"
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
                            imageSrc={prefixPath('/media/settings/after-time/fire_city.png')}
                            imageAlt="Fire City (Cradle Zero)"
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
                            imageSrc={prefixPath('/media/settings/after-time/white_forest.png')}
                            imageAlt="The White Forest"
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
                            imageSrc={prefixPath('/media/settings/after-time/megacities.png')}
                            imageAlt="The Megacities"
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
                            imageSrc={prefixPath('/media/settings/after-time/northern_villages.png')}
                            imageAlt="Northern Villages"
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
                            imageSrc={prefixPath('/media/settings/after-time/dead_zone.png')}
                            imageAlt="Equatorial Dead Zone"
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
                        imageSrc={prefixPath('/media/entities/gorgons/gorgons-landscape.png')}
                        imageAlt="Gorgons - The Builders"
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

            </div>
        </>
    );
}
