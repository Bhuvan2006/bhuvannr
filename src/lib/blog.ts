export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  readTime: string;
  content: string;
  isLatex?: boolean;
}

function parseLatexMeta(raw: string): { meta: Record<string, string>; content: string } {
  const meta: Record<string, string> = {};

  const titleMatch = raw.match(/\\title\{([^}]+)\}/);
  if (titleMatch) meta.title = titleMatch[1].trim();

  const dateMatch = raw.match(/\\date\{([^}]+)\}/);
  if (dateMatch) meta.date = dateMatch[1].trim();

  // Attempt to grab an abstract for the excerpt
  const abstractMatch = raw.match(/\\begin\{abstract\}([\s\S]*?)\\end\{abstract\}/);
  if (abstractMatch) meta.excerpt = abstractMatch[1].trim();

  return { meta, content: raw };
}

function parseFrontmatter(raw: string): { meta: Record<string, string>; content: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { meta: {}, content: raw };

  const meta: Record<string, string> = {};
  match[1].split('\n').forEach((line) => {
    const idx = line.indexOf(':');
    if (idx === -1) return;
    const key = line.slice(0, idx).trim();
    const val = line.slice(idx + 1).trim().replace(/^["']|["']$/g, '');
    meta[key] = val;
  });

  return { meta, content: match[2].trim() };
}

const files = import.meta.glob('/src/content/blog/*.{md,tex}', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

const posts: BlogPost[] = Object.entries(files)
  .map(([path, raw]) => {
    const isLatex = path.endsWith('.tex');
    const slug = path.split('/').pop()!.replace(/\.(md|tex)$/, '');
    const { meta, content } = isLatex ? parseLatexMeta(raw) : parseFrontmatter(raw);
    return {
      slug,
      title: meta.title || slug,
      date: meta.date || '',
      excerpt: meta.excerpt || '',
      readTime: meta.readTime || '',
      content,
      isLatex,
    };
  })
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export function getAllPosts(): BlogPost[] {
  return posts;
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}
