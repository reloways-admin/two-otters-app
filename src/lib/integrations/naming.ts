/**
 * How a logical name becomes an environment variable.
 *
 * A form spec says `template: 'audit-confirm'` and never learns whether that
 * ends up as a Brevo template id, a Brevo list id or something else entirely —
 * each adapter resolves the same logical name through its own prefix.
 */

const toEnvSuffix = (name: string) => name.replace(/[^a-z0-9]+/gi, '_').toUpperCase()

/** 'audit-confirm' -> 'MAIL_TEMPLATE_AUDIT_CONFIRM' */
export const templateEnvKey = (name: string) => `MAIL_TEMPLATE_${toEnvSuffix(name)}`

/** 'audit-confirm' -> 'MAIL_LIST_AUDIT_CONFIRM' */
export const listEnvKey = (name: string) => `MAIL_LIST_${toEnvSuffix(name)}`

/** 'marketingOptIn' -> 'CLICKUP_FIELD_MARKETING_OPT_IN' */
export const clickUpFieldEnvKey = (field: string) =>
  `CLICKUP_FIELD_${field.replace(/([a-z0-9])([A-Z])/g, '$1_$2').replace(/[^a-z0-9]+/gi, '_').toUpperCase()}`
