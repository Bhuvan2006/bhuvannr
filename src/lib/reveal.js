/* One IntersectionObserver for every [data-reveal] element on the page.
   Elements get .is-in once and the CSS handles the motion (transform/opacity only),
   which keeps scrolling smooth — no per-element scroll listeners. */
let io = null;
const seen = new WeakSet();

function observer() {
  if (io) return io;
  io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      }
    },
    { rootMargin: '0px 0px -6% 0px', threshold: 0 }
  );
  return io;
}

export function scanReveals(root = document) {
  const o = observer();
  root.querySelectorAll('[data-reveal]').forEach((el) => {
    if (seen.has(el)) return;
    seen.add(el);
    o.observe(el);
  });
}

/** Watch a container for new content (route changes, lazy pages) and register reveals. */
export function watchReveals(container) {
  scanReveals(container);
  const mo = new MutationObserver(() => scanReveals(container));
  mo.observe(container, { childList: true, subtree: true });
  return () => mo.disconnect();
}
