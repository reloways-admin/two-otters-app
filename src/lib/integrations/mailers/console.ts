import type { AdapterOptions, Mailer, OutboundMail } from '../ports'

/** The credential-free mailer. See the console recorder for why it exists. */
export function createConsoleMailer(_options: AdapterOptions): Mailer {
  return {
    name: 'console',
    configured: () => true,

    async send(msg: OutboundMail): Promise<{ id: string }> {
      console.info(
        `\n── mail sent (console) ──\nto:       ${msg.to.email}\ntemplate: ${msg.template}\nparams:   ${JSON.stringify(msg.params)}\n─────────────────────────\n`
      )
      return { id: `console-${Date.now().toString(36)}` }
    },
  }
}
