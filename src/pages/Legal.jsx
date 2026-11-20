import { useEffect } from 'react';
import { profile, payments, services } from '../content/site';
import Link from '../components/Link';

/* Draft policies — Razorpay asks for Terms, Privacy, Refund/Cancellation,
   Delivery and Contact details before activating payments.
   Review and adjust these to your own terms; this is not legal advice. */
const UPDATED = 'November 2026';

export default function Legal() {
  useEffect(() => {
    document.title = 'Terms, privacy & refunds — Bhuvan N.R';
    return () => { document.title = 'Bhuvan N.R — AI/ML Developer'; };
  }, []);
  const price = `${services.prompt.currency}${services.prompt.price}`;
  return (
    <div className="page legal">
      <div className="container container--narrow">
        <Link to="/" className="link back">← Home</Link>
        <h1 className="post-title">Terms, privacy <span className="muted">&</span> refunds</h1>
        <p className="muted small">Last updated {UPDATED}</p>
        <div className="prose" data-reveal>
          <h2>About</h2>
          <p>This website is operated by {profile.fullName}, an individual based in {profile.location}. Contact: <a href={`mailto:${profile.email}`}>{profile.email}</a>.</p>

          <h2>Services & products</h2>
          <p><strong>Website design & development</strong> is offered on a custom-quote basis. Scope, price, timeline, payment schedule and number of revisions are agreed in writing (email) before work starts.</p>
          <p><strong>Claude design prompts</strong> are digital text products priced at {price} each. A prompt is written for the website type and description you provide at checkout.</p>

          <h2>Payments</h2>
          <p>Payments are processed securely by {payments.provider}. We never see or store your card, UPI or bank details.</p>

          <h2>Delivery</h2>
          <p>Design prompts are delivered digitally to the email address you provide; no physical goods are shipped. Website projects are delivered as agreed in the project quote (for example, a deployed site and its source files).</p>

          <h2>Cancellations & refunds</h2>
          <p><strong>Design prompts:</strong> if you have not received your prompt within 3 days of payment, or the prompt was not written for the website type you requested, email us and we will re-send, correct it, or refund you in full. Because prompts are custom digital content, refunds are not offered after correct delivery.</p>
          <p><strong>Website projects:</strong> you may cancel before work begins for a full refund of any advance. After work begins, payment covers the work completed up to cancellation, as set out in the quote.</p>
          <p>Approved refunds are returned to the original payment method within 5–7 working days.</p>

          <h2>Privacy</h2>
          <p>We collect only what you send us — your name, email, phone (if given) and project details — to reply to you and deliver your order. We do not sell or share your data, except with the payment processor and the form service that forwards messages to our inbox. Email us to have your data deleted.</p>
          <p>To understand which pages are useful, this site uses Umami, a privacy-friendly analytics tool that sets no cookies and collects no personal data — only anonymous counts such as page views, visit duration, country and device type.</p>

          <h2>Intellectual property</h2>
          <p>On full payment, you own the website built for you and may use purchased prompts for your own projects. Prompts may not be resold or redistributed as-is.</p>

          <h2>Contact</h2>
          <p>{profile.fullName} · {profile.location} · <a href={`mailto:${profile.email}`}>{profile.email}</a></p>
        </div>
      </div>
    </div>
  );
}
