'use client'

export default function HeroV6() {
  return (
    <section className="v6-hero" id="why">
      <div className="v6-hero-text">
        <h1 className="v6-hero-title">
          הדרך הכי קצרה
          <span className="bold">
            מרעיון{' '}
            <span className="v6-hero-underline">
              למוצר
              <svg
                className="v6-hero-swoosh"
                width="221" height="18" viewBox="0 0 221 18"
                fill="none" xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  className="v6-swoosh-path"
                  d="M214.5 8.5C179.833 5.16666 74.2 2.89994 5 8.49994"
                  stroke="#BAB4FA" strokeWidth="8" strokeLinecap="round"
                  pathLength="1"
                />
              </svg>
            </span>
          </span>
        </h1>
        <p className="v6-hero-desc">
          מתחילים מפרוטוטייפ שאפשר ללחוץ עליו, להרגיש אותו ולשנות אותו.{' '}
          <strong>רק כשזה מדויק - יוצאים לעיצוב ופיתוח</strong>
        </p>
      </div>

      {/* Illustration with floating tags */}
      <div className="v6-hero-flow">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero-v04.svg"
          alt="הדרך מרעיון למוצר — המחשה"
          className="v6-hero-svg"
        />
        {/* Floating person tags */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/amir-tag.svg"  alt="אמיר" className="v6-hero-tag v6-hero-tag--amir"  aria-hidden="true" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/keren-tag.svg" alt="קרן"  className="v6-hero-tag v6-hero-tag--keren" aria-hidden="true" />
      </div>
    </section>
  )
}
