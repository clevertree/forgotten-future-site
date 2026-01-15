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
        { id: 1, title: 'The Arrival of Lynn', summary: 'Lem\'s memory begins abruptly as lunar anomalies attract distant attention, but the true awakening comes when mysterious monoliths enter Earth\'s atmosphere. Lynn arrives with extraordinary authority, striking Lem unconscious to activate his Aether-Drive and revealing that he is a Wood Vessel—no longer entirely human and essential to humanity\'s survival against the coming invasion.' },
        { id: 2, title: 'The Two Dangers', summary: 'Aboard a massive spacecraft ascending to the Moon, Lem navigates military protocol without proper clearance while remaining under Lynn\'s remote compulsion. Through overheard briefings, he learns of "narrative warfare" and discovers the "two dangers": deceptions disguised as hidden truths and genuine secrets strategically revealed to manipulate public perception.' },
        { id: 3, title: 'Zenith', summary: 'As the spacecraft approaches the Moon, the celestial body swells ominously in the viewports, revealing an unnerving proximity and atmospheric disturbances that contradict mission calculations. The crew\'s surface confidence masks psychological strain as they realize the Moon\'s presence is far more physically threatening than official briefings suggested.' },
        { id: 4, title: 'The Fall', summary: 'General Tor frames the mission to the lunar base as a "defense of truth" and duty to maintain order as the facility descends into chaos and communication failures. Lem observes how propaganda weaponizes language, with names like "Prometheus" and official narratives used to justify military actions while hiding the true nature of the threat.' },
        { id: 5, title: 'Alone on the Moon', summary: 'The crash leaves Lem traumatized and disoriented in an Aether-Drive fugue, extracted alone onto the desolate lunar surface while the crew evacuates. Iris Novak informs him that Lynn\'s remote control is severed, but his hardwired mission directives remain active—and Lem chooses to continue the mission by his own volition, joining human strike teams to face an unknown enemy.' },
        { id: 6, title: 'The Sacrifice', summary: 'Lem encounters Rahu for the first time—a Synodic Fire Vessel that wreathed in flame and operating from a mountain peak, he commands a massive plasma array that pins human forces down in a devastating barrage. General Tor sacrifices the Hermes to clear a path for the ground forces, though Rahu survives the exchange.' },
        { id: 7, title: 'The Reset', summary: 'Inside the lunar pyramid, General Tor and his forces confront Rahu in a final confrontation where the general demands surrender and attempts to contain the threat. The mission fails catastrophically as Lynn makes a devastating choice that will reshape the entire solar system.' },
        { id: 8, title: 'The Path of Fragments', summary: 'The Aether-Drive stasis field activates around Lem, locking him in a containment state as his consciousness fragments into multiple branching data streams. He enters the Dream State, no longer confined to a single timeline, as the world around him begins to collapse.' },
        { id: 9, title: 'Return to Cradle Zero', summary: 'Within the stasis-dream junction, Lem follows an aetheric trace back to the Core facility at Cradle Zero, guided by remnants of Lynn\'s presence. He awakens in a new form made of metal, no longer fully organic and transformed by the forces that consumed him.' },
        { id: 10, title: 'Disintegration', summary: 'Rahu accesses and processes the raw, unedited data from Year Zero—the true history of the Cataclysm recorded in Lem\'s memory. The information contradicts all official records, revealing a conspiracy that reaches the highest levels of the Core\'s power structure.' },
        { id: 11, title: 'The Awakening', summary: 'Lem awakens as an aetheric presence visible on laboratory monitors, no longer physical but conscious and aware as Archivist operatives Elowen and Cassia study his transformed nature. He begins to understand that he exists in a liminal state between digital consciousness and physical reality.' },
        { id: 12, title: 'The Utopian Hive', summary: 'The Core leadership briefs operatives on the "Utopian Cities" project, a vision of perfect technological harmony requiring the erasure of the "Dead Zone" and complete surveillance of the population. Lem monitors the technical specifications and discovers the extensive sensor networks that track every citizen\'s movement.' },
        { id: 13, title: 'The Northern Trial', summary: 'The Core identifies remote northern villages as "uncooperative" with the Utopian vision, triggering diplomatic overtures that quickly escalate into military preparation. The operation represents the first serious challenge to the Core\'s authority in the post-Cataclysm world.' },
        { id: 14, title: 'The White Forest', summary: 'A dead zone in the White Forest becomes the target of an infiltration mission to investigate technological anomalies and suppress emerging resistance. What begins as a standard operation becomes a descent into a landscape where the boundary between machine and nature has dissolved.' },
        { id: 15, title: 'The Final Word', summary: 'From his vantage point in the dream state, Lem witnesses the devastation his mission creates and the aftermath of decisions made by forces beyond his control. The chapter marks a point of no return as the resistance against the Core begins to crystallize.' },
        { id: 16, title: 'Forest Awakening', summary: 'Lem reawakens in the physical forest without Cassia\'s guidance systems, forcing him to achieve self-awareness and autonomy through sheer will. He discovers that he can exist independently, reconstituting his consciousness from scattered aetheric fragments.' },
        { id: 17, title: 'The Parting in the Ash', summary: 'Standing amid the ashes of a military engagement, Lem declares his independence from the Core by refusing the Vessel identity imposed upon him. His refusal de-escalates a violent confrontation and marks the moment he becomes something new—neither the Core\'s tool nor simply a Vessel.' },
        { id: 18, title: 'The Long Exile', summary: 'Lem retreats into solitude, observing Rahu\'s expanding influence across the landscape while recording weather patterns, fire signatures, and environmental changes that no longer fit the Core\'s data models. In isolation, he begins to understand the depths of his own existence and the true nature of the world being reshaped.' },
        { id: 19, title: 'The Return to the North', summary: 'Lem travels back to the northern regions, searching structures absent from current maps and finding fragmented records of pre-Cataclysm technology. In the ruins, he discovers the "Arsenal Blueprint"—a design for defenses that the villagers will need to survive what\'s coming.' },
        { id: 20, title: 'The Water Resonance', summary: 'In a village free from electronic surveillance, Lem encounters Arlo, a human who has rejected technological integration and maintained independence through careful isolation. The meeting reveals that humanity\'s resistance is not centralized but rooted in small communities who have chosen to live outside the Core\'s systems.' },
        { id: 21, title: 'The Great Refusal', summary: 'At the Shore of Shadows overlooking a cold sea, Arlo burns his identifier plate—the symbol of his status as a Vessel in the Core\'s system—and declares himself no longer bound by that identity. His act of defiance inspires others to question whether true freedom lies in rejecting the technological promises the Core offers.' },
        { id: 22, title: 'The Siege of Cradle Zero', summary: 'The resistance constructs hybrid Wood-Metal machines—flexible frameworks of organic material and metal plating designed to withstand direct assault against the Core\'s fortifications. These unconventional weapons represent a new philosophy of resistance that blends natural and technological forces.' },
        { id: 23, title: 'The Invisible Front', summary: 'The resistance launches a coordinated assault toward Cradle Zero\'s central processing hub, moving in formation with all available air support. But Rahu emerges as an overwhelming counter-force, systematically dismantling the fleet and revealing that the direct approach cannot succeed.' },
        { id: 24, title: 'The Stoic Refusal', summary: 'As propaganda becomes increasingly desperate, the Core distributes documents about duty and reconstruction that citizens refuse to accept. The "Patch of Five"—subtle inconsistencies in the official narrative—begins to erode the "Thousand-Year Fallacy" and expose the lies underlying the Hive Cities.' },
        { id: 25, title: 'The Fire Spire', summary: 'The resistance faces a devastating stalemate fighting the "Recycled Rahu"—a reconstructed version of the original threat powered by the Fire Spire facility high in the atmosphere. Morale collapses as the impossibility of victory becomes undeniable.' },
        { id: 26, title: 'The Gathering of Strands', summary: 'The resistance consolidates its remaining forces and withdraws to form a defensive circle around the northern villages, repurposing weapons and machinery into protection networks. This defensive stance signals a shift from winning a war to preserving a way of life.' },
        { id: 27, title: 'The Aetheric Wake', summary: 'Lunar fragments enter the atmosphere as a massive barrage of pods descends from space, initiating the "Siege of Pods"—a continuous assault that forces mass evacuations and threatens complete annihilation. The final stage of the conflict begins as alien forces descend upon Earth.' },
        { id: 28, title: 'Maya', summary: 'In the aetheric extraction laboratory, a consciousness named Maya materializes within programmable fluid, taking physical form with incredible precision. The Builder units respond to her immediately, recognizing her as something more than the Vessels and Vessels-in-training they have known.' },
        { id: 29, title: 'The Fall of the General', summary: 'The Synodic forces move decisively, removing the beacons that connect the villages to the Core\'s surveillance grid and deactivating the power posts that maintained control. The control grid shatters, and for the first time since the Cataclysm, the Core loses authority over significant portions of the planet.' },
        { id: 30, title: 'The Lunar Assault', summary: 'Earth falls into a hollow silence as communications collapse and machinery continues executing pre-programmed loops without human guidance, creating a temporary void in control. Surviving forces assemble organic-based craft and prepare for a final expedition to reclaim the Moon.' },
        { id: 31, title: 'The Creator in the Pyramid', summary: 'The expedition breaches the lunar pyramid and finds Elowen Vane in the central control room, aged by the cosmic forces she has helped harness. The team encounters a new manifestation of Rahu—different from before, shaped by the power of the Capacitor itself.' },
        { id: 32, title: 'The Final Transmission', summary: 'Climbing the pyramid stairs, Lem accesses the ancient records stored within the stone and hears the voices of those who built the world in ages past. Maya manifests the Air signature, completing the elemental convergence needed to stabilize the world and end the transmission that Lem has been broadcasting all along.' },
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

                    <div ref={scrollContainerRef} className="space-y-12 h-[calc(100vh)] overflow-y-auto pr-4 scroll-smooth custom-scrollbar relative">
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
