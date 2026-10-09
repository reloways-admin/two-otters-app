# TODO: English for the new site

The new site (v10, live at the root since the launch-v10 branch) is Hebrew,
except the **homepage, which is translated at `/en`** (strings in
`src/locales/v10-en.json`). The flag in the header switches between `/` and
`/en` on every page; the English menu and footer lead to pages that are still
Hebrew. The old site's `/?lang=en` redirects to `/en`.

To translate another page: give it an `/en/...` route under `src/app/(en)/en/`,
add its strings to `v10-en.json`, and point the flag at it.

## Pages to translate

- ~~`/` (home)~~ done, at `/en`
- `/services`
- `/services/mvp`
- `/services/upgrade`
- `/services/marketing`
- `/services/new-site`
- `/work`
- `/partners`
- `/about`
- `/contact` (including the form's success and error messages)
- The shared header (nav, mega menus, mobile drawer) and the footer

## What it takes

- `src/locales/v10-he.json` needs an English counterpart (`v10-en.json`) with
  the same keys.
- Several pages keep their Hebrew copy inline in the components, not in the
  locale file: `src/components/v10/pages/*` (work, partners, about) and
  `src/components/v10/services/*`. These strings have to move into the locale
  files, or get an English version, first.
- The frame (`src/app/(site)/layout.tsx`) hardcodes `dir="rtl" lang="he"`.
  It needs to switch with the language, the way v8 does (see `src/app/v8/page.tsx`).
- Decide how language is addressed (a `?lang=en` param, as on v8 and the case
  studies, or an `/en` route), then bring back the toggle in `NavV10` and add
  English to the page metadata.

## Still in English today

- v8, the previous homepage, still has English at `/v8?lang=en`. It is history
  (noindexed, blocked in robots.txt), not the live site.
- The case studies (`/work/*`), `/privacy`, `/accessibility` and `/audit`
  keep their existing `?lang=en` support.
