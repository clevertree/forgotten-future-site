import React from 'react';

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

  const storyFaqs = [
    {
      q: "Are the Monoliths really Tripods?",
      a: "No. This is a common public misconception in the After Time. Monoliths are four-pointed industrial units (2 arms, 2 legs). True 'Striders' built by the Gorgons are smaller and closer to the classical tripod design."
    },
    {
      q: "What actually happened to Lynn?",
      a: "Lynn dissolved into the Lunar Capacitor to initiate a system reset. While her physical form is gone, her software legacy exists as an AI presence within Lem's Aether-Drive."
    }
  ];

  return (
    <div className="container mx-auto px-6 py-12 max-w-4xl">
      <h1 className="text-5xl mb-12 text-glow">DECRYPTED INTEL (FAQ)</h1>

      <section className="mb-20">
        <h2 className="text-2xl text-cyan-500 mb-8 border-b border-cyan-500/30 pb-2">PROJECT ARCHITECTURE</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projectFaqs.map((faq, i) => (
            <div key={i} className="glass-panel p-6">
              <h3 className="text-lg text-cyan-400 mb-2 uppercase tracking-tighter italic">Q: {faq.q}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">A: {faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-20">
        <div className="flex items-center gap-4 mb-8">
          <h2 className="text-2xl text-red-500 border-b border-red-500/30 pb-2">STORYLINE DECLASSIFIED</h2>
          <span className="bg-red-900/40 text-red-400 text-[10px] px-2 py-1 rounded border border-red-500/50 uppercase tracking-widest font-bold">
            Spoiler Warning
          </span>
        </div>
        <div className="space-y-6">
          {storyFaqs.map((faq, i) => (
            <div key={i} className="glass-panel p-6 border-l-2 border-l-red-900/50">
              <h3 className="text-lg text-red-400 mb-4 uppercase tracking-tighter italic font-semibold">Q: {faq.q}</h3>
              <p className="text-gray-300 leading-relaxed pl-4 border-l border-white/5">A: {faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
