'use client'

import Image from 'next/image'
import en from '@/locales/v7-en.json'

type AboutT = typeof en.about

export default function WhoWeAreV7({ t, lang = 'he' }: { t: AboutT; lang?: 'en' | 'he' }) {
  const bubbleSuffix = lang === 'en' ? 'english' : 'hebrew'
  return (
    <section className="v7-about" id="about">
      <div className="v7-container">

        <div className="v7-about-title-wrap">
          <h2 className="v7-about-title">
            <span className="v7-about-title-olah">
              {t.greeting}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/otter-hand.svg" alt="" className="v7-about-hand" aria-hidden="true" />
            </span>
            <br />{t.title}
          </h2>
        </div>

        <p className="v7-about-body">{t.body1}</p>
        <p className="v7-about-body">{t.body2}</p>
        <p className="v7-about-body">
          {t.body3}{' '}
          <b>{t.body3Bold}</b>
        </p>

        {/* Photos */}
        <div className="v7-about-photos-wrap">

          <div className="v7-about-bubble v7-about-bubble--amir">
            <Image src={`/bubble-amir-${bubbleSuffix}.svg`} alt={t.amirBubbleAlt} fill style={{ objectFit: 'contain' }} />
          </div>

          <div className="v7-about-bubble v7-about-bubble--keren">
            <Image src={`/bubble-keren-${bubbleSuffix}.svg`} alt={t.kerenBubbleAlt} fill style={{ objectFit: 'contain' }} />
          </div>

          <div className="v7-about-photos">
            <div className="v7-about-photo amir">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/amir-photo.png" alt={t.amirPhotoAlt} />
            </div>
            <div className="v7-about-photo keren">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/keren-photo.png" alt={t.kerenPhotoAlt} />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
