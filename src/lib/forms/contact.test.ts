import { describe, it, expect } from 'vitest'
import { contactForm } from './contact'
import type { ContactInput } from './schemas'

const filled: ContactInput = {
  name: 'Dana', email: 'd@acme.com', phone: '050-1234567',
  company: 'Acme', role: 'CEO', message: 'Hello',
}
const labels = (data: ContactInput) => contactForm.record.rows(data).map(([label]) => label)

describe('what the contact form puts on the ClickUp task', () => {
  it('lists the short facts, message excluded — that gets its own block', () => {
    expect(labels(filled)).toEqual(['שם', 'אימייל', 'טלפון', 'חברה', 'תפקיד'])
  })

  it('carries the message as its own note, not squeezed into the list', () => {
    expect(contactForm.record.note!(filled)).toEqual({ label: 'הודעה', text: 'Hello' })
  })

  it('loses nothing — every field the form asks for is still somewhere', () => {
    const present = [...labels(filled), contactForm.record.note!(filled).label]
    expect(present).toEqual(['שם', 'אימייל', 'טלפון', 'חברה', 'תפקיד', 'הודעה'])
  })

  it('keeps every label when the optional fields are left blank', () => {
    // Dropping them made a half-filled form look like a broken integration:
    // you could not tell "no phone given" from "the phone went missing".
    expect(labels({ ...filled, phone: '', company: '', role: '' })).toHaveLength(5)
  })

  it('marks a blank answer rather than hiding the question', () => {
    const rows = contactForm.record.rows({ ...filled, phone: '', company: '', role: '' })
    expect(Object.fromEntries(rows)).toMatchObject({ טלפון: '—', חברה: '—', תפקיד: '—' })
  })

  it('still shows the answers that were given', () => {
    const rows = Object.fromEntries(contactForm.record.rows({ ...filled, company: '' }))
    expect(rows['טלפון']).toBe('050-1234567')
    expect(rows['חברה']).toBe('—')
  })
})
