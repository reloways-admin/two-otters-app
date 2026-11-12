'use client'

import { useRef, useState, type FormEvent } from 'react'
import { trackLead } from './AdPixels'

/** The handler's error codes, in the page's voice. */
const ERRORS: Record<string, string> = {
  firstName_required: 'רגע, איך קוראים לכם?',
  invalid_email: 'נראה שחסר משהו בכתובת המייל.',
  disposable_email: 'צריך כתובת מייל קבועה, כדי שהמדריך לא ילך לאיבוד.',
  blocked: 'משהו בדפדפן חסם את השליחה. נסו שוב, או מדפדפן אחר.',
  not_configured: 'אצלנו משהו לא מחובר. כתבו לנו ל־hello@two-otters.studio ונשלח ידנית.',
}
const FALLBACK = 'השליחה לא עברה. נסו שוב בעוד רגע.'

const UTM = ['source', 'medium', 'campaign', 'content', 'term'] as const

function utmFromUrl(): Record<string, string> {
  const q = new URLSearchParams(window.location.search)
  const out: Record<string, string> = {}
  for (const k of UTM) {
    const v = q.get(`utm_${k}`)
    if (v) out[`utm${k[0].toUpperCase()}${k.slice(1)}`] = v
  }
  return out
}

/** Stars thrown from the button on success — Keren's flourish, kept as she wrote it. */
function burst(from: HTMLElement) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const host = from.closest('.uxg') ?? document.body
  const r = from.getBoundingClientRect()
  for (let i = 0; i < 12; i++) {
    const s = document.createElement('img')
    s.src = '/ux-guide/ico-spark.svg'
    s.className = 'burst'
    s.alt = ''
    s.style.left = `${r.left + r.width / 2 - 17}px`
    s.style.top = `${r.top + r.height / 2 - 17}px`
    const a = Math.random() * Math.PI * 2
    const d = 90 + Math.random() * 120
    s.style.setProperty('--dx', `${Math.cos(a) * d}px`)
    s.style.setProperty('--dy', `${Math.sin(a) * d - 60}px`)
    s.style.setProperty('--r', `${Math.random() * 360 - 180}deg`)
    host.appendChild(s)
    setTimeout(() => s.remove(), 1200)
  }
}

/**
 * First name + email, the two fields of the guide. Used twice on the page (hero
 * and closing slab), each instance on its own. Posts to /api/forms/ux-guide,
 * the same handler every site form goes through.
 */
export default function GuideForm({ variant }: { variant: 'dark' | 'light' }) {
  const [state, setState] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [error, setError] = useState<string | null>(null)
  const button = useRef<HTMLButtonElement>(null)

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (state === 'sending') return
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>
    setError(null)
    setState('sending')
    try {
      const res = await fetch('/api/forms/ux-guide', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, ...utmFromUrl() }),
      })
      const body = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string }
      if (!res.ok || !body.ok) {
        setError(ERRORS[body.error ?? ''] ?? FALLBACK)
        setState('idle')
        return
      }
      setState('sent')
      trackLead()
      if (button.current) burst(button.current)
    } catch {
      setError(FALLBACK)
      setState('idle')
    }
  }

  const light = variant === 'light'
  return (
    <>
      <form
        className={`form${light ? ' form-light' : ''}${state === 'sent' ? ' sent' : ''}`}
        data-form
        onSubmit={onSubmit}
        noValidate
      >
        <input type="text" name="firstName" placeholder="שם פרטי" autoComplete="given-name" required aria-label="שם פרטי" maxLength={80} />
        <input type="email" name="email" placeholder="כתובת מייל" autoComplete="email" inputMode="email" required aria-label="כתובת מייל" />
        {/* Honeypot: hidden from people, filled in by bots. */}
        <input className="hp" type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
        <button ref={button} className={`btn ${light ? 'btn-navy' : 'btn-green'}`} type="submit" disabled={state === 'sending'}>
          {state === 'sending' ? 'שולחים…' : 'שלחו לי את המדריך'}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
        </button>
      </form>
      <p className="micro">PDF של 10 עמודים. נוחת אצלכם במייל תוך דקה.</p>
      {error && <p className="err" role="alert">{error}</p>}
      <div className="done" role="status">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/ux-guide/ico-done.svg" alt="" />
        <div>המדריך בדרך אליכם!<span>הציצו במייל (וגם בקידומי מכירות, ליתר ביטחון).</span></div>
      </div>
    </>
  )
}
