import HeroV10 from '@/components/v10/HeroV10'
import ShowreelV10 from '@/components/v10/ShowreelV10'
import GasV10 from '@/components/v10/GasV10'
import SpiralV10 from '@/components/v10/SpiralV10'
import WorkV10 from '@/components/v10/WorkV10'
import TestimonialsV10 from '@/components/v10/TestimonialsV10'
import OfferV10 from '@/components/v10/OfferV10'
import PartnersBandV10 from '@/components/v10/PartnersBandV10'
import AboutV10 from '@/components/v10/AboutV10'
import WhoV10 from '@/components/v10/WhoV10'
import FaqV10 from '@/components/v10/FaqV10'
import CtaSlabV10 from '@/components/v10/CtaSlabV10'
import t from '@/locales/v10-en.json'

/** The homepage in English: the same sections in the same order as `/`. */
export default function EnHome() {
  return (
    <div className="v10-home">
      <HeroV10 t={t.hero} />
      <ShowreelV10 video={t.video} logos={t.logos} />
      <GasV10 t={t.gas} />
      <SpiralV10 t={t.spiral} />
      <WorkV10 t={t.work} />
      <TestimonialsV10 t={t.testimonials} />
      <OfferV10 t={t.offer} />
      <PartnersBandV10 t={t.partners} />
      <AboutV10 t={t.about} />
      <WhoV10 t={t.who} />
      <FaqV10 t={t.faq} ask={t.ask} />
      <CtaSlabV10 t={t.cta} />
    </div>
  )
}
