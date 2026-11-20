import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const store = { lenis: null };

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const isTouch = () =>
  typeof window !== 'undefined' && window.matchMedia('(hover: none), (pointer: coarse)').matches;

/** Lenis smooth scroll, driven by GSAP's ticker so ScrollTrigger stays in sync.
    Touch devices and reduced-motion users keep native scrolling. */
export function initSmoothScroll() {
  if (prefersReducedMotion() || isTouch()) return () => {};
  const lenis = new Lenis({ lerp: 0.14, wheelMultiplier: 1, smoothWheel: true });
  store.lenis = lenis;
  lenis.on('scroll', ScrollTrigger.update);
  const tick = (time) => lenis.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
  return () => {
    gsap.ticker.remove(tick);
    lenis.destroy();
    store.lenis = null;
  };
}

export function scrollToId(id, opts = {}) {
  const el = id === 'top' ? 0 : document.getElementById(id);
  if (el === null) return;
  if (store.lenis) { store.lenis.scrollTo(el, { offset: id === 'top' ? 0 : -70, duration: 1.2, ...opts }); return; }
  const y = el === 0 ? 0 : el.getBoundingClientRect().top + window.scrollY - 70;
  window.scrollTo({ top: y, behavior: opts.immediate ? 'auto' : 'smooth' });
}

export { gsap, ScrollTrigger };
