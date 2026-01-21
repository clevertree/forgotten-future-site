'use client';

import React from 'react';
import Image from 'next/image';

interface InfoCardProps {
    title: string;
    subtitle?: string;
    description: React.ReactNode;
    imageSrc: string;
    imageAlt: string;
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
    borderColor = 'border-l-cyan-500',
    subtitleColor = 'text-cyan-400',
    onClick,
    layout = 'vertical',
    imageHeight = 'h-48'
}) => {
    if (layout === 'horizontal') {
        return (
            <div className={`glass-panel p-8 border-l-4 ${borderColor} overflow-hidden relative`}>
                <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className={`md:w-1/3 relative ${imageHeight} overflow-hidden rounded bg-black/40 cursor-pointer group`} onClick={onClick}>
                        <Image
                            src={imageSrc}
                            alt={imageAlt}
                            fill
                            className="object-cover object-top w-full h-full opacity-80 group-hover:opacity-100 transition-opacity"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
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
                <Image
                    src={imageSrc}
                    alt={imageAlt}
                    fill
                    className="object-cover object-top w-full h-full opacity-80 group-hover:opacity-100 transition-opacity"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
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
