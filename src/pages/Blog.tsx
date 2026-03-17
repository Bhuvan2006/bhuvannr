import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getAllPosts } from '@/lib/blog';
import { ArrowRight } from 'lucide-react';

export default function Blog() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Thoughts & Writing</h1>
          <p className="text-lg text-muted-foreground">My latest technical articles, tutorials, and personal thoughts.</p>
        </motion.div>

        {posts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group flex flex-col h-full rounded-2xl border border-border bg-card hover:bg-secondary/40 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <Link to={`/blog/${post.slug}`} className="flex flex-col flex-grow p-6 sm:p-8">
                  <div className="flex items-center gap-3 text-xs font-medium text-muted-foreground mb-4">
                    <span className="bg-secondary px-2.5 py-1 rounded-full text-foreground/80">
                      {post.date}
                    </span>
                    <span className="flex items-center">•</span>
                    <span>{post.readTime}</span>
                  </div>

                  <h2 className="font-display text-2xl font-bold mb-3 transition-colors duration-300 group-hover:text-primary line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-grow line-clamp-4 mb-6">
                    {post.excerpt}
                  </p>

                  <div className="mt-auto flex items-center gap-2 text-sm font-medium text-foreground">
                    <span className="transition-colors group-hover:text-primary">Read Article</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary" />
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 rounded-2xl border border-border bg-card/50">
            <p className="text-lg text-muted-foreground">No articles yet. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  );
}
