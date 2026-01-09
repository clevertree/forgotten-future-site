import type { Metadata } from 'next'
import React from "react";
import Link from 'next/link';
import Image from 'next/image';
import Navigation from './components/Navigation';
import '../styles/globals.css';

export const metadata: Metadata = {
    title: 'Forgotten Future | AI-Driven Sci-Fi Epic',
    description: 'Explore the cosmic aftermath of the Great Fry. An AI-driven sci-fi novel and animated experience.',
    icons: {
        icon: '/favicon.ico',
        apple: '/apple-icon.png',
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className="bg-black text-white selection:bg-cyan-500/30">
                <header className="fixed top-0 w-full z-50 bg-black/95 backdrop-blur-md border-b border-white/10 no-print">
                    <Navigation />
                </header>

                <main className="pt-24 min-h-screen">
                    {children}
                </main>

                <footer className="bg-black border-t border-white/10 py-12 mt-24 no-print">
                    <div className="container mx-auto px-6 text-center text-gray-500 text-sm">
                        <p>&copy; 2026 FORGOTTEN FUTURE. AN AI-DRIVEN NARRATIVE EXPERIMENT.</p>
                        <div className="mt-4 flex justify-center gap-6">
                            <a href="https://github.com/clevertree" className="hover:text-cyan-400 transition-colors">GITHUB</a>
                            <a href="mailto:ari@asu.edu" className="hover:text-cyan-400 transition-colors">CONTACT</a>
                        </div>
                    </div>
                </footer>
            </body>
        </html>
    )
}

