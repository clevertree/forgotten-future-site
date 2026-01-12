'use client';

import { SessionProvider } from "next-auth/react";
import React from "react";

export function Providers({ children }: { children: React.ReactNode }) {
    const isStatic = process.env.NEXT_PUBLIC_IS_STATIC === 'true';

    if (isStatic) {
        return <>{children}</>;
    }

    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    );
}
