import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { contact, profile, socials } from '../content/site';
import Magnetic from '../components/Magnetic';
import SplitText from '../components/SplitText';
import { PREFILL, takePendingPrefill } from '../lib/contactBus';
import { features } from '../content/site';
import { track } from '../lib/analytics';
import SectionHead from '../components/SectionHead';

const INTERESTS = ['Collaboration', 'Internship / role', ...(features.services ? ['Website project', 'Design prompt'] : []), 'Just saying hi'];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function ContactForm() {
  const [values, setValues] = useState({ name: '', email: '', interest: INTERESTS[0], message: '', _honey: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  useEffect(() => {
    const on = (e) => {
      const { interest, message } = e.detail || {};
      setStatus('idle');
      setValues((v) => ({ ...v, interest: interest || v.interest, message: message ?? v.message }));
    };
    const early = takePendingPrefill();
    if (early) on({ detail: early });
    window.addEventListener(PREFILL, on);
    return () => window.removeEventListener(PREFILL, on);
  }, []);

  const set = (k) => (e) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const validate = () => {
    const er = {};
    if (values.name.trim().length < 2) er.name = 'Please share your name.';
    if (!EMAIL_RE.test(values.email.trim())) er.email = 'That email doesn’t look right.';
    if (values.message.trim().length < 10) er.message = 'A little more detail, please (10+ characters).';
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;
    if (values._honey) return; // bot
    if (!validate()) return;
    setStatus('sending');
    try {
      const res = await fetch(contact.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          interest: values.interest,
          message: values.message.trim(),
          _subject: `[${values.interest}] Portfolio message from ${values.name.trim()}`,
          _template: 'table',
          _captcha: 'false',
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus('sent');
      track('contact-sent', { interest: values.interest });
      setValues({ name: '', email: '', interest: INTERESTS[0], message: '', _honey: '' });
    } catch (err) {
      setStatus('error');
      track('contact-error');
    }
  };

  const mailto = `mailto:${profile.email}?subject=${encodeURIComponent('Hello Bhuvan')}&body=${encodeURIComponent(values.message)}`;

  return (
    <form className="form" onSubmit={submit} noValidate>
      <AnimatePresence mode="wait">
        {status === 'sent' ? (
          <motion.div
            key="sent"
            className="form-done"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            role="status"
          >
            <span className="form-done-mark">✦</span>
            <h3>Message sent.</h3>
            <p className="muted">Thanks for reaching out — I’ll get back to you soon.</p>
            <button type="button" className="link" onClick={() => setStatus('idle')}>Send another ↺</button>
          </motion.div>
        ) : (
          <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -10 }}>
            <div className="form-row">
              <Field label="Your name" id="name" error={errors.name}>
                <input id="name" name="name" autoComplete="name" value={values.name} onChange={set('name')} placeholder="Jane Doe" aria-invalid={!!errors.name} />
              </Field>
              <Field label="Email" id="email" error={errors.email}>
                <input id="email" name="email" type="email" autoComplete="email" value={values.email} onChange={set('email')} placeholder="jane@company.com" aria-invalid={!!errors.email} />
              </Field>
            </div>
            <div className="field">
              <span className="field-label" id="interest-label">I’m interested in</span>
              <div className="chips chips--small" role="radiogroup" aria-labelledby="interest-label">
                {INTERESTS.map((it) => (
                  <button
                    type="button"
                    key={it}
                    role="radio"
                    aria-checked={values.interest === it}
                    className={`chip ${values.interest === it ? 'is-on' : ''}`}
                    onClick={() => setValues((v) => ({ ...v, interest: it }))}
                  >
                    <span className="chip-text">{it}</span>
                  </button>
                ))}
              </div>
            </div>
            <Field label="Tell me about your idea" id="message" error={errors.message}>
              <textarea id="message" name="message" rows={4} value={values.message} onChange={set('message')} placeholder="I'd love to build…" aria-invalid={!!errors.message} />
            </Field>
            <input className="hp" tabIndex={-1} autoComplete="off" value={values._honey} onChange={set('_honey')} aria-hidden="true" />
            <div className="form-foot">
              <Magnetic strength={0.3}>
                <button type="submit" className="btn btn--solid" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Sending…' : 'Send message →'}
                </button>
              </Magnetic>
              {status === 'error' && (
                <p className="form-error" role="alert">
                  Couldn’t send right now. <a href={mailto}>Email me directly</a> instead.
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}

function Field({ label, id, error, children }) {
  return (
    <div className={`field ${error ? 'has-error' : ''}`}>
      <label htmlFor={id}>{label}</label>
      {children}
      <span className="field-line" />
      <AnimatePresence>
        {error && (
          <motion.span className="field-error" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

const PROMPTS = ['Have an opportunity?', 'Project in mind?', 'Have a role for me?'];

function Rotator() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % PROMPTS.length), 2600);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="rotator">
      <AnimatePresence mode="wait">
        <motion.span
          key={i}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          {PROMPTS[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(profile.email); setCopied(true); setTimeout(() => setCopied(false), 1800); }
    catch { window.location.href = `mailto:${profile.email}`; }
  };

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <SectionHead num={8} label="Contact" />
        <p className="contact-eyebrow" data-reveal><Rotator /></p>
        <h2 className="contact-heading" data-reveal>
          <SplitText text={contact.heading[0]} />{' '}
          <span className="muted"><SplitText text={contact.heading[1]} start={2} /></span>{' '}
          <SplitText text={contact.heading[2]} start={3} />
        </h2>

        <div className="contact-grid">
          <div className="contact-side" data-reveal>
            <p className="muted contact-lead">
              Every good product starts with a conversation — an internship, a research role, or a website
              you need built.
            </p>
            <Magnetic strength={0.2}>
              <a className="btn btn--solid btn--lg" data-umami-event="email-click" href={`mailto:${profile.email}?subject=${encodeURIComponent('Hello Bhuvan')}`}>Let’s talk →</a>
            </Magnetic>
            <div className="contact-email">
              <span className="mono muted">Or email</span>
              <button type="button" onClick={copy} className="contact-email-btn">
                {profile.email}
                <span className="mono muted small">{copied ? 'Copied ✓' : 'Click to copy'}</span>
              </button>
            </div>
            <div>
              <p className="mono muted more-label">· Elsewhere</p>
              <ul className="contact-socials">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noreferrer">
                      <span>{s.label}</span><span className="muted">{s.handle}</span><span>↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div data-reveal style={{ '--d': '0.1s' }}><ContactForm /></div>
        </div>
      </div>
    </section>
  );
}
