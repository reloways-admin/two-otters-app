'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { bookingSchema } from '@/lib/forms/schemas'
import { debug } from '@/lib/debug'
import en from '@/locales/v8-en.json'

type BookCallT = typeof en.bookCall
type Lang = 'en' | 'he'
type ErrorCode = keyof BookCallT['errors']

type Availability =
  | { state: 'loading' }
  | { state: 'ready'; slots: number[] }
  | { state: 'failed'; code: string }

/**
 * Our own booking calendar, drawn from the v0.2 site mockup (`wf-cal`).
 *
 * The server decides which slots exist — both founders' Google calendars,
 * each in their own time zone — and hands back UTC instants. Everything here
 * is presentation: the browser's own clock turns those instants into the
 * visitor's days and times, so someone in Tel Aviv and someone in Berlin each
 * see their local hours for the same slot.
 */
export default function BookCallV8({ t, lang }: { t: BookCallT; lang: Lang }) {
  const locale = lang === 'he' ? 'he-IL' : 'en-US'
  const [availability, setAvailability] = useState<Availability>({ state: 'loading' })
  const [view, setView] = useState<{ y: number; m: number } | null>(null)
  const [day, setDay] = useState<string | null>(null)
  const [slot, setSlot] = useState<number | null>(null)
  const [form, setForm] = useState({ name: '', email: '', topic: '', message: '' })
  const [honeypot, setHoneypot] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle')
  const [error, setError] = useState<ErrorCode | null>(null)
  const [timeZone, setTimeZone] = useState('')

  const load = useCallback(async () => {
    try {
      const res = await fetch('/api/booking/slots', { cache: 'no-store' })
      const data = await res.json()
      if (!data.ok) throw Object.assign(new Error(data.error), { code: data.error })
      const slots = (data.slots as string[]).map(Date.parse)
      setAvailability({ state: 'ready', slots })
      return slots
    } catch (err) {
      debug('Booking slots failed to load:', err)
      setAvailability({ state: 'failed', code: (err as { code?: string }).code ?? 'network' })
      return []
    }
  }, [])

  useEffect(() => {
    setTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone)
    load().then(slots => {
      // Open on the month of the first free slot, with its day already picked.
      const first = slots[0] !== undefined ? new Date(slots[0]) : new Date()
      setView({ y: first.getFullYear(), m: first.getMonth() })
      if (slots[0] !== undefined) setDay(dayKey(slots[0]))
    })
  }, [load])

  const byDay = useMemo(() => {
    const map = new Map<string, number[]>()
    if (availability.state !== 'ready') return map
    for (const s of availability.slots) {
      const k = dayKey(s)
      map.set(k, [...(map.get(k) ?? []), s])
    }
    return map
  }, [availability])

  const fmt = useMemo(
    () => ({
      month: new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }),
      date: new Intl.DateTimeFormat(locale, { weekday: 'long', day: 'numeric', month: 'long' }),
      time: new Intl.DateTimeFormat(locale, { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }),
      zone: new Intl.DateTimeFormat(locale, { timeZoneName: 'long' }),
    }),
    [locale]
  )
  const zoneName =
    fmt.zone.formatToParts(new Date()).find(p => p.type === 'timeZoneName')?.value ?? timeZone

  const contactHref = `/?lang=${lang}#contact`

  if (availability.state === 'loading' || !view) {
    return (
      <div className="v8-cal v8-cal--status" aria-busy="true">
        <span className="v8-cal-spinner" aria-hidden="true" />
        <p>{t.loading}</p>
      </div>
    )
  }

  if (availability.state === 'failed' || availability.slots.length === 0) {
    const empty = availability.state === 'ready'
    return (
      <div className="v8-cal v8-cal--status">
        <h2 className="v8-cal-status-title">{empty ? t.emptyTitle : t.unavailableTitle}</h2>
        <p>{empty ? t.emptyText : t.unavailableText}</p>
        <a href={contactHref} className="v8-cal-cta">{t.contactCta}</a>
      </div>
    )
  }

  if (status === 'done' && slot !== null) {
    return (
      <div className="v8-cal v8-cal--status" role="status">
        <span className="v8-cal-check" aria-hidden="true">✓</span>
        <h2 className="v8-cal-status-title">
          {fill(t.successTitle, { date: fmt.date.format(slot), time: fmt.time.format(slot) })}
        </h2>
        <p>{t.successText}</p>
      </div>
    )
  }

  const { slots } = availability
  const firstMonth = monthOf(slots[0])
  const lastMonth = monthOf(slots.at(-1)!)
  const canPrev = view.y * 12 + view.m > firstMonth
  const canNext = view.y * 12 + view.m < lastMonth
  const shift = (delta: number) => {
    const n = view.y * 12 + view.m + delta
    setView({ y: Math.floor(n / 12), m: n % 12 })
  }

  const daysInMonth = new Date(view.y, view.m + 1, 0).getDate()
  const leading = new Date(view.y, view.m, 1).getDay()
  const todayKey = dayKey(Date.now())
  const daySlots = day ? byDay.get(day) ?? [] : []

  const pickDay = (k: string) => {
    setDay(k)
    setSlot(null)
    setError(null)
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (slot === null) return
    const payload = { ...form, start: new Date(slot).toISOString(), timeZone, website: honeypot }
    // Same schema the server runs, for an instant answer; the server's is the one that counts.
    const check = bookingSchema.safeParse(payload)
    if (!check.success) return setError(asCode(check.error.issues[0]?.message))

    setStatus('sending')
    setError(null)
    try {
      const res = await fetch('/api/booking/book', {
        method: 'POST',
        headers: { 'content-type': 'application/json', accept: 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json().catch(() => null)
      if (!res.ok || !data?.ok) throw Object.assign(new Error(data?.error), { code: data?.error ?? 'send_failed' })
      setStatus('done')
    } catch (err) {
      debug('Booking failed:', err)
      const code = asCode((err as { code?: string }).code ?? 'network')
      setStatus('idle')
      setError(code)
      if (code === 'slot_taken') {
        setSlot(null)
        await load()
      }
    }
  }

  // In RTL the "previous" button sits on the right, so its arrow points right.
  const [prevArrow, nextArrow] = lang === 'he' ? ['›', '‹'] : ['‹', '›']

  return (
    <div className="v8-cal" aria-label={t.calendarLabel}>
      <div className="v8-cal-head">
        <b>{fmt.month.format(new Date(view.y, view.m, 1))}</b>
        <span className="v8-cal-nav">
          <button type="button" onClick={() => shift(-1)} disabled={!canPrev} aria-label={t.prevMonth}>{prevArrow}</button>
          <button type="button" onClick={() => shift(1)} disabled={!canNext} aria-label={t.nextMonth}>{nextArrow}</button>
        </span>
      </div>

      <div className="v8-cal-dow" aria-hidden="true">
        {t.weekdays.map(d => <span key={d}>{d}</span>)}
      </div>
      <div className="v8-cal-grid">
        {Array.from({ length: leading }, (_, i) => <span key={`pad-${i}`} />)}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const date = new Date(view.y, view.m, i + 1)
          const k = dayKey(date.getTime())
          const open = byDay.has(k)
          const cls = [k === todayKey && 'today', k === day && 'sel'].filter(Boolean).join(' ')
          return open ? (
            <button
              key={k}
              type="button"
              className={cls}
              aria-pressed={k === day}
              aria-label={fmt.date.format(date)}
              onClick={() => pickDay(k)}
            >
              {i + 1}
            </button>
          ) : (
            <span key={k} className={cls}>{i + 1}</span>
          )
        })}
      </div>
      <p className="v8-cal-note">{fill(t.tzNote, { tz: zoneName })}</p>

      <div className="v8-cal-step">
        {daySlots.length === 0 ? (
          <p className="v8-cal-label">{t.pickDay}</p>
        ) : (
          <>
            <p className="v8-cal-label">{fill(t.pickTime, { date: fmt.date.format(daySlots[0]) })}</p>
            <div className="v8-cal-slots">
              {daySlots.map(s => (
                <button
                  key={s}
                  type="button"
                  className={s === slot ? 'sel' : undefined}
                  aria-pressed={s === slot}
                  onClick={() => {
                    setSlot(s)
                    setError(null)
                  }}
                >
                  {fmt.time.format(s)}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {slot !== null && (
        <form className="v8-cal-step v8-cal-form" onSubmit={submit} noValidate>
          <p className="v8-cal-label">
            {fill(t.formLabel, { date: fmt.date.format(slot), time: fmt.time.format(slot) })}
          </p>
          {/* Hidden from people, irresistible to bots. */}
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            value={honeypot}
            onChange={e => setHoneypot(e.target.value)}
            style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
          />
          <input
            className="v8-field"
            name="name"
            autoComplete="name"
            placeholder={t.namePlaceholder}
            aria-label={t.namePlaceholder}
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          />
          <input
            className="v8-field"
            name="email"
            type="email"
            autoComplete="email"
            placeholder={t.emailPlaceholder}
            aria-label={t.emailPlaceholder}
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
          />
          <select
            className="v8-field v8-cal-select"
            aria-label={t.topicLabel}
            value={form.topic}
            onChange={e => setForm(f => ({ ...f, topic: e.target.value }))}
          >
            <option value="">{t.topicLabel}</option>
            {t.topics.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
          <textarea
            className="v8-field v8-cal-message"
            placeholder={t.messagePlaceholder}
            aria-label={t.messagePlaceholder}
            value={form.message}
            onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
          />
          {error && <p className="v8-cal-error" role="alert">{t.errors[error]}</p>}
          <button type="submit" className="v8-cal-submit" disabled={status === 'sending'}>
            {status === 'sending' ? t.sending : t.submit}
          </button>
        </form>
      )}
      {slot === null && error && <p className="v8-cal-error" role="alert">{t.errors[error]}</p>}
    </div>
  )
}

/** A calendar day in the visitor's own zone — the browser's clock is theirs. */
function dayKey(ms: number) {
  const d = new Date(ms)
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
}

function monthOf(ms: number) {
  const d = new Date(ms)
  return d.getFullYear() * 12 + d.getMonth()
}

function fill(template: string, vars: Record<string, string>) {
  return template.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? '')
}

function asCode(code: string | undefined): ErrorCode {
  return code && code in en.bookCall.errors ? (code as ErrorCode) : 'send_failed'
}
