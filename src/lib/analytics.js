import { analytics } from '../content/site';

/* Umami analytics (cookieless). Loads only when a website ID is set in
   src/content/site.js, and only counts visits on the live domains — so
   localhost / dev traffic never pollutes the numbers. */

export function initAnalytics() {
  const { umamiWebsiteId, domains, scriptUrl } = analytics;
  if (!umamiWebsiteId || typeof document === 'undefined') return;
  if (document.querySelector('script[data-website-id]')) return;
  const s = document.createElement('script');
  s.defer = true;
  s.src = scriptUrl;
  s.dataset.websiteId = umamiWebsiteId;
  if (domains) s.dataset.domains = domains;
  s.onload = flush;
  document.head.appendChild(s);
}

// Events fired before the script finishes loading are queued, then sent.
const queue = [];
function flush() {
  while (queue.length && window.umami) {
    const [name, data] = queue.shift();
    try { window.umami.track(name, data); } catch { /* ignore */ }
  }
}

/** Custom event, e.g. track('contact-sent', { interest: 'Collaboration' }). Safe no-op if Umami isn't loaded. */
export function track(name, data) {
  if (!analytics.umamiWebsiteId) return;
  try {
    if (window.umami && typeof window.umami.track === 'function') window.umami.track(name, data);
    else if (queue.length < 50) queue.push([name, data]);
  } catch {
    /* analytics must never break the site */
  }
}

/** Fire one "section-view" event per section per page load, when it crosses the middle of the screen.
    Shows which parts of the portfolio visitors actually read, and keeps the session
    "alive" so Umami can measure how long single-page visits last. */
export function trackSections(root = document) {
  if (!analytics.umamiWebsiteId || !('IntersectionObserver' in window)) return () => {};
  const seen = new Set();
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        const id = e.target.id;
        if (e.isIntersecting && id && !seen.has(id)) {
          seen.add(id);
          track('section-view', { section: id });
          io.unobserve(e.target);
        }
      }
    },
    { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
  );
  root.querySelectorAll('section[id]').forEach((s) => io.observe(s));
  return () => io.disconnect();
}
