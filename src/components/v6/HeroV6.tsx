'use client'

import Image from 'next/image'

export default function HeroV6() {
  return (
    <section className="v6-hero" id="why">
      <div className="v6-hero-text">
        <h1 className="v6-hero-title">
          הדרך הכי קצרה
          <span className="bold">
            מרעיון{' '}
            <span className="v6-hero-underline">למוצר</span>
          </span>
        </h1>
        <p className="v6-hero-sub">
          מתחילים מפרוטוטייפ שאפשר ללחוץ עליו, להרגיש אותו ולשנות אותו.
        </p>
        <p className="v6-hero-bold">
          רק כשזה מדויק — יוצאים לעיצוב ופיתוח
        </p>
      </div>

      <div className="v6-hero-flow">
        <Image
          src="/hero-sketch-v02.png"
          alt="הדרך מרעיון למוצר — המחשה"
          fill
          priority
          style={{ objectFit: 'contain', objectPosition: 'top right' }}
        />
      </div>
    </section>
  )
}
