import React from 'react';

export default function CharactersPage() {
    return (
        <div className="container mx-auto px-6 py-12 max-w-5xl">
            <h1 className="text-3xl md:text-5xl text-glow uppercase tracking-tighter mb-12">Characters</h1>

            <section className="mb-20">
                <h2 className="text-2xl mb-8 border-b border-cyan-500/30 pb-2 uppercase tracking-widest text-cyan-400">The Four Vessels</h2>
                <div className="grid md:grid-cols-2 gap-12">
                    {/* Lem */}
                    <div className="glass-panel p-6 border-l-4 border-l-green-600">
                        <div className="relative h-48 mb-6 overflow-hidden rounded bg-black/40">
                            <img
                                src="/media/characters/lem/lem-landscape.png"
                                alt="Lem - Wood Vessel"
                                className="object-cover object-top w-full h-full opacity-80 hover:opacity-100 transition-opacity"
                            />
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
                        <div className="relative h-48 mb-6 overflow-hidden rounded bg-black/40">
                            <img
                                src="/media/characters/lynn/lynn-landscape.png"
                                alt="Lynn - Water Vessel"
                                className="object-cover object-top w-full h-full opacity-80 hover:opacity-100 transition-opacity"
                            />
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
                        <div className="relative h-48 mb-6 overflow-hidden rounded bg-black/40">
                            <img
                                src="/media/characters/rahu/rahu-landscape.png"
                                alt="Rahu - Fire Vessel"
                                className="object-cover object-top w-full h-full opacity-80 hover:opacity-100 transition-opacity"
                            />
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
                        <div className="relative h-48 mb-6 overflow-hidden rounded bg-black/40">
                            <img
                                src="/media/characters/tor/tor-landscape.png"
                                alt="Tor - Earth Vessel"
                                className="object-cover object-top w-full h-full opacity-80 hover:opacity-100 transition-opacity"
                            />
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
                        <div className="relative h-32 mb-6 overflow-hidden rounded bg-black/40">
                            <img
                                src="/media/characters/arlo/arlo-portrait.png"
                                alt="Arlo - The Tech-Welder"
                                className="object-cover object-top w-full h-full opacity-80 hover:opacity-100 transition-opacity"
                            />
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
                        <div className="relative h-32 mb-6 overflow-hidden rounded bg-black/40">
                            <img
                                src="/media/characters/cassia_vane/cassia_vane-landscape.png"
                                alt="Cassia Vane - The Archivist Harmonizer"
                                className="object-cover object-top w-full h-full opacity-80 hover:opacity-100 transition-opacity"
                            />
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
                </div>
            </section>

            <section className="mb-20">
                <h2 className="text-2xl mb-8 border-b border-cyan-500/30 pb-2 uppercase tracking-widest text-cyan-400">Archivist High Command</h2>
                <div className="grid md:grid-cols-2 gap-12">
                    {/* Anton Drexler */}
                    <div className="glass-panel p-6 border-l-4 border-l-red-900">
                        <div className="relative h-32 mb-6 overflow-hidden rounded bg-black/40">
                            <img
                                src="/media/characters/anton_drexler/anton_drexler-landscape.png"
                                alt="Overseer Anton Drexler"
                                className="object-cover object-top w-full h-full opacity-80 hover:opacity-100 transition-opacity"
                            />
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
                        <div className="relative h-32 mb-6 overflow-hidden rounded bg-black/40">
                            <img
                                src="/media/characters/iris_novak/iris_novak-portrait.png"
                                alt="Commander Iris Novak"
                                className="object-cover object-top w-full h-full opacity-80 hover:opacity-100 transition-opacity"
                            />
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
                        <div className="md:w-1/3 relative h-48 overflow-hidden rounded bg-black/40">
                            <img
                                src="/media/characters/myrr/myrr-landscape.png"
                                alt="Myrr - Leader of the Analog Sanctuary"
                                className="object-cover object-top w-full h-full opacity-80 hover:opacity-100 transition-opacity"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="mb-20">
                <h2 className="text-2xl mb-8 border-b border-cyan-500/30 pb-2 uppercase tracking-widest text-cyan-400">The Evolution of Form</h2>
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
    );
}
