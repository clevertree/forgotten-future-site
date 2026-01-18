
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

const LOCAL_MANUSCRIPT_PATHS: Record<ManuscriptVersion, string> = {
    '13plus': '/manuscript/manuscript_13plus.md',
    'youngadult': '/manuscript/manuscript_youngadult.md'
};

export async function parseManuscript(text: string): Promise<{ parts: Part[], chapters: Chapter[], draftVersion?: string }> {
    const versionMatch = text.match(/> Draft Version: ([\d.]+)/);
    const draftVersion = versionMatch ? versionMatch[1] : undefined;

    const segments = text.split(/\n---\n/);

    const parts: Part[] = [];
    const chaptersList: Chapter[] = [];

    let currentPart: Part | null = null;
    const defaultPart: Part = {
        id: 'unassigned',
        title: 'Manuscript',
        summary: 'The recorded logs of the Aether-Drive.',
        chapters: []
    };

    for (const segment of segments) {
        const partMatch = segment.match(/# PART ([IVXLCDM]+): (.*)/i);
        if (partMatch) {
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

        const headerMatch = segment.match(/# Chapter (\d+): (.*)/);
        if (!headerMatch) continue;

        const id = parseInt(headerMatch[1]);
        const title = headerMatch[2].trim();

        let content = '';
        const draftMatch = segment.match(/## Draft\n([\s\S]*?)(?=\n##|$)/);
        if (draftMatch) {
            content = draftMatch[1].trim();
        } else {
            const headerEndIndex = segment.indexOf(headerMatch[0]) + headerMatch[0].length;
            content = segment.substring(headerEndIndex).trim();
        }

        let summary = '';
        const synopsisMatch = segment.match(/## Synopsis\n([\s\S]*?)(?=\n##|$)/);
        if (synopsisMatch) {
            summary = synopsisMatch[1].trim();
        } else {
            const cleanContent = content.replace(/^##.*$/gm, '').trim();
            const firstPara = cleanContent.split('\n\n')[0];
            summary = firstPara.length > 200 ? firstPara.substring(0, 200) + '...' : firstPara;
        }

        const chapter: Chapter = { id, title, content, summary };

        if (!chaptersList.find(c => c.id === id)) {
            chaptersList.push(chapter);
            if (currentPart) {
                currentPart.chapters.push(chapter);
            } else {
                defaultPart.chapters.push(chapter);
            }
        }
    }

    if (parts.length === 0 && chaptersList.length > 0) {
        parts.push(defaultPart);
    }

    return {
        parts,
        chapters: chaptersList.sort((a, b) => a.id - b.id),
        draftVersion
    };
}

export async function fetchRemoteManuscript(version: ManuscriptVersion = '13plus'): Promise<{ parts: Part[], chapters: Chapter[], draftVersion?: string } | null> {
    try {
        const baseUrl = MANUSCRIPT_URLS[version];
        const url = `${baseUrl}?t=${Date.now()}`;
        console.log(`[Manuscript] Initiating remote check for version: ${version}`);

        const response = await fetch(url);
        if (!response.ok) return null;

        const text = await response.text();
        return parseManuscript(text);
    } catch (e) {
        console.error("[Manuscript] Remote fetch error:", e);
        return null;
    }
}

export async function fetchManuscript(version: ManuscriptVersion = '13plus'): Promise<{ parts: Part[], chapters: Chapter[], draftVersion?: string }> {
    try {
        let text = '';
        const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
        const localUrl = `${basePath}${LOCAL_MANUSCRIPT_PATHS[version]}`;

        console.log(`[Manuscript] Attempting local load from: ${localUrl}`);
        try {
            const localResponse = await fetch(localUrl);
            if (localResponse.ok) {
                text = await localResponse.text();
            }
        } catch (e) {
            console.warn(`[Manuscript] Local load failed:`, e);
        }

        if (!text) {
            const remoteData = await fetchRemoteManuscript(version);
            if (remoteData) return remoteData;
            return { parts: [], chapters: [] };
        }

        return parseManuscript(text);
    } catch (error) {
        console.error(`[Manuscript] Unexpected error in fetchManuscript:`, error);
        return { parts: [], chapters: [] };
    }
}
