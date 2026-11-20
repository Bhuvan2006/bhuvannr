import { createElement, Fragment } from 'react';

/** Masked word-by-word reveal. The parent element gets data-reveal; each word
    slides up with a small stagger via the --i custom property. */
export default function SplitText({ text, as = 'span', className = '', start = 0, ...rest }) {
  const words = String(text).split(' ');
  return createElement(
    as,
    { className: `split ${className}`, 'aria-label': text, ...rest },
    <span aria-hidden="true">
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="split-mask">
            <span className="split-unit" style={{ '--i': start + i }}>{w}</span>
          </span>
          {i < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </span>
  );
}
