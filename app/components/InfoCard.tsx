'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface InfoCardProps {
    title: string;
    subtitle?: string;
    description: React.ReactNode;
    imageSrc?: string;
    imageAlt?: string;
    slideshowImages?: { src: string; alt: string }[];
    borderColor?: string;
    subtitleColor?: string;
    onClick?: () => void;
    layout?: 'vertical' | 'horizontal';
    imageHeight?: string;
}

export const InfoCard: React.FC<InfoCardProps> = ({
    title,
    subtitle,
    description,
    imageSrc,
    imageAlt,
    slideshowImages,
    borderColor = 'border-l-cyan-500',
    subtitleColor = 'text-cyan-400',
    onClick,
    layout = 'vertical',
    imageHeight = 'h-56'
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (!slideshowImages || slideshowImages.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % slideshowImages.length);
        }, 5000); // 5 second interval
        return () => clearInterval(interval);
    }, [slideshowImages]);

    const renderImage = () => {
        if (slideshowImages && slideshowImages.length > 0) {
            return (
                <div className="relative w-full h-full">
                    {slideshowImages.map((img, i) => (
                        <div
                            key={img.src}
                            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${i === currentIndex ? 'opacity-80 group-hover:opacity-100' : 'opacity-0'
                                }`}
                        >
                            <Image
                                src={img.src}
                                alt={img.alt}
                                fill
                                className="object-cover object-top w-full h-full"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                            />
                        </div>
                    ))}
                    {slideshowImages.length > 1 && (
                        <div className="absolute bottom-2 right-2 flex gap-1 z-20">
                            {slideshowImages.map((_, i) => (
                                <div 
                                    key={i} 
                                    className={`w-1 h-1 rounded-full ${i === currentIndex ? 'bg-cyan-400' : 'bg-white/20'}`} 
                                />
                            ))}
                        </div>
                    )}
                </div>
            );
        }

        return (
            <Image
                src={imageSrc || ''}
                alt={imageAlt || ''}
                fill
                className="object-cover object-top w-full h-full opacity-80 group-hover:opacity-100 transition-opacity"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
            />
        );
    };

    if (layout === 'horizontal') {
        return (
            <div className={`glass-panel p-8 border-l-4 ${borderColor} overflow-hidden relative`}>
                <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className={`md:w-1/3 relative ${imageHeight} overflow-hidden rounded bg-black/40 cursor-pointer group`} onClick={onClick}>
                        {renderImage()}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center z-10">
                            <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity">Explore</span>
                        </div>
                    </div>
                    <div className="md:w-2/3">
                        <h3 className="text-2xl font-bold mb-1">{title}</h3>
                        {subtitle && <p className={`text-sm ${subtitleColor} uppercase tracking-widest mb-4 font-semibold`}>{subtitle}</p>}
                        <div className="space-y-4 text-gray-300 leading-relaxed">
                            {description}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`glass-panel p-6 border-l-4 ${borderColor}`}>
            <div className={`relative ${imageHeight} mb-6 overflow-hidden rounded bg-black/40 cursor-pointer group`} onClick={onClick}>
                {renderImage()}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center z-10">
                    <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity">Click to enlarge</span>
                </div>
            </div>
            <h3 className="text-2xl font-bold mb-1">{title}</h3>
            {subtitle && <p className={`text-sm ${subtitleColor} uppercase tracking-widest mb-4 font-semibold`}>{subtitle}</p>}
            <div className="space-y-4 text-gray-300">
                {description}
            </div>
        </div>
    );
};
