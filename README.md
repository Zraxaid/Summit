# Summit Financial Recruiting

Marketing site for Summit Financial Recruiting — a single-page recruiting
funnel for an insurance agency. Built with Next.js (App Router, React 19)
and Framer Motion.

## What's here

- A long-scroll marketing homepage with 22 sections (hero, stat triad,
  marquees, mission essay, testimonials, KPI dashboard, "Fast Five"
  process, performance chart, partnership diamond, final CTA, closing
  quote).
- A shared `JOIN THE TEAM` lead modal with focus trap, escape/backdrop
  close, blur-based validation, and an `aria-live` status region.
- Legal pages at `/terms-of-use` and `/privacy-policy`.
- A development `/api/lead` endpoint that acks form submissions for
  local testing — wire this to a real CRM / Wix Forms / HubSpot
  endpoint before launch.
- SEO surface: per-route metadata, OpenGraph + Twitter tags, a
  dynamically generated 1200x630 OG image, `robots.txt`, `sitemap.xml`.

## Local development

```bash
npm install
npm run dev          # next dev — http://localhost:3000
npm run build        # production build (turbopack)
npm run lint         # eslint
```

Useful routes:

- `/` — home
- `/terms-of-use`
- `/privacy-policy`
- `/api/lead` — POST (form submission)
- `/robots.txt`, `/sitemap.xml`, `/opengraph-image`

## Where to edit what

### Visible copy

Every visible string lives in [`src/lib/copy.ts`](src/lib/copy.ts). Edit
strings there and they propagate everywhere — testimonials, fast-five
steps, eyebrows, headlines, modal labels, legal intros, etc.

`COPY.md` is a flat product-owner-facing inventory derived from the
same content. If you change `copy.ts`, update `COPY.md` in the same PR
(there is no automated round-trip yet).

### Imagery and external URLs

`src/lib/site-data.ts` carries everything non-textual: image URLs,
testimonial portrait/video URLs, chart values, partner data, social
links. Summit-owned URLs are gated behind a `summitLinks` config at the
top of the file — set those once and every CTA picks them up.

### Design tokens (color, spacing, motion)

CSS custom properties live in [`src/app/tokens.css`](src/app/tokens.css).
Add or rename a token there; never hardcode hex values in component
CSS. Existing legacy aliases (`--background`, `--foreground`, `--card`)
are kept so older selectors continue to resolve.

### Motion primitives

[`src/components/motion/`](src/components/motion) holds the reusable
animation building blocks:

| Primitive            | Purpose                                          |
| -------------------- | ------------------------------------------------ |
| `Reveal`             | Fade + lift on scroll, honors reduced motion     |
| `useAnimatedNumber`  | Count-up hook for KPI displays                   |
| `DirectionMarquee`   | Scroll-direction-aware horizontal marquee        |
| `PhotoPanel`         | `next/image` wrapper used by every photo surface |
| `math.ts`            | `clamp`, `wrap`, easings, motion duration tokens |

### Section components

[`src/components/sections/`](src/components/sections) — one file per
homepage section. `components/home-page.tsx` is now a thin layout
composer that imports from the section barrel.

### Site shell, modal, partner logos

- `src/components/site-shell.tsx` — sticky header, footer, scroll
  progress bar, `JoinTeamButton`, `useJoinTeamModal` context.
- `src/components/lead-modal.tsx` — the lead-capture dialog.
- `src/components/partner-logos.tsx` — custom SVG partner marks.

## Deploy target

Vercel-compatible Next.js project. Production build:

```bash
npm run build && npm start
```

For Vercel: connect the repository, set the project root to the repo
root, no special build configuration needed.

## Open questions

The latest audit (see `AUDIT.md`) lists open questions for the product
owner — primarily around final imagery, partner mark licensing, and
real form-submission backend.
