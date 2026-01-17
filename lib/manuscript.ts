
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

export type ManuscriptVersion = '13plus' | 'youngadult';

const MANUSCRIPT_URLS: Record<ManuscriptVersion, string> = {
    '13plus': 'https://raw.githubusercontent.com/clevertree/ff-story/main/manuscript/MANUSCRIPT_13_PLUS.md',
    'youngadult': process.env.NEXT_PUBLIC_MANUSCRIPT_URL || 'https://raw.githubusercontent.com/clevertree/ff-story/main/manuscript/MANUSCRIPT_YOUNG_ADULT.md'
};


/**
 * Fetches the full manuscript from GitHub and parses it into Parts and Chapters.
 */
export async function fetchManuscript(version: ManuscriptVersion = '13plus'): Promise<{ parts: Part[], chapters: Chapter[] }> {
    try {
        const url = MANUSCRIPT_URLS[version];
        const response = await fetch(url);
        if (!response.ok) {
            console.error(`Manuscript fetch failed for ${version}:`, response.statusText);
            return { parts: [], chapters: [] };
        }
        const text = await response.text();

        // Split by horizontal rule separator used in the file
        const segments = text.split(/\n---\n/);

        const parts: Part[] = [];
        const chaptersList: Chapter[] = [];

        // Ensure at least one part exists if there are chapters but no part labels
        let currentPart: Part | null = null;
        const defaultPart: Part = {
            id: 'unassigned',
            title: 'Manuscript',
            summary: 'The recorded logs of the Aether-Drive.',
            chapters: []
        };

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

            // Extract content: Try ## Draft first, then fallback to everything after the header
            let content = '';
            const draftMatch = segment.match(/## Draft\n([\s\S]*?)(?=\n##|$)/);
            if (draftMatch) {
                content = draftMatch[1].trim();
            } else {
                // Find where the chapter header ends and take everything after it
                const headerEndIndex = segment.indexOf(headerMatch[0]) + headerMatch[0].length;
                content = segment.substring(headerEndIndex).trim();
            }

            // Extract summary: Try ## Synopsis first, then fallback to the first paragraph of content
            let summary = '';
            const synopsisMatch = segment.match(/## Synopsis\n([\s\S]*?)(?=\n##|$)/);
            if (synopsisMatch) {
                summary = synopsisMatch[1].trim();
            } else {
                // Remove any markdown headers if they exist in the fallback content for summary
                const cleanContent = content.replace(/^##.*$/gm, '').trim();
                const firstPara = cleanContent.split('\n\n')[0];
                summary = firstPara.length > 200 ? firstPara.substring(0, 200) + '...' : firstPara;
            }

            const chapter: Chapter = { id, title, content, summary };

            // Avoid duplicates
            if (!chaptersList.find(c => c.id === id)) {
                chaptersList.push(chapter);
                if (currentPart) {
                    currentPart.chapters.push(chapter);
                } else {
                    defaultPart.chapters.push(chapter);
                }
            }
        }

        // If no parts were found but we have chapters, use the default part
        if (parts.length === 0 && defaultPart.chapters.length > 0) {
            parts.push(defaultPart);
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
