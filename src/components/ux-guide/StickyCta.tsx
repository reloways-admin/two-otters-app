'use client'

import { useEffect, useRef, useState } from 'react'

/** The phone-only "get the guide" bar. It steps aside while a form is on screen. */
export default function StickyCta() {
  const [hidden, setHidden] = useState(true)
  const visible = useRef(new Map<Element, boolean>())

  useEffect(() => {
    const forms = Array.from(document.querySelectorAll('.uxg [data-form]'))
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(e => visible.current.set(e.target, e.isIntersecting))
        setHidden(Array.from(visible.current.values()).some(Boolean))
      },
      { threshold: 0.2 }
    )
    forms.forEach(f => io.observe(f))
    return () => io.disconnect()
  }, [])

  return (
    <div className={`mcta${hidden ? ' hide' : ''}`}>
      <a className="btn btn-green" href="#top">להורדת המדריך החינמי</a>
    </div>
  )
}
