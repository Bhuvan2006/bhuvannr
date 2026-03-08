import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();

  const { data: post, isLoading } = useQuery({
    queryKey: ['blog-post', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug!)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-16">
        <div className="container max-w-3xl space-y-4">
          <div className="h-8 w-48 bg-secondary/50 animate-pulse rounded" />
          <div className="h-12 w-full bg-secondary/50 animate-pulse rounded" />
          <div className="h-96 w-full bg-secondary/50 animate-pulse rounded" />
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <p className="text-muted-foreground">Post not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="container max-w-3xl">
        <Link to="/blog" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to blog
        </Link>
        <time className="block text-xs text-muted-foreground uppercase tracking-wider mb-3">
          {format(new Date(post.created_at), 'MMMM d, yyyy')}
        </time>
        <h1 className="font-display text-3xl md:text-5xl font-bold mb-8">{post.title}</h1>
        <div className="prose prose-invert max-w-none text-muted-foreground leading-relaxed whitespace-pre-wrap">
          {post.content}
        </div>
      </motion.div>
    </div>
  );
}
