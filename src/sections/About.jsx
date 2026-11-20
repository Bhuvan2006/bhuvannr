import { useEffect, useRef } from 'react';
import { gsap, prefersReducedMotion } from '../lib/scroll';
import { about, profile, socials } from '../content/site';
import { useClock } from '../hooks/useClock';
import SectionHead from '../components/SectionHead';
import SplitText from '../components/SplitText';

export default function About() {
  const root = useRef(null);
  const time = useClock(profile.timezone);

  // Statement lights up word by word while it crosses the viewport (single scrubbed tween).
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.about-statement .split-unit', { opacity: 0.18 }, {
        opacity: 1, stagger: 0.04, ease: 'none',
        scrollTrigger: { trigger: '.about-statement', start: 'top 82%', end: 'bottom 50%', scrub: 0.3 },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const details = [
    { k: 'Based in', v: `🇮🇳 ${profile.location}` },
    { k: 'Local time', v: `${time} IST` },
    { k: 'Status', v: profile.status },
    ...about.facts.filter((f) => f.label !== 'Based in'),
  ];

  return (
    <section id="about" className="section about" ref={root}>
      <div className="container">
        <SectionHead num={2} label="About me" />
        <div className="about-grid">
          <aside className="about-side">
            <dl className="details">
              {details.map((d, i) => (
                <div key={d.k || d.label} className="detail" data-reveal style={{ '--d': `${i * 0.05}s` }}>
                  <dt className="mono">{d.k || d.label}</dt>
                  <dd>{d.v || d.value}</dd>
                </div>
              ))}
            </dl>
            <div className="about-btns" data-reveal>
              <a className="btn btn--solid" href={profile.resume} target="_blank" rel="noreferrer" data-umami-event="resume-download" data-umami-event-from="about">Download Resume ↗</a>
              <a className="btn" href={socials[0].href} target="_blank" rel="noreferrer" data-umami-event="github-profile">GitHub ↗</a>
            </div>
          </aside>
          <div className="about-main">
            <SplitText as="p" className="about-statement" text={about.statement} />
            <div className="about-paras">
              {about.paragraphs.map((p, i) => (
                <p key={i} className="muted" data-reveal style={{ '--d': `${i * 0.08}s` }}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
