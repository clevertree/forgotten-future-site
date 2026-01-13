import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Characters',
    description: 'Meet the key figures of Forgotten Future. Explore the origins and roles of Lem, Lynn, Rahu, and other Vessels.',
};

export default function CharactersLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
