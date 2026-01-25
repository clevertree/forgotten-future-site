'use client';

import React from 'react';

interface FAQItemProps {
    question: string;
    answer: string;
    category?: 'project' | 'ethics' | 'story';
}

export const FAQItem: React.FC<FAQItemProps> = ({ question, answer, category = 'project' }) => {
    let borderColor = 'border-l-accent/30';
    let questionColor = 'text-accent';

    if (category === 'ethics') {
        borderColor = 'border-l-element-ethics/30';
        questionColor = 'text-element-ethics';
    } else if (category === 'story') {
        borderColor = 'border-l-element-fire/30';
        questionColor = 'text-element-fire';
    }

    return (
        <div className={`glass-panel p-6 border-l-2 ${borderColor}`}>
            <h3 className={`text-lg ${questionColor} mb-2 uppercase tracking-tighter italic font-semibold`}>
                {category === 'story' ? `Q: ${question}` : question}
            </h3>
            <div className={`text-secondary text-sm leading-relaxed ${category === 'story' ? 'pl-4 border-l border-primary/10' : ''}`}>
                {category === 'story' ? `A: ${answer}` : answer}
            </div>
        </div>
    );
};
