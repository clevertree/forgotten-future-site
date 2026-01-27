7d474a4 implement query-string fallback for project browser to support static export
0c68ce4 add fullscreen toggle to slideshow and fix z-index layering
cd4b78e update git history and manuscripts
1fdc640 refactor project browser into components and custom hook
efb4e6b Update characters and locations pages with additional images and sync media subdirectories
b9c82e4 Performance optimizations, client-side routing, and caching fixes
beec7ef feat: custom mobile navigation dropdowns and themed header background
457bdf7 style: use themed classes for mobile dropdowns
741f151 feat: consolidate mobile browser navigation into dropdowns
3bcf98c feat: enhance media browser with looping navigation, filename previews, and fixed mobile nav menu
d9549fe feat: standardize UI with semantic theme colors, opaque header and rename characters
3c8a72f Update public manuscripts from story sync
f08fc50 Sync manuscripts: Mineral rejection and LHC rumor updates
2d6ba91 Sync manuscripts from ff-story
b0ac505 Add 'Play Full Synopsis' button to manuscript page
5fee72a Sync updated manuscripts and fix StickyNav mobile test
fcadaa1 Fix ChapterCard and harden auto-update logic
b65edeb archipelago updates
04012c0 chore: sync manuscripts and update dashboard
48efcf5 Update manuscripts from ff-story hooks
ca2afed perf: optimize image sizes and delivery across the site
52d11ba feat: character page reorganization, image slideshows, and UX polish
2dcd5c9 Add Tor character images to character page
2c2a4d9 Enhance character and location pages with image slideshows
575bf31 Sync media, update manuscripts, and refresh locations/characters UI
9bd8de7 Update manuscript and dashboard for 52-chapter structure
ca04f2f docs: add browser reading mode recommendation for tts
de08928 Refactor: Manuscript page to show synopses with 'Read Full Chapter' links, update ChapterCard UI.
06a6acb Docs: Sync resolved and outstanding narrative questions with canonical project notes.
2ac2529 Refactor: Extract reusable components, optimize manuscript polling with idle detection, and add comprehensive Cypress component tests.
3ad8d94 Optimize manuscript polling: stop fetching when user is idle or tab is hidden
3bbdde3 Update site lore, character bios, and manuscripts for Part III restructuring
dafcb56 chore: final sync for manuscripts and version bump
4670503 chore: sync with story repo docs and manuscripts
54c21f3 Update manuscripts and git history
8335d82 fix(manuscript): fix missing dependency warning in useEffect and update git history
355cda7 Sync: Update manuscripts and version from story push
f116b75 UI: Simplify auto-sync alert to show version and date only
682f315 Sync manuscript updates: 36-chapter refactor and outreach center narrative
1bda07f Sync: Update manuscripts from story repo refactor
4cd5ee6 Sync updated manuscripts and git history from ff-story update
17fe0b9 Cleanup git history and remove failure screenshots
f451b6a Final sync for site and test fixes
2f6e7ac Manually sync beat-complete synopses to bypass GitHub raw cache
b2d2775 Update website parser for multiline synopses and sync latest manuscripts
939ff0f Fix broken update feature: check remote immediately and every 60s
9f1b188 Sync manuscripts and update dashboard with version 0.13.22
b04df3a Update git history
42162d1 Standardize chapter formats and finalize manuscript narrative
a7d4caa fix: resolve Cypress component test failures
d20e3f0 chore: disable image optimization for static export (NEXT_PUBLIC_IS_STATIC)
8d25554 chore: sync COMMIT_HISTORY.md
e830cb9 feat: add custom image optimization API and loader using sharp
0631ae2 feat: integrate TTS playback into ScrollNavigation and remove clashing floating UI
977df52 fix: improve TTS error diagnostics to catch 'undefined' errors
ba3b21a fix: implement TTS chunking to support long manuscript narration
069fdbe fix: add error handling and alerts for mobile TTS playback failures
90683f4 feat: replace legacy mp3 placeholders with Web Speech API TTS buttons on manuscript page
3b123c0 feat: implement Web Speech API TTS for manuscript and full-text pages
46b9310 feat: display draft version on manuscript pages
0795d76 feat: add change detection and notify user on manuscript refresh
899c29d chore: update git history
67bb2db feat: implement 60-second polling for manuscript with cache-busting
3ecee3c style: remove commit SHA from repo status history display
8bbd5e0 style: allow commit messages to wrap in repo status
4d4d2ef style: move commit date before message on same line
82dfb95 style: hide commit SHA on mobile screens for repo status
349873a feat: add timestamps to git history on front page
f463908 feat: manuscript mobile layout, scroll behavior, and narrative documentation
7c57840 feat: automated git history updates and manuscript URL environment variable
ef76acf chore(ci): merge ci/fix/pages-pwa — allow configure-pages continue-on-error + disable PWA for static exports
e7de24e ci: allow setup-pages to continue-on-error + disable PWA for static exports
5e485de footer: link CLEVERTREE to https://clevertree.net/
b2cd592 feat: save last read chapter and redirect PWA launch
a34536e Cleanup: Remove accidental screenshot commits
efd8c20 Align site with 5-part manuscript structure and update versioning UI
ef82da0 feat: integrate dual-track manuscript support and add VersionSwitch component
8805621 feat: add PWA functionality for offline access
092bb3e fix stickies
59f9a4c Fix static export: revert dynamic sitemap/robots and use env vars instead
131210c Make sitemap and robots dynamic based on host header
2a4eaee SEO improvements: expanded sitemap and added keywords
9966b5f Update Google site verification code
6e05b27 Add Google site verification meta tag
cb29ce1 fix: adjust sticky navigation offset to prevent overlap with main header
6fd89fc feat: finalize AI Ethics and move outstanding questions
588b83d feat: restructure FAQ and manuscript with latest lore and outstanding questions
12c5bd0 fix: resolve one-off bug in ScrollNavigation for final chapter
c13cb8c Sync manuscript changes from ff-story
d929513 sync(manuscript): update FULL_MANUSCRIPT to match ff-story manuscript (seals deployed by ground teams)
7236d3e Chapter updates: Chapter 32 corrections (records origin, authorization codes), Chapter 27 elaboration (Lynn recovery process), Chapter 28 clarification (Water Vessel distinction)
53de6c8 chore(manuscript): update chapters and site export
f944eee feat: expand hero slideshow with full set of atmospheric images
4cb4697 feat: restore hero section background slideshow with atmospheric images
c10be7f feat: update sync scripts to clean individual chapters for the site
c2ca968 feat: sync manuscript with lore corrections (human pilots vs Gorgon inhabitants)
976f797 Sync manuscript: Chapters 5, 6, 7 narrative corrections and Chapter 32 Gorgon liberation.
c1d4cff feat: sync updated Chapter 32 manuscript and summary to website
33e73c1 Frontend: transition to static 32-chapter full-text reader and fix audio build error
1fdfc0b feat: sync 32-chapter manuscript and update frontend indexing
d9526cc feat: sync 32-chapter manuscript and update frontend indexing
11e2d9f v0.10.2: Sync website with 71 consolidated chapters and updated summaries
3bc4b43 v0.10.0: Sync manuscript data (71 chapters), update site ranges, and bump version
28ed11a v0.9.9: Silenced redundant dashboard update warnings
5b9ae04 v0.9.8: Finalize independent pre-commit hooks and dashboard automation
0759215 Test dashboard update hook
3c557de v0.9.5: Final dashboard hash sync
a282134 v0.9.4: Fix Chapter 79 synchronization and development status
f0bf24a Fix GitHub branch link and adjust opacity in status box
660759d Add development status box to front page
a42708b Add COMMIT_HISTORY.md and update Copilot instructions
390ead6 Update manuscript page and full-text with Chapter 79
fa59739 Show all 78 chapters in manuscript and full-text pages
263b5b4 Update game page with artist credits and include game assets
01e9b84 Update SEO metadata for all pages and adjust game page tense
d71aaee Fix padding on locations page
78cdf30 Add locations page, sync chapters 73-78, and fix scroll bug
9b0ab8d Sync chapters 73-74 and update maxChapter and Analytics
f7c5cf0 Sync final Ch 72
70ac70f Sync Ch 72 updates
2e6c9fe Fix Chapter 72 scroll issue and update sections/notes
a0eedc6 Update manuscript to chapter 72
ecf1deb feat: link manuscript chapters to full text sections
02d971b fix: restore font and correct metadata domain/og:image path
56e12c0 chore: disable feedback mode and anonymous comments when in static mode
357690a chore: configure static export for GitHub Pages, add dual-mode logic, remove MDX, and fix image paths
9ee50fe Remove unused MDX support and dependencies
c63fc87 Fix TypeError in next.config.js and update MDX dependencies
6bd9152 Add env flag for static vs live site and disable commenting in static mode
5600bf5 Add GitHub Actions workflow for Next.js deployment
1887257 fix: resolve Next.js warnings for image sizes and smooth scrolling
e743c6b Merge pull request #1 from clevertree/vercel/vercel-speed-insights-to-nextj-rftz2b
122e937 Add Vercel Speed Insights to Next.js
bbd7540 feat: unified ImageModal component for characters and media pages
73a5473 Sync all landscape character images from ff-story, add variants to carousel, add Elowen to page
db37edb Update Lem character image with regenerated version
c602976 Make slideshows loop continuously - cycle from last slide to first and vice versa
bf5e4cc Make Gorgon image clickable and add to character slideshow navigation
15ccdbd Add Creatures section featuring Gorgons to character page
783f4c4 Update Arlo and Anton landscape character images
6bca543 Update Iris Novak character to use landscape image instead of portrait
7acf3fd Update Rahu character image with new rahu-landscape.png
3c541d8 Add interactive image gallery with full-screen popup and left/right navigation
3f3428a Update character images to renamed files and align portraits to top of container
f60d64f Add character images to website and update character page with renamed images
b01bb3c Update manuscript UI and data (Chapters 65-68), bump v0.9.0
5d9cb25 chore: implement husky pre-commit hook with build and component tests (v0.8.0)
e229f30 Finalize husky pre-commit build and terminology sync
e55d284 Configure husky pre-commit build and fix page syntax error
c5b2366 Sync manuscript terminology corrections (v0.7.1)
fb6788d Add full manuscript prose (64 chapters) and reader sidebar navigation (v0.7.0)
d0f92e4 Update manuscript pages with 64 chapters and synchronized lore parts
c45a881 Add Overseer Anton Drexler and Commander Novak to characters page. Version bump to 0.4.0
3760fb0 feat: add 'Coming Soon' placeholders for missing character visuals
84df6e5 chore: remove Storybook and Testing Library
61de255 fix: resolve storybook v10 peer conflict and add characters page
af2fd91 Fix Storybook dependency mismatch and bump version to 0.3.1
142def0 Add Characters page and update navigation
1cc024e docs: add comprehensive testing setup summary
2871d11 chore: fix cypress configuration and storybook setup for component testing
b548185 docs: add testing guide and fix cypress test commands
ba04c5e feat: add storybook stories and cypress component tests for all components with mocked API usage
8de0d67 chore: resolve all npm security vulnerabilities (47 -> 0) and fix Next.js 16.1.1 Turbopack configuration
3937a24 v0.3.0: Implement community feedback system with GitHub PR integration
710d1ae feat: display section synopses on manuscript page and bump version to 0.1.60
48b8fab Add Part numbers to manuscript section tabs
1680d3d Fix manuscript tab scrolling to target only the scroll container
01ba65b Organize manuscript into sections with scroll tabs and custom scrollbar UI
081a18d Update manuscript page with 34 chapters and regenerated Ch 1 audio
e6f080b Bump version for alignment
b9e903a docs: update copyright and organization to Clevertree and bump version to 0.1.52
3922e94 fix: remove unsupported Viewport export in Next.js 13.5 and bump version to 0.1.51
0e18012 style: add scroll-smooth and increase scroll-margin-top for anchors
d134219 fix: connect read chapter buttons to manuscript full text sections
5ff0f15 perf: optimization (next/font/google, next/image) and SEO (robots.txt, sitemap.ts, expanded metadata)
593d9cf fix: move backdrop-blur out of header to prevent trapping mobile menu and increase opacity
0244476 fix: make mobile menu background more opaque and add backdrop blur
da62a83 Sync story content and update version for After Time transition
41cb8af Finalizing media page updates and visual archive alignment
d941cfe Add new images to media page (Logo, Core Technocracy, Mechanical Forest) and update teaser preview
02e16d0 Update favicon to square transparent version and bump version to v0.1.40
dfa6435 Replace site icons with transparent versions and bump version to v0.1.39
6b46cc8 Integrate manuscript audio playback, update mobile navigation contrast, and sync narration assets
497a6fc feat: implement full mobile-responsive layout and navigation
51b71fc style: upscale site header logo and text for better impact
a8866c5 feat: add branding icon to site header
85e8367 feat: implement new site branding icons and metadata
285a3c8 feat: integrate chapter 1 audio player into manuscript page
a2319fd feat: update manuscript sync script and version
65ac792 feat: make contact email clickable, bump version to 0.2.28
e67de28 feat: add print css layout to hide navigation, bump version to 0.2.27
82c2fc9 feat: add urls for recommended TTS extensions, bump version to 0.2.26
42606ee feat: rename Vessels to Elements and add Metal element, bump version to 0.2.25
f06ba93 feat: restore Great Fry image with synodic shards, bump version to 0.2.24
82d2e9a feat: expand front page slideshow with 3 new atmospheric images, bump version to 0.2.23
fd75925 style: move hero text down to emphasize background art, bump version to 0.2.22
c51e18e feat: implement fading slideshow on home page, reduce hero text size, bump version to 0.2.21
3058b9d feat: switch front page background to cradle zero scorch, bump version to 0.2.20
c26d021 style: add shade and backdrop blur to hero text, bump version to 0.2.19
375a233 fix: copy hero_background_spheres from teaser repo, bump version to 0.2.18
8631d03 feat: use background spheres image for front page, bump version to 0.2.17
10e105b feat: update contact email to ari@asu.edu, bump version to 0.2.16
4688582 feat: add spoiler warnings to story and media pages, bump version to 0.2.15
39f77c7 feat: split FAQ into Project and Storyline sections, bump version to 0.2.14
42f1000 feat: update full manuscript with prose for chapters 1-15, bump version to 0.2.13
7947716 content: mark teaser as coming soon, bump version to 0.2.12
b562dd3 style: reorder media cards, bump version to 0.2.11
c4725c1 content: replace great beast with windows sigh, bump version to 0.2.10
f8c2fa5 content: replace scorched earth with lightning scars, bump version to 0.2.9
f862cb1 content: replace lunar eruption with disintegrating moon, bump version to 0.2.8
170f73d feat: add image lightbox to media page, bump version to 0.2.7
d7f7e85 feat: replace Lunar Decay with Lunar Eruption on media page v0.2.6
864a942 feat: replace Eruption card with Redacted Prophecy on media page v0.2.5
0bed8d5 docs: casual tone for manuscript and expanded extension recs v0.2.4
e98d120 feat: update media page with actual teaser content and proper attribution v0.2.3
a1ad727 feat: add full-text view and listening recommendations v0.2.2
a68bf9b chore: update copilot instructions with versioning protocol v0.2.1
c32573a feat: complete site overhaul to nextjs and lore refresh v0.2.0
2d2275b add analytics
b1f598d Update index.html
cf9e5fd static content
f420bc7 upgrade to nextjs
f9b695a fixes
cf607cc playback config
a612fdb playback config
0eeb721 fix
e0b13b7 menu commands
02221e7 fix
b42b34a save to memory
699b909 menu!
35e686a menu
7500726 progress???\
2412d27 progress?
ecf5345 associated element
ca4af8e progress
d624a48 playback refactor
562a25d editor lives
b995efc keyboard commands
2aa841a song editor
5d8a6d3 css fix
4983730 game dir fix
439494a game dir fix
3b5ae3d keyboard events
91856b3 editor
896f4c7 merge subrepo into main
adb6e76 interface
557235c song editor
339d2e4 song editor
f889045 song editor
88c9aeb song editor
e965a38 song loader
306d13d editor
6d06809 rfactor
c21dfb9 refactor
dd545f9 refactor
52bb57e editor start
aa2853d page refactor
67bc99f routes
1789ac1 simple server
1556688 readded git
00dbb46 removed php
09528ac move readme and php pgp
9de1281 story update
b40aa8d tweak
4515431 yup
3f046bb updates
dfd084a scintilla
19c949c render fix
998b086 oops
d19342a rav
8aa6958 rav
bd6f524 random sine terrain
42f047d fixes
e01454b fixes
b512930 sprite shader refactor
c7f2936 binary search optimization boom
9d5a5d3 refactor map
1c288cf update
b3333ad update
98ae52e fix
53994f3 story
cd106eb story
8d63af0 water machines
07516dd tables
0fdc400 story
d14b960 story
cbbb93f content
47d999b content
b0c0ced css fixes
29fd98b css cleanup
71fed16 css fixes
73abb7d fixes
6bbb0ef story
404abc6 content
3202907 content
cf33a23 tui
7405b40 phpstorm
40ce53d faq
9f56785 fixes
73c2b25 fixes
c43317b css fixes
9058434 content
e112ca5 Update index.html
c96f201 Update index.html
2bebaa3 favicon fix
0318e31 content fix
3bbf7f9 css fixes
816a854 css fixes
83b5887 css fixes
391fa28 css fixes
7070fa7 css fixes
dc141b7 css fixes
0cc4706 css fixes
28540a1 button
9653038 button
d534298 css fixes
f2ee3b8 content
5f64359 content
4e069cf mobile refactor
9e36b35 Merge branch 'master' of ssh://github.com/clevertree/forgotten-future-site
e45f2c9 mobile refactor
df83347 pointer fix
18edd6c contribute
2dcaa32 faq
4249b53 faq
ab74095 version
f2471db version
6c03c8b subscribe
ffdae71 subscribe
180238f social media buttons
97da396 fixes
6d7983a iframes
854e149 fixes
a408ae3 fixes
b015d80 fixes
1903559 fixes
e684191 fixes
ece5083 fixes
6850142 fixes
4b706e3 fixes
3699480 fixes
3ddc222 refactor site
6fdc149 refactor site
1592084 refactor links
858f5f1 refactor
10ec761 token ip host agent
ffbb0b4 token ip host agent
f637582 faq email
89b1507 fixes
a06c0f0 flicker fix
a1d143d repo
31fe47f js version
fa9836e media
063d659 api messenger
9899d2e stylesheet version
669e6b3 css fixes
36dd15a css fixes
f0feb9f media
6bf139a media
203ccef media
1d5ffd2 media
e9778ea media
851cbb5 delete old stuff
4f47d21 concept repo
7408f3e fixes
ca3dbf6 fixes
f7db79e fixes
26f0529 fixes
1432e2f content
018b70c fixes
bb7ca28 fixes
401e8fc fixes
11ff448 fixes
5a7921f fixes
4617cfe fixes
b9f8b23 fixes
94beed6 messenger
7c182f1 register service
d42cf46 register service
9c4efd7 fixes
c1f21cb fixes
23554d5 fixes
be81edb refactor
eeee2df working
2388e2e working
4bceab5 test files
3e9bff8 rename
eac5485 rename
bb3c4fb repo fixes
7d35056 ffsite refactor
33af085 refactor repos
83d6224 game files
53b3c29 test fixes
d2f8223 submodule
a4dc5f3 dependencies
b17632c initial commit
