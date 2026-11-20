import { getAllPosts } from '../lib/blog';
import Link from '../components/Link';
import SplitText from '../components/SplitText';
import SectionHead from '../components/SectionHead';

export default function Writing() {
  const posts = getAllPosts().slice(0, 3);

  if (!posts.length) return null;

  return (
    <section id="writing" className="section wr">
      <div className="container">
        <SectionHead num={7} label="Writing" />
        <div className="wr-head" data-reveal>
          <h2 className="h2">
            <SplitText text="Notes &" /> <span className="muted"><SplitText text="thoughts." start={2} /></span>
          </h2>
          <Link to="/blog" className="link">All posts →</Link>
        </div>
        <ul className="wr-list" data-reveal>
          {posts.map((p, i) => (
            <li key={p.slug} className="wr-row">
              <Link to={`/blog/${p.slug}`} className="wr-link">
                <span className="wr-num mono muted">0{i + 1}</span>
                <span className="wr-name">{p.title}</span>
                <span className="wr-date muted">{p.date}</span>
                <span className="wr-time muted">{p.readTime}</span>
                <span className="wr-arrow">↗</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
