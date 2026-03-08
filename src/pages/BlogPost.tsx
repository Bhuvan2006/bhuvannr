import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { getPostBySlug } from '@/lib/blog';
import BlogActions from '@/components/blog/BlogActions';
import BlogComments from '@/components/blog/BlogComments';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

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
          <ArrowLeft className="h-4 w-4" /> Back to posts
        </Link>
        <p className="text-sm text-muted-foreground mb-3">
          {post.date} · {post.readTime}
        </p>
        <h1 className="font-display text-3xl md:text-5xl font-bold mb-10">{post.title}</h1>
        <article className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-display prose-a:text-primary prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-muted prose-pre:border prose-pre:border-border">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </article>

        <BlogActions slug={post.slug} title={post.title} />
        <BlogComments slug={post.slug} />
      </motion.div>
    </div>
  );
}
