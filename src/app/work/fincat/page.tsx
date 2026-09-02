'use client'

import { useEffect } from 'react'
import NavV8 from '@/components/v8/NavV8'
import ContactV8 from '@/components/v8/ContactV8'
import FooterV8 from '@/components/v8/FooterV8'
import he from '@/locales/v8-he.json'
import '../../v8/styles.css'
import './case.css'

const HOME = '/'

/** Hero stat cells, right-to-left as they read in the design. */
const STATS = [
  { label: 'קהל',              value: '137%',   note: 'צמיחת קהל  -  52K → 123K' },
  { label: 'אוטוציה',          value: '5',      note: 'משפכים אוטומטיים' },
  { label: 'זמן לעלייה לאוויר', value: '5 חוד׳', note: 'מאפיון להשקה' },
]

/** The project-meta row under the hero image, same right-to-left order. */
const META = [
  { label: 'שירותים', note: 'אסטרטגיה שיווקית · מיתוג מחדש · אפיון וכתיבת אתר · סיסטם שיווקי · ניהול פרויקט' },
  { label: 'תוצרים',  note: 'בסיס מותגי · אתר פורטל תוכן · משפכים ואוטומציות · מצגות · קלפי משחק · מדריכים · קורסים דיגיטליים' },
  { label: 'תחום',    note: 'פינטק · מרקטפלייס פיננסי' },
]

/* The Figma repeats this block verbatim under both "האסטרטגיה" and
   "השפה הויזואלית", so it is written once and rendered twice. */
const STRATEGY_COPY = [
  'משם עברנו לדיוק הקהל. לחתול פיננסי יש יותר מקהל יעד אחד, אז חילקנו את הפרסונות למשפכים נפרדים. כל אחד עם שפה, דוגמאות ומגנטים משלו, כדי שכל מסר יפגוש את האדם הנכון שהמותג יכול לעזור לו.',
  'על הבסיס הזה בנינו תשתית שיווקית מודולרית. משפכים חכמים שמתחילים במוצר מתנה ומבשילים להצעה, אוטומציות שנדלקות בלחיצת כפתור, וחיבור לנתונים שמאפשר לחזור ולדייק את הנראות, המסרים והקריאה לפעולה - בזמן אמת.',
  'לפני שנגענו בפיקסל אחד, נכנסנו לראש של המותג. הגדרנו שלוש מטרות שעבדנו עליהן במקביל: הגדלת קהל, שיפור מכירות וחיזוק האמון.',
  'בנינו סביבן אסטרטגיה אחת שמשרתת את שלושתן, עם עוגנים שיעזרו למותג להשתמש בכל החומרים ולשכפל את העבודה בצורה עקבית.',
]

function Facts({ items, variant }: {
  items: { label: string; value?: string; note: string }[]
  variant?: 'meta'
}) {
  return (
    <div className={`fc-facts${variant === 'meta' ? ' fc-facts--meta' : ''}`}>
      {items.map(item => (
        <div key={item.label} className="fc-fact">
          <span className="fc-fact-label">{item.label}</span>
          {item.value && <span className="fc-fact-value">{item.value}</span>}
          <span className="fc-fact-note">{item.note}</span>
        </div>
      ))}
    </div>
  )
}

/** A heading column plus body copy — the page's repeating text block. */
function Prose({ kicker, title, paragraphs, dark, bare }: {
  kicker?: string
  title: string
  paragraphs: React.ReactNode[]
  dark?: boolean
  /** Inside an already-padded dark section, drop the background and padding. */
  bare?: boolean
}) {
  return (
    <section className={`fc-prose${dark ? ' fc-prose--dark' : ''}`}>
      <div className={bare ? undefined : 'fc-container'}>
        <div className="fc-prose-inner">
          <div className="fc-prose-heading">
            {kicker && <p className="fc-prose-kicker">{kicker}</p>}
            <h2 className="fc-prose-title">{title}</h2>
          </div>
          <div className="fc-prose-body">
            {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </div>
      </div>
    </section>
  )
}

function Band({ src, alt }: { src: string; alt: string }) {
  return (
    <section className="fc-band">
      <div className="fc-container">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} loading="lazy" />
      </div>
    </section>
  )
}

export default function FinCatCaseStudy() {
  useEffect(() => {
    const bar = document.querySelector<HTMLElement>('.fc-progress')
    if (!bar) return
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      bar.style.width = max > 0 ? `${(window.scrollY / max) * 100}%` : '0%'
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <main className="fc" dir="rtl" lang="he">
      <div className="fc-progress" aria-hidden="true" />

      <NavV8 t={he.nav} lang="he" onLangChange={() => {}} hrefPrefix={HOME} />

      {/* ── Hero ── */}
      <section className="fc-hero">
        <div className="fc-container">
          <div className="fc-hero-head">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/fincat/cs/logo.svg" alt="חתול פיננסי" className="fc-hero-logo" />
            <h1 className="fc-hero-title">מקהילה לעסק</h1>
          </div>

          <Facts items={STATS} />

          <div className="fc-hero-figure">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/fincat/cs/hero.webp"
              alt="אתר חתול פיננסי על מסך מחשב נייד"
              fetchPriority="high"
            />
          </div>

          <Facts items={META} variant="meta" />
        </div>
      </section>

      {/* ── Overview ── */}
      <Prose
        title="סקירה כללית"
        paragraphs={[
          <>
            <b>חתול פיננסי</b>{' הוא מותג ותיק בעולם הפיננסי. קהילה שרצתה להפוך למותג ולבנות מרקטפלייס של יועצים ונותני שירות. הם הבינו שהם צריכים להיראות ולעבוד כמו עסק.'}
          </>,
          'ניגשנו אליו כמו למותג חדש. בנינו בסיס מותגי מאפס, תרגמנו אותו לשפה ויזואלית מרעננת, והקמנו סביבו תשתית שיווקית חכמה.',
          'אסטרטגיה ועיצוב רצו במקביל, כך שהחזון של עדי ודב נודל הפך למשהו שאפשר לראות, להשתמש ולהרוויח ממנו.',
        ]}
      />

      <Band src="/fincat/cs/overview.webp" alt="עמוד תוצאות ההשוואה של חתול פיננסי" />

      {/* ── Strategy ── */}
      <Prose title="האסטרטגיה" paragraphs={STRATEGY_COPY} />

      {/* ── Marketing materials (dark, with two supporting columns) ── */}
      <section className="fc-materials">
        <div className="fc-container">
          <Prose
            bare
            title="חומרים שיווקיים"
            paragraphs={['בניית חומרים שיווקיים כמו דפי נחיתה, סיקוונס מיילים, מדריכים והעברתם לשיווק ממומן, מעבר SEO, פיתוח ועוד...']}
          />

          <div className="fc-materials-figure">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/fincat/cs/materials.webp" alt="חומרים שיווקיים של חתול פיננסי" loading="lazy" />
          </div>

          {/* Right column first — RTL puts it on the start edge. */}
          <div className="fc-cols">
            <div className="fc-col">
              <div className="fc-col-text">
                <h2 className="fc-col-title">ניהול פרויקט</h2>
                <p>ניהול הפרויקט נעשה במערכות SaaS שנגישות לללקוחות שלנו ונותני השירות שמתממשקים לעשייה משותפת מהאסטרטגיה, ועד המכירה והמדידה. אפשר להשאיר משימות, לשים תוצרים ולעקוב אחרי התקדמות - הכל בשקיפות מלאה מול הלקוח.</p>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/fincat/cs/project-mgmt.webp" alt="מערכות ניהול הפרויקט" loading="lazy" />
            </div>

            <div className="fc-col">
              <div className="fc-col-text">
                <h2 className="fc-col-title">שפה מותגית אחידה</h2>
                <p>פיתוח שפה טרמינולוגית, טון ואופי המותג, לצד כתיבת סיפור מותג עם נוכחות ויזואלית חזקה ומדויקת. למעשה ״השפה המותגית״ היא שילוב עדין בין מילים לויזואליה שיוצרים משהו חדש וייחודי עבור המותג.</p>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/fincat/cs/brand-language.webp" alt="השפה המותגית של חתול פיננסי" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Visual language ── */}
      <Prose kicker="הכל מתכנס יחד" title="השפה הויזואלית" paragraphs={STRATEGY_COPY} />

      <Band src="/fincat/cs/visual-language.webp" alt="השפה הויזואלית של חתול פיננסי" />

      {/* ── Running the operation ── */}
      <Prose
        title="ניהול פרויקט שיווקי מורכב"
        paragraphs={[
          'הפרויקט שלנו לא כלל רק אפיון, כתיבת תוכן, עיצוב וליווי הפיתוח. שיתוף הפעולה עם חתול פיננסי היה הרבה מעבר לבניית המרקטפלייס שלהם.',
          'בנינו תשתית שיווקית חזקה ואוטומטית, וניהלנו את כל האופרציה בעבודה צמודה עם אשת קידום אתרים, חברת מדיה ופרסום, מאיירת, אשת סושיאל שותפים עסקיים, חברת פיתוח ונותני שירות נוספים.',
          'לאורך כל הדרך שמרנו בקנאות על קווי המותג החדש, כך שכל אלמנט, כולל כל מודעה חדשה, ידבר באותה שפה מותגית מובהקת. התרענו על חריגות בתקציב, והורדנו לקרקע מונחים ותהליכים שיווקיים מורכבים כדי שהלקוח יוכל לקבל החלטות מושכלות לאורך כל הפרויקטים הרבים שנכנסנו אליהם.',
        ]}
      />

      <Band src="/fincat/cs/operation.webp" alt="תוצרי האופרציה השיווקית של חתול פיננסי" />

      {/* ── Testimonial ── */}
      <section className="fc-quote">
        <div className="fc-container">
          <blockquote className="fc-quote-body">
            <p>היכולת של אמיר לתקשר רעיונות בצורה ויזואלית פשוט יוצאת דופן. העבודה שלו מקצועית מבחינה טכנית וגם מלאת יצירתיות וחיים.</p>
            <p>קרן, אני אקח רגע להיות רגשית. תודה על הליווי בדרך המפחידה הזו, המעבר בין מיזם חינמי לעסק שמוכר משהו. מעבר שהיה יפהיפה מבחינה אסתטית ועובד טוב מבחינת חווית המשתמש. מעבר שלווה בשאלות ששלחו אותנו לחשוב ולחזור עם תשובות מהודקות. תודה 💙</p>
          </blockquote>
          <cite className="fc-quote-cite">עדי נודל, מייסדת חתול פיננסי</cite>
        </div>
      </section>

      {/* ── Closing CTA — the site's live contact form, which already
             matches this section field-for-field ── */}
      <ContactV8 t={he.contact} />

      <FooterV8 t={he.footer} />
    </main>
  )
}
