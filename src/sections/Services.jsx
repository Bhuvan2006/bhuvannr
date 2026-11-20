import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { services, payments, profile } from '../content/site';
import { prefillContact } from '../lib/contactBus';
import { transitionTo } from '../components/Curtain';
import Magnetic from '../components/Magnetic';
import SplitText from '../components/SplitText';

function Showcase({ s, i }) {
  const Wrap = s.live ? 'a' : 'div';
  return (
    <Wrap
      className="show-card"
      {...(s.live ? { href: s.live, target: '_blank', rel: 'noreferrer', } : {})}
    >
      <div className="show-frame">
        <div className="show-bar"><span /><span /><span /><em>{s.title.toLowerCase().replace(/\s+/g, '')}.site</em></div>
        <div className="show-screen">
          <img src={s.image} alt={`${s.title} — ${s.edition} homepage`} loading="lazy" decoding="async" width="1440" height="900" />
          {s.imageAlt && <img className="show-alt" src={s.imageAlt} alt="" aria-hidden="true" loading="lazy" decoding="async" width="1440" height="900" />}
        </div>
      </div>
      <div className="show-info">
        <div className="show-meta">
          <span className="show-num">0{i + 1}</span>
          <span className="tag">Built with Claude</span>
        </div>
        <h3>{s.title} <span className="muted">— {s.edition}</span></h3>
        <p className="muted">{s.summary}</p>
        <ul className="tags">{s.stack.filter((t) => t !== 'Built with Claude').map((t) => <li key={t} className="tag">{t}</li>)}</ul>
        {s.live ? <span className="link">Visit site ↗</span> : <span className="muted small">Live link coming soon</span>}
      </div>
    </Wrap>
  );
}

function PromptStore() {
  const p = services.prompt;
  const [type, setType] = useState(p.types[0]);
  const hasCheckout = Boolean(payments.promptPageUrl);

  const buy = () => {
    if (hasCheckout) {
      window.open(payments.promptPageUrl, '_blank', 'noopener');
      return;
    }
    const subject = `Design prompt request — ${type}`;
    const body = `Hi Bhuvan,\n\nI'd like a Claude design prompt (₹${p.price}).\n\nWebsite type: ${type}\nWhat I want to build:\n\n\nReference sites (optional):\n`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="store" id="prompts" data-reveal>
      <div className="store-left">
        <span className="mono muted">Prompt store</span>
        <div className="store-price">
          <span className="store-cur">{p.currency}</span>
          <span className="store-amt serif">{p.price}</span>
          <span className="muted small">per prompt</span>
        </div>
        <h3>{p.title}</h3>
        <p className="muted">{p.summary}</p>
      </div>
      <div className="store-right">
        <p className="store-label">What are you building?</p>
        <div className="chips" role="radiogroup" aria-label="Website type">
          {p.types.map((t) => (
            <button
              key={t}
              type="button"
              role="radio"
              aria-checked={type === t}
              className={`chip ${type === t ? 'is-on' : ''}`}
              onClick={() => setType(t)}
            >
              {type === t && <motion.span layoutId="chip-bg" className="chip-bg" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
              <span className="chip-text">{t}</span>
            </button>
          ))}
        </div>
        <ul className="checks">
          {p.includes.map((x) => <li key={x}>{x}</li>)}
        </ul>
        <div className="store-cta">
          <Magnetic strength={0.3}>
            <button type="button" className="btn btn--solid" onClick={buy} data-umami-event="prompt-buy-click" data-umami-event-type={type} >
              {hasCheckout ? `Buy for ${p.currency}${p.price}` : `Request for ${p.currency}${p.price}`}
            </button>
          </Magnetic>
          <p className="muted small store-note">
            {hasCheckout
              ? <>Secure checkout by {payments.provider} — UPI, cards & netbanking. Pick <strong>{type}</strong> at checkout. {p.delivery}</>
              : <>Opens an email with your choice (<strong>{type}</strong>). I’ll reply with a {payments.provider} UPI payment link; {p.delivery.toLowerCase()}</>}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  useEffect(() => {
    document.title = 'Services — Bhuvan N.R';
    return () => { document.title = 'Bhuvan N.R — AI/ML Developer'; };
  }, []);
  const quote = (pkg) => {
    prefillContact({ interest: 'Website project', message: `Hi Bhuvan — I'm interested in a ${pkg.name} website.\n\nAbout the project: ` });
    transitionTo('contact');
  };

  return (
    <section id="services" className="page svc">
      <div className="container">
        <p className="mono muted" data-reveal>№ Services</p>
        <h1 className="page-title" data-reveal>
          <SplitText text="Websites, crafted" /> <span className="muted"><SplitText text="with Claude." start={2} /></span>
        </h1>
        <p className="svc-intro muted" data-reveal>{services.intro}</p>

        <div className="shows" data-reveal>
          {services.showcase.map((s, i) => <Showcase key={s.id} s={s} i={i} />)}
        </div>

        <div className="pkgs-head" data-reveal>
          <h3 className="h3">Ways we can <span className="muted">work together</span></h3>
          <span className="tag">Quote on request</span>
        </div>
        <div className="pkgs" data-reveal>
          {services.packages.map((pkg) => (
            <article key={pkg.id} className={`pkg ${pkg.featured ? 'pkg--featured' : ''}`}>
              {pkg.featured && <span className="pkg-flag">Most requested</span>}
              <h4>{pkg.name}</h4>
              <p className="muted small">{pkg.for}</p>
              <div className="pkg-price"><span className="serif">Custom quote</span><span className="muted small">scoped to your project</span></div>
              <ul className="checks">{pkg.includes.map((x) => <li key={x}>{x}</li>)}</ul>
              <button type="button" className={`btn ${pkg.featured ? 'btn--solid' : ''}`} onClick={() => quote(pkg)} data-umami-event="quote-request" data-umami-event-package={pkg.id}>
                Request a quote
              </button>
            </article>
          ))}
        </div>

        <div className="steps" data-reveal>
          <div className="steps-line"><div className="steps-line-fill" /></div>
          {services.process.map((st, i) => (
            <div key={st.title} className="step">
              <span className="step-dot" />
              <span className="step-num serif">0{i + 1}</span>
              <h4>{st.title}</h4>
              <p className="muted small">{st.text}</p>
            </div>
          ))}
        </div>

        <PromptStore />
      </div>
    </section>
  );
}
