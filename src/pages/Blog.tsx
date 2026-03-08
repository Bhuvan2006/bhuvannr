import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { ArrowRight } from 'lucide-react';

export default function Blog() {
  const { data: posts, isLoading } = useQuery({
    queryKey: ['blog-posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Blog</h1>
          <p className="text-muted-foreground text-lg">Thoughts, tutorials, and insights.</p>
        </motion.div>

        {isLoading ? (
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 rounded-lg bg-secondary/50 animate-pulse" />
            ))}
          </div>
        ) : posts && posts.length > 0 ? (
          <div className="space-y-8">
            {posts.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link to={`/blog/${post.slug}`} className="group block p-6 -mx-6 rounded-lg hover:bg-secondary/30 transition-colors">
                  <time className="text-xs text-muted-foreground uppercase tracking-wider">
                    {format(new Date(post.created_at), 'MMMM d, yyyy')}
                  </time>
                  <h2 className="font-display text-xl font-semibold mt-2 mb-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="text-muted-foreground text-sm line-clamp-2">{post.excerpt}</p>
                  )}
                  <span className="inline-flex items-center gap-1 text-sm text-primary mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    Read more <ArrowRight className="h-3 w-3" />
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
