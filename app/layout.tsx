import type { Metadata, Viewport } from 'next'
import React from "react";
import { Inter } from 'next/font/google';
import Navigation from './components/Navigation';
import '../styles/globals.css';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const viewport: Viewport = {
    themeColor: '#000000',
    width: 'device-width',
    initialScale: 1,
}

export const metadata: Metadata = {
    title: {
        default: 'Forgotten Future | AI-Driven Sci-Fi Epic',
        template: '%s | Forgotten Future'
    },
    description: 'Explore the cosmic aftermath of the Great Fry. An AI-driven sci-fi novel and animated experience.',
    metadataBase: new URL('https://forgotten-future.com'),
    alternates: {
        canonical: '/',
    },
    openGraph: {
        title: 'Forgotten Future | AI-Driven Sci-Fi Epic',
        description: 'Explore the cosmic aftermath of the Great Fry.',
        url: 'https://forgotten-future.com',
        siteName: 'Forgotten Future',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Forgotten Future | AI-Driven Sci-Fi Epic',
        description: 'Explore the cosmic aftermath of the Great Fry.',
        images: ['/og-image.png'],
    },
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
        <html lang="en" className={`${inter.className} scroll-smooth`}>
            <body className="bg-black text-white selection:bg-cyan-500/30">
                <header className="fixed top-0 w-full z-50 no-print">
                    <div className="absolute inset-0 bg-black/95 backdrop-blur-md border-b border-white/10 -z-10" />
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

