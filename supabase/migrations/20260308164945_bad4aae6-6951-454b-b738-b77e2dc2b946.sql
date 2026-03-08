
CREATE TABLE public.blog_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_slug text NOT NULL,
  author_name text NOT NULL,
  content text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.blog_comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view comments" ON public.blog_comments
  FOR SELECT USING (true);

CREATE POLICY "Anyone can add comments" ON public.blog_comments
  FOR INSERT WITH CHECK (true);

CREATE TABLE public.blog_likes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_slug text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.blog_likes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view likes" ON public.blog_likes
  FOR SELECT USING (true);

CREATE POLICY "Anyone can add likes" ON public.blog_likes
  FOR INSERT WITH CHECK (true);
