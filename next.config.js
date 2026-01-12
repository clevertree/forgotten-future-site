// next.config.js

const path = require("path");
const withMDX = require('@next/mdx')({
    extension: /\.mdx?$/,
    options: {
        // If you use remark-gfm, you'll need to use next.config.mjs
        // as the package is ESM only
        // https://github.com/remarkjs/remark-gfm#install
        remarkPlugins: [],
        rehypePlugins: [],
        // If you use `MDXProvider`, uncomment the following line.
        // providerImportSource: "@mdx-js/react",
    },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: process.env.NEXT_PUBLIC_IS_STATIC === 'true' ? 'export' : undefined,
    // Configure pageExtensions to include md and mdx
    pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
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

// Merge MDX config with Next.js config
try {
    module.exports = withMDX(nextConfig)
} catch (error) {
    if (!(error instanceof Error)) {
        throw new Error(String(error))
    }
    throw error
}