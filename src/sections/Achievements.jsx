import { achievements } from '../content/site';
import SectionHead from '../components/SectionHead';
import SplitText from '../components/SplitText';

export default function Achievements() {
  const [top, ...rest] = achievements;
  const Tag = top.href ? 'a' : 'div';
  return (
    <section id="achievements" className="section ach">
      <div className="container">
        <SectionHead num={6} label="Achievements" />
        <h2 className="h2" data-reveal>
          <SplitText text="Milestones" /> <span className="muted"><SplitText text="& certifications." start={1} /></span>
        </h2>
        <Tag className="ach-top" data-reveal {...(top.href ? { href: top.href, target: '_blank', rel: 'noreferrer' } : {})}>
          <span className="ach-rank serif">2<sup>nd</sup></span>
          <div>
            <span className="mono muted">{top.kind} · {top.date}</span>
            <h3>{top.title}</h3>
            <p className="muted">{top.issuer} — {top.detail}</p>
          </div>
          {top.href && <span className="link ach-link">View project ↗</span>}
        </Tag>
        <ul className="ach-list">
          {rest.map((a, i) => (
            <li key={a.title} className="ach-row" data-reveal style={{ '--d': `${i * 0.05}s` }}>
              <span className="mono muted">{String(i + 2).padStart(2, '0')}</span>
              <span className="ach-name">{a.title}</span>
              <span className="muted">{a.issuer}</span>
              <span className="mono muted ach-date">{a.date}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
