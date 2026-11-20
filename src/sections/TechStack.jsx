import { techStack, features } from '../content/site';
import { transitionRoute } from '../components/Curtain';
import SectionHead from '../components/SectionHead';
import SplitText from '../components/SplitText';

export default function TechStack() {
  return (
    <section id="stack" className="section stack">
      <div className="container">
        <SectionHead num={5} label="Expertise" />
        <h2 className="h2" data-reveal>
          <SplitText text="What I bring" /> <span className="muted"><SplitText text="to the table." start={3} /></span>
        </h2>
        <div className="cards">
          {techStack.groups.map((g, i) => (
            <article key={g.title} className="card" data-reveal style={{ '--d': `${(i % 3) * 0.07}s` }}>
              <span className="mono muted">{String(i + 1).padStart(2, '0')}</span>
              <h3>{g.title}</h3>
              <ul className="tags">{g.items.map((t) => <li key={t} className="tag">{t}</li>)}</ul>
            </article>
          ))}
          {features.services && (
          <a
            href="/services"
            className="card card--cta"
            data-reveal
            style={{ '--d': '0.14s' }}
            onClick={(e) => { e.preventDefault(); transitionRoute('/services'); }}
          >
            <span className="mono muted">{String(techStack.groups.length + 1).padStart(2, '0')}</span>
            <h3>Websites, built with Claude</h3>
            <p className="muted">Cinematic, fast sites from first prompt to deploy — see the freelance work →</p>
          </a>
          )}
        </div>
      </div>
    </section>
  );
}
