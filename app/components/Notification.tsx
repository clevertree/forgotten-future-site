'use client';

import React from 'react';

interface NotificationProps {
    message: string | null;
    onClose: () => void;
}

export const Notification: React.FC<NotificationProps> = ({ message, onClose }) => {
    if (!message) return null;

    return (
        <div className="fixed top-28 right-8 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="bg-cyan-500 text-black px-6 py-3 rounded-full shadow-xl shadow-accent/50 font-bold text-xs uppercase tracking-widest flex items-center gap-3">
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-black"></span>
                </span>
                {message}
                <button onClick={onClose} className="hover:opacity-60 transition-opacity">✕</button>
            </div>
        </div>
    );
};
