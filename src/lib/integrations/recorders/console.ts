import type { AdapterOptions, Lead, LeadRecorder, LeadRef, Annotation } from '../ports'
import { rowsToText } from '../compose'

/**
 * The adapter that needs no credentials.
 *
 * It exists so `npm run dev` with an empty `.env.local` still exercises every
 * form end to end — a contributor can see exactly what would have been recorded
 * without an account anywhere. The registry falls back to it outside production.
 */
export function createConsoleRecorder(_options: AdapterOptions): LeadRecorder {
  return {
    name: 'console',
    configured: () => true,

    async record(lead: Lead): Promise<LeadRef> {
      const id = `console-${Date.now().toString(36)}`
      console.info(
        [
          `\n── lead recorded (console) ──`,
          `form:  ${lead.form}`,
          `title: ${lead.title}`,
          `tags:  ${lead.tags.join(', ')}`,
          lead.dueDate ? `due:   ${new Date(lead.dueDate).toDateString()}` : null,
          rowsToText(lead.rows),
          `────────────────────────────\n`,
        ]
          .filter(Boolean)
          .join('\n')
      )
      return { id }
    },

    async annotate(ref: LeadRef, note: Annotation): Promise<void> {
      console.info(`[console recorder] ${ref.id}: ${note.tag ?? ''} ${note.comment ?? ''}`.trim())
    },
  }
}
