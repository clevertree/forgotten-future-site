
export interface Part {
    id: string; // generated from title
    title: string;
    summary: string;
    chapters: Chapter[];
}

export interface Chapter {
    id: number;
    title: string;
    content: string; // The text under ## Draft
    summary: string; // The text under ## Synopsis
}

const MANUSCRIPT_URL = 'https://raw.githubusercontent.com/clevertree/ff-story/refs/heads/main/manuscript/FULL_MANUSCRIPT.md';

/**
 * Fetches the full manuscript from GitHub and parses it into Parts and Chapters.
 */
export async function fetchManuscript(): Promise<{ parts: Part[], chapters: Chapter[] }> {
    try {
        const response = await fetch(MANUSCRIPT_URL);
        if (!response.ok) {
            console.error('Manuscript fetch failed:', response.statusText);
            return { parts: [], chapters: [] };
        }
        const text = await response.text();

        // Split by horizontal rule separator used in the file
        const segments = text.split(/\n---\n/);

        const parts: Part[] = [];
        const chaptersList: Chapter[] = [];
        let currentPart: Part | null = null;

        for (const segment of segments) {
            // Check for Part headers (e.g., # PART I: THE LUNAR MISSION)
            const partMatch = segment.match(/# PART ([IVXLCDM]+): (.*)/i);
            if (partMatch) {
                // Try to find the summary (italicized text in asterisks)
                const summaryMatch = segment.match(/\*([^*]+)\*/);
                const partSummary = summaryMatch ? summaryMatch[1].trim() : '';
                const partTitle = `Part ${partMatch[1]}: ${partMatch[2].trim()}`;
                const partId = partMatch[2].toLowerCase().replace(/[^a-z0-9]+/g, '-');

                currentPart = {
                    id: partId,
                    title: partTitle,
                    summary: partSummary,
                    chapters: []
                };
                parts.push(currentPart);
                continue;
            }

            // Extract ID and Title from the first header match
            // Format example: # Chapter 1: The Arrival of Lynn
            const headerMatch = segment.match(/# Chapter (\d+): (.*)/);
            if (!headerMatch) continue;

            const id = parseInt(headerMatch[1]);
            const title = headerMatch[2].trim();

            // Extract content from "## Draft" section
            const draftMatch = segment.match(/## Draft\n([\s\S]*?)(?=\n##|$)/);
            const content = draftMatch ? draftMatch[1].trim() : '';

            // Extract summary from "## Synopsis" section
            const synopsisMatch = segment.match(/## Synopsis\n([\s\S]*?)(?=\n##|$)/);
            const summary = synopsisMatch ? synopsisMatch[1].trim() : '';

            const chapter: Chapter = { id, title, content, summary };

            // Avoid duplicates
            if (!chaptersList.find(c => c.id === id)) {
                chaptersList.push(chapter);
                if (currentPart) {
                    currentPart.chapters.push(chapter);
                }
            }
        }

        return {
            parts,
            chapters: chaptersList.sort((a, b) => a.id - b.id)
        };
    } catch (error) {
        console.error('Error fetching manuscript:', error);
        return { parts: [], chapters: [] };
    }
}
