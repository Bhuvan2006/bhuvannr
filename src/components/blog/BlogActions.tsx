import { useState, useEffect } from 'react';
import { Heart, Share2, Twitter, Linkedin, Link as LinkIcon, Facebook } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

interface BlogActionsProps {
  slug: string;
  title: string;
}

export default function BlogActions({ slug, title }: BlogActionsProps) {
  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [liking, setLiking] = useState(false);
  const [showShare, setShowShare] = useState(false);

  useEffect(() => {
    const likedPosts = JSON.parse(localStorage.getItem('liked_posts') || '[]');
    setLiked(likedPosts.includes(slug));

    supabase
      .from('blog_likes')
      .select('id', { count: 'exact', head: true })
      .eq('post_slug', slug)
      .then(({ count }) => setLikeCount(count || 0));
  }, [slug]);

  const handleLike = async () => {
    if (liked || liking) return;
    setLiking(true);
    const { error } = await supabase.from('blog_likes').insert({ post_slug: slug });
    if (!error) {
      setLiked(true);
      setLikeCount((c) => c + 1);
      const likedPosts = JSON.parse(localStorage.getItem('liked_posts') || '[]');
      localStorage.setItem('liked_posts', JSON.stringify([...likedPosts, slug]));
    }
    setLiking(false);
  };

  const url = typeof window !== 'undefined' ? window.location.href : '';

  const shareLinks = [
    { icon: Twitter, label: 'Twitter', href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}` },
    { icon: Facebook, label: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` },
    { icon: Linkedin, label: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}` },
  ];

  const copyLink = () => {
    navigator.clipboard.writeText(url);
    toast.success('Link copied!');
  };

  return (
    <div className="flex items-center gap-6 py-6 border-t border-b border-border my-10">
      <button
        onClick={handleLike}
        disabled={liked || liking}
        className={`flex items-center gap-2 text-sm transition-colors duration-200 ${
          liked ? 'text-red-500' : 'text-muted-foreground hover:text-red-500'
        } disabled:cursor-not-allowed`}
      >
        <motion.div whileTap={{ scale: 1.3 }} transition={{ type: 'spring', stiffness: 400 }}>
          <Heart className={`h-5 w-5 ${liked ? 'fill-current' : ''}`} />
        </motion.div>
        <span>{likeCount}</span>
      </button>

      <div className="relative">
        <button
          onClick={() => setShowShare(!showShare)}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
        >
          <Share2 className="h-5 w-5" />
          <span>Share</span>
        </button>

        <AnimatePresence>
          {showShare && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="absolute left-0 top-10 z-10 flex gap-2 rounded-lg border border-border bg-background p-2 shadow-lg"
            >
              {shareLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md p-2 text-muted-foreground hover:bg-secondary hover:text-primary transition-colors"
                  title={label}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
              <button
                onClick={copyLink}
                className="rounded-md p-2 text-muted-foreground hover:bg-secondary hover:text-primary transition-colors"
                title="Copy link"
              >
                <LinkIcon className="h-4 w-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
