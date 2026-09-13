# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev              # Next dev server on :3000 (.claude/launch.json runs it on :3001)
npm run build            # Production build — the only real check we have
npm start                # Serve the production build
npx tsc --noEmit         # Type check
```

There is no test suite. `npm run lint` is **broken**: `next lint` was removed in Next 16 and
there is no ESLint config in the repo, so the script fails with "Invalid project directory
provided, no such directory: .../lint". Use `npm run build` (which type-checks) to validate a change.

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
Submission hits [api/audit-request](src/app/api/audit-request/route.ts), which emails the studio and
sends the visitor a confirmation (the confirmation failing is logged, not surfaced — we already
have the lead).

[lib/audit-intake.ts](src/lib/audit-intake.ts) holds the validation rules and is run **twice**: on
the client for instant feedback and again on the server, where it actually counts. Anything added
there must hold on both sides — including the derived `needsRelationshipQuestion`, which the server
re-derives rather than trusting the client to send.

Both mail routes (`audit-request`, `contact`) declare `export const runtime = 'nodejs'` because
nodemailer opens a real SMTP socket. Both use a hidden `website` honeypot field and answer `ok: true`
when it is filled.

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

## Conventions

Comments in this codebase explain *why*, often at length, and frequently record a trap someone
already hit (the overscroll background in `globals.css`, the `overflow-x` note in `v8/styles.css`,
the Gmail App Password / alias constraints in the mail routes). Preserve them when editing nearby
code, and write new ones in the same register.

Commit subjects are sentence-case, imperative, and describe the outcome rather than the files
touched ("Paint the canvas behind the document so overscroll stops flashing white").
