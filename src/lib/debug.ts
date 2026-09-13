/**
 * Client-side logging, off unless someone asked for it.
 *
 * A visitor's console is not our log. Anything a real user could see there is
 * either noise or a hint about how the site works, so it stays behind a flag —
 * a feature flag, not a secret, which is why the public prefix is right here.
 *
 * Server-side `console.error` in route handlers is a different thing entirely
 * and is not routed through this.
 */
export function debug(...args: unknown[]): void {
  if (process.env.NEXT_PUBLIC_DEBUG === '1') console.warn('[two-otters]', ...args)
}
