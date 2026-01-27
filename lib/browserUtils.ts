export const isDir = (val: any) => val !== null && typeof val === 'object' && '_count' in val;
export const isImage = (path: string) => /\.(jpg|jpeg|png|gif|svg|webp)$/i.test(path);
export const isVideo = (path: string) => /\.(mp4|webm|ogg)$/i.test(path);

export const getImageUrl = (url: string, width: number = 800) => {
    return `/api/image?path=${encodeURIComponent(url)}&w=${width}`;
};

export const formatSlug = (slug: string | string[] | undefined): string[] => {
    return Array.isArray(slug) ? slug : (slug ? [slug] : []);
};

/**
 * Recursively collects all image paths from a FileTree.
 */
export function getAllImages(tree: any, basePath: string = '', recursive: boolean = true): string[] {
    let images: string[] = [];
    if (!tree || typeof tree !== 'object') return images;

    for (const key in tree) {
        // Skip metadata keys
        if (key.startsWith('_')) continue;

        const item = tree[key];
        const currentPath = basePath ? `${basePath}/${key}` : key;

        if (isDir(item)) {
            if (recursive) {
                images = images.concat(getAllImages(item, currentPath, true));
            }
        } else if (isImage(key)) {
            images.push(currentPath);
        }
    }

    return images;
}
