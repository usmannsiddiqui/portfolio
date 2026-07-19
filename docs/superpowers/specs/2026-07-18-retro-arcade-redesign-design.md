# Retro-Arcade Redesign — Design Spec

**Date:** 2026-07-18
**Status:** Approved pending user review
**Reference:** https://yashtatineni.framer.website/ (style inspiration only — no content, name, or assets copied)

## Goal

Restyle the existing single-page portfolio into a "retro-arcade space" look: keep the
dark space theme (particle star field, Star Wars crawl) and blend in the reference
site's design language — pixel-art display font, huge edge-to-edge section titles,
generous whitespace, playful copy.

## Decisions made

- **Direction:** blend — dark base stays; reference supplies typography, scale, and tone.
- **Structure:** single page, existing section order unchanged.
- **Palette:** existing dark neutrals + existing amber accent `oklch(0.769 0.188 70.08)`.
  No new colors.
- **Adopted elements:** pixel display font, huge section titles, playful microcopy/nav.
- **Rejected elements:** photo grid (no photos), multi-page structure, light palette.
- **Execution:** one cohesive restyle pass on a single branch (design-system change,
  looks wrong done piecemeal).

## 1. Typography system

- Add **Press Start 2P** via `next/font/google` in `layout.tsx`, exposed as a CSS
  variable (e.g. `--font-pixel`) and a Tailwind utility (`font-pixel`).
- Existing body font stays for all readable text.
- **Pixel font usage (small sizes only):** hero greeting, section eyebrow/accent labels,
  nav logo, "Say hello!" heading. Cap at `text-3xl` ("Say hello!" title); everything
  else `text-2xl` or below — pixel fonts degrade at display sizes.
- **Huge section titles:** existing sans at `text-7xl`–`text-9xl`, `font-extrabold`,
  `tracking-tight`, white on dark, allowed to break out of the `max-w-5xl` container
  (full-bleed feel like the reference's "Playground" title).

## 2. Hero (`src/components/hero.tsx`)

- Centered, minimal, full-viewport-ish height.
- Line 1: pixel font, lowercase "hey, i am" — "i am" in amber.
- Line 2: name, large.
- Line 3: single row of small icon links (GitHub, LinkedIn, email). Existing CTA
  buttons collapse into these icons. Resume link stays (icon or small text link).
- Blinking pixel block cursor after the name (CSS animation, respects
  `prefers-reduced-motion`).
- Star field provides the backdrop; no other decoration.

## 3. Section title treatment (all sections)

- Each section (About, Experience, Work, Skills, Contact) opens with the massive
  edge-to-edge title.
- Body content remains inside the `max-w-5xl` readable column.
- Vertical rhythm: `py-24`+ between sections.
- Contact section retitled **"Say hello!"** — pixel font at `text-3xl` (the one
  moderate-size pixel title, mirroring the reference).

## 4. Playful touches

- Nav labels lowercase and casual: `home · about · work · skills · say hello!`.
- Microcopy loosened across sections (drafted during implementation, user can veto
  per-line).
- Star Wars crawl stays as-is — it already fits the arcade theme and serves as the
  primary easter egg.

## 5. Out of scope / unchanged

- Section order, content in `src/data/portfolio-data.ts`.
- Particle background, Star Wars crawl internals.
- ShadCN/Tailwind stack; no new dependencies beyond the one Google Font.
- No new pages or routes. No photo grid. No contact form backend.
- Mobile responsiveness approach unchanged (titles scale down responsively:
  `text-5xl` mobile → `text-9xl` desktop).

## Files expected to change

- `src/app/layout.tsx` — add pixel font.
- `src/app/globals.css` — font variable, cursor-blink keyframes, any shared title utility.
- `src/app/page.tsx` — section title breakout layout if handled at page level.
- `src/components/navbar.tsx`, `hero.tsx`, `about.tsx`, `experience.tsx`, `work.tsx`,
  `skills.tsx`, `contact.tsx`, `footer.tsx` — restyle.

## Testing / verification

- Visual pass in browser at mobile (375px), tablet (768px), desktop (1280px+).
- `prefers-reduced-motion` disables cursor blink.
- Lighthouse/bundle sanity: one added font subset, no other weight growth.
- Text contrast: amber-on-dark and white-on-dark meet WCAG AA.
