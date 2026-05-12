'use client'

const TESTIMONIALS = [
  {
    color: 'blue',
    quote: 'זוהי המלצה בגודל טקסט קטן, על מנת לתת מקום להרבה יותר פרטים ומילים שהיוזרים יכולו לקרוא קצת יותר על ההמלצה ולהבין את התחושות.',
    name: 'שם פרטי ומשפחה',
    role: 'עיסוק ו/או תפקיד',
    avatar: '😊',
  },
  {
    color: 'yellow',
    quote: 'זוהי המלצה בגודל טקסט גדול יותר מירבי ולא ארוכה במיוחד לכתיבה',
    name: 'שם פרטי ומשפחה',
    role: 'עיסוק ו/או תפקיד',
    avatar: '😊',
  },
  {
    color: 'green',
    quote: 'זוהי המלצה בגודל טקסט קטן, על מנת לתת מקום להרבה יותר פרטים ומילים שהיוזרים יכולו לקרוא קצת יותר על ההמלצה ולהבין את התחושות.',
    name: 'שם פרטי ומשפחה',
    role: 'עיסוק ו/או תפקיד',
    avatar: '😊',
  },
  {
    color: 'peach',
    quote: 'זוהי המלצה בגודל טקסט קטן, על מנת לתת מקום להרבה יותר פרטים ומילים שהיוזרים יכולו לקרוא.',
    name: 'שם פרטי ומשפחה',
    role: 'עיסוק ו/או תפקיד',
    avatar: '😊',
  },
  {
    color: 'purple',
    quote: 'זוהי המלצה בגודל טקסט גדול יותר מירבי ולא ארוכה במיוחד לכתיבה',
    name: 'שם פרטי ומשפחה',
    role: 'עיסוק ו/או תפקיד',
    avatar: '😊',
  },
]

export default function TestimonialsV6() {
  return (
    <section className="v6-testimonials">
      <h2 className="v6-testimonials-title">היה לנו כייף לעבוד ביחד</h2>
      <div className="v6-t-track">
        {TESTIMONIALS.map((t, i) => (
          <div key={i} className={`v6-tcard ${t.color}`}>
            <div className="v6-tcard-quote">{t.quote}</div>
            <div className="v6-tcard-author">
              <div className="v6-tcard-avatar">{t.avatar}</div>
              <div>
                <div className="v6-tcard-name">{t.name}</div>
                <div className="v6-tcard-role">{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
