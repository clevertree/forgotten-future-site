'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface HeroSlideshowProps {
    images: string[];
    videoSrc?: string;
}

export default function HeroSlideshow({ images, videoSrc }: HeroSlideshowProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 8000); // 8 second interval
        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black z-10" />

            {/* Slideshow */}
            {images.map((src, i) => (
                <div
                    key={src}
                    className={`absolute inset-0 transition-opacity duration-[3000ms] ease-in-out ${i === currentIndex ? 'opacity-70' : 'opacity-0'
                        }`}
                >
                    <Image
                        src={src}
                        alt="Atmospheric Background"
                        fill
                        className="object-cover"
                        style={{ filter: 'grayscale(50%) contrast(120%)' }}
                        priority={i === 0}
                        sizes="100vw"
                    />
                </div>
            ))}

            {/* Optional Video Overlay (if we want to keep the glitch effect or similar) */}
            {videoSrc && (
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay pointer-events-none"
                    style={{ filter: 'grayscale(100%) contrast(150%)' }}
                >
                    <source src={videoSrc} type="video/mp4" />
                </video>
            )}
        </div>
    );
}
