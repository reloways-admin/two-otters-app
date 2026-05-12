'use client'

import NavV6 from '@/components/v6/NavV6'
import HeroV6 from '@/components/v6/HeroV6'
import GasInNeutralV6 from '@/components/v6/GasInNeutralV6'
import SpiralV6 from '@/components/v6/SpiralV6'
import WhatWeOfferV6 from '@/components/v6/WhatWeOfferV6'
import WhoCanWorkV6 from '@/components/v6/WhoCanWorkV6'
import WhoWeAreV6 from '@/components/v6/WhoWeAreV6'
import TestimonialsV6 from '@/components/v6/TestimonialsV6'
import FaqV6 from '@/components/v6/FaqV6'
import ContactV6 from '@/components/v6/ContactV6'
import FooterV6 from '@/components/v6/FooterV6'
import './styles.css'

export default function V6Page() {
  return (
    <div className="v6-page" dir="rtl" lang="he">
      <NavV6 />
      <main>
        <HeroV6 />
        <GasInNeutralV6 />
        <SpiralV6 />
        <WhatWeOfferV6 />
        <WhoCanWorkV6 />
        <WhoWeAreV6 />
        <TestimonialsV6 />
        <FaqV6 />
        <ContactV6 />
      </main>
      <FooterV6 />
    </div>
  )
}
