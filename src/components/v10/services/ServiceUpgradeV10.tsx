import type { CSSProperties } from 'react'
import { ROUTES } from '@/components/v10/routes'

/**
 * Service page "service-upgrade": hero, pains, timeline, deliverables, spiral, quote, FAQ, CTA.
 *
 * Ported mechanically from the next-site artifact (version 1791388654, 7.10.2026),
 * page "#service-upgrade", so the approved markup and copy stay exactly as Amir and Keren
 * signed them off. Styles: app/v10/services/services.css (the artifact's own
 * rules, scoped under .v10-services). Copy is still inline here; moving it into
 * a locale file is a follow-up (see the 7.10 review report).
 */
export default function ServiceUpgradeV10() {
  return (
    <div className="v10-svc-page v10-svc-page--upgrade" style={{ '--svc': '#f8f800' } as CSSProperties}>
    
    <section className="sv-hero">
    <div className="sv-hero-in">
    <div className="sv-hero-copy">
    <span className="wf-crumb sv-crumb"><a href={ROUTES.services}>שירותים</a>{' '}/ לשדרג את האתר הקיים</span>
    <h1 className="sv-h1">לשדרג את<br /><span>האתר הקיים.</span></h1>
    <p className="sv-lead">העסק התקדם, והאתר נשאר מאחור. בונים אותו מחדש סביב המטרות של היום: מסרים שמבדלים אתכם, מבנה שמוביל לפנייה, ועיצוב שמחזק את המוניטין. ואם זה ישאיר אבק לתחרות, לא נתנגד.</p>
    <div className="sv-hero-cta"><a className="sv-btn" href={ROUTES.book}>בואו נשדרג את האתר{' '}<span aria-hidden="true">←</span></a><a className="sv-btn-ghost" href={ROUTES.contact}>שליחת הודעה</a></div>
    </div>
    <div className="sv-hero-art" aria-hidden="true">
    <span className="sv-ring"></span>
    {/* eslint-disable-next-line @next/next/no-img-element */}<img className="sv-art-main" src="/offer-illus-2-upgrade.svg" alt="" />
    {/* eslint-disable-next-line @next/next/no-img-element */}<img className="sv-art-sat sv-art-sat--a wf-sa-old" src="/about-browser.svg" alt="" />{/* eslint-disable-next-line @next/next/no-img-element */}<img className="sv-art-sat sv-art-sat--b" src="/step-2.svg" alt="" />
    <span className="wf-sa-chip sv-chip sv-chip--a"><s>האתר של פעם</s>{' '}←{' '}<b>האתר של היום</b></span>
    <span className="wf-sa-chip sv-chip sv-chip--b">מסרים שמבדלים{' '}<em>✓</em></span>
    <span className="wf-sa-chip sv-chip sv-chip--c">מבנה שמוביל לפנייה</span>
    </div>
    </div>
    <div className="sv-facts">
    <div><small>כמה זמן</small><b>4-6 חודשים</b></div>
    <div><small>למי</small><b>עסקים שהאתר נשאר מאחוריהם</b></div>
    <div><small>עם מה יוצאים</small><b>מסרים, אפיון, תוכן ועיצוב</b></div>
    </div>
    </section>
    <section className="sv-pain">
    <div className="v8-container">
    <h2 className="sv-h2">נשמע{' '}<b>מוכר?</b></h2>
    <div className="sv-bubbles"><p className="sv-bubble">״האתר נבנה לפני כמה שנים, והעסק כבר במקום אחר לגמרי.״</p><p className="sv-bubble sv-bubble--alt">״אנשים נכנסים לאתר ולא מבינים מה אנחנו עושים אחרת מהמתחרים.״</p><p className="sv-bubble">״יש תנועה לאתר, אבל כמעט אין פניות.״</p></div>
    <p className="sv-answer">שדרוג אחד מסדר את זה.{' '}<mark>אתר שמספר מי אתם היום, ומוביל לפנייה.</mark></p>
    </div>
    </section>
    <section className="sv-time">
    <div className="v8-container">
    <h2 className="sv-h2 sv-h2--light">עד שישה חודשים,{' '}<b>חודש אחרי חודש</b></h2>
    <p className="sv-sub">ציר משוער. כל חודש נגמר במשהו שאפשר לראות, ואתר קטן יכול להיגמר מהר יותר.</p>
    <ol className="sv-track"><li><span className="sv-wk">חודש 1</span>{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/step-1.svg" alt="" /><b>אבחון ואסטרטגיה</b><p>בודקים מה עובד באתר הקיים ומה לא, ומחדדים את סיפור המותג והמסרים.</p><em>סיפור מותג ומסרים</em></li><li><span className="sv-wk">חודש 2</span>{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/step-2.svg" alt="" /><b>מבנה</b><p>מפת אתר חדשה ואפיון לכל עמוד: מה הוא אומר ולאן הוא מוביל.</p><em>מפת אתר ואפיון</em></li><li className="sv-wide"><span className="sv-wk">חודשים 3-4</span>{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/spiral-feather.svg" alt="" /><b>תוכן ועיצוב</b><p>כותבים ומעצבים במקביל, כדי שהמילים והעיצוב יחזקו אחד את השני.</p><em>תוכן ועיצוב לכל העמודים</em></li><li><span className="sv-wk">חודש 5</span>{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/spiral-browser.svg" alt="" /><b>פיתוח</b><p>ליווי צמוד של המפתחים, כדי שמה שעולה לאוויר ייראה בדיוק כמו שתכננו.</p><em>ליווי פיתוח</em></li><li><span className="sv-wk">חודש 6</span>{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/step-4.svg" alt="" /><b>עלייה לאוויר</b><p>בדיקות אחרונות, תיקונים, ואתר חדש באוויר.</p><em>אתר באוויר</em></li></ol>
    </div>
    </section>
    <section className="sv-get">
    <div className="v8-container">
    <h2 className="sv-h2">מה{' '}<b>נשאר אצלכם</b>{' '}בסוף</h2>
    <div className="sv-objs"><article><div className="sv-mock sv-mock--doc" aria-hidden="true"><b>מסרים</b><i></i><i></i><i className="s"></i><i></i><i className="s"></i></div><b>סיפור מותג ומסרים</b><p>מיצוב, טון דיבור וטרמינולוגיה.</p></article><article><div className="sv-mock sv-mock--flow" aria-hidden="true"><i></i><i></i><i></i><i></i><svg viewBox="0 0 200 120" preserveAspectRatio="none"><path d="M40 30 C 90 30, 90 30, 160 30 M40 30 C 60 90, 90 90, 100 90 M160 30 C 150 80, 120 90, 100 90" /></svg></div><b>מפת אתר ואפיון</b><p>היררכיה ותפקיד לכל עמוד.</p></article><article><div className="sv-mock sv-mock--browser" aria-hidden="true"><span><em></em><i></i><i className="s"></i><i className="btn"></i></span></div><b>תוכן לכל העמודים</b><p>הטקסטים לכל האתר, באופי של המותג.</p></article><article><div className="sv-mock sv-mock--swatch" aria-hidden="true"><i></i><i></i><i></i><i></i><b>Aa</b></div><b>שפה עיצובית</b><p>קבצי עיצוב, קומפוננטות וליווי עד שזה באוויר.</p></article></div>
    </div>
    </section>
    <section className="sv-spiral">
    <div className="v8-container">
    <h2 className="sv-h2">איפה זה יושב{' '}<b>בספירלה</b></h2>
    <p className="sv-sub sv-sub--dark">השלבים המסומנים כלולים בשירות. כל שלב אחר אפשר להוסיף.</p>
    <div className="sv-steps"><div className="on">{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/step-1.svg" alt="" /><b>אסטרטגיה</b></div><div className="on">{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/step-2.svg" alt="" /><b>אפיון</b></div><div>{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/step-3.svg" alt="" /><b>פרוטוטייפ</b><small>+ אפשר להוסיף</small></div><div>{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/step-4.svg" alt="" /><b>Hand-Off</b><small>+ אפשר להוסיף</small></div><div className="on">{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/spiral-megaphone.svg" alt="" /><b>שפה</b></div><div className="on">{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/spiral-feather.svg" alt="" /><b>תוכן</b></div><div className="on">{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/spiral-colors.svg" alt="" /><b>עיצוב</b></div><div className="on">{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/spiral-browser.svg" alt="" /><b>ליווי פיתוח</b></div></div>
    </div>
    </section>
    <section className="sv-case">
    <div className="v8-container">
    <div className="sv-case-in">
    <a className="sv-case-img" href={ROUTES.work5ers}>{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/v10/the5ers-card.webp" alt="The 5ers" loading="lazy" /></a>
    <div className="sv-case-copy">
    <span className="sv-case-k">דוגמה מהעבודות</span>
    <h3>The 5ers</h3>
    <p className="sv-case-m">3 חודשי אסטרטגיה לפני העיצוב · 13 תבניות לאתר</p>
    <blockquote><p>״קרן לקחה בעלות מלאה על הפרויקט, ועד מהרה הפכה לחלק בלתי נפרד מהצוות האסטרטגי הפנימי שלנו, שלא כמו כל צד שלישי אחר שהיינו מעורבים בו.״</p><footer>{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/v10/gil-ben-hor.jpg" alt="" /><span><b>גיל בן חור</b>מנכ״ל ומייסד The 5ers</span></footer></blockquote>
    <a className="sv-case-link" href={ROUTES.work5ers}>לפרויקט המלא ←</a>
    </div>
    </div>
    </div>
    </section>
    <section className="sv-faq">
    <div className="v8-container">
    <h2 className="sv-h2">שאלות{' '}<b>שכבר שאלו אותנו</b></h2>
    <div className="sv-faq-list"><details open><summary>אפשר לשמור על חלקים מהאתר הקיים?</summary><p>כן. מתחילים מאבחון ושומרים את מה שעובד. לא בונים מחדש רק בשביל לבנות מחדש.</p></details><details><summary>מי מפתח את האתר?</summary><p>הצוות שלכם או המפתחים שאתם עובדים איתם. אנחנו מלווים אותם צמוד, עד שמה שעולה לאוויר נראה בדיוק כמו שתכננו.</p></details><details><summary>מה אתם צריכים מאיתנו?</summary><p>גישה לאתר ולנתונים שיש, ואנשים שמכירים את העסק ויכולים לענות על שאלות. את השאר אנחנו מובילים.</p></details><details><summary>כמה זה עולה?</summary><p>תלוי בהיקף. בשיחת ההיכרות נבין איפה אתם עומדים ונחזור אליכם עם הצעה מסודרת.</p></details></div>
    </div>
    </section>
    <section className="wf-cs-cta sv-cta">
    <div className="wf-cta-slab">
    {/* eslint-disable-next-line @next/next/no-img-element */}<img className="wf-cta-hand" src="/otter-hand.svg" alt="" aria-hidden="true" />
    {/* eslint-disable-next-line @next/next/no-img-element */}<img className="wf-cta-star wf-cta-star--b" src="/v10/ico-stars.png" alt="" aria-hidden="true" />
    <span className="wf-cta-sticker wf-cta-sticker--a">4-6 חודשים</span>
    <span className="wf-cta-sticker wf-cta-sticker--b">מסרים חדים</span>
    <span className="wf-cta-sticker wf-cta-sticker--c">מוביל לפנייה{' '}<em>✓</em></span>
    <div className="wf-cta-copy">
    <p className="wf-cta-k">האתר נשאר מאחור?</p>
    <h2>הגיע הזמן<br /><mark>לאתר של היום.</mark></h2>
    <a className="wf-cta-btn" href={ROUTES.book}>בואו נשדרג את האתר{' '}<span aria-hidden="true">←</span></a>
    </div>
    </div>
    </section>
    <section className="sv-next"><a href={ROUTES.serviceMarketing}><small>השירות הבא</small>תשתית שיווקית שכל עסק צריך ←</a></section>
    
    </div>
  )
}
