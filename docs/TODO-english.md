# TODO: English for the new site

The new site (v10, live at the root since the launch-v10 branch) is **Hebrew only**.
There is no English toggle and no English route. `/?lang=en` just renders the
Hebrew home page.

**The whole new site must be translated to English** before an English toggle comes back.

## Pages to translate

- `/` (home)
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
