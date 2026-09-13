import type { AdapterOptions, Mailer, OutboundMail } from '../ports'
import { DeliveryError, NotConfiguredError } from '../ports'
import { templateEnvKey } from '../naming'
import { mapping } from '../config'

const ENDPOINT = 'https://api.brevo.com/v3/smtp/email'

/**
 * Brevo, sending a transactional template directly.
 *
 * We own the trigger, Brevo owns the content: the spec names a template
 * logically ('audit-confirm') and this resolves it to an id from
 * MAIL_TEMPLATE_AUDIT_CONFIRM, so switching provider is an env change.
 *
 * A 200 here means Brevo accepted the message for delivery — the strongest
 * `confirmed` signal of the two Brevo adapters.
 */
export function createBrevoTransactionalMailer({ env, config = {}, fetchImpl = fetch }: AdapterOptions): Mailer {
  const configured = () => !!(env.BREVO_API_KEY && env.BREVO_SENDER_EMAIL)

  return {
    name: 'brevo-transactional',
    configured,

    async send(msg: OutboundMail): Promise<{ id: string }> {
      if (!configured()) throw new NotConfiguredError('brevo-transactional')

      const templateId = Number(
        mapping(config, 'templates', msg.template, env[templateEnvKey(msg.template)])
      )
      if (!templateId) throw new NotConfiguredError(`brevo-transactional (${msg.template})`)

      let response: Response
      try {
        response = await fetchImpl(ENDPOINT, {
          method: 'POST',
          headers: { 'api-key': env.BREVO_API_KEY!, 'content-type': 'application/json' },
          body: JSON.stringify({
            sender: { email: env.BREVO_SENDER_EMAIL, name: env.BREVO_SENDER_NAME || undefined },
            to: [{ email: msg.to.email, name: msg.to.name }],
            templateId,
            params: msg.params,
          }),
        })
      } catch (err) {
        // No answer at all. Null status marks it retryable.
        throw new DeliveryError('brevo-transactional', null, String(err))
      }

      if (!response.ok) {
        throw new DeliveryError('brevo-transactional', response.status, await safeBody(response))
      }

      const body = (await response.json().catch(() => ({}))) as { messageId?: string }
      return { id: body.messageId ?? 'accepted' }
    },
  }
}

async function safeBody(response: Response): Promise<string> {
  return (await response.text().catch(() => '')).slice(0, 300)
}
