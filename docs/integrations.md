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

The Leads list defines six custom fields — Last Contact Date, Lead Score, Status, Lead Source,
Contact Phone Number and Follow-Up Action. Only two could ever be ours to fill, and neither is:

- **Lead Source** already defaults to `Website` in ClickUp, so sending it would be redundant.
- **Contact Phone Number** is a `phone` type, which demands E.164. A local-format number like
  `052-9876543` is rejected with *"Value is not a valid phone number"* — and ClickUp fails the
  **entire task creation**, not just that field. Wiring it would cost leads for the sake of a
  column, so `phone` stays unmapped and the number lives in the task body instead.

The rest — Lead Score, Follow-Up Action, Last Contact Date, Status — are human judgement and
nothing a form could know.

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
