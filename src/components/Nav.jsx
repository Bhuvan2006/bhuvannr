import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { visibleNav, profile, socials } from '../content/site';
import { store } from '../lib/scroll';
import { transitionTo, transitionRoute } from './Curtain';

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const last = useRef(0);

  useEffect(() => {
    let ticking = false;
    const on = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setSolid(y > 24);
        setHidden(y > last.current && y > 480);
        last.current = y;
        ticking = false;
      });
    };
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('menu-open', open);
    if (store.lenis) (open ? store.lenis.stop() : store.lenis.start());
  }, [open]);

  const go = (n) => (e) => {
    e.preventDefault();
    setOpen(false);
    const run = () => (n.route ? transitionRoute(n.route) : transitionTo(n.id));
    open ? setTimeout(run, 320) : run();
  };
  const href = (n) => n.route || `/#${n.id}`;

  return (
    <>
      <a href="#main" className="skip">Skip to content</a>
      <header className={`nav ${hidden && !open ? 'is-hidden' : ''} ${solid ? 'is-solid' : ''}`}>
        <a href="/" className="nav-mark" onClick={go({ id: 'top' })}>
          {profile.fullName}
        </a>
        <nav className="nav-links" aria-label="Primary">
          {visibleNav().map((n) => (
            <a key={n.label} href={href(n)} onClick={go(n)} className="nav-link">{n.label}</a>
          ))}
        </nav>
        <div className="nav-right">
          <a href={profile.resume} target="_blank" rel="noreferrer" className="btn btn--sm" data-umami-event="resume-download" data-umami-event-from="nav">Resume ↗</a>
          <button
            className="nav-menu"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu"
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu"
            className="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <ul>
              {visibleNav().map((n, i) => (
                <motion.li
                  key={n.label}
                  initial={{ y: 24, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.05 + i * 0.04, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <a href={href(n)} onClick={go(n)}>
                    <span className="mono">{String(i + 1).padStart(2, '0')}</span>
                    {n.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="menu-foot mono">
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
              {socials.map((s) => <a key={s.label} href={s.href} target="_blank" rel="noreferrer">{s.label} ↗</a>)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
