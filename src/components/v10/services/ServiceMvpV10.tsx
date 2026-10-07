import type { CSSProperties } from 'react'
import { ROUTES } from '@/components/v10/routes'

/**
 * Service page "service-mvp": hero, pains, timeline, deliverables, spiral, quote, FAQ, CTA.
 *
 * Ported mechanically from the next-site artifact (version 1791388654, 7.10.2026),
 * page "#service-mvp", so the approved markup and copy stay exactly as Amir and Keren
 * signed them off. Styles: app/v10/services/services.css (the artifact's own
 * rules, scoped under .v10-services). Copy is still inline here; moving it into
 * a locale file is a follow-up (see the 7.10 review report).
 */
export default function ServiceMvpV10() {
  return (
    <div className="v10-svc-page v10-svc-page--mvp" style={{ '--svc': '#5aff00' } as CSSProperties}>
    
    <section className="sv-hero">
    <div className="sv-hero-in">
    <div className="sv-hero-copy">
    <span className="wf-crumb sv-crumb"><a href={ROUTES.services}>שירותים</a>{' '}/ מרעיון למוצר</span>
    <h1 className="sv-h1">מרעיון למוצר<br /><span>במהירות הבזק.</span></h1>
    <p className="sv-lead">מתחילים מהאסטרטגיה, עוברים לאפיון ומגיעים לפרוטוטייפ עובד שאפשר ללחוץ עליו, להרגיש אותו ולשנות אותו. בסוף הספרינט הכל מאושר, מתועד ומוכן לשלב הבא.</p>
    <div className="sv-hero-cta"><a className="sv-btn" href={ROUTES.book}>בואו נתחיל ספרינט{' '}<span aria-hidden="true">←</span></a><a className="sv-btn-ghost" href={ROUTES.contact}>שליחת הודעה</a></div>
    </div>
    <div className="sv-hero-art" aria-hidden="true">
    <span className="sv-ring"></span>
    {/* eslint-disable-next-line @next/next/no-img-element */}<img className="sv-art-main" src="/offer-illus-1-fast.svg" alt="" />
    {/* eslint-disable-next-line @next/next/no-img-element */}<img className="sv-art-sat sv-art-sat--a" src="/step-3.svg" alt="" />
    {/* eslint-disable-next-line @next/next/no-img-element */}<img className="sv-art-sat sv-art-sat--b" src="/step-1.svg" alt="" />
    <span className="wf-sa-chip sv-chip sv-chip--a"><b>שבוע 1</b><i className="wf-sa-prog"><i style={{ width: "100%" }}></i></i><b>שבוע 6</b></span>
    <span className="wf-sa-chip sv-chip sv-chip--b">פרוטוטייפ לחיץ{' '}<em>✓</em></span>
    <span className="wf-sa-chip sv-chip sv-chip--c">בלי שורת קוד אחת</span>
    </div>
    </div>
    <div className="sv-facts">
    <div><small>כמה זמן</small><b>עד 6 שבועות</b></div>
    <div><small>למי</small><b>מי שיש לו רעיון למוצר או לפלטפורמה</b></div>
    <div><small>עם מה יוצאים</small><b>פרוטוטייפ, אפיון ותיעוד לפיתוח</b></div>
    </div>
    </section>
    <section className="sv-pain">
    <div className="v8-container">
    <h2 className="sv-h2">נשמע{' '}<b>מוכר?</b></h2>
    <div className="sv-bubbles">
    <p className="sv-bubble">״יש לנו רעיון מצוין, אבל כל אחד בצוות רואה אותו אחרת.״</p>
    <p className="sv-bubble sv-bubble--alt">״המפתחים מחכים לאפיון, ואנחנו עוד לא בטוחים מה בדיוק בונים.״</p>
    <p className="sv-bubble">״צריך להראות למשקיעים משהו שאפשר לגעת בו, לא עוד מצגת.״</p>
    </div>
    <p className="sv-answer">ספרינט אחד מסדר את זה.{' '}<mark>כולם רואים את אותו מוצר, לוחצים עליו ומחליטים.</mark></p>
    </div>
    </section>
    <section className="sv-time">
    <div className="v8-container">
    <h2 className="sv-h2 sv-h2--light">שישה שבועות,{' '}<b>שבוע אחרי שבוע</b></h2>
    <p className="sv-sub">כל שבוע נגמר במשהו שאפשר לראות. אתם לא מחכים לסוף כדי לדעת איפה אנחנו.</p>
    <ol className="sv-track">
    <li><span className="sv-wk">שבוע 1</span>{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/step-1.svg" alt="" /><b>אסטרטגיה</b><p>מכירים את המוצר, את הקהל ואת השוק, ומחליטים מה בונים ולמה.</p><em>בריף אסטרטגי</em></li>
    <li><span className="sv-wk">שבוע 2</span>{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/step-2.svg" alt="" /><b>מיפוי</b><p>מסע המשתמש ומפת המסכים: מה קורה, באיזה סדר, ומה קורה כשמשהו משתבש.</p><em>מפת מסכים</em></li>
    <li className="sv-wide"><span className="sv-wk">שבועות 3-4</span>{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/step-3.svg" alt="" /><b>אפיון ופרוטוטייפ</b><p>בונים את המסכים כפרוטוטייפ עובד. כל כמה ימים אתם לוחצים, מגיבים, ואנחנו מדייקים.</p><em>פרוטוטייפ לחיץ</em></li>
    <li><span className="sv-wk">שבוע 5</span>{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/v10/ico-cursor.png" alt="" /><b>דיוק</b><p>בודקים מול משתמשים או מול הצוות, ומתקנים מה שלא עובד.</p><em>סבב תיקונים</em></li>
    <li><span className="sv-wk">שבוע 6</span>{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/step-4.svg" alt="" /><b>האנד אוף</b><p>תיעוד, הערות וקווים מנחים, כדי שהצוות שממשיך מכאן לא ינחש.</p><em>חבילת מסירה</em></li>
    </ol>
    </div>
    </section>
    <section className="sv-get">
    <div className="v8-container">
    <h2 className="sv-h2">מה{' '}<b>נשאר אצלכם</b>{' '}בסוף</h2>
    <div className="sv-objs">
    <article><div className="sv-mock sv-mock--doc" aria-hidden="true"><b>בריף</b><i></i><i></i><i className="s"></i><i></i><i className="s"></i></div><b>בריף אסטרטגי חד</b><p>מה בונים, למי, ולמה דווקא ככה.</p></article>
    <article><div className="sv-mock sv-mock--flow" aria-hidden="true"><i></i><i></i><i></i><i></i><svg viewBox="0 0 200 120" preserveAspectRatio="none"><path d="M40 30 C 90 30, 90 30, 160 30 M40 30 C 60 90, 90 90, 100 90 M160 30 C 150 80, 120 90, 100 90" /></svg></div><b>אפיון UX</b><p>מה כל מסך עושה ואיך עוברים ביניהם.</p></article>
    <article><div className="sv-mock sv-mock--phone" aria-hidden="true"><span><i></i><i className="s"></i><i className="btn"></i><u></u></span></div><b>פרוטוטייפ עובד</b><p>אפשר ללחוץ עליו, להרגיש אותו ולשנות אותו.</p></article>
    <article><div className="sv-mock sv-mock--files" aria-hidden="true"><i>flows.fig</i><i>specs.pdf</i><i>notes.md</i></div><b>האנד אוף מסודר</b><p>תיעוד וקווים מנחים לצוות שממשיך מכאן.</p></article>
    </div>
    </div>
    </section>
    <section className="sv-spiral">
    <div className="v8-container">
    <h2 className="sv-h2">איפה זה יושב{' '}<b>בספירלה</b></h2>
    <p className="sv-sub sv-sub--dark">ארבעת השלבים הראשונים כלולים. אם אוהבים את הכיוון, ממשיכים איתנו הלאה.</p>
    <div className="sv-steps">
    <div className="on">{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/step-1.svg" alt="" /><b>אסטרטגיה</b></div>
    <div className="on">{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/step-2.svg" alt="" /><b>אפיון</b></div>
    <div className="on">{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/step-3.svg" alt="" /><b>פרוטוטייפ</b></div>
    <div className="on">{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/step-4.svg" alt="" /><b>האנד אוף</b></div>
    <div>{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/spiral-megaphone.svg" alt="" /><b>שפה</b><small>+ אפשר להוסיף</small></div>
    <div>{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/spiral-feather.svg" alt="" /><b>תוכן</b><small>+ אפשר להוסיף</small></div>
    <div>{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/spiral-colors.svg" alt="" /><b>עיצוב</b><small>+ אפשר להוסיף</small></div>
    <div>{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/spiral-browser.svg" alt="" /><b>ליווי פיתוח</b><small>+ אפשר להוסיף</small></div>
    </div>
    </div>
    </section>
    <section className="sv-quote">
    <div className="v8-container">
    <blockquote className="wf-cs-quote sv-q" style={{ '--acc': "#5aff00" } as CSSProperties}><p>״היכולת של אמיר לתקשר רעיונות בצורה ויזואלית פשוט יוצאת דופן. העבודה שלו מקצועית מבחינה טכנית וגם מלאת יצירתיות וחיים.״</p><footer>{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/testimonials/adi-nudel.jpg" alt="" /><span><b>עדי נודל</b>מייסדת חתול פיננסי</span></footer></blockquote>
    </div>
    </section>
    <section className="sv-faq">
    <div className="v8-container">
    <h2 className="sv-h2">שאלות{' '}<b>שכבר שאלו אותנו</b></h2>
    <div className="sv-faq-list">
    <details open><summary>צריך להגיע עם אפיון או בריף?</summary><p>לא. מספיק רעיון וקהל שאתם רוצים לשרת. את הבריף כותבים יחד בשבוע הראשון.</p></details>
    <details><summary>הפרוטוטייפ הוא קוד?</summary><p>לא. זה פרוטוטייפ לחיץ שמרגיש כמו מוצר אמיתי, ומשמש את המפתחים כבסיס לבנייה.</p></details>
    <details><summary>מה קורה אחרי שבוע 6?</summary><p>אפשר להמשיך עם הצוות שלכם, עם כל מה שצריך ביד. ואפשר להמשיך איתנו בספירלה: שפה, תוכן, עיצוב וליווי פיתוח.</p></details>
    <details><summary>כמה זה עולה?</summary><p>תלוי בהיקף. בשיחת ההיכרות נבין את הרעיון ונחזור אליכם עם הצעה מסודרת.</p></details>
    </div>
    </div>
    </section>
    <section className="wf-cs-cta sv-cta">
    <div className="wf-cta-slab">
    {/* eslint-disable-next-line @next/next/no-img-element */}<img className="wf-cta-hand" src="/otter-hand.svg" alt="" aria-hidden="true" />
    {/* eslint-disable-next-line @next/next/no-img-element */}<img className="wf-cta-star wf-cta-star--b" src="/v10/ico-stars.png" alt="" aria-hidden="true" />
    <span className="wf-cta-sticker wf-cta-sticker--a">עד 6 שבועות</span>
    <span className="wf-cta-sticker wf-cta-sticker--b">פרוטוטייפ לחיץ</span>
    <span className="wf-cta-sticker wf-cta-sticker--c">מוכן לפיתוח{' '}<em>✓</em></span>
    <div className="wf-cta-copy">
    <p className="wf-cta-k">יש לכם רעיון?</p>
    <h2>בעוד שישה שבועות<br />תוכלו{' '}<mark>ללחוץ עליו.</mark></h2>
    <a className="wf-cta-btn" href={ROUTES.book}>בואו נתחיל ספרינט{' '}<span aria-hidden="true">←</span></a>
    </div>
    </div>
    </section>
    <section className="sv-next"><a href={ROUTES.serviceUpgrade}><small>השירות הבא</small>לשדרג את האתר הקיים ←</a></section>
    
    </div>
  )
}
