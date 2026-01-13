import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Media Archive',
    description: 'Archive of visual and auditory logs from the Forgotten Future universe, including teasers and atmospheric concept art.',
};

export default function MediaLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
