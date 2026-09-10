'use client'

import { useEffect, useMemo, useState } from 'react'
import en from '@/locales/v8-en.json'
import he from '@/locales/v8-he.json'
import { deliveryDate, formatDeliveryDate } from '@/lib/audit-intake'
import '../audit.css'

type Lang = 'en' | 'he'
const locales = { en, he } as const

/** Written by the form the moment the server confirms, read once here.
 *  It is what separates "you just submitted" from "you typed this URL". */
export const STORE_DONE = 'twootters.audit.done'

type Done = { host: string; email: string }

/**
 * Figma step-5, on its own URL so a conversion can be measured against it —
 * that is the standard way to count a lead in Meta or Google Ads.
 *
 * The risk of a real URL is that anyone can land on it cold, or refresh it, and
 * be congratulated for a request they never made. So the screen only renders
 * when this session actually submitted: the marker survives a refresh (same
 * session) and is absent for a cold visit, which is sent back to the start.
 */
export default function AuditThanks() {
  const [lang, setLang] = useState<Lang>('he')
  const t = locales[lang].audit.details

  const [done, setDone] = useState<Done | null>(null)
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const p = params.get('lang')
    if (p === 'en' || p === 'he') setLang(p)

    let payload: Done | null = null
    try {
      const raw = sessionStorage.getItem(STORE_DONE)
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<Done>
        if (parsed?.host && parsed?.email) payload = { host: parsed.host, email: parsed.email }
      }
    } catch {
      // Unreadable or blocked storage: treat it as "did not submit here".
    }
    setDone(payload)
    setChecked(true)
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr'
  }, [lang])

  // Nobody submitted in this session. Send them to the start rather than
  // showing a confirmation for something that never happened.
  useEffect(() => {
    if (checked && !done) window.location.replace(`/audit?lang=${lang}`)
  }, [checked, done, lang])

  const due = useMemo(() => formatDeliveryDate(deliveryDate(), lang), [lang])

  if (!checked || !done) return null

  return (
    <main className="au-screen">
      <div className="au-inner au-inner--wide">
        <h1 className="au-title au-title--success">
          {t.successTitle1}
          <br />
          {t.successTitle2}
        </h1>

        <p className="au-target au-target--success">
          <span>{t.deliveryPrefix}</span>
          <span className="au-chip">{done.host}</span>
          <span>{t.deliveryMid}</span>
          <span className="au-chip au-chip--soft">{done.email}</span>
          <span>{t.deliverySuffix} {due}.</span>
        </p>

        <p className="au-lede au-lede--tight">{t.confirmBody}</p>

        <h2 className="au-deepen">{t.deepenTitle}</h2>

        <div className="au-cta-row">
          <a className="au-submit au-submit--inline" href={`/work/fincat?lang=${lang}`}>
            {t.ctaCase}
          </a>
          <a
            className="au-submit au-submit--ghost"
            href="https://www.instagram.com/two_otters.studio/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.ctaInstagram}
          </a>
        </div>
      </div>
    </main>
  )
}
