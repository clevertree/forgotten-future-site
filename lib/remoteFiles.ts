export const STORY_REPO_BASE = 'https://raw.githubusercontent.com/clevertree/ff-story/main/';

export interface FileMetadata {
    _title?: string;
    _lqip?: string;
}

export interface FileTree {
    [key: string]: FileTree | FileMetadata | any;
    _count: number;
}

let cachedStoryIndex: FileTree | null = null;
let lastFetchTime = 0;

export async function getStoryIndex(): Promise<FileTree> {
    const now = Date.now();
    // Cache for 60 seconds
    if (cachedStoryIndex && (now - lastFetchTime < 60000)) {
        return cachedStoryIndex;
    }

    const cacheBuster = Math.floor(now / 60000);
    const res = await fetch(`${STORY_REPO_BASE}index.json?v=${cacheBuster}`, { next: { revalidate: 60 } });
    if (!res.ok) {
        throw new Error('Failed to fetch story index');
    }
    cachedStoryIndex = await res.json();
    lastFetchTime = now;
    return cachedStoryIndex!;
}

export async function getStoryFile(path: string): Promise<string> {
    const res = await fetch(`${STORY_REPO_BASE}${path}`, { next: { revalidate: 3600 } });
    if (!res.ok) {
        throw new Error(`Failed to fetch file: ${path}`);
    }
    return res.text();
}
