import type { AdapterOptions, Mailer, OutboundMail } from '../ports'
import { DeliveryError, NotConfiguredError } from '../ports'
import { listEnvKey } from '../naming'
import { mapping } from '../config'

const ENDPOINT = 'https://api.brevo.com/v3/contacts'

/**
 * Brevo, by putting the visitor into a list and letting Brevo's own automation
 * do the writing.
 *
 * The spec still names a template logically ('audit-confirm'); here that
 * resolves to a *list* id from MAIL_LIST_AUDIT_CONFIRM, and the automation
 * attached to that list sends the mail.
 *
 * Worth being clear-eyed about what success means: a 2xx proves the contact is
 * in the list, not that an email went out. If the automation is switched off in
 * Brevo, this still reports success and the visitor gets nothing — which is why
 * the transactional adapter remains the stronger `confirmed` signal.
 *
 * `updateEnabled` is on so a returning visitor updates their contact instead of
 * failing on a duplicate.
 */
export function createBrevoGroupMailer({ env, config = {}, fetchImpl = fetch }: AdapterOptions): Mailer {
  const configured = () => !!env.BREVO_API_KEY

  return {
    name: 'brevo-group',
    configured,

    async send(msg: OutboundMail): Promise<{ id: string }> {
      if (!configured()) throw new NotConfiguredError('brevo-group')

      const listId = Number(mapping(config, 'lists', msg.template, env[listEnvKey(msg.template)]))
      if (!listId) throw new NotConfiguredError(`brevo-group (${msg.template})`)

      let response: Response
      try {
        response = await fetchImpl(ENDPOINT, {
          method: 'POST',
          headers: { 'api-key': env.BREVO_API_KEY!, 'content-type': 'application/json' },
          body: JSON.stringify({
            email: msg.to.email,
            attributes: toBrevoAttributes(msg.params, msg.to.name),
            listIds: [listId],
            updateEnabled: true,
          }),
        })
      } catch (err) {
        throw new DeliveryError('brevo-group', null, String(err))
      }

      if (!response.ok) {
        throw new DeliveryError('brevo-group', response.status, await safeBody(response))
      }

      const body = (await response.json().catch(() => ({}))) as { id?: number }
      // A create returns an id; an update of an existing contact returns 204.
      return { id: body.id ? String(body.id) : msg.to.email }
    },
  }
}

/** Brevo attribute names are upper case by convention; FNAME is its own. */
function toBrevoAttributes(
  params: Record<string, unknown>,
  name?: string
): Record<string, unknown> {
  const attributes: Record<string, unknown> = {}
  if (name) attributes.FNAME = name
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) continue
    attributes[key === 'firstName' ? 'FNAME' : key.toUpperCase()] = value
  }
  return attributes
}

async function safeBody(response: Response): Promise<string> {
  return (await response.text().catch(() => '')).slice(0, 300)
}
