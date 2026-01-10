'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { href: '/story', label: 'Story' },
        { href: '/manuscript', label: 'Manuscript' },
        { href: '/media', label: 'Media' },
        { href: '/faq', label: 'FAQ' },
        { href: '/contact', label: 'Contact' },
    ];

    return (
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center relative">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 md:gap-4 group z-50">
                <div className="relative w-12 h-12 md:w-20 md:h-20">
                    <Image
                        src="/icon.png"
                        alt="Forgotten Future Icon"
                        fill
                        className="object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                </div>
                <span className="text-xl md:text-3xl font-bold tracking-tighter text-cyan-400 text-glow">
                    FORGOTTEN FUTURE
                </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex gap-8 uppercase text-sm tracking-widest font-medium">
                {navLinks.map(link => (
                    <Link key={link.href} href={link.href} className="hover:text-cyan-400 transition-colors">
                        {link.label}
                    </Link>
                ))}
            </div>

            {/* Mobile Hamburger Button */}
            <button
                className="lg:hidden z-50 p-2 text-cyan-400 focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle Menu"
            >
                <div className="w-6 h-5 relative flex flex-col justify-between">
                    <span className={`w-full h-0.5 bg-current transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                    <span className={`w-full h-0.5 bg-current transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
                    <span className={`w-full h-0.5 bg-current transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                </div>
            </button>

            {/* Mobile Nav Overlay */}
            <div className={`fixed inset-0 bg-zinc-950/95 backdrop-blur-xl z-40 transition-transform duration-500 lg:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex flex-col items-center justify-center h-full space-y-8 uppercase text-xl tracking-[0.3em] font-light">
                    {navLinks.map(link => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="hover:text-cyan-400 transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
}
