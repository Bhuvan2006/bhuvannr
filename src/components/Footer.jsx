import { visibleNav, profile, socials } from '../content/site';
import { useClock } from '../hooks/useClock';
import { transitionTo, transitionRoute } from './Curtain';
import Link from './Link';

export default function Footer() {
  const time = useClock(profile.timezone);
  const go = (n) => (e) => { e.preventDefault(); n.route ? transitionRoute(n.route) : transitionTo(n.id); };
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-cols">
          <div>
            <p className="mono muted">Index</p>
            <ul>
              {visibleNav().map((n) => (
                <li key={n.label}><a href={n.route || `/#${n.id}`} onClick={go(n)}>{n.label}</a></li>
              ))}
              <li><a href={profile.resume} target="_blank" rel="noreferrer" data-umami-event="resume-download" data-umami-event-from="footer">Resume ↗</a></li>
            </ul>
          </div>
          <div>
            <p className="mono muted">Connect</p>
            <ul>
              {socials.map((s) => <li key={s.label}><a href={s.href} target="_blank" rel="noreferrer">{s.label} ↗</a></li>)}
              <li><a href={`mailto:${profile.email}`}>Email ↗</a></li>
            </ul>
          </div>
          <div>
            <p className="mono muted">Based in</p>
            <ul>
              <li>🇮🇳 {profile.location}</li>
              <li className="mono">{time} IST</li>
              <li><Link to="/legal">Terms & refunds</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom mono muted">
          <span>© {new Date().getFullYear()} {profile.fullName}</span>
          <span>All rights reserved</span>
        </div>
        <p className="footer-giant" aria-hidden="true">{profile.fullName.toUpperCase()}</p>
      </div>
    </footer>
  );
}
