import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const path = searchParams.get('path');
    const width = searchParams.get('w');

    if (!path) {
        return new NextResponse('Missing path', { status: 400 });
    }

    // Determine the base URL for fetching images
    const isStatic = process.env.NEXT_PUBLIC_IS_STATIC === 'true';
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || (isStatic ? 'https://clevertree.github.io' : 'https://forgottenfuturebook.com');
    
    // In development or when running as a server, we might want to use the current host
    const host = request.headers.get('host');
    const protocol = host?.includes('localhost') ? 'http' : 'https';
    const currentBaseUrl = host ? `${protocol}://${host}` : siteUrl;

    // Ensure path is treated as an absolute path from the site root if it's not a full URL
    let url = path.startsWith('http')
        ? path
        : `${currentBaseUrl.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;

    // Security check: only allow whitelisted domains
    if (url.startsWith('http')) {
        try {
            const parsedUrl = new URL(url);
            const whitelistedDomains = [
                'forgottenfuturebook.com',
                'clevertree.github.io',
                'localhost',
                '127.0.0.1',
                'files.paradigmthreat.net', // Maybe they use images from there too?
                'paradigmthreat.net'
            ];
            const isWhitelisted = whitelistedDomains.some(domain =>
                parsedUrl.hostname === domain || parsedUrl.hostname.endsWith('.' + domain)
            );

            if (!isWhitelisted) {
                return new NextResponse(`Domain ${parsedUrl.hostname} is not whitelisted`, { status: 403 });
            }
        } catch (e) {
            return new NextResponse(`Invalid URL: ${url}`, { status: 400 });
        }
    }

    try {
        const response = await fetch(url);
        if (!response.ok) {
            return new NextResponse(`Error fetching image: ${response.statusText} (${url})`, { status: response.status });
        }

        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        let transformer = sharp(buffer);

        if (width) {
            const w = parseInt(width, 10);
            if (!isNaN(w)) {
                // Limit width to something reasonable
                const resizeWidth = Math.min(w, 4000);
                transformer = transformer.resize(resizeWidth);
            }
        }

        const optimized = await transformer
            .webp({ quality: 80 })
            .toBuffer();

        return new NextResponse(optimized, {
            headers: {
                'Content-Type': 'image/webp',
                'Cache-Control': 'public, max-age=31536000, immutable',
            },
        });
    } catch (error) {
        console.error('Image optimization error:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
