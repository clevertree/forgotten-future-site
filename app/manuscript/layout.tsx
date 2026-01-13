import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Manuscript',
    description: 'Read the draft of Forgotten Future. An AI-driven sci-fi novel evolving in real-time.',
};

export default function ManuscriptLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
