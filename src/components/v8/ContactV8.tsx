'use client'

import { useState } from 'react'
import en from '@/locales/v8-en.json'

type ContactT = typeof en.contact

export default function ContactV8({ t }: { t: ContactT }) {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', company: '', role: '', message: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
          subject: `${t.emailSubjectPrefix} ${form.name}`,
          from_name: form.name,
          // Sender's email — Web3Forms sets this as the reply-to so you can reply directly.
          email: form.email,
          [t.emailLabels.name]: form.name,
          [t.emailLabels.email]: form.email,
          [t.emailLabels.phone]: form.phone,
          [t.emailLabels.company]: form.company,
          [t.emailLabels.role]: form.role,
          message: form.message,
        }),
      })
      if (!res.ok) throw new Error(`Web3Forms responded ${res.status}`)
      setStatus('success')
      setForm({ name: '', email: '', phone: '', company: '', role: '', message: '' })
    } catch (err) {
      console.error('Contact form submit failed:', err)
      setStatus('error')
    }
  }

  return (
    <section className="v8-contact" id="contact">
      {/* Navy "BG glow" curve — a background layer the form/trust sit on top of */}
      <div className="v8-contact-wave" aria-hidden="true" />

      <div className="v8-container v8-contact-inner">
        {/* Standing photo — overlaps the form from the left */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/contact-photo.jpg" alt={t.photoAlt} className="v8-contact-photo" />

        <div className="v8-contact-right">
          <div className="v8-contact-heading">
            <h2 className="v8-contact-title">{t.title}</h2>
            <p className="v8-contact-sub">{t.sub}</p>
          </div>

          <form className="v8-contact-card" onSubmit={handleSubmit}>
          <div className="v8-form-row">
            <input className="v8-field" name="name" placeholder={t.namePlaceholder} value={form.name} onChange={handleChange} required />
            <input className="v8-field" name="email" type="email" placeholder={t.emailPlaceholder} value={form.email} onChange={handleChange} required />
          </div>
          <div className="v8-form-row">
            <input className="v8-field" name="company" placeholder={t.companyPlaceholder} value={form.company} onChange={handleChange} />
            <input className="v8-field" name="phone" placeholder={t.phonePlaceholder} value={form.phone} onChange={handleChange} />
          </div>
          <input className="v8-field" name="role" placeholder={t.rolePlaceholder} value={form.role} onChange={handleChange} />
          <textarea
            className="v8-field v8-field--textarea"
            name="message"
            placeholder={t.messagePlaceholder}
            value={form.message}
            onChange={handleChange}
            required
          />
          <button type="submit" className="v8-contact-btn" disabled={status === 'sending'}>
            {status === 'sending' ? t.sendingBtn : t.submitBtn}
          </button>
          {status === 'success' && (
            <p className="v8-contact-status v8-contact-status--success" role="status">{t.successMsg}</p>
          )}
          {status === 'error' && (
            <p className="v8-contact-status v8-contact-status--error" role="alert">{t.errorMsg}</p>
          )}
          </form>

          <div className="v8-contact-trust">
            {t.trust.map(item => (
              <div key={item} className="v8-contact-trust-item">
                <span className="v8-contact-trust-check">✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
