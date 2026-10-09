'use client'

import ContactV10 from '@/components/v10/ContactV10'
import PageHeroV10 from '@/components/v10/PageHeroV10'
import t from '@/locales/v10-he.json'

/**
 * The contact page. Every "talk to us" and "book a call" on the site lands
 * here, now that the form has left the homepage.
 *
 * The form is ContactV10, v8's working form forked (wired to
 * /api/forms/contact). The artifact's version — a topic dropdown, no phone or
 * role — is a design, not a working form. Swapping the fields is a follow-up
 * that touches the form spec too.
 */
export default function ContactPage() {
  return (
    <>
      <PageHeroV10 top={t.contactPage.heroTop} accent={t.contactPage.heroAccent} className="v10-hero-sm--contact" />
      <ContactV10 t={{ ...t.contact, title: t.contactPage.title, sub: t.contactPage.sub }} />
    </>
  )
}
