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
    mobileLabel?: string;
}

export const StickyNav: React.FC<StickyNavProps> = ({ 
    sections, 
    activeId, 
    onSectionClick, 
    className = '', 
    top = 'top-20 md:top-28',
    mobileLabel = "Jump to Section..."
}) => {
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
        <div className={`sticky ${top} z-10 bg-black/80 backdrop-blur-sm py-4 border-b border-white/5 no-print mb-6 md:mb-12 ${className}`}>
            {/* Mobile Dropdown */}
            <div className="md:hidden px-4 relative">
                <select 
                    onChange={(e) => handleClick(e.target.value)}
                    value={activeId || ""}
                    className="w-full bg-black/50 border border-cyan-500/30 text-cyan-500 text-[10px] font-bold uppercase tracking-widest px-4 py-3 rounded outline-none focus:border-cyan-500 transition-colors appearance-none cursor-pointer"
                >
                    <option value="" disabled>{mobileLabel}</option>
                    {sections.map((section) => (
                        <option key={section.id} value={section.id} className="bg-zinc-900">
                            {section.title}
                        </option>
                    ))}
                </select>
                {/* Custom arrow for dropdown */}
                <div className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none text-cyan-500/50 text-[10px]">
                    ▼
                </div>
            </div>

            {/* Desktop Buttons */}
            <div className="hidden md:flex flex-wrap gap-2 px-2">
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
        </div>
    );
};
