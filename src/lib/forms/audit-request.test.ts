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

describe('the audit task body', () => {
  const labels = (d: AuditRequestInput) => auditRequestForm.record.rows(d).map(([l]) => l)

  it('labels every row in English so the board scans in one direction', () => {
    expect(labels(lead)).toEqual(['Site', 'Name', 'Email', 'Email matches site', 'Relationship', 'Marketing opt-in'])
  })

  it('says plainly whether the address belongs to the site', () => {
    const rows = Object.fromEntries(auditRequestForm.record.rows(lead))
    expect(rows['Email matches site']).toBe('Yes')
    expect(Object.fromEntries(auditRequestForm.record.rows({ ...lead, email: 'someone@gmail.com' }))['Email matches site']).toBe('No')
  })

  it('reads the relationship back in English', () => {
    const rows = Object.fromEntries(auditRequestForm.record.rows({ ...lead, email: 'x@gmail.com', relationship: 'consultant' }))
    expect(rows['Relationship']).toBe('External consultant')
  })

  it('marks an unanswered relationship rather than hiding the question', () => {
    expect(Object.fromEntries(auditRequestForm.record.rows(lead))['Relationship']).toBe('—')
  })

  it('keeps the visitor name exactly as typed, Hebrew and all', () => {
    expect(Object.fromEntries(auditRequestForm.record.rows(lead))['Name']).toBe('רונית')
  })
})
