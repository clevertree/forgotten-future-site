import React from 'react';

export default function MediaPage() {
    return (
        <div className="container mx-auto px-6 py-12">
            <h1 className="text-5xl mb-12 text-glow">RECORDS OF THE REVELATION</h1>

            {/* Featured Teaser Section */}
            <section className="mb-24">
                <h2 className="text-2xl mb-8 border-b border-cyan-500/30 pb-2 uppercase tracking-widest">Animated Teaser</h2>
                <div className="glass-panel">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h3 className="text-3xl font-black mb-2 text-glow">STARS DIE TEASER</h3>
                            <p className="text-cyan-500 text-sm mb-6 uppercase tracking-widest font-bold">
                                Featuring song by Porcupine Tree • 1995
                            </p>
                            <p className="text-gray-400 mb-8 leading-relaxed">
                                This teaser serves as the atmospheric threshold for the <strong>Forgotten Future</strong> narrative.
                                It depicts the final moments of the Pre-Time era, the shattering of the Moon, and the
                                descent of the stadium-sized Monoliths.
                            </p>
                            <div className="bg-zinc-900/80 p-6 rounded-lg border border-white/5">
                                <p className="text-xs text-zinc-500 uppercase tracking-widest mb-4">Teaser Audio Stream</p>
                                <audio controls className="w-full h-8 accent-cyan-500">
                                    <source src="/media/teaser/stars_die.mp3" type="audio/mpeg" />
                                    Your browser does not support the audio element.
                                </audio>
                            </div>
                        </div>
                        <div className="relative aspect-video bg-black rounded-lg overflow-hidden border border-white/10 group">
                            <img
                                src="/media/teaser/hero_synodic_walkers.png"
                                alt="Synodic Walkers in the City"
                                className="object-cover w-full h-full opacity-60 group-hover:opacity-100 transition-opacity duration-700"
                            />
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <span className="bg-cyan-500/20 text-cyan-400 text-[10px] uppercase tracking-[0.4em] px-4 py-2 border border-cyan-500/30 backdrop-blur-sm">
                                    Visual Preview
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Visual Archive Section */}
            <section className="mb-24">
                <h2 className="text-2xl mb-8 border-b border-cyan-500/30 pb-2 uppercase tracking-widest">Visual Schematics</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { src: '/media/teaser/hero_redacted_prophecy.png', title: 'Redacted Prophecy', meta: 'Initial Contact Record' },
                        { src: '/media/teaser/hero_great_beast.png', title: 'The Great Beast', meta: 'Elder Monolith Schematic' },
                        { src: '/media/teaser/hero_pillar_of_fire.png', title: 'Cradle Zero', meta: 'Decade of Revelation' },
                        { src: '/media/teaser/hero_moon_eruption_v2.png', title: 'Lunar Eruption', meta: 'Day 0 Post-Reset' },
                        { src: '/media/teaser/hero_burning_forest.png', title: 'Scorched Earth', meta: 'Resource Reclamation' },
                        { src: '/media/teaser/hero_synodic_walkers.png', title: 'First Wave', meta: 'The Fallacy Broadcast' },
                    ].map((item, i) => (
                        <div key={i} className="glass-panel group cursor-pointer overflow-hidden">
                            <div className="aspect-video bg-zinc-900 mb-4 overflow-hidden rounded">
                                <img
                                    src={item.src}
                                    alt={item.title}
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500"
                                />
                            </div>
                            <h3 className="text-sm uppercase tracking-widest mb-1 text-cyan-400 group-hover:text-glow transition-all">{item.title}</h3>
                            <p className="text-[10px] text-zinc-500 uppercase tracking-widest">{item.meta}</p>
                        </div>
                    ))}
                </div>
            </section>

        </div>
    );
}
