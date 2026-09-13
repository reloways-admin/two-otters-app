import { describe, it, expect } from 'vitest'
import { contactForm } from './contact'
import type { ContactInput } from './schemas'

const filled: ContactInput = {
  name: 'Dana', email: 'd@acme.com', phone: '050-1234567',
  company: 'Acme', role: 'CEO', message: 'Hello',
}
const labels = (data: ContactInput) => contactForm.record.rows(data).map(([label]) => label)

describe('the task title', () => {
  it('is English, so the board scans the same whichever language the visitor used', () => {
    expect(contactForm.record.title(filled)).toBe('Contact - Dana')
  })

  it('leads with English even when the name is Hebrew, so the line stays left-to-right', () => {
    expect(contactForm.record.title({ ...filled, name: 'רונית לוי' })).toBe('Contact - רונית לוי')
  })
})

describe('what the contact form puts on the ClickUp task', () => {
  it('lists the short facts, message excluded — that gets its own block', () => {
    expect(labels(filled)).toEqual(['Name', 'Email', 'Phone', 'Company', 'Role'])
  })

  it('carries the message as its own note, not squeezed into the list', () => {
    expect(contactForm.record.note!(filled)).toEqual({ label: 'Message', text: 'Hello' })
  })

  it('loses nothing — every field the form asks for is still somewhere', () => {
    const present = [...labels(filled), contactForm.record.note!(filled).label]
    expect(present).toEqual(['Name', 'Email', 'Phone', 'Company', 'Role', 'Message'])
  })

  it('keeps every label when the optional fields are left blank', () => {
    // Dropping them made a half-filled form look like a broken integration:
    // you could not tell "no phone given" from "the phone went missing".
    expect(labels({ ...filled, phone: '', company: '', role: '' })).toHaveLength(5)
  })

  it('marks a blank answer rather than hiding the question', () => {
    const rows = contactForm.record.rows({ ...filled, phone: '', company: '', role: '' })
    expect(Object.fromEntries(rows)).toMatchObject({ Phone: '—', Company: '—', Role: '—' })
  })

  it('still shows the answers that were given', () => {
    const rows = Object.fromEntries(contactForm.record.rows({ ...filled, company: '' }))
    expect(rows['Phone']).toBe('050-1234567')
    expect(rows['Company']).toBe('—')
  })
})

describe('the visitor\u2019s own words are never translated', () => {
  it('leaves a Hebrew name and message exactly as typed', () => {
    const hebrew = { ...filled, name: 'רונית לוי', company: 'אקמה בע״מ', message: 'שלום' }
    const rows = Object.fromEntries(contactForm.record.rows(hebrew))
    expect(rows['Name']).toBe('רונית לוי')
    expect(rows['Company']).toBe('אקמה בע״מ')
    expect(contactForm.record.note!(hebrew).text).toBe('שלום')
  })
})
