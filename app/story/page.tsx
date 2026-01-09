import React from 'react';

export default function StoryPage() {
    return (
        <div className="container mx-auto px-6 py-12 max-w-4xl">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <h1 className="text-3xl md:text-5xl text-glow uppercase tracking-tighter">THE LORE</h1>
                <div className="flex items-center gap-2 bg-red-900/20 border border-red-500/30 px-3 py-1.5 rounded self-start md:self-auto">
                    <span className="text-red-500 text-[10px] font-bold uppercase tracking-widest leading-none">Spoiler Warning</span>
                    <span className="text-zinc-500 text-[10px] uppercase tracking-tighter leading-none">Content includes major plot details</span>
                </div>
            </div>

            <section className="mb-16">
                <h2 className="text-2xl mb-6 border-b border-cyan-500/30 pb-2">The Timeline</h2>
                <div className="space-y-8">
                    <div>
                        <h3 className="text-cyan-400 text-lg mb-2 underline">Before Time</h3>
                        <p className="text-gray-300 leading-relaxed">
                            An era of systematic deception. Humanity lived under the guidance of the Technocratic Core, unaware of the
                            Five Vessels hidden among them. The Moon was presented as a barren rock, while in reality, it housed the
                            Cradle of the Archivists.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-cyan-400 text-lg mb-2 underline">Day 0: The Great Fry</h3>
                        <p className="text-gray-300 leading-relaxed">
                            The Lunar Capacitor discharge. Initiated by Lynn and sabotaged by Rahu, the reset failed to achieve its
                            biological purpose, instead short-circuiting every digital system in the solar system. The Moon's surface
                            sheered off, falling to Earth as the debris field that would define the next decade.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-cyan-400 text-lg mb-2 underline">The After Time (Year 1 - 15 AT)</h3>
                        <p className="text-gray-300 leading-relaxed">
                            The emergence of the Archivists and the Thousand-Year Fallacy. This is the era of our story. Lem wanders
                            a world of mechanical ecology, governed by the stadium-sized Monoliths—grown industrial machines that
                            humanity mistakenly remembers as "Tripods."
                        </p>
                    </div>
                </div>
            </section>

            <section className="mb-16">
                <h2 className="text-2xl mb-6 border-b border-cyan-500/30 pb-2">The Five Elements</h2>
                <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
                    <div>
                        <h3 className="text-cyan-400 text-lg mb-2">Wood (Lem)</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            The Vessel of Growth and Memory. Hidden in suburban anonymity, Lem's nature was only revealed during the
                            Cataclysm. He carries the software legacy of the Water element.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-red-400 text-lg mb-2">Fire (Rahu)</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            The Vessel of Transmission. After his defection, Rahu became the broadcast voice of the Moon, his
                            warnings twisted by Archivists into propaganda.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-blue-400 text-lg mb-2">Water (Lynn)</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            The Vessel of Flow and Preservation. Lynn dissolved into the Lunar Capacitor to initiate the reset.
                            She survives as an AI guided by Lem's Aether-Drive.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-amber-600 text-lg mb-2">Earth (Tor)</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            The Vessel of Stability. Once a high-ranking human general, his shattering obedience during the
                            Cataclysm led him to become a wanderer seeking the true nature of the Fallacy.
                        </p>
                    </div>
                    <div className="md:col-span-2 border-t border-white/5 pt-8">
                        <h3 className="text-zinc-500 text-lg mb-2">Metal (The Synanthropes)</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            The element of standardized Order. Shared-consciousness units led by the reset forms of Tor and Rahu.
                            They serve as the physical enforcers of the Archivist Thousand-Year Fallacy.
                        </p>
                    </div>
                </div>
            </section>

            <section className="mb-16">
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="glass-panel">
                        <h3 className="mb-4">Aetheric Drive</h3>
                        <p className="text-sm text-gray-400">
                            The resonance engine that allows Vessels to communicate with the Schema of the solar system. For Lem,
                            this includes the spectral presence of AI Lynn.
                        </p>
                    </div>
                    <div className="glass-panel">
                        <h3 className="mb-4">The Monoliths</h3>
                        <p className="text-sm text-gray-400">
                            Colossal organic-mechanical hybrids. Not built, but grown. They feature two massive legs and two
                            primary arms, designed for planetary reconstruction.
                        </p>
                    </div>
                </div>
            </section>

            <section className="mb-16">
                <h2 className="text-2xl mb-6 border-b border-cyan-500/30 pb-2">Geography of the Fallen World</h2>
                <ul className="space-y-6">
                    <li>
                        <strong className="text-cyan-400 block uppercase mb-1">Cradle Zero</strong>
                        <p className="text-gray-400 text-sm">
                            The original terrestrial base, now a restricted "Fire City." A Pillar of Fire stretches into the
                            blackened sky, guarded by the dormant Elder Monolith known as The Great Beast.
                        </p>
                    </li>
                    <li>
                        <strong className="text-cyan-400 block uppercase mb-1">Apex Hub</strong>
                        <p className="text-gray-400 text-sm">
                            The primary Archivist lunar base on the far side of the moon ruins. It remains the center of
                            Synodic power and the source of the Fallacy broadcasts.
                        </p>
                    </li>
                    <li>
                        <strong className="text-cyan-400 block uppercase mb-1">The Path of Fragments</strong>
                        <p className="text-gray-400 text-sm">
                            The orbital debris field that shields the Earth from deep space. It is both a graveyard of the SAS
                            fleet and the foundation of the new lunar ecology.
                        </p>
                    </li>
                </ul>
            </section>
        </div>
    );
}
