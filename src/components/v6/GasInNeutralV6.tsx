'use client'

import Image from 'next/image'
import { useSquircle } from '@/hooks/useSquircle'

type Card = {
  color: string
  title: string
  body: string
  image?: string
  imagePosition?: string
  icon?: string
}

const CARDS: Card[] = [
  {
    color: 'yellow',
    title: 'אנחנו לא סטודיו AI',
    body: 'כן. אנחנו משתמשים בכלים של בינה מלאכותית. אבל כל אחד יכול להריץ פרומפט. לא כולם יודעים לשאול את השאלות הנכונות. לשלב. לבשל. הנה — אנחנו כן.',
    image: '/not-an-ai-studio-sketch.png',
    imagePosition: 'right bottom',
  },
  {
    color: 'blue',
    title: 'תשכחו מחודשים מתישים של אפיון',
    body: 'אתם מקבלים פרוטוטייפ עובד תוך שבועות בודדים, כדי שתוכלו "להרגיש" את השימוש במוצר שלכם לפני עיצוב ופיתוח.',
    image: '/forget-sketch.png',
    imagePosition: 'bottom center',
  },
  {
    color: 'purple',
    title: "מתרגמים ויז'ן למוצר עובד",
    body: 'זה הסופר-פאואר שלנו. באים מוכנים עם שאלות, רפרנסים ותשובות — ועוזרים לכם לתרגם את מה שדמיינתם למוצר עובד.',
    image: '/super-power-sketch.png',
    imagePosition: 'bottom center',
  },
  {
    color: 'green',
    title: 'לא פחות מפיקסל פרפקט',
    body: 'פרוטוטייפ מאושר. תיעוד מסודר. ארכיטקטורה נכונה. הכל ברור ומדויק לרמת הפיקסל, כדי שתוכלו לקחת את הפרוטוטייפ לשלב הבא.',
    image: '/tetris-sketch.png',
    imagePosition: 'bottom center',
  },
]

const BG: Record<string, string> = {
  yellow: '#FFC200',
  blue:   '#5A93FF',
  purple: '#8242EA',
  green:  '#13D04F',
}

function GasCard({ card }: { card: Card }) {
  const { ref, style: squircleStyle } = useSquircle(64, 0.6)

  return (
    <div
      ref={ref}
      className={`v6-gas-card ${card.color}`}
      style={{ background: BG[card.color], ...squircleStyle }}
    >
      <div className="v6-gas-card-title">{card.title}</div>
      <div className="v6-gas-card-body">{card.body}</div>
      {card.image ? (
        <div className="v6-gas-illus v6-gas-illus-img">
          <Image
            src={card.image}
            alt=""
            fill
            style={{ objectFit: 'contain', objectPosition: card.imagePosition ?? 'bottom center' }}
          />
        </div>
      ) : (
        <div className="v6-gas-illus">{card.icon ?? null}</div>
      )}
    </div>
  )
}

export default function GasInNeutralV6() {
  return (
    <section className="v6-gas" id="process">
      <Image
        src="/background-sketch1.png"
        alt=""
        fill
        aria-hidden="true"
        style={{ objectFit: 'cover', objectPosition: 'center' }}
      />
      <div className="v6-container" style={{ position: 'relative', zIndex: 1 }}>
        <h2 className="v6-section-heading">
          להיות פול גז בניוטרל
          <br />
          <span className="bold">
            <span className="underline">זה כבר לא אתם.</span>
          </span>
        </h2>
        <p className="v6-section-sub">
          השיטה שלנו מקצרת את הדרך מרעיון לפרוטוטייפ עובד ומאפשרת לכם להגיע למוצר מדויק יותר — מהר יותר.
        </p>

        <div className="v6-gas-grid">
          {CARDS.map(card => (
            <GasCard key={card.title} card={card} />
          ))}
        </div>
      </div>
    </section>
  )
}
