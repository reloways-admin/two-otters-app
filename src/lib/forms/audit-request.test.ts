import { describe, it, expect } from 'vitest'
import { auditRequestForm } from './audit-request'
import type { AuditRequestInput } from './schemas'

const lead = {
  firstName: 'רונית', email: 'ronit@acme.com', url: 'acme.com', host: 'acme.com',
  relationship: '', consentReport: true, marketingOptIn: false,
} as AuditRequestInput

describe('the task title', () => {
  it('is English, and puts the site being audited where the eye lands', () => {
    expect(auditRequestForm.record.title(lead)).toBe('Audit request - acme.com')
  })

  it('stays left-to-right, so a domain never gets shuffled by an RTL prefix', () => {
    expect(auditRequestForm.record.title(lead).startsWith('Audit request')).toBe(true)
  })
})
