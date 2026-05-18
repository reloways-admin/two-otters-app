'use client'

import { useState } from 'react'
import en from '@/locales/v6-en.json'

type ContactT = typeof en.contact

export default function ContactV6({ t }: { t: ContactT }) {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', company: '', role: '', message: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    window.location.href = `mailto:hello@twootters.studio?subject=${t.emailSubjectPrefix} ${form.name}&body=${encodeURIComponent(
      `${t.emailLabels.name}: ${form.name}\n${t.emailLabels.email}: ${form.email}\n${t.emailLabels.phone}: ${form.phone}\n${t.emailLabels.company}: ${form.company}\n${t.emailLabels.role}: ${form.role}\n\n${form.message}`
    )}`
  }

  return (
    <section className="v6-contact" id="contact">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/background-stone.svg" alt="" className="v6-contact-stone" aria-hidden="true" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/path-stroke.svg" alt="" className="v6-contact-path" aria-hidden="true" />

      <div className="v6-container v6-contact-inner">
        <div className="v6-contact-heading">
          <h2 className="v6-contact-title">{t.title}</h2>
          <p className="v6-contact-sub">{t.sub}</p>
        </div>

        <form className="v6-contact-card" onSubmit={handleSubmit}>
          <div className="v6-form-row">
            <input className="v6-field" name="name" placeholder={t.namePlaceholder} value={form.name} onChange={handleChange} required />
            <input className="v6-field" name="email" type="email" placeholder={t.emailPlaceholder} value={form.email} onChange={handleChange} required />
          </div>
          <div className="v6-form-row">
            <input className="v6-field" name="company" placeholder={t.companyPlaceholder} value={form.company} onChange={handleChange} />
            <input className="v6-field" name="phone" placeholder={t.phonePlaceholder} value={form.phone} onChange={handleChange} />
          </div>
          <input className="v6-field" name="role" placeholder={t.rolePlaceholder} value={form.role} onChange={handleChange} />
          <textarea
            className="v6-field v6-field--textarea"
            name="message"
            placeholder={t.messagePlaceholder}
            value={form.message}
            onChange={handleChange}
            required
          />
          <button type="submit" className="v6-contact-btn">{t.submitBtn}</button>
        </form>

        <div className="v6-contact-trust">
          {t.trust.map(item => (
            <div key={item} className="v6-contact-trust-item">
              <span>{item}</span>
              <span className="v6-contact-trust-check">✓</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
