# UI/UX Pro Max — Pre-Delivery Checklist

This project is held to the [ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill)
design checklist. The skill ranks rules into 10 priority categories; the table
below records how Summit complies and where each rule is enforced in code.

| # | Category (priority) | Rule | Status | Where |
|---|---|---|---|---|
| 1 | Accessibility (CRITICAL) | Text contrast ≥ 4.5:1 | ✅ | Neon `--accent` only on dark surfaces (~8.6:1). `--accent-on-light` (#0a4f9e, ~6.8:1) used for eyebrows/links/graphics on cream sections + modal. `tokens.css`, `globals.css` |
| 1 | Accessibility (CRITICAL) | Visible focus states for keyboard nav | ✅ | Global `:focus-visible` outline on `a/button/input/textarea`. `globals.css` |
| 1 | Accessibility (CRITICAL) | Alt text on meaningful images; `alt=""` on decorative | ✅ | `next/image` everywhere; decorative collage/marks use `alt=""` |
| 1 | Accessibility (CRITICAL) | ARIA on dialog + carousel | ✅ | Modal `role="dialog" aria-modal aria-labelledby`; carousels `aria-roledescription`. `lead-modal.tsx`, `testimonial-carousel.tsx` |
| 2 | Touch & Interaction (CRITICAL) | Tap targets ≥ 44×44px | ✅ | Buttons `min-height:52px`; carousel nav 52px; social 48px; standalone link CTAs + footer links `min-height:44px` |
| 2 | Touch & Interaction (CRITICAL) | `cursor-pointer` on clickable | ✅ | Shared button rule + link CTAs |
| 2 | Touch & Interaction (CRITICAL) | Loading feedback on submit | ✅ | Modal submit shows `SENDING…` + disabled state. `lead-modal.tsx` |
| 3 | Performance (HIGH) | Optimized images, lazy loading, CLS < 0.1 | ✅ | `next/image` with `sizes`; `priority` only above the fold; fixed aspect-ratios prevent shift |
| 4 | Style Selection (HIGH) | SVG icons only — **no emoji as icons** | ✅ | All glyphs are Lucide SVG (`ArrowUpRight`, `Play`, `ChevronLeft/Right`, etc.). No emoji icons remain |
| 4 | Style Selection (HIGH) | Visual consistency / brand compliance | ✅ | Single accent system + tokens; Summit mark used across header/footer/placeholders |
| 5 | Layout & Responsive (HIGH) | Mobile-first, no horizontal scroll, breakpoints | ✅ | `overflow-x: clip`; breakpoints at 750/768/900/1100px; viewport meta in `layout.tsx` |
| 6 | Typography & Color (MEDIUM) | 1.5–1.75 line-height, semantic tokens | ✅ | Body line-heights ~1.7; all color via CSS custom properties in `tokens.css` |
| 7 | Animation (MEDIUM) | 150–300ms interactions, respect reduced-motion | ✅ | Hover/UI transitions 180–220ms; every scroll animation gated by `useReducedMotion`; CSS `prefers-reduced-motion` block |
| 8 | Forms & Feedback (MEDIUM) | Visible labels, inline errors, confirmation | ✅ | Modal labels visible; `aria-invalid`/`aria-describedby`/`aria-live`; success + error states |
| 9 | Navigation (HIGH) | Predictable, ≤5 primary items | ✅ | Single sticky header + skip link + landmark regions |
| 10 | Charts & Data (LOW) | Accessible chart colors | ✅ | Production/writers lines use `--card-ink` + `--accent-on-light` on cream (≥3:1) |

## Notes

- The neon-blue rebrand (`--accent: #21b6ff`) is intentionally **dark-surface
  only**. Any accent used as text or a meaningful graphic on a light/cream
  surface must use `--accent-on-light`. Adding a new light-surface accent use?
  Use that token, not `--accent`.
- Responsive verification breakpoints: 375 / 768 / 1024 / 1440px.
