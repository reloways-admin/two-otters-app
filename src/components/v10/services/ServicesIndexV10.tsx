import type { CSSProperties } from 'react'
import { ROUTES } from '@/components/v10/routes'

/**
 * The services page: four services, the spiral with steps 5–8, what you leave with.
 *
 * Ported mechanically from the next-site artifact (version 1791388654, 7.10.2026),
 * page "#services", so the approved markup and copy stay exactly as Amir and Keren
 * signed them off. Styles: app/v10/services/services.css (the artifact's own
 * rules, scoped under .v10-services). Copy is still inline here; moving it into
 * a locale file is a follow-up (see the 7.10 review report).
 */
export default function ServicesIndexV10() {
  return (
    <div className="v10-services-index">
    
    <section className="v8-hero wf-hero-sm">
    <div className="v8-hero-copy">
    <h1 className="v8-hero-title"><span className="v8-hero-title-top">אז מה בא לכם</span><span className="v8-hero-title-accent">שנעשה יחד?</span></h1>
    <p className="v8-hero-desc">ארבעה שירותים, כולם על אותה שיטה. אפשר לקחת את כל התהליך, או רק את החלק שחסר לכם.</p>
    </div>
    <div className="v8-hero-wave" aria-hidden="true"><svg viewBox="0 0 1920 196" preserveAspectRatio="none"><path d="M0,0 L480,26 L960,39.4 L1200,40.4 L1440,36.4 L1920,23.2 L1920,196 L0,196 Z"></path></svg></div>
    </section>
    <section className="wf-sec" style={{ paddingTop: "20px" }}>
    <div className="v8-container">
    <div className="v8-svc-filters"><a href={ROUTES.serviceMvp} className="v8-svc-filter">מרעיון למוצר</a><a href={ROUTES.serviceUpgrade} className="v8-svc-filter">שדרוג אתר</a><a href={ROUTES.serviceMarketing} className="v8-svc-filter">תשתית שיווקית</a><a href={ROUTES.serviceNewsite} className="v8-svc-filter">אתר למותג חדש</a></div>
    <div className="wf-services">
    <article className="wf-service" id="svc-mvp">
    <div className="wf-service-art" style={{ '--sa': "#5aff00" } as CSSProperties} aria-hidden="true">
    <span className="wf-sa-halo"></span>
    {/* eslint-disable-next-line @next/next/no-img-element */}<img className="wf-sa-main" src="/offer-illus-1-fast.svg" alt="" />
    {/* eslint-disable-next-line @next/next/no-img-element */}<img className="wf-sa-sat wf-sa-sat--tl" src="/step-3.svg" alt="" />
    <span className="wf-sa-chip wf-sa-chip--a"><b>שבוע 1</b><i className="wf-sa-prog"><i style={{ width: "100%" }}></i></i><b>שבוע 6</b></span>
    <span className="wf-sa-chip wf-sa-chip--b">פרוטוטייפ לחיץ{' '}<em>✓</em></span>
    </div>
    <div className="wf-service-body">
    <span className="wf-service-time">עד 6 שבועות</span>
    <h2>מרעיון למוצר במהירות הבזק</h2><p className="wf-service-sub">מתחילים ומסיימים בספרינט</p>
    <div className="wf-service-tags"><span>אסטרטגיה</span><span>חווית משתמש</span><span>יצירת פרוטוטייפ עובד</span></div>
    <div className="wf-service-desc"><p>מתחילים מהאסטרטגיה. עוברים לאפיון. מגיעים לפרוטוטייפ עובד שאפשר ללחוץ עליו, להרגיש אותו ולשנות אותו. יוצאים עם הכל מאושר, מתועד ומוכן לשלב הבא.</p></div>
    <div className="wf-service-cols">
    <div><h3>למי זה מתאים</h3><p>יש לכם רעיון למוצר או לפלטפורמה, ואתם רוצים לראות אותו עובד לפני שמשקיעים בעיצוב מלא ובפיתוח.</p></div>
    <div><h3>מה מקבלים</h3><ul><li>בריף אסטרטגי חד</li><li>אפיון UX של המסכים והמעברים</li><li>פרוטוטייפ שאפשר ללחוץ עליו</li><li>תיעוד ו-Hand-Off לצוות הפיתוח</li></ul></div>
    </div>
    <div className="wf-svc-foot"><a className="wf-btn-dark" href={ROUTES.serviceMvp}>אשמח לקרוא עוד ←</a><a className="wf-btn-ghost" href={ROUTES.contact}>שליחת הודעה</a></div>
    </div>
    </article>
    <article className="wf-service" id="svc-upgrade">
    <div className="wf-service-art" style={{ '--sa': "#f8f800" } as CSSProperties} aria-hidden="true">
    <span className="wf-sa-halo"></span>
    {/* eslint-disable-next-line @next/next/no-img-element */}<img className="wf-sa-main" src="/offer-illus-2-upgrade.svg" alt="" />
    {/* eslint-disable-next-line @next/next/no-img-element */}<img className="wf-sa-sat wf-sa-sat--tl wf-sa-old" src="/about-browser.svg" alt="" />
    <span className="wf-sa-chip wf-sa-chip--a"><s>האתר של פעם</s>{' '}←{' '}<b>האתר של היום</b></span>
    <span className="wf-sa-chip wf-sa-chip--b">מסרים שמבדלים{' '}<em>✓</em></span>
    </div>
    <div className="wf-service-body">
    <span className="wf-service-time">4-6 חודשים</span>
    <h2>לשדרג את האתר הקיים</h2>
    <div className="wf-service-tags"><span>אסטרטגיית מותג</span><span>חווית משתמש</span><span>מיתוג טרמינולוגי</span><span>שפה עיצובית</span><span>סטוריטלינג</span></div>
    <div className="wf-service-desc"><p>העסק התקדם, והאתר נשאר מאחור. בונים אותו מחדש סביב המטרות של היום: מסרים שמבדלים אתכם, מבנה שמוביל לפנייה, ועיצוב שמחזק את המוניטין.</p><p>ואם זה ישאיר אבק לתחרות, לא נתנגד.</p></div>
    <div className="wf-service-cols">
    <div><h3>למי זה מתאים</h3><p>יש לכם אתר שעובד, אבל הוא כבר לא מספר מי אתם היום, לא מבדל אתכם ולא מביא את הפניות שהוא צריך.</p></div>
    <div><h3>מה מקבלים</h3><ul><li>סיפור מותג, מסרים וטון דיבור</li><li>מפת אתר ואפיון לכל עמוד</li><li>תוכן לכל העמודים</li><li>שפה עיצובית וקבצי עיצוב</li></ul></div>
    </div>
    <div className="wf-svc-foot"><a className="wf-btn-dark" href={ROUTES.serviceUpgrade}>אשמח לקרוא עוד ←</a><a className="wf-btn-ghost" href={ROUTES.contact}>שליחת הודעה</a></div>
    </div>
    </article>
    <article className="wf-service" id="svc-marketing">
    <div className="wf-service-art" style={{ '--sa': "#61fff2" } as CSSProperties} aria-hidden="true">
    <span className="wf-sa-halo"></span>
    {/* eslint-disable-next-line @next/next/no-img-element */}<img className="wf-sa-main" src="/offer-illus-3-marketing.svg" alt="" />
    {/* eslint-disable-next-line @next/next/no-img-element */}<img className="wf-sa-sat wf-sa-sat--tl" src="/v10/ico-chart.png" alt="" />
    <span className="wf-sa-chip wf-sa-chip--a"><i className="wf-sa-dot"></i>אוטומציה פעילה</span>
    <span className="wf-sa-chip wf-sa-chip--b wf-sa-bars"><i style={{ height: "30%" }}></i><i style={{ height: "55%" }}></i><i style={{ height: "42%" }}></i><i style={{ height: "78%" }}></i><i style={{ height: "100%" }}></i><span>מה עובד</span></span>
    </div>
    <div className="wf-service-body">
    <span className="wf-service-time">1-2 חודשי הקמה</span>
    <h2>תשתית שיווקית שכל עסק צריך</h2>
    <div className="wf-service-tags"><span>מסעות לקוח</span><span>דאשבורד נתונים</span><span>הגדלת קהילה</span><span>הגדלת מכירות</span><span>חיבור מערכות</span><span>אוטומציה</span></div>
    <div className="wf-service-desc"><p>בונים לכם מסעות לקוח, אוטומציות ודשבורדים שמחליפים את העבודה הידנית. ככה רואים סוף סוף מה מביא לקוחות, ומשקיעים רק במה שעובד.</p><p>לעבוד חכם, לא קשה.</p></div>
    <div className="wf-service-cols">
    <div><h3>למי זה מתאים</h3><p>העבודה השיווקית אצלכם ידנית ומפוזרת בין כלים, ואין לכם תמונה ברורה של מה מביא לקוחות.</p></div>
    <div><h3>מה מקבלים</h3><ul><li>מיפוי מסע הלקוח</li><li>משפכים ואוטומציות</li><li>חיבור בין המערכות</li><li>דשבורד שמראה מה עובד</li></ul></div>
    </div>
    <div className="wf-svc-foot"><a className="wf-btn-dark" href={ROUTES.serviceMarketing}>אשמח לקרוא עוד ←</a><a className="wf-btn-ghost" href={ROUTES.contact}>שליחת הודעה</a></div>
    </div>
    </article>
    <article className="wf-service" id="svc-newsite">
    <div className="wf-service-art" style={{ '--sa': "#ff6d2c" } as CSSProperties} aria-hidden="true">
    <span className="wf-sa-halo"></span>
    {/* eslint-disable-next-line @next/next/no-img-element */}<img className="wf-sa-main" src="/offer-illus-4-new-brand.svg" alt="" />
    {/* eslint-disable-next-line @next/next/no-img-element */}<img className="wf-sa-sat wf-sa-sat--tl" src="/spiral-colors.svg" alt="" />
    {/* eslint-disable-next-line @next/next/no-img-element */}<img className="wf-sa-sat wf-sa-sat--br" src="/step-4.svg" alt="" />
    <span className="wf-sa-chip wf-sa-chip--a">מותג חדש{' '}<em>✦</em></span>
    <span className="wf-sa-chip wf-sa-chip--b">באוויר{' '}<em>✓</em></span>
    </div>
    <div className="wf-service-body">
    <span className="wf-service-time">4-6 חודשים</span>
    <h2>אתר למותג חדש דנדש</h2>
    <div className="wf-service-tags"><span>אסטרטגיית מותג</span><span>חווית משתמש</span><span>מיתוג טרמינולוגי</span><span>שפה עיצובית</span><span>סטוריטלינג</span></div>
    <div className="wf-service-desc"><p>מותג חדש צריך אתר שזוכרים ושמניע לפעולה. בונים אותו מהאסטרטגיה ועד הפיקסל האחרון: מהיר, מדויק ומוכן לאוויר.</p><p>כי רושם ראשוני עושים פעם אחת.</p></div>
    <div className="wf-service-cols">
    <div><h3>למי זה מתאים</h3><p>אתם מותג חדש, או עסק שיוצא לריברנדינג, וצריכים לבנות בסיס מותגי ואתר מאפס.</p></div>
    <div><h3>מה מקבלים</h3><ul><li>מיצוב, קהלים וסיפור מותג</li><li>טון דיבור וטרמינולוגיה</li><li>אפיון ותוכן לאתר</li><li>שפה עיצובית וליווי עד שהאתר באוויר</li></ul></div>
    </div>
    <div className="wf-svc-foot"><a className="wf-btn-dark" href={ROUTES.serviceNewsite}>אשמח לקרוא עוד ←</a><a className="wf-btn-ghost" href={ROUTES.contact}>שליחת הודעה</a></div>
    </div>
    </article>
    </div>
    </div>
    </section>
    <section className="v8-spiral">
    <div className="v8-container">
    <div className="v8-spiral-header"><h2 className="v8-spiral-title">שלב אחרי שלב<br /><span className="bold">שיטת הספירלה</span></h2><p className="v8-spiral-sub">השלבים רצים במקביל ומתדייקים תוך כדי תנועה.</p></div>
    <div className="v8-spiral-canvas">{/* eslint-disable-next-line @next/next/no-img-element */}<img className="v8-spiral-svg" src="/spiral-loop.svg" alt="" aria-hidden="true" />
    <div className="v8-spiral-top-grid">
    <div className="v8-spiral-card v8-spiral-card-1" style={{ background: "#5aff00", color: "#1d2332" }}><span className="v8-spiral-card-num">1</span><div className="v8-spiral-card-text"><p className="v8-spiral-card-title">האסטרטגיה</p><p className="v8-spiral-card-subtitle">נקודת ההתחלה</p></div><p className="v8-spiral-card-body">הבנה עמוקה של המוצר, השוק והמטרות, שמתורגמת לבריף חד שרצים עליו.</p>{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/step-1.svg" alt="" aria-hidden="true" className="v8-spiral-card-illus" /></div>
    <div className="v8-spiral-card v8-spiral-card-2" style={{ background: "#945eee", color: "#ffffff" }}><span className="v8-spiral-card-num">2</span><div className="v8-spiral-card-text"><p className="v8-spiral-card-title">האפיון</p><p className="v8-spiral-card-subtitle">אפיון UX אסטרטגי</p></div><p className="v8-spiral-card-body">מה כל מסך עושה, איך עוברים ביניהם, ומה קורה כשמשהו לא הולך כמתוכנן.</p>{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/step-2.svg" alt="" aria-hidden="true" className="v8-spiral-card-illus" /></div>
    <div className="v8-spiral-card v8-spiral-card-3" style={{ background: "#f8f800", color: "#1d2332" }}><span className="v8-spiral-card-num">3</span><div className="v8-spiral-card-text"><p className="v8-spiral-card-title">הפרוטוטייפ</p><p className="v8-spiral-card-subtitle">עובד במהירות שיא</p></div><p className="v8-spiral-card-body">פרוטוטייפ עובד שאפשר ללחוץ עליו, להרגיש אותו ולתת עליו פידבק קונקרטי.</p>{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/step-3.svg" alt="" aria-hidden="true" className="v8-spiral-card-illus" /></div>
    <div className="v8-spiral-card v8-spiral-card-4" style={{ background: "#2672ff", color: "#ffffff" }}><span className="v8-spiral-card-num">4</span><div className="v8-spiral-card-text"><p className="v8-spiral-card-title">ה-Hand-Off</p><p className="v8-spiral-card-subtitle">מסירה מלאה</p></div><p className="v8-spiral-card-body">פרוטוטייפ מאושר, תיעוד מלא וקווים מנחים ברורים.</p>{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/step-4.svg" alt="" aria-hidden="true" className="v8-spiral-card-illus" /></div>
    {/* eslint-disable-next-line @next/next/no-img-element */}<img src="/step-1.svg" alt="" className="v8-spiral-horse" aria-hidden="true" />{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/step-2.svg" alt="" className="v8-spiral-papers" aria-hidden="true" />{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/step-3.svg" alt="" className="v8-spiral-screens" aria-hidden="true" />{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/step-4.svg" alt="" className="v8-spiral-spaceship" aria-hidden="true" />
    </div>
    </div>
    <div className="v8-spiral-more"><h3 className="v8-spiral-more-title">אל תעצרו באפיון...</h3><p className="v8-spiral-more-sub">ככה אנחנו לוקחים אתכם עד שהמוצר חי, בועט ובאוויר</p></div>
    <div className="v8-spiral-steps">
    <div className="v8-spiral-step">{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/spiral-megaphone.svg" alt="" aria-hidden="true" className="v8-spiral-step-icon" /><div className="v8-spiral-step-content"><span className="v8-spiral-step-num">#05</span><p className="v8-spiral-step-title">פיתוח השפה</p><p className="v8-spiral-step-subtitle">יוצקים למותג אופי</p><p className="v8-spiral-step-body">אופי, צורת דיבור, טרמינולוגיה וקווים מנחים לכתיבה, כדי שהקהל יזהה את המותג וירגיש שהוא מכיר אותו.</p></div></div>
    <div className="v8-spiral-step">{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/spiral-feather.svg" alt="" aria-hidden="true" className="v8-spiral-step-icon" /><div className="v8-spiral-step-content"><span className="v8-spiral-step-num">#06</span><p className="v8-spiral-step-title">כתיבת התוכן</p><p className="v8-spiral-step-subtitle">המילים שמובילות את המוצר</p><p className="v8-spiral-step-body">התוכן לאתר, לפלטפורמה או לאפליקציה, באופי המדויק של המותג ובהתאם לאסטרטגיה ולעיצוב.</p></div></div>
    <div className="v8-spiral-step">{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/spiral-colors.svg" alt="" aria-hidden="true" className="v8-spiral-step-icon" /><div className="v8-spiral-step-content"><span className="v8-spiral-step-num">#07</span><p className="v8-spiral-step-title">העיצוב</p><p className="v8-spiral-step-subtitle">מלבישים את המוצר</p><p className="v8-spiral-step-body">המסרים והאופי הופכים לשפה גרפית: צבע, טיפוגרפיה, אלמנטים וקומפוננטות, עד הפיקסל האחרון.</p></div></div>
    <div className="v8-spiral-step">{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/spiral-browser.svg" alt="" aria-hidden="true" className="v8-spiral-step-icon" /><div className="v8-spiral-step-content"><span className="v8-spiral-step-num">#08</span><p className="v8-spiral-step-title">הפיתוח</p><p className="v8-spiral-step-subtitle">ליווי עד שזה באוויר</p><p className="v8-spiral-step-body">מוודאים שהעיצוב וחוויית המשתמש מובנים נכון, עד שמה שיוצא לאוויר נראה בדיוק כמו מה שתכננו.</p></div></div>
    </div>
    </div>
    </section>
    <section className="wf-sec tint">
    <div className="v8-container">
    <h2 className="v8-section-heading">מה{' '}<span className="bold">עובר אליכם</span>{' '}בסוף</h2>
    <div className="wf-deliver">
    <div><p><b>פרוטוטייפ שראיתם ואישרתם</b></p></div>
    <div><p><b>בסיס מותגי ומסרים</b><span>מיצוב, קהלים, סיפור מותג, טון דיבור וטרמינולוגיה.</span></p></div>
    <div><p><b>אפיון מלא</b><span>מה כל מסך עושה, מה קורה כשאין מידע ומה קורה כשמשהו נכשל.</span></p></div>
    <div><p><b>מפת אתר ומבנה עמודים</b><span>היררכיה, כותרות ותוכן לכל עמוד.</span></p></div>
    <div><p><b>קבצי העיצוב, הקומפוננטות והאייקונים</b></p></div>
    <div><p><b>תיעוד של מה שהוחלט ולמה</b><span>כולל דברים שנשארו פתוחים.</span></p></div>
    </div>
    </div>
    </section>
    <section className="wf-sec wf-sec--start"><div className="wf-band wf-band--start"><div><h2>לא בטוחים{' '}<em>מאיפה להתחיל?</em></h2><p>שיחה של 30 דקות, או בדיקה של האתר הקיים שלכם.</p><a className="wf-btn-lime wf-start-btn" href={ROUTES.contact}>דברו איתנו ←</a></div><div className="wf-start-pic" aria-hidden="true">{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/v10/duo-people.webp" alt="" /></div></div></section>
    
    </div>
  )
}
