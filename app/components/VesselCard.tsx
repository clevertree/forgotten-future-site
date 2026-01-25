'use client';

import React from 'react';

interface VesselCardProps {
    name: string;
    element: string;
    description: string;
}

export const VesselCard: React.FC<VesselCardProps> = ({ name, element, description }) => {
    const elementColor = {
        'Wood': 'text-element-wood',
        'Fire': 'text-element-fire',
        'Water': 'text-element-water',
        'Earth': 'text-element-earth',
        'Order': 'text-element-metal'
    }[element] || 'text-accent';

    return (
        <div className="glass-panel text-center not-prose">
            <h3 className="text-xl mb-2">{name}</h3>
            <span className={`text-xs ${elementColor} uppercase tracking-[0.2em] mb-4 block`}>{element}</span>
            <p className="text-sm text-secondary leading-relaxed">{description}</p>
        </div>
    );
};
