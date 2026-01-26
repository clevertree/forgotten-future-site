export const STORY_REPO_BASE = 'https://raw.githubusercontent.com/clevertree/ff-story/main/';

export interface FileMetadata {
    _title?: string;
    _lqip?: string;
}

export interface FileTree {
    [key: string]: FileTree | FileMetadata | any;
    _count: number;
}

export async function getStoryIndex(): Promise<FileTree> {
    const res = await fetch(`${STORY_REPO_BASE}index.json`, { next: { revalidate: 3600 } });
    if (!res.ok) {
        throw new Error('Failed to fetch story index');
    }
    return res.json();
}

export async function getStoryFile(path: string): Promise<string> {
    const res = await fetch(`${STORY_REPO_BASE}${path}`, { next: { revalidate: 3600 } });
    if (!res.ok) {
        throw new Error(`Failed to fetch file: ${path}`);
    }
    return res.text();
}
