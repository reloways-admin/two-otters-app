'use client'

import Image from 'next/image'

export default function WhoWeAreV6() {
  return (
    <section className="v6-about" id="about">
      <div className="v6-container">

        {/* Title with waving hand */}
        <div className="v6-about-title-wrap">
          <div className="v6-about-waving-hand">
            <Image src="/waving-hand.png" alt="" width={76} height={82} style={{ objectFit: 'contain' }} />
          </div>
          <h2 className="v6-about-title">
            אולה!<br />אנחנו אמיר וקרן.
          </h2>
        </div>

        <p className="v6-about-body">
          הכרנו אי שם בתיכון ובמשך השנים הזרם לקח אותנו להרבה מקומות,
          אבל כמו לוטרות אמיתיות (שמחזיקות ידיים) — תמיד נשארנו יחד.
        </p>
        <p className="v6-about-body">
          בטח הגעתם לכאן כי יש לכם רעיון, ואתם רוצים לראות אותו מוחשי ומהר.
          וזו החדשנות בשיטת הספירלה שלנו — אנחנו לוקחים רעיונות למוצרים ומוציאים אותם לפועל בזריזות ודייקנות.
        </p>
        <p className="v6-about-body">
          בתכלס, אנחנו מוציאים לאוויר בדיוק מה שהיה לכם בראש.{' '}
          <b>רק מהר יותר ממה שציפיתם.</b>
        </p>

        {/* Photos */}
        <div className="v6-about-photos-wrap">

          {/* Bubble — Amir (right in RTL) */}
          <div className="v6-about-bubble v6-about-bubble--amir">
            <Image src="/bubble-amir.png" alt="אמיר שלו — מומחה UX ו-UI" fill style={{ objectFit: 'contain' }} />
          </div>

          {/* Bubble — Keren (left in RTL) */}
          <div className="v6-about-bubble v6-about-bubble--keren">
            <Image src="/bubble-keren.png" alt="קרן רייטלר — מומחית אסטרטגיה, סטוריטלינג ושפה מוצרית" fill style={{ objectFit: 'contain' }} />
          </div>

          <div className="v6-about-photos">
            {/* Amir — first in DOM = right in RTL */}
            <div className="v6-about-photo amir">
              <Image src="/amir.png" alt="אמיר שלו" fill style={{ objectFit: 'contain', objectPosition: 'bottom center' }} />
            </div>
            {/* Keren — second in DOM = left in RTL */}
            <div className="v6-about-photo keren">
              <Image src="/keren.png" alt="קרן רייטלר" fill style={{ objectFit: 'contain', objectPosition: 'bottom center' }} />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
