import type { ReactNode } from 'react';

/**
 * Renders one string field of the résumé.
 *
 * Two inline markers are supported:
 *   `[显示文字](https://example.com)` → an inline link (new tab; http(s)/mailto only)
 *   `□□□□`                            → a rounded M3 placeholder for redacted text
 *
 * Anything else is emitted as plain text, so the same string is still valid
 * Markdown for the export endpoint.
 */
const INLINE = /\[([^\]]+)\]\((https?:\/\/[^\s)]+|mailto:[^\s)]+)\)|(□+)/g;

export function Rich({ children }: { children: ReactNode }) {
  if (typeof children !== 'string') return <>{children}</>;

  const nodes: ReactNode[] = [];
  let cursor = 0;
  let match: RegExpExecArray | null;

  INLINE.lastIndex = 0;
  while ((match = INLINE.exec(children)) !== null) {
    if (match.index > cursor) nodes.push(children.slice(cursor, match.index));

    if (match[1] !== undefined) {
      nodes.push(
        <a
          key={`l${match.index}`}
          className="inline-link"
          href={match[2]}
          target="_blank"
          rel="noreferrer noopener"
        >
          {match[1]}
        </a>,
      );
    } else {
      nodes.push(
        <span className="redact" key={`r${match.index}`}>
          {match[3]}
        </span>,
      );
    }

    cursor = match.index + match[0].length;
  }

  if (cursor < children.length) nodes.push(children.slice(cursor));
  return <>{nodes}</>;
}
