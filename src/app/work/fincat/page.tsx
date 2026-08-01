'use client'

import { useEffect } from 'react'
import NavV7 from '@/components/v7/NavV7'
import FooterV7 from '@/components/v7/FooterV7'
import he from '@/locales/v7-he.json'
import '../../v7/styles.css'
import './styles.css'

const HOME = '/v7?lang=he'

export default function FinCatCaseStudy() {
  useEffect(() => {
    const pb = document.getElementById('pb')

    const onScroll = () => {
      if (pb) {
        const p = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
        pb.style.width = p + '%'
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    // Scroll reveal — opt into the hide/animate behavior now that JS is running
    const root = document.querySelector('.fincat-cs')
    root?.classList.add('js-reveal')
    const revealEls = Array.from(document.querySelectorAll('.fincat-cs .reveal'))
    const ro = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('vis') }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    revealEls.forEach((el) => ro.observe(el))
    // Safety net: never leave content hidden / counters stuck if the observer never fires
    const revealFallback = setTimeout(() => {
      revealEls.forEach((el) => el.classList.add('vis'))
      document.querySelectorAll<HTMLElement>('.fincat-cs [data-count]').forEach((el) => {
        if (!el.dataset.done) {
          el.dataset.done = '1'
          el.textContent = (el.dataset.count || '0') + (el.dataset.suffix || '')
        }
      })
    }, 2500)

    // Counters
    const co = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const el = e.target as HTMLElement
          if (e.isIntersecting && !el.dataset.done) {
            el.dataset.done = '1'
            const target = +(el.dataset.count || '0')
            const suffix = el.dataset.suffix || ''
            let cur = 0
            const step = target / 40
            const t = setInterval(() => {
              cur = Math.min(cur + step, target)
              el.textContent = Math.floor(cur) + suffix
              if (cur >= target) clearInterval(t)
            }, 30)
          }
        })
      },
      { threshold: 0.5 }
    )
    document.querySelectorAll<HTMLElement>('.fincat-cs [data-count]').forEach((el) => co.observe(el))

    return () => {
      window.removeEventListener('scroll', onScroll)
      clearTimeout(revealFallback)
      ro.disconnect()
      co.disconnect()
    }
  }, [])

  return (
    <main className="fincat-cs" dir="rtl" lang="he">
      <div id="pb" />

      {/* Homepage header */}
      <NavV7 t={he.nav} lang="he" onLangChange={() => {}} hrefPrefix="/v7?lang=he" />

      {/* HERO — title + meta columns (redigma-style), no illustration */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-text">
            <div className="hero-tag">קייס סטאדי · פינטק</div>
            <h1>FinCat<br />ממותג שעמד<br /><span className="ac">במקום,</span><br /><span className="dm">לכזה שמוכן לגדול.</span></h1>
            <p className="hero-sub">פלטפורמה להשוואת שירותים פיננסיים עם אמינות שנבנתה לאורך שנים - אבל עם brand שלא שיקף אותה. בנינו מחדש הכל: זהות, product, שיווק.</p>
          </div>
          <aside className="hero-meta">
            <div className="hero-meta-cols">
              <div className="hmc"><span className="hmc-label">תחום</span><span className="hmc-value">פינטק</span></div>
              <div className="hmc"><span className="hmc-label">שירותים</span><span className="hmc-value">אסטרטגיה · מיתוג · UX/UI · שיווק</span></div>
              <div className="hmc"><span className="hmc-label">משך</span><span className="hmc-value">8 שבועות</span></div>
            </div>
            <a className="hero-live-link" href="https://fincat.co.il/" target="_blank" rel="noopener noreferrer">
              צפו באתר החי <span aria-hidden="true">←</span>
            </a>
          </aside>
        </div>
      </section>

      {/* HERO ATMOSPHERE IMAGE — live site screenshot */}
      <div style={{ background: 'var(--coal)', padding: '0 40px 48px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="cs-media" style={{ borderRadius: 14, border: '1px solid var(--border)' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/fincat/hero-fincat.png" alt="FinCat - עמוד הבית של האתר החי" style={{ height: 'auto' }} />
          </div>
        </div>
      </div>

      {/* MARQUEE */}
      <div className="marquee">
        <div className="marquee-track">
          {[0, 1].map((r) => (
            ['מיתוג', 'אסטרטגיה', 'UX/UI', 'מערכת שיווק', 'פרסונות', 'אוטומציה', 'פרוטוטייפ', 'שפה ויזואלית'].map((w) => (
              <span className="mi" key={`${r}-${w}`}>{w}<span className="md" /></span>
            ))
          ))}
        </div>
      </div>

      {/* SOUND FAMILIAR — example statements product owners make */}
      <section className="familiar">
        <div className="container">
          <div className="familiar-head">
            <span className="familiar-kicker">רגע לפני שנצלול</span>
            <h2 className="familiar-title">האם זה נשמע מוכר?</h2>
            <p className="familiar-sub">משפטים שאנחנו שומעים שוב ושוב מבעלי מוצרים, ממש לפני שהם פונים אלינו.</p>
          </div>
          <div className="familiar-grid">
            {[
              'המוצר שלנו טוב, אבל לקוחות לא מבינים את הערך שלו מהר מספיק',
              'האתר שלנו לא מייצג את רמת מה שאנחנו באמת מציעים',
              'יש לנו שיווק, אבל הוא ידני, לא עקבי, ולא מסקייל',
              'יש לנו כמה קהלי יעד, אבל ה-brand שלנו לא מדבר לכולם בשפה אחת',
            ].map((q, i) => (
              <div className={`bubble${i % 2 ? ' bubble--alt bubble--left' : ''}`} key={i}>
                <span className="q-mark" aria-hidden="true">״</span>
                <p>{q}</p>
              </div>
            ))}
          </div>
          <p className="familiar-note">וזה היה בדיוק המצב של FinCat. <span className="familiar-arrow" aria-hidden="true">↓</span></p>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="section">
        <div className="container">
          <div className="ey reveal">האתגר</div>
          <h2 className="sh2 reveal d1">מותג שהפסיק לשכנע</h2>
          <p className="sl reveal d2">FinCat בנתה אמינות אמיתית לאורך שנים. הבעיה: זהות המותג לא שיקפה אותה. משתמשים הגיעו, לא הבינו בשנייה הראשונה למה לסמוך — ועזבו.</p>
          <div className="prob-grid">
            <div className="prob-item reveal d2"><div className="cnum">01</div><h3 className="ctitle">לשמור על מה שעובד, לחדש את מה שלא</h3><p className="cbody">ל-FinCat הייתה זהות מוכרת — חתול, שחור-צהוב-לבן. הצ&apos;אלנג לא היה לקום מאפס, אלא לדעת בדיוק מה לשמר ומה לשדרג, בלי לשבור את ה-recognition שכבר נבנה.</p></div>
            <div className="prob-item reveal d3"><div className="cnum">02</div><h3 className="ctitle">קהל אחד? לא בדיוק.</h3><p className="cbody">FinCat פונה גם לצרכנים שמחפשים שירות פיננסי, גם לספקים שרוצים להופיע בפלטפורמה. לבנות brand ומסרים שמדברים לשניהם בלי להישמע גנרי — זה האתגר האמיתי.</p></div>
          </div>
        </div>
      </section>

      {/* PULL QUOTE */}
      <div className="pq">
        <p className="pq-text reveal">הבעיה לא הייתה ש-FinCat לא הייתה טובה —<br />הבעיה הייתה ש<span className="hl">לא ניכר שהיא טובה.</span></p>
        <p className="pq-cite">האבחנה שלנו, אחרי הסשן הראשון</p>
      </div>

      {/* BRAND IDENTITY */}
      <section className="brand-sec">
        <div className="container">
          <div className="ey lt reveal">זהות מותג</div>
          <h2 className="sh2 lt reveal d1">עיצוב שמשכנע לקוחות, לא רק מרשים אותם</h2>
          <p className="sl lt reveal d2">כל בחירה ויזואלית — צבע, טיפוגרפיה, אייקון — נועדה לגרום למשתמש להרגיש: &quot;אפשר לסמוך על זה.&quot;</p>
          <div className="brand-logo reveal d1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/fincat/logo.svg" alt="לוגו FinCat" />
          </div>
          <div className="brand-grid reveal d2" style={{ borderRadius: '0 0 16px 16px', marginTop: 0 }}>
            <div className="bp">
              <div className="bpl">פלטת צבעים</div>
              <div className="swatches">
                {[
                  { n: 'White', h: '#FFFFFF' },
                  { n: 'Yolk', h: '#FFC700' },
                  { n: 'Coal', h: '#02132A' },
                  { n: 'Lavendar', h: '#EAE6FD' },
                  { n: 'Pearl', h: '#DADAE5' },
                  { n: 'Metal', h: '#F1F1F5' },
                  { n: 'Sunlight', h: '#FFF5E4' },
                  { n: 'Mint', h: '#F5FFF1' },
                  { n: 'Lollipop', h: '#FEE5F0' },
                  { n: 'Sky', h: '#DEEBFD' },
                ].map((c) => (
                  <div className="sw" key={c.n}>
                    <div className="sw-b" style={{ background: c.h }} />
                    <div><div className="sw-name">{c.n}</div><div className="sw-hex">{c.h}</div></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bp">
              <div className="bpl">טיפוגרפיה</div>
              <div className="type-disp">Aa</div>
              <div className="type-font">Rubik · Google Fonts</div>
              <div className="tw-rows">
                <div className="tw-r"><div className="tw-l">900</div><div className="tw-w" style={{ fontWeight: 900 }}>אמינות</div></div>
                <div className="tw-r"><div className="tw-l">700</div><div className="tw-w" style={{ fontWeight: 700, color: 'var(--text-mid)' }}>פיננסים</div></div>
                <div className="tw-r"><div className="tw-l">500</div><div className="tw-w" style={{ fontWeight: 500, color: 'var(--text-mid)' }}>שקיפות מלאה</div></div>
                <div className="tw-r"><div className="tw-l">400</div><div className="tw-w" style={{ fontWeight: 400, color: 'var(--text-muted)' }}>פרטים קטנים</div></div>
              </div>
            </div>
            <div className="bp bp-icons">
              <div className="bpl">מערכת אייקונים</div>
              <div className="icon-row">
                {[
                  { s: '/fincat/icons/justice.png', a: 'צדק' },
                  { s: '/fincat/icons/family.png', a: 'משפחה' },
                  { s: '/fincat/icons/financial-planning.png', a: 'תכנון פיננסי' },
                  { s: '/fincat/icons/mortgage.png', a: 'משכנתא' },
                  { s: '/fincat/icons/real-estate.png', a: 'נדל״ן' },
                  { s: '/fincat/icons/retirement.png', a: 'פרישה' },
                ].map((ic) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={ic.s} src={ic.s} alt={ic.a} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* APPROACH */}
      <section className="app-sec">
        <div className="container">
          <div className="ey reveal">הגישה</div>
          <h2 className="sh2 reveal d1">הספירלה, לא מרוץ השליחים</h2>
          <div className="app-grid">
            <div className="spiral-wrap reveal">
              <div className="sr" /><div className="sr" /><div className="sr" /><div className="sr" /><div className="sr" />
              <div className="sc">🐱</div>
            </div>
            <div className="reveal d2">
              <p className="sl" style={{ marginBottom: 32 }}>רוב הסטודיוז עובדים ברצף: אסטרטגיה קודם, עיצוב אחר כך, שיווק בסוף. אנחנו עובדים בסבבים, כי כל החלטה משפיעה על השאר.</p>
              <div className="app-steps">
                <div className="app-step"><div className="stepn">1</div><div><div className="step-h">אסטרטגיה ועיצוב בו-זמנית</div><p className="step-p">לא מחכים שמסמך אסטרטגיה &quot;יגמר&quot;, שניהם קורים בסבב אחד.</p><p className="step-hl">FinCat קיבלה כיוון עיצובי ברור כבר בשבוע הראשון, בלי לחכות חודש לאסטרטגיה.</p></div></div>
                <div className="app-step"><div className="stepn">2</div><div><div className="step-h">כל שינוי מחדד את הבא</div><p className="step-p">שינוי בטקסט חידד עיצוב. פורמט ויזואלי חידד אסטרטגיה. תמיד.</p><p className="step-hl">המסר והעיצוב יצאו מסונכרנים לחלוטין, לא מתנגשים זה בזה.</p></div></div>
                <div className="app-step"><div className="stepn">3</div><div><div className="step-h">הלקוח מעורב לאורך כל הדרך</div><p className="step-p">FinCat ראתה תוצרים אמיתיים מהשבוע הראשון, לא הפתעות בסיום.</p><p className="step-hl">אפס שינויים גדולים בסיום הפרויקט, כי כל החלטה אושרה תוך כדי.</p></div></div>
              </div>
              <div className="app-box">
                <div className="app-box-ey">היתרון ללקוח</div>
                <p className="app-box-t">במקום הפתעות בסוף, FinCat אישרה כיוונים בזמן אמת, קיבלה החלטות מושכלות, ויצאה עם מוצר שמרגיש שלה מיום אחד.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SCREENS */}
      <section className="screens-sec">
        <div className="container">
          <div className="ey lt reveal">התוצר</div>
          <h2 className="sh2 lt reveal d1">מה שנבנה</h2>
          <p className="sl lt reveal d2">מערכת עיצוב שלמה, מעמוד הבית ועד כל מצב ב-flow, בשפה ויזואלית אחידה.</p>
          <div className="feat-rows">
            {[
              { eyebrow: 'עמוד הבית', title: 'רושם ראשוני שמוכר', desc: 'עמוד בית שמסביר בשנייה למי האתר מיועד ומה הערך, עם קריאה ברורה לפעולה.', img: '/fincat/screens/home.png' },
              { eyebrow: 'הצטרפות', title: 'תהליך הרשמה מונחה', desc: 'תהליך הצטרפות של שלושה שלבים, שמלווה כל נותן שירות צעד אחר צעד עד לפרופיל מלא.', img: '/fincat/screens/onboarding.png' },
              { eyebrow: 'חיפוש נותני שירות', title: 'עמודי קטגוריה שמובילים לתוצאה', desc: 'עמודי חיפוש ודירוג שמובילים את הלקוח בדיוק אל בעל המקצוע שמתאים לו.', img: '/fincat/screens/category.png' },
              { eyebrow: 'פרופיל אישי', title: 'עמוד פרופיל שבונה אמון', desc: 'פרופיל מלא לכל יועץ, עם דירוגים, מאמרים ופרטים מאומתים.', img: '/fincat/screens/profile.png' },
              { eyebrow: 'שפה ויזואלית', title: 'מערכת אייקונים שלמה', desc: 'סט אייקונים ייחודי בשפת המותג, שמלווה כל עמוד ותחום שירות.', iconset: true },
              { eyebrow: 'יסודות המותג', title: 'ספר מותג מלא', desc: 'מדריך מותג שלם, כדי שכל תוצר עתידי ידבר באותה שפה ויזואלית.', img: '/fincat/screens/brand-book.png', noBorder: true },
            ].map((f, i) => (
              <div className={`feat-row${i % 2 ? ' feat-row--flip' : ''} reveal`} key={i}>
                <div className="feat-text">
                  <span className="feat-eyebrow">{f.eyebrow}</span>
                  <h3 className="feat-title">{f.title}</h3>
                  <p className="feat-desc">{f.desc}</p>
                </div>
                <div className="feat-media">
                  {f.iconset ? (
                    <div className="feat-iconset">
                      {['justice', 'family', 'financial-planning', 'mortgage', 'real-estate', 'retirement'].map((n) => (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img key={n} src={`/fincat/icons/${n}.png`} alt="" />
                      ))}
                    </div>
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={f.img} alt={f.title} className={f.noBorder ? 'feat-img--nb' : undefined} />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* The full system — deliverables cards (folded into the same section) */}
          <div className="del-block">
            <h3 className="del-block-title">וכל זה חלק ממערכת שלמה, לא עיצוב בודד</h3>
            <p className="del-block-sub">לא סתם לוגו ו-5 עמודים. מערכת שפועלת בעצמאות ומוכנה לגדול.</p>
            <div className="del-grid">
              {[
                { i: '👤', t: 'פרסונות ואסטרטגיה', d: 'פרופיל לקוח, מסע משתמש, ו-messaging לכל קהל' },
                { i: '📧', t: 'מנוע שיווק אוטומטי', d: 'פאנלים, landing pages, ורצפי אימייל מוכנים' },
                { i: '📐', t: 'אב טיפוס לבדיקה', d: 'פרוטוטייפ מלא לוואלידציה לפני שורת קוד אחת' },
              ].map((d, i) => (
                <div className={`di reveal${i % 3 ? ` d${i % 3}` : ''}`} key={i}><div className="di-icon">{d.i}</div><div className="di-t">{d.t}</div><div className="di-d">{d.d}</div></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section className="res-sec">
        <div className="container">
          <div className="ey lt reveal">התוצאה</div>
          <h2 className="sh2 lt reveal d1">מותג שמוכן לצמוח</h2>
          <div className="res-nums">
            <div className="rn reveal"><div className="rn-big" data-count={10} data-suffix="+">0</div><div className="rn-label">עמודים עוצבו</div><div className="rn-sub">כולל mobile states, hover effects ומצבי שגיאה</div></div>
            <div className="rn reveal d1"><div className="rn-big" data-count={8}>0</div><div className="rn-label">שבועות — מאפס להשקה</div><div className="rn-sub">אסטרטגיה, מיתוג, UX/UI ושיווק — בו-זמנית</div></div>
            <div className="rn reveal d2"><div className="rn-big" data-count={3}>0</div><div className="rn-label">מערכות שנבנו יחד</div><div className="rn-sub">Brand identity · Product design · Marketing engine</div></div>
          </div>
          <div className="res-items">
            <div className="ri reveal"><div className="ri-t">מסר אחד — שמגיע בצורות שונות</div><div className="ri-d">FinCat יצאה מהפרויקט עם brand book שכל בעל תפקיד יכול להשתמש בו — בלי לשאול &quot;מה ה-tone שלנו?&quot; בכל פעם.</div></div>
            <div className="ri reveal d1"><div className="ri-t">פיתוח שהתחיל כשהיה מה לפתח</div><div className="ri-d">FinCat שלחה לפיתוח מסך שאושר על פרוטוטייפ — לא ניחוש. המפתחים לא ניחשו כוונות. הלקוחות לא קיבלו הפתעות.</div></div>
            <div className="ri reveal d2"><div className="ri-t">שיווק שעובד גם כשאף אחד לא עובד</div><div className="ri-d">FinCat עברה משיווק ידני שדרש מעורבות קבועה — למשפך אוטומטי שמטפל בלידים מרגע שהם נכנסים, בלי להוסיף כוח אדם.</div></div>
          </div>
        </div>
      </section>

      {/* BIG QUOTE */}
      <div className="bq">
        <div className="container">
          <p className="bq-text reveal"><span className="g">אסטרטגיה בלי עיצוב היא </span>תוכנית על נייר.<br /><span className="g">עיצוב בלי אסטרטגיה הוא </span>יפה בלי כיוון.<br /><span className="y">ביחד — זה מה שמוכר.</span></p>
        </div>
      </div>

      {/* TESTIMONIAL */}
      <section className="test-sec">
        <div className="test-inner">
          <div className="qm reveal">&quot;</div>
          <p className="test-q reveal d1">הגענו ל-Two Otters עם brand שהרגיש תקוע. יצאנו עם מערכת שלמה שמדברת ללקוחות שלנו, עובדת לבד, ומאפשרת לנו להתמקד בצמיחה.</p>
          <div className="test-who reveal d2">
            <div className="test-av">{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/testimonials/adi-nudel.jpg" alt="עדי נודל" /></div>
            <div><div className="test-name">עדי נודל</div><div className="test-title">מנכ&quot;לית · Financial Cat</div></div>
          </div>
        </div>
      </section>

      {/* CREDITS */}
      <section style={{ background: 'var(--bg)', padding: '80px 40px', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div className="ey reveal">הצוות</div>
          <h2 className="sh2 reveal d1" style={{ fontSize: 'clamp(26px,3vw,38px)' }}>מי עמד מאחורי הפרויקט</h2>
          <div className="v7-about-photos-wrap reveal d2">
            <div className="v7-about-bubble v7-about-bubble--amir">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/bubble-amir-hebrew.svg" alt={he.about.amirBubbleAlt} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            <div className="v7-about-bubble v7-about-bubble--keren">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/bubble-keren-hebrew.svg" alt={he.about.kerenBubbleAlt} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            <div className="v7-about-photos">
              <div className="v7-about-photo amir">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/amir-photo.png" alt={he.about.amirPhotoAlt} />
              </div>
              <div className="v7-about-photo keren">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/keren-photo.png" alt={he.about.kerenPhotoAlt} />
              </div>
            </div>
          </div>
          <div className="next-row">
            <p className="next-eyebrow">הפרויקט הבא</p>
            <a href="/work/trade-the-pool?lang=he" className="next-link">Trade the Pool <span aria-hidden="true">←</span></a>
          </div>
        </div>
      </section>

      {/* FINAL CTA BANNER */}
      <section className="final-banner-sec">
        <div className="cs-final reveal">
          <div className="cs-final-inner">
            <h2>יש לכם פרויקט כזה?</h2>
            <p>אסטרטגיה ועיצוב, במקביל. מרעיון למוצר, רק מהר יותר.</p>
            <div className="cs-final-row">
              <a className="cs-final-btn" href={`${HOME}#contact`}>דברו איתנו</a>
              <a className="cs-final-ghost" href={`${HOME}#work`}>עוד עבודות ←</a>
            </div>
          </div>
        </div>
      </section>

      {/* Homepage footer */}
      <FooterV7 t={he.footer} />
    </main>
  )
}
