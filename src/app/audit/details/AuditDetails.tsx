'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import en from '@/locales/v8-en.json'
import he from '@/locales/v8-he.json'
import { STORE_DONE } from '../thanks/AuditThanks'
import {
  isValidEmail,
  isDisposableEmail,
  isValidSiteUrl,
  normaliseSiteHost,
  needsRelationshipQuestion,
  RELATIONSHIP_VALUES,
  type Relationship,
} from '@/lib/audit-intake'
import '../audit.css'

type Lang = 'en' | 'he'
const locales = { en, he } as const

/** Where step 1 and step 2 leave what they collected.
 *  sessionStorage rather than the query string on purpose: an email in a URL
 *  ends up in server logs, referrer headers and browser history, and this form
 *  is the subject of a privacy policy that says we do not do that. The site
 *  address is not personal, so it may also arrive as ?url= — that keeps the
 *  page shareable and survives a refresh. */
const STORE_URL = 'twootters.audit.url'
const STORE_EMAIL = 'twootters.audit.email'

type FieldErrors = Partial<Record<'firstName' | 'email' | 'relationship' | 'consent' | 'form', string>>

export default function AuditDetails() {
  const [lang, setLang] = useState<Lang>('he')
  const t = locales[lang].audit.details

  const [url, setUrl] = useState('')
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [relationship, setRelationship] = useState<Relationship | ''>('')
  const [consentReport, setConsentReport] = useState(false)
  const [marketingOptIn, setMarketingOptIn] = useState(false)
  const [honeypot, setHoneypot] = useState('')

  const [errors, setErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle')
  const [hydrated, setHydrated] = useState(false)
  const [focusInvalid, setFocusInvalid] = useState(false)

  const errorRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const p = params.get('lang')
    if (p === 'en' || p === 'he') setLang(p)

    try {
      setUrl(params.get('url') || sessionStorage.getItem(STORE_URL) || '')
      setEmail(sessionStorage.getItem(STORE_EMAIL) || '')
    } catch {
      // Private mode and blocked site data both throw here. An empty form still
      // works; the visitor just retypes.
      setUrl(params.get('url') || '')
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr'
  }, [lang])

  const host = useMemo(() => normaliseSiteHost(url), [url])

  /** Whether the address warrants step 4's extra question at all. */
  const needsRelationship = useMemo(
    () => isValidEmail(email) && needsRelationshipQuestion(email, url),
    [email, url],
  )

  /**
   * Whether to actually put it on screen.
   *
   * Deliberately not the same thing. Watching the address character by
   * character means the question appears the instant the string first parses
   * as an email and then jumps in and out as the domain is typed out, which
   * reads as the form arguing with you mid-word. It waits until the field is
   * done with: focus leaves it, or the form is submitted.
   */
  const [emailSettled, setEmailSettled] = useState(false)
  const showRelationship = emailSettled && needsRelationship

  // A question that is no longer being asked must not keep a stale answer.
  useEffect(() => {
    if (!needsRelationship && relationship) setRelationship('')
  }, [needsRelationship, relationship])

  function validate(): FieldErrors {
    const next: FieldErrors = {}
    if (!firstName.trim()) next.firstName = t.errors.firstName_required
    if (!isValidEmail(email)) next.email = t.errors.invalid_email
    // Worth catching here rather than after a round trip: we already know the
    // report would be sent into a void.
    else if (isDisposableEmail(email)) next.email = t.errors.disposable_email
    if (!consentReport) next.consent = t.errors.consent_required
    if (needsRelationship && !relationship) next.relationship = t.errors.relationship_required
    return next
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // Submitting counts as finishing with the field, so someone who goes
    // straight from typing to Enter still gets asked rather than being told off
    // for a question they were never shown.
    setEmailSettled(true)
    const found = validate()
    setErrors(found)
    if (Object.keys(found).length) {
      // Focus moves in the effect below, not here: data-invalid only lands in
      // the DOM after React re-renders, so focusing now would silently do
      // nothing and leave the visitor hunting for the red text.
      setFocusInvalid(true)
      return
    }

    setStatus('sending')
    try {
      const res = await fetch('/api/audit-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          url, firstName, email, relationship, consentReport, marketingOptIn, website: honeypot,
        }),
      })
      const data = await res.json().catch(() => null)

      if (res.ok && data?.ok) {
        // Hand the confirmation screen what it needs to say, and mark that this
        // session really did submit — /audit/thanks refuses to congratulate a
        // cold visitor. The email travels through storage, never the URL.
        try {
          sessionStorage.setItem(STORE_DONE, JSON.stringify({ host, email }))
          sessionStorage.removeItem(STORE_URL)
          sessionStorage.removeItem(STORE_EMAIL)
        } catch { /* storage blocked; the thanks page will send them home */ }
        setStatus('success')
        window.location.href = `/audit/thanks?lang=${lang}`
        return
      }

      const code = (data?.error ?? 'send_failed') as keyof typeof t.errors
      const message = t.errors[code] ?? t.errors.send_failed
      // Server-side field errors belong on their field; the rest sit above the button.
      if (code === 'invalid_email' || code === 'disposable_email') setErrors({ email: message })
      else if (code === 'relationship_required') setErrors({ relationship: message })
      else if (code === 'consent_required') setErrors({ consent: message })
      else setErrors({ form: message })
      setStatus('idle')
    } catch {
      setErrors({ form: t.errors.network })
      setStatus('idle')
    }
  }

  useEffect(() => {
    if (errors.form) errorRef.current?.focus()
  }, [errors.form])

  // Runs after the render that added data-invalid, so the element exists.
  useEffect(() => {
    if (!focusInvalid) return
    document.querySelector<HTMLElement>('[data-invalid="true"]')?.focus()
    setFocusInvalid(false)
  }, [focusInvalid, errors])

  // Nothing to audit: step 2 was skipped or the session was lost.
  if (hydrated && !isValidSiteUrl(url)) {
    return (
      <main className="au-screen">
        <div className="au-inner au-inner--narrow">
          <h1 className="au-title">{t.missingUrlTitle}</h1>
          <p className="au-lede">{t.missingUrlBody}</p>
          <a href={`/audit?lang=${lang}`} className="au-submit">{t.missingUrlCta}</a>
        </div>
      </main>
    )
  }

  // The browser is on its way to /audit/thanks; showing the form again in the
  // meantime would invite a second submit.
  if (status === 'success') return null

  return (
    <main className="au-screen">
      <div className="au-inner">
        <h1 className="au-title">{t.title}</h1>

        <p className="au-target">
          <span className="au-target-label">{t.urlPrefix}</span>
          <span className="au-chip">{host}</span>
          <span className="au-target-change">
            {t.urlChangeQuestion}{' '}
            <a href={`/audit?lang=${lang}`}>{t.urlChangeLink}</a>
          </span>
        </p>

        <form className="au-form" onSubmit={handleSubmit} noValidate>
          <div className="au-field">
            <label className="au-label" htmlFor="au-first-name">{t.firstNameLabel}</label>
            <input
              id="au-first-name"
              className="au-input"
              name="firstName"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              placeholder={t.firstNamePlaceholder}
              autoComplete="given-name"
              data-invalid={errors.firstName ? 'true' : undefined}
              aria-invalid={errors.firstName ? true : undefined}
              aria-describedby={errors.firstName ? 'au-first-name-err' : undefined}
            />
            {errors.firstName && (
              <p className="au-error" id="au-first-name-err">{errors.firstName}</p>
            )}
          </div>

          <div className="au-field">
            <label className="au-label" htmlFor="au-email">{t.emailLabel}</label>
            <input
              id="au-email"
              className="au-input"
              name="email"
              type="email"
              inputMode="email"
              value={email}
              onChange={e => { setEmail(e.target.value); setEmailSettled(false) }}
              onBlur={() => setEmailSettled(true)}
              placeholder={t.emailPlaceholder}
              autoComplete="email"
              data-invalid={errors.email ? 'true' : undefined}
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={errors.email ? 'au-email-err' : undefined}
            />
            {errors.email && <p className="au-error" id="au-email-err">{errors.email}</p>}
          </div>

          {/* Always rendered so it can be animated open; held inert while shut
              so it takes no tab stop and is not read out. */}
          <div className="au-reveal" data-open={showRelationship}>
            <div inert={!showRelationship || undefined}>
            <fieldset
              className="au-field au-fieldset"
              aria-describedby={`au-rel-why${errors.relationship ? ' au-rel-err' : ''}`}
            >
              <legend className="au-label au-legend">{t.relationship.question}</legend>
              {RELATIONSHIP_VALUES.map(value => (
                <label key={value} className="au-radio">
                  <input
                    type="radio"
                    name="relationship"
                    value={value}
                    checked={relationship === value}
                    onChange={() => setRelationship(value)}
                    data-invalid={errors.relationship ? 'true' : undefined}
                  />
                  <span>{t.relationship.options[value]}</span>
                </label>
              ))}
              <p className="au-help" id="au-rel-why">{t.relationship.why}</p>
              {errors.relationship && (
                <p className="au-error" id="au-rel-err">{errors.relationship}</p>
              )}
            </fieldset>
            </div>
          </div>

          {/* Two boxes, not one. The report is what they asked for, so that
              consent is required; joining the mailing list is separate and
              optional, because marketing consent has to be freely given and
              cannot be the price of the service. */}
          <div className="au-field">
            <label className="au-check">
              <input
                type="checkbox"
                name="consentReport"
                checked={consentReport}
                onChange={e => setConsentReport(e.target.checked)}
                data-invalid={errors.consent ? 'true' : undefined}
                aria-invalid={errors.consent ? true : undefined}
                aria-describedby={errors.consent ? 'au-consent-err' : undefined}
              />
              <span>{t.consentReport}</span>
            </label>
            {errors.consent && <p className="au-error" id="au-consent-err">{errors.consent}</p>}

            <label className="au-check">
              <input
                type="checkbox"
                name="marketingOptIn"
                checked={marketingOptIn}
                onChange={e => setMarketingOptIn(e.target.checked)}
              />
              <span>{t.marketingOptIn}</span>
            </label>
          </div>

          {/* Hidden from people, irresistible to bots. */}
          <input
            type="text"
            name="website"
            value={honeypot}
            onChange={e => setHoneypot(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="au-honeypot"
          />

          {errors.form && (
            <p className="au-error au-error--form" role="alert" tabIndex={-1} ref={errorRef}>
              {errors.form}
            </p>
          )}

          <button type="submit" className="au-submit" disabled={status === 'sending'}>
            {status === 'sending' ? t.submitting : t.submit}
          </button>

          <p className="au-micro">{t.micro}</p>
        </form>
      </div>
    </main>
  )
}
