// next.config.js

const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: process.env.NEXT_PUBLIC_IS_STATIC === 'true' ? 'export' : undefined,
    // Configure pageExtensions
    pageExtensions: ['ts', 'tsx', 'js', 'jsx'],
    // Optionally, add any other Next.js config below
    reactStrictMode: true,
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
