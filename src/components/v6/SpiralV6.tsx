'use client'

import Image from 'next/image'
import { useSquircle } from '@/hooks/useSquircle'

const MAIN_CARDS = [
  {
    num: '1',
    bg: '#68D68B',
    textColor: '#000',
    title: 'שלב האסטרטגיה',
    subtitle: 'נקודת ההתחלה',
    body: 'מתחילים עם הבנה עמוקה של המוצר, השוק והמטרות ומתרגמים את הכל לבריף חד שרצים עליו.',
    illus: '/spiral-horse.png',
    illusAlt: 'chess knight illustration',
  },
  {
    num: '2',
    bg: '#AA83EB',
    textColor: '#fff',
    title: 'שלב האיפיון',
    subtitle: 'איפיון UX אסטרטגי',
    body: 'מתחילים עם הבנה עמוקה של המוצר, השוק והמטרות ומתרגמים את הכל לבריף חד שרצים עליו.',
    illus: '/spiral-notes.png',
    illusAlt: 'UX notes illustration',
  },
  {
    num: '3',
    bg: '#FBDD7C',
    textColor: '#000',
    title: 'שלב הפרוטוטייפ',
    subtitle: 'עובד במהירות שיא',
    body: 'בשלב הזה מפסיקים לדמיין ומתחילים לראות. מקבלים פרוטוטייפ עובד שאפשר ללחוץ עליו, להרגיש אותו ולתת פידבק קונקרטי על משהו מוחשי.',
    illus: null,
    illusAlt: '',
  },
  {
    num: '4',
    bg: '#A6C4FA',
    textColor: '#000',
    title: 'שלב הפרוטוטייפ',
    subtitle: 'עובד במהירות שיא',
    body: 'בשלב הזה מפסיקים לדמיין ומתחילים לראות. מקבלים פרוטוטייפ עובד שאפשר ללחוץ עליו, להרגיש אותו ולתת פידבק קונקרטי על משהו מוחשי.',
    illus: '/spiral-rocket.png',
    illusAlt: 'rocket illustration',
  },
]

const STEPS = [
  {
    num: '7',
    title: 'שלב העיצוב',
    subtitle: 'מלבישים את המוצר שלכם',
    body: 'השלב המלהיב של העיצוב, בוא אנחנו מתרגמים את המסרים והאופי שלכם לשפה גרפית שמבליטה את האופי שלכם בכל פיקסל',
  },
  {
    num: '5',
    title: 'שלב פיתוח השפה',
    subtitle: 'הקול הייחודי של המותג שלכם',
    body: 'יוצקים לעסק אופי, צורת דיבור וקווים מנחים לכתיבה, כדי שהקהל שלכם לא רק יזהה אתכם, אלא הוא ירגיש שהוא מכיר אתכם ומאמין לכם.',
  },
  {
    num: '8',
    title: 'שלב הפיתוח',
    subtitle: 'מלווים את הפיתוח עד שאתם באוויר',
    body: 'אחרי העבודה הקשה, זה הזמן לוודא שהעיצוב וחוויית המשתמש מובנים נכון, עד שמה שיוצא לאוויר נראה בדיוק כמו מה שתכננו.',
  },
  {
    num: '6',
    title: 'שלב כתיבת התוכן',
    subtitle: 'המילים שמובילות את המוצר שלכם',
    body: 'כותבים את התוכן לאתר, הפלטפורמה או האפליקציה עם האופי המדויק של המותג שלכם. השפה מתכתבת עם האסטרטגיה והעיצוב.',
  },
]

type MainCard = typeof MAIN_CARDS[0]

function SpiralCard({ card, index }: { card: MainCard; index: number }) {
  const { ref, style: squircleStyle } = useSquircle(40, 0.6)
  return (
    <div
      ref={ref}
      className={`v6-spiral-card v6-spiral-card-${index + 1}`}
      style={{ background: card.bg, color: card.textColor, ...squircleStyle }}
    >
      <span className="v6-spiral-card-num">{card.num}</span>
      <div className="v6-spiral-card-text">
        <p className="v6-spiral-card-title">{card.title}</p>
        <p className="v6-spiral-card-subtitle">{card.subtitle}</p>
      </div>
      <p className="v6-spiral-card-body">{card.body}</p>
      {card.illus && (
        <div className="v6-spiral-card-illus">
          <Image src={card.illus} alt={card.illusAlt} fill style={{ objectFit: 'contain', objectPosition: 'center' }} />
        </div>
      )}
    </div>
  )
}

export default function SpiralV6() {
  return (
    <section className="v6-spiral" id="spiral">
      <div className="v6-container">
        {/* Heading */}
        <div className="v6-spiral-header">
          <h2 className="v6-spiral-title">
            הכירו את<br />
            <span className="bold">שיטת הספירלה</span>
          </h2>
          <p className="v6-spiral-sub">
            שכחו מתהליך לינארי. אנחנו עובדים במקביל, בסנכרון מלא, ומדייקים תוך כדי תנועה
          </p>
        </div>

        {/* Spiral canvas — SVG sets the height, cards overlay it */}
        <div className="v6-spiral-canvas">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="v6-spiral-svg" src="/spiral.svg" alt="" aria-hidden="true" />
          <div className="v6-spiral-top-grid">
            {MAIN_CARDS.map((card, i) => (
              <SpiralCard key={card.num} card={card} index={i} />
            ))}
          </div>
        </div>

        {/* "Don't stop at spec" section */}
        <div className="v6-spiral-more">
          <h3 className="v6-spiral-more-title">אל תעצרו באפיון...</h3>
          <p className="v6-spiral-more-sub">ככה אנחנו לוקחים אתכם עד שהמוצר חי, בועט ובאוויר</p>
        </div>

        {/* Steps 5–8 */}
        <div className="v6-spiral-steps">
          {STEPS.map(step => (
            <div key={step.num} className="v6-spiral-step">
              <div className="v6-spiral-step-header">
                <div className="v6-spiral-step-text">
                  <p className="v6-spiral-step-title">{step.title}</p>
                  <p className="v6-spiral-step-subtitle">{step.subtitle}</p>
                </div>
                <span className="v6-spiral-step-num">{step.num}</span>
              </div>
              <p className="v6-spiral-step-body">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
