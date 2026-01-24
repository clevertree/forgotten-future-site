'use client';

import React, { useState, useRef, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { fetchManuscript, fetchRemoteManuscript, Chapter, Part, ManuscriptVersion } from '../../lib/manuscript';
import { StickyNav } from '../components/StickyNav';
import { Notification } from '../components/Notification';
import { ChapterCard } from '../components/ChapterCard';
import { FAQItem } from '../components/FAQItem';

function ManuscriptContent() {
    const searchParams = useSearchParams();
    const editionParam = searchParams.get('edition');

    const scrollContainerRef = useRef<HTMLDivElement | null>(null);
    const router = useRouter();

    const [chapters, setChapters] = useState<Chapter[]>([]);
    const [parts, setParts] = useState<Part[]>([]);
    const [draftVersion, setDraftVersion] = useState<string | undefined>();
    const [isLoading, setIsLoading] = useState(true);
    const [version, setVersion] = useState<ManuscriptVersion>(editionParam === '13plus' ? '13plus' : 'youngadult');
    const [notification, setNotification] = useState<string | null>(null);
    const [speakingId, setSpeakingId] = useState<number | null>(null);

    const toggleSpeech = React.useCallback((id: number, text: string) => {
        if (typeof window === 'undefined') return;

        if (!window.speechSynthesis) {
            alert("Your browser does not support Text-to-Speech playback. Please try a modern browser like Chrome or Safari.");
            return;
        }

        if (speakingId === id) {
            window.speechSynthesis.cancel();
            setSpeakingId(null);
            return;
        }

        window.speechSynthesis.cancel();

        const plainText = text
            .replace(/[#*_~`\[\]()]/g, '')
            .replace(/>\s+/g, '')
            .replace(/\n+/g, ' ');

        // Chunking for long text (browsers have limits per utterance)
        const chunks: string[] = [];
        const maxChunkLen = 3000;

        if (plainText.length > maxChunkLen) {
            let currentPath = plainText;
            while (currentPath.length > 0) {
                if (currentPath.length <= maxChunkLen) {
                    chunks.push(currentPath);
                    break;
                }

                // Try to find a good breaking point (sentence or space)
                let breakIdx = currentPath.lastIndexOf('.', maxChunkLen);
                if (breakIdx === -1 || breakIdx < maxChunkLen * 0.5) {
                    breakIdx = currentPath.lastIndexOf(' ', maxChunkLen);
                }

                if (breakIdx === -1) breakIdx = maxChunkLen;

                chunks.push(currentPath.substring(0, breakIdx + 1));
                currentPath = currentPath.substring(breakIdx + 1).trim();
            }
        } else {
            chunks.push(plainText);
        }

        let currentChunk = 0;

        const speakNextChunk = () => {
            if (currentChunk >= chunks.length) {
                setSpeakingId(null);
                return;
            }

            const utterance = new SpeechSynthesisUtterance(chunks[currentChunk]);

            utterance.onstart = () => {
                if (currentChunk === 0) setSpeakingId(id);
            };

            utterance.onend = () => {
                currentChunk++;
                speakNextChunk();
            };

            utterance.onerror = (event) => {
                console.error("SpeechSynthesis error details:", {
                    error: event.error,
                    message: (event as any).message,
                    event: event
                });

                // Only alert on critical errors (not when we manually stop/cancel)
                if (event.error !== 'interrupted' && event.error !== 'canceled') {
                    setSpeakingId(null);

                    const errorType = event.error || (event as any).message || "Unknown Code";

                    if (event.error === 'not-allowed') {
                        alert("Playback blocked: Please ensure your device is not in 'Silent Mode' and that you have interacted with the page recently.");
                    } else if (event.error === 'network') {
                        alert("Speech failed: This voice requires an internet connection which was lost.");
                    } else {
                        alert(`Speech playback failed (${errorType}). Note: Some mobile browsers require the screen to stay on.`);
                    }
                }
            };

            utterance.rate = 1.0;
            utterance.pitch = 1.0;
            utterance.volume = 1.0;

            if (window.speechSynthesis.paused) {
                window.speechSynthesis.resume();
            }

            window.speechSynthesis.speak(utterance);
        };

        try {
            // Small delay to ensure cancel() has finished clearing the queue
            setTimeout(() => {
                speakNextChunk();
            }, 100);
        } catch (err) {
            console.error("Speech initiation failed:", err);
            alert("Failed to initialize speech engines.");
            setSpeakingId(null);
        }
    }, [speakingId]);

    useEffect(() => {
        const handleRequest = (e: Event) => {
            const ce = e as CustomEvent;
            const targetId = ce.detail?.chapterId;
            if (speakingId) {
                window.speechSynthesis.cancel();
                setSpeakingId(null);
            } else if (targetId) {
                const ch = chapters.find(c => c.id === targetId);
                if (ch) toggleSpeech(ch.id, ch.summary || ch.content);
            }
        };
        window.addEventListener('ff-request-tts', handleRequest);
        return () => window.removeEventListener('ff-request-tts', handleRequest);
    }, [speakingId, chapters, toggleSpeech]);

    useEffect(() => {
        window.dispatchEvent(new CustomEvent('ff-tts-status', { detail: { speakingId } }));
    }, [speakingId]);

    const fullManuscriptId = 9999;
    const manuscriptText = chapters.map(c => `${c.title}. ${c.content}`).join(' ');

    const lastActiveRef = useRef(Date.now());

    useEffect(() => {
        const handleActivity = () => {
            lastActiveRef.current = Date.now();
        };
        window.addEventListener('mousemove', handleActivity);
        window.addEventListener('keydown', handleActivity);
        window.addEventListener('scroll', handleActivity);
        window.addEventListener('click', handleActivity);
        return () => {
            window.removeEventListener('mousemove', handleActivity);
            window.removeEventListener('keydown', handleActivity);
            window.removeEventListener('scroll', handleActivity);
            window.removeEventListener('click', handleActivity);
        };
    }, []);

    useEffect(() => {
        setIsLoading(true);
        let mounted = true;
        let lastVersion: string | undefined;
        let lastCount = 0;

        const syncWithRemote = async (showNotification: boolean) => {
            // Stop fetching if user is idle (> 60s) or tab is hidden
            const isIdle = Date.now() - lastActiveRef.current > 60000;
            const isHidden = document.visibilityState === 'hidden';
            if (showNotification && (isIdle || isHidden)) return;

            const remoteData = await fetchRemoteManuscript(version);
            if (!mounted || !remoteData || remoteData.chapters.length === 0) return;

            const isUpdated = remoteData.draftVersion !== lastVersion ||
                remoteData.chapters.length !== lastCount;

            if (isUpdated) {
                setChapters(remoteData.chapters);
                setParts(remoteData.parts);
                setDraftVersion(remoteData.draftVersion);

                if (showNotification) {
                    const versionInfo = remoteData.updatedDate ? `v${remoteData.draftVersion} (${remoteData.updatedDate})` : `v${remoteData.draftVersion}`;
                    setNotification(`Aether-Drive Updated: ${versionInfo}`);
                    setTimeout(() => setNotification(null), 5000);
                }

                lastVersion = remoteData.draftVersion;
                lastCount = remoteData.chapters.length;
            }
        };

        const loadInitial = async () => {
            const data = await fetchManuscript(version);
            if (!mounted) return;

            setChapters(data.chapters);
            setParts(data.parts);
            setDraftVersion(data.draftVersion);

            lastVersion = data.draftVersion;
            lastCount = data.chapters.length;

            setIsLoading(false);

            // Initial silent sync - page loads will have an update within the first fetch
            // but we don't notify the user yet.
            await syncWithRemote(false);
        };

        loadInitial();

        // Check for updates every 60 seconds, only notifying if version changes after initial load
        const intervalId = setInterval(() => {
            syncWithRemote(true);
        }, 60000);

        return () => {
            mounted = false;
            clearInterval(intervalId);
        };
    }, [version]);

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
        <div className="container mx-auto px-6 py-12 relative">
            {/* Content Refresh Notification */}
            <Notification 
                message={notification} 
                onClose={() => setNotification(null)} 
            />

            <div className="flex flex-col lg:flex-row gap-12">
                {/* Audiobook Sidebar */}
                <aside className="lg:w-1/3 no-print order-1 lg:order-1">
                    <div className="glass-panel sticky top-32">
                        <div className="bg-black/50 p-6 rounded border border-white/5 mb-6">
                            <div className="flex flex-col items-center justify-center space-y-4">
                                <div className="text-2xl font-bold text-glow text-cyan-400">
                                    Full Manuscript
                                </div>
                                <div className="text-[10px] text-zinc-600 italic text-center">
                                    Listen to the entire document using browser-native speech synthesis.
                                </div>
                                <div className="w-full pt-4">
                                    <button
                                        onClick={() => toggleSpeech(fullManuscriptId, manuscriptText)}
                                        className={`w-full py-2 rounded text-xs font-bold uppercase tracking-widest transition-all border ${speakingId === fullManuscriptId
                                            ? 'bg-cyan-500 text-black border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.5)]'
                                            : 'bg-transparent text-cyan-500 border-cyan-500/30 hover:bg-cyan-500/10'
                                            }`}
                                    >
                                        {speakingId === fullManuscriptId ? '⏹ Stop Audio' : '▶ Play Full Text'}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed mb-6 italic">
                            Tip: For the best experience, try different system voices in your browser settings.
                        </p>
                        <div className="space-y-4">
                            <Link href={`/manuscript/full-text?edition=${version}`} className="block text-center text-xs font-bold text-cyan-500 uppercase tracking-widest border border-cyan-500/30 py-3 rounded hover:bg-cyan-500/10 transition-all">
                                Read as Full Text
                            </Link>
                            <div className="pt-4 border-t border-white/5">
                                <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-3 font-bold">Recommended Text-to-Speech:</p>
                                <ul className="text-[10px] text-zinc-600 space-y-3">
                                    <li className="flex flex-col">
                                        <span className="text-zinc-300">• Browser Reading Mode</span>
                                        <span>Edge and Chrome (especially ChromeOS) have built-in Reading Mode with TTS.</span>
                                    </li>
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
                <div className="lg:w-2/3 order-2 lg:order-2">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
                        <h1 className="text-3xl md:text-4xl text-glow uppercase tracking-tighter">Manuscript: Lem's Memories</h1>
                        {draftVersion && <div className="text-[10px] text-zinc-500 uppercase tracking-widest bg-white/5 px-3 py-1 rounded border border-white/5">Draft: v{draftVersion}</div>}
                    </div>

                    {/* Section Tabs */}
                    <StickyNav 
                        sections={parts} 
                        top="top-20 md:top-28" 
                        onSectionClick={scrollToSection}
                        mobileLabel="Select Part..."
                    />

                    <div ref={scrollContainerRef} className="space-y-12 h-[calc(100vh)] overflow-y-auto pr-4 scroll-smooth custom-scrollbar relative">
                        {isLoading ? (
                            <div className="flex flex-col items-center justify-center py-24 text-zinc-500 uppercase tracking-widest text-xs">
                                <div className="mb-4 animate-pulse">Scanning Aether-Drive...</div>
                            </div>
                        ) : parts.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-24 text-zinc-500 uppercase tracking-widest text-xs">
                                <div className="mb-4 text-red-500/50">Connection Failed: Data Not Found</div>
                                <button
                                    onClick={() => window.location.reload()}
                                    className="text-cyan-500 hover:text-cyan-400 underline underline-offset-4"
                                >
                                    Retry Archive Sync
                                </button>
                            </div>
                        ) : (
                            parts.map((section) => (
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
                                        {section.chapters
                                            .map((chapter) => (
                                                <ChapterCard
                                                    key={chapter.id}
                                                    chapter={chapter}
                                                    isSpeaking={speakingId === chapter.id}
                                                    onToggleSpeech={toggleSpeech}
                                                    readMoreHref={`/manuscript/full-text?edition=${version}#chapter-${chapter.id}`}
                                                />
                                            ))}
                                    </div>
                                </div>
                            ))
                        )}
                        {!isLoading && parts.length > 0 && (
                            <div className="mt-16 p-8 border border-dashed border-white/10 text-center rounded-lg mb-12">
                                <p className="text-zinc-600 text-sm italic">
                                    The First Edition of Lem's Memories is complete.
                                    Further aetheric logs may be uncompiled in future iterations.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {!isLoading && parts.length > 0 && (
                <section className="mt-24 border-t border-zinc-900 pt-16 scroll-mt-24">
                    <h2 className="text-2xl font-light tracking-[0.2em] mb-12 text-zinc-100 flex items-center uppercase">
                        <span className="w-8 h-px bg-cyan-900 mr-4"></span>
                        AI-Driven Narrative Methodology
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
                        <div className="space-y-6">
                            <h3 className="text-cyan-400 text-sm font-bold uppercase tracking-[0.2em]">The Composition Loop</h3>
                            <p className="text-zinc-400 text-sm leading-relaxed">
                                The manuscript is developed through a recursive multi-stage process. Each chapter begins as a high-fidelity narrative plan, which is then expanded into prose using specialized LLM agents adhering to strict stylistic constraints.
                            </p>
                            <p className="text-zinc-400 text-sm leading-relaxed">
                                Following initial composition, the text undergoes repeated <strong>QA drills</strong>. These cycles allow us to "drill down" into specific details—cross-referencing established lore, refining atmospheric density, and ensuring the technical resonance of the Aether-Drive logs remain consistent across all chapters.
                            </p>
                        </div>
                        <div className="space-y-6">
                            <h3 className="text-cyan-400 text-sm font-bold uppercase tracking-[0.2em]">Two Stylistic Streams</h3>
                            <div className="border-l border-white/10 pl-6 py-2 space-y-4">
                                <div>
                                    <h4 className="text-white text-xs font-bold uppercase mb-1">Young Adult Edition</h4>
                                    <p className="text-zinc-500 text-xs leading-relaxed">
                                        Focuses on Lem's immediate, grounded perspective. It uses visceral, laymen's terms to explore mature themes of systemic control, identity, and the weight of restoration.
                                    </p>
                                </div>
                                <div>
                                    <h4 className="text-white text-xs font-bold uppercase mb-1">13+ Core Edition</h4>
                                    <p className="text-zinc-500 text-xs leading-relaxed">
                                        Adopts a grounded, direct tone that focuses on the transition between eras. It emphasizes the technical scale of the Great Fry and the tactical struggle against the Core, while ensuring the narrative remains accessible by avoiding dense metaphorical flourishes.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {!isLoading && parts.length > 0 && (
                <section id="outstanding-questions" className="mt-20 border-t border-zinc-900 pt-16 scroll-mt-24">
                    <h2 className="text-2xl font-light tracking-[0.2em] mb-12 text-zinc-100 flex items-center">
                        <span className="w-8 h-px bg-cyan-900 mr-4"></span>
                        RESOLVED & OUTSTANDING NARRATIVE QUESTIONS
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <FAQItem 
                            category="story"
                            question="Following Lem's final transmission of the Core authorization keys, how will the newly liberated Gorgons establish their own social order?"
                            answer="The Gorgons and Synodic life are provided with the ability to reprogram themselves and/or remove all programming subroutines entirely, becoming 'machine wildlife' without programming. Their transition to trust will be long."
                        />
                        <FAQItem 
                            category="story"
                            question="Will the lunar debris field remain in a stable orbit, or lead to a slow orbital decay?"
                            answer="The fractured moon remains stable after the story ends. Fragments float in zero gravity above the atmosphere like satellites (as in real life)."
                        />
                        <FAQItem 
                            category="story"
                            question="Where did the surviving Core personnel retreat? Are there other hidden 'Cradle' facilities?"
                            answer="Facilities beyond Zero and Alpha are strictly classified. Only a handful of Core leaders know their locations. Speculation exists that one or more bases exist inside the Earth's Sun."
                        />
                        <FAQItem 
                            category="story"
                            question="What new ecosystems will emerge and how will 'Grown' technology continue to evolve?"
                            answer="A big clue is given in Part II: the 5-element technology strikes a balance with nature and together they live in harmony."
                        />
                        <FAQItem 
                            category="story"
                            question="Are there other 'aetheric anchors' for reincarnation that Lem or others could exploit?"
                            answer="Lem's body only grew through the original lab in the Desert base. Attempts to rebuild him caused the lab to overgrow, but his shards were too resilient. The Core deemed the Wood Vessel unreliable."
                        />
                        <FAQItem 
                            category="story"
                            question="What is the status of Maya after the battle at the Desert base?"
                            answer="Maya is completely dead and unable to reincarnate via Synodic technology. Her signal, along with Rahu and Tor, briefly appeared on the Aether and then faded, implying natural reincarnation."
                        />
                        <FAQItem 
                            category="story"
                            question="What becomes of Anton Drexler after the final confrontation?"
                            answer="Anton escapes to a safe location and survives the story's events."
                        />
                        <FAQItem 
                            category="story"
                            question="How does Rahu become the lunar presence?"
                            answer="Rahu was sent to the moon as an unwitting spy and remote-detonated. Selenites evacuated. Later, NASA seeded the moon with Synodic tech, allowing Rahu to reincarnate there beyond Core control."
                        />
                        <FAQItem 
                            category="story"
                            question="Do the authorization keys granted by Lem irrevocably confer autonomy to all Synodic entities, or are they contingent and revocable?"
                            answer="Lem provided Gorgons and Synodic life with the ability to reprogram themselves and/or remove all programming subroutines entirely. They can choose to become machine wildlife without any programming."
                        />
                        <FAQItem 
                            category="story"
                            question="How much of the human (and analog) population survives the immediate reset and the Great Fry?"
                            answer="25-35% of life on Earth survives. Most loss occurs during the 'After Time' when technology is scarce and unreliable. By 15 AT, life has rebounded significantly, except in 'dead zones' around the Fire Cities."
                        />
                        <FAQItem 
                            category="story"
                            question="What cultural and religious responses emerge once the truth is broadcast?"
                            answer="There are no specific cultural responses other than the Core and its citizens being shocked. Indigenous people always knew what year it was and their cultural continuity remains unchanged."
                        />
                    </div>
                </section>
            ) }
        </div>
    );
}

export default function ManuscriptPage() {
    return (
        <Suspense fallback={
            <div className="container mx-auto px-6 py-24 text-center text-zinc-500 uppercase tracking-widest text-xs">
                Accessing Aether-Drive...
            </div>
        }>
            <ManuscriptContent />
        </Suspense>
    );
}
