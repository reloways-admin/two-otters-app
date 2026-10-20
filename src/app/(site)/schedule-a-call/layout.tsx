import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'קביעת שיחה',
  alternates: { canonical: '/schedule-a-call' },
}

export default function ScheduleACallLayout({ children }: { children: React.ReactNode }) {
  return children
}
