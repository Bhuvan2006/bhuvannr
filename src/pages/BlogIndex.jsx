import { useEffect } from 'react';
import { getAllPosts } from '../lib/blog';
import Link from '../components/Link';
import SplitText from '../components/SplitText';

export default function BlogIndex() {
  const posts = getAllPosts();
  useEffect(() => {
    document.title = 'Blog — Bhuvan N.R';
    return () => { document.title = 'Bhuvan N.R — AI/ML Developer'; };
  }, []);

  return (
    <div className="page blog">
      <div className="container">
        <p className="mono muted" data-reveal>№ Blog</p>
        <h1 className="page-title" data-reveal>
          <SplitText text="Thoughts &" /> <span className="muted"><SplitText text="Writing" start={2} /></span>
        </h1>
        <p className="page-sub muted" data-reveal>My latest technical articles, tutorials, and personal thoughts.</p>
        {posts.length ? (
          <div className="post-grid">
            {posts.map((p, i) => (
              <article key={p.slug} className={`post-card ${i === 0 ? 'post-card--lead' : ''}`} data-reveal style={{ '--d': `${Math.min(i, 3) * 0.06}s` }}>
                <Link to={`/blog/${p.slug}`} className="post-card-link">
                  <div className="post-meta mono"><span>{p.date}</span><span>·</span><span>{p.readTime}</span></div>
                  <h2 className="post-card-title">{p.title}</h2>
                  <p className="post-card-excerpt muted">{p.excerpt}</p>
                  <span className="link">Read article →</span>
                </Link>
              </article>
            ))}
          </div>
        ) : <p className="muted">No articles yet. Check back soon!</p>}
      </div>
    </div>
  );
}
