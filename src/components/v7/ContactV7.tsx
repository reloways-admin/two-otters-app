'use client'

import { useState } from 'react'
import { debug } from '@/lib/debug'
import en from '@/locales/v7-en.json'

type ContactT = typeof en.contact

export default function ContactV7({ t }: { t: ContactT }) {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', company: '', role: '', message: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [honeypot, setHoneypot] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/forms/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...form, website: honeypot }),
      })
      const data = await res.json().catch(() => null)
      if (!res.ok || !data?.ok) throw new Error(data?.error ?? `server responded ${res.status}`)
      setStatus('success')
      setForm({ name: '', email: '', phone: '', company: '', role: '', message: '' })
    } catch (err) {
      debug('Contact form submit failed:', err)
      setStatus('error')
    }
  }

  return (
    <section className="v7-contact" id="contact">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/background-stone.svg" alt="" className="v7-contact-stone" aria-hidden="true" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/path-stroke.svg" alt="" className="v7-contact-path" aria-hidden="true" />

      <div className="v7-container v7-contact-inner">
        <div className="v7-contact-heading">
          <h2 className="v7-contact-title">{t.title}</h2>
          <p className="v7-contact-sub">{t.sub}</p>
        </div>

        <form className="v7-contact-card" onSubmit={handleSubmit}>
          {/* Hidden from people, irresistible to bots. The server answers a
              filled-in one as if it worked and records nothing. */}
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
          <div className="v7-form-row">
            <input className="v7-field" name="name" placeholder={t.namePlaceholder} value={form.name} onChange={handleChange} required />
            <input className="v7-field" name="email" type="email" placeholder={t.emailPlaceholder} value={form.email} onChange={handleChange} required />
          </div>
          <div className="v7-form-row">
            <input className="v7-field" name="company" placeholder={t.companyPlaceholder} value={form.company} onChange={handleChange} />
            <input className="v7-field" name="phone" placeholder={t.phonePlaceholder} value={form.phone} onChange={handleChange} />
          </div>
          <input className="v7-field" name="role" placeholder={t.rolePlaceholder} value={form.role} onChange={handleChange} />
          <textarea
            className="v7-field v7-field--textarea"
            name="message"
            placeholder={t.messagePlaceholder}
            value={form.message}
            onChange={handleChange}
            required
          />
          <button type="submit" className="v7-contact-btn" disabled={status === 'sending'}>
            {status === 'sending' ? t.sendingBtn : t.submitBtn}
          </button>
          {status === 'success' && (
            <p className="v7-contact-status v7-contact-status--success" role="status">{t.successMsg}</p>
          )}
          {status === 'error' && (
            <p className="v7-contact-status v7-contact-status--error" role="alert">{t.errorMsg}</p>
          )}
        </form>

        <div className="v7-contact-trust">
          {t.trust.map(item => (
            <div key={item} className="v7-contact-trust-item">
              <span className="v7-contact-trust-check">✓</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
