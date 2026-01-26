'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';

export default function ThemeSwitch() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    // useEffect only runs on the client, so now we can safely show the UI
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="p-2 w-9 h-9" />;
    }

    const options = [
        { id: 'light', Icon: Sun, title: 'Light Mode' },
        { id: 'dark', Icon: Moon, title: 'Dark Mode' },
        { id: 'system', Icon: Monitor, title: 'System Default' },
    ];

    return (
        <div className="flex items-center gap-1 bg-primary/5 backdrop-blur-md border border-primary/10 rounded-full p-1 h-fit shadow-inner">
            {options.map(({ id, Icon, title }) => (
                <button
                    key={id}
                    onClick={() => setTheme(id)}
                    className={`p-2 rounded-full transition-all duration-300 flex items-center justify-center ${theme === id
                        ? 'btn-toggle-active scale-110 shadow-lg'
                        : 'btn-toggle-inactive hover:bg-primary/10'
                        }`}
                    title={title}
                >
                    <Icon size={16} strokeWidth={theme === id ? 3 : 2} />
                </button>
            ))}
        </div>
    );
}
