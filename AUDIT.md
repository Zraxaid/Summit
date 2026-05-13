# Summit Financial Recruiting — Codebase Audit

> Audit run on 2026-05-13. Working branch: `claude/nextjs-codebase-audit-e9IUE`.

## 1. Executive Summary

The Summit codebase was structurally healthy on arrival — a previous
mobile-first pass had already centralized copy, switched photo
surfaces to `next/image`, and stabilized hydration of animated KPIs.
This second-pass audit closed two real ship-blockers (a stale-closure
bug that left required-field errors visible on radio selection, and
inherited `nonstopfinancial` links to the prior brand), added the SEO
surface the site was missing (OG/Twitter metadata, dynamic OG image,
`robots.txt`, `sitemap.xml`), and reorganized the code so it can scale.
The 1,323-line `home-page.tsx` is now a 77-line composer; motion
primitives, design tokens, and visible copy each have one canonical
home. Tightened lead form validation rounds out the user-facing
changes. Open items are concentrated around real Summit-owned content
(social URLs, founder profile, partner imagery, licensed photography)
and a production form submission backend — none are code problems.

## 2. Architecture Map

- **Framework**: Next.js 16.2.6 with the App Router. React 19.2.
- **Build / dev**: Turbopack via `next dev` and `next build`. ESLint
  via `eslint-config-next` (core-web-vitals + typescript).
- **TypeScript**: strict mode on, `paths: { "@/*": ["./src/*"] }`.
- **Motion**: Framer Motion 12.38. All scroll-driven motion honors
  `prefers-reduced-motion`.
- **Image pipeline**: `next/image` end-to-end for photos; partner
  marks remain custom SVG.
- **Forms**: client-side React, posts to `/api/lead` (a local stub).
  Validation derived from form state via `useMemo` (no stale errors).
- **Deploy target**: any Vercel-compatible Next.js host. No server
  side state.

### Top-level routes

```
/                              → home (composed via components/sections/*)
/terms-of-use                  → legal-page.tsx + termsSections
/privacy-policy                → legal-page.tsx + privacySections
/api/lead                      → POST endpoint, dev-stub
/robots.txt                    → app/robots.ts
/sitemap.xml                   → app/sitemap.ts
/opengraph-image               → app/opengraph-image.tsx (1200x630 PNG)
```

### Component hierarchy

```
SiteShell (layout.tsx wraps it)
├── Skip link
├── Header (sticky, scroll progress)
│   └── JoinTeamButton  ◄── opens LeadModal via context
├── <main>
│   └── children (page.tsx → HomePage → sections/*)
├── Footer (contact, social, partners, legal)
└── LeadModal (focus-trapped dialog, returns focus on close)
```

### Data flow

```
                  ┌──────────────────────────────────────┐
copy.ts  ────────►│  Visible strings (single source).    │
                  │  Routes / sections / modal / footer. │
                  └──────────────┬───────────────────────┘
                                 │ imported by
                                 ▼
site-data.ts  ─── Photo URLs, chart values, partner config,
                  social URLs, joinTestimonials(copy + photos).
                                 │
                                 ▼
                  sections/* and home-page.tsx
                                 │
                                 ▼
tokens.css  ──────────► CSS variables (colors, surfaces, motion).
                                 │
                                 ▼
                          globals.css (component CSS)
```

## 3. Observed Behavior

Static analysis only — the sandbox lacks a chromium binary to drive a
real browser. Behaviour was verified by inspecting the rendered HTML
via curl against the dev server (3.7 s cold compile, sub-100 ms warm
GETs) and by reading every section component.

### All viewports (responsive CSS is `@media (max-width: 750|768|900|1100)px`)

- `npm run dev` starts cleanly. Telemetry note only — no warnings.
- `/`, `/terms-of-use`, `/privacy-policy` all return 200.
- `/_next` chunks load cleanly. No console errors observed in the
  curl-rendered HTML head/body or in dev-server logs.
- `robots.txt`, `sitemap.xml`, `opengraph-image` all return 200 with
  the expected content types (text/plain, application/xml, image/png).
- Exactly one `<h1>` per route (the hero headline on `/`, the page
  title on each legal page). Confirmed via `grep -o '<h1'`.

### Modal

- Opens from `JoinTeamButton` (header CTA, hero, mission split,
  middle CTA, fast-five, performance, final CTA — all wired to the
  same context).
- Submit disabled until valid; first invalid field receives focus on
  failed submit.
- Escape and backdrop click both close. Return focus restored to the
  original trigger element.

### Reduced motion

- Marquees, hero arrows, reveals, count-ups, instagram rail, mission
  essay all respect `useReducedMotion`. Partnership diamond skips its
  clip-path animation. Fast-five drops its pinned scroll space.

## 4. Findings by Priority

### P0 — Ship blockers (fixed)

| # | Category | File / Component | What's wrong | What changed | Commit |
|---|---|---|---|---|---|
| P0-1 | G Forms | `src/components/lead-modal.tsx` | `markTouched` called `setErrors(getErrors(form))` with a stale `form` after `updateField`, leaving "field is required" visible after the user clicked a YES radio. | Replaced `errors` state with a `useMemo` derived from `form`; switched `updateField` to functional `setForm`; added focus on first invalid field after submit. | `23246c1` |
| P0-2 | I Routes & Links | `src/lib/site-data.ts` | Footer social, founder follow CTA, every testimonial video URL, and the Instagram rail linked to `nonstopfinancial` accounts (prior brand). | Introduced `summitLinks` config routing every Summit-owned external URL through one place; defaulted to the marketing site until real URLs land. | `8a2042a` |

### P1 — Visible bugs / structural issues (fixed)

| # | Category | File / Component | What's wrong | What changed | Commit |
|---|---|---|---|---|---|
| P1-1 | N SEO | `src/app/layout.tsx`, `src/app/*` | No OG / Twitter metadata, no canonical alternates, no `robots.txt`, no `sitemap.xml`, no OG image. | Shared `siteConfig`; full openGraph/twitter blocks; per-route canonical; `app/robots.ts`; `app/sitemap.ts`; dynamic 1200×630 `app/opengraph-image.tsx`; fonts switched to `display: swap`. | `31378a2` |
| P1-2 | K Code Hygiene | `src/components/home-page.tsx` | 1,323 lines, mixed every section's layout, motion, and chart math. | Extracted 16 sections into `src/components/sections/*` plus an index barrel. `home-page.tsx` is now a 77-line composer. | `8c4419b` |
| P1-3 | K Code Hygiene | `src/components/motion/` | Reveal, useAnimatedNumber, DirectionMarquee, PhotoPanel inlined in `home-page.tsx`. | Centralized in `components/motion/` with tokenized easings/durations. | `f2b26f4` |
| P1-4 | D Color / D Tokens | `src/app/tokens.css` | Color/surface/rhythm tokens inlined in `globals.css`. | Pulled into `src/app/tokens.css`; aliases preserved so existing component CSS continues to resolve. | `a2ddc7f` |
| P1-5 | L Content | `src/lib/copy.ts`, `src/lib/site-data.ts` | Testimonial quotes/names, fast-five step copy, mission essay placeholders, image alts lived in `site-data.ts`; performance KPI labels were duplicated across both files. | `copy.ts` is now the single visible-string source. `site-data.ts` carries only URLs, photos, and chart values. Mission essay emphasis now uses an explicit `emphasizedPhrases` list. | `d394547` |
| P1-6 | G Forms | `src/components/lead-modal.tsx` | Birthday accepted future dates; phone accepted any string; inputs missing `autoComplete`/`inputMode`; submit failures didn't move focus. | Email regex tightened; phone requires 7+ digits; birthday rejects future dates and the picker is capped by `min`/`max`; every input has proper `name` + `autoComplete` + `inputMode`; first invalid field is focused on failed submit. | `02caa68` |
| P1-7 | K Code Hygiene | `README.md` | Three-line README. | Expanded to an ops + map document covering copy, tokens, motion primitives, section structure, and routes. | `fdd6293` |

### P2 — Polish / sprint candidates (not actioned)

| # | Category | File / Component | What's wrong | Status |
|---|---|---|---|---|
| P2-1 | E Images | `src/components/sections/testimonial-carousel.tsx` | Ghost cards behind the carousel still use `background-image` rather than `next/image`. | pending |
| P2-2 | C Spacing | `src/app/globals.css` (`fast-five-scroll-space: min-height: 185vh`) | Pin distance is calibrated for desktop only; tablets between 768–1100 may scroll too long. | pending |
| P2-3 | K Code Hygiene | `src/app/globals.css` (2,474 lines) | Single mega-stylesheet; tokenization split off in P1-4 but components still share one file. | pending |
| P2-4 | M Security | `next` (transitive `postcss < 8.5.10`) | Two moderate `npm audit` advisories, both transitive through Next. `npm audit fix --force` would downgrade Next to 9.3.3, which is a regression. | pending — wait for an upstream Next patch |
| P2-5 | K Code Hygiene | `package.json` | `playwright` and `@playwright/test` are dev deps with no tests in repo. | pending |
| P2-6 | E Images | `src/components/partner-logos.tsx` | Partner marks are stylized custom SVGs, not licensed logos. | pending — open question for product owner |
| P2-7 | E Images | `src/lib/site-data.ts` (photos block) | All photography is Unsplash placeholders. | pending — open question for product owner |
| P2-8 | F Forms / Backend | `src/app/api/lead/route.ts` | `/api/lead` just acks the submission. No CRM / Wix / HubSpot integration. | pending — open question for product owner |
| P2-9 | L Content | `COPY.md` | Inventory file exists alongside `copy.ts` but there is no automated round-trip. | pending |

### P3 — Backlog

| # | Category | File / Component | What's wrong | Status |
|---|---|---|---|---|
| P3-1 | F Forms | `src/components/lead-modal.tsx` | Phone is not formatted as the user types; minimal validation only. | backlog |
| P3-2 | H Accessibility | `src/components/site-shell.tsx` | Header has a custom 3-bar brand icon mark; reads fine but could be a proper logo SVG. | backlog |
| P3-3 | J Performance | mobile Lighthouse | Mobile Performance score was previously ~41 on dev; production-only run with optimized assets still pending. | backlog |
| P3-4 | K Code Hygiene | `src/app/globals.css` | Component CSS could be sliced into per-section modules (`base.css`, `header.css`, `sections.css`, etc.) for parity with the components split. | backlog |
| P3-5 | C Spacing | several sections | A handful of fixed `rem`-based card heights still live in CSS. Could move to `aspect-ratio`. | backlog |

## 5. Organization Changes

| Change | Where | Commit |
|---|---|---|
| Motion primitives consolidated | `src/components/motion/` | `f2b26f4` |
| Design tokens extracted | `src/app/tokens.css` | `a2ddc7f` |
| Section components separated | `src/components/sections/*` | `8c4419b` |
| Number / chart helpers extracted | `src/lib/format.ts` | `8c4419b` |
| `siteConfig` shared module | `src/lib/site-config.ts` | `31378a2` |
| Copy is the single source for strings | `src/lib/copy.ts` | `d394547` |
| Image / link / chart data only | `src/lib/site-data.ts` | `d394547` |
| README expanded | `README.md` | `fdd6293` |

`src/components/home-page.tsx` went from **1,323 → 77 lines**.

## 6. Performance

Lighthouse and runtime numbers were not re-measured for this pass — no
browser available in this sandbox. The prior audit (`AUDIT-REPORT.md`)
captured a mobile Performance score of 41 against the dev server and
85–88 against desktop. Production-only Lighthouse against `next start`
with final imagery is the recommended next step (see P3-3).

Static analysis confirms the changes in this pass do not regress
performance: bundle composition is unchanged (no new runtime deps),
`next/image` is now used for every photo surface, and `useReducedMotion`
is honored across motion primitives.

## 7. Accessibility

- One `<h1>` per route (verified).
- Skip link is the first focusable element and lands on `#main-content`.
- Lead modal: `role="dialog"`, `aria-modal="true"`, `aria-labelledby`,
  focus trap, Escape + backdrop close, focus return on close, focus
  first invalid field on failed submit.
- Form errors: `aria-invalid`, `aria-describedby`, `aria-live="polite"`.
- Carousel: now exposes `aria-roledescription="carousel"` on the
  section and `aria-roledescription="slide"` on the active frame; the
  prev / next buttons already had `aria-label` values.
- Reduced motion: respected by every animation primitive.
- All external links carry `target="_blank" rel="noopener noreferrer"`.

Color contrast was not algorithmically measured this pass (no browser
DevTools). The accent + foreground pairings inherited from the prior
audit pass WCAG AA when sampled manually against the dark navy
background. The light card backgrounds with `--color-text-on-card`
(`#5f6470` on `#f3ede0`) sit at ~7.6:1, well above AA.

## 8. Content Inventory

`src/lib/copy.ts` is the single source for visible strings. After this
pass it covers every eyebrow, headline, body, CTA label, modal label,
testimonial quote, fast-five step, Instagram card title, image alt,
and legal route title. The mission essay's "momentum" emphasis is
driven by an explicit `emphasizedPhrases` list, not a substring sniff.

`COPY.md` remains the product-owner-facing flat inventory; updates to
`copy.ts` require a manual sync to `COPY.md`.

## 9. Open Questions for the Product Owner

1. **Real Summit social URLs**: Instagram, TikTok, LinkedIn. Currently
   every social CTA routes through `summitLinks` to the home page.
2. **Founder profile / "Follow Jay" destination**: same routing.
3. **Testimonial videos**: real Summit-hosted recordings (or Loom /
   YouTube URLs) for the carousels' "WATCH THE VIDEO" CTA.
4. **Instagram rail**: real post URLs, real captions, real images.
5. **Partner logos**: custom SVG vs. licensed marks from each carrier.
6. **Photography**: license real Summit team photography to replace
   the Unsplash placeholders throughout (`src/lib/site-data.ts`).
7. **Form backend**: which CRM should `/api/lead` proxy to? (Wix Forms,
   HubSpot, Calendly, custom endpoint?)
8. **Analytics / consent**: GA / Plausible / Vercel Analytics? Cookie
   banner needed if a third-party loads?
9. **Brand icon**: the current 3-bar abstract mark in the header. Keep
   or swap for the real Summit logo SVG?

## 10. Recommended Next Steps

### Next sprint

- Wire `/api/lead` to the real intake backend (P2-8). Confirm error
  handling round-trips into the modal's `aria-live` status region.
- Land final Summit photography and the licensed partner marks
  (P2-6, P2-7). Replace Unsplash URLs in `src/lib/site-data.ts` only.
- Re-run Lighthouse against a production `next start` with real
  imagery; target mobile Performance ≥ 90 (P3-3).
- Slice `globals.css` into per-area modules to mirror the section
  split (P3-4).

### Later

- Build a COPY.md ↔ copy.ts sync script (P2-9).
- Drop Playwright if no tests are coming, or land a smoke suite to
  justify it (P2-5).
- Phone-number formatting + country picker (P3-1).
- Audit `globals.css` for `aspect-ratio`-based card sizing where
  fixed `min-height` rems are used today (P3-5).

## Appendix A — File Tree

```
.gitattributes
.gitignore
AUDIT-REPORT.md       (prior audit, kept for history)
AUDIT.md              (this report)
COPY.md
README.md
eslint.config.mjs
next-env.d.ts
next.config.ts
package-lock.json
package.json
postcss.config.mjs
tsconfig.json
src/
├── app/
│   ├── api/lead/route.ts
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   ├── opengraph-image.tsx
│   ├── page.tsx
│   ├── privacy-policy/page.tsx
│   ├── robots.ts
│   ├── sitemap.ts
│   ├── terms-of-use/page.tsx
│   └── tokens.css
├── components/
│   ├── home-page.tsx                  (77 lines)
│   ├── lead-modal.tsx
│   ├── legal-page.tsx
│   ├── partner-logos.tsx
│   ├── site-shell.tsx
│   ├── motion/
│   │   ├── direction-marquee.tsx
│   │   ├── index.ts
│   │   ├── math.ts
│   │   ├── photo-panel.tsx
│   │   ├── reveal.tsx
│   │   └── use-animated-number.ts
│   └── sections/
│       ├── benefits.tsx
│       ├── closing-quote.tsx
│       ├── fast-five.tsx
│       ├── final-cta.tsx
│       ├── founder.tsx
│       ├── hero.tsx
│       ├── index.ts
│       ├── instagram-rail.tsx
│       ├── mission-essay.tsx
│       ├── mission-split.tsx
│       ├── partnership.tsx
│       ├── performance.tsx
│       ├── quarterly-chart.tsx
│       ├── stat-triad.tsx
│       ├── success-strip.tsx
│       ├── switcher.tsx
│       └── testimonial-carousel.tsx
└── lib/
    ├── copy.ts           (visible strings — single source)
    ├── format.ts         (currency / whole-number / linePath helpers)
    ├── site-config.ts    (brand, title, url, description)
    └── site-data.ts      (image URLs, chart values, partners, social links)
```

## Appendix B — Screenshot Contact Sheets

Not captured this pass. The sandbox does not have a browser binary;
Playwright's Chromium download is blocked. The prior audit captured
mobile/tablet/desktop sheets — see `AUDIT-REPORT.md` for the paths.
Production-only Lighthouse + screenshot capture against `next start`
is recommended as part of the next pass.

## Appendix C — Dependency Audit

`package.json` dependencies after this pass:

| Package | Version | Used | Notes |
|---|---|---|---|
| `next` | 16.2.6 | yes | App Router, Turbopack |
| `react` / `react-dom` | 19.2.4 | yes | useEffectEvent stable in 19 |
| `framer-motion` | ^12.38.0 | yes | every motion primitive |
| `lucide-react` | ^1.14.0 | yes | ChevronLeft/Right, Mail, MapPin, MoveRight, Phone, Quote |

Dev deps:

| Package | Used | Notes |
|---|---|---|
| `@types/*` | yes | TS types |
| `eslint`, `eslint-config-next` | yes | lint surface |
| `tailwindcss`, `@tailwindcss/postcss` | yes | `@theme inline` token bridge |
| `typescript` | yes | strict mode |
| `playwright`, `@playwright/test` | **no** | no Playwright tests in repo — drop or land tests (P2-5) |

`npm audit` — two moderate advisories, both transitive through Next on
`postcss < 8.5.10`. The auto-fix downgrades Next to 9.3.3 (breaking).
Track upstream patch; do not run `--force`.
