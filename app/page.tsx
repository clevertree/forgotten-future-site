import Link from 'next/link';
import Image from 'next/image';

const prefixPath = (path: string) => {
    const prefix = process.env.NEXT_PUBLIC_BASE_PATH || '';
    return `${prefix}${path}`;
};

export default function Home() {
    return (
        <main className="min-h-screen bg-black text-white selection:bg-cyan-500/30">
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden border-b border-white/10">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black z-10" />
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover opacity-60"
                        style={{ filter: 'grayscale(100%) contrast(120%)' }}
                    >
                        <source src={prefixPath('/media/bg_glitch.mp4')} type="video/mp4" />
                    </video>
                </div>

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <div className="inline-block mb-4 px-3 py-1 border border-cyan-500/50 bg-cyan-500/10 text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase animate-pulse">
                        Signal Detected // Era: post-Fry
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter italic">
                        FORGOTTEN<br />
                        <span className="text-cyan-500">FUTURE</span><br />
                        STARS DIE
                    </h1>
                    <p className="text-sm md:text-lg text-gray-400 mb-8 tracking-wide max-w-xl mx-auto leading-relaxed">
                        A thousand years of human history, erased in a single Cataclysm.
                        A new Dark Age has begun.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
                        <Link href="/manuscript" className="px-8 py-3 md:py-4 bg-cyan-500 text-black font-bold uppercase tracking-widest hover:bg-cyan-400 transition-all text-sm md:text-base">
                            Read Manuscript
                        </Link>
                        <Link href="/story" className="px-8 py-3 md:py-4 border border-white/20 hover:bg-white/10 font-bold uppercase tracking-widest transition-all text-sm md:text-base">
                            Explore Lore
                        </Link>
                    </div>
                </div>
            </section>

            {/* Development Status */}
            <section className="w-full max-w-7xl mx-auto px-6 -mt-8 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Story Status */}
                    <div className="glass-panel group hover:border-cyan-500/30 transition-all">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-zinc-400 text-xs font-bold uppercase tracking-widest">Repository: Story</h3>
                            <span className="text-[10px] bg-cyan-500/10 text-cyan-500 px-2 py-0.5 rounded border border-cyan-500/20">v0.10.7</span>
                        </div>
                        <div className="space-y-3 mb-6">
                            <div className="text-[10px] text-zinc-500 font-mono leading-tight">
                                <div className="flex gap-2">
                                    <span className="text-cyan-500/50">46edc75</span>
                                    <span className="truncate">Narrative correction: Chapters 5, 6, 7. Updated Iris Novak rescue, pilot silence, and the Battle of the Pyramid mechanics.</span>
                                </div>
                                <div className="flex gap-2">
                                    <span className="text-cyan-500/50">0b4c654</span>
                                    <span className="truncate">feat: clarify Lem's aetherical connection and Gorgon liberation in Ch 32</span>
                                </div>
                                <div className="flex gap-2">
                                    <span className="text-cyan-500/50">0d7f8db</span>
                                    <span className="truncate">feat: assemble 32-chapter FULL_MANUSCRIPT and sync terminology</span>
                                </div>
                            </div>
                        </div>
                        <a href="https://github.com/clevertree/ff-story/commits/main/" target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold text-cyan-500 uppercase tracking-widest hover:text-cyan-400 inline-flex items-center gap-2">
                            GitHub Source <span className="text-lg">→</span>
                        </a>
                    </div>

                    {/* Teaser Status */}
                    <div className="glass-panel group hover:border-cyan-500/30 transition-all">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-zinc-400 text-xs font-bold uppercase tracking-widest">Repository: Teaser</h3>
                            <span className="text-[10px] bg-cyan-500/10 text-cyan-500 px-2 py-0.5 rounded border border-cyan-500/20">v0.9.7</span>
                        </div>
                        <div className="space-y-3 mb-6">
                            <div className="text-[10px] text-zinc-500 font-mono leading-tight">
                                <div className="flex gap-2">
                                    <span className="text-cyan-500/50">99672b0</span>
                                    <span className="truncate">chore: sync metadata with 32-chapter structure</span>
                                </div>
                                <div className="flex gap-2">
                                    <span className="text-cyan-500/50">bc5785a</span>
                                    <span className="truncate">chore: sync metadata with 32-chapter structure</span>
                                </div>
                                <div className="flex gap-2">
                                    <span className="text-cyan-500/50">3720f29</span>
                                    <span className="truncate">Add independent pre-commit hook</span>
                                </div>
                            </div>
                        </div>
                        <a href="https://github.com/clevertree/ff-teaser/commits/main/" target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold text-cyan-500 uppercase tracking-widest hover:text-cyan-400 inline-flex items-center gap-2">
                            GitHub Source <span className="text-lg">→</span>
                        </a>
                    </div>

                    {/* Website Status */}
                    <div className="glass-panel group hover:border-cyan-500/30 transition-all">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-zinc-400 text-xs font-bold uppercase tracking-widest">Repository: Site</h3>
                            <span className="text-[10px] bg-cyan-500/10 text-cyan-500 px-2 py-0.5 rounded border border-cyan-500/20">v0.10.9</span>
                        </div>
                        <div className="space-y-3 mb-6">
                            <div className="text-[10px] text-zinc-500 font-mono leading-tight">
                                <div className="flex gap-2">
                                    <span className="text-cyan-500/50">c1d4cff</span>
                                    <span className="truncate">feat: sync updated Chapter 32 manuscript and summary to website</span>
                                </div>
                                <div className="flex gap-2">
                                    <span className="text-cyan-500/50">33e73c1</span>
                                    <span className="truncate">Frontend: transition to static 32-chapter full-text reader and fix audio build error</span>
                                </div>
                                <div className="flex gap-2">
                                    <span className="text-cyan-500/50">1fdfc0b</span>
                                    <span className="truncate">feat: sync 32-chapter manuscript and update frontend indexing</span>
                                </div>
                            </div>
                        </div>
                        <a href="https://github.com/clevertree/forgotten-future-site/commits/master/" target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold text-cyan-500 uppercase tracking-widest hover:text-cyan-400 inline-flex items-center gap-2">
                            GitHub Source <span className="text-lg">→</span>
                        </a>
                    </div>
                </div>
            </section>

            {/* Narrative Intro */}
            <section className="container mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center">
                <div className="glass-panel">
                    <h2 className="text-3xl mb-6">The Great Fry</h2>
                    <p className="text-gray-300 leading-relaxed mb-6">
                        When the Moon shattered, it wasn't just stone that fell. The Lunar Capacitor discharge—the event now known as
                        the <strong>Great Fry</strong>—incinerated the electronic foundations of our world. A hundred thousand years
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
                    <Image
                        src={prefixPath('/media/teaser/hero_great_fry.png')}
                        alt="The Great Fry"
                        fill
                        className="absolute inset-0 w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                </div>
            </section>

            {/* The Elements */}
            <section className="w-full bg-zinc-900/50 py-24">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl md:text-4xl text-center mb-16 underline decoration-cyan-500 underline-offset-8">THE FIVE ELEMENTS</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
                        {[
                            { name: 'LEM', element: 'Wood', desc: 'Hidden in suburban anonymity until the Cataclysm revealed his nature.' },
                            { name: 'RAHU', element: 'Fire', desc: 'The exiled broadcast of the Moon, twisted into the Archivists\' propaganda.' },
                            { name: 'LYNN', element: 'Water', desc: 'Her software legacy remains as a spectral guide in the Aether-Drive.' },
                            { name: 'TOR', element: 'Earth', desc: 'A general whose obedience shattered with the Moon, now a wanderer seeking purpose.' },
                            { name: 'METAL', element: 'Order', desc: 'Shared-consciousness enforcers led by Tor and Rahu. Physically powerful, but devoid of individual spirits.' }
                        ].map((vessel) => (
                            <div key={vessel.name} className="glass-panel text-center">
                                <h3 className="text-xl mb-2">{vessel.name}</h3>
                                <span className="text-xs text-cyan-500 uppercase tracking-[0.2em] mb-4 block">{vessel.element}</span>
                                <p className="text-sm text-gray-400 leading-relaxed">{vessel.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
