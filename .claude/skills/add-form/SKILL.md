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
this skill assumes.

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

Then `npm test`. Add the form's own specs to
[handler.test.ts](../../../src/lib/forms/handler.test.ts) and
[schemas.test.ts](../../../src/lib/forms/schemas.test.ts).

## 3. Finding the ids

### ClickUp list id

Normally you do not need a new one — every form shares the Leads list already in
`integrations.json`. You only need this for a form that files somewhere else.

```bash
CLICKUP_TOKEN=pk_… node scripts/clickup-setup.mjs            # every list, with its id
CLICKUP_TOKEN=pk_… node scripts/clickup-setup.mjs --check ID # confirm an id is the list you think
```

From the UI instead: **right-click the list in the sidebar → Copy link**. The last segment is the
id. Beware the address bar — on a saved view it shows `/v/l/6-901222088251-1`, which is a *view*
id; the list id is the middle number. The script never has this ambiguity.

### Brevo list id

Open the list in Brevo; the id is the last segment of the URL:

```
https://app.brevo.com/contact/list-listing/id/19
                                             ^^  MAIL_LIST_… / integrations.json
```

**Give each form its own list.** These are transactional audiences — people enter by asking for
something, not by opting in — so one list per form keeps straight what each person consented to,
and lets each have its own automation.

After creating the list, the sending itself is a **Brevo automation** on that list, not something
this repo does: `brevo-group` puts the contact in, Brevo's automation writes the email. A 2xx means
the contact was added, *not* that mail went out — if the automation is missing, the visitor gets
nothing and we still report success. Check the automation exists.

### ClickUp custom fields

Optional and usually unnecessary: every value already appears in the task body. Add one only to
sort or filter the board by it.

```bash
CLICKUP_TOKEN=pk_… node scripts/clickup-setup.mjs --fields LIST_ID
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
