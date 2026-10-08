import type { CSSProperties } from 'react'
import { ROUTES } from '@/components/v10/routes'
import { whatsappLink } from '@/components/v10/whatsapp'

/* eslint-disable @next/next/no-img-element */
/**
 * Ported mechanically from the next-site artifact (8.10.2026), page "#about",
 * so the approved markup and copy stay exactly as Amir and Keren signed them
 * off. Styles: the artifact's own rules for this page, scoped under .v10-about-page.
 */
export default function AboutPageV10() {
  return (
    <div className="v10-about-page-body">

  <section className="v8-hero wf-hero-sm">
    <div className="v8-hero-copy">
      <h1 className="v8-hero-title"><span className="v8-hero-title-top">אנחנו מסיימים אחד לשני את המשפטים.</span><span className="v8-hero-title-accent">ואת המסכים.</span></h1>
      <p className="v8-hero-desc ab-hero-desc">קרן יודעת <b>מה המותג צריך להגיד.</b><br />אמיר יודע <b>איך זה ייראה ויעבוד.</b><br />אתם מקבלים <b className="g">את שניהם באותה שיחה.</b></p>
    </div>
    <div className="v8-hero-wave" aria-hidden="true"><svg viewBox="0 0 1920 196" preserveAspectRatio="none"><path d="M0,0 L480,26 L960,39.4 L1200,40.4 L1440,36.4 L1920,23.2 L1920,196 L0,196 Z"></path></svg></div>
  </section>
  <section className="v8-about">
    <div className="v8-container v8-about-grid">
      <div className="v8-about-text">
        <h2 className="v8-about-title"><span className="v8-about-olah-row"><span className="v8-about-olah">אולה!</span><img src="/otter-hand.svg" alt="" className="v8-about-hand" aria-hidden="true" /></span><span className="v8-about-names">אנחנו אמיר וקרן.</span></h2>
        <p className="v8-about-body">אנחנו אמיר וקרן, ויחד אנחנו Two Otters Studio. מאז שהכרנו אי שם במתנ״ס כשהיינו בתיכון, הזרם לקח אותנו להרבה מקומות, אבל כמו לוטרות אמיתיות, תמיד אחזנו ידיים ונשארנו יחד.</p>
        <p className="v8-about-body">למרות שעברו למעלה משני עשורים מאז התיכון, אנחנו ידועים בשובבות ושנינות בכל הדברים שאנחנו עושים. כן, אתם צודקים, כמו לוטרות (מינוס השנינות, אין לנו דרך לבדוק את זה).</p>
        <p className="v8-about-body">וכאן מוטיב הלוטרות חוזר. כי הן גם שחייניות מצויינות ויודעות להגיב מהר בזמן אמת. ממש כמו התוצאות שאנחנו מספקים ללקוחות שלנו.</p>
        <p className="v8-about-body"><b>למה לסמוך עלינו?</b> לא כי אנחנו חברים מהתיכון. אלא כי אמיר שלו הוא מומחה UX ו-UI עם נסיון עשיר בבניית מוצרים מורכבים, וקרן רייטלר היא מומחית אסטרטגיה, סטוריטלינג ושפה מוצרית.</p>
        <p className="v8-about-body">ויחד? יחד אנחנו מוציאים לאוויר העולם בדיוק מה שהיה לכם בראש. <b>רק מהר יותר ממה שציפיתם.</b></p><div className="ab-facts"><span>חברים מ-2001</span><span className="b">שתי לוטרות</span><span className="c">סטודיו אחד</span></div>
      </div>
      <div className="v8-about-visual"><div className="v8-about-frame"><img src="/about-couch.jpg" alt="אמיר שלו וקרן רייטלר" className="v8-about-couch" /><img src="/about-bubble-amir.svg" alt="" className="v8-about-bubble v8-about-bubble--amir" /><img src="/about-bubble-keren.svg" alt="" className="v8-about-bubble v8-about-bubble--keren" /><img src="/about-browser.svg" alt="" className="v8-about-deco v8-about-deco--browser" aria-hidden="true" /><img src="/about-horse.svg" alt="" className="v8-about-deco v8-about-deco--knight" aria-hidden="true" /></div></div>
    </div>
  </section>
  <section className="ab-duo">
    <div className="v8-container">
      <h2 className="sv-h2">שני ראשים, <b>תהליך אחד</b></h2>
      <div className="ab-duo-row">
        <article className="ab-card" style={{ '--c': "#945eee" } as CSSProperties}>
          <div className="ab-card-pic"><img className="ab-pic-k ab-pic-kk" src="/v8-hero-keren.png" alt="קרן רייטלר" loading="lazy" /></div>
          <div className="ab-card-copy">{' '}<span className="ab-role">ה״מה״ · השכל והמסר</span>
            <h3>קרן רייטלר</h3>
            <p>אסטרטגיה, סטוריטלינג ושפה מוצרית. <b>הסופר-פאואר</b> שלה: למצוא את מה שמבדל אתכם, ולתרגם אותו למילים שאנשים זוכרים.</p>
            <div className="ab-tags"><span>אסטרטגיה</span><span>סיפור מותג</span><span>מסרים</span><span>תוכן</span></div>{' '}<a className="wf-ask-btn ab-wa" href={whatsappLink("keren")} target="_blank" rel="noopener" data-wa="keren">דברו עם קרן <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.7a2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3Z"/></svg></a>
          </div>
        </article>{' '}<span className="ab-plus" aria-hidden="true">+</span>
        <article className="ab-card" style={{ '--c': "#5aff00" } as CSSProperties}>
          <div className="ab-card-pic"><img className="ab-pic-k" src="/v10/about/amir-about.webp" alt="אמיר שלו" loading="lazy" /></div>
          <div className="ab-card-copy">{' '}<span className="ab-role">ה״איך״ · הגוף והביצוע</span>
            <h3>אמיר שלו</h3>
            <p>UX ו-UI, עם ניסיון עשיר בבניית מוצרים מורכבים. <b>הסופר-פאואר</b> שלו: להפוך רעיון לחוויה שאפשר ללחוץ עליה ולהרגיש אותה.</p>
            <div className="ab-tags"><span>UX</span><span>UI</span><span>פרוטוטייפ</span><span>שפה עיצובית</span></div>{' '}<a className="wf-ask-btn ab-wa" href={whatsappLink("amir")} target="_blank" rel="noopener" data-wa="amir">דברו עם אמיר <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.7a2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3Z"/></svg></a>
          </div>
        </article>
      </div>
    </div>
  </section>
  <section className="wf-sec tint">
    <div className="v8-container">
      <h2 className="v8-section-heading">במה <span className="bold">אנחנו מאמינים</span></h2>
      <div className="wf-grid wf-values ab-values">
        <div className="wf-value" style={{ 'background': "#5aff00" } as CSSProperties}><h3>דיוק</h3><p>לרצות לעבוד במהירות אף פעם לא מגיע על חשבון דיוק. אנחנו רצים מהר, אבל תמיד עם מפה. יש לנו מתודה מוכחת שמוודאת שהמהירות לא מגיעה על חשבון הדבר הכי חשוב, שזה יהיה נכון עבורכם.</p></div>
        <div className="wf-value" style={{ 'background': "#f8f800" } as CSSProperties}><h3>מהירות ואג׳יליות</h3><p>יש לנו יכולת לספק תוצאה שהייתה לוקחת חודשים, בכמה חודשים בודדים. ״האני מאמין״ העסקי שלנו, הוא שאתם צריכים לראות את זה עובד, להרגיש את חווית המשתמש ולהיות מסוגלים לראות בעיניים שלכם איך המוצר או האתר נראים, לפני שהתחייבתם לכיוון, כי להיות גמישים, לשנות ולדייק זה חלק מהתהליך.</p></div>
        <div className="wf-value" style={{ 'background': "#61fff2" } as CSSProperties}><h3>עצמאות</h3><p>אתם אף פעם לא תלויים בנו כדי להמשיך לפתח את המותג שלכם. ה-Hand-Off הלא פחות ממושלם שלנו כולל קבצים, דוחות וקווים מנחים לעיצוב והשפה. אנחנו יוצרים סטנדרט חדש בתעשייה, כי בעיניינו ככה זה אמור לעבוד.</p></div>
        <div className="wf-value" style={{ 'background': "#945eee", 'color': "#fff" } as CSSProperties}><h3>סדר מתוך כאוס</h3><p>תנו לנו להפיח בויז׳ן שלכם חיים. לתרגם את הרעיונות שלכם למוצר, לשפה, לויזואליה, בזה אנחנו הכי טובים. אנחנו אתכם לאורך כל הדרך כדי לוודא שהתוצאה הכי מדויקת למה שהיה לכם בראש.</p></div>
        <div className="wf-value" style={{ 'background': "#ff6d2c" } as CSSProperties}><h3>פאן :)</h3><p>אנחנו מתעקשים על זה. העבודה הכי טובה קורית כשיש אנרגיה טובה בחדר (בחדר של הזום 🙂). אם זה לא מרגיש ככה, זה הסימן הראשון שמשהו לא עובד. לכן, אנחנו בוחרים את הלקוחות שלנו בפינצטה, כי תהליך נעים וזורם מביא את הפרויקטים הכי טובים לאוויר העולם.</p></div>
      </div>
    </div>
  </section>
  <section className="wf-sec wf-sec--people"><div className="wf-band wf-band--people">
    <div className="wf-band-copy"><h2>בואו נכיר <em>באמת.</em></h2><p>שיחה של 30 דקות, ונראה יחד איפה אנחנו נכנסים.</p>
      <div className="wf-home-actions"><a className="wf-btn-lime" href={ROUTES.contact}>דברו איתנו</a><a className="wf-btn-outline" href={ROUTES.services}>מה אנחנו עושים</a></div></div>
    <div className="wf-people wf-people--duo"><img src="/v10/about/duo-about2.webp" alt="קרן רייטלר ואמיר שלו" /><span className="duo-lbl duo-lbl--k"><b>קרן רייטלר</b>אסטרטגיה ומסרים</span><span className="duo-lbl duo-lbl--a"><b>אמיר שלו</b>UX/UI ועיצוב מוצר</span></div>
  </div></section>

    </div>
  )
}
