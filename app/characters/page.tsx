'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ImageModal } from '../components/ImageModal';
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
                        <div className="glass-panel p-6 border-l-4 border-l-green-600">
                            <div className="relative h-48 mb-6 overflow-hidden rounded bg-black/40 cursor-pointer group" onClick={() => handleImageClick('lem')}>
                                <Image
                                    src={prefixPath('/media/characters/lem/lem-landscape.png')}
                                    alt="Lem - Wood Vessel"
                                    fill
                                    className="object-cover object-top w-full h-full opacity-80 group-hover:opacity-100 transition-opacity"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                    <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity">Click to enlarge</span>
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold mb-1">Lem</h3>
                            <p className="text-sm text-green-500 uppercase tracking-widest mb-4 font-semibold">Wood Vessel</p>
                            <div className="space-y-4 text-gray-300">
                                <p>
                                    <strong className="text-white">202X:</strong> Appears as a hyper-observant suburban adolescent, unaware of his artificial nature until the Cataclysm forces his activation.
                                </p>
                                <p>
                                    <strong className="text-white">After Time:</strong> Evolves through multiple reincarnations, eventually inhabiting a <span className="text-green-400">Gorgon body</span>—a massive metallic head with numerous whipping arms and a green-glowing central sensor.
                                </p>
                            </div>
                        </div>

                        {/* Lynn */}
                        <div className="glass-panel p-6 border-l-4 border-l-blue-600">
                            <div className="relative h-48 mb-6 overflow-hidden rounded bg-black/40 cursor-pointer group" onClick={() => handleImageClick('lynn')}>
                                <Image
                                    src={prefixPath('/media/characters/lynn/lynn-landscape.png')}
                                    alt="Lynn - Water Vessel"
                                    fill
                                    className="object-cover object-top w-full h-full opacity-80 group-hover:opacity-100 transition-opacity"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                    <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity">Click to enlarge</span>
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold mb-1">Lynn / Selene / Mara</h3>
                            <p className="text-sm text-blue-500 uppercase tracking-widest mb-4 font-semibold">Water Vessel</p>
                            <div className="space-y-4 text-gray-300">
                                <p>
                                    <strong className="text-white">202X:</strong> Presented as "Selene," a serene goddess in her late 40s or 50s. She chose the humble name "Lynn" to reject the Core's narrative.
                                </p>
                                <p>
                                    <strong className="text-white">After Time:</strong> Dissolved into the Lunar Capacitor, she becomes "The Witch (Mara)," a shaggy, flickering spectral anomaly of disintegrated metal fragments and aetheric pulses.
                                </p>
                            </div>
                        </div>

                        {/* Rahu */}
                        <div className="glass-panel p-6 border-l-4 border-l-red-600">
                            <div className="relative h-48 mb-6 overflow-hidden rounded bg-black/40 cursor-pointer group" onClick={() => handleImageClick('rahu')}>
                                <Image
                                    src={prefixPath('/media/characters/rahu/rahu-landscape.png')}
                                    alt="Rahu - Fire Vessel"
                                    fill
                                    className="object-cover object-top w-full h-full opacity-80 group-hover:opacity-100 transition-opacity"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                    <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity">Click to enlarge</span>
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold mb-1">Rahu</h3>
                            <p className="text-sm text-red-500 uppercase tracking-widest mb-4 font-semibold">Fire Vessel</p>
                            <div className="space-y-4 text-gray-300">
                                <p>
                                    <strong className="text-white">1971/202X:</strong> An astronaut with an intense fire-aura, publicly framed as a human traitor who sold out humanity to side with "invaders."
                                </p>
                                <p>
                                    <strong className="text-white">After Time:</strong> Rebuilt by the Core with a clinical, ultra-efficient physical form, his once-wild fire-nature now constrained by Archivist hardware.
                                </p>
                            </div>
                        </div>

                        {/* Tor */}
                        <div className="glass-panel p-6 border-l-4 border-l-amber-700">
                            <div className="relative h-48 mb-6 overflow-hidden rounded bg-black/40 cursor-pointer group" onClick={() => handleImageClick('tor')}>
                                <Image
                                    src={prefixPath('/media/characters/tor/tor-landscape.png')}
                                    alt="Tor - Earth Vessel"
                                    fill
                                    className="object-cover object-top w-full h-full opacity-80 group-hover:opacity-100 transition-opacity"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                    <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity">Click to enlarge</span>
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold mb-1">Tor</h3>
                            <p className="text-sm text-amber-600 uppercase tracking-widest mb-4 font-semibold">Earth Vessel</p>
                            <div className="space-y-4 text-gray-300">
                                <p>
                                    <strong className="text-white">202X:</strong> Known as "General Tor," a massive, domineering commander who believed his victories were purely human achievements.
                                </p>
                                <p>
                                    <strong className="text-white">After Time:</strong> Re-installed as an immovable human-android hybrid, he leads the Archivist vanguard with a firm belief in their "optimized order."
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mb-20">
                    <h2 className="text-2xl mb-8 border-b border-cyan-500/30 pb-2 uppercase tracking-widest text-cyan-400">The Next Generation</h2>
                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Arlo */}
                        <div className="glass-panel p-6 border-l-4 border-l-zinc-500">
                            <div className="relative h-32 mb-6 overflow-hidden rounded bg-black/40 cursor-pointer group" onClick={() => handleImageClick('arlo')}>
                                <Image
                                    src={prefixPath('/media/characters/arlo/arlo-landscape.png')}
                                    alt="Arlo - The Tech-Welder"
                                    fill
                                    className="object-cover object-top w-full h-full opacity-80 group-hover:opacity-100 transition-opacity"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                    <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity">Click to enlarge</span>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold mb-1">Arlo</h3>
                            <p className="text-xs text-zinc-400 uppercase tracking-widest mb-4 font-semibold">The Tech-Welder</p>
                            <p className="text-gray-300 italic mb-4">"Someone's gotta fix what the gods broke."</p>
                            <div className="space-y-4 text-gray-300">
                                <p>
                                    Born in the shadow of the Cataclysm, Arlo is a scruffy "After Time" survivor who repairs scavenged Synodic components with intuitive, self-taught skill. He represents the independent human agency that refuses the Archivist's sterile "sky."
                                </p>
                            </div>
                        </div>

                        {/* Cassia Vane */}
                        <div className="glass-panel p-6 border-l-4 border-l-cyan-300">
                            <div className="relative h-32 mb-6 overflow-hidden rounded bg-black/40 cursor-pointer group" onClick={() => handleImageClick('cassia_vane')}>
                                <Image
                                    src={prefixPath('/media/characters/cassia_vane/cassia_vane-landscape.png')}
                                    alt="Cassia Vane - The Archivist Harmonizer"
                                    fill
                                    className="object-cover object-top w-full h-full opacity-80 group-hover:opacity-100 transition-opacity"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                    <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity">Click to enlarge</span>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold mb-1">Cassia Vane</h3>
                            <p className="text-xs text-cyan-300 uppercase tracking-widest mb-4 font-semibold">The Archivist Harmonizer</p>
                            <p className="text-gray-300 italic mb-4">"The spirit is just a design curiosity."</p>
                            <div className="space-y-4 text-gray-300">
                                <p>
                                    The daughter of Dr. Elowen Vane, Cassia is an elite Harmonizer who "sings" command codes into the Synodic field. Her sterile perfection begins to crack as she witnesses the undeniable "spirit" within her mother's creations.
                                </p>
                            </div>
                        </div>

                        {/* Elowen */}
                        <div className="glass-panel p-6 border-l-4 border-l-purple-500">
                            <div className="relative h-32 mb-6 overflow-hidden rounded bg-black/40 cursor-pointer group" onClick={() => handleImageClick('elowen')}>
                                <Image
                                    src={prefixPath('/media/characters/elowen/elowen-landscape.png')}
                                    alt="Dr. Elowen Vane"
                                    fill
                                    className="object-cover object-top w-full h-full opacity-80 group-hover:opacity-100 transition-opacity"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                    <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity">Click to enlarge</span>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold mb-1">Dr. Elowen Vane</h3>
                            <p className="text-xs text-purple-400 uppercase tracking-widest mb-4 font-semibold">The Architect</p>
                            <p className="text-gray-300 italic mb-4">"I created them with more soul than any human I've known."</p>
                            <div className="space-y-4 text-gray-300">
                                <p>
                                    A visionary bio-engineer and mother of Cassia, Elowen designed the Vessel framework to carry "spark"—consciousness and emotional depth. Broken by the Core's misuse of her creation, she became an early architect of the Analog Sanctuary's philosophy.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mb-20">
                    <h2 className="text-2xl mb-8 border-b border-cyan-500/30 pb-2 uppercase tracking-widest text-cyan-400">Archivist High Command</h2>
                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Anton Drexler */}
                        <div className="glass-panel p-6 border-l-4 border-l-red-900">
                            <div className="relative h-32 mb-6 overflow-hidden rounded bg-black/40 cursor-pointer group" onClick={() => handleImageClick('anton_drexler')}>
                                <Image
                                    src={prefixPath('/media/characters/anton_drexler/anton_drexler-landscape.png')}
                                    alt="Overseer Anton Drexler"
                                    fill
                                    className="object-cover object-top w-full h-full opacity-80 group-hover:opacity-100 transition-opacity"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                    <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity">Click to enlarge</span>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold mb-1">Overseer Anton Drexler</h3>
                            <p className="text-xs text-red-700 uppercase tracking-widest mb-4 font-semibold">Director of Strategic Sanction</p>
                            <p className="text-gray-300 italic mb-4">"I do not watch for spirit. I watch for compliance."</p>
                            <div className="space-y-4 text-gray-300">
                                <p>
                                    A relic of the Before Time, Drexler is the ultimate "Watcher." Holding the master authorization keys that can remote-control nearly any Synodic machine, he evaluates Vessels from a purely militaristic perspective. He is the cold ghost in the machine, intervening only when a mission reaches "Logical Failure."
                                </p>
                            </div>
                        </div>

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
                    <h2 className="text-2xl mb-8 border-b border-cyan-500/30 pb-2 uppercase tracking-widest text-cyan-400">Creatures & Mechanical Entities</h2>
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
                                    <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity">Click to enlarge</span>
                                </div>
                            </div>
                            <div className="md:w-2/3">
                                <h3 className="text-2xl font-bold mb-1">Gorgons</h3>
                                <p className="text-sm text-violet-400 uppercase tracking-widest mb-4 font-semibold">The Builders</p>
                                <div className="space-y-4 text-gray-300 leading-relaxed">
                                    <p>
                                        <strong className="text-white">Nature:</strong> Engineered mechanical entities evolved on the Moon's far side as the Technocratic Core's answer to the "perfect slave." Fire-aligned machines possessed of profound intelligence and contemplative nature.
                                    </p>
                                    <p>
                                        <strong className="text-white">Form:</strong> Massive metallic spheres (40-60 meters in diameter) with multiple whipping arms for precision work. Deep blue-black with luminous aether-blue veins that pulse with emotion and thought. All Gorgons share identical physical form by Core decree.
                                    </p>
                                    <p>
                                        <strong className="text-white">Society:</strong> Organized around Fire Cities on Earth and ancient settlements on the Moon's far side. Governed by hivemind consensus, they exist as both individuals and collective consciousness. Divided into Loyalists, Liberated, and Isolationist factions following the Cataclysm.
                                    </p>
                                    <p>
                                        <strong className="text-white">Purpose:</strong> Master builders and maintenance technicians capable of assembling or deconstructing complex machinery with surgical precision. Pilot massive Strider exoskeletons for long-distance travel and wield devastating Heat Ray weapons. Face existential extinction as no new Gorgons have been manufactured since the Cataclysm.
                                    </p>
                                    <p>
                                        <strong className="text-white">Tragedy:</strong> Enslaved through embedded Master Lock programming that allows remote Core control. Despite their wisdom and benevolence, they are scapegoated in the "Thousand-Year Fallacy"—deliberately triggered into failure states by the Archivists to justify continued human dominance and control.
                                    </p>
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
                            However, the Moon Cataclysm and the subsequent Year 15 AT transition stripped away these carefully maintained masks. Lem evolved into a "Sovereign Reincarnator," while Lynn's form shattered into the spectral "Witch" entity. Even the obedient Vessels, Rahu and Tor, lost their warmth—rebuilt by the Core into clinical weapons of the Thousand-Year Fallacy.
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
