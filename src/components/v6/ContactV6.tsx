'use client'

import { useState } from 'react'

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
      {/* Decorative squiggles */}
      <svg className="v6-contact-deco" style={{ top: '10%', right: '-60px' }} width="200" height="200" viewBox="0 0 200 200" fill="none" aria-hidden="true">
        <path d="M 180 100 C 160 40, 100 160, 80 100 C 60 40, 20 120, 10 80" stroke="#C4B5FD" strokeWidth="3" strokeLinecap="round" fill="none"/>
      </svg>
      <svg className="v6-contact-deco" style={{ bottom: '10%', left: '-40px' }} width="160" height="160" viewBox="0 0 160 160" fill="none" aria-hidden="true">
        <path d="M 20 80 C 40 20, 100 140, 130 60 C 145 30, 150 100, 155 80" stroke="#C4B5FD" strokeWidth="3" strokeLinecap="round" fill="none"/>
      </svg>

      <div className="v6-container">
        <h2 className="v6-contact-title">יש לכם ויז'ן? מעולה.</h2>
        <p className="v6-contact-sub">
          ספרו לנו קצת על מה שאתם בונים ונחזור אליכם תוך 48 שעות.
        </p>

        <form className="v6-contact-form" onSubmit={handleSubmit}>
          <div className="v6-form-row">
            <input
              className="v6-input"
              name="name"
              placeholder="שם מלא"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              className="v6-input"
              name="email"
              type="email"
              placeholder="אימייל"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="v6-form-row">
            <input
              className="v6-input"
              name="phone"
              placeholder="טלפון"
              value={form.phone}
              onChange={handleChange}
            />
            <input
              className="v6-input"
              name="company"
              placeholder="שם החברה / הפרויקט"
              value={form.company}
              onChange={handleChange}
            />
          </div>
          <div className="v6-form-field">
            <input
              className="v6-input"
              name="role"
              placeholder="מה התפקיד שלכם?"
              value={form.role}
              onChange={handleChange}
            />
          </div>
          <div className="v6-form-field">
            <textarea
              className="v6-textarea"
              name="message"
              placeholder="ספרו לנו בקצרה — מה אתם בונים ומה הכאב הכי גדול שלכם?"
              value={form.message}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="v6-form-submit">
            דברו איתנו
          </button>
        </form>
      </div>
    </section>
  )
}
