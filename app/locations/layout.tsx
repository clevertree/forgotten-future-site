import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Locations',
    description: 'A visual guide to the world of Forgotten Future. From the sprawling North Desert to the depths of the White Forest.',
};

export default function LocationsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
