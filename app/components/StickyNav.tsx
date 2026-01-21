'use client';

import React from 'react';

interface NavSection {
    id: string;
    title: string;
}

interface StickyNavProps {
    sections: NavSection[];
    activeId?: string;
    onSectionClick?: (id: string) => void;
    className?: string;
    top?: string;
}

export const StickyNav: React.FC<StickyNavProps> = ({ sections, activeId, onSectionClick, className = '', top = 'top-20 md:top-28' }) => {
    const handleClick = (id: string) => {
        if (onSectionClick) {
            onSectionClick(id);
        } else {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <div className={`flex flex-wrap gap-2 mb-12 sticky ${top} z-10 bg-black/80 backdrop-blur-sm py-4 border-b border-white/5 no-print ${className}`}>
            {sections.map((section) => (
                <button
                    key={section.id}
                    onClick={() => handleClick(section.id)}
                    className={`px-4 py-2 rounded text-[10px] font-bold uppercase tracking-widest border border-cyan-500/30 text-cyan-500 hover:bg-cyan-500/10 transition-all active:scale-95 ${
                        activeId === section.id ? 'bg-cyan-500/10 border-cyan-500' : ''
                    }`}
                >
                    {section.title}
                </button>
            ))}
        </div>
    );
};
