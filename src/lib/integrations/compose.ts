/**
 * Turn a lead's label/value rows into the body a provider will show.
 *
 * The rows carry Hebrew labels because that is what the studio reads; the
 * escaping below is the same rule the old mail route used.
 */

/** Markdown, for providers that render it (ClickUp's `markdown_content`). */
export function rowsToMarkdown(rows: [string, string][]): string {
  return rows.map(([label, value]) => `**${label}:** ${value}`).join('\n\n')
}

/** Plain text, for logs and for providers that take no markup. */
export function rowsToText(rows: [string, string][]): string {
  return rows.map(([label, value]) => `${label}: ${value}`).join('\n')
}

export const escapeHtml = (s: string) =>
  s.replace(/[<>&]/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' })[c]!)
