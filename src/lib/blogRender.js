import { marked } from 'marked';
import katex from 'katex';
import { latexToHtml } from './latex-to-html';

/* Loaded only with a blog post page, so KaTeX + marked stay out of the home bundle. */
function renderMarkdown(md) {
  // $$…$$ display and $…$ inline math → KaTeX before markdown parsing
  const withMath = md
    .replace(/\$\$([\s\S]+?)\$\$/g, (_, m) => katex.renderToString(m, { displayMode: true, throwOnError: false }))
    .replace(/(^|[^\\$])\$([^$\n]+?)\$/g, (_, pre, m) => pre + katex.renderToString(m, { throwOnError: false }));
  return marked.parse(withMath);
}

export function renderPost(post) {
  return post.isLatex ? latexToHtml(post.raw) : renderMarkdown(post.raw);
}
