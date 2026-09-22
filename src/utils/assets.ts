/**
 * Safely resolves asset paths with Vite's BASE_URL (support for GitHub Pages subpath deployment)
 */
export function getAssetUrl(path?: string | null): string {
  if (!path) return '';
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('data:') ||
    path.startsWith('blob:')
  ) {
    return path;
  }

  const baseUrl = import.meta.env.BASE_URL || '/';
  const normalizedBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;

  // If path already starts with baseUrl, avoid duplicate prefix
  if (baseUrl !== '/' && path.startsWith(baseUrl)) {
    return path;
  }

  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${normalizedBase}${cleanPath}`;
}
