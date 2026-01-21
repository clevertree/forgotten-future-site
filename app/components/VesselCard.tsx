'use client';

import React from 'react';

interface VesselCardProps {
    name: string;
    element: string;
    description: string;
}

export const VesselCard: React.FC<VesselCardProps> = ({ name, element, description }) => {
    return (
        <div className="glass-panel text-center">
            <h3 className="text-xl mb-2">{name}</h3>
            <span className="text-xs text-cyan-500 uppercase tracking-[0.2em] mb-4 block">{element}</span>
            <p className="text-sm text-gray-400 leading-relaxed">{description}</p>
        </div>
    );
};
