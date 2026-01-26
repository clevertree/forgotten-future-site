'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { prefixPath } from '@/lib/utils';
import ThemeSwitch from './ThemeSwitch';

export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { href: '/story', label: 'Story' },
        { href: '/browser', label: 'Browser' },
        { href: '/characters', label: 'Characters' },
        { href: '/locations', label: 'Locations' },
        // { href: '/media', label: 'Media' },
        { href: '/manuscript', label: 'Manuscript' },
        { href: '/game', label: 'Game' },
        { href: '/faq', label: 'FAQ' }
    ];

    return (
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center relative">
            {/* Logo */}
            <Link href="/" className="flex items-center group z-[60]">
                <div className="relative w-12 h-12 md:w-20 md:h-20 flex-shrink-0">
                    <Image
                        src={prefixPath('/icon.png')}
                        alt="Forgotten Future Icon"
                        fill
                        className="object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                </div>
                <div className="relative h-8 md:h-12 w-36 md:w-52">
                    <Image
                        src={prefixPath('/media/logo/ff-text.png?v=1')}
                        alt="Forgotten Future"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8 uppercase text-sm tracking-widest font-medium">
                {navLinks.map(link => (
                    <Link key={link.href} href={link.href} className="hover:text-accent transition-colors">
                        {link.label}
                    </Link>
                ))}
                <ThemeSwitch />
            </div>

            {/* Mobile Hamburger Button */}
            <button
                className="lg:hidden z-[60] p-2 text-accent focus:outline-none"
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
            <div className={`fixed inset-0 bg-white dark:bg-slate-950 z-[50] transition-transform duration-500 lg:hidden overflow-y-auto ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex flex-col items-center justify-center min-h-full space-y-5 uppercase text-xl tracking-[0.3em] font-light py-20 text-primary">
                    {navLinks.map(link => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="hover:text-accent transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <div className="pt-8">
                        <ThemeSwitch />
                    </div>
                </div>
            </div>
        </nav>
    );
}
