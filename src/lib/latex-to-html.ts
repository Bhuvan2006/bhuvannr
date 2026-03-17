/**
 * A lightweight LaTeX → HTML converter for blog post rendering.
 * Handles the common subset of Overleaf commands used in blog posts.
 * Math ($ and $$) is delegated to KaTeX via react-markdown.
 */

type Block =
    | { type: 'html'; content: string }
    | { type: 'math-block'; content: string }
    | { type: 'math-inline'; content: string };

// Strip the preamble (\documentclass … \begin{document}) and trailing \end{document}
function extractBody(tex: string): string {
    const beginDoc = tex.indexOf('\\begin{document}');
    const endDoc = tex.lastIndexOf('\\end{document}');
    if (beginDoc === -1) return tex;
    const body = endDoc === -1 ? tex.slice(beginDoc + 16) : tex.slice(beginDoc + 16, endDoc);
    return body.trim();
}

// Escape HTML special chars (except inside math)
function escapeHtml(s: string): string {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Process inline LaTeX commands within a text fragment
function processInline(s: string): string {
    // \textbf{...}
    s = s.replace(/\\textbf\{([^}]*)\}/g, '<strong>$1</strong>');
    // \textit{...} or \emph{...}
    s = s.replace(/\\textit\{([^}]*)\}/g, '<em>$1</em>');
    s = s.replace(/\\emph\{([^}]*)\}/g, '<em>$1</em>');
    // \underline{...}
    s = s.replace(/\\underline\{([^}]*)\}/g, '<u>$1</u>');
    // \href{url}{text}
    s = s.replace(/\\href\{([^}]*)\}\{([^}]*)\}/g, '<a href="$1" class="text-blue-600 underline">$2</a>');
    // \url{...}
    s = s.replace(/\\url\{([^}]*)\}/g, '<a href="$1" class="text-blue-600 underline">$1</a>');
    // \LaTeX  \TeX
    s = s.replace(/\\LaTeX\b/g, '<span>L<sup>A</sup>T<sub>E</sub>X</span>');
    s = s.replace(/\\TeX\b/g, '<span>T<sub>E</sub>X</span>');
    // em-dashes: --- and --
    s = s.replace(/---/g, '&mdash;');
    s = s.replace(/--/g, '&ndash;');
    // Escaped special chars
    s = s.replace(/\\&/g, '&amp;');
    s = s.replace(/\\\$/g, '&#36;');
    s = s.replace(/\\%/g, '%');
    s = s.replace(/\\\{/g, '{');
    s = s.replace(/\\\}/g, '}');
    s = s.replace(/\\_/g, '_');
    s = s.replace(/\\\^/g, '^');
    s = s.replace(/\\~/g, '~');
    // \maketitle → skip
    s = s.replace(/\\maketitle\b/g, '');
    // \newline or \\
    s = s.replace(/\\\\\s*/g, '<br/>');
    // Remove unknown remaining commands (e.g. \noindent, \centering, \clearpage)
    s = s.replace(/\\[a-zA-Z]+\b\*?/g, '');
    return s;
}

// Convert a LaTeX body string to an HTML string
export function latexToHtml(tex: string): string {
    const body = extractBody(tex);
    const lines = body.split('\n');
    let html = '';
    let i = 0;

    while (i < lines.length) {
        const raw = lines[i];
        const line = raw.trim();

        // ── Block math: \begin{equation} or \begin{align}
        const mathEnvMatch = line.match(/^\\begin\{(equation\*?|align\*?|gather\*?|multline\*?)\}/);
        if (mathEnvMatch) {
            const envName = mathEnvMatch[1];
            const mathLines: string[] = [];
            i++;
            while (i < lines.length && !lines[i].trim().startsWith(`\\end{${envName}}`)) {
                mathLines.push(lines[i]);
                i++;
            }
            const mathContent = mathLines.join('\n').trim();
            html += `<div class="latex-math-block my-4 overflow-x-auto text-center">$$${mathContent}$$</div>\n`;
            i++;
            continue;
        }

        // ── \[ ... \] block math
        if (line.startsWith('\\[')) {
            const mathLines: string[] = [];
            let rest = line.slice(2);
            if (rest.includes('\\]')) {
                html += `<div class="latex-math-block my-4 overflow-x-auto text-center">$$${rest.replace('\\]', '')}$$</div>\n`;
                i++; continue;
            }
            mathLines.push(rest);
            i++;
            while (i < lines.length && !lines[i].includes('\\]')) {
                mathLines.push(lines[i]);
                i++;
            }
            if (i < lines.length) mathLines.push(lines[i].replace('\\]', ''));
            html += `<div class="latex-math-block my-4 overflow-x-auto text-center">$$${mathLines.join('\n')}$$</div>\n`;
            i++;
            continue;
        }

        // ── Itemize / enumerate environments
        const listMatch = line.match(/^\\begin\{(itemize|enumerate)\}/);
        if (listMatch) {
            const tag = listMatch[1] === 'enumerate' ? 'ol' : 'ul';
            html += `<${tag} class="latex-list my-3 ml-6 ${tag === 'ol' ? 'list-decimal' : 'list-disc'}">\n`;
            i++;
            while (i < lines.length && !lines[i].trim().startsWith(`\\end{${listMatch[1]}}`)) {
                const itemLine = lines[i].trim();
                if (itemLine.startsWith('\\item')) {
                    const itemContent = processInline(escapeHtml(itemLine.replace(/^\\item\s*/, '')));
                    html += `  <li class="mb-1">${itemContent}</li>\n`;
                }
                i++;
            }
            html += `</${tag}>\n`;
            i++;
            continue;
        }

        // ── center environment
        if (line.startsWith('\\begin{center}')) {
            const centerLines: string[] = [];
            i++;
            while (i < lines.length && !lines[i].trim().startsWith('\\end{center}')) {
                centerLines.push(lines[i]);
                i++;
            }
            const inner = centerLines.map(l => processInline(escapeHtml(l.trim()))).join('<br/>');
            html += `<div class="text-center my-4">${inner}</div>\n`;
            i++;
            continue;
        }

        // ── abstract environment
        if (line.startsWith('\\begin{abstract}')) {
            const absLines: string[] = [];
            i++;
            while (i < lines.length && !lines[i].trim().startsWith('\\end{abstract}')) {
                absLines.push(lines[i]);
                i++;
            }
            const inner = absLines.map(l => processInline(escapeHtml(l.trim()))).join(' ');
            html += `<blockquote class="border-l-4 border-gray-300 pl-4 italic my-4 text-gray-600">${inner}</blockquote>\n`;
            i++;
            continue;
        }

        // ── Skip unknown \begin{...}...\end{...} blocks we can't handle
        const unknownBegin = line.match(/^\\begin\{([^}]+)\}/);
        if (unknownBegin) {
            const envName = unknownBegin[1];
            i++;
            while (i < lines.length && !lines[i].trim().startsWith(`\\end{${envName}}`)) {
                i++;
            }
            i++;
            continue;
        }

        // ── Section headings
        const sectionMatch = line.match(/^\\(section|subsection|subsubsection)\*?\{(.*)\}/);
        if (sectionMatch) {
            const level = sectionMatch[1];
            const title = processInline(escapeHtml(sectionMatch[2]));
            const tag = level === 'section' ? 'h2' : level === 'subsection' ? 'h3' : 'h4';
            const cls = level === 'section'
                ? 'text-2xl font-bold mt-8 mb-3 border-b border-gray-200 pb-1'
                : level === 'subsection'
                    ? 'text-xl font-semibold mt-6 mb-2'
                    : 'text-lg font-semibold mt-4 mb-1';
            html += `<${tag} class="${cls}">${title}</${tag}>\n`;
            i++;
            continue;
        }

        // ── \vspace{...} → spacer
        if (line.startsWith('\\vspace')) {
            html += `<div class="my-4"></div>\n`;
            i++;
            continue;
        }

        // ── \hspace, \noindent, \clearpage, \newpage, \par → skip or br
        if (/^\\(hspace|noindent|clearpage|newpage|par)\b/.test(line)) {
            i++;
            continue;
        }

        // ── Blank line → paragraph break
        if (line === '') {
            html += `</p><p class="latex-para my-3">`;
            i++;
            continue;
        }

        // ── Regular text line
        const textContent = processInline(escapeHtml(line));
        if (textContent.trim()) {
            html += textContent + ' ';
        }
        i++;
    }

    // Wrap everything in a paragraph container
    return `<p class="latex-para my-3">${html}</p>`;
}
