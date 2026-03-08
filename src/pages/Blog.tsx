import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getAllPosts } from '@/lib/blog';

export default function Blog() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Posts</h1>
        </motion.div>

        {posts.length > 0 ? (
          <div className="divide-y divide-border">
            {posts.map((post, i) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="py-8 first:pt-0"
              >
                <Link to={`/blog/${post.slug}`} className="group block rounded-lg -mx-4 px-4 py-2 transition-all duration-300 hover:bg-secondary/60 hover:shadow-sm active:scale-[0.99]">
                  <h2 className="font-display text-xl md:text-2xl font-semibold mb-1 transition-colors duration-300 group-hover:text-primary">
                    {post.title}
                  </h2>
                  <p className="text-sm text-muted-foreground mb-3">
                    {post.date} · {post.readTime}
                  </p>
                  <p className="text-muted-foreground leading-relaxed">{post.excerpt}</p>
                  <span className="inline-flex items-center gap-1 text-sm text-primary mt-3 transition-transform duration-300 group-hover:translate-x-1">
                    Read more →
                  </span>
                </Link>
              </motion.article>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No articles yet. Check back soon!</p>
        )}
      </div>
    </div>
  );
}
