import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact',
    description: 'Establish an uplink with the Forgotten Future team. Reach out for collaborations, inquiries, or feedback.',
};

export default function ContactPage() {
    return (
        <div className="container mx-auto px-6 py-12 max-w-2xl text-center">
            <h1 className="text-3xl md:text-5xl mb-8 text-glow uppercase tracking-tighter">ESTABLISH UPLINK</h1>
            <p className="text-sm md:text-base text-gray-400 mb-16 italic px-4 leading-relaxed">
                "Communication is the first step toward reincarnation."
                — Fragmented Archivist Log
            </p>

            <div className="glass-panel text-left py-8 md:py-12 px-6 md:px-12">
                <div className="space-y-8">
                    <div>
                        <h3 className="text-xs uppercase tracking-[0.3em] text-cyan-500 mb-2">Primary Frequency</h3>
                        <a href="mailto:ari@asu.edu" className="text-xl md:text-2xl font-bold tracking-tight hover:text-cyan-400 transition-colors break-words">ari@asu.edu</a>
                    </div>
                    <div>
                        <h3 className="text-xs uppercase tracking-[0.3em] text-cyan-500 mb-2">Digital Archive</h3>
                        <a href="https://github.com/clevertree" className="text-xl md:text-2xl font-bold tracking-tight hover:text-cyan-400 transition-colors break-words">github.com/clevertree</a>
                    </div>
                    <div>
                        <h3 className="text-xs uppercase tracking-[0.3em] text-cyan-500 mb-2">Operational Status</h3>
                        <p className="text-gray-400 text-sm">Active Monitoring. Lore Hardening in progress.</p>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-white/5 text-[10px] text-zinc-600 uppercase tracking-widest text-center">
                    Encrypted with Aetheric Signature v4.11
                </div>
            </div>
        </div>
    );
}
