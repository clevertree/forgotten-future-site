# Copilot Instructions for Forgotten Future Site (Clevertree)

This project is the modern Next.js interface for the **Forgotten Future** narrative, serving as the central hub for lore, media, and the interactive manuscript.

## Core Directives
1. **Thematic Consistency:** Maintain an atmospheric, high-contrast "sci-fi" theme using Tailwind CSS. Use cyan glows, glass panels, and dark backgrounds.
2. **Lore Alignment:** Content must always reflect the current state of `ff-story` and `ff-teaser`. Refer to those repositories for the "Source of Truth" on the Great Fry, the Five Vessels, and the Monoliths.
3. **Manuscript Integration:** The `/manuscript` page should reflect the latest chapter plans and eventually the AI-rendered prose.

## Version Management
- **Source of Truth:** The current version is stored in `package.json`.
- **Protocol:** Bump the version in `package.json` on **every git commit**.
- **Reasonable Versioning:**
    - **Major (X.0.0):** Complete site redesign, major framework migration, or full feature set completion.
    - **Minor (0.X.0):** New pages (e.g., character bios, interactive map), significant lore content updates, or major feature additions.
    - **Patch (0.0.X):** CSS/UI bug fixes, minor text corrections (typos), or small layout adjustments.

## Technical Stack
- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **Content:** MDX and static TSX pages
- **Deployment:** Vercel (recommended)
