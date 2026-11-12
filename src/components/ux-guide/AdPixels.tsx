'use client'

import Script from 'next/script'

/**
 * Meta Pixel and Google tag for the paid-ads landing page — and only there; the
 * rest of the site carries no tracking.
 *
 * The ids are public by design (they ship to every browser), so they live in
 * NEXT_PUBLIC_* env vars rather than in code, which keeps them per-environment:
 *   NEXT_PUBLIC_META_PIXEL_ID   Meta Events Manager → the pixel's id
 *   NEXT_PUBLIC_GOOGLE_TAG_ID   GA4 "G-…" (or a Google Ads "AW-…") id
 *   NEXT_PUBLIC_GOOGLE_ADS_ID   optional second id, e.g. Google Ads "AW-…"
 * A var left empty loads nothing, so local dev and previews stay clean.
 */
const META = process.env.NEXT_PUBLIC_META_PIXEL_ID
const GTAG = process.env.NEXT_PUBLIC_GOOGLE_TAG_ID
const ADS = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID
// Ids are interpolated into inline scripts, so accept only their real shapes.
const safe = (v: string | undefined, re: RegExp) => (v && re.test(v) ? v : undefined)
const metaId = safe(META, /^\d{6,20}$/)
const gtagId = safe(GTAG, /^(G|AW|GT)-[A-Z0-9]{4,20}$/)
const adsId = safe(ADS, /^AW-[A-Z0-9]{4,20}$/)

type W = Window & { fbq?: (...a: unknown[]) => void; gtag?: (...a: unknown[]) => void }

/** Called once a guide form succeeds: the conversion both ad platforms optimise for. */
export function trackLead() {
  const w = window as W
  w.fbq?.('track', 'Lead', { content_name: 'ux-guide' })
  w.gtag?.('event', 'generate_lead', { form: 'ux-guide' })
}

export default function AdPixels() {
  return (
    <>
      {metaId && (
        <Script id="meta-pixel" strategy="afterInteractive">{`
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${metaId}');fbq('track','PageView');`}</Script>
      )}
      {gtagId && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gtagId}`} strategy="afterInteractive" />
          <Script id="google-tag" strategy="afterInteractive">{`
window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('js',new Date());gtag('config','${gtagId}');${adsId ? `gtag('config','${adsId}');` : ''}`}</Script>
        </>
      )}
    </>
  )
}
