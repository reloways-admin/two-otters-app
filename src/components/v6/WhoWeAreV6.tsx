'use client'

import Image from 'next/image'
import en from '@/locales/v6-en.json'

type AboutT = typeof en.about

export default function WhoWeAreV6({ t }: { t: AboutT }) {
  return (
    <section className="v6-about" id="about">
      <div className="v6-container">

        <div className="v6-about-title-wrap">
          <h2 className="v6-about-title">
            <span className="v6-about-title-olah">
              {t.greeting}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/otter-hand.svg" alt="" className="v6-about-hand" aria-hidden="true" />
            </span>
            <br />{t.title}
          </h2>
        </div>

        <p className="v6-about-body">{t.body1}</p>
        <p className="v6-about-body">{t.body2}</p>
        <p className="v6-about-body">
          {t.body3}{' '}
          <b>{t.body3Bold}</b>
        </p>

        {/* Photos */}
        <div className="v6-about-photos-wrap">

          <div className="v6-about-bubble v6-about-bubble--amir">
            <Image src="/bubble-amir.png" alt={t.amirBubbleAlt} fill style={{ objectFit: 'contain' }} />
          </div>

          <div className="v6-about-bubble v6-about-bubble--keren">
            <Image src="/bubble-keren.png" alt={t.kerenBubbleAlt} fill style={{ objectFit: 'contain' }} />
          </div>

          <div className="v6-about-photos">
            <div className="v6-about-photo amir">
              <Image src="/amir.png" alt={t.amirPhotoAlt} fill style={{ objectFit: 'contain', objectPosition: 'bottom center' }} />
            </div>
            <div className="v6-about-photo keren">
              <Image src="/keren.png" alt={t.kerenPhotoAlt} fill style={{ objectFit: 'contain', objectPosition: 'bottom center' }} />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
