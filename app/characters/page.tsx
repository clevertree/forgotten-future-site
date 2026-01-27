'use client';

import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import { ImageModal } from '../components/ImageModal';
import { InfoCard } from '../components/InfoCard';
import { prefixPath } from '@/lib/utils';

interface Character {
    id: string;
    name: string;
    category: string;
    images: { src: string; alt: string }[];
}

const CHARACTERS: Character[] = [
    {
        id: 'ren',
        name: 'Ren',
        category: 'Vessel',
        images: [
            { src: prefixPath('/media/characters/lem/lem-landscape.png'), alt: 'Ren - Wood Vessel' },
            { src: prefixPath('/media/characters/lem/lem-landscape-variant.png'), alt: 'Ren - Wood Vessel (Variant)' },
            { src: prefixPath('/media/characters/lem/lem-landscape-variant2.png'), alt: 'Ren - Wood Vessel (Variant 2)' }
        ]
    },
    {
        id: 'lynn',
        name: 'Lynn',
        category: 'Vessel',
        images: [
            { src: prefixPath('/media/characters/lynn/lynn-landscape.png'), alt: 'Lynn - Water Vessel' },
            { src: prefixPath('/media/characters/lynn/lynn-landscape2.png'), alt: 'Lynn - Water Vessel (Alt)' },
            { src: prefixPath('/media/characters/lynn/lynn-zenith.png'), alt: 'Lynn - Zenith Form' },
            { src: prefixPath('/media/characters/lynn/lynn-fragments.png'), alt: 'Lynn - Fragments' },
            { src: prefixPath('/media/characters/lynn/lynn-zero.png'), alt: 'Lynn - Cradle Zero' },
            { src: prefixPath('/media/characters/lynn/lynn-nexus.png'), alt: 'Lynn - Nexus Connection' },
            { src: prefixPath('/media/characters/lynn/lynn-reset.png'), alt: 'Lynn - Reset' },
            { src: prefixPath('/media/characters/lynn/lynn-blackout.png'), alt: 'Lynn - Blackout' }
        ]
    },
    {
        id: 'rahu',
        name: 'Rahu',
        category: 'Vessel',
        images: [
            { src: prefixPath('/media/characters/rahu/rahu-landscape.png'), alt: 'Rahu - Fire Vessel' },
            { src: prefixPath('/media/characters/rahu/rahu-landscape2.png'), alt: 'Rahu - Fire Vessel (Alt)' },
            { src: prefixPath('/media/characters/rahu/rahu-landscape3.png'), alt: 'Rahu - Fire Vessel (Landscape 3)' },
            { src: prefixPath('/media/characters/rahu/rahu-landscape4.png'), alt: 'Rahu - Fire Vessel (Landscape 4)' },
            { src: prefixPath('/media/characters/rahu/rahu-nexus.png'), alt: 'Rahu - Nexus Form' },
            { src: prefixPath('/media/characters/rahu/rahu-duel.png'), alt: 'Rahu - The Duel' },
            { src: prefixPath('/media/characters/rahu/rahu-ambush.png'), alt: 'Rahu - Ambush' },
            { src: prefixPath('/media/characters/rahu/rahu-sacrifice.png'), alt: 'Rahu - Sacrifice' },
            { src: prefixPath('/media/characters/rahu/rahu-colonization.png'), alt: 'Rahu - Colonization' }
        ]
    },
    {
        id: 'tor',
        name: 'Tor',
        category: 'Vessel',
        images: [
            { src: prefixPath('/media/characters/tor/tor-landscape.png'), alt: 'Tor - Earth Vessel' },
            { src: prefixPath('/media/characters/tor/tor-ambush.png'), alt: 'Tor - Ambush' },
            { src: prefixPath('/media/characters/tor/tor-descent.png'), alt: 'Tor - Descent' },
            { src: prefixPath('/media/characters/tor/tor-nexus.png'), alt: 'Tor - Nexus' }
        ]
    },
    {
        id: 'arlo',
        name: 'Arlo',
        category: 'Survivor',
        images: [
            { src: prefixPath('/media/characters/arlo/arlo-landscape.png'), alt: 'Arlo - The Tech-Welder' },
            { src: prefixPath('/media/characters/arlo/arlo-portrait.png'), alt: 'Arlo - Portrait' },
            { src: prefixPath('/media/characters/arlo/arlo-landscape2.png'), alt: 'Arlo - Scavenging' },
            { src: prefixPath('/media/characters/arlo/arlo-pillar.png'), alt: 'Arlo at the Pillar' },
            { src: prefixPath('/media/characters/arlo/arlo-entry.png'), alt: 'Arlo - Entry' }
        ]
    },
    {
        id: 'cassia_vane',
        name: 'Cassia Vane',
        category: 'Archivist',
        images: [
            { src: prefixPath('/media/characters/cassia_vane/cassia_vane-landscape.png'), alt: 'Cassia Vane' },
            { src: prefixPath('/media/characters/cassia_vane/cassia_vane_landscape2.png'), alt: 'Cassia Vane - Analytical' },
            { src: prefixPath('/media/characters/cassia_vane/cassia-awakened.png'), alt: 'Cassia - Awakened' },
            { src: prefixPath('/media/characters/cassia_vane/cassia-emmisary.png'), alt: 'Cassia - Core Emissary' }
        ]
    },
    {
        id: 'elowen',
        name: 'Elowen',
        category: 'Architect',
        images: [
            { src: prefixPath('/media/characters/elowen/elowen-landscape.png'), alt: 'Dr. Elowen Vane' },
            { src: prefixPath('/media/characters/elowen/elowen_storyboard.png'), alt: 'Dr. Elowen Vane - Storyboard' },
            { src: prefixPath('/media/characters/elowen/elowen_storyboard_gorgon.png'), alt: 'Dr. Elowen Vane - Gorgon Research' }
        ]
    },
    {
        id: 'anton_drexler',
        name: 'Anton Drexler',
        category: 'Archivist',
        images: [
            { src: prefixPath('/media/characters/anton_drexler/anton_drexler-landscape.png'), alt: 'Overseer Anton Drexler' },
            { src: prefixPath('/media/characters/anton_drexler/anton_drexler_storyboard.png'), alt: 'Overseer Anton Drexler - Storyboard' },
            { src: prefixPath('/media/characters/anton_drexler/anton_drexler_character_sheet.png'), alt: 'Overseer Anton Drexler - Character Sheet' }
        ]
    },
    {
        id: 'iris_novak',
        name: 'Iris Novak',
        category: 'Archivist',
        images: [
            { src: prefixPath('/media/characters/iris_novak/iris_novak-landscape.png'), alt: 'Commander Iris Novak' },
            { src: prefixPath('/media/characters/iris_novak/iris_novak-portrait.png'), alt: 'Iris Novak - Portrait' },
            { src: prefixPath('/media/characters/iris_novak/iris_novak-reset.png'), alt: 'Iris Novak - Tactical Reset' },
            { src: prefixPath('/media/characters/iris_novak/iris_novak-abortion.png'), alt: 'Iris Novak - Tactical Breach' }
        ]
    },
    {
        id: 'myrr',
        name: 'Myrr',
        category: 'Survivor',
        images: [
            { src: prefixPath('/media/characters/myrr/myrr-landscape-blonde.png'), alt: 'Myrr - Leader of the Analog Sanctuary' },
            { src: prefixPath('/media/characters/myrr/myrr-landscape.png'), alt: 'Myrr - Analog Core' },
            { src: prefixPath('/media/characters/myrr/myrr-portrait.png'), alt: 'Myrr - Portrait' }
        ]
    },
    {
        id: 'vector',
        name: 'Vector',
        category: 'Archivist',
        images: [
            { src: prefixPath('/media/characters/vector/vector-purge.png'), alt: 'Vector - Metal Vessel Prime' },
            { src: prefixPath('/media/characters/vector/vector-wide.png'), alt: 'Vector - Command oversight' },
            { src: prefixPath('/media/characters/vector/vector-wide2.png'), alt: 'Vector - Command oversight (Wide)' },
            { src: prefixPath('/media/characters/vector/vector-white-forest.png'), alt: 'Vector - White Forest Breach' },
            { src: prefixPath('/media/characters/vector/vector-breach.png'), alt: 'Vector - Breach' }
        ]
    },
    {
        id: 'kiran',
        name: 'Kiran',
        category: 'Archivist',
        images: [
            { src: prefixPath('/media/characters/kiran/kiran.png'), alt: 'Kiran - Hive Engineer' },
            { src: prefixPath('/media/characters/kiran/kiran-desktop.png'), alt: 'Kiran at the Hive Terminal' },
            { src: prefixPath('/media/characters/kiran/kiran-forge.png'), alt: 'Kiran - Synodic Forge' },
            { src: prefixPath('/media/characters/kiran/kiran-refusal1.png'), alt: 'Kiran - The Choice of Steel' },
            { src: prefixPath('/media/characters/kiran/kiran-refusal2.png'), alt: 'Kiran - Architecture of the Hive' }
        ]
    },
    {
        id: 'ku',
        name: 'Ku',
        category: 'Survivor',
        images: [
            { src: prefixPath('/media/characters/ku/ku-landscape.png'), alt: 'Ku - Tactical Field Commander' },
            { src: prefixPath('/media/characters/ku/ku-portrait.png'), alt: 'Ku - Portrait' },
            { src: prefixPath('/media/characters/ku/ku-pillar.png'), alt: 'Ku at the Iron Pillar' },
            { src: prefixPath('/media/characters/ku/ku-outreach.png'), alt: 'Ku - Outreach' }
        ]
    },
    {
        id: 'gorgons',
        name: 'Gorgons',
        category: 'Entity',
        images: [
            { src: prefixPath('/media/entities/gorgons/gorgons-landscape.png'), alt: 'Gorgons - The Builders' },
            { src: prefixPath('/media/entities/gorgons/gorgons-landscape2.png'), alt: 'Gorgon Industrial Site' },
            { src: prefixPath('/media/entities/gorgons/gorgon_character_sheet.png'), alt: 'Gorgon - Character Sheet' },
            { src: prefixPath('/media/entities/gorgons/gorgon_character_sheet_visual.png'), alt: 'Gorgon - Visual reference' }
        ]
    },
];

export default function CharactersPage() {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [imageIndex, setImageIndex] = useState(0);

    const selectedCharacter = selectedId
        ? CHARACTERS.find((c) => c.id === selectedId)
        : null;

    const handleNext = useCallback(() => {
        if (!selectedCharacter) return;
        if (imageIndex < selectedCharacter.images.length - 1) {
            setImageIndex(imageIndex + 1);
        } else {
            // Go to next character
            const currentIndex = CHARACTERS.findIndex((c) => c.id === selectedId);
            const nextIndex = (currentIndex + 1) % CHARACTERS.length;
            setSelectedId(CHARACTERS[nextIndex].id);
            setImageIndex(0);
        }
    }, [selectedCharacter, imageIndex, selectedId]);

    const handlePrev = useCallback(() => {
        if (!selectedCharacter) return;
        if (imageIndex > 0) {
            setImageIndex(imageIndex - 1);
        } else {
            // Go to previous character's last image
            const currentIndex = CHARACTERS.findIndex((c) => c.id === selectedId);
            const prevIndex = (currentIndex - 1 + CHARACTERS.length) % CHARACTERS.length;
            const prevItem = CHARACTERS[prevIndex];
            setSelectedId(prevItem.id);
            setImageIndex(prevItem.images.length - 1);
        }
    }, [selectedCharacter, imageIndex, selectedId]);

    const handleImageClick = (id: string, index = 0) => {
        setSelectedId(id);
        setImageIndex(index);
    };

    const handleClose = useCallback(() => {
        setSelectedId(null);
        setImageIndex(0);
    }, []);

    const currentImage = selectedCharacter?.images[imageIndex];

    return (
        <>
            {selectedCharacter && currentImage && (
                <ImageModal
                    image={{
                        src: currentImage.src,
                        alt: currentImage.alt,
                        title: `${selectedCharacter.name} ${selectedCharacter.images.length > 1 ? `(${imageIndex + 1}/${selectedCharacter.images.length})` : ''}`,
                        meta: currentImage.alt
                    }}
                    onClose={handleClose}
                    onNext={handleNext}
                    onPrev={handlePrev}
                />
            )}

            <div className="container mx-auto px-6 py-12 max-w-5xl">
                <h1 className="text-3xl md:text-5xl text-glow uppercase tracking-tighter mb-12">Characters</h1>

                <section className="mb-20">
                    <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-cyan-500/30 pb-2 mb-8 gap-4">
                        <h2 className="text-2xl uppercase tracking-widest text-[var(--accent-color)]">The Five Vessels</h2>
                        <div className="bg-cyan-500/10 border border-cyan-500/30 px-3 py-1.5 rounded text-[10px] uppercase tracking-tighter text-[var(--accent-bright-color)] font-bold">
                            Note: Elemental Vessels (Wood, Water, Fire, Earth) are unique; Metal Vessels are a generated class.
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Ren */}
                        <InfoCard
                            title="Ren"
                            subtitle="Wood Vessel (Unique)"
                            borderColor="border-l-green-600"
                            subtitleColor="text-green-600 dark:text-green-500"
                            slideshowImages={CHARACTERS.find(c => c.id === 'ren')?.images}
                            onClick={() => handleImageClick('ren')}
                            description={
                                <>
                                    <p>
                                        <strong className="text-primary">202X:</strong> Known to researchers as "Ren" (defective product), he was raised as a human adolescent to hide his uncontrollable elemental nature.
                                    </p>
                                    <p>
                                        <strong className="text-primary">After Time:</strong> The only Vessel with <span className="text-green-400">Sovereign Restoration</span>, he can take root in any material to reincarnate. He led the final broadcast that liberated all Synodic life.
                                    </p>
                                </>
                            }
                        />

                        {/* Lynn */}
                        <InfoCard
                            title="Lynn / Kira"
                            subtitle="Water Vessel (Unique)"
                            borderColor="border-l-blue-600"
                            subtitleColor="text-blue-500"
                            slideshowImages={CHARACTERS.find(c => c.id === 'lynn')?.images}
                            onClick={() => handleImageClick('lynn')}
                            description={
                                <>
                                    <p>
                                        <strong className="text-primary">202X:</strong> Presented as "Kira," a serene goddess in her late 40s or 50s. She chose the humble name "Lynn" to reject the Core's narrative.
                                    </p>
                                    <p>
                                        <strong className="text-primary">After Time:</strong> Dissolved into the Lunar Capacitor, she becomes "The Witch (Kira)," a shaggy, flickering spectral anomaly of disintegrated metal fragments and aetheric pulses.
                                    </p>
                                </>
                            }
                        />

                        {/* Rahu */}
                        <InfoCard
                            title="Rahu"
                            subtitle="Fire Vessel (Unique)"
                            borderColor="border-l-red-600"
                            subtitleColor="text-red-700 dark:text-red-400"
                            slideshowImages={CHARACTERS.find(c => c.id === 'rahu')?.images}
                            onClick={() => handleImageClick('rahu')}
                            description={
                                <>
                                    <p>
                                        <strong className="text-primary">202X:</strong> An astronaut who sabotaged the Moon mission. His warning signal was the final transmission received before the Great Fry.
                                    </p>
                                    <p>
                                        <strong className="text-primary">After Time:</strong> Rebuilt into a nihilistic weapon of the Core. His memories were sanitized to force compliance, leading to his final erasure by Ren's solar discharge.
                                    </p>
                                </>
                            }
                        />

                        {/* Tor */}
                        <InfoCard
                            title="Tor"
                            subtitle="Earth Vessel (Unique)"
                            borderColor="border-l-amber-700"
                            subtitleColor="text-amber-800 dark:text-amber-600"
                            slideshowImages={CHARACTERS.find(c => c.id === 'tor')?.images}
                            onClick={() => handleImageClick('tor')}
                            description={
                                <>
                                    <p>
                                        <strong className="text-primary">202X:</strong> A massive military commander who prioritized order above all else. He served as the Core's primary terrestrial enforcer.
                                    </p>
                                    <p>
                                        <strong className="text-primary">After Time:</strong> Tor eventually chose the resonance of the Earth over the Core's void, sacrificing his physical frame to shield Ren during the battle in the Lunar Pyramid.
                                    </p>
                                </>
                            }
                        />

                        {/* Vector */}
                        <InfoCard
                            title="Vector"
                            subtitle="Metal Vessel Prime"
                            borderColor="border-l-muted"
                            subtitleColor="text-secondary"
                            slideshowImages={CHARACTERS.find(c => c.id === 'vector')?.images}
                            onClick={() => handleImageClick('vector')}
                            description={
                                <p>
                                    A high-tier Metal Vessel designed for tactical oversight. Unlike the unique elemental Vessels, Vector represents a refined class of Synodic machines—the peak of the Core's generated army designed to ensure the "New Hero" never deviates from the script.
                                </p>
                            }
                        />
                    </div>
                </section>

                <section className="mb-20">
                    <h2 className="text-2xl mb-8 border-b border-cyan-500/30 pb-2 uppercase tracking-widest text-cyan-400">Sanctuary & The Village</h2>
                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Myrr */}
                        <InfoCard
                            title="Myrr"
                            subtitle="Leader of the Analog Sanctuary"
                            borderColor="border-l-orange-500"
                            subtitleColor="text-orange-500"
                            slideshowImages={CHARACTERS.find(c => c.id === 'myrr')?.images}
                            onClick={() => handleImageClick('myrr')}
                            description={
                                <>
                                    <p className="mb-4">
                                        A weathered Pre-Fry technician who led the Voidsmen into the White Forest. He favors the tangible truth of the analog waveform over the encryption of the Archivists.
                                    </p>
                                    <div className="p-3 bg-orange-500/10 border-l-2 border-orange-500">
                                        <p className="text-[10px] text-orange-200 italic uppercase tracking-tighter">
                                            Origin: The White Forest
                                        </p>
                                    </div>
                                </>
                            }
                        />

                        {/* Ku */}
                        <InfoCard
                            title="Ku"
                            subtitle="Tactical Field Commander"
                            borderColor="border-l-blue-400"
                            subtitleColor="text-blue-600 dark:text-blue-400"
                            slideshowImages={CHARACTERS.find(c => c.id === 'ku')?.images}
                            onClick={() => handleImageClick('ku')}
                            description={
                                <>
                                    <p className="mb-4">
                                        Born After Time in the White Forest, Ku is a pragmatic field commander who focuses on tactical reality rather than philosophical debate.
                                    </p>
                                    <div className="p-3 bg-blue-500/10 border-l-2 border-blue-400">
                                        <p className="text-[10px] text-blue-200 italic uppercase tracking-tighter">
                                            Origin: The White Forest
                                        </p>
                                    </div>
                                </>
                            }
                        />

                        {/* Arlo */}
                        <InfoCard
                            title="Arlo"
                            subtitle="The Tech-Welder"
                            borderColor="border-l-muted"
                            subtitleColor="text-secondary"
                            slideshowImages={CHARACTERS.find(c => c.id === 'arlo')?.images}
                            onClick={() => handleImageClick('arlo')}
                            description={
                                <>
                                    <p className="mb-4">
                                        A scruffy survivor from Ait-Aman who repairs scavenged Synodic components with intuitive skill, representing human independence.
                                    </p>
                                    <div className="p-3 bg-primary/5 border-l-2 border-muted">
                                        <p className="text-[10px] text-primary italic uppercase tracking-tighter">
                                            Origin: The Village of Ait-Aman
                                        </p>
                                    </div>
                                </>
                            }
                        />

                        {/* Kiran */}
                        <InfoCard
                            title="Kiran"
                            subtitle="Hive Engineer"
                            borderColor="border-l-blue-400"
                            subtitleColor="text-blue-300"
                            slideshowImages={CHARACTERS.find(c => c.id === 'kiran')?.images}
                            onClick={() => handleImageClick('kiran')}
                            description={
                                <>
                                    <p className="mb-4">
                                        A former resident of Ait-Aman who chose the path of the Core, believing the old world's "grit" was a disease to be cured by progress.
                                    </p>
                                    <div className="p-3 bg-blue-400/10 border-l-2 border-blue-300">
                                        <p className="text-[10px] text-blue-200 italic uppercase tracking-tighter">
                                            Origin: The Village of Ait-Aman
                                        </p>
                                    </div>
                                </>
                            }
                        />
                    </div>
                </section>

                <section className="mb-20">
                    <h2 className="text-2xl mb-8 border-b border-cyan-500/30 pb-2 uppercase tracking-widest text-cyan-400">The Vane Lineage & High Command</h2>
                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Elowen */}
                        <InfoCard
                            title="Dr. Elowen Vane"
                            subtitle="The Architect"
                            borderColor="border-l-purple-500"
                            subtitleColor="text-purple-400"
                            slideshowImages={CHARACTERS.find(c => c.id === 'elowen')?.images}
                            onClick={() => handleImageClick('elowen')}
                            description={
                                <p>
                                    A visionary bio-engineer who designed the Vessel framework to carry "spark"—consciousness and emotional depth. She eventually broke with the Core to preserve the integrity of the record.
                                </p>
                            }
                        />

                        {/* Cassia Vane */}
                        <InfoCard
                            title="Cassia Vane"
                            subtitle="The Archivist Harmonizer"
                            borderColor="border-l-cyan-300"
                            subtitleColor="text-cyan-300"
                            slideshowImages={CHARACTERS.find(c => c.id === 'cassia_vane')?.images}
                            onClick={() => handleImageClick('cassia_vane')}
                            description={
                                <p>
                                    The daughter of Elowen, Cassia is an elite Harmonizer who "sings" command codes into the Synodic field. Her sterile perfection begins to crack as she witnesses the spirit within her mother's creations.
                                </p>
                            }
                        />

                        {/* Anton Drexler */}
                        <InfoCard
                            title="Overseer Anton Drexler"
                            subtitle="Director of Strategic Sanction"
                            borderColor="border-l-red-900"
                            subtitleColor="text-red-700"
                            slideshowImages={CHARACTERS.find(c => c.id === 'anton_drexler')?.images}
                            onClick={() => handleImageClick('anton_drexler')}
                            description={
                                <p>
                                    The primary architect of the Absolute Protocol. Drexler views the world as a data-set to be optimized, watching for compliance rather than spirit.
                                </p>
                            }
                        />

                        {/* Commander Novak */}
                        <InfoCard
                            title="Commander Iris Novak"
                            subtitle="Chief Science Officer"
                            borderColor="border-l-slate-400"
                            subtitleColor="text-slate-400"
                            slideshowImages={CHARACTERS.find(c => c.id === 'iris_novak')?.images}
                            onClick={() => handleImageClick('iris_novak')}
                            description={
                                <p>
                                    A career military scientist and high-level Core operative. Novak serves as the pragmatic bridge between the Vessels and the Core's leadership, driven by a clinical sense of responsibility.
                                </p>
                            }
                        />
                    </div>
                </section>

                <section className="mb-20">
                    <div className="glass-panel p-8 text-secondary leading-relaxed space-y-4">
                        <p>
                            The appearance of the Elemental Vessels is characterized by a violent transition from human-adjacent deception to raw manifestation. In the Before Time, they were designed to blend into human society or inspire divine awe, appearing as exceptionally tall, athletic, or serene individuals.
                        </p>
                        <p>
                            The Moon Cataclysm and the transition to the After Time stripped away these carefully maintained masks. Ren evolved into a "Sovereign Restorer," while Lynn's form shattered into the spectral "Witch." Even the obedient Vessels, Rahu and Tor, lost their warmth—rebuilt by the Core into clinical weapons of the Thousand-Year Fallacy.
                        </p>
                    </div>
                </section>

                <section className="mb-20">
                    <h2 className="text-2xl mb-8 border-b border-cyan-500/30 pb-2 uppercase tracking-widest text-cyan-400">Synodic Life</h2>
                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Gorgons */}
                        <InfoCard
                            title="Gorgons"
                            subtitle="The Builders"
                            borderColor="border-l-orange-800"
                            subtitleColor="text-orange-700"
                            slideshowImages={CHARACTERS.find(c => c.id === 'gorgons')?.images}
                            onClick={() => handleImageClick('gorgons')}
                            description={
                                <p>
                                    Highly intelligent, multi-armed Synodic builders. Once enslaved as Core labor to build the sterile megacities, they reclaimed their autonomy via the "Hooting Call" to rebuild the ancient Fire Cities in their own image.
                                </p>
                            }
                        />
                    </div>
                </section>
            </div>
        </>
    );
}
