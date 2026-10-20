/**
 * Turn a lead's label/value rows into the body a provider will show.
 *
 * The rows carry Hebrew labels because that is what the studio reads; the
 * escaping below is the same rule the old mail route used.
 */

/**
 * Markdown, for providers that render it (ClickUp's `markdown_content`).
 *
 * A list, one line per row, rather than a paragraph each. Paragraphs made a
 * six-field enquiry tall enough that ClickUp hid everything after the third
 * field behind an "Expand" button — which reads as fields having gone missing
 * rather than a description being folded up.
 */
export function rowsToMarkdown(rows: [string, string][]): string {
  return rows.map(([label, value]) => `- **${label}:** ${value}`).join('\n')
}

/** Plain text, for logs and for providers that take no markup. */
export function rowsToText(rows: [string, string][]): string {
  return rows.map(([label, value]) => `${label}: ${value}`).join('\n')
}

export const escapeHtml = (s: string) =>
  s.replace(/[<>&]/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' })[c]!)

/** A long-form answer — what the person actually wrote, not a one-word fact. */
export interface LeadNote {
  label: string
  text: string
}

/**
 * The whole task body: scannable facts first, then the message on its own.
 *
 * Prose reads badly as the tail of a bullet next to one-word values, and a
 * paragraph someone took the trouble to write deserves to look like one. The
 * person's own line breaks are kept — they paragraphed it for a reason.
 */
export function leadToMarkdown(rows: [string, string][], note?: LeadNote): string {
  const facts = rowsToMarkdown(rows)
  const text = note?.text.trim()
  return text ? `${facts}\n\n**${note!.label}**\n\n${text}` : facts
}
