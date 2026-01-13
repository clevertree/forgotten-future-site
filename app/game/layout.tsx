import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Project: Game',
    description: 'Projected plans for a multi-platform Forgotten Future game engine. Discover the distributed rendering architecture and gameplay concepts.',
};

export default function GameLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
