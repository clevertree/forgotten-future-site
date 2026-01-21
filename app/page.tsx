import Link from 'next/link';
import Image from 'next/image';
import HeroSlideshow from './components/HeroSlideshow';
import PwaRedirect from './components/PwaRedirect';
import RepoStatus from './components/RepoStatus';
import gitHistory from '@/lib/git-history.json';
import { VesselCard } from './components/VesselCard';

const prefixPath = (path: string) => {
    const prefix = process.env.NEXT_PUBLIC_BASE_PATH || '';
    return `${prefix}${path}`;
};

export default function Home() {
    const heroImages = [
        prefixPath('/media/teaser/ff-title.png'),
        prefixPath('/media/teaser/hero_1_future_war_&_pillar_of_fire_1.png'),
        prefixPath('/media/teaser/hero_2_mechanical_white_forest_2.png'),
        prefixPath('/media/teaser/hero_3_desert_base_4.png'),
        prefixPath('/media/teaser/hero_background_spheres.png'),
        prefixPath('/media/teaser/hero_disintegrating_moon.png'),
        prefixPath('/media/teaser/hero_front_bg.png'),
        prefixPath('/media/teaser/hero_great_beast.png'),
        prefixPath('/media/teaser/hero_great_fry.png'),
        prefixPath('/media/teaser/hero_incubating_cube.png'),
        prefixPath('/media/teaser/hero_lem_moon.png'),
        prefixPath('/media/teaser/hero_lightning_scars.png'),
        prefixPath('/media/teaser/hero_melting_building.png'),
        prefixPath('/media/teaser/hero_moon_eruption_v2.png'),
        prefixPath('/media/teaser/hero_pillar_of_fire.png'),
        prefixPath('/media/teaser/hero_redacted_prophecy.png'),
        prefixPath('/media/teaser/hero_synodic_walkers.png'),
        prefixPath('/media/teaser/hero_windows_sigh.png'),
        prefixPath('/media/teaser/hero_witch_humanoids.png'),
    ];

    return (
        <main className="min-h-screen bg-black text-white selection:bg-cyan-500/30">
            <PwaRedirect />
            {/* Hero Section */}
            <section className="relative h-[80vh] flex items-center justify-center overflow-hidden border-b border-white/10">
                <HeroSlideshow images={heroImages} videoSrc={prefixPath('/media/bg_glitch.mp4')} />

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <div className="inline-block mb-4 px-3 py-1 border border-cyan-500/50 bg-cyan-500/10 text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase animate-pulse">
                        Signal Detected // Era: post-Fry
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter italic">
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
            <section className="w-full max-w-7xl mx-auto px-6 mt-8 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <RepoStatus
                        name="Story"
                        apiUrl={process.env.NEXT_PUBLIC_REPO_STORY || ''}
                        repoUrl="https://github.com/clevertree/ff-story/commits/main/"
                        initialData={(gitHistory as any)['ff-story']}
                    />
                    <RepoStatus
                        name="Teaser"
                        apiUrl={process.env.NEXT_PUBLIC_REPO_TEASER || ''}
                        repoUrl="https://github.com/clevertree/ff-teaser/commits/main/"
                        initialData={(gitHistory as any)['ff-teaser']}
                    />
                    <RepoStatus
                        name="Site"
                        apiUrl={process.env.NEXT_PUBLIC_REPO_SITE || ''}
                        repoUrl="https://github.com/clevertree/forgotten-future-site/commits/master/"
                        initialData={(gitHistory as any)['forgotten-future-site']}
                    />
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
                        In the aftermath, the ruling Council of the Technocratic Core rebranded themselves as the <strong>Archivists</strong>,
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
                            <VesselCard
                                key={vessel.name}
                                name={vessel.name}
                                element={vessel.element}
                                description={vessel.desc}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
