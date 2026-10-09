import type { CSSProperties } from 'react'
import { ROUTES } from '@/components/v10/routes'
import ArrowLeftV10 from '@/components/v10/ArrowLeftV10'

/* eslint-disable @next/next/no-img-element */
/**
 * Ported mechanically from the next-site artifact (8.10.2026), page "#partners",
 * so the approved markup and copy stay exactly as Amir and Keren signed them
 * off. Styles: the artifact's own rules for this page, scoped under .v10-partners.
 */
export default function PartnersPageV10() {
  return (
    <div className="v10-partners-body">

{/* ============ שער ============ */}
<header className="hero navy-dots" id="pt-top">
  <div className="pt-heroart" aria-hidden="true">{' '}<span className="pt-ha pt-ha--knight"><img src="/v10/partners/pt-stage-1.webp" alt="" /></span>{' '}<span className="pt-ha pt-ha--docs"><img src="/v10/partners/pt-stage-2.webp" alt="" /></span>{' '}<span className="pt-ha pt-ha--flow"><img src="/v10/partners/pt-stage-3.webp" alt="" /></span>{' '}<span className="pt-ha pt-ha--swatch"><img src="/v10/partners/pt-hero-art.webp" alt="" /></span>{' '}<span className="pt-ha pt-ha--code"><img src="/v10/partners/pt-stage-7.webp" alt="" /></span>{' '}<span className="pt-ha pt-ha--rocket"><img src="/v10/partners/pt-stage-4.webp" alt="" /></span>{' '}<span className="pt-ha pt-ha--stars1"><img src="/v10/partners/ico-stars.png" alt="" /></span>{' '}<span className="pt-ha pt-ha--stars2"><img src="/v10/partners/ico-stars.png" alt="" /></span>
  </div>
  <div className="hero__copy">{' '}<span className="badge badge--lime hero__kicker">לסטודיואים, לבתי תוכנה ולמומחי SEO</span>
    <h1><span className="top">אסטרטגיה, מסעות לקוח, UX ו-UI.</span><span className="accent">נכנסים בכל שלב.</span></h1>
    <p className="hero__desc">אנחנו נכנסים לפרויקט שלכם ומתאימים את העבודה לצרכים שלו.<br /><span>עם אסטרטגיה או בלי, עם מיתוג קיים או בלי, לפני העיצוב או באמצע הדרך.</span></p>
    <div className="hero__actions">{' '}<a className="btn-lime" href={ROUTES.book}>לשיחה של 30 דקות</a>{' '}<a className="btn-outline" href="#pt-when">מתי מתאים שנעבוד יחד <ArrowLeftV10 /></a>
    </div>
  </div>
  <div className="hero__wave" aria-hidden="true"><svg viewBox="0 0 1920 196" preserveAspectRatio="none"><path d="M0,0 L480,26 L960,39.4 L1200,40.4 L1440,36.4 L1920,23.2 L1920,196 L0,196 Z"></path></svg></div>
</header>

{/* ============ תוכן עניינים ============ */}
<nav className="toc" aria-label="תוכן העמוד">
  <div className="toc__in">{' '}<a href="#pt-why">למה הקמנו</a>{' '}<a href="#pt-give">מה זה נותן</a>{' '}<a href="#pt-when">מתי מתאים</a>{' '}<a href="#pt-steps">השלבים</a>{' '}<a href="#pt-work">עבודות</a>{' '}<a href="#pt-together">עובדים יחד</a>{' '}<a href="#pt-deliver">תוצרים</a>{' '}<a href="#pt-own">הפרויקטים שלנו</a>
  </div>
</nav>

{/* ============ למה הקמנו את הסטודיו ============ */}
<section className="sec" id="pt-why">
  <div className="container">
    <h2 className="heading">למה <b>הקמנו את הסטודיו</b></h2>
    <div className="grid g2">
      <div className="card card--navy navy-dots">{' '}<span className="badge badge--lime">הצורך</span>
        <h3>לקוח יודע מה הוא רוצה, וכל ספק מתרגם את זה קצת אחרת.</h3>
        <p>הקמנו את Two Otters כדי שהאסטרטגיה והעיצוב ייבנו יחד, והלקוח יראה ויאשר לפני שהוא משקיע בעיצוב ובפיתוח.</p>
      </div>
      <div className="card">{' '}<span className="badge">מה הלקוח מקבל</span>
        <h3>בהתאם לצרכים של הפרויקט שלכם.</h3>
        <p>בסיס אסטרטגי, טרמינולוגיה ושפה, אפיון, פרוטוטייפ ועיצוב. הכול מתועד בדוחות ובמסמכים שהופכים לזיכרון הארגוני של הפרויקט, כך שאפשר להמשיך ולשנות גם אחרינו.</p>
      </div>
      <div className="card">{' '}<span className="badge">הלקוחות שלנו</span>
        <h3>חברות שיוצאות לריברנדינג, מוצרים חדשים, ואתרים שצריכים בסיס לפני שבונים.</h3>
        <p>עבדנו עם פינטק, קרנות מסחר, נדל״ן, קהילות ומוצרי תוכן.</p>
      </div>
      <div className="card">{' '}<span className="badge">איך אנחנו עובדים</span>
        <h3>בספירלה, לא בקו ישר.</h3>
        <p>אנחנו חוזרים ומדייקים את העבודה תוך כדי, מתחשבים בצרכים של הפרויקט ובדרך שבה אתם עובדים, ומוצאים פתרונות כשמשהו בדרך לא עובד. ככה הלקוח מקבל תוצר שלם יותר.</p>
      </div>
    </div>
  </div>
</section>

{/* ============ מה זה נותן לכם ============ */}
<section className="sec" id="pt-give" style={{ 'paddingTop': "0" } as CSSProperties}>
  <div className="container">
    <div className="give navy-dots">
      <div className="give__head">
        <div>{' '}<span className="badge badge--lime">ומה זה נותן לכם</span>
          <h2 style={{ 'marginTop': "14px" } as CSSProperties}>שותף אחד,<br /><em>עם מטרה אחת.</em></h2>
          <p className="give__lead">צוות אחד שמחזיק את האסטרטגיה, ה-UX והעיצוב בפרויקט שלכם, ומשתלב בדרך שבה אתם כבר עובדים מול הלקוח.</p>
        </div>
        <img className="give__hand" src="/v10/partners/pt-give-hand.webp" alt="" aria-hidden="true" />
      </div>
      <div className="give__grid">
        <div className="give__i"><img src="/v10/partners/pt-give-1.webp" alt="" aria-hidden="true" /><h3>נקודת קשר אחת</h3><p>צוות אחד שמנהל את כל החלקים של האסטרטגיה, ה-UX והעיצוב בפרויקט, במקום כמה ספקים שצריך לתאם ביניהם.</p></div>
        <div className="give__i"><img src="/v10/partners/pt-give-2.webp" alt="" aria-hidden="true" /><h3>ראש שקט</h3><p>סדר, שקיפות ותיעוד לאורך כל הדרך. אתם יודעים בכל רגע איפה הפרויקט עומד.</p></div>
        <div className="give__i"><img src="/v10/partners/pt-give-3.webp" alt="" aria-hidden="true" /><h3>סטודיו בוטיק</h3><p>אנחנו לוקחים שניים עד שלושה פרויקטים חדשים בחודש, כדי להשקיע בכל אחד מהם ולתת תוצאה מהירה ומדויקת.</p></div>
        <div className="give__i"><img src="/v10/partners/pt-give-4.webp" alt="" aria-hidden="true" /><h3>שותפות של win-win</h3><p>עבודה משותפת היא תמיד יד רוחצת יד. לכן אנחנו מתייחסים לשותפים שלנו בדיוק כמו שהיינו רוצים שיתייחסו אלינו.</p></div>
      </div>
    </div>
  </div>
</section>

{/* ============ מתי מביאים אותנו ============ */}
<section className="sec tint" id="pt-when">
  <div className="container">
    <h2 className="heading">מתי <b>מתאים שנעבוד יחד?</b></h2>
    <p className="anyway">אפשר לפנות אלינו <b>רק לאסטרטגיה</b> או <b>רק ל-UX ועיצוב</b> (למרות שאנחנו הכי אוהבים <b>גם וגם</b>).<br />בכל מקרה, אנחנו נכנסים להיות חלק מצוות הפרויקט.</p>
    <div className="grid g2">
      <div className="case">{' '}<span className="case__num">1</span>
        <h3>צריך לעצור ולבנות אסטרטגיה</h3>{' '}<span className="case__sub">מיצוב, סיפור מותג ומסרים</span>
        <ul>
          <li>לקוח שיוצא לריברנדינג, או מותג חדש שמתחיל מאפס.</li>
          <li>רגע שבו מבינים שאין הלימה בין מה שקורה בתוך החברה, ומה שהיא יודעת על עצמה, לבין המסרים שיוצאים החוצה.</li>
        </ul>
        <p>לפעמים לקוחות מגיעים אלינו אחרי אפיון, או אפילו אחרי עיצוב, ומבינים שצריך לעצור ולחשוב לעומק. אנחנו מחברים את האסטרטגיה למה שכבר נעשה, ומציעים שינויים שמתאימים לתקציב של הפרויקט.</p>
      </div>
      <div className="case">{' '}<span className="case__num">2</span>
        <h3>אתם מרכיבים צוות לפרויקט</h3>{' '}<span className="case__sub">אסטרטגיה, מיתוג, שפה, UX ועיצוב</span>
        <p>חשוב לכם שהפרויקט יקבל את מלוא תשומת הלב. אם הוא צריך אסטרטגיה, אפיון, שפה ויזואלית מאפס או ריברנדינג, אפשר להיעזר בנו בהכול, או רק בחלק ממה שאנחנו מציעים.</p>
        <p className="case__note">כתיבת תוכן אנחנו עושים כשהאסטרטגיה נבנתה אצלנו, כדי שהמילים יישענו על בסיס שאנחנו מכירים לעומק.</p>
      </div>
      <div className="case">{' '}<span className="case__num">3</span>
        <h3>פרויקט שהצרכים שלו השתנו</h3>{' '}<span className="case__sub">אסטרטגיה, אפיון ופרוטוטייפ</span>
        <ul>
          <li>למותג יש אתר, והוא רוצה להתרחב לפלטפורמה או למערכת מורכבת יותר (ולפעמים להפך).</li>
          <li>התחילו לרוץ על UX/UI, והבינו שחייבים לחזור רגע לאסטרטגיה ולעבוד עם בריף מסודר וברור יותר.</li>
          <li>התוצרים עד עכשיו לא היו מספיק טובים, או שהלקוח לא התחבר אליהם.</li>
          <li>כבר יש אסטרטגיה, וצריך פרוטוטייפ או עיצוב.</li>
        </ul>
        <p>נכנסים, מכניסים אסטרטגיה ואפיון, ובונים פרוטוטייפ כדי שיהיה ממה להמשיך.</p>
      </div>
      <div className="case">{' '}<span className="case__num">4</span>
        <h3>ייעוץ לפרויקט שכבר רץ</h3>{' '}<span className="case__sub">ייעוץ אסטרטגי או ליווי UX</span>
        <p>יש לכם צוות שעובד על הפרויקט, וצריך מישהו שיכוון וינהל את התהליך האסטרטגי או את חוויית המשתמש. נכנסים לייעוץ ולליווי, לצד הצוות שלכם.</p>
      </div>
    </div>
  </div>
</section>

{/* ============ שלב אחרי שלב ============ */}
<section className="sec" id="pt-steps">
  <div className="container">
    <h2 className="heading">שיטת הספירלה, <b>שלב אחרי שלב</b></h2>
    <p className="sub">אפשר להביא אותנו לכל השלבים, או רק לחלק מהם.</p>

    <div className="phase"><span>עד ה-Hand-Off</span></div>
    <div className="grid g4" style={{ 'marginTop': "0" } as CSSProperties}>
      <div className="stage s1"><span className="stage__num">01</span><p className="stage__title">האסטרטגיה</p><p className="stage__k">נקודת ההתחלה</p>
        <p className="stage__b">בסיס מותגי עם קווים מנחים לאיך המותג מדבר, מתנהג ונראה, ממש כאילו היה אדם. במסמך ברור אחד אנחנו מגדירים את האסטרטגיה שתקבע את המיצוב שלו בשוק התחרותי.</p><img className="stage__art" src="/v10/partners/pt-stage-1.webp" alt="" aria-hidden="true" /></div>
      <div className="stage s2"><span className="stage__num">02</span><p className="stage__title">האפיון</p><p className="stage__k">אפיון UX אסטרטגי</p>
        <p className="stage__b">על בסיס מחקר מתחרים ומחקר חוויית משתמש בתחום, אנחנו בונים אפיון שלם לאתר או למוצר מורכב, שמלווה את המשתמשים עד לפעולה הרצויה. על בסיס האפיון יוצאים לכתיבה ולעיצוב.</p><img className="stage__art" src="/v10/partners/pt-stage-2.webp" alt="" aria-hidden="true" /></div>
      <div className="stage s3"><span className="stage__num">03</span><p className="stage__title">הפרוטוטייפ</p><p className="stage__k">עובד במהירות שיא</p>
        <p className="stage__b">מפסיקים לדמיין ומתחילים לראות. פרוטוטייפ עובד שאפשר ללחוץ עליו ולתת עליו פידבק קונקרטי, לפני שניגשים לעיצוב ולפיתוח.</p><img className="stage__art" src="/v10/partners/pt-stage-3.webp" alt="" aria-hidden="true" /></div>
      <div className="stage s4"><span className="stage__num">04</span><p className="stage__title">Hand-Off</p><p className="stage__k">מסירה מלאה</p>
        <p className="stage__b">פרוטוטייפ מאושר, תיעוד מלא וקווים מנחים, כדי שכל מי שנוגע במוצר, מהמתכנת ועד הלקוח, ידע בדיוק מה לעשות.</p><img className="stage__art" src="/v10/partners/pt-stage-4.webp" alt="" aria-hidden="true" /></div>
    </div>

    <div className="phase"><span>אחרי ה-Hand-Off, זה מה שקורה במקביל...</span></div>
    <div className="pair">
      <div className="stage s5"><span className="stage__num">05</span><p className="stage__title">פיתוח שפה ותוכן</p><p className="stage__k">יוצקים למותג אופי</p>
        <p className="stage__b">מוצאים את האופי הייחודי של המותג: הערכים, המטרה, ואיך הוא מתנהל. מתרגמים את זה למסמך טון דיבור מדויק, ומשם כותבים תוכן שמתאים גם לאסטרטגיה וגם לאופי.</p><img className="stage__art" src="/v10/partners/pt-stage-5.webp" alt="" aria-hidden="true" /></div>{' '}<span className="pair__link" aria-hidden="true">⇄ במקביל</span>
      <div className="stage s6"><span className="stage__num">06</span><p className="stage__title">העיצוב</p><p className="stage__k">מלבישים את המוצר</p>
        <p className="stage__b">העיצוב נשען על האסטרטגיה מההתחלה, ומתרגם את המסרים והאופי לשפה גרפית: צבע, טיפוגרפיה, אלמנטים וקומפוננטות.</p><img className="stage__art" src="/v10/partners/pt-stage-6.webp" alt="" aria-hidden="true" /></div>
      <p className="pair__note"><b>השפה והעיצוב מזינים אחד את השני.</b> אלמנט עיצובי יכול להיכנס פתאום לאסטרטגיה, ומילה יכולה לשנות מסך. ככה התוצר נשאר אורגני ושלם.</p>
    </div>

    <div className="phase"><span>הפיתוח</span></div>
    <div className="stage s7 dev">
      <div><span className="stage__num">07</span><p className="stage__title">הפיתוח</p><p className="stage__k">בידיים של בתי התוכנה והסטודיואים שאנחנו עובדים איתם</p>
        <p className="stage__b">אנחנו לא מפתחים. אנחנו מוסרים הכול pixel perfect, ונשארים זמינים לשאלות, לניווט ולהבנה של איך הדבר צריך להיראות, עד שהוא באוויר.</p></div>
      <img className="stage__art" src="/v10/partners/pt-stage-7.webp" alt="" aria-hidden="true" />
    </div>
  </div>
</section>

{/* ============ עבודות ============ */}
<section className="sec alt" id="pt-work">
  <div className="container">
    <h2 className="heading">טעימה <b>מהפרויקטים שלנו</b></h2>
    <p className="sub">עבודות שבהן עבדנו לצד צוותי פיתוח, קידום ומדיה.</p>
    <div className="works">
      <article className="work" id="pt-w-fincat" style={{ '--acc': "#1d2332", '--acc-soft': "#f8f800" } as CSSProperties}>
        <button className="work__cover" type="button" data-full=""><img src="/v10/partners/pt-fincat-home.webp" alt="חתול פיננסי · עמוד הבית" /></button>
        <div className="work__info">{' '}<span className="work__kicker">פינטק · מרקטפלייס פיננסי</span>
          <h3 className="work__title">חתול פיננסי</h3>
          <p className="work__tag">קהילה פיננסית שהפכה לעסק. בנינו בסיס מותגי מאפס, אתר ומרקטפלייס של נותני שירות, ו<b>עבדנו בצמוד לחברת הפיתוח, לאשת קידום אתרים, לחברת מדיה, למאיירת ולאשת סושיאל.</b></p>
          <div className="metrics">{' '}<span className="metric"><b>137%</b> צמיחת קהל, מ-<bdi>52K</bdi> ל-<bdi>123K</bdi></span>{' '}<span className="metric"><b>5</b> חודשים מאפיון להשקה</span>
          </div>
          <div className="work__more">
            <button type="button" data-full=""><img src="/v10/partners/pt-fincat-cat.webp" alt="חתול פיננסי · עמוד קטגוריה" /></button>
            <button type="button" data-full=""><img src="/v10/partners/pt-fincat-profile.webp" alt="חתול פיננסי · פרופיל נותנת שירות" /></button>
          </div>
          <blockquote>״היכולת של אמיר לתקשר רעיונות בצורה ויזואלית פשוט יוצאת דופן.״<cite>עדי נודל · מייסדת חתול פיננסי</cite></blockquote>
        </div>
      </article>
      <article className="work" id="pt-w-5ers" style={{ '--acc': "#1d2332", '--acc-soft': "#5aff00" } as CSSProperties}>
        <button className="work__cover" type="button" data-full=""><img src="/v10/partners/pt-5ers-home.webp" alt="The 5ers · עמוד הבית" /></button>
        <div className="work__info">{' '}<span className="work__kicker">טריידינג · קהילת סוחרים</span>
          <h3 className="work__title">The 5ers</h3>
          <p className="work__tag">סיפור מותג, מסרים וטרמינולוגיה לכל הצוות, ומשם אפיון ושפה ויזואלית. <b>13 תבניות עוצבו בפיגמה ועברו לצוות הפיתוח שלהם.</b></p>
          <div className="metrics">{' '}<span className="metric"><b>3</b> חודשי אסטרטגיה לפני העיצוב</span>{' '}<span className="metric"><b>13</b> תבניות לאתר</span>
          </div>
          <div className="work__more">
            <button type="button" data-full=""><img src="/v10/partners/pt-5ers-plans.webp" alt="The 5ers · מסלולי המימון" /></button>
            <button type="button" data-full=""><img src="/v10/partners/pt-5ers-stories.webp" alt="The 5ers · סיפורי סוחרים" /></button>
          </div>
          <blockquote>״קרן לקחה בעלות מלאה על הפרויקט, עד כדי כך שהיא הרגישה כמו חלק מהצוות האסטרטגי הפנימי שלנו.״<cite>גיל בן חור · מנכ״ל ומייסד The 5ers</cite></blockquote>
        </div>
      </article>
    </div>
  </div>
</section>

{/* ============ עובדים יחד ============ */}
<section className="sec navy" id="pt-together">
  <div className="container">
    <h2 className="heading">מול הלקוח, <b>אנחנו חלק מהצוות שלכם</b></h2>
    <div className="grid g4">
      <div className="tog"><h3>הלקוח שלכם.</h3><p>אנחנו מציגים את עצמנו כחלק מהסטודיו שעובד על הפרויקט. לא נפנה ללקוח ישירות, וכל המשך עבודה איתו עובר דרככם.</p></div>
      <div className="tog"><h3>אתם מנהלים, אנחנו מתאימים.</h3><p>אתם מנהלים את הפרויקט. אנחנו עובדים לפי המתודות שלנו, ומתאימים את צורת העבודה למה שמתאים לכם. ואם תרצו שננהל אותו אנחנו, גם זו אפשרות.</p></div>
      <div className="tog"><h3>כמה פגישות שצריך.</h3><p>איתכם ועם הלקוח, גם בשלב העיצוב. מציגים, עונים על שאלות, עושים פינג-פונג עם הלקוח ומתקנים. הכול שקוף.</p></div>
      <div className="tog tog--fee"><span className="tog__big">5%</span><h3>ואם אתם מעבירים אלינו לקוח.</h3><p>לקוח שמגיע מכם ועובד ישירות מולנו? אתם מקבלים 5% עמלה מהפרויקט.</p></div>
    </div>
  </div>
</section>

{/* ============ תוצרים ============ */}
<section className="sec tint" id="pt-deliver">
  <div className="container">
    <h2 className="heading">תוצרים אפשריים <b>מהעבודה המשותפת</b></h2>
    <p className="sub">לא כל פרויקט צריך את כולם. בונים את הרשימה לפי מה שהפרויקט צריך.</p>
    <div className="deliver">
      <div><p><b>פרוטוטייפ שהלקוח כבר ראה ואישר</b></p></div>
      <div><p><b>בסיס מותגי ואסטרטגיה</b><span>מיצוב, קהלים, ערכים וסיפור מותג.</span></p></div>
      <div><p><b>טון דיבור (Tone of Voice) וטרמינולוגיה</b><span>איך המותג מדבר, ואילו מילים הוא משתמש בהן.</span></p></div>
      <div><p><b>אפיון מלא</b><span>מה כל מסך עושה, מה קורה כשאין מידע ומה קורה כשמשהו נכשל.</span></p></div>
      <div><p><b>מפת אתר ומבנה עמודים</b><span>היררכיה, כותרות ותוכן לכל עמוד.</span></p></div>
      <div><p><b>קבצי העיצוב, הקומפוננטות והאייקונים</b><span>מוכנים לפיתוח, pixel perfect.</span></p></div>
      <div style={{ 'gridColumn': "1/-1" } as CSSProperties}><p><b>זיכרון ארגוני</b><span>דוחות ומסמכים שמתעדים מה הוחלט ולמה, כולל מה שנשאר פתוח, כדי שאפשר יהיה להמשיך ולשנות גם אחרינו.</span></p></div>
    </div>
    <div className="boards">
      <figure><img src="/v10/partners/pt-fincat-board.webp" alt="חתול פיננסי · צבעים, טיפוגרפיה וקומפוננטות" data-zoom="" /><figcaption>מה עבר לפיתוח בחתול פיננסי</figcaption></figure>
      <figure><img src="/v10/partners/pt-5ers-board.webp" alt="The 5ers · צבעים, טיפוגרפיה, אייקונים וקומפוננטות" data-zoom="" /><figcaption>מה עבר לפיתוח ב-The 5ers</figcaption></figure>
    </div>
  </div>
</section>

{/* ============ הפרויקטים שלנו ============ */}
<section className="sec" id="pt-own">
  <div className="container">
    <h2 className="heading">מה אנחנו <b>בונים לעצמנו</b></h2>
    <p className="sub">שני מוצרים חיים. ככה אנחנו בודקים כלים ותהליכים על עצמנו, לפני שאנחנו מביאים אותם לפרויקט שלכם.</p>
    <div className="own">
      <article className="work" style={{ '--acc': "#1d2332", '--acc-soft': "#945eee" } as CSSProperties}>
        <button className="work__cover" type="button" data-full=""><img src="/v10/partners/pt-qc-home.webp" alt="QueenCademy · עמוד הבית" /></button>
        <div className="work__info">{' '}<span className="work__kicker">קרן · אקדמיה</span>
          <h3 className="work__title">QueenCademy</h3>
          <p className="work__tag">אקדמיה לבעלי עסקים שרוצים ללמוד לחשוב שיווק. קרן מחזיקה את האסטרטגיה, התוכן וחוויית הלמידה, וחברה חיצונית בונה את המוצר.</p>
          <div className="work__more">
            <button type="button" data-full=""><img src="/v10/partners/pt-qc-courses.webp" alt="QueenCademy · הקורסים" /></button>
            <button type="button" data-full=""><img src="/v10/partners/pt-qc-dash.webp" alt="QueenCademy · הדשבורד" /></button>
          </div>
        </div>
      </article>
      <article className="work" style={{ '--acc': "#1d2332", '--acc-soft': "#61fff2" } as CSSProperties}>
        <button className="work__cover" type="button" data-full=""><img src="/v10/partners/pt-rw-home.webp" alt="Reloways · עמוד הבית" /></button>
        <div className="work__info">{' '}<span className="work__kicker">אמיר · פלטפורמה</span>
          <h3 className="work__title">Reloways</h3>
          <p className="work__tag">פלטפורמה לישראלים שעוברים לגרמניה, חיה בפרודקשן: 130 מדריכים, 35 עסקים ופודקאסט. אמיר בונה אותה לבד, מהמוצר והעיצוב ועד הקוד.</p>
          <div className="work__more">
            <button type="button" data-full=""><img src="/v10/partners/pt-rw-answer.webp" alt="Reloways · תשובה מהקהילה" /></button>
            <button type="button" data-full=""><img src="/v10/partners/pt-rw-guide.webp" alt="Reloways · עמוד מדריך" /></button>
          </div>
        </div>
      </article>
    </div>
  </div>
</section>

{/* ============ בואו נדבר ============ */}
<section className="sec tint" id="pt-talk">
  <div className="container">
    <div className="talk navy-dots">
      <div className="talk__copy">
        <h2>בואו <em>נדבר.</em></h2>
        <p>יש לכם לקוח שצריך אסטרטגיה, אפיון או עיצוב, או פרויקט שאתם עומדים להגיש עליו הצעה? ספרו לנו עליו בשיחת הכרות קצרה.</p>
        <div className="talk__actions">{' '}<a className="btn-lime" href={ROUTES.book}>לתיאום שיחה</a>
        </div>
      </div>
      <div className="talk__people talk__people--duo">
        <figure className="talk__person"><img src="/v10/partners/duo-partners.webp" alt="קרן רייטלר ואמיר שלו" />
          <figcaption className="talk__cap talk__cap--k"><b>קרן רייטלר</b>אסטרטגיה ומסרים</figcaption>
          <figcaption className="talk__cap talk__cap--a"><b>אמיר שלו</b>UX/UI ועיצוב מוצר</figcaption>
        </figure>
      </div>
    </div>

    <div className="steps20">
      <p className="steps20__k">זה מה שקורה בתוך 30 הדקות המשותפות שלנו</p>
      <ol className="steps20__row">
        <li><img src="/v10/partners/pt-call-1.webp" alt="" aria-hidden="true" /><b>מכירים את הפרויקט</b><span>משתפים מסך ומספרים למי הוא מיועד ומה לא עובד.</span></li>
        <li><img src="/v10/partners/pt-call-2.webp" alt="" aria-hidden="true" /><b>פידבק כבר בשיחה</b><span>קרן על המסרים והאסטרטגיה, אמיר על החוויה והעיצוב.</span></li>
        <li><img src="/v10/partners/pt-call-3.webp" alt="" aria-hidden="true" /><b>ממפים את ההיקף</b><span>מחליטים יחד איפה בספירלה אנחנו נכנסים.</span></li>
        <li><img src="/v10/partners/pt-call-4.webp" alt="" aria-hidden="true" /><b>הצעדים הבאים</b><span>אם זה מתאים, נשלח הצעה מסודרת עם לוח זמנים.</span></li>
      </ol>
    </div>
  </div>
</section>

<div className="lb" id="pt-lb" role="dialog" aria-label="תמונה בגודל מלא"><button className="lb__x" type="button">סגירה</button><img alt="" /></div>

    </div>
  )
}
