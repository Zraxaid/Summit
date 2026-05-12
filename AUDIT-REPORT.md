# Summit Financial Recruiting - Audit Report

## Executive summary

The biggest issues were mobile conversion and rendering reliability: the lead modal was not fully keyboard-accessible, the KPI dashboard had a real hydration mismatch, and the page still relied on brittle background-image rendering for most photography. This pass closed the P0 and P1 issues by fixing the modal flow, stabilizing animated numbers, tightening mobile spacing and CTA layout, centralizing copy into `src/lib/copy.ts`, and moving major photo surfaces to `next/image`. Remaining work is mostly polish: a round-trip `COPY.md` sync script, replacing placeholder/stylized partner imagery with final approved assets, and improving mobile Lighthouse performance with production-grade asset optimization.

## Findings by priority

### P0

| File | What was wrong | What changed |
|---|---|---|
| `src/components/lead-modal.tsx` | Submit stayed available before the full form was valid, errors only surfaced on submit, Escape/close/focus-return behavior was incomplete, and the visible close glyph was mojibake. | Added blur-based validation, disabled submit until the form is valid, restored a real `×` close control, trapped focus inside the dialog, supported Escape/backdrop close, and returned focus to the trigger on close. |
| `src/components/site-shell.tsx` | CTA triggers opened the dialog, but the trigger element was not preserved, so focus could not reliably return after closing. | Stored the last trigger element in the shell and passed it into the modal so close behavior restores keyboard position. |
| `src/components/home-page.tsx` | The performance dashboard produced a hydration mismatch because compact currency formatting differed between server and client for the animated KPI start state. | Replaced the unstable compact formatter with a deterministic formatter and verified the page now renders with zero hydration errors. |
| `src/components/home-page.tsx`, `src/app/globals.css` | Reduced-motion support was incomplete and one marquee still ran under `prefers-reduced-motion`. | Gated the shared reveal wrapper and animated numbers with `useReducedMotion`, disabled the Instagram rail in reduced-motion mode, and rechecked with Playwright until reduced-motion reported zero running animations. |

### P1

| File | What was wrong | What changed |
|---|---|---|
| `src/app/globals.css` | Mobile layout still had clipping risk, inconsistent focus affordances, and desktop-calibrated spacing in several sections. | Added visible focus rings, clipped horizontal overflow, tightened hero collage positioning, stabilized stacked Fast Five cards, and improved small-screen min-width/spacing behavior on cards and KPI blocks. |
| `next.config.ts`, `src/components/home-page.tsx`, `src/app/globals.css` | Photo-heavy sections were rendered with CSS background images, which limited responsiveness and bypassed Next image optimization. | Added the Unsplash remote image config and moved the hero collage, reusable photo panels, and Instagram cards onto `next/image` with explicit `sizes`. |
| `src/lib/copy.ts`, `src/lib/site-data.ts`, `src/components/*`, `src/app/*/page.tsx` | Visible strings were split between data files and hardcoded component markup, making copy review and rewrites brittle. | Centralized visible copy into `src/lib/copy.ts`, rewired shell/modal/legal/homepage strings to read from that source, and created `COPY.md` as the owner-facing inventory. |
| `src/components/legal-page.tsx`, `src/app/terms-of-use/page.tsx`, `src/app/privacy-policy/page.tsx` | Legal page wrapper labels and route titles/intro text were hardcoded outside the shared copy source. | Moved those strings under the centralized copy structure and kept the legal routes aligned with the new inventory. |
| `eslint.config.mjs`, `README.md` | Audit artifacts polluted linting, and the repo did not document the new centralized copy source. | Ignored generated audit folders in ESLint and added README notes pointing to `src/lib/copy.ts`, `COPY.md`, and `AUDIT-REPORT.md`. |

### P2

| File | What was wrong | Status |
|---|---|---|
| `COPY.md`, repo scripts | The product-owner inventory exists, but edits in `COPY.md` do not yet round-trip back into the application automatically. | pending |
| Global imagery / partner section | The build still uses stand-in photography and vectorized/stylized partner marks rather than final licensed assets supplied by Summit. | pending |
| Lighthouse mobile performance | Mobile Lighthouse performance remains below target on the local dev server because the page still leans on remote imagery and motion-heavy sections. A production-only pass with optimized/local assets is still needed. | pending |

## Lighthouse before/after

These are local Lighthouse runs captured during the audit. The scores below are from the development server, so performance numbers are directionally useful but not a substitute for a production `next start` run.

### Mobile

| Metric | Before | After |
|---|---:|---:|
| Performance | 45 | 41 |
| Accessibility | 95 | 96 |
| Best Practices | 96 | 100 |
| LCP | 7.9 s | 8.5 s |
| Interactive | n/a | 9.8 s |
| CLS | 0 | 0 |

### Desktop

| Metric | Before | After |
|---|---:|---:|
| Performance | 85 | 88 |
| Accessibility | 95 | 96 |
| Best Practices | 96 | 100 |
| LCP | 1.6 s | 2.0 s |
| Interactive | n/a | 2.2 s |
| CLS | 0 | 0 |

## Screenshots

### Baseline (HEAD before fixes)

Mobile:

![Mobile Before](C:/Users/Administrator/Documents/Codex/2026-05-12/do-u-have-access-to-my/audit-artifacts/screenshots/mobile-before-full.png)

Tablet:

![Tablet Before](C:/Users/Administrator/Documents/Codex/2026-05-12/do-u-have-access-to-my/audit-artifacts/screenshots/tablet-before-full.png)

Desktop:

![Desktop Before](C:/Users/Administrator/Documents/Codex/2026-05-12/do-u-have-access-to-my/audit-artifacts/screenshots/desktop-before-full.png)

### After fixes

Mobile:

![Mobile After](C:/Users/Administrator/Documents/Codex/2026-05-12/do-u-have-access-to-my/audit-artifacts/screenshots/mobile-full.png)

Tablet:

![Tablet After](C:/Users/Administrator/Documents/Codex/2026-05-12/do-u-have-access-to-my/audit-artifacts/screenshots/tablet-full.png)

Desktop:

![Desktop After](C:/Users/Administrator/Documents/Codex/2026-05-12/do-u-have-access-to-my/audit-artifacts/screenshots/desktop-full.png)

Stepped viewport captures, reduced-motion screenshots, and runtime findings live under `audit-artifacts/screenshots/` and `audit-artifacts/runtime-audit.json`.

## Verification summary

- `npm run lint`
- `npm run build`
- `node audit-artifacts/capture.mjs`
- `node audit-artifacts/modal-check.mjs`
- `node audit-artifacts/cta-check.mjs`
- `GET /terms-of-use -> 200`
- `GET /privacy-policy -> 200`
- Reduced-motion recheck -> zero running page animations
- Normal mobile console recheck -> no warnings

## Open questions for the product owner

1. Are the current Unsplash/team photos and testimonial portraits placeholders, or do you have approved Summit-specific imagery that should replace them?
2. Are the partner/carrier marks in the diamond section supposed to stay as custom vector treatments, or should this switch to exact licensed logos from each carrier?
3. Do you want the Summit header icon to stay as the current abstract mark, or should it be revised so it reads less like a close glyph on small screens?
4. Is the current social/link destination set final, or should Summit-specific Instagram, TikTok, LinkedIn, and founder/video URLs replace the inherited NonStop URLs?
5. Should the next pass implement a true `COPY.md -> src/lib/copy.ts` sync script, or is a centralized code source plus inventory file enough for the editorial workflow?
