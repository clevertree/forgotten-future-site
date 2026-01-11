'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ManuscriptPage() {
    const [playingId, setPlayingId] = useState<number | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const scrollContainerRef = useRef<HTMLDivElement | null>(null);
    const router = useRouter();

    const chapters = [
        { id: 1, title: 'Invasion', summary: "Lem's suburban life shatters as machines appear on the horizon.", audio: '/audio/manuscript/chapter_01.mp3' },
        { id: 2, title: 'Lynn', summary: 'Lynn arrives and forces Lem into activation.' },
        { id: 3, title: 'Doorway', summary: 'Lem discovers he is not human; Lynn installs remote compulsion.' },
        { id: 4, title: 'Drafted', summary: 'Lem is embedded with soldiers for a desperate Moon mission.' },
        { id: 5, title: 'The Briefing He Never Had', summary: 'Soldiers discuss psychological warfare and hidden truths.' },
        { id: 6, title: 'The Near Moon', summary: 'Visual confirmation that the Moon is not what humanity was taught.' },
        { id: 7, title: 'Zenith', summary: 'Ship reaches lunar altitude; one soldier breaks psychologically; Lynn makes a ruthless decision.' },
        { id: 8, title: 'The Shattered Approach', summary: "Tor's broadcast; Moon begins to fragment; The Caucasian Eagle is struck and falls toward surface." },
        { id: 9, title: 'Waking in the Dream and the Rescue', summary: 'Lem survives impact and Aether-Drive fugue; rescued by repair vehicle; Novak activates Lem\'s mission; isolated on lunar surface.' },
        { id: 10, title: 'Alone on the Moon', summary: 'Lem joins strike team; plasma cannon engagement; multiple casualties; Rahu emerges as active threat.' },
        { id: 11, title: 'Rahu', summary: "Lem recognizes Rahu as a Vessel; Tor sacrifices the Hermes to suppress Rahu's advance; Novak assumes command; the mission continues." },
        { id: 12, title: 'The Pyramid', summary: 'Strike force reaches pyramid at base\'s center; Tor emerges alive; Rahu revealed to be alive inside; soldiers prepare for battle.' },
        { id: 13, title: 'The Confrontation', summary: 'Soldiers engage Rahu; Lynn reveals share history and ancient argument; Lynn merges with Lem into Wood/Water entity; Rahu defeated; Lynn dissolves into Lunar Capacitor to initiate system reset.' },
        { id: 14, title: 'The Shifting Moon', summary: "Rahu disrupts the system reset causing the 'Great Fry'; Lynn remains missing; Novak places both Rahu and Lem into stasis." },
        { id: 15, title: 'The Path of Fragments', summary: "Lem's stasis dream; Lynn's software visitation; revelation of the Cosmic Life Cycle and the warning of the Bright Path snare." },
        { id: 16, title: 'The Return', summary: 'Mission 1 has already begun; Lem\'s consciousness migrates to a Gorgon body at Cradle Zero; Rahu arrives.' },
        { id: 17, title: 'The Spirit Port', summary: "Rahu probes the 'Staring Gorgon's' memories; Lem is identified as 'Mara.'" },
        { id: 18, title: 'Disintegration', summary: "Rahu panics and is remote-detonated; Core's remote operation and limited visibility highlighted." },
        { id: 19, title: 'The New Lab', summary: 'Lem\'s spirit is captured and analyzed by Dr. Vane and Novak; Core is mystified by his survival.' },
        { id: 20, title: 'The Awakening', summary: 'Reconnected with AI Lynn, Lem resists reformatting while hiding his true memory.' },
        { id: 21, title: 'The Aggressive Expansion Briefing', summary: 'Lem is put onto Mission 2 immediately; Core ignores the significance of his power; briefing on utopian cities.' },
        { id: 22, title: 'Deployment to the Desert', summary: "Deployment to the equatorial dead zone; introduction to the 'wild' Monoliths; the dangerous loyalty test." },
        { id: 23, title: 'The Beacon Strike', summary: 'The mission turns violent; Lem experiences his first reincarnation; Metal Vessels begin to see him as Rahu\'s replacement.' },
        { id: 24, title: 'The Acclaim of Success', summary: "Perimeter cleared; Lem is awarded as the 'New Hero'; Metal Vessels recognize his spiritual life and independence." },
        { id: 25, title: 'The Rise of the Utopian Hive', summary: 'Utopian Hive takes shape; Lem realizes the paradise is a prison; he reaches the height of his esteem with the Corps.' },
        { id: 26, title: 'The Northern Shield Briefing', summary: 'Lem is sent to the north; Rahu is redeployed but contact is forbidden; Lem meets Arlo.' },
        { id: 27, title: 'Deployment to the North', summary: "Rapid deployment; villagers' distrust of tech; Arlo's desire to join the Corps vs. village rigidity." },
        { id: 28, title: 'The Village Encounter', summary: 'Tripods refuse to attack the village; a soldier shoots unprovoked; the moral dilemma of engagement.' },
        { id: 29, title: 'The Tripod Anomaly', summary: 'Core orders a hunt for the Tripods; violent forest engagement; Arlo refuses conscription; beacon removal demanded.' },
        { id: 30, title: 'The White Forest Briefing', summary: 'Mission 4 infiltration; search for inhabitants; Cassia gives Lem tactical control.' },
        { id: 31, title: 'The Electronic Snake', summary: 'Lem is consumed by an electronic snake; the anomaly of high-detail reincarnation memory.' },
        { id: 32, title: 'The Grinding Path', summary: "Multiple deployments; the 'grinding' nature of the mission; discovery of the sunlit clearing." },
        { id: 33, title: 'Myrr', summary: "Contact with Myrr; revelation of the 'King of the Gorgons'; analog vs digital sanctuary." },
        { id: 34, title: 'The Analog Interface', summary: 'Lem agrees to the analog read; Myrr encounters the Cataclysm data; the psychic crash and Lem\'s shattering.' },
        { id: 35, title: 'The Final Word', summary: 'Confrontation with Anton Drexler; the "Fatalist Fallacy" revealed; Lem forced into electrostatic stasis.' },
        { id: 36, title: 'The Stasis Slumber', summary: "Years pass in stasis; Lem's recursive vision of the White Forest massacre." },
        { id: 37, title: 'The Blooming Forest', summary: 'Lem returns to the White Forest ruins in his dream; transition to reality in the clearing.' },
        { id: 38, title: 'Analog Lem', summary: 'Lem manifests as Analog Lem; the forest assault continues; ambush at the crashed carrier.' },
        { id: 39, title: 'The Parting in the Ash', summary: 'Conversation with Myrr; the revelation of the "Key"; reabsorption of the cargo vehicle.' },
        { id: 40, title: 'The Exile', summary: 'Lem observes Rahu and the arsenal; final departure into the wilderness.' },
        { id: 41, title: 'The Wilderness Years', summary: 'Solitude and aetheric evolution; the realization of the "Maya Match" software clue.' },
        { id: 42, title: 'The Arsenal Blueprint', summary: 'Return to the White Forest ruins; the stolen database revelation; manifestation of the Analog Hovercraft.' },
        { id: 43, title: 'The Return to the North', summary: 'Flight across the Hive Cities; discovery that the Mission 3 villages remain untouched.' },
        { id: 44, title: 'The Whistle in the Woods', summary: 'Reunion with Myrr; Lem manifests a new Human Interface Device; shared mission to find the Water Vessel.' },
        { id: 45, title: 'The Village Leader', summary: 'Lem reunites with Arlo; disclosure of the Tripod attacks and the Beacon resistance.' },
        { id: 46, title: 'The Witch Maya', summary: 'Lem identifies Arlo as the Water Vessel\'s spirit; Arlo rejects the "Maya" identity.' },
        { id: 47, title: 'The Shore of Shadows', summary: 'The hike out of the village; Arlo maintains his skepticism while seeking to save his village.' },
        { id: 48, title: 'The Interface Vision', summary: 'Arlo uses the HID to witness the raw record of the Moon Cataclysm; the Fallacy is shattered.' },
        { id: 49, title: 'The Great Refusal', summary: 'Arlo rejects the mission and his identification as a Vessel spirit; the Crew\'s disillusionment.' },
        { id: 50, title: 'Plan B', summary: 'Arlo returns to the village; the Crew resolves to launch a direct assault on the Core\'s desert base.' },
        { id: 51, title: 'The Arsenal of the Ash', summary: 'Lem develops hybrid wood-core tech; Mission 5 deployment; the Node strategy.' },
        { id: 52, title: 'The Battle of Trees', summary: 'The automated assault on the city node; the mystery of the absent defense.' },
        { id: 53, title: 'The Blackout', summary: 'The Node trap is sprung; city-wide blackout; the "Architect\'s" propaganda statement.' },
        { id: 54, title: 'The Desert Perimeter', summary: 'The Crew\'s refusal to quit; massive mobilization of the Tree Army.' },
        { id: 55, title: 'The Falling Suns', summary: 'Moon pods launch a counter-attack; the arrival of the Sky-Monoliths; symmetric warfare.' },
        { id: 56, title: 'The Final Arc', summary: 'The infiltration fleet\'s dash for Cradle Zero; the gamble against the Core\'s infrastructure.' },
        { id: 57, title: 'The Invisible Front', summary: 'The infiltration battle at Cradle Zero; the Tree Army is dismantled by a phantom enemy.' },
        { id: 58, title: 'The Identification of the Fire', summary: 'Rahu is identified as the invisible foe; the terrifying reality of his mastery.' },
        { id: 59, title: 'The Great Stalemate', summary: 'Disillusionment and the passage of time; the Crew\'s isolation in the wilderness.' },
        { id: 60, title: 'The Core Debate', summary: 'Internal debates within the Core leadership regarding the "Maya" problem.' },
        { id: 61, title: 'The Failing Cities', summary: 'The rise of pro-villager sentiment in the Hive Cities; failure of the Core\'s utopia.' },
        { id: 62, title: 'The Peaceful Emissary', summary: 'The Core\'s diplomatic gambit; a respectful emissary arrives with an ultimatum.' },
        { id: 63, title: 'Cassia\'s Warning', summary: 'Cassia Vane\'s secret plea to Arlo; the revelation of "Plan B."' },
        { id: 64, title: 'The Stoic Refusal', summary: 'Arlo\'s reasoned rejection of the Core\'s offer; acceptance of the inevitable cost.' },
        { id: 65, title: 'The Infiltration Gambit', summary: 'Lem infiltrates the desert base Cradle Zero, meets Iris Novak, and accepts a mission to the Fire Cities to find a stalemate.' },
        { id: 66, title: 'The Pillar of Fire', summary: 'Lem journeys to an equatorial Fire City, using a wood-water hybrid shield to survive the intense solar heat barrier.' },
        { id: 67, title: 'The Greeting', summary: 'Lem achieves the first peaceful contact with a Gorgon and discovers the truth behind the attacks on the Northern villages.' },
        { id: 68, title: 'The False Stalemate', summary: 'A companion is released as part of the deal, but the Core immediately breaks the truce with a propaganda strike against Arlo.' },
    ];

    const togglePlay = (id: number, url: string) => {
        if (playingId === id) {
            audioRef.current?.pause();
            setPlayingId(null);
        } else {
            setPlayingId(id);
            if (audioRef.current) {
                audioRef.current.src = url;
                audioRef.current.play();
            }
        }
    };

    const sections = [
        {
            id: 'shattered-approach',
            title: 'Part I: The Shattered Approach',
            range: [1, 15],
            summary: "The end of the Before Time and the desperate struggle on the Moon that leads to the Great Fry."
        },
        {
            id: 'thousand-year-fallacy',
            title: 'Part II: The Thousand-Year Fallacy',
            range: [16, 29],
            summary: "Lem wakes in Year 15 AT, serving a 'utopian' Core while discovering the propaganda of the Archivists."
        },
        {
            id: 'white-forest',
            title: 'Part III: The White Forest',
            range: [30, 40],
            summary: "A journey into the frozen north, the revelation of the King of the Gorgons, and Lem's transition to Analog."
        },
        {
            id: 'analog-dawn',
            title: 'Part IV: The Analog Dawn',
            range: [41, 58],
            summary: "The mobilization of the Tree Army, the search for the Water Vessel, and the confrontation with Rahu."
        },
        {
            id: 'great-stalemate',
            title: 'Part V: The Great Stalemate',
            range: [59, 68],
            summary: "The silent years of resistance and the final diplomatic ultimatum that precedes the final storm."
        },
    ];

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        const container = scrollContainerRef.current;
        if (element && container) {
            container.scrollTo({
                top: element.offsetTop,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="container mx-auto px-6 py-12">
            {/* Hidden audio element for global control */}
            <audio
                ref={audioRef}
                onEnded={() => setPlayingId(null)}
                className="hidden"
            />

            <div className="flex flex-col lg:flex-row gap-12">
                {/* Audiobook Sidebar */}
                <aside className="lg:w-1/3 no-print order-2 lg:order-1">
                    <div className="glass-panel sticky top-32">
                        <h2 className="text-xl mb-4 underline underline-offset-4 decoration-cyan-500 text-center lg:text-left">Full Audiobook</h2>
                        <div className="bg-black/50 p-6 rounded border border-white/5 mb-6">
                            <div className="flex flex-col items-center justify-center space-y-4">
                                <div className="text-xs text-zinc-500 uppercase tracking-widest">Available Now</div>
                                <div className="text-2xl font-bold text-glow text-cyan-400">Chapter 1</div>
                                <div className="text-[10px] text-zinc-600 italic text-center">
                                    "Invasion" <br />
                                    (Narrated by Fable)
                                </div>
                                <div className="w-full pt-4">
                                    <button
                                        onClick={() => togglePlay(1, '/audio/manuscript/chapter_01.mp3')}
                                        className={`w-full py-2 rounded text-xs font-bold uppercase tracking-widest transition-all border ${playingId === 1
                                            ? 'bg-cyan-500 text-black border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.5)]'
                                            : 'bg-transparent text-cyan-500 border-cyan-500/30 hover:bg-cyan-500/10'
                                            }`}
                                    >
                                        {playingId === 1 ? '⏸ Playing' : '▶ Play Audio'}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed mb-6">
                            Audio is generated iteratively. Each chapter is narrated as the draft stabilizes to ensure narrative accuracy.
                        </p>
                        <div className="space-y-4">
                            <Link href="/manuscript/full-text" className="block text-center text-xs font-bold text-cyan-500 uppercase tracking-widest border border-cyan-500/30 py-3 rounded hover:bg-cyan-500/10 transition-all">
                                Read as Full Text
                            </Link>
                            <div className="pt-4 border-t border-white/5">
                                <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-3 font-bold">Recommended Text-to-Speech:</p>
                                <ul className="text-[10px] text-zinc-600 space-y-3">
                                    <li className="flex flex-col">
                                        <a href="https://chromewebstore.google.com/detail/read-aloud-a-text-to-spee/hdhinadidafjejdhmfkjgnolgjacajbc" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-cyan-400 underline decoration-zinc-800 underline-offset-2 transition-colors">• Read Aloud</a>
                                        <span>Chrome / Edge extension</span>
                                    </li>
                                    <li className="flex flex-col">
                                        <a href="https://www.naturalreaders.com/online/" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-cyan-400 underline decoration-zinc-800 underline-offset-2 transition-colors">• NaturalReader</a>
                                        <span>Browser extension / App</span>
                                    </li>
                                    <li className="flex flex-col">
                                        <a href="https://speechify.com/" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-cyan-400 underline decoration-zinc-800 underline-offset-2 transition-colors">• Speechify</a>
                                        <span>Focused reading tool</span>
                                    </li>
                                    <li className="flex flex-col mt-2 pt-2 border-t border-white/5 uppercase tracking-tighter">
                                        <span className="text-cyan-500/50">Pro Tip:</span>
                                        <span>On mobile, use Google's "Listen to this page" in Chrome.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Chapters List */}
                <div className="lg:w-2/3 order-1 lg:order-2">
                    <h1 className="text-3xl md:text-4xl mb-8 text-glow uppercase tracking-tighter">Manuscript: Lem's Memories</h1>

                    {/* Section Tabs */}
                    <div className="flex flex-wrap gap-2 mb-8 sticky top-20 z-10 bg-black/80 backdrop-blur-sm py-4 border-b border-white/5 no-print">
                        {sections.map((section) => (
                            <button
                                key={section.id}
                                onClick={() => scrollToSection(section.id)}
                                className="px-4 py-2 rounded text-[10px] font-bold uppercase tracking-widest border border-cyan-500/30 text-cyan-500 hover:bg-cyan-500/10 transition-all active:scale-95"
                            >
                                {section.title}
                            </button>
                        ))}
                    </div>

                    <div ref={scrollContainerRef} className="space-y-12 h-[calc(100vh-300px)] overflow-y-auto pr-4 scroll-smooth custom-scrollbar relative">
                        {sections.map((section) => (
                            <div key={section.id} id={section.id} className="pt-8 first:pt-0">
                                <h2 className="text-xl mb-2 text-cyan-400 uppercase tracking-widest flex items-center gap-4">
                                    <span className="h-px bg-cyan-900 flex-grow"></span>
                                    {section.title}
                                    <span className="h-px bg-cyan-900 flex-grow"></span>
                                </h2>
                                <p className="text-xs text-zinc-500 italic mb-8 text-center max-w-xl mx-auto">
                                    {section.summary}
                                </p>
                                <div className="space-y-6">
                                    {chapters
                                        .filter((chapter) => chapter.id >= section.range[0] && chapter.id <= section.range[1])
                                        .map((chapter) => (
                                            <div
                                                key={chapter.id}
                                                className="glass-panel hover:border-cyan-500/50 transition-colors cursor-pointer group"
                                                onClick={() => router.push(`/manuscript/full-text#chapter-${chapter.id}`)}
                                            >
                                                <div className="flex justify-between items-start mb-2">
                                                    <h3 className="text-xl group-hover:text-cyan-400 transition-colors">
                                                        Chapter {chapter.id}: {chapter.title}
                                                    </h3>
                                                    <span className="text-xs text-zinc-500 uppercase tracking-widest pt-1">PHASE VI DRAFT</span>
                                                </div>
                                                <p className="text-sm text-gray-400 leading-relaxed">
                                                    {chapter.summary}
                                                </p>
                                                <div className="mt-4 flex flex-wrap gap-4 no-print items-center">
                                                    <span
                                                        className="text-[10px] font-bold text-cyan-500 uppercase tracking-[0.2em] border border-cyan-900 px-4 py-1.5 rounded hover:bg-cyan-900/20 transition-all"
                                                    >
                                                        Read Chapter
                                                    </span>

                                                    <button
                                                        disabled={!chapter.audio}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            if (chapter.audio) togglePlay(chapter.id, chapter.audio);
                                                        }}
                                                        className={`text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded transition-all border ${!chapter.audio
                                                            ? 'border-zinc-800 text-zinc-700 cursor-not-allowed opacity-50'
                                                            : playingId === chapter.id
                                                                ? 'bg-cyan-500 text-black border-cyan-500'
                                                                : 'border-cyan-500/30 text-cyan-500 hover:bg-cyan-500/10'
                                                            }`}
                                                    >
                                                        {playingId === chapter.id ? '⏸ Pause' : '▶ Play Audio'}
                                                    </button>

                                                    {chapter.audio && (
                                                        <div className="flex items-center gap-2 text-zinc-500 ml-2">
                                                            <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse"></span>
                                                            <span className="text-[10px] uppercase tracking-widest font-bold">Live</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        ))}
                        <div className="mt-16 p-8 border border-dashed border-white/10 text-center rounded-lg mb-12">
                            <p className="text-zinc-600 text-sm italic">
                                The First Edition of Lem's Memories is complete.
                                Further aetheric logs may be uncompiled in future iterations.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
