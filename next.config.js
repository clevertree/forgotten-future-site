// next.config.js

const path = require("path");

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
console.log('Building with basePath:', basePath);

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: process.env.NEXT_PUBLIC_IS_STATIC === 'true' ? 'export' : undefined,
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
