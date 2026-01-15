# Copilot Instructions — (site) — see `/COPILOT_INSTRUCTIONS_UNIFIED.md` for canonical guidance

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

## Commit History
- **Requirement:** Maintain a `COMMIT_HISTORY.md` file in the root of the repository.
- **Protocol:** Update `COMMIT_HISTORY.md` with a one-line summary of the new commit on **every git commit**.
- **Syncing:** If you notice `COMMIT_HISTORY.md` is out of date, sync it immediately by running `git log --oneline > COMMIT_HISTORY.md`.

## Content Rules
1. **Lem's POV:** The entire manuscript is written strictly in Lem's first-person POV. No other perspectives are featured.
2. **Human Consciousness:** Lem and all Vessels are entirely human in their thoughts and reflections. Avoid mechanical metaphors for their internal experience.
3. **Atmospheric Tone:** Use "Wellsian" clinical detachment mixed with cinematic awe.

## Technical Stack
- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **Content:** Dynamic Markdown fetched from GitHub (`ff-story`) via `lib/manuscript.ts`.
- **Deployment:** Vercel (recommended)
