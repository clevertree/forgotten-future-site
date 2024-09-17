import type {Metadata} from 'next'
import React from "react";
import { Analytics } from "@vercel/analytics/react"

/** Styles **/

export const metadata: Metadata = {
    title: 'Forgotten Future',
    description: 'Forgotten Future Game Concept Website',
}


export default async function RootLayout(
    {
        children
    }: {
        children: React.ReactNode
    }) {

    return (<html lang="en">
    <head>
        <title>Forgotten Future</title>
        <meta name="keywords"
              content="forgotten future, game, music, relay, open-source, platformer, 2.5D, sidescroller, action, moon, donate, subscribe"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link href="/assets/site.css" rel="stylesheet"/>
        <link href="/assets/theme/minimal.css" rel="stylesheet"/>
        <link rel="manifest" href="/manifest.json"/>
        <script src="/assets/site.js"></script>
    </head>
    <body className='theme-minimal'>
    <header className="page-header">
        <button className="toggle-page-menu"></button>
        <ul className="menu-links">
            <li className="menu-link-container">
                <a href="/" className="menu-link highlight">Game</a>
            </li>
            <li className="menu-link-container">
                <a href="/pages/story.html" className="menu-link">Story</a>
                <ul className="submenu-links">
                    <li><a href="/pages/story.html#timeline">Human History</a></li>
                    <li><a href="/pages/story.html#locations">Locations</a></li>
                    <li><a href="/pages/story.html#technology">Technology</a></li>
                    <li><a href="/pages/story.html#lifeforms">Life Forms</a></li>
                    <li><a href="/pages/story.html#characters">Characters</a></li>
                    <li><a href="/pages/story.html#vehicles">Vehicles</a></li>
                </ul>
            </li>
            <li className="menu-link-container">
                <a href="/pages/contribute.html" className="menu-link">Contribute</a>
                <ul className="submenu-links">
                    <li><a href="/pages/contribute.html#play">By Playing</a></li>
                    <li><a href="/pages/contribute.html#sponsor">By Sponsoring</a></li>
                    <li><a href="/pages/contribute.html#develop">By Developing</a></li>
                    <li><a href="/pages/contribute.html#status">Check Status</a></li>
                </ul>
            </li>
            <li className="menu-link-container">
                <a href="/pages/media.html" className="menu-link">Media</a>
                <ul className="submenu-links">
                    <li><a href="/pages/media.html?autoplay=true">FF OST Sample</a></li>
                    <li><a href="/pages/media.html#art">FF Concept Art</a></li>
                </ul>
            </li>
            <li className="menu-link-container">
                <a href="/pages/faq.html" className="menu-link">FAQ</a>
            </li>
            <li className="menu-link-container">
                <a href="/pages/demo.html" className="menu-link">WebGL Demo</a>
            </li>
        </ul>
    </header>
    <article className="themed">
        {children}
    </article>

    <footer>
        <div>created by <a href="https://clevertree.net/">Ari Asulin</a></div>
        {/*<hitCounter></hitCounter>*/}
        <div>
            [<a href="http://github.com/clevertree">git repository</a>]
        </div>
    </footer>
    </body>
    <Analytics />

    </html>)
}
