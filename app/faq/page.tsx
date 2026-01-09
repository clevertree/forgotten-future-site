import React from 'react';

export default function FAQPage() {
  const faqs = [
    {
      q: "What is an AI-Driven Story?",
      a: "Beyond simple generation, it means leveraging AI to maintain perfect narrative consistency, complex world-building facts, and causal integrity across thousands of pages and years of timeline."
    },
    {
      q: "Are the Monoliths really Tripods?",
      a: "No. This is a common public misconception in the After Time. Monoliths are four-pointed industrial units (2 arms, 2 legs). True 'Striders' built by the Gorgons are smaller and closer to the classical tripod design."
    },
    {
      q: "What actually happened to Lynn?",
      a: "Lynn dissolved into the Lunar Capacitor to initiate a system reset. While her physical form is gone, her software legacy exists as an AI presence within Lem's Aether-Drive."
    },
    {
      q: "Can I contribute to the lore?",
      a: "Yes. Forgotten Future is an open-source narrative. Lore Hardening occurs through public discourse and GitHub-managed documentation."
    }
  ];

  return (
    <div className="container mx-auto px-6 py-12 max-w-3xl">
      <h1 className="text-5xl mb-12 text-glow">DECRYPTED INTEL (FAQ)</h1>
      <div className="space-y-12">
        {faqs.map((faq, i) => (
          <div key={i} className="glass-panel">
            <h3 className="text-xl text-cyan-400 mb-4 uppercase tracking-tighter italic">Q: {faq.q}</h3>
            <p className="text-gray-300 leading-relaxed pl-4 border-l border-white/10">A: {faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
