/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next'
import GuideForm from '@/components/ux-guide/GuideForm'
import StickyCta from '@/components/ux-guide/StickyCta'
import AdPixels from '@/components/ux-guide/AdPixels'
import './styles.css'

/**
 * /ux-guide — the landing page for the paid ads: Keren's design (claude.ai
 * artifact, 2026-11) as a standalone page. No site nav or footer on purpose:
 * an ad landing page has one thing to do. Both forms post to
 * /api/forms/ux-guide; tracking ids come from env (see AdPixels).
 */
export const metadata: Metadata = {
  title: 'מדריך UX חינמי · 12 תיקונים שהופכים ביקור לקנייה · Two Otters Studio',
  description: '12 תיקונים קטנים שהופכים ביקור לקנייה. בלי אתר חדש, בלי עוד שקל לפרסום. מדריך PDF חינמי של 10 עמודים.',
  alternates: { canonical: '/ux-guide' },
  openGraph: {
    title: 'הלקוחות כבר באתר שלכם. בואו נעזור להם לקנות.',
    description: '12 תיקונים קטנים שהופכים ביקור לקנייה. מדריך UX חינמי לבעלי עסקים.',
    images: [{ url: '/ux-guide/guide-cover.webp', width: 1075, height: 1521, alt: 'עמוד השער של המדריך' }],
  },
}

const BENEFITS = [
  ['c1', 'ico-clicks', 'יותר לחיצות על מה שחשוב', 'תדעו בדיוק מה להבליט בכל מסך, כדי שהגולשים יעשו את הצעד הבא בלי לחשוב פעמיים.'],
  ['c2', 'ico-cart', 'פחות עגלות נטושות', 'תגלו מה מבריח לקוחות מהקופה ברגע האחרון, ותתקנו את זה בכמה דקות.'],
  ['c3', 'ico-done', 'יותר אנשים שמסיימים', 'טריק פשוט שגורם לכמעט פי שניים אנשים לסיים טופס או תהליך רכישה.'],
  ['c4', 'ico-trust', 'לקוחות שמרגישים בטוחים', 'מילים קטנות שמורידות טעויות ופניות לשירות, ובונות את האמון שצריך כדי לקנות.'],
  ['c5', 'ico-spark', 'מוצרים שנראים שווים יותר', 'אותו מוצר, אותו מחיר. רק שנראה כמו משהו ששווה לשלם עליו.'],
  ['c6', 'ico-phone', 'אתר שמוכר גם בטלפון', 'רוב הקניות קורות באגודל. תוודאו שהאתר שלכם לא מפספס אותן.'],
] as const

const MARQUEE = ['כפתור אחד שמוביל', 'קופה בלי הפתעות', 'התחלה עם יתרון', 'מילים שמרגיעות', 'כרטיס מוצר שמוכר', 'אתר שנוח לאגודל']

export default function UxGuidePage() {
  return (
    <div className="uxg" dir="rtl" lang="he">
      <header className="top">
        <div className="wrap">
          <img src="/ux-guide/logo.webp" alt="Two Otters Studio" width={160} height={28} />
          <a href="/">לאתר שלנו</a>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section className="hero dots" id="top">
          <div className="wrap hero-grid">
            <div>
              <span className="pill"><i></i>מדריך UX חינמי לבעלי עסקים</span>
              <h1>
                <span className="nw">הלקוחות כבר</span> <span className="nw">באתר שלכם.</span><br />
                <span className="chip chip-green chip-wrap"><span className="nw">בואו נעזור</span> <span className="nw">להם לקנות.</span></span>
              </h1>
              <p className="lead"><b>12 תיקונים קטנים שהופכים ביקור לקנייה.</b><br />בלי אתר חדש. <span className="nw">בלי עוד שקל לפרסום.</span></p>
              <GuideForm variant="dark" />
            </div>

            <div className="cover">
              <img className="spark bob" src="/ux-guide/ico-spark.svg" alt="" aria-hidden="true" />
              <img src="/ux-guide/guide-cover.webp" alt="עמוד השער של המדריך" width={661} height={936} fetchPriority="high" />
              <span className="sticker s1 bob">12 תיקונים</span>
              <span className="sticker violet s2 bob d2">10 דקות בטלפון</span>
              <span className="sticker yellow s3 bob d3"><img src="/ux-guide/ico-free.svg" alt="" />חינם</span>
            </div>
          </div>
        </section>

        <div className="marquee" aria-hidden="true">
          <div className="track">
            {[...MARQUEE, ...MARQUEE].map((m, i) => <span key={i}>{m}</span>)}
          </div>
        </div>

        {/* PAIN */}
        <section>
          <div className="wrap">
            <span className="eyebrow">נשמע מוכר?</span>
            <h2>לקוחות מגיעים לאתר.<br />ואז… <span className="nw">יוצאים בלי לרכוש.</span></h2>

            <div className="pain-grid">
              <article className="pain">
                <img className="ico" src="/ux-guide/ico-pain-webinar.svg" alt="" />
                <div className="big">80 משתתפים.<br /><em>רק 2 מכירות.</em></div>
                <p>וובינר מפוצץ, פידבקים מטורפים, <b>ואין מכירות.</b></p>
              </article>
              <article className="pain">
                <img className="ico" src="/ux-guide/ico-pain-cart.svg" alt="" />
                <div className="big">עוד עגלה<br /><em>נטושה.</em></div>
                <p>מישהו כבר היה בקופה, <b>אבל יצא בלי להשלים רכישה.</b></p>
              </article>
              <article className="pain">
                <img className="ico" src="/ux-guide/ico-pain-likes.svg" alt="" />
                <div className="big">500 לייקים.<br /><em>0 הזמנות.</em></div>
                <p>באינסטגרם מתים על המוצרים, <b>ובאתר אף אחד לא קונה.</b></p>
              </article>
            </div>

            <div className="twist dots">
              <div>
                <h3>
                  <span className="nw">זה לא אתם.</span> <span className="nw">וזה לא המוצר.</span><br />
                  <span className="chip chip-green chip-wrap"><span className="nw">זה משהו קטן</span> <span className="nw">בעמוד.</span></span>
                </h3>
                <p>שדה מיקוד בקורס דיגיטלי. מחיר שקופץ בקופה. כפתור שלא ברור לאן הוא מוביל. ולאנשים אין סבלנות (ובצדק).</p>
              </div>
              <div className="proof">
                <span className="tag">מהשטח</span>
                <div className="num"><bdi>3.5%</bdi><small>←</small><bdi className="up">8%</bdi></div>
                <p>אחוז ההמרה אצל לקוח ריטייל שלנו, תוך חצי שנה. <b>אותה תנועה. בלי שקל נוסף לפרסום.</b></p>
              </div>
            </div>
          </div>
        </section>

        {/* INSIDE */}
        <section className="inside">
          <div className="wrap">
            <div className="inside-head">
              <div>
                <span className="eyebrow">מה יוצא לכם מזה</span>
                <h2>12 תיקונים קטנים.<br /><span className="chip chip-navy chip-wrap"><span className="nw">הרבה יותר</span> <span className="nw">מכירות.</span></span></h2>
              </div>
            </div>

            <div className="bento">
              {BENEFITS.map(([c, ico, h, p]) => (
                <article key={c} className={`card ${c}`}>
                  <img className="ico" src={`/ux-guide/${ico}.svg`} alt="" />
                  <h3>{h}</h3>
                  <p>{p}</p>
                </article>
              ))}

              <div className="check">
                <img src="/ux-guide/ico-checklist.svg" alt="" />
                <div>
                  <span className="eyebrow">ובעמוד 9!</span>
                  <h3>צ&apos;קליסט של עשר דקות.</h3>
                  <p>פותחים את האתר בטלפון, עוברים על הרשימה, וכל &quot;לא&quot; הוא הזדמנות.</p>
                </div>
                <ul className="list" aria-label="דוגמה מהצ'קליסט">
                  <li className="y"><i>✓</i>בכל מסך יש כפתור צבוע אחד בלבד</li>
                  <li className="n"><i>✕</i>המחיר בעמוד המוצר הוא המחיר הסופי</li>
                  <li className="y"><i>✓</i>אפשר לקנות או להשאיר פרטים בלי סיסמה</li>
                  <li className="n"><i>✕</i>על הכל אפשר ללחוץ באגודל, בלי זום</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* WHO */}
        <section className="about">
          <div className="wrap about-grid">
            <div className="about-text">
              <span className="hi"><span className="chip chip-green">אולה!</span><img src="/ux-guide/ico-wave.svg" alt="" aria-hidden="true" /></span>
              <h2>אנחנו אמיר וקרן.</h2>
              <p>הכרנו אי שם בתיכון, ובמשך השנים הזרם לקח אותנו להרבה מקומות. אבל כמו לוטרות אמיתיות, שמחזיקות ידיים, תמיד נשארנו יחד.</p>
              <p>קרן בונה את ה&quot;מה&quot;: האסטרטגיה, הסיפור והתוכן. אמיר בונה את ה&quot;איך&quot;: ה־UX, המיתוג והעיצוב. <b>ואת 12 התיקונים במדריך אספנו מהאודיטים שלנו, כי ראינו אותם חוזרים שוב ושוב.</b></p>
            </div>
            <div className="about-photo">
              <img className="couch" src="/ux-guide/amir-keren.webp" alt="אמיר וקרן, Two Otters Studio" width={600} height={863} loading="lazy" />
              <img className="b-amir" src="/ux-guide/badge-amir.svg" alt="אמיר שלו, מומחה UX/UI" loading="lazy" />
              <img className="b-keren" src="/ux-guide/badge-keren.svg" alt="קרן רייטלר, מומחית אסטרטגיה" loading="lazy" />
              <img className="browser" src="/ux-guide/deco-browser.svg" alt="" aria-hidden="true" loading="lazy" />
              <img className="horse" src="/ux-guide/deco-horse.svg" alt="" aria-hidden="true" loading="lazy" />
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="final" id="get">
          <span className="sticker f1 bob">10 עמודים</span>
          <span className="sticker violet f2 bob d2">בלי אתר חדש</span>
          <span className="sticker f3 bob d3"><img src="/ux-guide/ico-free.svg" alt="" />חינם</span>
          <img className="otter" src="/ux-guide/otter.webp" alt="" aria-hidden="true" loading="lazy" />
          <div className="wrap">
            <h2>עשר דקות <span className="nw">עם הטלפון,</span><br /><span className="chip">ואתר שמוכר.</span></h2>
            <p className="sub">השאירו פרטים, והמדריך נוחת אצלכם במייל. <span className="nw">בלי ספאם, מבטיחים.</span></p>
            <GuideForm variant="light" />
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap">
          <img src="/ux-guide/logo.webp" alt="Two Otters Studio" width={137} height={24} />
          <span>© Two Otters Studio · <a href="/">two-otters.studio</a></span>
          <span className="legal"><a href="/privacy">מדיניות פרטיות</a><a href="/accessibility">הצהרת נגישות</a></span>
        </div>
      </footer>

      <StickyCta />
      <AdPixels />
    </div>
  )
}
