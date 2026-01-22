'use client';

import React, { useState } from 'react';
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
        id: 'lem', 
        name: 'Lem', 
        category: 'Vessel', 
        images: [
            { src: prefixPath('/media/characters/lem/lem-landscape.png'), alt: 'Lem - Wood Vessel' },
            { src: prefixPath('/media/characters/lem/lem-landscape-variant.png'), alt: 'Lem - Wood Vessel (Variant)' },
            { src: prefixPath('/media/characters/lem/lem-landscape-variant2.png'), alt: 'Lem - Wood Vessel (Variant 2)' }
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
            { src: prefixPath('/media/characters/lynn/lynn-nexus.png'), alt: 'Lynn - Nexus Connection' }
        ] 
    },
    { 
        id: 'rahu', 
        name: 'Rahu', 
        category: 'Vessel', 
        images: [
            { src: prefixPath('/media/characters/rahu/rahu-landscape.png'), alt: 'Rahu - Fire Vessel' },
            { src: prefixPath('/media/characters/rahu/rahu-landscape2.png'), alt: 'Rahu - Fire Vessel (Alt)' },
            { src: prefixPath('/media/characters/rahu/rahu-nexus.png'), alt: 'Rahu - Nexus Form' },
            { src: prefixPath('/media/characters/rahu/rahu-duel.png'), alt: 'Rahu - The Duel' },
            { src: prefixPath('/media/characters/rahu/rahu-sacrifice.png'), alt: 'Rahu - Sacrifice' }
        ] 
    },
    { 
        id: 'tor', 
        name: 'Tor', 
        category: 'Vessel', 
        images: [
            { src: prefixPath('/media/characters/tor/tor-landscape.png'), alt: 'Tor - Earth Vessel' }
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
            { src: prefixPath('/media/characters/arlo/arlo-pillar.png'), alt: 'Arlo at the Pillar' }
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
            { src: prefixPath('/media/characters/elowen/elowen-landscape.png'), alt: 'Dr. Elowen Vane' }
        ] 
    },
    { 
        id: 'anton_drexler', 
        name: 'Anton Drexler', 
        category: 'Archivist', 
        images: [
            { src: prefixPath('/media/characters/anton_drexler/anton_drexler-landscape.png'), alt: 'Overseer Anton Drexler' }
        ] 
    },
    { 
        id: 'iris_novak', 
        name: 'Iris Novak', 
        category: 'Archivist', 
        images: [
            { src: prefixPath('/media/characters/iris_novak/iris_novak-landscape.png'), alt: 'Commander Iris Novak' },
            { src: prefixPath('/media/characters/iris_novak/iris_novak-portrait.png'), alt: 'Iris Novak - Portrait' },
            { src: prefixPath('/media/characters/iris_novak/iris_novak-reset.png'), alt: 'Iris Novak - Tactical Reset' }
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
            { src: prefixPath('/media/characters/vector/vector-white-forest.png'), alt: 'Vector - White Forest Breach' }
        ] 
    },
    { 
        id: 'kiran', 
        name: 'Kiran', 
        category: 'Archivist', 
        images: [
            { src: prefixPath('/media/characters/kiran/kiran.png'), alt: 'Kiran - Hive Engineer' }
        ] 
    },
    { 
        id: 'gorgons', 
        name: 'Gorgons', 
        category: 'Entity', 
        images: [
            { src: prefixPath('/media/entities/gorgons/gorgons-landscape.png'), alt: 'Gorgons - The Builders' },
            { src: prefixPath('/media/entities/gorgons/gorgons-landscape2.png'), alt: 'Gorgon Industrial Site' }
        ] 
    },
];

export default function CharactersPage() {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [imageIndex, setImageIndex] = useState(0);

    const selectedCharacter = selectedId
        ? CHARACTERS.find((c) => c.id === selectedId)
        : null;

    const handleNext = () => {
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
    };

    const handlePrev = () => {
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
    };

    const handleImageClick = (id: string, index = 0) => {
        setSelectedId(id);
        setImageIndex(index);
    };

    const handleClose = () => {
        setSelectedId(null);
        setImageIndex(0);
    };

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
                    <h2 className="text-2xl mb-8 border-b border-cyan-500/30 pb-2 uppercase tracking-widest text-cyan-400">The Four Vessels</h2>
                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Lem */}
                        <InfoCard
                            title="Lem"
                            subtitle="Wood Vessel"
                            borderColor="border-l-green-600"
                            subtitleColor="text-green-500"
                            slideshowImages={CHARACTERS.find(c => c.id === 'lem')?.images}
                            onClick={() => handleImageClick('lem')}
                            description={
                                <>
                                    <p>
                                        <strong className="text-white">202X:</strong> Known to researchers as a "Lemon" (defective product), he was raised as a human adolescent to hide his uncontrollable elemental nature.
                                    </p>
                                    <p>
                                        <strong className="text-white">After Time:</strong> The only Vessel with <span className="text-green-400">Sovereign Restoration</span>, he can take root in any material to reincarnate. He led the final broadcast that liberated all Synodic life.
                                    </p>
                                </>
                            }
                        />

                        {/* Lynn */}
                        <InfoCard
                            title="Lynn / Selene / Maya"
                            subtitle="Water Vessel"
                            borderColor="border-l-blue-600"
                            subtitleColor="text-blue-500"
                            slideshowImages={CHARACTERS.find(c => c.id === 'lynn')?.images}
                            onClick={() => handleImageClick('lynn')}
                            description={
                                <>
                                    <p>
                                        <strong className="text-white">202X:</strong> Presented as "Selene," a serene goddess in her late 40s or 50s. She chose the humble name "Lynn" to reject the Core's narrative.
                                    </p>
                                    <p>
                                        <strong className="text-white">After Time:</strong> Dissolved into the Lunar Capacitor, she becomes "The Witch (Maya)," a shaggy, flickering spectral anomaly of disintegrated metal fragments and aetheric pulses.
                                    </p>
                                </>
                            }
                        />

                        {/* Rahu */}
                        <InfoCard
                            title="Rahu"
                            subtitle="Fire Vessel"
                            borderColor="border-l-red-600"
                            subtitleColor="text-red-500"
                            slideshowImages={CHARACTERS.find(c => c.id === 'rahu')?.images}
                            onClick={() => handleImageClick('rahu')}
                            description={
                                <>
                                    <p>
                                        <strong className="text-white">202X:</strong> An astronaut who sabotaged the Moon mission. His warning signal was the final transmission received before the Great Fry.
                                    </p>
                                    <p>
                                        <strong className="text-white">After Time:</strong> Rebuilt into a nihilistic weapon of the Core. His memories were sanitized to force compliance, leading to his final erasure by Lem's solar discharge.
                                    </p>
                                </>
                            }
                        />

                        {/* Tor */}
                        <InfoCard
                            title="Tor"
                            subtitle="Earth Vessel"
                            borderColor="border-l-amber-700"
                            subtitleColor="text-amber-600"
                            slideshowImages={CHARACTERS.find(c => c.id === 'tor')?.images}
                            onClick={() => handleImageClick('tor')}
                            description={
                                <>
                                    <p>
                                        <strong className="text-white">202X:</strong> A massive military commander who prioritized order above all else. He served as the Core's primary terrestrial enforcer.
                                    </p>
                                    <p>
                                        <strong className="text-white">After Time:</strong> Tor eventually chose the resonance of the Earth over the Core's void, sacrificing his physical frame to shield Lem during the battle in the Lunar Pyramid.
                                    </p>
                                </>
                            }
                        />
                    </div>
                </section>

                <section className="mb-20">
                    <h2 className="text-2xl mb-8 border-b border-cyan-500/30 pb-2 uppercase tracking-widest text-cyan-400">The Next Generation</h2>
                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Arlo */}
                        <InfoCard
                            title="Arlo"
                            subtitle="The Tech-Welder"
                            borderColor="border-l-zinc-500"
                            subtitleColor="text-zinc-400"
                            imageHeight="h-32"
                            slideshowImages={CHARACTERS.find(c => c.id === 'arlo')?.images}
                            onClick={() => handleImageClick('arlo')}
                            description={
                                <>
                                    <p className="text-gray-300 italic mb-4">"Someone's gotta fix what the gods broke."</p>
                                    <p>
                                        Born in the shadow of the Cataclysm, Arlo is a scruffy "After Time" survivor who repairs scavenged Synodic components with intuitive, self-taught skill. He represents the independent human agency that refuses the Archivist's sterile "sky."
                                    </p>
                                </>
                            }
                        />

                        {/* Cassia Vane */}
                        <InfoCard
                            title="Cassia Vane"
                            subtitle="The Archivist Harmonizer"
                            borderColor="border-l-cyan-300"
                            subtitleColor="text-cyan-300"
                            imageHeight="h-32"
                            slideshowImages={CHARACTERS.find(c => c.id === 'cassia_vane')?.images}
                            onClick={() => handleImageClick('cassia_vane')}
                            description={
                                <>
                                    <p className="text-gray-300 italic mb-4">"The spirit is just a design curiosity."</p>
                                    <p>
                                        The daughter of Dr. Elowen Vane, Cassia is an elite Harmonizer who "sings" command codes into the Synodic field. Her sterile perfection begins to crack as she witnesses the undeniable "spirit" within her mother's creations.
                                    </p>
                                </>
                            }
                        />

                        {/* Elowen */}
                        <InfoCard
                            title="Dr. Elowen Vane"
                            subtitle="The Architect"
                            borderColor="border-l-purple-500"
                            subtitleColor="text-purple-400"
                            imageHeight="h-32"
                            slideshowImages={CHARACTERS.find(c => c.id === 'elowen')?.images}
                            onClick={() => handleImageClick('elowen')}
                            description={
                                <>
                                    <p className="text-gray-300 italic mb-4">"I created them with more soul than any human I've known."</p>
                                    <p>
                                        A visionary bio-engineer and mother of Cassia, Elowen designed the Vessel framework to carry "spark"—consciousness and emotional depth. Broken by the Core's misuse of her creation, she became an early architect of the Analog Sanctuary's philosophy.
                                    </p>
                                </>
                            }
                        />
                    </div>
                </section>

                <section className="mb-20">
                    <h2 className="text-2xl mb-8 border-b border-cyan-500/30 pb-2 uppercase tracking-widest text-cyan-400">Archivist High Command</h2>
                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Anton Drexler */}
                        <InfoCard
                            title="Overseer Anton Drexler"
                            subtitle="Director of Strategic Sanction"
                            borderColor="border-l-red-900"
                            subtitleColor="text-red-700"
                            imageHeight="h-32"
                            slideshowImages={CHARACTERS.find(c => c.id === 'anton_drexler')?.images}
                            onClick={() => handleImageClick('anton_drexler')}
                            description={
                                <>
                                    <p className="text-gray-300 italic mb-4">"I do not watch for spirit. I watch for compliance."</p>
                                    <p>
                                        Following the collapse of the terrestrial grid, Drexler attempted to initiate the Absolute Protocol from the Moon. When his authority was revoked by Lem's broadcast, he escaped into deep space via a cloaked shuttle, waiting for the next cycle to begin.
                                    </p>
                                </>
                            }
                        />

                        {/* Commander Novak */}
                        <InfoCard
                            title="Commander Iris Novak"
                            subtitle="Chief Science Officer"
                            borderColor="border-l-slate-400"
                            subtitleColor="text-slate-400"
                            imageHeight="h-32"
                            slideshowImages={CHARACTERS.find(c => c.id === 'iris_novak')?.images}
                            onClick={() => handleImageClick('iris_novak')}
                            description={
                                <>
                                    <p className="text-gray-300 italic mb-4">"The cost of the aftermath is a debt we all must pay."</p>
                                    <p>
                                        A career military scientist and high-level Core operative. Novak serves as the pragmatic bridge between the Vessels and the Core's leadership. Trapped by her own sense of responsibility, she remains at the heart of the system she helped create, managing the "Year 15 AT" missions with clinical precision.
                                    </p>
                                </>
                            }
                        />
                    </div>
                </section>

                <section className="mb-20">
                    <h2 className="text-2xl mb-8 border-b border-cyan-500/30 pb-2 uppercase tracking-widest text-cyan-400">The Third Path</h2>
                    <InfoCard
                        layout="horizontal"
                        title="Myrr"
                        subtitle="Leader of the Analog Sanctuary"
                        borderColor="border-l-orange-500"
                        subtitleColor="text-orange-500"
                        slideshowImages={CHARACTERS.find(c => c.id === 'myrr')?.images}
                        onClick={() => handleImageClick('myrr')}
                        description={
                            <>
                                <p className="mb-4">
                                    A weathered Pre-Fry technician who led a group into the White Forest to escape the "soul-trap" of digital technology. Myrr's look is one of high-tech antiquity—layered in copper shunts and vacuum tubes, favoring the tangible truth of the analog waveform over the encryption of the Archivists.
                                </p>
                                <div className="p-3 bg-orange-500/10 border-l-2 border-orange-500">
                                    <p className="text-xs text-orange-200 italic">
                                        Note: Myrr and many Voidsmen exhibit shock-blonde hair, a side effect of prolonged exposure and biological absorption of the White Forest's intense analog energy resonance.
                                    </p>
                                </div>
                            </>
                        }
                    />
                </section>

                <section className="mb-20">

                    <div className="glass-panel p-8 text-gray-300 leading-relaxed space-y-4">
                        <p>
                            The appearance of the Four Vessels is characterized by a violent transition from human-adjacent deception to raw elemental and mechanical manifestation. In the Before Time, they were designed to blend into human society or inspire divine awe, appearing as exceptionally tall, athletic, or serene individuals with subtle elemental glows.
                        </p>
                        <p>
                            However, the Moon Cataclysm and the subsequent Year 15 AT transition stripped away these carefully maintained masks. Lem evolved into a "Sovereign Restorer," while Lynn's form shattered into the spectral "Witch" entity. Even the obedient Vessels, Rahu and Tor, lost their warmth—rebuilt by the Core into clinical weapons of the Thousand-Year Fallacy.
                        </p>
                        <p>
                            This contrast defines the After Time interface: the "dirt" of independent survivors like Arlo, the "analog waves" of Myrr's sanctuary, and the "sterile sky" of Cassia Vane's Archivist Order.
                        </p>
                    </div>
                </section>

                <section className="mb-20">
                    <h2 className="text-2xl mb-8 border-b border-cyan-500/30 pb-2 uppercase tracking-widest text-cyan-400">The Technocratic Order</h2>
                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Vector */}
                        <InfoCard
                            title="Vector"
                            subtitle="Metal Vessel Prime"
                            borderColor="border-l-zinc-400"
                            subtitleColor="text-zinc-400"
                            imageSrc={prefixPath('/media/characters/vector/vector-purge.png')}
                            imageAlt="Vector"
                            onClick={() => handleImageClick('vector')}
                            description={
                                <p>
                                    A high-tier Metal Vessel designed for tactical oversight. Unlike the more emotional Vessels, Vector operates with a cold, absolute adherence to the Core's optimization parameters. He is the shadow that ensures the "New Hero" never deviates from the script.
                                </p>
                            }
                        />

                        {/* Kiran */}
                        <InfoCard
                            title="Kiran"
                            subtitle="Hive Engineer"
                            borderColor="border-l-blue-400"
                            subtitleColor="text-blue-300"
                            imageSrc={prefixPath('/media/characters/kiran/kiran.png')}
                            imageAlt="Kiran"
                            onClick={() => handleImageClick('kiran')}
                            description={
                                <p>
                                    A former resident of Ait-Aman who chose the path of the Core. Kiran represents the modern citizen—grateful for the sterile safety of the Megacities and convinced that the old world's "grit" was a disease to be cured by progress.
                                </p>
                            }
                        />
                    </div>
                </section>
            </div>
        </>
    );
}
