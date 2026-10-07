import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'קביעת שיחת היכרות | Two Otters Studio',
  description:
    'שיחת היכרות של 30 דקות עם אמיר וקרן: פידבק UX בזמן אמת, בדיקת מסרים ואסטרטגיה, וכיוון ברור לצעד הבא כולל זמנים ותקציב.',
}

export default function ScheduleACallLayout({ children }: { children: React.ReactNode }) {
  return children
}
