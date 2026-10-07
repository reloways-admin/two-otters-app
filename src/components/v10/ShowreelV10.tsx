import he from '@/locales/v10-he.json'

type VideoT = typeof he.video
type LogosT = typeof he.logos

const LOGOS = [
  { src: '/v10/logo-fincat.svg', alt: 'חתול פיננסי', kind: 'mono' },
  { src: '/v10/logo-the5ers.svg', alt: 'The5ers', kind: 'mono' },
  { src: '/v10/logo-alma.svg', alt: 'Alma', kind: 'mono' },
  { src: '/v10/logo-ewise.png', alt: 'Ewise', kind: 'mono', height: 46 },
  { src: '/v10/logo-thatperk.png', alt: 'That Perk', kind: 'raster', height: 38 },
] as const

/** The studio video, lifted over the bottom of the hero, then the client logos. */
export default function ShowreelV10({ video, logos }: { video: VideoT; logos: LogosT }) {
  return (
    <>
      <section className="v10-video-sec" aria-label={video.label}>
        <div className="v10-video-wrap">
          <video autoPlay muted loop playsInline controls preload="metadata" poster="/v10/studio-video-hd-poster.jpg">
            <source src="/v10/studio-video-hd.mp4" type="video/mp4" />
          </video>
        </div>
      </section>

      <section className="v10-logos" aria-label={logos.label}>
        <div className="v8-container">
          <p className="v10-logos-title">{logos.title}</p>
          <div className="v10-logos-row">
            {LOGOS.map(l => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={l.src}
                className={`v10-logo v10-logo--${l.kind}`}
                src={l.src}
                alt={l.alt}
                style={'height' in l ? { height: l.height } : undefined}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
