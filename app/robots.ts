import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
    const isStatic = process.env.NEXT_PUBLIC_IS_STATIC === 'true';
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || (isStatic ? 'https://clevertree.github.io' : 'https://forgottenfuturebook.com');

    return {
        rules: {
            userAgent: '*',
            allow: '/',
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    }
}
