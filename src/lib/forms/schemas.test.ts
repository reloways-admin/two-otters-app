import { describe, it, expect } from 'vitest'
import { auditRequestSchema, contactSchema } from './schemas'

/** The first issue's message is the API error code — that is the whole contract. */
function codeFor(schema: { safeParse: (v: unknown) => { success: boolean; error?: { issues: { message: string }[] } } }, input: unknown): string | null {
  const result = schema.safeParse(input)
  return result.success ? null : result.error!.issues[0].message
}

const validAudit = {
  firstName: 'דנה',
  email: 'dana@acme.com',
  url: 'https://acme.com/pricing',
  consentReport: true,
  marketingOptIn: false,
}

describe('audit request schema', () => {
  it('accepts a complete submission from a company address', () => {
    expect(auditRequestSchema.safeParse(validAudit).success).toBe(true)
  })

  it('derives the host from whatever the visitor pasted', () => {
    const parsed = auditRequestSchema.parse({ ...validAudit, url: 'WWW.Acme.com/pricing?utm=x ' })
    expect(parsed.host).toBe('acme.com')
  })

  it('asks what to call you when the first name is missing', () => {
    expect(codeFor(auditRequestSchema, { ...validAudit, firstName: '  ' })).toBe('firstName_required')
  })

  it('rejects an address that is not an address', () => {
    expect(codeFor(auditRequestSchema, { ...validAudit, email: 'nope' })).toBe('invalid_email')
  })

  it('rejects a throwaway inbox, because the report would never arrive', () => {
    expect(codeFor(auditRequestSchema, { ...validAudit, email: 'foo@mailinator.com' })).toBe('disposable_email')
  })

  it('rejects something that is not a website', () => {
    expect(codeFor(auditRequestSchema, { ...validAudit, url: 'not a site' })).toBe('invalid_url')
  })

  it('requires consent, because the report is the thing being consented to', () => {
    expect(codeFor(auditRequestSchema, { ...validAudit, consentReport: false })).toBe('consent_required')
  })

  it('asks for the relationship when a consumer address cannot match the site', () => {
    const code = codeFor(auditRequestSchema, {
      ...validAudit,
      email: 'someone@gmail.com',
      url: 'https://acme.com',
    })
    expect(code).toBe('relationship_required')
  })

  it('accepts a consumer address once the relationship is given', () => {
    const result = auditRequestSchema.safeParse({
      ...validAudit,
      email: 'someone@gmail.com',
      url: 'https://acme.com',
      relationship: 'consultant',
    })
    expect(result.success).toBe(true)
  })

  it('does not ask the relationship question when the address matches the site', () => {
    expect(auditRequestSchema.safeParse({ ...validAudit, relationship: '' }).success).toBe(true)
  })

  it('rejects a relationship that is not one of the offered options', () => {
    const code = codeFor(auditRequestSchema, {
      ...validAudit,
      email: 'someone@gmail.com',
      url: 'https://acme.com',
      relationship: 'president-of-mars',
    })
    expect(code).toBe('relationship_required')
  })

  it('truncates an overlong field rather than rejecting a real enquiry', () => {
    const parsed = auditRequestSchema.parse({ ...validAudit, firstName: 'א'.repeat(500) })
    expect(parsed.firstName).toHaveLength(80)
  })

  it('treats a missing field as empty rather than throwing on the type', () => {
    expect(codeFor(auditRequestSchema, { ...validAudit, firstName: undefined })).toBe('firstName_required')
  })
})

const validContact = {
  name: 'Dana Levi',
  email: 'dana@acme.com',
  message: 'We are rebuilding our onboarding and need help.',
}

describe('contact schema', () => {
  it('accepts the three fields it actually needs', () => {
    expect(contactSchema.safeParse(validContact).success).toBe(true)
  })

  it('keeps the optional fields when they are given', () => {
    const parsed = contactSchema.parse({ ...validContact, phone: '050-1234567', company: 'Acme', role: 'CEO' })
    expect(parsed.company).toBe('Acme')
  })

  it('defaults the optional fields to empty rather than undefined', () => {
    expect(contactSchema.parse(validContact).phone).toBe('')
  })

  it('requires a name', () => {
    expect(codeFor(contactSchema, { ...validContact, name: '' })).toBe('name_required')
  })

  it('requires a message, since that is the enquiry', () => {
    expect(codeFor(contactSchema, { ...validContact, message: '   ' })).toBe('message_required')
  })

  it('rejects an address that is not an address', () => {
    expect(codeFor(contactSchema, { ...validContact, email: 'nope' })).toBe('invalid_email')
  })

  it('rejects a throwaway inbox, so a reply is not sent into a void', () => {
    expect(codeFor(contactSchema, { ...validContact, email: 'foo@yopmail.com' })).toBe('disposable_email')
  })
})
