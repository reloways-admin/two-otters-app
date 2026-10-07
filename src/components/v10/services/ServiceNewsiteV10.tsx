import type { CSSProperties } from 'react'
import { ROUTES } from '@/components/v10/routes'

/**
 * Service page "service-newsite": hero, pains, timeline, deliverables, spiral, quote, FAQ, CTA.
 *
 * Ported mechanically from the next-site artifact (version 1791388654, 7.10.2026),
 * page "#service-newsite", so the approved markup and copy stay exactly as Amir and Keren
 * signed them off. Styles: app/v10/services/services.css (the artifact's own
 * rules, scoped under .v10-services). Copy is still inline here; moving it into
 * a locale file is a follow-up (see the 7.10 review report).
 */
export default function ServiceNewsiteV10() {
  return (
    <div className="v10-svc-page v10-svc-page--newsite" style={{ '--svc': '#ff6d2c' } as CSSProperties}>
    
    <section className="sv-hero">
    <div className="sv-hero-in">
    <div className="sv-hero-copy">
    <span className="wf-crumb sv-crumb"><a href={ROUTES.services}>שירותים</a>{' '}/ אתר למותג חדש</span>
    <h1 className="sv-h1">אתר למותג<br /><span>חדש דנדש.</span></h1>
    <p className="sv-lead">מותג חדש צריך אתר שזוכרים ושמניע לפעולה. בונים אותו מהאסטרטגיה ועד הפיקסל האחרון: מהיר, מדויק ומוכן לאוויר. כי רושם ראשוני עושים פעם אחת.</p>
    <div className="sv-hero-cta"><a className="sv-btn" href={ROUTES.book}>בואו נבנה אתר חדש{' '}<span aria-hidden="true">←</span></a><a className="sv-btn-ghost" href={ROUTES.contact}>שליחת הודעה</a></div>
    </div>
    <div className="sv-hero-art" aria-hidden="true">
    <span className="sv-ring"></span>
    {/* eslint-disable-next-line @next/next/no-img-element */}<img className="sv-art-main" src="/offer-illus-4-new-brand.svg" alt="" />
    {/* eslint-disable-next-line @next/next/no-img-element */}<img className="sv-art-sat sv-art-sat--a" src="/spiral-colors.svg" alt="" />{/* eslint-disable-next-line @next/next/no-img-element */}<img className="sv-art-sat sv-art-sat--b" src="/step-4.svg" alt="" />
    <span className="wf-sa-chip sv-chip sv-chip--a">מותג חדש{' '}<em>✦</em></span>
    <span className="wf-sa-chip sv-chip sv-chip--b">באוויר{' '}<em>✓</em></span>
    <span className="wf-sa-chip sv-chip sv-chip--c">מהאסטרטגיה ועד הפיקסל</span>
    </div>
    </div>
    <div className="sv-facts">
    <div><small>כמה זמן</small><b>4-6 חודשים</b></div>
    <div><small>למי</small><b>מותגים חדשים ועסקים בריברנדינג</b></div>
    <div><small>עם מה יוצאים</small><b>בסיס מותגי, שפה, תוכן ועיצוב</b></div>
    </div>
    </section>
    <section className="sv-pain">
    <div className="v8-container">
    <h2 className="sv-h2">נשמע{' '}<b>מוכר?</b></h2>
    <div className="sv-bubbles"><p className="sv-bubble">״אנחנו יוצאים לדרך, ואין לנו אפילו משפט אחד שמסביר מי אנחנו.״</p><p className="sv-bubble sv-bubble--alt">״המעצב מחכה לתוכן, הכותב מחכה לעיצוב, וכולם מחכים לאסטרטגיה.״</p><p className="sv-bubble">״אנחנו רוצים אתר שזוכרים, לא עוד תבנית.״</p></div>
    <p className="sv-answer">מותג חדש מתחיל במקום אחד.{' '}<mark>אסטרטגיה, תוכן ועיצוב שנבנים יחד.</mark></p>
    </div>
    </section>
    <section className="sv-time">
    <div className="v8-container">
    <h2 className="sv-h2 sv-h2--light">עד שישה חודשים,{' '}<b>חודש אחרי חודש</b></h2>
    <p className="sv-sub">ציר משוער. כל חודש נגמר במשהו שאפשר לראות.</p>
    <ol className="sv-track"><li><span className="sv-wk">חודש 1</span>{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/step-1.svg" alt="" /><b>בסיס מותגי</b><p>מיצוב, קהלים וסיפור מותג. כל מה שהאתר יעמוד עליו.</p><em>בסיס מותגי</em></li><li><span className="sv-wk">חודש 2</span>{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/spiral-megaphone.svg" alt="" /><b>שפה ומבנה</b><p>טון דיבור, טרמינולוגיה, מפת אתר ואפיון לכל עמוד.</p><em>שפה ואפיון</em></li><li className="sv-wide"><span className="sv-wk">חודשים 3-4</span>{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/spiral-colors.svg" alt="" /><b>תוכן ועיצוב</b><p>כותבים ומעצבים יחד, מהמסר ועד הפיקסל האחרון.</p><em>תוכן ושפה עיצובית</em></li><li><span className="sv-wk">חודש 5</span>{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/spiral-browser.svg" alt="" /><b>פיתוח</b><p>ליווי צמוד של המפתחים, עד שהכל יושב בדיוק.</p><em>ליווי פיתוח</em></li><li><span className="sv-wk">חודש 6</span>{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/step-4.svg" alt="" /><b>השקה</b><p>עולים לאוויר עם אתר שזוכרים, ומותג שיודע מה הוא אומר.</p><em>אתר באוויר</em></li></ol>
    </div>
    </section>
    <section className="sv-get">
    <div className="v8-container">
    <h2 className="sv-h2">מה{' '}<b>נשאר אצלכם</b>{' '}בסוף</h2>
    <div className="sv-objs"><article><div className="sv-mock sv-mock--doc" aria-hidden="true"><b>מיצוב</b><i></i><i></i><i className="s"></i><i></i><i className="s"></i></div><b>בסיס מותגי</b><p>מיצוב, קהלים, סיפור מותג ומסרים.</p></article><article><div className="sv-mock sv-mock--doc" aria-hidden="true"><b>טון דיבור</b><i></i><i></i><i className="s"></i><i></i><i className="s"></i></div><b>שפה</b><p>טון דיבור וטרמינולוגיה.</p></article><article><div className="sv-mock sv-mock--flow" aria-hidden="true"><i></i><i></i><i></i><i></i><svg viewBox="0 0 200 120" preserveAspectRatio="none"><path d="M40 30 C 90 30, 90 30, 160 30 M40 30 C 60 90, 90 90, 100 90 M160 30 C 150 80, 120 90, 100 90" /></svg></div><b>אפיון ותוכן</b><p>לכל עמודי האתר.</p></article><article><div className="sv-mock sv-mock--swatch" aria-hidden="true"><i></i><i></i><i></i><i></i><b>Aa</b></div><b>שפה עיצובית</b><p>וליווי הפיתוח עד שהאתר באוויר.</p></article></div>
    </div>
    </section>
    <section className="sv-spiral">
    <div className="v8-container">
    <h2 className="sv-h2">איפה זה יושב{' '}<b>בספירלה</b></h2>
    <p className="sv-sub sv-sub--dark">כל שמונת השלבים כלולים. זה השירות המלא, מההתחלה ועד שהאתר באוויר.</p>
    <div className="sv-steps"><div className="on">{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/step-1.svg" alt="" /><b>אסטרטגיה</b></div><div className="on">{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/step-2.svg" alt="" /><b>אפיון</b></div><div className="on">{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/step-3.svg" alt="" /><b>פרוטוטייפ</b></div><div className="on">{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/step-4.svg" alt="" /><b>האנד אוף</b></div><div className="on">{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/spiral-megaphone.svg" alt="" /><b>שפה</b></div><div className="on">{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/spiral-feather.svg" alt="" /><b>תוכן</b></div><div className="on">{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/spiral-colors.svg" alt="" /><b>עיצוב</b></div><div className="on">{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/spiral-browser.svg" alt="" /><b>ליווי פיתוח</b></div></div>
    </div>
    </section>
    <section className="sv-case">
    <div className="v8-container">
    <div className="sv-case-in">
    <a className="sv-case-img" href={ROUTES.workFincat}>{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/v10/fincat-card.webp" alt="חתול פיננסי" loading="lazy" /></a>
    <div className="sv-case-copy">
    <span className="sv-case-k">דוגמה מהעבודות</span>
    <h3>חתול פיננסי</h3>
    <p className="sv-case-m">בסיס מותגי מאפס · 5 חודשים מאפיון להשקה</p>
    <blockquote><p>״היכולת של אמיר לתקשר רעיונות בצורה ויזואלית פשוט יוצאת דופן. העבודה שלו מקצועית מבחינה טכנית וגם מלאת יצירתיות וחיים.״</p><footer>{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/testimonials/adi-nudel.jpg" alt="" /><span><b>עדי נודל</b>מייסדת חתול פיננסי</span></footer></blockquote>
    <a className="sv-case-link" href={ROUTES.workFincat}>לפרויקט המלא ←</a>
    </div>
    </div>
    </div>
    </section>
    <section className="sv-faq">
    <div className="v8-container">
    <h2 className="sv-h2">שאלות{' '}<b>שכבר שאלו אותנו</b></h2>
    <div className="sv-faq-list"><details open><summary>צריך כבר מיתוג קיים?</summary><p>לא. מתחילים מהבסיס המותגי, ומשם נבנים השפה, התוכן והעיצוב.</p></details><details><summary>מי מפתח את האתר?</summary><p>הצוות שלכם או המפתחים שאתם עובדים איתם. אנחנו מלווים אותם צמוד, עד שמה שעולה לאוויר נראה בדיוק כמו שתכננו.</p></details><details><summary>אפשר להתחיל רק מהאסטרטגיה?</summary><p>כן. כל שלב בספירלה עומד בפני עצמו, ואפשר להמשיך כשאתם מוכנים.</p></details><details><summary>כמה זה עולה?</summary><p>תלוי בהיקף. בשיחת ההיכרות נבין איפה אתם עומדים ונחזור אליכם עם הצעה מסודרת.</p></details></div>
    </div>
    </section>
    <section className="wf-cs-cta sv-cta">
    <div className="wf-cta-slab">
    {/* eslint-disable-next-line @next/next/no-img-element */}<img className="wf-cta-hand" src="/otter-hand.svg" alt="" aria-hidden="true" />
    {/* eslint-disable-next-line @next/next/no-img-element */}<img className="wf-cta-star wf-cta-star--b" src="/v10/ico-stars.png" alt="" aria-hidden="true" />
    <span className="wf-cta-sticker wf-cta-sticker--a">4-6 חודשים</span>
    <span className="wf-cta-sticker wf-cta-sticker--b">מהאסטרטגיה ועד הפיקסל</span>
    <span className="wf-cta-sticker wf-cta-sticker--c">באוויר{' '}<em>✓</em></span>
    <div className="wf-cta-copy">
    <p className="wf-cta-k">מותג חדש בדרך?</p>
    <h2>רושם ראשוני<br />עושים{' '}<mark>פעם אחת.</mark></h2>
    <a className="wf-cta-btn" href={ROUTES.book}>בואו נבנה אתר חדש{' '}<span aria-hidden="true">←</span></a>
    </div>
    </div>
    </section>
    <section className="sv-next"><a href={ROUTES.serviceMvp}><small>השירות הבא</small>מרעיון למוצר במהירות הבזק ←</a></section>
    
    </div>
  )
}
