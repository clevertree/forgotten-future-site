import React from 'react';
import Link from 'next/link';

export default function Home() {
    return (
        <div className="flex flex-col items-center">
            {/* Hero Section */}
            <section className="relative w-full h-[80vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-cyan-900/20 to-black z-0"></div>
                <div className="z-10 max-w-4xl">
                    <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter text-glow">
                        THE STARS DIE
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-400 mb-12 tracking-wide max-w-2xl mx-auto">
                        A hundred thousand years of human history, erased in a single lunar discharge.
                        The age of the Monoliths has begun.
                    </p>
                    <div className="flex flex-wrap justify-center gap-6">
                        <Link href="/manuscript" className="px-8 py-4 bg-cyan-500 text-black font-bold uppercase tracking-widest hover:bg-cyan-400 transition-all">
                            Read Manuscript
                        </Link>
                        <Link href="/story" className="px-8 py-4 border border-white/20 hover:bg-white/10 font-bold uppercase tracking-widest transition-all">
                            Explore Lore
                        </Link>
                    </div>
                </div>
            </section>

            {/* Narrative Intro */}
            <section className="container mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center">
                <div className="glass-panel">
                    <h2 className="text-3xl mb-6">The Great Fry</h2>
                    <p className="text-gray-300 leading-relaxed mb-6">
                        When the Moon shattered, it wasn't just stone that fell. The Lunar Capacitor discharge—the event now known as
                        the <strong>Great Fry</strong>—incinerated the digital foundations of our world. A hundred thousand years
                        of data, culture, and history vanished in a blinding flash.
                    </p>
                    <p className="text-gray-300 leading-relaxed">
                        In the aftermath, the <strong>Archivists</strong> emerged from the shadows of the Technocratic Core,
                        offering a new world of "no want and no pain." But their utopia is built on a lie: the
                        <strong>Thousand-Year Fallacy</strong>, a rewritten history designed to keep humanity in a state of
                        contented amnesia.
                    </p>
                </div>
                <div className="relative aspect-square bg-gray-900 rounded-lg overflow-hidden border border-white/10">
                    {/* Placeholder for atmospheric art */}
                    <div className="absolute inset-0 flex items-center justify-center italic text-gray-700">
                        [Visual: The Lunar Debris Field over a darkening Earth]
                    </div>
                </div>
            </section>

            {/* The Vessels */}
            <section className="w-full bg-zinc-900/50 py-24">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl text-center mb-16 underline decoration-cyan-500 underline-offset-8">THE FIVE VESSELS</h2>
                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            { name: 'LEM', element: 'Wood', desc: 'Hidden in suburban anonymity until the Cataclysm revealed his nature.' },
                            { name: 'RAHU', element: 'Fire', desc: 'The exiled broadcast of the Moon, twisted into the Archivists\' propaganda.' },
                            { name: 'LYNN', element: 'Water', desc: 'Her software legacy remains as a spectral guide in the Aether-Drive.' },
                            { name: 'TOR', element: 'Earth', desc: 'A general whose obedience shattered with the Moon, now a wanderer seeking purpose.' }
                        ].map((vessel) => (
                            <div key={vessel.name} className="glass-panel text-center">
                                <h3 className="text-xl mb-2">{vessel.name}</h3>
                                <span className="text-xs text-cyan-500 uppercase tracking-[0.2em] mb-4 block">{vessel.element}</span>
                                <p className="text-sm text-gray-400">{vessel.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="container mx-auto px-6 py-24 text-center">
                <h2 className="text-3xl mb-8">Witness the Revelation</h2>
                <p className="max-w-xl mx-auto text-gray-400 mb-12">
                    Forgotten Future is an AI-driven sci-fi novel and cross-media project.
                    Join us as we document the transition from the After Time to the final reincarnation.
                </p>
                <Link href="/media" className="text-cyan-400 hover:text-cyan-300 font-bold uppercase tracking-widest transition-colors">
                    View Teaser & Media →
                </Link>
            </section>
        </div>
    );
}
