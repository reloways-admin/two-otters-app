'use client'

import ContactV8 from '@/components/v8/ContactV8'
import PageHeroV10 from '@/components/v10/PageHeroV10'
import t from '@/locales/v10-he.json'

/**
 * The contact page. Every "talk to us" on v10 lands here, now that the form
 * has left the homepage.
 *
 * The form itself is still v8's ContactV8, because that one is wired to
 * /api/forms/contact (ClickUp + Brevo, honeypot, BotID) and the artifact's
 * version — a topic dropdown, no phone or role — is a design, not a working
 * form. Swapping the fields is a follow-up that touches the form spec too.
 */
export default function V10Contact() {
  return (
    <>
      <PageHeroV10 top={t.contactPage.heroTop} accent={t.contactPage.heroAccent} className="v10-hero-sm--contact" />
      <ContactV8 t={{ ...t.contact, title: t.contactPage.title, sub: t.contactPage.sub }} lang="he" />
    </>
  )
}
