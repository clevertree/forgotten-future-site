import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contribute',
    description: 'Join the development of Forgotten Future. Help shape the lore, refine the technical elements, or contribute to the open-source codebase.',
};

export default function ContributeLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
