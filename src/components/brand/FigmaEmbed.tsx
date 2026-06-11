'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Live Figma embed. Lazy: only loads the iframe once it scrolls into view,
 * so embeds don't slow first paint. `url` is a Figma file/frame URL.
 */
export default function FigmaEmbed({ url, title }: { url: string; title?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShow(true)
          io.disconnect()
        }
      },
      { rootMargin: '200px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Convert a normal Figma file URL into the embed host (current format).
  let src: string
  try {
    const u = new URL(url)
    u.hostname = 'embed.figma.com'
    u.searchParams.delete('t') // drop personal session token if present
    if (!u.searchParams.has('embed-host')) u.searchParams.set('embed-host', 'twootters')
    src = u.toString()
  } catch {
    src = `https://www.figma.com/embed?embed_host=twootters&url=${encodeURIComponent(url)}`
  }

  return (
    <div className="bk-figma" ref={ref}>
      {show ? (
        <iframe
          title={title ?? 'Figma'}
          src={src}
          loading="lazy"
          allowFullScreen
          style={{ border: 'none', width: '100%', height: '100%' }}
        />
      ) : (
        <div className="bk-figma-ph">Figma</div>
      )}
    </div>
  )
}
