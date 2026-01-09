import type { Metadata } from 'next'
import React from "react";
import Link from 'next/link';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'Forgotten Future | AI-Driven Sci-Fi Epic',
  description: 'Explore the cosmic aftermath of the Great Fry. An AI-driven sci-fi novel and animated experience.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white selection:bg-cyan-500/30">
        <header className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
          <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold tracking-tighter text-cyan-400 text-glow">
              FORGOTTEN FUTURE
            </Link>
            <div className="flex gap-8 uppercase text-sm tracking-widest font-medium">
              <Link href="/story" className="hover:text-cyan-400 transition-colors">Story</Link>
              <Link href="/manuscript" className="hover:text-cyan-400 transition-colors">Manuscript</Link>
              <Link href="/media" className="hover:text-cyan-400 transition-colors">Media</Link>
              <Link href="/faq" className="hover:text-cyan-400 transition-colors">FAQ</Link>
              <Link href="/contact" className="hover:text-cyan-400 transition-colors">Contact</Link>
            </div>
          </nav>
        </header>

        <main className="pt-24 min-h-screen">
          {children}
        </main>

        <footer className="bg-black border-t border-white/10 py-12 mt-24">
          <div className="container mx-auto px-6 text-center text-gray-500 text-sm">
            <p>&copy; 2026 FORGOTTEN FUTURE. AN AI-DRIVEN NARRATIVE EXPERIMENT.</p>
            <div className="mt-4 flex justify-center gap-6">
              <a href="https://github.com/clevertree" className="hover:text-cyan-400 transition-colors">GITHUB</a>
              <a href="mailto:ari@ffga.me" className="hover:text-cyan-400 transition-colors">CONTACT</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}

