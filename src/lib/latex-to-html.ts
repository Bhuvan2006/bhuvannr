/**
 * A lightweight LaTeX → HTML converter for blog post rendering.
 * Handles the common subset of Overleaf commands used in blog posts.
 * Math is rendered directly via KaTeX so it works inside raw HTML nodes.
 */

import katex from 'katex';

// Strip the preamble (\documentclass … \begin{document}) and trailing \end{document}
function extractBody(tex: string): string {
    const beginDoc = tex.indexOf('\\begin{document}');
    const endDoc = tex.lastIndexOf('\\end{document}');
    if (beginDoc === -1) return tex;
    const body = endDoc === -1 ? tex.slice(beginDoc + 16) : tex.slice(beginDoc + 16, endDoc);
    return body.trim();
}

// Render a math string with KaTeX, falling back to the raw source on error
function renderMath(math: string, displayMode: boolean): string {
    try {
        return katex.renderToString(math.trim(), {
            displayMode,
            throwOnError: false,
            trust: true,
            strict: false,
        });
    } catch {
        return `<code>${math}</code>`;
    }
}

// Process inline LaTeX: handles $...$ math AND text commands.
// We scan character-by-character so that math spans are kept intact
// and only the surrounding text is processed for LaTeX commands.
function processInline(s: string): string {
    let result = '';
    let j = 0;

    while (j < s.length) {
        // Detect \$ (escaped dollar — literal dollar sign)
        if (s[j] === '\\' && s[j + 1] === '$') {
            result += '&#36;';
            j += 2;
            continue;
        }

        // Detect inline math: $...$
        if (s[j] === '$' && s[j + 1] !== '$') {
            const end = s.indexOf('$', j + 1);
            if (end !== -1) {
                const mathContent = s.slice(j + 1, end);
                result += renderMath(mathContent, false);
                j = end + 1;
                continue;
            }
        }

        // Detect display math on a single line (shouldn't usually appear here, but guard):
        if (s[j] === '$' && s[j + 1] === '$') {
            const end = s.indexOf('$$', j + 2);
            if (end !== -1) {
                const mathContent = s.slice(j + 2, end);
                result += renderMath(mathContent, true);
                j = end + 2;
                continue;
            }
        }

        // Accumulate a non-math chunk
        let chunk = '';
        while (
            j < s.length &&
            !(s[j] === '$') &&
            !(s[j] === '\\' && s[j + 1] === '$')
        ) {
            chunk += s[j];
            j++;
        }

        if (chunk) {
            result += processTextChunk(chunk);
        }
    }

    return result;
}

// Process a plain-text chunk (no math delimiters inside).
function processTextChunk(s: string): string {
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
    // \includegraphics[options]{filename}
    s = s.replace(/\\includegraphics(?:\[[^\]]*\])?\{([^}]*)\}/g, (_match, file) => {
        const src = file.startsWith('http') ? file : `/blog/images/${file.replace(/^.*[/\\]/, '')}`;
        return `<img src="${src}" alt="" class="max-w-full rounded my-2" />`;
    });
    // \LaTeX  \TeX
    s = s.replace(/\\LaTeX\b/g, '<span>L<sup>A</sup>T<sub>E</sub>X</span>');
    s = s.replace(/\\TeX\b/g, '<span>T<sub>E</sub>X</span>');
    // em-dashes and en-dashes
    s = s.replace(/---/g, '&mdash;');
    s = s.replace(/--/g, '&ndash;');
    // Escaped special chars
    s = s.replace(/\\&/g, '&amp;');
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
    // Remove remaining unknown commands safely (but NOT math symbols)
    s = s.replace(/\\[a-zA-Z]+\b\*?/g, '');
    // Escape remaining < > & that aren't part of HTML tags we just generated
    s = s.replace(/&(?![a-zA-Z#\d]+;)/g, '&amp;');
    return s;
}

// Collect a multi-line block math section up to a closing pattern
function collectBlockMath(lines: string[], startIdx: number, closingFn: (l: string) => boolean): { math: string; nextIdx: number } {
    const mathLines: string[] = [];
    let i = startIdx;
    while (i < lines.length && !closingFn(lines[i])) {
        mathLines.push(lines[i]);
        i++;
    }
    return { math: mathLines.join('\n').trim(), nextIdx: i + 1 };
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

        // ── Block math: \begin{equation}, \begin{align}, \begin{gather}, etc.
        const mathEnvMatch = line.match(/^\\begin\{(equation\*?|align\*?|gather\*?|multline\*?)\}/);
        if (mathEnvMatch) {
            const envName = mathEnvMatch[1];
            const { math, nextIdx } = collectBlockMath(lines, i + 1, l => l.trim().startsWith(`\\end{${envName}}`));
            // Wrap in the environment for KaTeX
            const katexMath = `\\begin{${envName}}${math}\\end{${envName}}`;
            html += `<div class="latex-math-block my-6 overflow-x-auto text-center">${renderMath(katexMath, true)}</div>\n`;
            i = nextIdx;
            continue;
        }

        // ── \[ ... \] block math (possibly multi-line)
        if (line.startsWith('\\[')) {
            let rest = line.slice(2).trim();
            if (rest.includes('\\]')) {
                const math = rest.replace('\\]', '').trim();
                html += `<div class="latex-math-block my-6 overflow-x-auto text-center">${renderMath(math, true)}</div>\n`;
                i++;
                continue;
            }
            const mathLines: string[] = rest ? [rest] : [];
            i++;
            while (i < lines.length && !lines[i].includes('\\]')) {
                mathLines.push(lines[i]);
                i++;
            }
            if (i < lines.length) {
                mathLines.push(lines[i].replace('\\]', ''));
            }
            const math = mathLines.join('\n').trim();
            html += `<div class="latex-math-block my-6 overflow-x-auto text-center">${renderMath(math, true)}</div>\n`;
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
                    const itemContent = processInline(itemLine.replace(/^\\item\s*/, ''));
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
            const inner = centerLines.map(l => processInline(l.trim())).join('<br/>');
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
            const inner = absLines.map(l => processInline(l.trim())).join(' ');
            html += `<blockquote class="border-l-4 border-gray-300 pl-4 italic my-4 text-gray-600">${inner}</blockquote>\n`;
            i++;
            continue;
        }

        // ── figure environment
        if (line.match(/^\\begin\{figure\*?\}/)) {
            let imgSrc = '';
            let caption = '';
            i++;
            while (i < lines.length && !lines[i].trim().match(/^\\end\{figure\*?\}/)) {
                const figLine = lines[i].trim();
                const igMatch = figLine.match(/\\includegraphics(?:\[[^\]]*\])?\{([^}]*)\}/);
                if (igMatch) {
                    const file = igMatch[1];
                    imgSrc = file.startsWith('http') ? file : `/blog/images/${file.replace(/^.*[/\\]/, '')}`;
                }
                const capMatch = figLine.match(/\\caption\{([^}]*)\}/);
                if (capMatch) caption = capMatch[1];
                i++;
            }
            if (imgSrc) {
                html += `<figure class="my-6 text-center">`;
                html += `<img src="${imgSrc}" alt="${caption}" class="max-w-full mx-auto rounded shadow-md" />`;
                if (caption) html += `<figcaption class="text-sm text-gray-500 mt-2 italic">${caption}</figcaption>`;
                html += `</figure>\n`;
            }
            i++;
            continue;
        }

        // ── Standalone \includegraphics (outside a figure environment)
        const standaloneImg = line.match(/^\\includegraphics(?:\[[^\]]*\])?\{([^}]*)\}/);
        if (standaloneImg) {
            const file = standaloneImg[1];
            const src = file.startsWith('http') ? file : `/blog/images/${file.replace(/^.*[/\\]/, '')}`;
            html += `<img src="${src}" alt="" class="max-w-full mx-auto rounded shadow-md my-4 block" />\n`;
            i++;
            continue;
        }

        // ── Skip unknown \begin{...}...\end{...} blocks
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
            const title = processInline(sectionMatch[2]);
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

        // ── \hspace, \noindent, \clearpage, \newpage, \par → skip
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

        // ── Regular text line (may contain inline math $...$)
        const textContent = processInline(line);
        if (textContent.trim()) {
            html += textContent + ' ';
        }
        i++;
    }

    // Wrap everything in a paragraph container
    return `<p class="latex-para my-3">${html}</p>`;
}
