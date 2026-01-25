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

    return (
        <div className="flex items-center gap-1 bg-primary backdrop-blur-md border border-black/10 rounded-full p-1 h-fit">
            <button
                onClick={() => setTheme('light')}
                className={`p-1.5 rounded-full ${theme === 'light'
                    ? 'btn-toggle-active'
                    : 'btn-toggle-inactive'
                    }`}
                title="Light Mode"
            >
                <Sun size={16} />
            </button>
            <button
                onClick={() => setTheme('dark')}
                className={`p-1.5 rounded-full ${theme === 'dark'
                    ? 'btn-toggle-active'
                    : 'btn-toggle-inactive'
                    }`}
                title="Dark Mode"
            >
                <Moon size={16} />
            </button>
            <button
                onClick={() => setTheme('system')}
                className={`p-1.5 rounded-full ${theme === 'system'
                    ? 'btn-toggle-active'
                    : 'btn-toggle-inactive'
                    }`}
                title="System Default"
            >
                <Monitor size={16} />
            </button>
        </div>
    );
}
