import { describe, it, expect } from 'vitest'
import { leadToMarkdown, rowsToMarkdown, rowsToText } from './compose'

const rows: [string, string][] = [
  ['שם', 'רונית לוי'],
  ['אימייל', 'ronit@acme.com'],
  ['טלפון', '052-9876543'],
  ['חברה', 'אקמה'],
  ['תפקיד', 'מנהלת שיווק'],
  ['הודעה', 'שלום'],
]

describe('the body a lead carries', () => {
  it('keeps every row', () => {
    expect(rowsToMarkdown(rows).split('\n').filter(Boolean)).toHaveLength(6)
  })

  it('spends one line per row, so a six-field form is not collapsed behind Expand', () => {
    // Paragraph-per-row made the description tall enough for ClickUp to hide
    // everything after the third field behind a button.
    expect(rowsToMarkdown(rows).split('\n')).toHaveLength(6)
    expect(rowsToMarkdown(rows)).not.toContain('\n\n')
  })

  it('labels each value so the pairs survive as a list', () => {
    expect(rowsToMarkdown(rows).split('\n')[0]).toBe('- **שם:** רונית לוי')
  })

  it('leaves the plain-text form alone — logs want one pair per line', () => {
    expect(rowsToText(rows).split('\n')).toHaveLength(6)
    expect(rowsToText(rows)).toContain('שם: רונית לוי')
  })

  it('copes with an empty set rather than emitting stray markup', () => {
    expect(rowsToMarkdown([])).toBe('')
  })
})

describe('a lead whose person wrote something', () => {
  const facts: [string, string][] = [
    ['שם', 'רונית לוי'],
    ['אימייל', 'ronit@acme.com'],
  ]
  const note = { label: 'הודעה', text: 'שלום, אנחנו בונים מוצר חדש\nונשמח לדבר.' }

  it('keeps the facts scannable and the message apart from them', () => {
    const body = leadToMarkdown(facts, note)
    const [first, second] = body.split('\n\n')

    expect(first).toBe('- **שם:** רונית לוי\n- **אימייל:** ronit@acme.com')
    expect(second).toContain('**הודעה**')
  })

  it('gives the message room to breathe, and its own heading', () => {
    expect(leadToMarkdown(facts, note)).toContain('**הודעה**\n\nשלום')
  })

  it('keeps the line breaks the person typed', () => {
    expect(leadToMarkdown(facts, note)).toContain('מוצר חדש\nונשמח לדבר.')
  })

  it('renders just the list when there is no message — the audit form has none', () => {
    expect(leadToMarkdown(facts)).toBe('- **שם:** רונית לוי\n- **אימייל:** ronit@acme.com')
  })

  it('omits an empty message rather than leaving a dangling heading', () => {
    expect(leadToMarkdown(facts, { label: 'הודעה', text: '   ' })).not.toContain('הודעה')
  })
})
