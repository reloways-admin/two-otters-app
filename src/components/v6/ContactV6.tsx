'use client'

import { useState } from 'react'

const TRUST_ITEMS = ['ללא התחייבות', 'שיחה ראשונה בחינם', 'מענה תוך 48 שעות']

export default function ContactV6() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', company: '', role: '', message: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    window.location.href = `mailto:hello@twootters.studio?subject=פנייה מהאתר — ${form.name}&body=${encodeURIComponent(
      `שם: ${form.name}\nאימייל: ${form.email}\nטלפון: ${form.phone}\nחברה: ${form.company}\nתפקיד: ${form.role}\n\n${form.message}`
    )}`
  }

  return (
    <section className="v6-contact" id="contact">
      {/* Curvy dark stone — creates the dark wave blending into footer */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/background-stone.svg" alt="" className="v6-contact-stone" aria-hidden="true" />
      {/* Decorative stroke path */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/path-stroke.svg" alt="" className="v6-contact-path" aria-hidden="true" />

      <div className="v6-container v6-contact-inner">
        {/* Heading */}
        <div className="v6-contact-heading">
          <h2 className="v6-contact-title">יש לכם ויז׳ן? מעולה.</h2>
          <p className="v6-contact-sub">ספרו לנו קצת על מה שאתם בונים ונחזור אליכם תוך 48 שעות.</p>
        </div>

        {/* Form card */}
        <form className="v6-contact-card" onSubmit={handleSubmit}>
          <div className="v6-form-row">
            <input className="v6-field" name="name" placeholder="שם מלא" value={form.name} onChange={handleChange} required />
            <input className="v6-field" name="email" type="email" placeholder="אימייל" value={form.email} onChange={handleChange} required />
          </div>
          <div className="v6-form-row">
            <input className="v6-field" name="company" placeholder="שם החברה / הפרויקט" value={form.company} onChange={handleChange} />
            <input className="v6-field" name="phone" placeholder="טלפון" value={form.phone} onChange={handleChange} />
          </div>
          <input className="v6-field" name="role" placeholder="מה התפקיד שלכם?" value={form.role} onChange={handleChange} />
          <textarea
            className="v6-field v6-field--textarea"
            name="message"
            placeholder="ספרו לנו בקצרה — מה אתם בונים ומה הכאב הכי גדול שלכם?"
            value={form.message}
            onChange={handleChange}
            required
          />
          <button type="submit" className="v6-contact-btn">דברו איתנו</button>
        </form>

        {/* Trust items */}
        <div className="v6-contact-trust">
          {TRUST_ITEMS.map(item => (
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
