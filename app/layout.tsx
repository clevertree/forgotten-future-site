import type { Metadata } from 'next'
import React from "react";
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Navigation from './components/Navigation';
import { Providers } from './components/Providers';
import '../styles/globals.css';
import { prefixPath } from '@/lib/utils';
import ScrollNavigation from './components/ScrollNavigation';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

const isStatic = process.env.NEXT_PUBLIC_IS_STATIC === 'true';
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || (isStatic ? 'https://clevertree.github.io' : 'https://ffga.me');

export const metadata: Metadata = {
    title: {
        default: 'Forgotten Future | AI-Driven Sci-Fi Epic',
        template: '%s | Forgotten Future'
    },
    description: 'Explore Forgotten Future, an AI-driven sci-fi narrative experiment. Experience a world shaped by the Great Fry through its novel, imagery, and upcoming game engine.',
    metadataBase: new URL(siteUrl),
    alternates: {
        canonical: prefixPath('/'),
    },
    openGraph: {
        title: 'Forgotten Future | AI-Driven Sci-Fi Epic',
        description: 'Explore the cosmic aftermath of the Great Fry.',
        url: prefixPath('/'),
        siteName: 'Forgotten Future',
        images: [
            {
                url: prefixPath('/og-image.png'),
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
        images: [prefixPath('/og-image.png')],
    },
    icons: {
        icon: prefixPath('/favicon.ico'),
        apple: prefixPath('/apple-icon.png'),
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className={`${inter.className} scroll-smooth`} data-scroll-behavior="smooth">
            <body className="bg-black text-white selection:bg-cyan-500/30">
                <Providers>
                    <header className="fixed top-0 w-full z-[1000] no-print">
                        <div className="absolute inset-0 bg-black/95 backdrop-blur-md border-b border-white/10 -z-10" />
                        <Navigation />
                    </header>

                    <main className="pt-24 min-h-screen">
                        {children}
                    </main>

                    <footer className="bg-black border-t border-white/10 py-12 no-print">
                        <div className="container mx-auto px-6 text-center text-gray-500 text-sm">
                            <p>FORGOTTEN FUTURE: AN AI-DRIVEN NARRATIVE EXPERIMENT</p>
                            <p>&copy;2026 CLEVERTREE</p>
                            <div className="mt-4 flex justify-center gap-6">
                                <a href="https://github.com/clevertree" className="hover:text-cyan-400 transition-colors">GITHUB</a>
                                <a href="mailto:ari@asu.edu" className="hover:text-cyan-400 transition-colors">CONTACT</a>
                            </div>
                        </div>
                    </footer>
                    <ScrollNavigation />
                    <Analytics />
                    <SpeedInsights />
                </Providers>
            </body>
        </html>
    )
}

