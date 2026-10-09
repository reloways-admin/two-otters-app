/**
 * The "ask Keren / ask Amir" buttons open a WhatsApp chat with that person.
 * Numbers are in international form without "+" or spaces, as wa.me expects
 * (Amir: +49 155 60370097, Keren: +972 52-862-8624). They are public anyway
 * once they are in a link, so they live here, not in the environment.
 */
const NUMBERS = {
  amir: '4915560370097',
  keren: '972528628624',
} as const

export type WhatsAppPerson = keyof typeof NUMBERS

/** A prefilled first line, so the chat opens with something to send and the
 *  two of them can tell the message came from the site. */
const GREETING: Record<WhatsAppPerson, string> = {
  amir: 'היי אמיר, הגעתי מהאתר של Two Otters ויש לי שאלה',
  keren: 'היי קרן, הגעתי מהאתר של Two Otters ויש לי שאלה',
}

/** `greeting` overrides the Hebrew first line (the English homepage passes its own). */
export function whatsappLink(who: WhatsAppPerson, greeting?: string): string {
  return `https://wa.me/${NUMBERS[who]}?text=${encodeURIComponent(greeting ?? GREETING[who])}`
}
