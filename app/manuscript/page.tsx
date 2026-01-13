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
        { id: 1, title: 'An Ordinary Distance', summary: 'Lem\'s routine suburban existence—news coverage of lunar anomalies treated as abstract curiosities', audio: '/audio/manuscript/chapter_01.mp3' },
        { id: 2, title: 'Lynn', summary: 'Soldiers escort Lem inside; establish perimeter' },
        { id: 3, title: 'The Doorway', summary: 'Lem\'s unconsciousness gives way to dreamlike state—not sleep but crossing' },
        { id: 4, title: 'Drafted', summary: 'Lem in line with soldiers; boarding checkpoint' },
        { id: 5, title: 'The Briefing He Never Had', summary: 'Ship lifts off; Lem watches Earth recede through viewports' },
        { id: 6, title: 'The Near Moon', summary: 'The Moon swells in viewports far faster than expected' },
        { id: 7, title: 'Zenith', summary: 'Ship reaches altitude aligned with Moon; begins controlled descent to far side' },
        { id: 8, title: 'The Shattered Approach', summary: 'General Tor appears via intercom; addresses entire crew' },
        { id: 9, title: 'Waking in the Dream and the Rescue', summary: 'The Dream State (Aether-Drive visions)' },
        { id: 10, title: 'Alone on the Moon', summary: 'Isolation & Agency (Lem takes his first truly independent actions since reactivation)' },
        { id: 11, title: 'Rahu', summary: 'Rahu Identified (Lem\'s recognition deepens; Rahu\'s threats escalate)' },
        { id: 12, title: 'The Pyramid', summary: 'The Approach (Biker fleet reaches pyramid; outer area destabilizes)' },
        { id: 13, title: 'The Confrontation', summary: 'The Final Chamber (Forces enter; Rahu found standing confidently; Tor vs. Rahu dialogue)' },
        { id: 14, title: 'The Shifting Moon', summary: 'As the energy surge from Lynn\'s dissolution peaks, several soldiers break discipline and attempt to flee toward the seale...' },
        { id: 15, title: 'The Path of Fragments', summary: 'Immediately upon the containment field activating, Lem\'s vision closes. His body enters total paralysis, and he is forced back in...' },
        { id: 16, title: 'The Return', summary: 'Chapter 16 begins with a transition from the ending of Chapter 15. Lem, having entered the "tunnel" of his stasis-dream, finds himself in a spiritual ...' },
        { id: 17, title: 'The Spirit Port', summary: 'Rahu is frustrated by his inability to force obedience from the Gorgons, specifically one individual who seems to stand out. He is on a mission to est...' },
        { id: 18, title: 'Disintegration', summary: 'Lem experiences the sensation of being looked through like a book. Rahu\'s presence in his psyche is heavy, yet Lem remains remarkably calm, almost bor...' },
        { id: 19, title: 'The New Lab', summary: 'Lem awakes to find his "Gorgon" consciousness is gone. He is no longer looking through the eyes of a builder; instead, he exists only as a flickering ...' },
        { id: 20, title: 'The Awakening', summary: 'Lem\'s consciousness is suddenly "pulled" from the monitors and into a high-density Aether-Drive unit. As his visual sensors calibrate, the first thing...' },
        { id: 21, title: 'Aggressive Expansion', summary: 'Lem is put onto Mission 2: Deployment to the equatorial dead zone. This chapter merges the briefing and the initial deployment, focusing on the danger...' },
        { id: 22, title: 'The Beacon Strike', summary: 'Lem and the Metal Vessel legions fan out from Cradle Zero, moving in a precise, web-like formation across the nearby vall...' },
        { id: 23, title: 'The Utopian Hive', summary: 'The Hive City takes shape as the perimeter is cleared. Lem is awarded as the "New Hero," but quickly realizes that the paradise being built is a priso...' },
        { id: 24, title: 'Northern Shield', summary: 'Lem is redeployed to the North. This chapter combines the Mission 3 briefing with the rapid deployment to the village borders. Lem meets Arlo for the ...' },
        { id: 25, title: 'The Village Encounter', summary: 'Lem and his crew perform a "quick hop" from one village to another. The reception is universally cold; the villagers distrust the Corps and all techno...' },
        { id: 26, title: 'The Tripod Anomaly', summary: 'The mission in the North reaches its violent conclusion. Lem and his crew are initially ordered to protect the village from the approaching Tripods, b...' },
        { id: 27, title: 'The White Forest Mission', summary: 'Reawakening in the Cradle for Mission 4. Lem is consumed by an electronic snake and begins the "grinding" path through the White Forest. This chapter ...' },
        { id: 28, title: 'Myrr', summary: 'The newcomer identifies himself as **Myrr**. He explains that his people are survivors who have lived in a hidden sanctuary within the forest for 15 y...' },
        { id: 29, title: 'The Analog Interface', summary: 'Myrr proposes an interface. He needs to read the information Lem is storing to see if it\'s possible for his people to unlock—and ultimately dismantle—...' },
        { id: 30, title: 'The Final Word', summary: 'Chapter 35 begins immediately after Lem’s physical detonation in the White Forest clearing. He finds himself in the dream state, staring through the t...' },
        { id: 31, title: 'Stasis and Awakening', summary: 'Years pass in electrostatic stasis. Lem experiences recursive visions of the White Forest massacre before finally returning to reality in the clearing...' },
        { id: 32, title: 'Analog Lem', summary: 'Lem stands in the clearing, but he is different. For the first time, he has reconstituted himself without Core inter...' },
        { id: 33, title: 'The Parting in the Ash', summary: 'The soldiers surround Lem at the crashed carrier. He picks up their conversation through his enhanced hearing. One soldier reco...' },
        { id: 34, title: 'The Long Exile', summary: 'Solitude and aetheric evolution. Lem observes Rahu and the arsenal before departing into the wilderness. This chapter covers the years of solitude and...' },
        { id: 35, title: 'The Return to the North', summary: 'Return to the White Forest ruins and the flight across the Hive Cities. Lem discovers the stolen repository and realizes that the Mission 3 villages r...' },
        { id: 36, title: 'The Whistle in the Woods', summary: 'Lem moves through the dense northern forest, his senses sharpened by years of exclusion. He reaches a high vantage po...' },
        { id: 37, title: 'The Village Leader', summary: 'Lem descends from the forest heights, leaving Myrr and his "Crew" behind. The transition from the high-tech, armored presence o...' },
        { id: 38, title: 'The Witch Maya', summary: 'Throughout the long hours of discourse with the villagers, Lem has been running a quiet realization. His "Spiritual Reso...' },
        { id: 39, title: 'The Shore of Shadows', summary: 'The hike out of the village and the meeting with the Crew. Arlo uses the HID to witness the raw record of the Moon Cataclysm, shattering the Thousand-...' },
        { id: 40, title: 'The Great Refusal', summary: 'Arlo rejects the mission and his identification as a Vessel spirit. He returns to his village, forcing the Crew to resolve a direct assault on the Cor...' },
        { id: 41, title: 'The Arsenal of the Ash', summary: 'Days pass as Lem and the Crew travel to the desert. They assemble vehicles and establish a concealed forward base just out...' },
        { id: 42, title: 'The Battle of Trees', summary: 'The attack is already underway. Lem and the Crew deploy 5-8% of their forest cache—a sizable test force of automated machines.' },
        { id: 43, title: 'The Blackout', summary: 'The Wood-grown monoliths finish dismantling the Node\'s core. It has been reduced to a hollow shell, and as expected, the ...' },
        { id: 44, title: 'The Ghost in the Dust', summary: 'The Crew\'s refusal to quit leads to a direct assault on the main base. This chapter combines the mobilization and the symmetric warfare in the desert ...' },
        { id: 45, title: 'The Invisible Front', summary: 'The dash for Cradle Zero and the subsequent battle. The camouflaged, reincarnating Rahu dismantles the fleet. The chapter ends with the terrifying rea...' },
        { id: 46, title: 'The Great Stalemate', summary: 'Following the defeat at Cradle Zero, the White Forest crew retreats to the deep wilderness. They are disillusioned and isolated...' },
        { id: 47, title: 'The Core Debate', summary: 'The narrative shifts to the desert base (Cradle Zero). The Core leadership (Anton Drexler, Dr. Vane, and Novak) is locked in ...' },
        { id: 48, title: 'The Failing Cities', summary: 'The Core\'s "Thousand-Year Fallacy" is starting to crumble at the edges. The continued existence of the "primitive" northern v...' },
        { id: 49, title: 'The Peaceful Emissary', summary: 'The Core\'s diplomatic gambit. A respectful emissary arrives with an ultimatum, while Cassia Vane sends a secret plea to Arlo revealing "Plan B."' },
        { id: 50, title: 'The Stoic Refusal', summary: 'In his final conversation with Cassia, Arlo provides a reasoned approach to his refusal.' },
        { id: 51, title: 'The Infiltration Gambit', summary: 'In the wilderness near the White Forest outside Cradle Zero, Lem\'s crew faces a crisis of morale. They realize that their "...' },
        { id: 52, title: 'The Pillar of Fire', summary: 'Lem and his crew travel several hundred miles east toward the nearest equatorial Fire City.' },
        { id: 53, title: 'The Greeting', summary: 'Lem enters the main apparatus of the Spire City, moving toward the central hub.' },
        { id: 54, title: 'The False Stalemate', summary: 'Lem returns to the White Forest ship and informs the crew of the Gorgons\' rejection. He explains that the Gorgons distrust the Core...' },
        { id: 55, title: 'The Gathering of Strands', summary: 'Lem and Ku decide to move all assets to the north to form a defensive circle around the five target villages.' },
        { id: 56, title: 'The Narrative Trap', summary: 'Defenses are completed in hours; the crew waits for the assault.' },
        { id: 57, title: 'The Siege of Pods', summary: 'Continuous launch of pods from the Moon fragments targeting the outer ring of the villages.' },
        { id: 58, title: 'The Final Lesson', summary: 'Just as Lem\'s crew seems to gain an advantage, a pillar of light from the sky vaporizes the second village completely.' },
        { id: 59, title: 'The Aetheric Wake', summary: 'Lem transitions to the "clearing" dreamscape after the orbital strike, finding stability through the physical shards of his Mission 3 Wood-Vessel.' },
        { id: 60, title: 'The Witch’s Return', summary: 'Lem and Maya materialize at **Cradle Zero**, a high-security aetheric extraction lab.' },
        { id: 61, title: 'The Resonance of the Fall', summary: 'Lem and Maya are pinned in the restoration lab. The Core staff has fled. Outside the door, Anton Drexler orders the lab\'s destru...' },
        { id: 62, title: 'The Hooting Call', summary: 'The Crew, monitoring city broadcasts, notices a massive anomaly. The cities are "under attack," but not by the White For...' },
        { id: 63, title: 'The Ancient Shield', summary: 'The Synodic army approaches the city beacons. Despite the visible torment the signals cause them, the machines endure th...' },
        { id: 64, title: 'The Liquid Ghost', summary: 'Just as Tor claims victory, spectator broadcasts pick up a horrifying sight: the monolith carcasses are moving.' },
        { id: 65, title: 'The Fall of the General', summary: 'The desert base is under lock-down. The Archivist media machine shows Maya appearing as multiple apparitions leading the speeder bik...' },
        { id: 66, title: 'The Vision and the Answer', summary: 'Maya disappears after the fall of the General. Machines unify to retake the Fire City, but Lem witnesses the Core’s internal schism in a vision. AI Ly...' },
        { id: 67, title: 'Mission 5: The Lunar Assault', summary: 'Quick assembly of grown machinery. Volunteers join from the outreach program, impressed by the White Forest technology.' },
        { id: 68, title: 'The Creator in the Pyramid', summary: 'Breach of the lunar pyramid. meeting Elowen Vane and encountering the gestating Rahu. The Core’s naive plan for a "Perfect Humanity" is revealed to be...' },
        { id: 69, title: 'The Grounding of the Fire', summary: 'Battle between Lem and Rahu. Lem uses wood-water assets but Rahu is more advanced and faster than before.' },
        { id: 70, title: 'The Final Transmission', summary: 'Maya arrives in the chamber as the Air Vessel, using her control of atmospheric stabilizers to pin the enraged Rahu.' },
        { id: 71, title: 'The Wandering Wood', summary: 'The aftermath of the Great Transmission. This chapter combines the legacy of iron, the silent forest, and the wandering wood into a final coda.' },
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
            summary: "The mobilization of the Tree Army, the search for the Water Vessel and the confrontation with the Core."
        },
        {
            id: 'final-resolution',
            title: 'Part V: The Final Resolution',
            range: [59, 71],
            summary: "The silent years of resistance leading to the final Mission 5 assault on the Moon and the Great Update."
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
                                                className="glass-panel hover:border-cyan-500/50 transition-colors group"
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
                                                    <Link
                                                        href={`/manuscript/full-text#chapter-${chapter.id}`}
                                                        className="text-[10px] font-bold text-cyan-500 uppercase tracking-[0.2em] border border-cyan-900 px-4 py-1.5 rounded hover:bg-cyan-900/20 transition-all"
                                                    >
                                                        Read Chapter
                                                    </Link>

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
