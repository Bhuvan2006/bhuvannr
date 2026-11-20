import { useEffect, useMemo, useRef } from 'react';
import 'katex/dist/katex.min.css';
import { getAllPosts, getPostBySlug } from '../lib/blog';
import { renderPost } from '../lib/blogRender';
import { profile } from '../content/site';
import Link from '../components/Link';

export default function BlogPost({ slug }) {
  const root = useRef(null);
  const bar = useRef(null);
  const post = getPostBySlug(slug);
  const html = useMemo(() => (post ? renderPost(post) : ''), [post]);
  const all = getAllPosts();
  const idx = post ? all.indexOf(post) : -1;
  const newer = idx > 0 ? all[idx - 1] : null;
  const older = idx >= 0 && idx < all.length - 1 ? all[idx + 1] : null;

  useEffect(() => {
    if (!post) return;
    document.title = `${post.title} — Bhuvan N.R`;
    let ticking = false;
    const update = () => {
      ticking = false;
      const el = root.current;
      if (!el || !bar.current) return;
      const r = el.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - window.innerHeight)));
      bar.current.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => { window.removeEventListener('scroll', onScroll); document.title = 'Bhuvan N.R — AI/ML Developer'; };
  }, [post]);

  if (!post) {
    return (
      <div className="page notfound">
        <div className="container">
          <h1 className="page-title">Post not <span className="muted">found.</span></h1>
          <Link to="/blog" className="link">← Back to posts</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page post" ref={root}>
      <div className="read-bar"><div ref={bar} className="read-bar-fill" /></div>
      <div className="container container--narrow">
        <header className="post-head" data-reveal>
          <Link to="/blog" className="link back">← Back to posts</Link>
          <div className="post-meta mono"><span>{post.date}</span><span>·</span><span>{post.readTime}</span></div>
          <h1 className="post-title">{post.title}</h1>
          <div className="post-author">
            <img src={profile.portraitSmall} alt="" width="40" height="50" />
            <span>{profile.fullName}<br /><span className="muted small">{profile.role}</span></span>
          </div>
        </header>
        <article className="prose" data-reveal dangerouslySetInnerHTML={{ __html: html }} />
        <nav className="post-nav" aria-label="More posts">
          {older ? (
            <Link to={`/blog/${older.slug}`} className="post-nav-link">
              <span className="muted small">← Previous</span><span>{older.title}</span>
            </Link>
          ) : <span />}
          {newer ? (
            <Link to={`/blog/${newer.slug}`} className="post-nav-link post-nav-link--next">
              <span className="muted small">Next →</span><span>{newer.title}</span>
            </Link>
          ) : <span />}
        </nav>
      </div>
    </div>
  );
}
