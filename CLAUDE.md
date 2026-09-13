# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev              # Next dev server on :3000 (.claude/launch.json runs it on :3001)
npm test                 # Vitest — the automated check for this repo
npm run test:watch       # Vitest in watch mode
npm run build            # Production build
npx tsc --noEmit         # Type check
npm start                # Serve the production build
```

`npm run lint` is **broken**: `next lint` was removed in Next 16 and there is no ESLint config in
the repo, so the script fails with "Invalid project directory provided, no such directory:
.../lint". `npm test` is what replaces it.

Environment variables are documented in `.env.example`; copy it to `.env.local`. Nothing
outside the audit/contact/brand features needs them — the marketing site renders without any.

## Architecture

A bilingual (Hebrew-first, RTL) Next.js 16 App Router marketing site for Two Otters Studio,
plus a free-audit lead funnel. React 19, TypeScript strict, `@/*` → `src/*`.

### Design versions are the organising principle

The site was redesigned in place as `/v2` … `/v8`. Each version is a self-contained triple:

- `src/app/vN/page.tsx` + `styles.css`
- `src/components/vN/*.tsx` (`HeroV8`, `NavV8`, …)
- `src/locales/vN-en.json` + `vN-he.json`

**v8 is live.** [src/app/page.tsx](src/app/page.tsx) is a one-line re-export of `./v8/page`, so `/`
and `/v8` are the same page. Older versions are kept as working references and are excluded
from search in [robots.ts](src/app/robots.ts) and [sitemap.ts](src/app/sitemap.ts). When changing
the homepage, edit the v8 files — never `src/app/page.tsx`.

Components in `src/components/*.tsx` (no version folder) are the original v1 audit-app UI and are
only reachable from `/v2` and `/v3`.

### Language handling

No i18n routing. The page component holds `const [lang, setLang] = useState<Lang>('he')`, picks a
locale object (`locales[lang]`), and passes slices down as a `t` prop. Two effects matter and are
copied into every top-level client page ([v8/page.tsx](src/app/v8/page.tsx),
[LegalShell.tsx](src/app/(legal)/LegalShell.tsx), each case study): reading `?lang=` on mount so
cross-page links keep the language, and writing `document.documentElement.lang`/`dir` so assistive
tech gets the right voice. The root layout declares `lang="he" dir="rtl"` as the honest cold default.

Hebrew UI copy belongs in the locale JSON, not in JSX. Server routes return **error codes**
(`'invalid_email'`, `'consent_required'`, …) and the client maps them to locale strings.

### CSS

Tailwind v4 is installed and imported in `globals.css`, but the site is written in hand-authored
stylesheets. Each design era has its own sheet with its own token prefix, scoped under a root
class so eras can coexist on one page: `--v8-*` under `.v8-page`, `--cs8-*` under `.cs8`.
Stylesheets are imported directly by the page/component that needs them.

Case studies inherit from two different eras — check the imports before copying patterns:

| Page | Imports |
|---|---|
| `work/fincat`, `work/the5ers` | `v8/styles.css` + `work/case-study-v8.css` |
| `work/that-perk`, `work/keren-rightler` | `v6/styles.css` + `work/fincat/styles.css` |
| `work/trade-the-pool` | `v6/styles.css` + `work/case-study.css` + own `styles.css` |

Note the trap called out in [case-study-v8.css](src/app/work/case-study-v8.css): `work/fincat/styles.css`
is *not* the fincat stylesheet — it is the shared v6-era case-study sheet.

Layouts are measured off the Figma canvas (1920 wide, 1408 container) and expressed as percentages
of that, so Figma numbers survive at any width.

### Server/client split for metadata

Pages are client components (language state), but `export const metadata` needs a server module.
So each route is either `page.tsx` (server, metadata) + `Component.tsx` (`'use client'`) — see
[audit/page.tsx](src/app/audit/page.tsx) — or a client `page.tsx` with a sibling `layout.tsx` that
carries the metadata, as the case studies do.

### The audit funnel

`/audit` → `/audit/details` → `/audit/thanks`. State moves through `sessionStorage`
(`twootters.audit.*`), deliberately not the query string, so an email never lands in a URL.
Submission hits [api/forms/audit-request](src/app/api/forms/audit-request/route.ts) — see **Forms**
below for what happens then.

[lib/audit-intake.ts](src/lib/audit-intake.ts) holds the validation rules, wrapped by the zod schema
that both sides run. Anything added there must hold on both sides — including the derived
`needsRelationshipQuestion`, which the server re-derives rather than trusting the client to send.

### The Claude audit pipeline (v1, largely dormant)

[lib/claude.ts](src/lib/claude.ts) runs a three-call chain — Agent Amir (UX) → Agent Keren
(strategy, receives Amir's output) → Synthesis — each returning JSON parsed into the types in
[types/audit.ts](src/types/audit.ts). Prompts live in `src/lib/agents/`. Exposed at
[api/audit](src/app/api/audit/route.ts) and consumed only by the `/v2` and `/v3` drafts; the live
`/audit` funnel is a human-delivered report, not this.

### Brand kit (`/brand`)

[lib/brand-drive.ts](src/lib/brand-drive.ts) reads a link-shared Google Drive folder through the
Drive REST API (API key, 5-min TTL cache, depth/folder caps) and returns a nested tree. When the
env vars are missing it throws `NotConfiguredError` and the route serves `getMockTree()` so the page
stays previewable. `/api/brand/png` rasterises SVGs server-side with resvg — a native binary, hence
`serverExternalPackages` in [next.config.ts](next.config.ts).

### SEO invariants

`SITE_URL` is defined once in [sitemap.ts](src/app/sitemap.ts) and imported by robots. The root
layout sets `metadataBase` plus `alternates.canonical: "./"` so every route declares itself
canonical without repeating the URL, and the Google Search Console `verification` meta tag must stay
in place or the property un-verifies. `next.config.ts` adds `X-Robots-Tag: noindex` for any
`*.vercel.app` host. Funnel steps (`/audit/details`) set `robots: { index: false }` themselves.

## Forms

Every form posts to its own route under `src/app/api/forms/<name>/`, and each route is three lines:
import the spec, import the shared handler, `export const POST = createFormRoute(spec)`.

Behind that sit **two capabilities, not two vendors** ([ports.ts](src/lib/integrations/ports.ts)):

| Port | Role | Adapters |
|---|---|---|
| `LeadRecorder` | durably record a lead *and* notify the team | `clickup`, `console` |
| `Mailer` | write to the visitor | `brevo-group`, `brevo-transactional`, `console` |

The ClickUp task **is** the lead, and ClickUp's own notifications are why there is no internal
email anywhere — nodemailer is gone. `brevo-group` upserts the visitor into a Brevo list and lets
Brevo's automation send; `brevo-transactional` sends a template directly. Both satisfy the same
port, so `MAILER=brevo-transactional` is the whole switch.

A form's `confirm.template` is a **logical** name, resolved per adapter in
[src/config/integrations.json](src/config/integrations.json) — `audit-confirm` → Brevo list 19,
`contact-confirm` → list 18. **Ids and mappings are config, not secrets**, so they live in that
committed file where a teammate can review them in a diff; only tokens and API keys go in the
environment. A matching env var (`MAIL_LIST_AUDIT_CONFIRM`, `CLICKUP_LIST_LEADS`, …) still wins,
for the deployment that needs to differ. Adding a form with its own list is a spec plus one JSON
line. A form with nothing to say sets `confirm: null`.

Both current lists are **transactional**: people enter them by asking for a report or sending an
enquiry, not by opting in. `marketingOptIn` is recorded on the ClickUp task and deliberately feeds
no list, because marketing consent has to be given freely and cannot be the price of the service.
Campaigning to either list would break that.

**Adding a provider is a new adapter file plus a line in
[registry.ts](src/lib/integrations/registry.ts)** — never a change to a route, a handler or a form
spec. The [contract suite](src/lib/integrations/contract.test.ts) runs over every registered
adapter, so a new one proves itself against the port rather than against a reviewer's attention.

Six rules hold this together:

1. **One route per form**, named after the form.
2. **The spec owns the decisions, in vendor-neutral terms** — a title, tags, a due date, a flat
   `fields` map, a logical template name. Vendor vocabulary (list ids, template ids, custom-field
   ids) belongs to the adapter, which resolves it from env via
   [naming.ts](src/lib/integrations/naming.ts).
3. **The zod message *is* the API error code** — `z.string().min(1, 'firstName_required')`. The
   handler returns the first issue's message verbatim; the client maps the code to locale copy, so
   Hebrew and English never reach server code.
4. **The same schema runs twice** — [schemas.ts](src/lib/forms/schemas.ts) is imported by the
   client for instant feedback and re-run by the server, where it counts. The rules themselves
   still live in [audit-intake.ts](src/lib/audit-intake.ts); the schema only arranges them.
5. **A hidden `website` honeypot on every form.** Filled in ⇒ respond `ok: true`, record nothing.
6. **Lead first, courtesy second.** The handler records, and only a recorded lead earns a
   confirmation — so confirming a lead we failed to keep is impossible, not merely unlikely.

That last rule drives the response shape: `{ ok: true, confirmed: true }` when both worked,
`{ ok: true, confirmed: false }` when the mail failed (the lead is tagged `confirmation-failed` so
a human sees it on the board), and `{ ok: false, error: 'send_failed' }` only when the lead itself
could not be recorded. `/audit/thanks` shows "we've sent you a confirmation" **only** when
`confirmed` is true. There is no fallback sink, so the structured `console.error` in
[handler.ts](src/lib/forms/handler.ts) is the last line of defence — keep it complete.

With an empty `.env.local` both ports fall back to their `console` adapter outside production, so
every form is exercisable locally with no credentials. In production they do not fall back.

## Working rules

**Specs before implementation, BDD style.** Tests are co-located `*.test.ts` and named as
behaviour — `it('rejects a disposable address with disposable_email')`, not `it('works')`. Write
the spec, watch it fail, then make it pass. Route handlers are testable without a server: import
the route's `POST` and hand it a `Request`.

**Nothing reaches the browser console unless debugging.** Client code uses `debug()` from
[debug.ts](src/lib/debug.ts), which is silent unless `NEXT_PUBLIC_DEBUG=1`. A visitor's console is
not our log. Server-side `console.error` in route handlers is a different thing and stays.

**Run `npm test` when it could plausibly be affected** — always after touching a schema, the
handler, or an adapter, and before calling anything done.

## Secrets never go in the frontend

Anything sensitive stays server-side: read it from `process.env` inside a route handler, or
inside a `src/lib` module that only route handlers import. **Never give a secret the
`NEXT_PUBLIC_` prefix** — that inlines it as a literal string into the client bundle at build
time, where anyone can read it in devtools, and where rotating it requires a rebuild.

The single `NEXT_PUBLIC_` variable in this repo, `NEXT_PUBLIC_WEB3FORMS_KEY`, is a deliberately
public form-submission key, not a credential. It is the exception, not a pattern to copy.

Read server env *inside a function*, never at module top level — a top-level read in a statically
prerendered page or server component is evaluated at build and frozen into the output. Every
current read follows this (see `api/*/route.ts`, `lib/claude.ts`, `lib/brand-drive.ts`).

A new credential means a new server route, never a new `NEXT_PUBLIC_` var. When in doubt:
`npm run build && grep -r <VAR_NAME> .next/static` must come back empty.

## Conventions

Comments in this codebase explain *why*, often at length, and frequently record a trap someone
already hit (the overscroll background in `globals.css`, the `overflow-x` note in `v8/styles.css`,
the Gmail App Password / alias constraints in the mail routes). Preserve them when editing nearby
code, and write new ones in the same register.

Commit subjects are sentence-case, imperative, and describe the outcome rather than the files
touched ("Paint the canvas behind the document so overscroll stops flashing white").
