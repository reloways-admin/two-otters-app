#!/usr/bin/env node
/**
 * Connect one host's Google Calendar to the booking page — run once per host.
 *
 *   GOOGLE_OAUTH_CLIENT_ID=… GOOGLE_OAUTH_CLIENT_SECRET=… node scripts/google-calendar-token.mjs amir
 *
 * Opens Google's consent screen; the host signs in with *their own* account and
 * approves. The script then prints the refresh token to put in Vercel as
 * GOOGLE_REFRESH_TOKEN_<HOST>. Nothing is written to disk.
 *
 * The OAuth client must be a "Web application" with this redirect URI:
 *   http://localhost:53682/callback
 * and the app must be "In production" (or "Internal" on Workspace) — a client
 * left in "Testing" issues refresh tokens that die after seven days.
 */
import http from 'node:http'
import { exec } from 'node:child_process'

const host = process.argv[2]
const { GOOGLE_OAUTH_CLIENT_ID: clientId, GOOGLE_OAUTH_CLIENT_SECRET: clientSecret } = process.env
if (!host || !clientId || !clientSecret) {
  console.error('Usage: GOOGLE_OAUTH_CLIENT_ID=… GOOGLE_OAUTH_CLIENT_SECRET=… node scripts/google-calendar-token.mjs <host id>')
  process.exit(1)
}

const PORT = 53682
const redirectUri = `http://localhost:${PORT}/callback`
// Read busy times, and create events. Nothing broader: we never read what's
// *in* anyone's meetings.
const scope = [
  'https://www.googleapis.com/auth/calendar.freebusy',
  'https://www.googleapis.com/auth/calendar.events',
].join(' ')

const authUrl =
  'https://accounts.google.com/o/oauth2/v2/auth?' +
  new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope,
    // offline + consent is what makes Google hand back a refresh token every time.
    access_type: 'offline',
    prompt: 'consent',
  })

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url ?? '/', redirectUri)
  if (url.pathname !== '/callback') return res.writeHead(404).end()
  const code = url.searchParams.get('code')
  if (!code) {
    res.writeHead(400).end('No code — was access denied?')
    return finish(1, `Google returned: ${url.searchParams.get('error')}`)
  }
  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code',
    }),
  })
  const data = await tokenRes.json()
  if (!data.refresh_token) {
    res.writeHead(500).end('No refresh token in the response — see the terminal.')
    return finish(1, JSON.stringify(data, null, 2))
  }
  res.writeHead(200, { 'content-type': 'text/plain; charset=utf-8' }).end('Connected. You can close this tab.')
  finish(0, `\nGOOGLE_REFRESH_TOKEN_${host.toUpperCase()}=${data.refresh_token}\n\nAdd it in Vercel → Settings → Environment Variables (Production), then redeploy.`)
})

function finish(code, message) {
  ;(code ? console.error : console.log)(message)
  server.close()
  process.exitCode = code
}

server.listen(PORT, () => {
  console.log(`Opening Google sign-in for "${host}". If nothing opens, visit:\n${authUrl}\n`)
  exec(`${process.platform === 'darwin' ? 'open' : 'xdg-open'} "${authUrl}"`)
})
