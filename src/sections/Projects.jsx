import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { projects, projectFilters } from '../content/site';
import SectionHead from '../components/SectionHead';
import SplitText from '../components/SplitText';

const ease = [0.22, 1, 0.36, 1];
const pad = (n) => String(n).padStart(2, '0');

function Visual({ p, n }) {
  if (p.image) return <img className="case-img" src={p.image} alt={`${p.title} preview`} loading="lazy" decoding="async" />;
  return (
    <div className="case-art" style={{ '--h': p.hue }} aria-hidden="true">
      <span className="case-art-num serif">{pad(n)}</span>
      <span className="case-art-title">{p.title}</span>
      <span className="case-art-cat mono">{p.category}</span>
    </div>
  );
}

function Links({ p }) {
  return (
    <div className="case-links">
      {p.github && <a href={p.github} target="_blank" rel="noreferrer" className="link" data-umami-event="project-github" data-umami-event-project={p.id}>GitHub ↗</a>}
      {p.live && <a href={p.live} target="_blank" rel="noreferrer" className="link" data-umami-event="project-live" data-umami-event-project={p.id}>Live demo ↗</a>}
      {!p.github && !p.live && <span className="muted small">Private build — happy to walk through it</span>}
    </div>
  );
}

function Featured({ p, n }) {
  return (
    <motion.article
      key={p.id}
      className="case-featured"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.45, ease }}
    >
      <a className="case-visual" href={p.github || p.live || undefined} target="_blank" rel="noreferrer" aria-label={`Open ${p.title}`}>
        <Visual p={p} n={n} />
      </a>
      <div className="case-body">
        <span className="mono muted">Featured · Project {pad(n)}</span>
        <h3 className="case-title">{p.title}</h3>
        <p className="case-summary">{p.summary}</p>
        <ul className="case-points">{p.points.map((x) => <li key={x}>{x}</li>)}</ul>
        <dl className="case-meta">
          <div><dt className="mono">Year</dt><dd>{p.year}</dd></div>
          <div><dt className="mono">Type</dt><dd>{p.category}</dd></div>
          <div className="case-meta-wide"><dt className="mono">Stack</dt><dd>{p.tags.join(' · ')}</dd></div>
        </dl>
        <Links p={p} />
      </div>
    </motion.article>
  );
}

function Row({ p, n, open, onToggle }) {
  return (
    <li className={`case-row ${open ? 'is-open' : ''}`}>
      <button className="case-row-head" onClick={onToggle} aria-expanded={open}>
        <span className="mono muted">{pad(n)}</span>
        <span className="case-row-title">{p.title}</span>
        <span className="case-row-cat muted">{p.category}</span>
        <span className="case-row-year mono muted">{p.year}</span>
        <span className="case-row-icon" aria-hidden="true">{open ? '−' : '+'}</span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className="case-row-body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease }}
          >
            <div className="case-row-inner">
              <p>{p.summary}</p>
              <ul className="case-points">{p.points.map((x) => <li key={x}>{x}</li>)}</ul>
              <ul className="tags">{p.tags.map((t) => <li key={t} className="tag">{t}</li>)}</ul>
              <Links p={p} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState('All');
  const [openId, setOpenId] = useState(null);
  const list = useMemo(
    () => (filter === 'All' ? projects : projects.filter((p) => p.filters?.includes(filter))),
    [filter]
  );
  const [featured, ...rest] = list;
  const num = (p) => projects.indexOf(p) + 1;

  return (
    <section id="work" className="section work">
      <div className="container">
        <SectionHead num={3} label="Selected Work" />
        <h2 className="h2" data-reveal>
          <SplitText text="Selected projects." /> <span className="muted"><SplitText text="Real problems." start={2} /></span>
        </h2>

        <div className="filters" role="tablist" aria-label="Filter projects" data-reveal>
          {projectFilters.map((f) => (
            <button
              key={f}
              role="tab"
              aria-selected={filter === f}
              className={`filter ${filter === f ? 'is-on' : ''}`}
              onClick={() => { setFilter(f); setOpenId(null); }}
            >
              {filter === f && <motion.span layoutId="filter-pill" className="filter-pill" transition={{ duration: 0.35, ease }} />}
              <span>{f}</span>
              <span className="filter-count mono">{f === 'All' ? projects.length : projects.filter((p) => p.filters?.includes(f)).length}</span>
            </button>
          ))}
        </div>

        <div className="case-wrap" data-reveal>
          <AnimatePresence mode="wait">
            {featured && <Featured key={featured.id} p={featured} n={num(featured)} />}
          </AnimatePresence>
        </div>

        {rest.length > 0 && (
          <>
            <p className="mono muted more-label" data-reveal>· More projects</p>
            <ul className="case-list" data-reveal>
              {rest.map((p) => (
                <Row key={p.id} p={p} n={num(p)} open={openId === p.id} onToggle={() => setOpenId(openId === p.id ? null : p.id)} />
              ))}
            </ul>
          </>
        )}
      </div>
    </section>
  );
}
