#!/usr/bin/env node
/**
 * Connect one host's Google Calendar to the booking page — run once per host.
 *
 *   node scripts/google-calendar-token.mjs keren [keren@methodqueen.com]
 *
 * Opens Google's consent screen; the host signs in with *their own* account and
 * approves. The script then writes GOOGLE_REFRESH_TOKEN_<HOST> and
 * BOOKING_HOST_EMAIL_<HOST> straight into .env.local, replacing any old lines.
 * The token is never printed: a token on screen ends up in scrollback, chat
 * and screenshots. The OAuth client is read from .env.local too.
 *
 * Before writing, it asks Google whose calendar the token opens. If that is not
 * the expected address (when given) or is another host's, nothing is written:
 * the browser that opens is the one on *this* machine, already signed in as
 * someone, and approving with the wrong account is the easy mistake.
 *
 * The host can be abroad: send them the printed sign-in link; after approving,
 * their browser lands on a localhost "can't connect" page. They send that
 * page's address back, you open it here while the script waits. The code in it
 * is single-use, lives ~10 minutes and is useless without the client secret.
 *
 * The OAuth client must be a "Web application" with this redirect URI:
 *   http://localhost:53682/callback
 * and the app must be "In production" (or "Internal" on Workspace) — a client
 * left in "Testing" issues refresh tokens that die after seven days.
 */
import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { exec } from 'node:child_process'

const ENV_FILE = path.join(import.meta.dirname, '..', '.env.local')

const readEnv = () =>
  fs.existsSync(ENV_FILE)
    ? Object.fromEntries(
        fs
          .readFileSync(ENV_FILE, 'utf8')
          .split('\n')
          .filter(l => /^[A-Z_][A-Z0-9_]*=/.test(l))
          .map(l => [l.slice(0, l.indexOf('=')), l.slice(l.indexOf('=') + 1).replace(/^["']|["']$/g, '')])
      )
    : {}

const host = process.argv[2]
const expected = process.argv[3]?.toLowerCase()
const env = { ...readEnv(), ...process.env }
const { GOOGLE_OAUTH_CLIENT_ID: clientId, GOOGLE_OAUTH_CLIENT_SECRET: clientSecret } = env
if (!host || !clientId || !clientSecret) {
  console.error('Usage: node scripts/google-calendar-token.mjs <host id> [expected email]  (OAuth client from .env.local)')
  process.exit(1)
}
const HOST = host.toUpperCase()
// Long opaque strings (tokens, codes) never reach the terminal, even in errors.
const mask = text => String(text).replace(/[A-Za-z0-9_\-./]{24,}/g, '***')

/** Whose calendar does this refresh token open? The primary calendar is named after its owner. */
async function owner(refreshToken) {
  const { access_token } = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ client_id: clientId, client_secret: clientSecret, refresh_token: refreshToken, grant_type: 'refresh_token' }),
  }).then(r => r.json())
  const res = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events?maxResults=1&fields=summary', {
    headers: { authorization: `Bearer ${access_token}` },
  }).then(r => r.json())
  return res.summary?.toLowerCase()
}

/** Replace this host's two lines in .env.local, atomically, keeping everything else. */
function save(refreshToken, email) {
  const kept = (fs.existsSync(ENV_FILE) ? fs.readFileSync(ENV_FILE, 'utf8') : '')
    .split('\n')
    .filter(l => !l.startsWith(`GOOGLE_REFRESH_TOKEN_${HOST}=`) && !l.startsWith(`BOOKING_HOST_EMAIL_${HOST}=`))
  while (kept.length && kept[kept.length - 1] === '') kept.pop()
  kept.push(`GOOGLE_REFRESH_TOKEN_${HOST}=${refreshToken}`, `BOOKING_HOST_EMAIL_${HOST}=${email}`, '')
  fs.writeFileSync(`${ENV_FILE}.tmp`, kept.join('\n'), { mode: 0o600 })
  fs.renameSync(`${ENV_FILE}.tmp`, ENV_FILE)
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
    return finish(1, mask(JSON.stringify({ error: data.error, description: data.error_description }, null, 2)))
  }
  const email = await owner(data.refresh_token).catch(() => undefined)
  const otherHosts = Object.entries(env)
    .filter(([k, v]) => k.startsWith('BOOKING_HOST_EMAIL_') && k !== `BOOKING_HOST_EMAIL_${HOST}` && v)
    .map(([, v]) => v.toLowerCase())
  const wrong = !email ? 'could not read the account' : expected && email !== expected ? `expected ${expected}` : otherHosts.includes(email) ? 'that is another host' : ''
  if (wrong) {
    res.writeHead(409, { 'content-type': 'text/plain; charset=utf-8' }).end('Wrong Google account — see the terminal.')
    return finish(1, `✗ Signed in as ${email ?? '?'} (${wrong}). .env.local untouched — run again and pick the right account.`)
  }
  save(data.refresh_token, email)
  res.writeHead(200, { 'content-type': 'text/plain; charset=utf-8' }).end('Connected. You can close this tab.')
  finish(
    0,
    `✓ Connected ${email}. Wrote GOOGLE_REFRESH_TOKEN_${HOST} and BOOKING_HOST_EMAIL_${HOST} to .env.local (token not shown).\n` +
      '  For production, add both in Vercel → Settings → Environment Variables, then redeploy.'
  )
})

function finish(code, message) {
  ;(code ? console.error : console.log)(message)
  server.close()
  process.exitCode = code
}

server.listen(PORT, () => {
  console.log(`Opening Google sign-in for "${host}". If nothing opens, or the host is elsewhere, send them:\n${authUrl}\n`)
  console.log("Don't approve it here with your own account. Waiting…")
  exec(`${process.platform === 'darwin' ? 'open' : 'xdg-open'} "${authUrl}"`)
})
