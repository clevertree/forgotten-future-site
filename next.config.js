// next.config.js

const path = require("path");

const isStatic = process.env.NEXT_PUBLIC_IS_STATIC === 'true';
const basePath = isStatic ? (process.env.NEXT_PUBLIC_BASE_PATH || '/forgotten-future-site') : '';

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
    // Configure Turbopack for Next.js 16.1.1+
    turbopack: {
        rules: {},
    }
}

module.exports = nextConfig
