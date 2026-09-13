---
name: add-form
description: Add a new form to the Two Otters site end to end — schema, spec, route, config and client wiring — and connect it to ClickUp and/or Brevo. Use when someone wants a new form, a new lead capture, a newsletter signup, or wants an existing form to start writing to a visitor. Also covers finding a ClickUp list id or a Brevo list id.
---

# Add a form

Every form on this site follows one convention. Your job is to walk the developer through it,
asking rather than assuming, and to leave the repo with passing specs.

**The basic config, always:**

```
internal (the team)    -> a ClickUp task in the Leads list      — every form, mandatory
external (the visitor) -> a Brevo list whose automation sends   — optional, per form
```

Read [CLAUDE.md](../../../CLAUDE.md) §Forms first if you have not already — it holds the six rules
this skill assumes — and [docs/integrations.md](../../../docs/integrations.md) for what the
accounts actually contain: list ids, the ClickUp auto-assign automation, and which Brevo
attributes exist versus which get silently dropped.

## 1. Ask before building

Use `AskUserQuestion`. Do not guess any of these.

**Q1 — What is the form called?** Its name becomes everything: the route
`/api/forms/<name>`, the spec file `src/lib/forms/<name>.ts`, the ClickUp tag, and the logical
template name. Use kebab-case (`newsletter`, `workshop-signup`).

**Q2 — Does it write to the visitor?** This is the internal/external decision.

- *Internal only* — `confirm: null`. The team gets a ClickUp task; the visitor sees an on-screen
  message and nothing else. Correct when the form is an enquiry someone will answer by hand.
- *Also external* — `confirm: { template: '<name>-confirm', … }` and a Brevo list. Correct when
  the visitor is promised something: a confirmation, a download, a newsletter.

If they are unsure, ask what the visitor is told on screen after submitting. If the copy promises
an email, it is external; if it says "we'll get back to you", it is internal only.

**Q3 — Which fields, and which are required?** Required fields need an error code each; optional
ones do not. Always include `email` — both destinations key on it.

**Q4 — Does it need consent?** If the form feeds anything marketing-shaped, marketing consent must
be a separate, optional checkbox, never bundled into the submit. See `consentReport` and
`marketingOptIn` in the audit form for the pattern and why they are two fields.

## 2. Build it, specs first

Write the spec, watch it fail, then make it pass. Five places, none of which is a route handler or
an adapter:

1. **Schema** in [src/lib/forms/schemas.ts](../../../src/lib/forms/schemas.ts). Reuse the `text()`
   and `checkbox()` helpers and the rules in
   [audit-intake.ts](../../../src/lib/audit-intake.ts) — do not rewrite email or URL validation.
   **The message on each rule IS the error code** the client maps to locale copy:
   `z.string().min(1, 'name_required')`.
2. **Spec** — new `src/lib/forms/<name>.ts` using `defineForm`. Copy the shape from
   [contact.ts](../../../src/lib/forms/contact.ts) (internal only) or
   [audit-request.ts](../../../src/lib/forms/audit-request.ts) (internal + external).
   `record.rows` is the human-readable task body; `record.fields` is the flat, neutral map.
   Give it its own `tags: ['<name>']`.
3. **Route** — `src/app/api/forms/<name>/route.ts`, exactly three lines.
4. **Config** — one line in
   [src/config/integrations.json](../../../src/config/integrations.json) under
   `brevo-group.lists`, only if the form is external. **Ids are config, not secrets** — they belong
   in this file, never in `.env`.
5. **Client** — post JSON to `/api/forms/<name>` including the hidden `website` honeypot, and map
   the returned `error` code to copy in `src/locales/v8-{he,en}.json`. Both languages, always.
6. **Bot protection** — add the new route to the `protect` list in
   [src/instrumentation-client.ts](../../../src/instrumentation-client.ts). **Do not skip this.**
   The shared handler runs a BotID check on every form; a route the client never challenged has no
   token to present, so the form would reject every real visitor. Local dev always answers HUMAN,
   which means you will not notice until production.

Then `npm test`. Add the form's own specs to
[handler.test.ts](../../../src/lib/forms/handler.test.ts) and
[schemas.test.ts](../../../src/lib/forms/schemas.test.ts).

## 3. Finding the ids

Do not go hunting through APIs for these. **Ask the developer to paste the link** to the list and
read the id out of it.

### ClickUp list id

Usually you need nothing: every form shares the Leads list already in `integrations.json`. You only
need a new id for a form that files somewhere else.

Ask them to **right-click the list in the sidebar → Copy link**. Two shapes come back, and the id
sits in a different place in each:

```
https://app.clickup.com/90121898659/v/li/901222088251
                        └ workspace ┘     └── list id ──┘      ← Copy link gives this

https://app.clickup.com/90121898659/v/l/6-901222088251-1
                        └ workspace ┘      └── list id ──┘     ← the address bar on a saved view
```

The rule: **the list id is inside the `/v/…` part, never the number right after `.com/`** — that
one is the workspace. In the `/v/l/` form the trailing `6-…-1` is a *view* identifier with the list
id as its middle number; using the whole thing will fail with a 404.

Read it back to them before writing it anywhere — "that's list `901222088251`, the Leads list?" —
so a wrong copy-paste surfaces now rather than on the first real submission.

### Brevo list id

Ask them to open the list in Brevo and paste the URL. The id is the last segment:

```
https://app.brevo.com/contact/list-listing/id/19
                                              └┘ list id
```

Brevo list ids are small integers, so if you see something long you have the wrong number.

**Give each form its own list.** These are transactional audiences — people enter by asking for
something, not by opting in — so one list per form keeps straight what each person consented to,
and lets each have its own automation.

After creating the list, the sending itself is a **Brevo automation** on that list, not something
this repo does: `brevo-group` puts the contact in, Brevo's automation writes the email. A 2xx means
the contact was added, *not* that mail went out — if the automation is missing, the visitor gets
nothing and we still report success. Ask them to confirm the automation exists.

**Attributes are dropped silently if Brevo has no definition for them.** Anything in
`confirm.params` is sent as a contact attribute, but Brevo stores only the ones its account
defines and discards the rest while still answering 2xx — so a template personalising on a missing
attribute renders blank with no error anywhere. Brevo ships `FIRSTNAME`, `LASTNAME`, `JOB_TITLE`,
`SMS` and a few more; **any other param needs a custom attribute created first** under
Contacts → Settings → Contact attributes. Check what exists before relying on one:

```bash
node --env-file=.env -e 'fetch("https://api.brevo.com/v3/contacts/attributes",{headers:{"api-key":process.env.BREVO_API_KEY}}).then(r=>r.json()).then(d=>d.attributes.forEach(a=>console.log(a.name,a.type||"")))'
```

### ClickUp custom fields

Optional, and usually not worth it: every value already appears in the task body, so a field only
buys sorting and filtering on the board. If they do want one, its id is not in any URL — fetch it
ad hoc with the token already in `.env`:

```bash
node --env-file=.env -e 'fetch("https://api.clickup.com/api/v2/list/LIST_ID/field",{headers:{Authorization:process.env.CLICKUP_TOKEN}}).then(r=>r.json()).then(d=>d.fields.forEach(f=>console.log(f.id,f.name,f.type)))'
```

Keep any field carrying a Hebrew label as **Text**, not Dropdown — a dropdown expects an option
UUID and would reject the write.

## 4. Verify

```bash
npm test                                   # specs, including the adapter contract suite
npx tsc --noEmit && npm run build
```

Then live, with credentials in `.env` and `npm run dev` running:

```bash
curl -s -X POST http://localhost:3000/api/forms/<name> \
  -H 'Content-Type: application/json' -d '{"…":"…"}'
```

Expect `{"ok":true,"confirmed":true}` for an external form, `confirmed:false` for internal-only.
Then check the ClickUp task exists with the right tag, and for external forms that the contact
reached the Brevo list.

Also check the failure path — it is the part that protects a lead. Point the mailer at a bad key
and confirm you still get `ok:true` with `confirmed:false`, the task still created and tagged
`confirmation-failed`.

## Things that will bite

- **Never put a list id in `.env`.** Ids are config; only `CLICKUP_TOKEN` and `BREVO_API_KEY` are
  secrets. An env var does override the file, but that is for a deployment that must differ.
- **Never add a `NEXT_PUBLIC_` variable for any of this.** It would inline into the browser bundle.
- **Brevo blocks unauthorised IPs** if that setting is on. It cannot work on Vercel, whose
  functions egress from a shared pool — turn the restriction off for the API key.
- **Client code uses `debug()`**, never `console.*`. See [src/lib/debug.ts](../../../src/lib/debug.ts).
- **A form with no honeypot is a form bots will find.** The hidden `website` input is not optional.
