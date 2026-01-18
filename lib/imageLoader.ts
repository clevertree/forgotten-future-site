export default function imageLoader({ src, width, quality }: { src: string, width: number, quality?: number }) {
    // If it's already a full URL and not to a whitelisted domain, we might just return it
    // But we want to optimize even external images if they are whitelisted

    // For local images, src will be something like /media/teaser/hero_1.png
    // We want to route this through our custom API

    if (src.startsWith('data:')) {
        return src;
    }

    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
    const apiPath = `${basePath}/api/image`.replace(/\/+/g, '/');

    // Use the custom API
    return `${apiPath}?path=${encodeURIComponent(src)}&w=${width}${quality ? `&q=${quality}` : ''}`;
}
