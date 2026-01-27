export const isDir = (val: any) => val !== null && typeof val === 'object' && '_count' in val;
export const isImage = (path: string) => /\.(jpg|jpeg|png|gif|svg|webp)$/i.test(path);
export const isVideo = (path: string) => /\.(mp4|webm|ogg)$/i.test(path);

export const getImageUrl = (url: string, width: number = 800) => {
    return `/api/image?path=${encodeURIComponent(url)}&w=${width}`;
};

export const formatSlug = (slug: string | string[] | undefined): string[] => {
    return Array.isArray(slug) ? slug : (slug ? [slug] : []);
};
