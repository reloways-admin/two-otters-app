import type { CSSProperties } from 'react'
import { ROUTES } from '@/components/v10/routes'

/* eslint-disable @next/next/no-img-element */
/**
 * Ported mechanically from the next-site artifact (8.10.2026), page "#work",
 * so the approved markup and copy stay exactly as Amir and Keren signed them
 * off. Styles: the artifact's own rules for this page, scoped under .v10-work-page.
 */
export default function WorkPageV10() {
  return (
    <div className="v10-work-page-body">

  <section className="v8-hero wf-hero-sm">
    <div className="v8-hero-copy">
      <h1 className="v8-hero-title"><span className="v8-hero-title-top">הצצה לתוך</span><span className="v8-hero-title-accent">הפרויקטים שלנו</span></h1>
      <p className="v8-hero-desc">כל מותג, והטאצ׳ האישי שקיבל מאיתנו.</p>
    </div>
    <div className="v8-hero-wave" aria-hidden="true"><svg viewBox="0 0 1920 196" preserveAspectRatio="none"><path d="M0,0 L480,26 L960,39.4 L1200,40.4 L1440,36.4 L1920,23.2 L1920,196 L0,196 Z"></path></svg></div>
  </section>
  <section className="wf-wk-index" aria-label="הפרויקטים בעמוד">
    <div className="v8-container">
      <p className="wf-wk-index-k">בחרנו שלושה פרויקטים, שלושה סיפורים.<br />בכל אחד מהם בחרנו <b>להתחיל מהסוף.</b></p>
      <div className="wf-wk-index-row">{' '}<a href="#wk-fincat" style={{ '--acc': "#f8f800" } as CSSProperties}><span className="n">01</span><span className="t"><b>חתול פיננסי</b><small>פינטק · מרקטפלייס פיננסי</small></span></a>{' '}<a href="#wk-5ers" style={{ '--acc': "#5aff00" } as CSSProperties}><span className="n">02</span><span className="t"><b>The 5ers</b><small>טריידינג · קהילת סוחרים</small></span></a>{' '}<a href="#wk-ewise" style={{ '--acc': "#61fff2" } as CSSProperties}><span className="n">03</span><span className="t"><b>Ewise</b><small>מיתוג מעסיק · בתהליך עכשיו</small></span></a>
      </div>
    </div>
  </section>

  {/* 01 · Fincat */}
  <section className="wf-cs" id="wk-fincat" style={{ '--acc': "#f8f800", '--soft': "#f8f800" } as CSSProperties}>
    <div className="v8-container">
      <header className="wf-cs-head">{' '}<span className="wf-cs-num">01</span>
        <div>{' '}<span className="wf-cs-kicker">פינטק · מרקטפלייס פיננסי</span>
          <h2 className="wf-cs-title">חתול פיננסי</h2>
          <p className="wf-cs-lead">קהילה פיננסית ותיקה שהפכה למותג, לאתר ולמרקטפלייס של יועצים ונותני שירות.</p>
        </div>
      </header>
      <div className="wf-cs-metrics"><div><b>137%</b><span>צמיחת קהל, מ-<bdi>52K</bdi> ל-<bdi>123K</bdi></span></div><div><b>5</b><span>משפכים אוטומטיים</span></div><div><b>5 חודשים</b><span>מאפיון להשקה</span></div></div>
      <figure className="wf-cs-hero"><img src="/v10/work/fincat-cover.jpg" alt="חתול פיננסי, עמוד הבית" loading="lazy" /></figure>
      <div className="wf-cs-story">
        <div><h3>האתגר (שאהבנו)</h3><p>קהילה גדולה ופעילה, בלי מותג שמחזיק אותה. המטרה הייתה להפוך אותה לעסק: מרקטפלייס שבו יועצים ונותני שירות פוגשים את הקהל.</p></div>
        <div><h3>מה עשינו</h3><div className="wf-steps"><span className="on">אסטרטגיה</span><span className="on">אפיון</span><span className="on">שפה</span><span className="on">תוכן</span><span className="on">עיצוב</span><span className="on">ליווי פיתוח</span></div></div>
        <div><h3>איך עבדנו</h3><p>ניגשנו לקהילה כמו למותג חדש. בנינו בסיס מותגי מאפס, תרגמנו אותו לשפה ויזואלית ולאתר, ועבדנו בצמוד לחברת הפיתוח, לקידום, למדיה ולסושיאל, כדי שכולם ידברו באותה שפה.</p></div>
      </div>
      <div className="wf-cs-shots">
        <figure><span className="wf-cs-bar" aria-hidden="true"><i></i><i></i><i></i></span><img src="/v10/work/fincat-home.png" alt="" loading="lazy" /><figcaption>עמוד הבית</figcaption></figure>
        <figure><span className="wf-cs-bar" aria-hidden="true"><i></i><i></i><i></i></span><img src="/v10/work/fincat-category.png" alt="" loading="lazy" /><figcaption>קטגוריה במרקטפלייס</figcaption></figure>
        <figure><span className="wf-cs-bar" aria-hidden="true"><i></i><i></i><i></i></span><img src="/v10/work/fincat-profile.png" alt="" loading="lazy" /><figcaption>פרופיל של נותנת שירות</figcaption></figure>
      </div>
      <div className="wf-cs-split">
        <figure className="wf-cs-board"><img src="/v10/work/pt-fincat-board.webp" alt="השפה הוויזואלית של חתול פיננסי" loading="lazy" /><figcaption>השפה הוויזואלית: טיפוגרפיה, צבע, איורים ורכיבים</figcaption></figure>
        <blockquote className="wf-cs-quote"><p>״היכולת של אמיר לתקשר רעיונות בצורה ויזואלית פשוט יוצאת דופן. העבודה שלו מקצועית מבחינה טכנית וגם מלאת יצירתיות וחיים.״</p><footer><img src="/v10/work/adi-nudel.jpg" alt="" /><span><b>עדי נודל</b>מייסדת חתול פיננסי</span></footer></blockquote>
      </div>{' '}<a className="wf-cs-more" href={ROUTES.caseFincat}>לסיפור המלא של חתול פיננסי ←</a>
    </div>
  </section>

  {/* 02 · The 5ers */}
  <section className="wf-cs wf-cs--alt" id="wk-5ers" style={{ '--acc': "#5aff00", '--soft': "#5aff00" } as CSSProperties}>
    <div className="v8-container">
      <header className="wf-cs-head">{' '}<span className="wf-cs-num">02</span>
        <div>{' '}<span className="wf-cs-kicker">טריידינג · קהילת סוחרים</span>
          <h2 className="wf-cs-title">The 5ers</h2>
          <p className="wf-cs-lead">לתת פנים לכסף. סיפור מותג, מסרים וטרמינולוגיה לכל הצוות, ומשם אפיון, שפה ויזואלית ואתר.</p>
        </div>
      </header>
      <div className="wf-cs-metrics"><div><b>3 חודשים</b><span>של אסטרטגיה לפני העיצוב</span></div><div><b>3</b><span>עמודי תווך מקצועיים בשפה אחת</span></div><div><b>13</b><span>תבניות בפיגמה, ישר לפיתוח</span></div></div>
      <figure className="wf-cs-hero"><img src="/v10/work/pt-5ers-home.webp" alt="The 5ers, עמוד הבית" loading="lazy" /></figure>
      <div className="wf-cs-story">
        <div><h3>האתגר (שאהבנו)</h3><p>צוות שיווק פנימי חזק, אבל השיווק עבד בטלאים. חסרה עין חיצונית שתחבר את הכל לשפת מותג אחת.</p></div>
        <div><h3>מה עשינו</h3><div className="wf-steps"><span className="on">אסטרטגיה</span><span className="on">סיפור מותג</span><span className="on">מסרים</span><span className="on">טון דיבור</span><span className="on">UX</span><span className="on">תוכן</span><span className="on">עיצוב</span></div></div>
        <div><h3>הרעיון</h3><p>כסף הוא עולם יבש. בנינו עולם שבו אנשים ופנים נמצאים בחזית, ומעליהם סימני דולר ושווקים עולים. טון ידידותי, אבל כזה שמוביל.</p></div>
      </div>
      <div className="wf-cs-duo">
        <figure><span className="wf-cs-bar" aria-hidden="true"><i></i><i></i><i></i></span><img src="/v10/work/pt-5ers-plans.webp" alt="" loading="lazy" /><figcaption>מסלולי המימון</figcaption></figure>
        <figure><span className="wf-cs-bar" aria-hidden="true"><i></i><i></i><i></i></span><img src="/v10/work/pt-5ers-stories.webp" alt="" loading="lazy" /><figcaption>סיפורי הצלחה של סוחרים</figcaption></figure>
      </div>
      <div className="wf-cs-split">
        <figure className="wf-cs-board"><img src="/v10/work/pt-5ers-board.webp" alt="השפה הוויזואלית של The 5ers" loading="lazy" /><figcaption>שפה אחת לכל האתר, עם ניואנס לכל עמוד תווך</figcaption></figure>
        <blockquote className="wf-cs-quote"><p>״קרן לקחה בעלות מלאה על הפרויקט, ועד מהרה הפכה לחלק בלתי נפרד מהצוות האסטרטגי הפנימי שלנו, שלא כמו כל צד שלישי אחר שהיינו מעורבים בו.״</p><footer><img src="/v10/work/gil-ben-hor.jpg" alt="" /><span><b>גיל בן חור</b>מנכ״ל ומייסד The 5ers</span></footer></blockquote>
      </div>
    </div>
  </section>

  {/* 03 · Ewise */}
  <section className="wf-cs" id="wk-ewise" style={{ '--acc': "#61fff2", '--soft': "#61fff2" } as CSSProperties}>
    <div className="v8-container">
      <header className="wf-cs-head">{' '}<span className="wf-cs-num">03</span>
        <div>{' '}<span className="wf-cs-kicker">מיתוג מעסיק · סטוריטלינג <em className="wf-cs-live">בתהליך עכשיו</em></span>
          <h2 className="wf-cs-title">Ewise</h2>
          <p className="wf-cs-lead">מותג שמוכר רלוונטיות, וצריך שהנכסים שלו יוכיחו את ההבטחה. בונים מחדש את סיפור המותג, הערכים וטון הדיבור, ומתרגמים אותם לשפה ויזואלית, לאתר ולסט אייקונים.</p>
        </div>
      </header>
      <div className="wf-cs-feature">
        <figure className="wf-cs-hero"><img src="/v10/work/ewise-card.jpg" alt="Ewise, הכיוון הוויזואלי" loading="lazy" /></figure>
        <div className="wf-cs-notes">
          <div><b>8</b><span>ראיונות עומק עם לקוחות, שמהם נבנה המיצוב</span></div>
          <div><h3>הרעיון</h3><p>הלוויתן הוא הלקוח, המותג המוביל. הסונאר הוא Ewise, הכלי שמאתר מה רלוונטי. התמונה מביאה את העומק, והמילים מביאות את הרלוונטיות.</p></div>
          <div className="wf-steps"><span className="on">מחקר לקוחות</span><span className="on">מיצוב</span><span className="on">סיפור מותג</span><span className="on">טון דיבור</span><span className="on">עיצוב</span><span>אתר</span></div>
        </div>
      </div>
      <figure className="wf-ewb" aria-label="השפה של Ewise">
        <div className="wf-ewb-grid">
          <div className="wf-ewb-pal">{' '}<span style={{ '--c': "#0D2240" } as CSSProperties}><b>Primary</b>#0D2240</span>{' '}<span style={{ '--c': "#081528" } as CSSProperties}><b>Deep</b>#081528</span>{' '}<span style={{ '--c': "#FF1C2C" } as CSSProperties}><b>Brand</b>#FF1C2C</span>{' '}<span className="lt" style={{ '--c': "#FBF5E9" } as CSSProperties}><b>Cream</b>#FBF5E9</span>{' '}<span className="lt" style={{ '--c': "#85B2FC" } as CSSProperties}><b>Sonar</b>#85B2FC</span>
          </div>
          <div className="wf-ewb-type">
            <p className="w4">מותגים שנשארים</p>
            <p className="w5"><em>רלוונטיים</em> שואלים</p>
            <p className="w7">שאלות <em>עמוקות</em></p>
            <small>Google Sans · Regular · Medium · Bold</small>
          </div>
          <div className="wf-ewb-tags"><span>סטוריטלינג</span><span className="r">אסטרטגיה ומיתוג</span><span className="b">לינקדאין</span><span>כלי AI</span><span className="r">מיתוג מעסיק</span></div>
          <div className="wf-ewb-cards">
            <div><img src="/v10/work/ew-gl-sonar-broadcast.png" alt="" /><b>מפעילות את הסונאר</b><small><em>ניהול מלא</em> מהאסטרטגיה ועד התוצאה</small></div>
            <div><img src="/v10/work/ew-gl-positioning.png" alt="" /><b>מנווטות יחד</b><small><em>ליווי צמוד</em> לצד הצוות בכל החלטה</small></div>
            <div><img src="/v10/work/ew-gl-strategy.png" alt="" /><b>סונאר קבוע בארגון</b><small><em>כלים ותשתיות AI</em> שנשארים אצלכם</small></div>
            <div><img src="/v10/work/ew-gl-persona.png" alt="" /><b>מלמדות לנווט</b><small><em>הדרכות וסדנאות</em> לצוותים</small></div>
          </div>
          <div className="wf-ewb-cta"><span className="btn">לקביעת פגישה ללא עלות</span><span className="sel">איך תרצו שנעמיק? <i>⌄</i></span></div>
          <div className="wf-ewb-icons"><img src="/v10/work/ew-gl-whale.png" alt="" /><img src="/v10/work/ew-gl-sonar.png" alt="" /><img src="/v10/work/ew-gl-sonar-broadcast.png" alt="" /><img src="/v10/work/ew-gl-deep-listen.png" alt="" /><img src="/v10/work/ew-gl-depth.png" alt="" /><img src="/v10/work/ew-gl-curiosity.png" alt="" /><img src="/v10/work/ew-gl-storytelling.png" alt="" /><img src="/v10/work/ew-gl-growth.png" alt="" /><small>Sonar · 86 אייקונים</small></div>
          <div className="wf-ewb-hero"><img src="/v10/work/ewise-card.jpg" alt="" loading="lazy" /></div>
          <div className="wf-ewb-stat"><b>8</b><span>ראיונות עומק עם לקוחות, שמהם נבנה המיצוב</span></div>
        </div>
        <figcaption>עומק, מרחק, רלוונטיות: הלוויתן הוא הלקוח, הסונאר הוא Ewise</figcaption>
      </figure>
    </div>
  </section>

  <section className="wf-cs-cta" aria-labelledby="wf-cta-h">
    <div className="wf-cta-slab">
      <img className="wf-cta-hand" src="/otter-hand.svg" alt="" aria-hidden="true" />
      <img className="wf-cta-star wf-cta-star--b" src="/v10/work/ico-stars.png" alt="" aria-hidden="true" />{' '}<span className="wf-cta-sticker wf-cta-sticker--a">30 דקות</span>{' '}<span className="wf-cta-sticker wf-cta-sticker--b">בלי התחייבות</span>{' '}<span className="wf-cta-sticker wf-cta-sticker--c">כיוון ברור <em>✓</em></span>
      <div className="wf-cta-copy">
        <p className="wf-cta-k">כבר מתרגשים כי...</p>
        <h2 id="wf-cta-h">הפרויקט הבא<br />יכול להיות <mark>שלכם.</mark></h2>{' '}<a className="wf-cta-btn" href={ROUTES.book}>לשיחת היכרות ללא עלות <span aria-hidden="true">←</span></a>
      </div>
    </div>
  </section>

  {/* own products */}
  <section className="wf-cs-own">
    <div className="v8-container">
      <h2 className="wf-cs-own-h">אנחנו גם <b>בונים לעצמנו</b></h2>
      <p className="wf-cs-own-sub">לחקור מתודות עבודה וכלים חדשים זה חלק מהתשוקה שלנו - עובדה, אנחנו עושים את זה גם עבורנו</p>
      <div className="wf-cs-own-row">
        <article style={{ '--acc': "#945eee" } as CSSProperties}><img src="/v10/work/pt-qc-home.webp" alt="QueenCademy" loading="lazy" /><div><small>קרן · אקדמיה</small><b>QueenCademy</b><p>אקדמיה לבעלי עסקים שרוצים ללמוד לחשוב שיווק. קרן מחזיקה את האסטרטגיה, התוכן וחוויית הלמידה.</p></div></article>
        <article style={{ '--acc': "#61fff2" } as CSSProperties}><img src="/v10/work/pt-rw-home.webp" alt="Reloways" loading="lazy" /><div><small>אמיר · פלטפורמה</small><b>Reloways</b><p>פלטפורמה לישראלים שעוברים לגרמניה: 130 מדריכים, 35 עסקים ופודקאסט. אמיר בונה אותה לבד, מהמוצר ועד הקוד.</p></div></article>
      </div>
    </div>
  </section>

    </div>
  )
}
