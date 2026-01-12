export function getBasePath() {
  return process.env.NEXT_PUBLIC_BASE_PATH || '';
}

export function prefixPath(path: string) {
  if (path.startsWith('http') || path.startsWith('//')) {
    return path;
  }
  
  const base = getBasePath();
  if (!base) return path;
  
  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  return `${base}${normalizedPath}`;
}
