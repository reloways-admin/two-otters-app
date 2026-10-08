import type { CSSProperties } from 'react'
import { ROUTES } from '@/components/v10/routes'
import ArrowLeftV10 from '@/components/v10/ArrowLeftV10'

/**
 * Service page "service-marketing": hero, pains, timeline, deliverables, spiral, quote, FAQ, CTA.
 *
 * Ported mechanically from the next-site artifact (version 1791388654, 7.10.2026),
 * page "#service-marketing", so the approved markup and copy stay exactly as Amir and Keren
 * signed them off. Styles: app/v10/services/services.css (the artifact's own
 * rules, scoped under .v10-services). Copy is still inline here; moving it into
 * a locale file is a follow-up (see the 7.10 review report).
 */
export default function ServiceMarketingV10() {
  return (
    <div className="v10-svc-page v10-svc-page--marketing" style={{ '--svc': '#61fff2' } as CSSProperties}>
    
    <section className="sv-hero">
    <div className="sv-hero-in">
    <div className="sv-hero-copy">
    <span className="wf-crumb sv-crumb"><a href={ROUTES.services}>שירותים</a>{' '}/ תשתית שיווקית</span>
    <h1 className="sv-h1">תשתית שיווקית<br /><span>שכל עסק צריך.</span></h1>
    <p className="sv-lead">בונים לכם מסעות לקוח, אוטומציות ודשבורדים שמחליפים את העבודה הידנית. ככה רואים סוף סוף מה מביא לקוחות, ומשקיעים רק במה שעובד. לעבוד חכם, לא קשה.</p>
    <div className="sv-hero-cta"><a className="sv-btn" href={ROUTES.book}>בואו נבנה תשתית{' '}<span aria-hidden="true"><ArrowLeftV10 /></span></a><a className="sv-btn-ghost" href={ROUTES.contact}>שליחת הודעה</a></div>
    </div>
    <div className="sv-hero-art" aria-hidden="true">
    <span className="sv-ring"></span>
    {/* eslint-disable-next-line @next/next/no-img-element */}<img className="sv-art-main" src="/offer-illus-3-marketing.svg" alt="" />
    {/* eslint-disable-next-line @next/next/no-img-element */}<img className="sv-art-sat sv-art-sat--a" src="/v10/ico-chart.png" alt="" />{/* eslint-disable-next-line @next/next/no-img-element */}<img className="sv-art-sat sv-art-sat--b" src="/v10/services/icon-layers.svg" alt="" />
    <span className="wf-sa-chip sv-chip sv-chip--a"><i className="wf-sa-dot"></i>אוטומציה פעילה</span>
    <span className="wf-sa-chip sv-chip sv-chip--b wf-sa-bars"><i style={{ height: "30%" }}></i><i style={{ height: "55%" }}></i><i style={{ height: "42%" }}></i><i style={{ height: "78%" }}></i><i style={{ height: "100%" }}></i><span>מה עובד</span></span>
    <span className="wf-sa-chip sv-chip sv-chip--c">בלי העתקות ידניות</span>
    </div>
    </div>
    <div className="sv-facts">
    <div><small>כמה זמן</small><b>1-2 חודשי הקמה</b></div>
    <div><small>למי</small><b>עסקים שהשיווק אצלם ידני ומפוזר</b></div>
    <div><small>עם מה יוצאים</small><b>מסע לקוח, אוטומציות ודשבורד</b></div>
    </div>
    </section>
    <section className="sv-pain">
    <div className="v8-container">
    <h2 className="sv-h2">נשמע{' '}<b>מוכר?</b></h2>
    <div className="sv-bubbles"><p className="sv-bubble">״אנחנו מעתיקים לידים מכלי לכלי, ידנית.״</p><p className="sv-bubble sv-bubble--alt">״אין לנו מושג איזה ערוץ באמת מביא לקוחות.״</p><p className="sv-bubble">״יש לנו קהילה גדולה, אבל היא לא הופכת ללקוחות.״</p></div>
    <p className="sv-answer">תשתית אחת מסדרת את זה.{' '}<mark>המערכות עובדות בשבילכם, ואתם רואים מה עובד.</mark></p>
    </div>
    </section>
    <section className="sv-time">
    <div className="v8-container">
    <h2 className="sv-h2 sv-h2--light">חודשיים,{' '}<b>שבוע אחרי שבוע</b></h2>
    <p className="sv-sub">ציר משוער. עסק עם פחות כלים יכול להיות באוויר מהר יותר.</p>
    <ol className="sv-track"><li><span className="sv-wk">שבוע 1</span>{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/v10/services/icon-signpost.svg" alt="" /><b>מיפוי</b><p>ממפים את מסע הלקוח ואת הכלים שכבר יש לכם.</p><em>מפת מסע לקוח</em></li><li><span className="sv-wk">שבוע 2</span>{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/step-2.svg" alt="" /><b>תוכנית</b><p>מחליטים מה מודדים, איפה הלקוחות נתקעים ומה כדאי לאטמט.</p><em>תוכנית תשתית</em></li><li className="sv-wide"><span className="sv-wk">שבועות 3-6</span>{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/v10/services/icon-layers.svg" alt="" /><b>הקמה</b><p>בונים משפכים ואוטומציות ומחברים בין המערכות, כך שהמידע זורם לבד.</p><em>משפכים ואוטומציות</em></li><li><span className="sv-wk">שבוע 7</span>{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/v10/ico-chart.png" alt="" /><b>דשבורד</b><p>מרכזים את הנתונים בדשבורד אחד שמראה מה מביא לקוחות.</p><em>דשבורד</em></li><li><span className="sv-wk">שבוע 8</span>{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/v10/services/icon-chat.svg" alt="" /><b>חפיפה</b><p>מלמדים את הצוות לעבוד עם התשתית ולשפר אותה לבד.</p><em>הדרכה ותיעוד</em></li></ol>
    </div>
    </section>
    <section className="sv-get">
    <div className="v8-container">
    <h2 className="sv-h2">מה{' '}<b>נשאר אצלכם</b>{' '}בסוף</h2>
    <div className="sv-objs"><article><div className="sv-mock sv-mock--flow" aria-hidden="true"><i></i><i></i><i></i><i></i><svg viewBox="0 0 200 120" preserveAspectRatio="none"><path d="M40 30 C 90 30, 90 30, 160 30 M40 30 C 60 90, 90 90, 100 90 M160 30 C 150 80, 120 90, 100 90" /></svg></div><b>מסע לקוח</b><p>מהמפגש הראשון ועד המכירה.</p></article><article><div className="sv-mock sv-mock--funnel" aria-hidden="true"><i></i><i></i><i></i><u></u></div><b>משפכים ואוטומציות</b><p>שמחליפים את העבודה הידנית.</p></article><article><div className="sv-mock sv-mock--nodes" aria-hidden="true"><i>CRM</i><i>Mail</i><i>Ads</i><b></b><svg viewBox="0 0 200 120" preserveAspectRatio="none"><path d="M45 30 L100 75 M155 30 L100 75 M100 100 L100 75" /></svg></div><b>חיבור מערכות</b><p>שכל הכלים ידברו אחד עם השני.</p></article><article><div className="sv-mock sv-mock--bars" aria-hidden="true"><i style={{ height: "32%" }}></i><i style={{ height: "48%" }}></i><i style={{ height: "40%" }}></i><i style={{ height: "70%" }}></i><i style={{ height: "92%" }}></i></div><b>דשבורד</b><p>שמראה מה עובד ומה לא.</p></article></div>
    </div>
    </section>
    <section className="sv-spiral">
    <div className="v8-container">
    <h2 className="sv-h2">איפה זה יושב{' '}<b>בספירלה</b></h2>
    <p className="sv-sub sv-sub--dark">השלבים המסומנים כלולים בשירות. כל שלב אחר אפשר להוסיף.</p>
    <div className="sv-steps"><div className="on">{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/step-1.svg" alt="" /><b>אסטרטגיה</b></div><div className="on">{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/step-2.svg" alt="" /><b>אפיון</b></div><div>{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/step-3.svg" alt="" /><b>פרוטוטייפ</b><small>+ אפשר להוסיף</small></div><div>{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/step-4.svg" alt="" /><b>Hand-Off</b><small>+ אפשר להוסיף</small></div><div>{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/spiral-megaphone.svg" alt="" /><b>שפה</b><small>+ אפשר להוסיף</small></div><div>{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/spiral-feather.svg" alt="" /><b>תוכן</b><small>+ אפשר להוסיף</small></div><div>{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/spiral-colors.svg" alt="" /><b>עיצוב</b><small>+ אפשר להוסיף</small></div><div className="on">{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/spiral-browser.svg" alt="" /><b>ליווי פיתוח</b></div></div>
    </div>
    </section>
    <section className="sv-case">
    <div className="v8-container">
    <div className="sv-case-in">
    <a className="sv-case-img" href={ROUTES.workFincat}>{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/v10/fincat-card.webp" alt="חתול פיננסי" loading="lazy" /></a>
    <div className="sv-case-copy">
    <span className="sv-case-k">דוגמה מהעבודות</span>
    <h3>חתול פיננסי</h3>
    <p className="sv-case-m">5 משפכים אוטומטיים · 137% צמיחת קהל</p>
    <blockquote><p>״היכולת של אמיר לתקשר רעיונות בצורה ויזואלית פשוט יוצאת דופן. העבודה שלו מקצועית מבחינה טכנית וגם מלאת יצירתיות וחיים.״</p><footer>{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/testimonials/adi-nudel.jpg" alt="" /><span><b>עדי נודל</b>מייסדת חתול פיננסי</span></footer></blockquote>
    <a className="sv-case-link" href={ROUTES.workFincat}>לפרויקט המלא <ArrowLeftV10 size={18} /></a>
    </div>
    </div>
    </div>
    </section>
    <section className="sv-faq">
    <div className="v8-container">
    <h2 className="sv-h2">שאלות{' '}<b>שכבר שאלו אותנו</b></h2>
    <div className="sv-faq-list"><details open><summary>באילו כלים אתם עובדים?</summary><p>עם הכלים שכבר יש לכם, כשאפשר. אם חסר משהו, נמליץ על כלי שמתאים לגודל ולתקציב שלכם.</p></details><details><summary>צריך צוות טכני?</summary><p>לא. אנחנו מקימים, מחברים ומלמדים אתכם לעבוד עם זה.</p></details><details><summary>מה קורה אחרי ההקמה?</summary><p>התשתית שלכם. אפשר להמשיך לבד, ואפשר להמשיך איתנו לשיפור שוטף.</p></details><details><summary>כמה זה עולה?</summary><p>תלוי בהיקף. בשיחת ההיכרות נבין איפה אתם עומדים ונחזור אליכם עם הצעה מסודרת.</p></details></div>
    </div>
    </section>
    <section className="wf-cs-cta sv-cta">
    <div className="wf-cta-slab">
    {/* eslint-disable-next-line @next/next/no-img-element */}<img className="wf-cta-hand" src="/otter-hand.svg" alt="" aria-hidden="true" />
    {/* eslint-disable-next-line @next/next/no-img-element */}<img className="wf-cta-star wf-cta-star--b" src="/v10/ico-stars.png" alt="" aria-hidden="true" />
    <span className="wf-cta-sticker wf-cta-sticker--a">1-2 חודשים</span>
    <span className="wf-cta-sticker wf-cta-sticker--b">אוטומציה</span>
    <span className="wf-cta-sticker wf-cta-sticker--c">רואים מה עובד{' '}<em>✓</em></span>
    <div className="wf-cta-copy">
    <p className="wf-cta-k">עדיין עובדים ידנית?</p>
    <h2>תשתית שעובדת<br /><mark>בשבילכם.</mark></h2>
    <a className="wf-cta-btn" href={ROUTES.book}>בואו נבנה תשתית{' '}<span aria-hidden="true"><ArrowLeftV10 size={24} /></span></a>
    </div>
    </div>
    </section>
    <section className="sv-next"><a href={ROUTES.serviceNewsite}><small>השירות הבא</small><span className="v10-next-label">אתר למותג חדש דנדש <ArrowLeftV10 /></span></a></section>
    
    </div>
  )
}
