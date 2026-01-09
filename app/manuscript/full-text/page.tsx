import React from 'react';
import Link from 'next/link';

export default function FullTextManuscript() {
  const chapters = [
    { 
        id: 1, 
        title: 'An Ordinary Distance', 
        content: `Setting: Lem's suburban home; Earth. Timeline: 202X (Late), Days before Cataclysm. 
        Lem's routine suburban existence shatters as news of lunar anomalies shifts from abstract curiosity to global crisis. 
        Government confirms non-human structures; stadium-sized Monolith machines (First Wave) are reported entering the atmosphere. 
        While the public calls them "Tripods," they are actually four-pointed grown industrial entities. 
        As the threat reaches his city, Lem feels oddly detached from the universal panic, a silent observer in a world of screaming noise.`
    },
    { 
        id: 2, 
        title: 'Lynn', 
        content: `Lynn arrives and forces Lem into activation. Unlike the civilians around them, Lynn moves with 
        absolute purpose and terrifying authority. She triggers Lem's Aether-Drive, a resonance engine he didn't 
        know he possessed. The suburban illusion is stripped away as Lem's elemental nature as a Wood Vessel 
        begun to interface with Lynn's Water directives.`
    },
    { 
        id: 3, 
        title: 'The Doorway', 
        content: `Lem discovers he is not human. Through the activation of his Aetheric systems, he realizes 
        his childhood memories are a curated simulation—a reset infancy. Lynn installs a remote compulsion 
        protocol, tethering Lem to the mission. He is no longer a citizen; he is a prototype, a weapon, a vessel.`
    },
    { 
        id: 4, 
        title: 'Drafted', 
        content: `Lem is embedded with soldiers for a desperate Moon mission. The Technocratic Core, rebranding 
        as a military resistance, prepares an assault on Apex Hub. Lem is placed among the ranks, a ghost in 
        the machine of human warfare, as the Caucasian Eagle prepares for orbital insertion.`
    },
    { 
        id: 5, 
        title: 'The Briefing He Never Had', 
        content: `On board the Eagle, soldiers discuss psychological warfare and the hidden truths of the Moon. 
        The gap between institutional propaganda and the reality on the ground becomes a chasm. 
        Lem listens to the voices of men who suspect they are already dead.`
    },
    { 
        id: 6, 
        title: 'The Near Moon', 
        content: `Visual confirmation that the Moon is not what humanity was taught. As the ship leaves 
        Earth's atmosphere, the lunar surface reveals its true face—a living, shifting tapestry of 
        Synodic architecture. The moon isn't just a satellite; it's a capacitor.`
    }
    // More chapters could be added here
  ];

  return (
    <div className="container mx-auto px-6 py-12 max-w-4xl">
      <div className="mb-12 flex justify-between items-center">
        <Link href="/manuscript" className="text-cyan-500 hover:text-cyan-400 font-bold uppercase tracking-widest text-xs flex items-center gap-2">
            ← Back to Index
        </Link>
        <span className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] border border-white/10 px-3 py-1 rounded">
            Optimized for Text-to-Speech
        </span>
      </div>

      <header className="mb-16 text-center">
        <h1 className="text-6xl font-black mb-4 tracking-tighter text-glow">FORGOTTEN FUTURE</h1>
        <h2 className="text-xl text-cyan-400 uppercase tracking-[0.3em]">The Full Manuscript Draft</h2>
      </header>

      <article className="space-y-24 pb-32">
        {chapters.map((chapter) => (
          <section key={chapter.id} className="prose prose-invert max-w-none">
            <h3 className="text-3xl font-bold mb-8 text-white flex items-center gap-4">
              <span className="text-cyan-500 text-sm font-mono uppercase tracking-widest">Chapter {chapter.id}</span>
              {chapter.title}
            </h3>
            <div className="text-zinc-300 leading-[2] text-lg space-y-6">
              {chapter.content.split('\n\n').map((para, i) => (
                <p key={i}>{para.trim()}</p>
              ))}
            </div>
          </section>
        ))}
      </article>

      <footer className="border-t border-white/10 py-12 text-center">
        <p className="text-zinc-500 text-sm italic mb-4">
            End of Current Decrypted Data. Further logs are undergoing Lore Hardening.
        </p>
        <p className="text-[10px] text-zinc-600 uppercase tracking-widest">
            Protocol: Day 0 AT | Archive ID: FF-MAN-001
        </p>
      </footer>
    </div>
  );
}
