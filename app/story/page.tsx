import React from 'react';

export default function StoryPage() {
  return (
    <div className="container mx-auto px-6 py-12 max-w-4xl">
      <h1 className="text-5xl mb-12 text-glow">THE LORE OF FORGOTTEN FUTURE</h1>
      
      <section className="mb-16">
        <h2 className="text-2xl mb-6 border-b border-cyan-500/30 pb-2">The Timeline</h2>
        <div className="space-y-8">
          <div>
            <h3 className="text-cyan-400 text-lg mb-2 underline">Before Time</h3>
            <p className="text-gray-300 leading-relaxed">
              An era of systematic deception. Humanity lived under the guidance of the Technocratic Core, unaware of the 
              Five Vessels hidden among them. The Moon was presented as a barren rock, while in reality, it housed the 
              Cradle of the Archivists.
            </p>
          </div>
          <div>
            <h3 className="text-cyan-400 text-lg mb-2 underline">Day 0: The Great Fry</h3>
            <p className="text-gray-300 leading-relaxed">
              The Lunar Capacitor discharge. Initiated by Lynn and sabotaged by Rahu, the reset failed to achieve its 
              biological purpose, instead short-circuiting every digital system in the solar system. The Moon's surface 
              sheered off, falling to Earth as the debris field that would define the next decade.
            </p>
          </div>
          <div>
            <h3 className="text-cyan-400 text-lg mb-2 underline">The After Time (Year 1 - 15 AT)</h3>
            <p className="text-gray-300 leading-relaxed">
              The emergence of the Archivists and the Thousand-Year Fallacy. This is the era of our story. Lem wanders 
              a world of mechanical ecology, governed by the stadium-sized Monoliths—grown industrial machines that 
              humanity mistakenly remembers as "Tripods."
            </p>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl mb-6 border-b border-cyan-500/30 pb-2">Synodic Technology</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="glass-panel">
            <h3 className="mb-4">Aetheric Drive</h3>
            <p className="text-sm text-gray-400">
              The resonance engine that allows Vessels to communicate with the Schema of the solar system. For Lem, 
              this includes the spectral presence of AI Lynn.
            </p>
          </div>
          <div className="glass-panel">
            <h3 className="mb-4">The Monoliths</h3>
            <p className="text-sm text-gray-400">
              Colossal organic-mechanical hybrids. Not built, but grown. They feature two massive legs and two 
              primary arms, designed for planetary reconstruction.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl mb-6 border-b border-cyan-500/30 pb-2">Geography of the Fallen World</h2>
        <ul className="space-y-6">
          <li>
            <strong className="text-cyan-400 block uppercase mb-1">Cradle Zero</strong>
            <p className="text-gray-400 text-sm">
              The original terrestrial base, now a restricted "Fire City." A Pillar of Fire stretches into the 
              blackened sky, guarded by the dormant Elder Monolith known as The Great Beast.
            </p>
          </li>
          <li>
            <strong className="text-cyan-400 block uppercase mb-1">Apex Hub</strong>
            <p className="text-gray-400 text-sm">
              The primary Archivist lunar base on the far side of the moon ruins. It remains the center of 
              Synodic power and the source of the Fallacy broadcasts.
            </p>
          </li>
          <li>
            <strong className="text-cyan-400 block uppercase mb-1">The Path of Fragments</strong>
            <p className="text-gray-400 text-sm">
              The orbital debris field that shields the Earth from deep space. It is both a graveyard of the SAS 
              fleet and the foundation of the new lunar ecology.
            </p>
          </li>
        </ul>
      </section>
    </div>
  );
}
