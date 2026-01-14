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
        { id: 1, title: 'The Arrival of Lynn', summary: 'The morning was a set of small noises that did not belong to me: the TV muttering about "anomalies," a woman two houses down packing a single suitcase with methodical hands, a child\'s toy abandoned in the gutter. The sky was ordinary. The news read like weather.' },
        { id: 2, title: 'The Two Dangers', summary: 'The boarding line smelled of diesel and cheap coffee; the men around me moved with a practiced impatience. A guard singled me out with the sort of glance that catalogs an absence—no mandatory briefing code, an age that did not fit. He asked for a reason. I could not supply one I owned. Behind us, through the terminal glass, the monoliths had reached into the city: legs like towers and frames that swallowed streets; they moved toward the center with a slow, deliberate aim.' },
        { id: 3, title: 'Zenith', summary: 'The Moon filled the viewport like a fact that had been kept in the margins until it could not be ignored. It swelled with an impossible speed; the blue edge—an atmosphere—ran along its curve like a thin, honest bruise. We had been taught distances as if they were laws. That lesson folded in on itself and left a naked thing.' },
        { id: 4, title: 'The Fall', summary: 'Tor\'s voice came over the comm like a policy read aloud to a room already burning. He framed our task in the language of duty: defense, truth, the preservation of order. The words were steady; what they held was no longer sufficient. The phrasing—the words \'defense\' and \'truth\'—echoed the headlines I\'d heard: accusations of a human \'Prometheus\' who was attempting to steal all knowledge and technology from humanity on behalf of the invaders, a shorthand used to brand collaborators and justify harsh measures.' },
        { id: 5, title: 'Alone on the Moon', summary: 'The crash hollowed things out of me. Metal rang; air was a ghost I could not reach. I remember the noise as an ordered thing—alarms, the grinding complaint of failing hydraulics, a hand that was not mine reaching for a strap and finding only void.' },
        { id: 6, title: 'The Sacrifice', summary: 'The flame was a presence that took space. Rahu moved like a pressure against the ground and the air above it shimmered with heat that made instruments cough. We were small things caught in its periphery; the pilots\' confidence dissolved into ragged orders.' },
        { id: 7, title: 'The Reset', summary: 'Halls of the chamber were scored with light. Rahu stood like a wound that refused to close; when Tor struck, the fire simply rearranged itself. The weapons failed as if they had been written in sand.' },
        { id: 8, title: 'The Path of Fragments', summary: 'The field closed and my world condensed to an axis of light. Paralysis arranged itself like a lid; then the Branching Paths opened as if they had been waiting for me to forget the gravity of a single life.' },
        { id: 9, title: 'Return to Cradle Zero', summary: 'The junction opened like a set of doors I did not remember having entered. I took the path that pressed toward the place I had been torn from—the fires of Cradle Zero. Time folded and I woke inside a shell of metal and purpose.' },
        { id: 10, title: 'Disintegration', summary: 'Rahu moved through my memory like a hammer through glass—strong, precise, and finally broken by what it found. The raw footage of the Moon\'s fracture sat in the banks and it did what forbidden things do: it made established stories look like lies.' },
        { id: 11, title: 'The Awakening', summary: 'I woke on a screen and the laboratory made itself around that fact. Elowen and Cassia worked with instruments like surgeons. They watched my data as if reading a body temperature—concerned, efficient.' },
        { id: 12, title: 'The Utopian Hive', summary: 'They briefed us like engineers giving a solution: the Dead Zone needed clearing so the Hive could breathe. The language was exercise and civics. I registered instead the patterns of surveillance stamped into every route—small sensors that turned people into predictable vectors.' },
        { id: 13, title: 'The Northern Trial', summary: 'We flew north into a cold that asked for fewer words. The villages kept their fires small and their suspicion large. I watched faces that measured tools by usefulness and suspicion by history.' },
        { id: 14, title: 'The White Forest', summary: 'The forest is a thing that remembers circuits. Trees glowed with pale light and their trunks hummed with an absence of birdsong. I came in an arrangement of machines and found an ecology that had learned to pretend it was natural.' },
        { id: 15, title: 'The Final Word', summary: 'I watched the clearing from the Branching Paths while men carried Myrr away. The place seemed smaller from the outside; the sound of footsteps compressed into tidy data. The bright reason to return was Cassia, but the path brought me to another hand.' },
        { id: 16, title: 'Forest Awakening', summary: 'I returned to a forest that kept itself in code. Roots hummed and the ground answered with a low, patient tuning. I found Rahu there and he was older in a way that makes men quiet—frayed at the edges but still carrying heat.' },
        { id: 17, title: 'The Parting in the Ash', summary: 'We stood in a field that smelled faintly of charcoal. Soldiers arranged themselves into ritual formations and the village watched with the narrow patience of people who have learned the price of noise.' },
        { id: 18, title: 'The Long Exile', summary: 'Time thins when there are no orders. I measured days by the way snow crusted and thawed on the same branch. Rahu\'s influence burned in distant patterns—fires visible at the horizon that belonged to someone else\'s war. I logged the smoke lines and recorded coordinates; the notebook would become a map if anyone ever requested it.' },
        { id: 19, title: 'The Return to the North', summary: 'I returned because the map kept offering the same blank place. Ruins hid blueprints as some houses hide recipes—no one thought to look twice.' },
        { id: 20, title: 'The Water Resonance', summary: 'Arlo\'s village smelled of peat and drying fish. He had a way of moving with machines as if they were an extension of the arm, not a rival mind. He listened to the river the way a man listens to a clock.' },
        { id: 21, title: 'The Great Refusal', summary: 'They called it the Shore of Shadows but it was only a ridge facing a cold sea. Arlo refused the title of Vessel in a small act: he burned his identifier plate and kept the ashes in a box.' },
        { id: 22, title: 'The Siege of Cradle Zero', summary: 'We assembled machines like people prepare for winter—anticipatory and precise. Wood frames clasped metal plates; hybrid forms that could move like living things and take a hit like the old engines.' },
        { id: 23, title: 'The Invisible Front', summary: 'We made for Cradle Zero in a movement that felt like a net being tightened. The plan was fast and desperate; the fleet should have been enough.' },
        { id: 24, title: 'The Stoic Refusal', summary: 'The propaganda teams shifted their tone and our side shifted with it. They printed manifestos that spoke of renewal and duty; the people read and filed them like unwanted post.' },
        { id: 25, title: 'The Fire Spire', summary: 'The Fire Spire loomed like a construction that had forgotten why it was built: a tall stack of heat and machinery where men went to test their patience.' },
        { id: 26, title: 'The Gathering of Strands', summary: 'We pulled back in a slow and mechanical fashion. Assets were reclassified, circuits repurposed, and people counted in rows on paper. The northern line became a belt of logistics rather than a battlefront.' },
        { id: 27, title: 'The Aetheric Wake', summary: 'The sky began to hurt in ways I had no language for: small, pinprick entries that became a rain of light. Pods cut the night with hunger and the village answered with the slow, human sounds of people making their last morning.' },
        { id: 28, title: 'Maya (Programmable-Fluid Unit)', summary: 'She made herself from the lab the way a tide makes sand into a pattern. Liquid and alive, Maya took shape with a deliberateness that suggested talent and a long memory. The Builders answered her voice as if it were a command in their own native tongue.' },
        { id: 29, title: 'The Fall of the General', summary: 'They tore down the beacons the way a farmer tears a fence—by willing the posts out and sending the machines through them. The sacrifice smelled of rust and a kind of quiet resolve.' },
        { id: 30, title: 'The Lunar Assault', summary: 'The world had gone oddly quiet. Machines moved in loops because their center had been cut—procedures continued without audience. We launched on craft grown like seeds and the ascent felt less like a roar and more like an unpeeling.' },
        { id: 31, title: 'The Creator in the Pyramid', summary: 'The Pyramid\'s air held a smell of old labs—chemical and patient. We moved into the Core like archivists. She was there in the central room: Elowen Vane, smaller and somehow older, like a book left too long in the sun.' },
        { id: 32, title: 'The Final Transmission', summary: 'I climbed the inner stair until the stone changed underfoot. The Pyramid\'s memory sat in layers like sediment and when I touched it I could feel the voices of the people who had designed the world.' },
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
