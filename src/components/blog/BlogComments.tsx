import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';

interface Comment {
  id: string;
  author_name: string;
  content: string;
  created_at: string;
}

export default function BlogComments({ slug }: { slug: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchComments = async () => {
    const { data } = await supabase
      .from('blog_comments')
      .select('*')
      .eq('post_slug', slug)
      .order('created_at', { ascending: false });
    if (data) setComments(data);
  };

  useEffect(() => {
    fetchComments();
  }, [slug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !content.trim()) return;

    setSubmitting(true);
    const { error } = await supabase.from('blog_comments').insert({
      post_slug: slug,
      author_name: name.trim(),
      content: content.trim(),
    });

    if (error) {
      toast.error('Failed to post comment.');
    } else {
      toast.success('Comment posted!');
      setName('');
      setContent('');
      fetchComments();
    }
    setSubmitting(false);
  };

  const timeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'just now';
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    return `${days}d ago`;
  };

  return (
    <div className="mt-12">
      <h2 className="font-display text-xl font-semibold mb-6 flex items-center gap-2">
        <MessageSquare className="h-5 w-5" />
        Comments ({comments.length})
      </h2>

      <form onSubmit={handleSubmit} className="mb-10 space-y-4 rounded-lg border border-border p-5 bg-secondary/30">
        <Input
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="bg-background"
        />
        <Textarea
          placeholder="Write a comment..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={3}
          className="bg-background"
        />
        <Button type="submit" disabled={submitting} size="sm">
          {submitting ? 'Posting...' : 'Post Comment'}
        </Button>
      </form>

      <div className="space-y-6">
        {comments.map((comment, i) => (
          <motion.div
            key={comment.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="border-l-2 border-primary/30 pl-4"
          >
            <div className="flex items-baseline gap-2 mb-1">
              <span className="font-medium text-sm">{comment.author_name}</span>
              <span className="text-xs text-muted-foreground">{timeAgo(comment.created_at)}</span>
            </div>
            <p className="text-sm text-foreground/80 leading-relaxed">{comment.content}</p>
          </motion.div>
        ))}
        {comments.length === 0 && (
          <p className="text-sm text-muted-foreground">No comments yet. Be the first!</p>
        )}
      </div>
    </div>
  );
}
