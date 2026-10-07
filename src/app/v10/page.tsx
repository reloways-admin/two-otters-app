import TestimonialsV8 from '@/components/v8/TestimonialsV8'
import HeroV10 from '@/components/v10/HeroV10'
import ShowreelV10 from '@/components/v10/ShowreelV10'
import OfferV10 from '@/components/v10/OfferV10'
import WhoV10 from '@/components/v10/WhoV10'
import WorkV10 from '@/components/v10/WorkV10'
import SpiralV10 from '@/components/v10/SpiralV10'
import PartnersBandV10 from '@/components/v10/PartnersBandV10'
import AboutV10 from '@/components/v10/AboutV10'
import FaqV10 from '@/components/v10/FaqV10'
import t from '@/locales/v10-he.json'

/**
 * v10 homepage — Keren's next homepage, from the next-site artifact.
 *
 * The sections v8 shares with it are forked into components/v10 rather than
 * imported, because the v8 ones are on the live homepage and the two now
 * differ (links to the new pages, new icons, the bento layout). Testimonials
 * are the one section that is still identical, so it stays shared.
 *
 * The contact form is no longer on the homepage: it has its own page, which
 * the header button and every "talk to us" lead to.
 */
export default function V10Home() {
  return (
    <div className="v10-home">
      <HeroV10 t={t.hero} />
      <ShowreelV10 video={t.video} logos={t.logos} />
      <OfferV10 t={t.offer} />
      <WhoV10 t={t.who} />
      <WorkV10 t={t.work} />
      <SpiralV10 t={t.spiral} />
      <PartnersBandV10 t={t.partners} />
      <TestimonialsV8 t={t.testimonials} />
      <AboutV10 t={t.about} />
      <FaqV10 t={t.faq} ask={t.ask} />
    </div>
  )
}
