/* ------------------------------------------------------------------
   BLOG — add a post by dropping a file into src/content/blog/
   • .tex  (Overleaf): \title{…} \date{…} and optional \begin{abstract}
   • .md   front-matter:
       ---
       title: My post
       date: November 18, 2026
       excerpt: One-line summary
       tags: AI, RAG
       ---
   Images: put them in public/blog/images/ and reference by file name
   (\includegraphics{cnn.png}) or /blog/images/cnn.png in markdown.
------------------------------------------------------------------- */

const files = import.meta.glob('/src/content/blog/*.{md,tex}', {
  eager: true,
  query: '?raw',
  import: 'default',
});

const stripTex = (s) =>
  s
    .replace(/\$[^$]*\$/g, '')
    .replace(/\\[a-zA-Z]+\*?(\[[^\]]*\])?(\{[^}]*\})?/g, ' ')
    .replace(/[{}%~]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

function parseTex(raw) {
  const meta = {};
  const t = raw.match(/\\title\{([^}]+)\}/);
  if (t) meta.title = t[1].trim();
  const d = raw.match(/\\date\{([^}]+)\}/);
  if (d) meta.date = d[1].trim();
  const a = raw.match(/\\begin\{abstract\}([\s\S]*?)\\end\{abstract\}/);
  const body = raw.split('\\begin{document}')[1] || raw;
  meta.excerpt = stripTex(a ? a[1] : body.replace(/\\(section|subsection)\*?\{[^}]*\}/g, '')).slice(0, 220);
  meta.text = stripTex(body);
  return meta;
}

function parseMd(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  const meta = {};
  let content = raw;
  if (m) {
    m[1].split('\n').forEach((line) => {
      const i = line.indexOf(':');
      if (i > -1) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^["']|["']$/g, '');
    });
    content = m[2].trim();
  }
  meta.content = content;
  meta.text = content.replace(/[#>*_`[\]()-]/g, ' ');
  if (!meta.excerpt) meta.excerpt = meta.text.replace(/\s+/g, ' ').trim().slice(0, 220);
  return meta;
}

const fixDate = (d) => d.replace(/,(\d)/, ', $1');

const posts = Object.entries(files)
  .map(([path, raw]) => {
    const isLatex = path.endsWith('.tex');
    const slug = path.split('/').pop().replace(/\.(md|tex)$/, '');
    const meta = isLatex ? parseTex(raw) : parseMd(raw);
    const words = (meta.text || '').split(/\s+/).filter(Boolean).length;
    const date = fixDate(meta.date || '');
    return {
      slug,
      title: meta.title || slug,
      date,
      time: Date.parse(date) || 0,
      excerpt: meta.excerpt ? meta.excerpt + (meta.excerpt.length >= 220 ? '…' : '') : '',
      readTime: `${Math.max(1, Math.round(words / 200))} min read`,
      tags: meta.tags ? meta.tags.split(',').map((t) => t.trim()) : [],
      raw: isLatex ? raw : meta.content,
      isLatex,
    };
  })
  .sort((a, b) => b.time - a.time);

export const getAllPosts = () => posts;
export const getPostBySlug = (slug) => posts.find((p) => p.slug === slug);
