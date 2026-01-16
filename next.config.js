// next.config.js

const path = require("path");

const isStatic = process.env.NEXT_PUBLIC_IS_STATIC === 'true';
const basePath = isStatic ? (process.env.NEXT_PUBLIC_BASE_PATH || '/forgotten-future-site') : '';

const withPWA = require("@ducanh2912/next-pwa").default({
    dest: "public",
    // Disable PWA in development AND when building a static export
    disable: process.env.NODE_ENV === "development" || isStatic,
    register: true,
    skipWaiting: true,
    cacheOnFrontEndNav: true,
    publicExcludes: [
        "media/**/*",
        "audio/**/*",
    ],
    workboxOptions: {
        disableDevLogs: true,
    },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: isStatic ? 'export' : undefined,
    basePath: basePath || undefined,
    assetPrefix: basePath || undefined,
    // Configure pageExtensions
    pageExtensions: ['ts', 'tsx', 'js', 'jsx'],
    // Optionally, add any other Next.js config below
    reactStrictMode: true,
    trailingSlash: true,
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    images: {
        unoptimized: true,
    },
}

module.exports = withPWA(nextConfig)
