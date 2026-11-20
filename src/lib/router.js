import { useEffect, useState } from 'react';

/** Tiny history-API router: '/', '/blog', '/blog/:slug', '/legal'. */
const listeners = new Set();
const emit = () => listeners.forEach((fn) => fn(window.location.pathname));

export function navigate(path, { replace = false } = {}) {
  if (path === window.location.pathname + window.location.hash) return;
  history[replace ? 'replaceState' : 'pushState']({}, '', path);
  emit();
}

window.addEventListener('popstate', emit);

export function usePath() {
  const [path, setPath] = useState(window.location.pathname);
  useEffect(() => {
    listeners.add(setPath);
    return () => listeners.delete(setPath);
  }, []);
  return path;
}

export function matchRoute(path) {
  const p = path.replace(/\/+$/, '') || '/';
  if (p === '/') return { name: 'home' };
  if (p === '/blog') return { name: 'blog' };
  const m = p.match(/^\/blog\/([^/]+)$/);
  if (m) return { name: 'post', slug: decodeURIComponent(m[1]) };
  if (p === '/legal') return { name: 'legal' };
  if (p === '/services') return { name: 'services' };
  return { name: 'notfound' };
}
