# Integration accounts

What the forms are actually wired to. Everything here is an **id or a setting, not a secret** —
useless without `CLICKUP_TOKEN` or `BREVO_API_KEY`, which live only in the environment. The
machine-readable half is [src/config/integrations.json](../src/config/integrations.json); this
file is the context around it: what exists, why, and what will bite.

See [CLAUDE.md](../CLAUDE.md) §Forms for the architecture, and the `add-form` skill for adding one.

## ClickUp — the lead record

| | |
|---|---|
| Workspace | Two Otters Studio, `90121898659` |
| List | **Leads**, `901222088251` (Two Otters space) |
| Members | Keren `100830395`, Amir `5836073`, Alex `282881575` |

Both forms file into the **same list** and are told apart by tag — `audit` and `contact`. That is
deliberate: one inbox to watch, and tags give ClickUp Automations something to route on.

**Automation: "Auto-Assign New Tasks"** — trigger `Task or subtask created` with Source **API**,
action `Update assignees` → Keren and Amir. The API source scopes it to submissions from the site;
tasks created by hand in the UI are not touched. This automation *is* the notification that
replaced internal email, so if it is disabled, leads arrive silently.

**Custom fields: none configured, on purpose.** Every value already appears in the task
description, so a field only buys sorting and filtering. `integrations.json` has empty slots
ready under `clickup.fields`; fill one with a field id to start populating it. Any field carrying
a Hebrew label must be **Text**, not Dropdown — a dropdown expects an option UUID and rejects a
label.

The token is a personal API key, so tasks show its owner as creator. A dedicated ClickUp member
for the integration would fix both that and the fact that a personal key is workspace-wide.

## Brevo — writing to the visitor

| List | Id | Fed by | Logical name |
|---|---|---|---|
| Leads \| Two Otters | `18` | the contact form | `contact-confirm` |
| Web Report \| Two Otters (audit) | `19` | the audit funnel | `audit-confirm` |

Both are **transactional audiences**: people enter by sending an enquiry or asking for a report,
not by opting in. Do not run campaigns against them. `marketingOptIn` is collected on the audit
form, feeds no list, and is recorded on the ClickUp task — marketing consent has to be given
freely and cannot be the price of the service.

### Three ways this fails quietly

**1. A 2xx does not mean an email was sent.** With the `brevo-group` mailer we add the contact to
a list; an **automation attached to that list** does the sending. If no automation exists, the API
returns success, we report `confirmed: true`, and the visitor gets nothing. Check the automation.

**2. Undefined attributes are discarded without error.** Brevo stores only attributes its account
defines. Anything in a form's `confirm.params` that has no definition is dropped while the write
still succeeds — a template personalising on it renders blank.

Defined in this account: `FIRSTNAME`, `LASTNAME`, `JOB_TITLE`, `SMS`, `WHATSAPP`, `LINKEDIN`,
`LANDLINE_NUMBER`, `CONTACT_TIMEZONE`, `EXT_ID`, `SUBSCRIBED_AT`, `OPT_IN`, plus Brevo's own
`DOUBLE_OPT-IN` and `_DETECTED_LANGUAGE`.

| Param we send | Lands as | Status |
|---|---|---|
| `firstName` | `FIRSTNAME` | ✅ stored |
| `role` | `JOB_TITLE` | ✅ stored |
| `lastName` | `LASTNAME` | ✅ if ever sent |
| `host` (audit) | `HOST` | ❌ dropped — attribute not defined |
| `due` (audit) | `DUE` | ❌ dropped — attribute not defined |
| `company` (contact) | `COMPANY` | ❌ dropped — attribute not defined |
| `phone` (contact) | `PHONE` | ❌ dropped — attribute not defined |

So a confirmation template can greet someone by name but **cannot** currently say which site or by
when. Create the attribute under Contacts → Settings → Contact attributes to change that. To see
what a workspace defines:

```bash
node --env-file=.env -e 'fetch("https://api.brevo.com/v3/contacts/attributes",{headers:{"api-key":process.env.BREVO_API_KEY}}).then(r=>r.json()).then(d=>d.attributes.forEach(a=>console.log(a.name,a.type||"")))'
```

**3. The IP allowlist cannot work on Vercel.** Brevo can restrict API keys to authorised IPs.
Vercel functions egress from a large shared pool with no address to allowlist, so with the
restriction on, every production submission fails with `401 unauthorized`. It is currently **off**
for this account, which is the right setting. The alternative is Vercel Static IPs (Pro and
Enterprise) allowlisted in Brevo.

## Finding an id again

Read it off the link rather than hunting through an API.

```
https://app.clickup.com/90121898659/v/li/901222088251     ← sidebar Copy link
                        └ workspace ┘     └── list id ──┘

https://app.clickup.com/90121898659/v/l/6-901222088251-1  ← address bar on a saved view
                        └ workspace ┘      └── list id ──┘   (the triple is a *view* id)

https://app.brevo.com/contact/list-listing/id/19          ← Brevo list
                                              └┘
```

The ClickUp list id is always inside the `/v/…` part, never the number right after `.com/` — that
one is the workspace.

## Google Calendar — booking intro calls

`/schedule-a-call` is our own calendar UI over both founders' Google calendars
(decided 6.10.2026 instead of Cal.com Teams; see decisions.md row 19).

- **Rules** — duration, buffer, notice, horizon, who organizes, and each host's
  hours *in their own time zone* — are in [src/config/booking.ts](../src/config/booking.ts).
  The visitor is offered only the overlap, shown in their own zone.
- **Credentials** are `GOOGLE_OAUTH_CLIENT_ID`, `GOOGLE_OAUTH_CLIENT_SECRET` and one
  `GOOGLE_REFRESH_TOKEN_<HOST>` per host (see `.env.example`). Each host runs
  `node scripts/google-calendar-token.mjs <host>` once and signs in with their own
  account. No calendar is shared between the hosts.
- **What happens on a booking** (since 8.10.2026 a booking is a *request*; both
  hosts must approve it — see [src/lib/booking/requests.ts](../src/lib/booking/requests.ts)):
  1. The server re-checks the slot against both calendars, then writes a private
     "Pending: Two Otters call" hold into **each** host's calendar with that host's
     own token — no attendees, so nobody is emailed — and emails each host
     (`BOOKING_HOST_EMAIL_<HOST>`) their own signed approve / decline links. A
     ClickUp lead tagged `booking-request` follows. The visitor sees "request received".
  2. A link opens a one-button page (`/api/booking/decide`); the button decides.
     Mail scanners that open links therefore cannot approve anything. Links are
     HMAC-signed with `BOOKING_LINK_SECRET`, name one host and one action, die
     after 24 hours, and are safe to click twice.
  3. When the last host approves: the holds go, one meeting is created in the
     organizer's calendar with the other host as attendee and a Meet link
     (Google invites that host), and the visitor gets **our own** email from
     `BOOKING_FROM_EMAIL` with an `.ics`. The visitor is never a Google attendee.
  4. A decline removes the holds and asks the visitor to pick another time.
  5. After `holdHours` (24) without both approvals, the request stops blocking
     the next time availability is read (holds turn transparent), and the
     expiry job — `GET /api/booking/expire` with `Authorization: Bearer $CRON_SECRET`,
     not scheduled yet — emails the visitor and deletes the holds.
- **State** lives on the organizer's hold as private extended properties, and on
  the meeting once confirmed. There is no database.
- **Email** is SMTP (nodemailer): `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`,
  `SMTP_PASS`, sending as `BOOKING_FROM_EMAIL` / `BOOKING_FROM_NAME`. For a Gmail
  send-as alias, log in as the mailbox that owns the alias with an app password.
  With no SMTP, or with the mock calendar, mail goes to the **outbox** instead:
  the console, plus `.eml` / `.ics` files in `.next/cache/booking-outbox`.
- **Test safety:** `BOOKING_TEST_ALLOWLIST` (addresses or `@domain`) drops mail
  to anyone not on it. Outside production — including Vercel previews — real
  SMTP with an empty allowlist sends to nobody.
- **Local run without Google:** leave the Google variables empty (or set
  `BOOKING_CALENDAR=mock`). The mock calendar keeps holds and meetings in
  `.next/cache/booking-mock.json`; `BOOKING_CLOCK_OFFSET_HOURS=25` moves the
  clock forward to watch a request expire.
- **Scopes** are `calendar.freebusy` and `calendar.events` — we can see *when*
  someone is busy, never what the meeting is.
- **If bookings stop working**, the usual cause is a refresh token that died: the
  consent screen was left in "Testing" (7-day tokens), or the host revoked access.
  The server log says `token refresh for <host>: … invalid_grant`. Re-run the
  script for that host and replace the variable in Vercel.
