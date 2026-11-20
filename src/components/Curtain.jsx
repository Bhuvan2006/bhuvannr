import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { scrollToId, prefersReducedMotion, store } from '../lib/scroll';
import { navigate } from '../lib/router';

let el = null;
let busy = false;
const frames = (n = 2) => new Promise((r) => { const s = (i) => (i ? requestAnimationFrame(() => s(i - 1)) : r()); s(n); });

/** Short fade-through-black between routes. */
function cover(mid) {
  if (!el || busy || prefersReducedMotion()) { mid(); return; }
  busy = true;
  const tl = gsap.timeline({ onComplete: () => { busy = false; } });
  tl.set(el, { display: 'block', opacity: 0 })
    .to(el, { opacity: 1, duration: 0.28, ease: 'power2.in' })
    .add(() => { tl.pause(); Promise.resolve(mid()).then(() => tl.play()); })
    .to(el, { opacity: 0, duration: 0.45, ease: 'power2.out' }, '+=0.05')
    .set(el, { display: 'none' });
}

const jump = (id) => scrollToId(id, { immediate: true, force: true });

export function transitionTo(id) {
  if (window.location.pathname !== '/') { transitionRoute('/', id); return; }
  scrollToId(id);
}

export function transitionRoute(path, id = null) {
  cover(async () => {
    navigate(path);
    await frames(3);
    store.lenis?.resize();
    ScrollTrigger.refresh();
    if (id) jump(id);
    else if (store.lenis) store.lenis.scrollTo(0, { immediate: true, force: true });
    else window.scrollTo(0, 0);
    await frames(1);
  });
}

export default function Curtain() {
  const ref = useRef(null);
  useEffect(() => { el = ref.current; return () => { el = null; }; }, []);
  return <div ref={ref} className="curtain" aria-hidden="true" />;
}
