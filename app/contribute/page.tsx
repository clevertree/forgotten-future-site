'use client';

import React from 'react';
import Link from 'next/link';

export default function ContributePage() {
    return (
        <div className="container mx-auto px-6 py-12 max-w-5xl">
            <h1 className="text-3xl md:text-5xl mb-6 text-glow uppercase tracking-tighter">CONTRIBUTE TO THE NARRATIVE</h1>
            <p className="text-lg text-gray-300 leading-relaxed mb-12">
                Forgotten Future is an open-source narrative experiment. Whether you have a small comment, lore suggestion, or want to contribute code directly through GitHub, your voice matters. All contributors are acknowledged in the perpetual credits system.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                <div className="glass-panel p-8 border border-cyan-500/30 rounded-lg">
                    <h2 className="text-2xl text-cyan-400 uppercase tracking-widest mb-4">💬 Web Comments</h2>
                    <p className="text-gray-300 mb-6">The easiest way to contribute. Share thoughts, suggestions, or questions about the story.</p>
                    <Link href="/contact" className="inline-block px-6 py-2 bg-cyan-600/20 border border-cyan-500 text-cyan-400 rounded hover:bg-cyan-600/40 transition-colors uppercase text-sm tracking-widest font-semibold">Start Commenting</Link>
                </div>
                <div className="glass-panel p-8 border border-green-500/30 rounded-lg">
                    <h2 className="text-2xl text-green-400 uppercase tracking-widest mb-4">🔧 GitHub PRs</h2>
                    <p className="text-gray-300 mb-6">Clone the repository, make changes locally, and submit pull requests.</p>
                    <a href="https://github.com/clevertree/ff-story" target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-2 bg-green-600/20 border border-green-500 text-green-400 rounded hover:bg-green-600/40 transition-colors uppercase text-sm tracking-widest font-semibold">View on GitHub</a>
                </div>
            </div>

            <section className="mb-16">
                <h2 className="text-2xl md:text-3xl text-cyan-500 mb-8 border-b border-cyan-500/30 pb-4 uppercase tracking-widest">FAQ</h2>
                <div className="space-y-6">
                    <div className="glass-panel p-6">
                        <h3 className="text-cyan-400 mb-3 uppercase tracking-wider font-semibold">Do I need experience?</h3>
                        <p className="text-gray-400">No. There's a place for everyone.</p>
                    </div>
                    <div className="glass-panel p-6">
                        <h3 className="text-cyan-400 mb-3 uppercase tracking-wider font-semibold">Will my contribution be used?</h3>
                        <p className="text-gray-400">All contributions are reviewed by the author. You'll be credited either way.</p>
                    </div>
                    <div className="glass-panel p-6">
                        <h3 className="text-cyan-400 mb-3 uppercase tracking-wider font-semibold">How do I report plot holes?</h3>
                        <p className="text-gray-400">Use web comments or open a GitHub issue. Include the chapter and your observation.</p>
                    </div>
                </div>
            </section>

            <section className="text-center">
                <h2 className="text-2xl md:text-3xl mb-6 text-glow uppercase tracking-tighter">READY TO CONTRIBUTE?</h2>
                <p className="text-gray-300 mb-8">Your voice matters in shaping Forgotten Future.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link href="/contact" className="px-8 py-3 bg-cyan-600/20 border border-cyan-500 text-cyan-400 rounded hover:bg-cyan-600/40 transition-colors uppercase text-sm tracking-widest font-semibold">Leave a Comment</Link>
                    <a href="https://github.com/clevertree/ff-story" target="_blank" rel="noopener noreferrer" className="px-8 py-3 bg-green-600/20 border border-green-500 text-green-400 rounded hover:bg-green-600/40 transition-colors uppercase text-sm tracking-widest font-semibold">View on GitHub</a>
                </div>
            </section>
        </div>
    );
}
