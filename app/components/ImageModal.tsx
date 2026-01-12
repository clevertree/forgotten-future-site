'use client';

import React from 'react';
import Image from 'next/image';

export interface ModalImage {
    src: string;
    alt: string;
    title?: string;
    meta?: string;
}

interface ImageModalProps {
    image: ModalImage;
    onClose: () => void;
    onNext: () => void;
    onPrev: () => void;
}

export function ImageModal({ image, onClose, onNext, onPrev }: ImageModalProps) {
    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') onNext();
            if (e.key === 'ArrowLeft') onPrev();
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onNext, onPrev, onClose]);

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm" onClick={onClose}>
            <div className="relative w-full h-full flex items-center justify-center p-4 md:p-12" onClick={(e) => e.stopPropagation()}>
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors text-2xl z-[110]"
                    aria-label="Close"
                >
                    ✕
                </button>

                {/* Left navigation */}
                <button
                    onClick={(e) => { e.stopPropagation(); onPrev(); }}
                    className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors text-4xl md:text-5xl z-[110] hover:scale-125 transition-transform"
                    aria-label="Previous"
                >
                    ‹
                </button>

                {/* Image */}
                <div className="relative w-full h-[85vh]">
                    <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-contain shadow-2xl shadow-cyan-500/10"
                        sizes="(max-width: 1200px) 100vw, 1200px"
                    />
                </div>

                {/* Right navigation */}
                <button
                    onClick={(e) => { e.stopPropagation(); onNext(); }}
                    className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors text-4xl md:text-5xl z-[110] hover:scale-125 transition-transform"
                    aria-label="Next"
                >
                    ›
                </button>

                {/* Info at bottom */}
                <div className="absolute bottom-4 md:bottom-10 left-1/2 -translate-x-1/2 text-center pointer-events-none w-full px-4">
                    <h3 className="text-white text-xl md:text-2xl font-bold uppercase tracking-[0.2em] mb-1">{image.title || image.alt}</h3>
                    {image.meta && <p className="text-cyan-400 text-[10px] md:text-xs uppercase tracking-[0.4em] font-medium">{image.meta}</p>}
                </div>
            </div>
        </div>
    );
}
