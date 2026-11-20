import { Fragment, useEffect, useRef } from 'react';
import { gsap, prefersReducedMotion } from '../lib/scroll';
import { profile } from '../content/site';
import { transitionTo } from '../components/Curtain';

/* Hero: large static name behind, background-removed portrait centred,
   headline bottom-left over the shirt (never the face), bio + links bottom-right. */
export default function Hero() {
  const root = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const st = { trigger: root.current, start: 'top top', end: 'bottom top', scrub: 0.4 };
      gsap.to('.hero-bgname-wrap', { yPercent: 25, ease: 'none', scrollTrigger: st });
      gsap.to('.hero-portrait-wrap', { yPercent: 6, ease: 'none', scrollTrigger: st });
    }, root);
    return () => ctx.revert();
  }, []);

  // Headline: split into words for the reveal; accent chunks render in italic serif.
  let i = 0;
  const headline = profile.headline.map((chunk, c) => {
    const words = chunk.t.split(' ');
    const out = words.map((w, k) => (
      <Fragment key={k}>
        <span className="split-mask">
          <span className="split-unit" style={{ '--i': i++ }}>{w}</span>
        </span>
        {k < words.length - 1 ? ' ' : null}
      </Fragment>
    ));
    return (
      <Fragment key={c}>
        {chunk.accent ? <span className="hero-accent">{out}</span> : out}
        {c < profile.headline.length - 1 ? ' ' : null}
      </Fragment>
    );
  });
  const headlineText = profile.headline.map((h) => h.t).join(' ');

  return (
    <section id="top" className="hero" ref={root}>
      <div className="hero-stage" aria-hidden="true">
        <div className="hero-bgname-wrap">
          <p className="hero-bgname">{profile.firstName}</p>
        </div>
      </div>
      <div className="hero-portrait-wrap">
        <img
          className="hero-cutout"
          src={profile.cutout}
          srcSet={`${profile.cutoutSmall} 640w, ${profile.cutout} 1155w`}
          sizes="(max-width: 820px) 100vw, 60vw"
          width={profile.cutoutSize[0]}
          height={profile.cutoutSize[1]}
          alt={`Portrait of ${profile.fullName}`}
          fetchpriority="high"
          decoding="async"
        />
      </div>
      <div className="hero-fade" aria-hidden="true" />

      <div className="container hero-content">
        <div className="hero-left">
          <span className="hero-pill mono" data-reveal style={{ '--d': '0.35s' }}>
            <span className="dot" />{profile.status}
          </span>
          <h1 className="hero-title" aria-label={headlineText} data-reveal style={{ '--d': '0.4s' }}>
            <span aria-hidden="true">{headline}</span>
          </h1>
        </div>
        <div className="hero-right" data-reveal style={{ '--d': '0.7s' }}>
          <p className="hero-bio">{profile.bio}</p>
          <div className="hero-links">
            <a href="#work" className="hero-link" onClick={(e) => { e.preventDefault(); transitionTo('work'); }}>
              See selected work <span aria-hidden="true">↓</span>
            </a>
            <a href="#contact" className="hero-link hero-link--muted" onClick={(e) => { e.preventDefault(); transitionTo('contact'); }}>
              Let’s talk <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
