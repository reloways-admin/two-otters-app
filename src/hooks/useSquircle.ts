import { useEffect, useRef, useState } from 'react'
import { getSvgPath } from 'figma-squircle'

export function useSquircle(cornerRadius: number, cornerSmoothing = 0.6) {
  const ref = useRef<HTMLDivElement>(null)
  const [clipPath, setClipPath] = useState<string>('')

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const update = () => {
      const { offsetWidth: width, offsetHeight: height } = el
      if (!width || !height) return
      const path = getSvgPath({ width, height, cornerRadius, cornerSmoothing })
      setClipPath(`path('${path}')`)
    }

    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [cornerRadius, cornerSmoothing])

  return { ref, style: clipPath ? { clipPath, borderRadius: 0 } : {} }
}
