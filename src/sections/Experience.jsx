import { experience } from '../content/site';
import SectionHead from '../components/SectionHead';
import SplitText from '../components/SplitText';

const arrow = (s) => s.replace(/\s+—\s+/g, ' → ');

function Row({ e, i }) {
  return (
    <li className="exp-row" data-reveal style={{ '--d': `${Math.min(i, 4) * 0.05}s` }}>
      <span className="mono exp-period">{arrow(e.period)}</span>
      <div className="exp-main">
        <h3 className="exp-role">{e.role}</h3>
        <p className="exp-org"><span>{e.org}</span><span className="muted"> · {e.location}</span></p>
        <p className="muted exp-desc">{e.description}</p>
      </div>
      <span className="tag exp-type">{e.type}</span>
    </li>
  );
}

export default function Experience() {
  const work = experience.filter((e) => e.type !== 'Education');
  const edu = experience.filter((e) => e.type === 'Education');
  return (
    <section id="experience" className="section exp">
      <div className="container">
        <SectionHead num={4} label="Experience" />
        <h2 className="h2" data-reveal>
          <SplitText text="The arc of" /> <span className="muted"><SplitText text="how I got here." start={3} /></span>
        </h2>
        <ol className="exp-list">{work.map((e, i) => <Row key={e.org + e.role} e={e} i={i} />)}</ol>
        <p className="mono muted more-label" data-reveal>· Education</p>
        <ol className="exp-list">{edu.map((e, i) => <Row key={e.org} e={e} i={i} />)}</ol>
      </div>
    </section>
  );
}
