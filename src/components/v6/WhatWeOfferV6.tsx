'use client'

import Image from 'next/image'

/* ── Wide cards (full-row, illustration + text) ── */
interface WideCard {
  id: string
  anchorLabel: string   // text shown in the anchor jump-link
  title: string         // \n = line break
  timing: string
  subtitle?: string
  desc: string          // \n\n = paragraph break
  tags: string[]
  imageSrc: string
  imageAlt: string
  /* CSS custom properties for illustration positioning */
  illusTop: number
  illusLeft: number
  illusWidth: number
  illusHeight: number
  wrapPaddingTop: number
}

const WIDE_CARDS: WideCard[] = [
  {
    id: 'offer-mvp',
    anchorLabel: 'מרעיון למוצר',
    title: 'מרעיון למוצר\nבמהירות הבזק',
    subtitle: 'מתחילים ומסיימים בספרינט',
    timing: 'עד 6 שבועות',
    desc: 'מתחילים מהאסטרטגיה. עוברים לאיפיון. מגיעים לפרוטוטייפ עובד שאפשר ללחוץ עליו, להרגיש אותו ולשנות אותו. יוצאים עם הכל מאושר, מתועד ומוכן לשלב הבא.',
    tags: ['אסטרטגיה', 'חווית משתמש', 'עיצוב ממשק', 'ייעוץ', 'הטמעת תהליכי AI'],
    imageSrc: '/space.png',
    imageAlt: 'מרעיון למוצר — אילוסטרציה',
    illusTop: 0, illusLeft: 0, illusWidth: 260, illusHeight: 320,
    wrapPaddingTop: 0,
  },
  {
    id: 'offer-upgrade',
    anchorLabel: 'שדרוג אתר',
    title: 'לשדרג את האתר הקיים',
    timing: '4-6 חודשים',
    desc: 'האתר הישן לא מייצג אתכם יותר. הגיע הזמן לקחת את האתר כמה רמות למעלה כדי שיתאים למטרות העסקיות, יחזק את המוניטין ויתמוך בגדילה שלכם.\n\nואם תרצו להשאיר אבק לתחרות... בזה אנחנו הכי טובים :)',
    tags: ['הטמעת תהליכי AI', 'ייעוץ', 'עיצוב ממשק', 'חווית משתמש', 'אסטרטגיה'],
    imageSrc: '/cleaning.png',
    imageAlt: 'לשדרג את האתר הקיים — אילוסטרציה',
    illusTop: 0, illusLeft: 0, illusWidth: 420, illusHeight: 280,
    wrapPaddingTop: 0,
  },
  {
    id: 'offer-marketing',
    anchorLabel: 'תשתית שיווקית',
    title: 'תשתית שיווקית\nשכל עסק צריך',
    timing: '1-2 חודשי הקמה',
    desc: 'אפשר לעבוד קשה, אנחנו מעדיפים לעבוד חכם 😜\n\nבונים לכם מסעות לקוח, אוטומציות ודשבורדים שמחליפים את העבודה הידנית.\n\nכדי שתוכלו סוף סוף לראות מה עובד וכמובן לקצור את הפירות...',
    tags: ['הטמעת תהליכי AI', 'ייעוץ', 'עיצוב ממשק', 'חווית משתמש', 'אסטרטגיה'],
    imageSrc: '/working.png',
    imageAlt: 'תשתית שיווקית — אילוסטרציה',
    illusTop: 0, illusLeft: 0, illusWidth: 380, illusHeight: 254,
    wrapPaddingTop: 0,
  },
  {
    id: 'offer-newsite',
    anchorLabel: 'אתר למותג חדש',
    title: 'אתר למותג\nחדש דנדש',
    timing: '4-6 חודשים',
    desc: 'המותג שלכם צריך אתר שיגרום לכם להיות זכירים ויניע לפעולה...\nאהבנו את האתגר! בונים לכם אתר מהאסטרטגיה ועד הפיקסל האחרון! מהיר, מדויק, מוכן לאוויר.\n\nאם כבר אתר, אז אצל הלוטרות.\nכי הרושם הראשוני לא מגיע פעמיים :)',
    tags: ['הטמעת תהליכי AI', 'ייעוץ', 'עיצוב ממשק', 'חווית משתמש', 'אסטרטגיה'],
    imageSrc: '/holding.png',
    imageAlt: 'אתר למותג חדש — אילוסטרציה',
    illusTop: 0, illusLeft: 0, illusWidth: 340, illusHeight: 227,
    wrapPaddingTop: 0,
  },
]

/* ── Reusable wide card ── */
function WideOfferCard({ card }: { card: WideCard }) {
  const titleLines = card.title.split('\n')
  const descParts = card.desc.split('\n\n')

  return (
    <div id={card.id} className="v6-offer-mvp-wrap" style={{ paddingTop: card.wrapPaddingTop }}>
      <div className="v6-offer-card v6-offer-card--mvp">
        <div className="v6-offer-mvp-row">

          {/* Text column — first in DOM = right in RTL */}
          <div className="v6-offer-mvp-body">
            <h3 className="v6-offer-mvp-title">
              {titleLines.map((line, i) => (
                <span key={i}>{line}{i < titleLines.length - 1 && <br />}</span>
              ))}
            </h3>
            {card.subtitle && <p className="v6-offer-mvp-sub">{card.subtitle}</p>}
            <span className="v6-offer-timing v6-offer-timing--mvp">{card.timing}</span>
            <div className="v6-offer-desc">
              {descParts.map((part, i) => (
                <p key={i} style={{ margin: i > 0 ? '8px 0 0' : 0 }}>{part}</p>
              ))}
            </div>
          </div>

          {/* Illustration column — second in DOM = left in RTL */}
          <div className="v6-offer-mvp-illus-col">
            <div
              className="v6-offer-mvp-illus"
              style={{
                top: card.illusTop,
                left: card.illusLeft,
                width: card.illusWidth,
                height: card.illusHeight,
              }}
            >
              <Image
                src={card.imageSrc}
                alt={card.imageAlt}
                fill
                style={{ objectFit: 'contain', objectPosition: 'center center' }}
              />
            </div>
          </div>
        </div>

        {/* Tags strip */}
        <div className="v6-offer-mvp-tags">
          {card.tags.map((tag, i) => (
            <span key={tag} className="v6-offer-mvp-tag-item">
              <span className="v6-offer-mvp-tag">{tag}</span>
              {i < card.tags.length - 1 && (
                <span className="v6-offer-mvp-star" aria-hidden="true">★</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── Section ── */
export default function WhatWeOfferV6() {
  return (
    <section className="v6-offer" id="offer">
      <div className="v6-container">
        <h2 className="v6-section-heading" style={{ marginBottom: 28 }}>
          <span className="bold">אז... מה בא לכם שנעשה יחד?</span>
        </h2>

        {/* Anchor jump-links — one per card */}
        <div className="v6-offer-anchors">
          {WIDE_CARDS.map(card => (
            <a key={card.id} href={`#${card.id}`} className="v6-offer-anchor-btn">
              {card.anchorLabel}
            </a>
          ))}
        </div>

        <div className="v6-offer-grid">
          {WIDE_CARDS.map(card => (
            <WideOfferCard key={card.id} card={card} />
          ))}
        </div>
      </div>
    </section>
  )
}
