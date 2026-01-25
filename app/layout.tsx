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
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || (isStatic ? 'https://clevertree.github.io' : 'https://forgottenfuturebook.com');

export const metadata: Metadata = {
    title: {
        default: 'Forgotten Future | AI-Driven Sci-Fi Epic',
        template: '%s | Forgotten Future'
    },
    description: 'Explore Forgotten Future, an AI-driven sci-fi narrative experiment. Experience a world shaped by the Great Fry through its novel, imagery, and upcoming game engine.',
    keywords: ['AI', 'Sci-Fi', 'Narrative', 'Storytelling', 'Open Source', 'Novel', 'Great Fry', 'Cyberpunk', 'Post-apocalyptic', 'Interactive Fiction'],
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
    manifest: prefixPath('/manifest.json'),
    appleWebApp: {
        capable: true,
        statusBarStyle: 'default',
        title: 'Forgotten Future',
    },
    verification: {
        google: 'rOrNY_JK5-Qkp_3uGxCsZrV-AcroECbk2ffaXX3DJfg',
    },
}

export const viewport = {
    themeColor: '#000000',
    width: 'device-width',
    initialScale: 1,
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className={`${inter.className} scroll-smooth`} data-scroll-behavior="smooth" suppressHydrationWarning>
            <body className="bg-[rgb(var(--background-start-rgb))] text-[rgb(var(--foreground-rgb))] transition-colors duration-300 selection:bg-cyan-500/30">
                <Providers>
                    <header className="fixed top-0 w-full z-[1000] no-print">
                        <div className="absolute inset-0 bg-background border-b border-primary/10 -z-10" />
                        <Navigation />
                    </header>

                    <main className="pt-24 min-h-screen">
                        {children}
                    </main>

                    <footer className="border-t border-primary/10 py-12 no-print">
                        <div className="container mx-auto px-6 text-center text-muted text-sm">
                            <p>FORGOTTEN FUTURE: AN AI-DRIVEN NARRATIVE EXPERIMENT</p>
                            <p>&copy;2026 <a href="https://clevertree.net/" className="hover:text-accent transition-colors">CLEVERTREE</a></p>
                            <div className="mt-4 flex justify-center gap-6">
                                <a href="https://github.com/clevertree" className="hover:text-accent transition-colors">GITHUB</a>
                                <a href="mailto:ari@asu.edu" className="hover:text-accent transition-colors">CONTACT</a>
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

