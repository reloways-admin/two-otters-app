'use client'

import { useEffect } from 'react'

/**
 * The root layout declares <html lang="he" dir="rtl">, which is right for every
 * page but the English homepage. This sets the document's language and
 * direction while that page is open, so screen readers use an English voice
 * and the scrollbar sits on the right side, then puts Hebrew back on the way out.
 */
export default function HtmlLangV10({ lang, dir }: { lang: string; dir: 'ltr' | 'rtl' }) {
  useEffect(() => {
    const html = document.documentElement
    const prev = { lang: html.lang, dir: html.dir }
    html.lang = lang
    html.dir = dir
    return () => { html.lang = prev.lang; html.dir = prev.dir }
  }, [lang, dir])
  return null
}
