import React from 'react';

export default function ContactPage() {
    return (
        <div className="container mx-auto px-6 py-12 max-w-2xl text-center">
            <h1 className="text-5xl mb-8 text-glow">ESTABLISH UPLINK</h1>
            <p className="text-gray-400 mb-16 italic">
                "Communication is the first step toward reincarnation."
                — Fragmented Archivist Log
            </p>

            <div className="glass-panel text-left py-12 px-12">
                <div className="space-y-8">
                    <div>
                        <h3 className="text-xs uppercase tracking-[0.3em] text-cyan-500 mb-2">Primary Frequency</h3>
                        <p className="text-2xl font-bold tracking-tight">ari@asu.edu</p>
                    </div>
                    <div>
                        <h3 className="text-xs uppercase tracking-[0.3em] text-cyan-500 mb-2">Digital Archive</h3>
                        <a href="https://github.com/clevertree" className="text-2xl font-bold tracking-tight hover:text-cyan-400 transition-colors">github.com/clevertree</a>
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
