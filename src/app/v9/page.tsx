'use client'

import { useEffect } from 'react'
import NavV9 from '@/components/v9/NavV9'
import HeroV9 from '@/components/v9/HeroV9'
import WorkV9 from '@/components/v9/WorkV9'
import GasInNeutralV9 from '@/components/v9/GasInNeutralV9'
import SpiralV9 from '@/components/v9/SpiralV9'
import WhatWeOfferV9 from '@/components/v9/WhatWeOfferV9'
import WhoCanWorkV9 from '@/components/v9/WhoCanWorkV9'
import WhoWeAreV9 from '@/components/v9/WhoWeAreV9'
import TestimonialsV9 from '@/components/v9/TestimonialsV9'
import FaqV9 from '@/components/v9/FaqV9'
import ContactV9 from '@/components/v9/ContactV9'
import FooterV9 from '@/components/v9/FooterV9'

/*
 * v9: the v8 homepage rebuilt with motion (Framer Motion + Tailwind, no version
 * stylesheet). Same copy, colours and illustrations as v8; what changed is how
 * things arrive: the logo builds itself, covers and illustrations build up from an
 * edge, the spiral draws as you scroll.
 *
 * A separate example, not a replacement: / stays on v8 (see app/page.tsx).
 * Hebrew only; the components carry their Hebrew copy as defaults.
 */
export default function V9Page() {
  // The root layout already declares he/rtl, but a client navigation from an
  // English page would leave <html> on en/ltr, and assistive tech reads it there.
  useEffect(() => {
    document.documentElement.lang = 'he'
    document.documentElement.dir = 'rtl'
  }, [])

  return (
    // White ground: the sections assume one (body is still on the old off-white),
    // and the Who and Testimonials blobs have transparent corners that show it.
    <div dir="rtl" lang="he" className="overflow-x-clip bg-white">
      <NavV9 />
      <main>
        <HeroV9 />
        <WorkV9 />
        <GasInNeutralV9 />
        <SpiralV9 />
        <WhatWeOfferV9 />
        <WhoCanWorkV9 />
        <WhoWeAreV9 />
        <TestimonialsV9 />
        <FaqV9 />
        <ContactV9 />
      </main>
      <FooterV9 />
    </div>
  )
}
