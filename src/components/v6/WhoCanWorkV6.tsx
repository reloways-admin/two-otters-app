'use client'

import Image from 'next/image'

const EYES = ['/eyes-v01.png', '/eyes-v02.png', '/eyes-v03.png', '/eyes-v02.png']

const NO_LIST = [
  'מחפשים ספק ביצוע בלבד, בלי חשיבה',
  'בא לכם ״שגר ושכח״ ואין לכם זמן להיות חלק',
  'בתכלס, לא חשבתם מה באמת הייתם רוצים',
  'מבחינתכם עיצוב גנרי מטמפלט זה סבבה',
  '״תקציב? לא חשבנו על זה...״',
]

const YES_LIST = [
  'יש לכם רעיון ומחפשים מישהו שיתרגם אותו החוצה',
  'ברור לכם שחלק מההצלחה זה הפידבק וההכוונה שלכם',
  'מבינים שאסטרטגיה היא חלק בלתי נפרד מהמוצר',
  'מתחשקת לכם חוויה חיובית עם נותני שירות',
  'הגדרתם תקציב ברור לתהליך פרמיום',
]

const PERSONAS = [
  {
    icon: '/mobile.svg',
    title: 'בא לכם לראות,\nלפני שמתחייבים',
    desc: 'התהליך האפיוני שלנו מהיר ואתם מקבלים פרוטוטייפ שעובד וקל לשנות',
  },
  {
    icon: '/a-to-b.svg',
    title: 'חשוב לכם לעבוד עם ספק אחד שלוקח אחריות',
    desc: 'אנחנו מספקים לכם את כל החוויה מהרעיון עד העלייה לאוויר. אין צורך לנהל 10 אנשים',
  },
  {
    icon: '/lightning.svg',
    title: 'החלום שלכם שהתהליך\nלא יקח שנה',
    desc: 'שלבי העבודה והתהליכים שלנו קצרים בחודשים ממה שמקובל. זה לא בא על חשבון האיכות...',
  },
  {
    icon: '/stamp.svg',
    title: 'נמאס לכם\nמחובבנים ושרלטנים',
    desc: 'באחריות - אתם תקבלו את מה ששילמתם עליו ותאהבו את התוצאה. זו המומחיות שלנו',
  },
  {
    icon: '/target.svg',
    title: 'רוצים להישאר רלוונטים,\nאבל לא ברור איך...',
    desc: 'בין כל הטרנדים והטכנולוגיות, נעזור לכם להבין מה הכי מתאים כדי שתשארו רלוונטים',
  },
]

/* One repeating unit: text + eye images */
function MarqueeUnit() {
  return (
    <>
      <span className="v6-marquee-text">איזו לוטרה אתה?</span>
      {EYES.map((src, i) => (
        <span key={i} className="v6-marquee-eye">
          <Image src={src} alt="" width={36} height={36} style={{ objectFit: 'contain' }} />
        </span>
      ))}
    </>
  )
}

export default function WhoCanWorkV6() {
  const units = Array.from({ length: 8 })

  return (
    <section className="v6-who" id="who">
      {/* Blue ticker marquee */}
      <div className="v6-marquee-strip">
        <div className="v6-marquee-inner">
          {units.map((_, i) => <MarqueeUnit key={i} />)}
          {units.map((_, i) => <MarqueeUnit key={`b${i}`} />)}
        </div>
      </div>

      <div className="v6-who-body">
        <div className="v6-container">
          <h2 className="v6-who-title">
            אם זה נשמע כמוכם,<br />
            כנראה שנעבוד טוב ביחד
          </h2>

          {/* Match cards */}
          <div className="v6-match-grid">
            {/* It's a match — green card (right in RTL) */}
            <div className="v6-match-card-wrap">
              <div className="v6-match-card yes">
                <div className="v6-match-illus">
                  <Image
                    src="/its-a-match.png"
                    alt="It's a match — מתאים לנו"
                    fill
                    style={{ objectFit: 'contain', objectPosition: 'bottom center' }}
                  />
                </div>
                <ul className="v6-match-list">
                  {YES_LIST.map(item => (
                    <li key={item}>
                      <span className="v6-match-icon-wrap">
                        <Image src="/checkmark.png" alt="✓" width={22} height={22} />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Not a match — red card (left in RTL) */}
            <div className="v6-match-card-wrap">
              <div className="v6-match-card no">
                <div className="v6-match-illus">
                  <Image
                    src="/swipe-left.png"
                    alt="Swipe left — לא מתאים לנו"
                    fill
                    style={{ objectFit: 'contain', objectPosition: 'bottom center' }}
                  />
                </div>
                <ul className="v6-match-list">
                  {NO_LIST.map(item => (
                    <li key={item}>
                      <span className="v6-match-icon-wrap">
                        <Image src="/crossmark.png" alt="✗" width={22} height={22} />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Personas */}
          <h3 className="v6-personas-title">מתי פונים אלינו?</h3>
          <div className="v6-personas-grid">
            {PERSONAS.map(p => (
              <div key={p.title} className="v6-persona-card">
                <div className="v6-persona-icon">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.icon} alt="" className="v6-persona-icon-img" />
                </div>
                <div className="v6-persona-title">
                  {p.title.split('\n').map((line, i, arr) => (
                    <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
                  ))}
                </div>
                <div className="v6-persona-text">{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
