'use client';

import React from 'react';

interface FAQItemProps {
    question: string;
    answer: string;
    category?: 'project' | 'ethics' | 'story';
}

export const FAQItem: React.FC<FAQItemProps> = ({ question, answer, category = 'project' }) => {
    let borderColor = 'border-l-cyan-900/50';
    let questionColor = 'text-cyan-400';

    if (category === 'ethics') {
        borderColor = 'border-l-purple-900/50';
        questionColor = 'text-purple-400';
    } else if (category === 'story') {
        borderColor = 'border-l-red-900/50';
        questionColor = 'text-red-400';
    }

    return (
        <div className={`glass-panel p-6 border-l-2 ${borderColor}`}>
            <h3 className={`text-lg ${questionColor} mb-2 uppercase tracking-tighter italic font-semibold`}>
                {category === 'story' ? `Q: ${question}` : question}
            </h3>
            <div className={`text-gray-400 text-sm leading-relaxed ${category === 'story' ? 'pl-4 border-l border-white/5' : ''}`}>
                {category === 'story' ? `A: ${answer}` : answer}
            </div>
        </div>
    );
};
