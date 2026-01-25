'use client';

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import React from "react";

export function Providers({ children }: { children: React.ReactNode }) {
    const isStatic = process.env.NEXT_PUBLIC_IS_STATIC === 'true';

    const content = (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
        </ThemeProvider>
    );

    if (isStatic) {
        return content;
    }

    return (
        <SessionProvider>
            {content}
        </SessionProvider>
    );
}
