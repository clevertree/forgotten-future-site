'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MessageSquare, CheckCircle2 } from 'lucide-react';
import { CommentAnchor } from '../../components/Feedback/CommentAnchor';
import { CommentPopup } from '../../components/Feedback/CommentPopup';
import { SuccessPopup } from '../../components/Feedback/SuccessPopup';
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

export default function FullTextManuscript() {
    const isStatic = process.env.NEXT_PUBLIC_IS_STATIC === 'true';
    const [isFeedbackMode, setIsFeedbackMode] = useState(!isStatic);
    const [activeComment, setActiveComment] = useState<{ path: string; anchorId: string } | null>(null);
    const [submittedPrUrl, setSubmittedPrUrl] = useState<string | null>(null);

    const sections = [
        { title: 'I: Lunar Mission', range: [1, 7] },
        { title: 'II: Long Watch', range: [8, 15] },
        { title: 'III: Northern Rebellion', range: [16, 25] },
        { title: 'IV: Final Resolution', range: [26, 32] },
    ];

    return (
        <div className="container mx-auto px-6 lg:px-12 py-12">
            <div className="mb-12 flex justify-between items-center no-print">
                <Link href="/manuscript" className="text-cyan-500 hover:text-cyan-400 font-bold uppercase tracking-widest text-xs flex items-center gap-2">
                    ← Back to Manuscript Page
                </Link>

                <div className="flex items-center gap-4">
                    {submittedPrUrl && (
                        <div className="flex items-center gap-2 text-green-400 text-[10px] uppercase font-bold animate-pulse">
                            <CheckCircle2 size={12} /> PR Created
                        </div>
                    )}
                    {!isStatic && (
                        <button
                            onClick={() => setIsFeedbackMode(!isFeedbackMode)}
                            className={`flex items-center gap-2 px-4 py-1.5 rounded-full border transition-all text-[10px] uppercase font-bold tracking-widest ${isFeedbackMode
                                ? 'bg-cyan-500 border-cyan-400 text-black shadow-[0_0_15px_rgba(6,182,212,0.5)]'
                                : 'bg-black border-white/10 text-zinc-500 hover:border-white/30'
                                }`}
                        >
                            <MessageSquare size={12} />
                            {isFeedbackMode ? 'Feedback Mode: ON' : 'Feedback Mode: OFF'}
                        </button>
                    )}
                    <span className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] border border-white/10 px-3 py-1 rounded">
                        Optimized for Text-to-Speech
                    </span>
                </div>
            </div>

            <header className="mb-16 text-center lg:text-left lg:pl-[25%]">
                <h1 className="text-6xl font-black mb-4 tracking-tighter text-glow">FORGOTTEN FUTURE</h1>
                <h2 className="text-xl text-cyan-400 uppercase tracking-[0.3em]">The Full Manuscript Draft</h2>
                <div className="mt-8 p-4 border border-cyan-500/20 bg-cyan-500/5 rounded text-xs text-zinc-400 uppercase tracking-widest leading-relaxed max-w-3xl">
                    Note: This draft covers the <strong className="text-cyan-400">Complete First Edition</strong>.
                    All 32 chapters of the Aether-Drive logs have been decrypted and rendered into prose.
                </div>
            </header>

            <div className="flex flex-col lg:flex-row gap-12 relative">
                {/* Navigation Sidebar */}
                <aside className="lg:w-1/4 no-print order-2 lg:order-1">
                    <div className="glass-panel sticky top-36 max-h-[70vh] overflow-y-auto custom-scrollbar p-6">
                        <h2 className="text-sm font-bold text-cyan-500 uppercase tracking-[0.2em] mb-6 border-b border-white/10 pb-2">
                            Navigation
                        </h2>
                        <div className="space-y-8">
                            {sections.map((section) => (
                                <div key={section.title}>
                                    <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3">
                                        {section.title}
                                    </h3>
                                    <ul className="space-y-2 border-l border-white/5 pl-4">
                                        {chapters
                                            .filter(c => c.id >= section.range[0] && c.id <= section.range[1])
                                            .map(chapter => (
                                                <li key={chapter.id}>
                                                    <a
                                                        href={`#chapter-${chapter.id}`}
                                                        className="text-[10px] text-zinc-400 hover:text-cyan-400 transition-colors block py-0.5 leading-tight uppercase tracking-tighter"
                                                    >
                                                        {chapter.id}. {chapter.title}
                                                    </a>
                                                </li>
                                            ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </aside>

                <article className="lg:w-3/4 space-y-24 pb-[80vh] order-1 lg:order-2">
                    {chapters.map((chapter) => (
                        <section key={chapter.id} id={`chapter-${chapter.id}`} className="prose prose-invert max-w-none scroll-mt-32">
                            <h3 className="text-3xl font-bold mb-8 text-white flex items-center gap-4">
                                <span className="text-cyan-500 text-sm font-mono uppercase tracking-widest">Chapter {chapter.id}</span>
                                {chapter.title}
                            </h3>
                            <div className="text-zinc-300 leading-[2] text-lg space-y-6">
                                {chapter.content.split('\n\n').map((para, i) => {
                                    const paraId = `ch${chapter.id}-p${i + 1}`;
                                    return (
                                        <CommentAnchor
                                            key={paraId}
                                            path="manuscript"
                                            anchorId={paraId}
                                            isActive={isFeedbackMode}
                                            onOpenComment={(path, anchorId) => setActiveComment({ path, anchorId })}
                                        >
                                            <p>{para.trim()}</p>
                                        </CommentAnchor>
                                    );
                                })}
                            </div>
                        </section>
                    ))}
                </article>
            </div>

            {activeComment && (
                <CommentPopup
                    path={activeComment.path}
                    anchorId={activeComment.anchorId}
                    onClose={() => setActiveComment(null)}
                    onSuccess={(url) => {
                        setSubmittedPrUrl(url);
                    }}
                />
            )}

            {submittedPrUrl && (
                <SuccessPopup
                    prUrl={submittedPrUrl}
                    onClose={() => setSubmittedPrUrl(null)}
                />
            )}

            <footer className="border-t border-white/10 py-12 text-center">
                <p className="text-zinc-500 text-sm italic mb-4">
                    End of First Edition Manuscript. The Aether-Drive reaches its limit of recall.
                </p>
                <p className="text-[10px] text-zinc-600 uppercase tracking-widest">
                    Protocol: Full Sync | Archive ID: FF-MAN-MAX
                </p>
            </footer>
        </div>
    );
}

