import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import 'katex/dist/katex.min.css';
import { getPostBySlug } from '@/lib/blog';
import { latexToHtml } from '@/lib/latex-to-html';
import BlogActions from '@/components/blog/BlogActions';
import BlogComments from '@/components/blog/BlogComments';

// Renders a LaTeX blog post by:
// Converting LaTeX commands + math to HTML via our custom converter (which calls KaTeX directly).
// Uses dangerouslySetInnerHTML because KaTeX outputs real HTML, not markdown.
function LatexRenderer({ content }: { content: string }) {
  const html = latexToHtml(content);

  return (
    <div
      className="latex-body prose prose-neutral dark:prose-invert max-w-none prose-a:text-primary"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

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
        {post.date || post.readTime ? (
          <p className="text-sm text-muted-foreground mb-3">
            {post.date}
            {post.date && post.readTime && ' · '}
            {post.readTime}
          </p>
        ) : null}
        <h1 className="font-sans text-3xl md:text-5xl font-bold mb-10 text-balance">{post.title}</h1>

        {post.isLatex ? (
          <LatexRenderer content={post.content} />
        ) : (
          <article className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-display prose-a:text-primary prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-muted prose-pre:border prose-pre:border-border">
            <ReactMarkdown
              remarkPlugins={[remarkMath]}
              rehypePlugins={[rehypeRaw, rehypeKatex]}
            >
              {post.content}
            </ReactMarkdown>
          </article>
        )}

        <BlogActions slug={post.slug} title={post.title} />
        <BlogComments slug={post.slug} />
      </motion.div>
    </div>
  );
}
