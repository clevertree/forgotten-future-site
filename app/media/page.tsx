import React from 'react';

export default function MediaPage() {
  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-5xl mb-12 text-glow">RECORDS OF THE REVELATION</h1>

      {/* Music Section */}
      <section className="mb-24">
        <h2 className="text-2xl mb-8 border-b border-cyan-500/30 pb-2 uppercase tracking-widest">Aural Resonance</h2>
        <div className="glass-panel max-w-2xl">
          <h3 className="text-xl mb-4 italic">"Stars Die" - Teaser Concept</h3>
          <p className="text-sm text-gray-400 mb-8 leading-relaxed">
            The conceptual teaser for the Forgotten Future narrative, set to "Stars Die" by Porcupine Tree. 
            The visual journey depicts the Moon's destruction (The Great Fry) and the arrival of the 
            First Wave of industrial Monoliths.
          </p>
          <div className="bg-black/80 aspect-video rounded flex items-center justify-center border border-white/5 mb-6">
            <div className="text-center text-zinc-700">
                <p className="italic mb-2">[Audio Sample: Porcupine Tree - Stars Die]</p>
                <button className="text-cyan-500 hover:text-cyan-400 font-bold uppercase tracking-widest text-xs border border-cyan-900 px-4 py-2">Listen to OST Preview</button>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Identity Section */}
      <section className="mb-24">
        <h2 className="text-2xl mb-8 border-b border-cyan-500/30 pb-2 uppercase tracking-widest">Visual Schematics</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="glass-panel">
            <div className="aspect-[3/4] bg-zinc-900 rounded mb-4 border border-white/5 flex items-center justify-center italic text-zinc-700 text-xs text-center p-4">
              [Visual: Synodic Monolith Schematics. Two massive legs, two arms.]
            </div>
            <h3 className="text-sm uppercase tracking-widest mb-1 text-cyan-400">Elder Monolith</h3>
            <p className="text-[10px] text-zinc-500">Stadium-sized industrial unit.</p>
          </div>
          <div className="glass-panel">
            <div className="aspect-[3/4] bg-zinc-900 rounded mb-4 border border-white/5 flex items-center justify-center italic text-zinc-700 text-xs text-center p-4">
              [Visual: Lem in Aetheric Resonance. Spectral Lynn visible.]
            </div>
            <h3 className="text-sm uppercase tracking-widest mb-1 text-cyan-400">Vessel Resonance</h3>
            <p className="text-[10px] text-zinc-500">Wood/Water entity manifestation.</p>
          </div>
          <div className="glass-panel">
            <div className="aspect-[3/4] bg-zinc-900 rounded mb-4 border border-white/5 flex items-center justify-center italic text-zinc-700 text-xs text-center p-4">
              [Visual: The Lunar Capacitor Crater. Molten glass landscapes.]
            </div>
            <h3 className="text-sm uppercase tracking-widest mb-1 text-cyan-400">Post-Fry Surface</h3>
            <p className="text-[10px] text-zinc-500">Environmental record, Day 1 AT.</p>
          </div>
        </div>
      </section>

      {/* Teaser Stills Section (Placeholder) */}
      <section>
        <h2 className="text-2xl mb-8 border-b border-cyan-500/30 pb-2 uppercase tracking-widest">Teaser Archive</h2>
        <p className="text-gray-400 text-sm mb-12">
            Key frames from the <em>Stars Die</em> animated teaser, depicting the Decade of Revelation.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1,2,3,4,5,6,7,8].map((i) => (
             <div key={i} className="aspect-video bg-zinc-900/50 border border-white/5 flex items-center justify-center italic text-zinc-800 text-[10px]">
                Frame_{i.toString().padStart(2, '0')}
             </div>
          ))}
        </div>
      </section>
    </div>
  );
}
