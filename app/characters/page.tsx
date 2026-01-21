'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ImageModal } from '../components/ImageModal';
import { InfoCard } from '../components/InfoCard';
import { prefixPath } from '@/lib/utils';

interface Character {
    id: string;
    name: string;
    src: string;
    alt: string;
}

const CHARACTERS: Character[] = [
    { id: 'lem', name: 'Lem', src: prefixPath('/media/characters/lem/lem-landscape.png'), alt: 'Lem - Wood Vessel' },
    { id: 'lem-variant', name: 'Lem (Variant)', src: prefixPath('/media/characters/lem/lem-landscape-variant.png'), alt: 'Lem - Wood Vessel (Variant)' },
    { id: 'lem-variant2', name: 'Lem (Variant 2)', src: prefixPath('/media/characters/lem/lem-landscape-variant2.png'), alt: 'Lem - Wood Vessel (Variant 2)' },
    { id: 'lynn', name: 'Lynn', src: prefixPath('/media/characters/lynn/lynn-landscape.png'), alt: 'Lynn - Water Vessel' },
    { id: 'rahu', name: 'Rahu', src: prefixPath('/media/characters/rahu/rahu-landscape.png'), alt: 'Rahu - Fire Vessel' },
    { id: 'rahu-2', name: 'Rahu (Alt)', src: prefixPath('/media/characters/rahu/rahu-landscape2.png'), alt: 'Rahu - Fire Vessel (Alt)' },
    { id: 'tor', name: 'Tor', src: prefixPath('/media/characters/tor/tor-landscape.png'), alt: 'Tor - Earth Vessel' },
    { id: 'arlo', name: 'Arlo', src: prefixPath('/media/characters/arlo/arlo-landscape.png'), alt: 'Arlo - The Tech-Welder' },
    { id: 'cassia_vane', name: 'Cassia Vane', src: prefixPath('/media/characters/cassia_vane/cassia_vane-landscape.png'), alt: 'Cassia Vane' },
    { id: 'elowen', name: 'Elowen', src: prefixPath('/media/characters/elowen/elowen-landscape.png'), alt: 'Dr. Elowen Vane' },
    { id: 'anton_drexler', name: 'Anton Drexler', src: prefixPath('/media/characters/anton_drexler/anton_drexler-landscape.png'), alt: 'Overseer Anton Drexler' },
    { id: 'iris_novak', name: 'Iris Novak', src: prefixPath('/media/characters/iris_novak/iris_novak-landscape.png'), alt: 'Commander Iris Novak' },
    { id: 'myrr', name: 'Myrr', src: prefixPath('/media/characters/myrr/myrr-landscape.png'), alt: 'Myrr - Leader of the Analog Sanctuary' },
    { id: 'gorgons', name: 'Gorgons', src: prefixPath('/media/entities/gorgons/gorgons-landscape.png'), alt: 'Gorgons - The Builders' },
];

export default function CharactersPage() {
    const [selectedCharacterId, setSelectedCharacterId] = useState<string | null>(null);

    const selectedCharacter = selectedCharacterId
        ? CHARACTERS.find((c) => c.id === selectedCharacterId)
        : null;

    const currentIndex = selectedCharacterId ? CHARACTERS.findIndex((c) => c.id === selectedCharacterId) : -1;

    const handleNext = () => {
        if (currentIndex < CHARACTERS.length - 1) {
            setSelectedCharacterId(CHARACTERS[currentIndex + 1].id);
        } else {
            // Loop back to first character
            setSelectedCharacterId(CHARACTERS[0].id);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setSelectedCharacterId(CHARACTERS[currentIndex - 1].id);
        } else {
            // Loop to last character
            setSelectedCharacterId(CHARACTERS[CHARACTERS.length - 1].id);
        }
    };

    const handleImageClick = (id: string) => {
        setSelectedCharacterId(id);
    };

    const handleClose = () => {
        setSelectedCharacterId(null);
    };

    return (
        <>
            {selectedCharacter && (
                <ImageModal
                    image={{
                        src: selectedCharacter.src,
                        alt: selectedCharacter.alt,
                        title: selectedCharacter.name
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
                            imageSrc={prefixPath('/media/characters/lem/lem-landscape.png')}
                            imageAlt="Lem - Wood Vessel"
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
                            imageSrc={prefixPath('/media/characters/lynn/lynn-landscape.png')}
                            imageAlt="Lynn - Water Vessel"
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
                            imageSrc={prefixPath('/media/characters/rahu/rahu-landscape.png')}
                            imageAlt="Rahu - Fire Vessel"
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
                            imageSrc={prefixPath('/media/characters/tor/tor-landscape.png')}
                            imageAlt="Tor - Earth Vessel"
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
                            imageSrc={prefixPath('/media/characters/arlo/arlo-landscape.png')}
                            imageAlt="Arlo - The Tech-Welder"
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
                            imageSrc={prefixPath('/media/characters/cassia_vane/cassia_vane-landscape.png')}
                            imageAlt="Cassia Vane - The Archivist Harmonizer"
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
                            imageSrc={prefixPath('/media/characters/elowen/elowen-landscape.png')}
                            imageAlt="Dr. Elowen Vane"
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
                            imageSrc={prefixPath('/media/characters/anton_drexler/anton_drexler-landscape.png')}
                            imageAlt="Overseer Anton Drexler"
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
                        <div className="glass-panel p-6 border-l-4 border-l-slate-400">
                            <div className="relative h-32 mb-6 overflow-hidden rounded bg-black/40 cursor-pointer group" onClick={() => handleImageClick('iris_novak')}>
                                <Image
                                    src={prefixPath('/media/characters/iris_novak/iris_novak-landscape.png')}
                                    alt="Commander Iris Novak"
                                    fill
                                    className="object-cover object-top w-full h-full opacity-80 group-hover:opacity-100 transition-opacity"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                    <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity">Click to enlarge</span>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold mb-1">Commander Iris Novak</h3>
                            <p className="text-xs text-slate-400 uppercase tracking-widest mb-4 font-semibold">Chief Science Officer</p>
                            <p className="text-gray-300 italic mb-4">"The cost of the aftermath is a debt we all must pay."</p>
                            <div className="space-y-4 text-gray-300">
                                <p>
                                    A career military scientist and high-level Core operative. Novak serves as the pragmatic bridge between the Vessels and the Core's leadership. Trapped by her own sense of responsibility, she remains at the heart of the system she helped create, managing the "Year 15 AT" missions with clinical precision.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mb-20">
                    <h2 className="text-2xl mb-8 border-b border-cyan-500/30 pb-2 uppercase tracking-widest text-cyan-400">The Third Path</h2>
                    <div className="glass-panel p-8 border-l-4 border-l-orange-500 overflow-hidden relative">
                        <div className="flex flex-col md:flex-row gap-8 items-start">
                            <div className="md:w-2/3">
                                <h3 className="text-2xl font-bold mb-1">Myrr</h3>
                                <p className="text-sm text-orange-500 uppercase tracking-widest mb-4 font-semibold">Leader of the Analog Sanctuary</p>
                                <p className="text-gray-300 leading-relaxed">
                                    A weathered Pre-Fry technician who led a group into the White Forest to escape the "soul-trap" of digital technology. Myrr's look is one of high-tech antiquity—layered in copper shunts and vacuum tubes, favoring the tangible truth of the analog waveform over the encryption of the Archivists.
                                </p>
                            </div>
                            <div className="md:w-1/3 relative h-48 overflow-hidden rounded bg-black/40 cursor-pointer group" onClick={() => handleImageClick('myrr')}>
                                <Image
                                    src={prefixPath('/media/characters/myrr/myrr-landscape.png')}
                                    alt="Myrr - Leader of the Analog Sanctuary"
                                    fill
                                    className="object-cover object-top w-full h-full opacity-80 group-hover:opacity-100 transition-opacity"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                    <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity">Click to enlarge</span>
                                </div>
                            </div>
                        </div>
                    </div>
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
            </div>
        </>
    );
}
