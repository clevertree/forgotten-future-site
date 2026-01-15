import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'FAQ',
    description: 'Frequently asked questions about the Forgotten Future project, AI-driven storytelling, and how to contribute.',
};

export default function FAQPage() {
    const projectFaqs = [
        {
            q: "What is an AI-Driven Story?",
            a: "Beyond simple generation, it means leveraging AI to maintain perfect narrative consistency, complex world-building facts, and causal integrity across thousands of pages and years of timeline."
        },
        {
            q: "Why is this project Open Source?",
            a: "The AI-driven element sets the bar for narrative quality very high. To maintain transparency and invite collaboration, all files and development thoughts are available in real-time as part of a perpetual early release available to the public."
        },
        {
            q: "Can I contribute to the lore?",
            a: "Yes. Forgotten Future is an open-source narrative. Lore Hardening occurs through public discourse and GitHub-managed documentation."
        }
    ];

    const ethicsRules = [
        {
            title: "Human Sovereignty",
            text: "AI is a tool, not a replacement for the human spark. The core emotional truth, thematic depth, and creative direction must originate from a sentient mind."
        },
        {
            title: "The Do's: Automation",
            text: "We use AI to organize chapter plans, maintain style guidelines, audit for lore contradictions, and automate menial tasks like formatting and metadata generation."
        },
        {
            title: "The Don'ts: The Sacred Core",
            text: "AI is NOT used to generate the actual story plot, primary concepts, or the specific character activities between plot points. These must come from the author."
        },
        {
            title: "The Golden Rule of QA",
            text: "Every single line of the final text is quality-assured by a human. No section is considered 'Final' until a person has verified its emotional weight and technical accuracy."
        },
        {
            title: "Fair Share Protocol",
            text: "If AI accidentally rips off someone's idea, and they can prove it, we will either change the story significantly or negotiate a royalty share. It's only fair!"
        }
    ];

    const storyFaqs = [
        {
            q: "What is 'Synodic' technology?",
            a: "Synodic entities are not built; they are grown using Wuxing Causality (the Chinese 5-element theory). This aetheric nanotechnology allows machines to evolve independently and replicate biological growth patterns."
        },
        {
            q: "Are the Gorgons hostile?",
            a: "Contrary to Hive City propaganda, Gorgons (or 'Builders') are naturally benign industrial workers. They only become aggressive when their thermal energy sources are threatened or their construction paths are obstructed."
        },
        {
            q: "What makes Lem's return unique?",
            a: "While other Vessels require Core-managed 'Cradles' to reincarnate, Lem possesses 'Sovereign Reincarnation.' He can take root in any compatible material and reconstitute his presence almost instantly without an embryo cycle."
        },
        {
            q: "What is a 'White Forest'?",
            a: "These are vast mechanical ecosystems that act as natural signal-voids. Within a White Forest, all Core remote-control frequencies and surveillance links are severed, providing a literal sanctuary for survivors."
        },
        {
            q: "What are the three competing calendars?",
            a: "Humanity is divided by three distinct timelines: 'After Time' (AT) used by survivors starting from the Cataclysm (Year 0); the 'New Chronology' used by the Core which uses historical revisionism to claim over 1,000 years have passed; and the 'True Timeline' preserved in the Lunar Pyramid, which confirms the Cataclysm occurred only ~15 years ago."
        },
        {
            q: "Where is Anton Drexler based?",
            a: "Core leadership, including Anton Drexler, moved from the Lunar Pyramid (Cradle Prime) to the desert base (Cradle Zero) following Lem's second mission."
        },
        {
            q: "Did Rahu's memory survive?",
            a: "Rahu underwent a 'slow-burn' reset by the Core to sanitize his memories of the 202X Truth before he was redeployed for the Northern Shield campaign."
        },
        {
            q: "Is Arlo the Water Vessel?",
            a: "Arlo is the reincarnation of the original Water Vessel spirit (Maya), though he explicitly rejects this name and identity, choosing to remain a village leader."
        },
        {
            q: "What is the 'King of the Gorgons'?",
            a: "It is a propaganda title created by the Core to frame Lem as a bogeyman, justifying the Archivists' 'democratic' control over Synodic technology."
        },
        {
            q: "Are the Monoliths really Tripods?",
            a: "No. This is a common public misconception in the After Time. Monoliths are four-pointed industrial units (2 arms, 2 legs). True 'Striders' built by the Gorgons are smaller and closer to the classical tripod design."
        },
        {
            q: "What actually happened to Lynn?",
            a: "Lynn dissolved into the Lunar Capacitor to initiate a system reset. While her physical form is gone, her software legacy exists as an AI presence within Lem's Aether-Drive."
        }
    ];

    const sections = [
        { id: "project", title: "Project Architecture" },
        { id: "ethics", title: "AI Ethics & Commandments" },
        { id: "story", title: "Storyline Declassified" }
    ];

    return (
        <div className="container mx-auto px-6 py-12 max-w-4xl">
            <h1 className="text-3xl md:text-5xl mb-12 text-glow uppercase tracking-tighter">DECRYPTED INTEL (FAQ)</h1>

            {/* Navigation Index */}
            <div className="flex flex-wrap gap-2 mb-12 sticky top-28 z-10 bg-black/80 backdrop-blur-sm py-4 border-b border-white/5 no-print">
                {sections.map((section) => (
                    <a
                        key={section.id}
                        href={`#${section.id}`}
                        className="px-4 py-2 rounded text-[10px] font-bold uppercase tracking-widest border border-cyan-500/30 text-cyan-500 hover:bg-cyan-500/10 transition-all active:scale-95"
                    >
                        {section.title}
                    </a>
                ))}
            </div>

            <section id="project" className="mb-20 scroll-mt-32">
                <h2 className="text-xl md:text-2xl text-cyan-500 mb-8 border-b border-cyan-500/30 pb-2 uppercase tracking-widest">PROJECT ARCHITECTURE</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {projectFaqs.map((faq, i) => (
                        <div key={i} className="glass-panel p-6">
                            <h3 className="text-lg text-cyan-400 mb-2 uppercase tracking-tighter italic">Q: {faq.q}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">A: {faq.a}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section id="ethics" className="mb-20 scroll-mt-32">
                <h2 className="text-xl md:text-2xl text-purple-500 mb-8 border-b border-purple-500/30 pb-2 uppercase tracking-widest">AI ETHICS & COMMANDMENTS</h2>
                <div className="space-y-6">
                    {ethicsRules.map((rule, i) => (
                        <div key={i} className="glass-panel p-6 border-l-2 border-l-purple-900/50">
                            <h3 className="text-lg text-purple-400 mb-2 uppercase tracking-tighter italic font-semibold">{rule.title}</h3>
                            <p className="text-gray-400 leading-relaxed text-sm">{rule.text}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section id="story" className="mb-20 scroll-mt-32">
                <div className="flex items-center gap-4 mb-8">
                    <h2 className="text-2xl text-red-500 border-b border-red-500/30 pb-2 uppercase tracking-widest">STORYLINE DECLASSIFIED</h2>
                    <span className="bg-red-900/40 text-red-400 text-[10px] px-2 py-1 rounded border border-red-500/50 uppercase tracking-widest font-bold">
                        Spoiler Warning
                    </span>
                </div>
                <div className="space-y-6">
                    {storyFaqs.map((faq, i) => (
                        <div key={i} className="glass-panel p-6 border-l-2 border-l-red-900/50">
                            <h3 className="text-lg text-red-400 mb-4 uppercase tracking-tighter italic font-semibold">Q: {faq.q}</h3>
                            <p className="text-gray-300 leading-relaxed pl-4 border-l border-white/5 text-sm">A: {faq.a}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
