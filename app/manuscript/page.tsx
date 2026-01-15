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
        { id: 1, title: 'The Arrival of Lynn', summary: 'The contents of this broadcast represent a full record of my memory, starting from the first moment I can remember and ending with the transmission of this packet. I have kept my own opinions out of the record; I want to provide a factual account for your own interpretation. I only hope that these mistakes aren\'t repeated.' },
        { id: 2, title: 'The Two Dangers', summary: 'The boarding line smelled of diesel and cheap coffee. The men waiting with me were impatient. A guard pulled me aside. He looked for a briefing code in my file and didn\'t find one. He asked why I was there. I did not have an answer. Behind us, I saw the monoliths through the window. They were taller than the buildings. They were moving into the city center.' },
        { id: 3, title: 'Zenith', summary: 'The Moon was large in the window. It became bigger very quickly. I saw a blue line of atmosphere along the curve. Usually, space is empty, but this did not look empty. The calculations for our approach were different from what the crew expected. The people on the bridge were losing their focus.' },
        { id: 4, title: 'The Fall', summary: 'Tor spoke over the communication system. He said we had a duty to defend the truth and keep order. His voice was steady. He used words like \'defense\' and \'truth.\' I recognized these terms from the news. The reports said a person named \'Prometheus\' was stealing technology for the invaders. The government used this story to justify their actions.' },
        { id: 5, title: 'Alone on the Moon', summary: 'The crash caused multiple injuries. The ship\'s interior was loud with alarms and the sound of failing hydraulics. I struggled to breathe, alone in the wreckage with no crew in sight, before a recovery rig removed me and Iris Novak rescued me.' },
        { id: 6, title: 'The Sacrifice', summary: 'The fire was large and occupied the space in front of us. Rahu moved across the ground. The air was hot. My instruments recorded multiple errors. We were standing near the edge of the heat. The pilots were giving disorganized orders on the radio.' },
        { id: 7, title: 'The Reset', summary: 'Inside the pyramid, the air was still. Iris Novak looked around the grand hall, her face tight with worry. She was trying to remember the mission orders without Tor there to lead. She knew the plan involved \'healing the temple\' from both the inside and the outside before we could even think about confronting Rahu. But she was hesitating. She wasn\'t sure if she had the right authorization tapes to give those kinds of orders. Part of her thought Rahu was already dead, and without the General around, she felt like she needed to rethink everything.' },
        { id: 8, title: 'The Path of Fragments', summary: 'The containment field activated around me. I could not move. I saw a bright light in the center of my vision. Then the Branching Paths appeared in my display. These were multiple data streams showing different outcomes. I was no longer restricted to a single timeline.' },
        { id: 9, title: 'Return to Cradle Zero', summary: 'I connected to the local network. I followed the data path back to Cradle Zero. I was offline for a period and then I woke up inside a new body made of metal.' },
        { id: 10, title: 'Disintegration', summary: 'Rahu accessed the data in my memory. The information about the Moon\'s destruction contradicted the official records.' },
        { id: 11, title: 'The Awakening', summary: 'I was active on a screen in a laboratory. Elowen and Cassia worked nearby using technical tools. They monitored my data output.' },
        { id: 12, title: 'The Utopian Hive', summary: 'The briefing focused on technical solutions. They said the Dead Zone needed to be cleared so the Hive could expand. I recorded the patterns of surveillance on every route. Sensors tracked the movement of every citizen.' },
        { id: 13, title: 'The Northern Trial', summary: 'We flew north. The temperature was low. The people in the villages were suspicious of us. They only valued tools that were useful for survival.' },
        { id: 14, title: 'The White Forest', summary: 'The forest contained many electronic components. The trees emitted a pale light and a low hum. There were no animals. The machines were integrated into the environment.' },
        { id: 15, title: 'The Final Word', summary: 'I watched the clearing through the Branching Paths data stream while the soldiers took Myrr away. I recorded the sounds of their movements. I wanted to find Cassia, but I was intercepted.' },
        { id: 16, title: 'Forest Awakening', summary: 'I returned to the forest. The root systems produced a low-frequency hum that matched the vibrations in the ground. I found Rahu there. He moved slowly. He still emitted a high thermal signature.' },
        { id: 17, title: 'The Parting in the Ash', summary: 'We stood in a field. The air contained charcoal particles. The soldiers moved into designated formations. The villagers watched without speaking.' },
        { id: 18, title: 'The Long Exile', summary: 'I had no orders. I recorded the local weather patterns. I watched the snow accumulate and melt on a single branch. I observed fire patterns on the horizon. I recorded the coordinates of the smoke lines in my log.' },
        { id: 19, title: 'The Return to the North', summary: 'I traveled back to the northern region. I searched the structures that were not marked on the current maps.' },
        { id: 20, title: 'The Water Resonance', summary: 'Arlo lived in a village. The air contained the scent of peat and drying fish. He operated machinery with high efficiency. He monitored the flow of the river frequently.' },
        { id: 21, title: 'The Great Refusal', summary: 'The ridge faced a cold sea. Some people called it the Shore of Shadows. Arlo burned his identifier plate. He placed the remains in a box. He said he was not a Vessel.' },
        { id: 22, title: 'The Siege of Cradle Zero', summary: 'We built new machinery. We used wood frames to support metal plating. These units were flexible and could withstand direct impacts.' },
        { id: 23, title: 'The Invisible Front', summary: 'We advanced toward Cradle Zero. We moved in a coordinated formation. We used all available air assets.' },
        { id: 24, title: 'The Stoic Refusal', summary: 'The propaganda departments changed their messaging. They distributed documents about duty and reconstruction. The citizens placed these documents in storage.' },
        { id: 25, title: 'The Fire Spire', summary: 'The Fire Spire was a high-altitude structure. It emitted constant heat. The facility was filled with machinery for energy processing.' },
        { id: 26, title: 'The Gathering of Strands', summary: 'We withdrew from our positions. We reclassified our assets and repurposed our circuit boards. We recorded the number of personnel in a ledger. The northern combat zone was converted into a logistics hub.' },
        { id: 27, title: 'The Aetheric Wake', summary: 'Multiple high-energy objects entered the atmosphere. They emitted intense light. Drop pods landed near the village. I recorded the sounds of the residents preparing to evacuate.' },
        { id: 28, title: 'Maya (Programmable-Fluid Unit)', summary: 'Maya constructed a physical form using the programmable fluid in the laboratory. She shaped the material with high precision. The Builder units responded to her vocal frequency immediately. They began to follow her instructions.' },
        { id: 29, title: 'The Fall of the General', summary: 'The villagers removed the beacons. They deactivated the power posts and moved their machines beyond the perimeter. The area smelled of oxidized metal.' },
        { id: 30, title: 'The Lunar Assault', summary: 'The city operations were disrupted. Machinery continued to execute pre-programmed loops without human supervision. We launched using organic-based craft. The ascent was silent and efficient.' },
        { id: 31, title: 'The Creator in the Pyramid', summary: 'The air in the Pyramid contained chemical residue. We entered the Core facility. Elowen Vane was in the central control room. She had aged since our last meeting.' },
        { id: 32, title: 'The Final Transmission', summary: 'I climbed the stairs until the stone felt different. I touched the wall and accessed the records. I could hear the people who built the world.' },
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
            id: 'lunar-mission',
            title: 'Part I: The Lunar Mission',
            range: [1, 7],
            summary: "The arrival of Lynn, the launch to the Moon, and the initial encounter with Rahu."
        },
        {
            id: 'the-long-watch',
            title: 'Part II: The Long Watch',
            range: [8, 15],
            summary: "The aftermath of the Moon's fall and Lem's awakening in the Technocratic Core."
        },
        {
            id: 'the-northern-rebellion',
            title: 'Part III: The Northern Rebellion',
            range: [16, 25],
            summary: "Resistance in the White Forest and the struggle against the Core's expansion."
        },
        {
            id: 'the-final-transmission',
            title: 'Part IV: The Final Resolution',
            range: [26, 32],
            summary: "The return to the Moon and the broadcast that ends the Fallacy."
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
