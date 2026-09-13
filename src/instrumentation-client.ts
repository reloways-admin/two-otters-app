import { initBotId } from 'botid/client/core'

/**
 * Which routes get a bot challenge.
 *
 * Next runs this on every page load (15.3+), so the challenge is ready before
 * anyone submits. The paths must match the server side exactly — a route
 * checked on the server but missing here would reject every real visitor.
 *
 * `basic` is free on every Vercel plan and is the right level for a public
 * form: it stops scripted junk. `deepAnalysis` is Pro-and-above and aimed at
 * credential stuffing and scraping, which is not our problem.
 */
initBotId({
  protect: [
    { path: '/api/forms/audit-request', method: 'POST' },
    { path: '/api/forms/contact', method: 'POST' },
  ],
})
