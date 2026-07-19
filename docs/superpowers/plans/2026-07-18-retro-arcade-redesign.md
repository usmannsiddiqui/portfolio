# Retro-Arcade Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restyle the single-page portfolio into a "retro-arcade space" look — pixel display font at small sizes, huge edge-to-edge section titles, minimal centered hero, playful lowercase nav — while keeping the dark theme, star field, crawl, and all content.

**Architecture:** Design-system change first (font + CSS utilities in `layout.tsx`/`globals.css`), then a shared `SectionHeading` component, then per-section restyles that consume it. No routing, data, or dependency changes beyond one Google Font.

**Tech Stack:** Next.js 16 (App Router), Tailwind CSS v4 (`@theme inline`), `next/font/google`, ShadCN UI.

**Spec:** `docs/superpowers/specs/2026-07-18-retro-arcade-redesign-design.md`

## Global Constraints

- Work on the existing `retro-arcade-redesign` branch. Never commit to `main`.
- Package manager: `pnpm`. No new npm dependencies (the pixel font comes via `next/font/google`, already available).
- Pixel font (Press Start 2P) is capped at `text-3xl` ("say hello!" title); everything else `text-2xl` or below.
- Huge section titles use the existing sans (DM Sans) at `text-[clamp(...)]` up to ~8.5rem, `font-extrabold tracking-tight`, white on dark.
- Amber accent stays `--color-amber: oklch(0.78 0.13 72)` — no new colors.
- Content in `src/data/portfolio-data.ts` is not modified.
- `ParticleBackground`, `StarWarsCrawl` internals, `SpringCursor`, `ScrollProgress`, `BlurFade` are not modified.
- Commit messages: conventional format (`feat(scope): …`, `style(scope): …`). No Co-Authored-By lines.
- **Verification in lieu of unit tests:** this repo has no test runner and the change is purely presentational. Every task ends with `pnpm lint && pnpm build` (must exit 0) and, where noted, a visual check against the running dev server (`pnpm dev`, http://localhost:3000).

---

### Task 1: Foundation — pixel font + CSS utilities

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/globals.css`

**Interfaces:**
- Produces: CSS variable `--font-press-start`; Tailwind utility `font-pixel`; CSS classes `.bleed` (full-viewport-width breakout) and `.animate-blink` (cursor blink, disabled under reduced motion). All later tasks depend on these exact names.

- [ ] **Step 1: Add Press Start 2P to the root layout**

In `src/app/layout.tsx`, change the font import line and add the font definition. The import currently reads:

```tsx
import { DM_Sans, Orbitron } from "next/font/google";
```

Change to:

```tsx
import { DM_Sans, Orbitron, Press_Start_2P } from "next/font/google";
```

After the `orbitron` definition (line ~16), add:

```tsx
const pressStart = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-press-start",
});
```

Change the `<body>` className from:

```tsx
<body className={`${dmSans.variable} ${orbitron.variable} font-sans antialiased`}>
```

to:

```tsx
<body className={`${dmSans.variable} ${orbitron.variable} ${pressStart.variable} font-sans antialiased`}>
```

- [ ] **Step 2: Register the `font-pixel` utility in the Tailwind theme**

In `src/app/globals.css`, inside the `@theme inline { … }` block, directly under the existing font lines:

```css
  /* Single font family — DM Sans does everything */
  --font-sans: var(--font-dm-sans);
  --font-display: var(--font-dm-sans);
```

add:

```css
  /* Retro pixel display font — small sizes only (≤ text-3xl) */
  --font-pixel: var(--font-press-start);
```

(Tailwind v4 auto-generates the `font-pixel` utility from this theme key.)

- [ ] **Step 3: Add `.bleed` utility and clip horizontal overflow**

In `src/app/globals.css`, inside `@layer base`, change:

```css
  html {
    scroll-behavior: smooth;
  }
```

to:

```css
  html {
    scroll-behavior: smooth;
    /* .bleed elements span 100vw; clip the ~15px scrollbar overshoot */
    overflow-x: clip;
  }
```

Then after the `.surface` utility block (ends ~line 161), add:

```css
/* ─── RETRO ARCADE UTILITIES ─── */

/* Full-viewport-width breakout for huge section titles inside max-w-5xl */
.bleed {
  width: 100vw;
  margin-left: calc(50% - 50vw);
}

/* Terminal-style blinking block cursor */
@keyframes blink {
  0%, 49%  { opacity: 1; }
  50%, 100% { opacity: 0; }
}

.animate-blink {
  animation: blink 1.1s step-end infinite;
}
```

- [ ] **Step 4: Disable blink under reduced motion**

In the existing `@media (prefers-reduced-motion: reduce)` block at the bottom of `globals.css`, add `.animate-blink` to the selector list:

```css
@media (prefers-reduced-motion: reduce) {
  .animate-pulse-dot,
  .animate-fade-up,
  .animate-blink,
  .sw-intro-text,
  .sw-crawl-text {
    animation: none;
  }
}
```

- [ ] **Step 5: Verify**

Run: `pnpm lint && pnpm build`
Expected: both exit 0. The build output lists `/` as a static route with no font errors.

- [ ] **Step 6: Commit**

```bash
git add src/app/layout.tsx src/app/globals.css
git commit -m "feat(globals): add Press Start 2P pixel font, bleed and blink utilities"
```

---

### Task 2: Shared SectionHeading component

**Files:**
- Create: `src/components/ui/section-heading.tsx`

**Interfaces:**
- Consumes: `.bleed` class from Task 1.
- Produces: `SectionHeading({ children }: { children: React.ReactNode })` — named export. Renders the huge edge-to-edge `<h2>`. Tasks 4–7 import it as `import { SectionHeading } from "@/components/ui/section-heading";`

- [ ] **Step 1: Create the component**

Create `src/components/ui/section-heading.tsx`:

```tsx
export function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="bleed px-6 font-extrabold tracking-tight leading-[0.95] text-foreground text-[clamp(3.25rem,11vw,8.5rem)] select-none">
      {children}
    </h2>
  );
}
```

- [ ] **Step 2: Verify**

Run: `pnpm lint && pnpm build`
Expected: exit 0. (Component is unused so far — that's fine; it wires in next tasks.)

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/section-heading.tsx
git commit -m "feat(components): add SectionHeading with full-bleed display title"
```

---

### Task 3: Hero — centered, pixel greeting, blinking cursor

**Files:**
- Rewrite: `src/components/hero.tsx`

**Interfaces:**
- Consumes: `font-pixel`, `.animate-blink` (Task 1); `personal` from `@/data/portfolio-data` (fields: `name`, `headline`, `email`, `linkedin`, `github`, `resume`).
- Produces: default export `Hero`. The profile photo and CTA buttons are removed by design (spec §2 — CTAs collapse into icon links).

- [ ] **Step 1: Rewrite the component**

Replace the entire contents of `src/components/hero.tsx` with:

```tsx
import { Github, Linkedin, Mail, FileText } from "lucide-react";
import { personal } from "@/data/portfolio-data";

const LINKS = [
  { label: "GitHub", href: personal.github, icon: Github, external: true },
  { label: "LinkedIn", href: personal.linkedin, icon: Linkedin, external: true },
  { label: "Email", href: `mailto:${personal.email}`, icon: Mail, external: false },
  { label: "Resume", href: personal.resume, icon: FileText, external: true },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-[90vh] flex flex-col items-center justify-center gap-7 py-24 text-center"
    >
      {/* Pixel greeting */}
      <p className="font-pixel text-sm md:text-base text-foreground leading-relaxed">
        hey, <span className="text-amber">i am</span>
      </p>

      {/* Name + blinking cursor */}
      <h1 className="font-extrabold tracking-tight leading-[1.05] text-4xl md:text-6xl lg:text-7xl text-foreground">
        {personal.name}
        <span
          aria-hidden="true"
          className="animate-blink inline-block w-[0.5ch] h-[0.85em] ml-2 align-baseline translate-y-[0.12em] bg-amber"
        />
      </h1>

      {/* Headline */}
      <p className="text-sm md:text-base text-muted-foreground tracking-wide">
        {personal.headline}
      </p>

      {/* Icon links */}
      <div className="flex items-center gap-5 pt-2">
        {LINKS.map(({ label, href, icon: Icon, external }) => (
          <a
            key={label}
            href={href}
            aria-label={label}
            {...(external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className="text-muted-foreground hover:text-amber transition-colors duration-150 hover:scale-110"
          >
            <Icon className="w-5 h-5" />
          </a>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `pnpm lint && pnpm build`
Expected: exit 0. No unused-import warnings (the old `Image`/`Button` imports are gone with the rewrite).

- [ ] **Step 3: Visual check**

Run `pnpm dev`, open http://localhost:3000. Expected: centered hero over the star field — small pixel-font "hey, i am" (with "i am" in amber), name in huge bold sans with an amber block cursor blinking after it, headline below, one row of four icons. No photo, no buttons.

- [ ] **Step 4: Commit**

```bash
git add src/components/hero.tsx
git commit -m "feat(hero): centered retro hero with pixel greeting and blinking cursor"
```

---

### Task 4: Navbar — pixel logo, lowercase playful labels

**Files:**
- Modify: `src/components/navbar.tsx`

**Interfaces:**
- Consumes: `font-pixel` (Task 1).
- Produces: nav labels used verbatim elsewhere: `say hello!` links to `#contact` (Task 7 keeps `id="contact"`).

- [ ] **Step 1: Update NAV_LINKS**

In `src/components/navbar.tsx`, replace the `NAV_LINKS` constant with:

```tsx
const NAV_LINKS = [
  { label: "about", href: "#about" },
  { label: "experience", href: "#experience" },
  { label: "work", href: "#work" },
  { label: "skills", href: "#skills" },
  { label: "say hello!", href: "#contact" },
];
```

- [ ] **Step 2: Replace the logo with pixel initials**

Replace the logo anchor:

```tsx
        <a
          href="#"
          className="text-sm font-semibold tracking-tight text-foreground hover:text-foreground/70 transition-colors duration-150"
        >
          {personal.name}
        </a>
```

with:

```tsx
        <a
          href="#"
          aria-label={personal.name}
          className="font-pixel text-xs text-amber hover:text-foreground transition-colors duration-150"
        >
          MUS
        </a>
```

- [ ] **Step 3: Lowercase the resume links**

In both the desktop `<li className="ml-3">` resume link and the mobile sheet resume link, change the visible text `Resume` / `Resume ↗` to `resume` / `resume ↗` (attributes unchanged).

- [ ] **Step 4: Verify**

Run: `pnpm lint && pnpm build`
Expected: exit 0.

Visual check on `pnpm dev`: pixel-font amber "MUS" top-left; lowercase links; "say hello!" scrolls to the contact section; mobile sheet shows the same labels.

- [ ] **Step 5: Commit**

```bash
git add src/components/navbar.tsx
git commit -m "feat(navbar): pixel MUS logo and lowercase playful nav labels"
```

---

### Task 5: About — huge title layout

**Files:**
- Modify: `src/components/about.tsx`

**Interfaces:**
- Consumes: `SectionHeading` (Task 2).
- Produces: section keeps `id="about"`. This task establishes the section pattern Tasks 6–7 repeat: `SectionHeading` on top, content stacked below (the old `[180px_1fr]` sticky-label grid is removed).

- [ ] **Step 1: Restructure the section**

In `src/components/about.tsx`, add the import at the top:

```tsx
import { SectionHeading } from "@/components/ui/section-heading";
```

Replace the section's outer structure. The component becomes:

```tsx
import { about } from "@/data/portfolio-data";
import { SectionHeading } from "@/components/ui/section-heading";

const ROLES = [
  "AI Consultant",
  "Software Developer",
  "Technology Consultant",
];

export default function About() {
  return (
    <section id="about" className="py-24">
      <SectionHeading>About</SectionHeading>

      <div className="mt-12 max-w-2xl flex flex-col gap-6">
        {/* Role labels — plain, no color noise */}
        <div className="flex flex-wrap gap-2">
          {ROLES.map((role) => (
            <span
              key={role}
              className="text-xs font-medium text-muted-foreground border border-border px-3 py-1 rounded-full"
            >
              {role}
            </span>
          ))}
        </div>

        {/* Bio */}
        <div className="flex flex-col gap-4">
          {about.bio.map((paragraph, i) => (
            <p key={i} className="text-base text-muted-foreground leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Stat row */}
        <div className="flex flex-wrap gap-x-8 gap-y-3 pt-4 border-t border-border/50">
          {[
            { label: "University", value: "Penn State" },
            { label: "Major", value: "Computer Science" },
            { label: "Focus", value: "AI · Automation · Consulting" },
          ].map(({ label, value }) => (
            <div key={label} className="flex flex-col gap-0.5">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/40">
                {label}
              </span>
              <span className="text-sm font-medium text-foreground/80">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

(Changes: `border-t border-border/50` removed from the section — the huge titles now do the section-separation work; sticky side-label grid replaced by `SectionHeading` + stacked content.)

- [ ] **Step 2: Verify**

Run: `pnpm lint && pnpm build`
Expected: exit 0.

Visual check: massive "About" title spanning the full viewport width, content in a readable column below, no horizontal scrollbar at 375px/768px/1280px widths.

- [ ] **Step 3: Commit**

```bash
git add src/components/about.tsx
git commit -m "style(about): huge full-bleed section title, drop sticky-label grid"
```

---

### Task 6: Experience, Work, Skills — same title treatment

**Files:**
- Modify: `src/components/experience.tsx`
- Modify: `src/components/work.tsx`
- Modify: `src/components/skills.tsx`

**Interfaces:**
- Consumes: `SectionHeading` (Task 2).
- Produces: sections keep ids `experience`, `work`, `skills`. Inner content (timeline, cards, skill chips) unchanged.

- [ ] **Step 1: Experience**

In `src/components/experience.tsx`:

1. Add `import { SectionHeading } from "@/components/ui/section-heading";` after the existing import.
2. Change the section element from
   `<section id="experience" className="py-24 border-t border-border/50">` to
   `<section id="experience" className="py-24">`.
3. Replace the grid wrapper and sticky label. Delete:

```tsx
      <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-8 lg:gap-16">

        {/* Sticky label */}
        <div>
          <h2 className="text-xs font-medium tracking-[0.2em] uppercase text-amber md:sticky md:top-20">
            Experience
          </h2>
        </div>
```

   and insert instead:

```tsx
      <SectionHeading>Experience</SectionHeading>

      <div className="mt-12">
```

4. The timeline `<div className="relative flex flex-col gap-0">…</div>` stays exactly as-is inside that wrapper; the closing tags at the bottom of the component stay balanced (one `</div>` for the new wrapper, then `</section>`).

- [ ] **Step 2: Work**

Same transformation in `src/components/work.tsx`:

1. Add the `SectionHeading` import.
2. Section element → `<section id="work" className="py-24">`.
3. Delete the grid wrapper + sticky label block (the one containing `Selected Work`), insert:

```tsx
      <SectionHeading>Work</SectionHeading>

      <div className="mt-12">
```

4. The cards stack `<div className="flex flex-col gap-4">…` stays as-is inside; keep closing tags balanced.

- [ ] **Step 3: Skills**

Same transformation in `src/components/skills.tsx`:

1. Add the `SectionHeading` import.
2. Section element → `<section id="skills" className="py-24">`.
3. Delete the grid wrapper + sticky label block, insert:

```tsx
      <SectionHeading>Skills</SectionHeading>

      <div className="mt-12">
```

4. The categories `<div className="flex flex-col gap-6">…` stays as-is inside; keep closing tags balanced.

- [ ] **Step 4: Verify**

Run: `pnpm lint && pnpm build`
Expected: exit 0.

Visual check: "Experience", "Work", "Skills" render as huge full-bleed titles; timeline/cards/chips unchanged below each; no horizontal scrollbar.

- [ ] **Step 5: Commit**

```bash
git add src/components/experience.tsx src/components/work.tsx src/components/skills.tsx
git commit -m "style(sections): huge full-bleed titles for experience, work, skills"
```

---

### Task 7: Contact → "say hello!" + footer microcopy

**Files:**
- Modify: `src/components/contact.tsx`
- Modify: `src/components/footer.tsx`

**Interfaces:**
- Consumes: `font-pixel` (Task 1). Nav's `say hello!` link (Task 4) targets this section's unchanged `id="contact"`.

- [ ] **Step 1: Restyle the contact heading**

In `src/components/contact.tsx`:

1. Section element → `<section id="contact" className="py-24">`.
2. Delete the grid wrapper and the small amber `Contact` label block:

```tsx
      <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-8 lg:gap-16">
        <div>
          <h2 className="text-xs font-medium tracking-[0.2em] uppercase text-amber">
            Contact
          </h2>
        </div>
```

3. Replace the inner `<h3>Let's Connect</h3>` heading with the pixel title (this is the one moderate-size pixel heading allowed by the spec):

```tsx
            <h2 className="font-pixel text-2xl md:text-3xl text-foreground leading-relaxed">
              say hello!
            </h2>
```

4. The intro paragraph, email CTA, and social links stay unchanged inside `<div className="flex flex-col gap-6">`; keep closing tags balanced (remove the grid's extra `</div>`).

The final component structure:

```tsx
export default function Contact() {
  return (
    <section id="contact" className="py-24">
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="font-pixel text-2xl md:text-3xl text-foreground leading-relaxed">
            say hello!
          </h2>
          <p className="mt-4 text-muted-foreground text-sm leading-relaxed max-w-md">
            Whether you have an opportunity, a question, or just want to talk
            about AI and technology — I&apos;d love to hear from you.
          </p>
        </div>
        {/* Email CTA — unchanged */}
        {/* Social links — unchanged */}
      </div>
    </section>
  );
}
```

(The `{/* … unchanged */}` markers above are shorthand for THIS PLAN DOCUMENT only — keep the existing email CTA `<a>` block and social links `<div>` exactly as they are in the current file.)

- [ ] **Step 2: Loosen the footer**

In `src/components/footer.tsx`, replace the name span:

```tsx
        <span className="text-xs text-muted-foreground/40 tracking-wide">
          {personal.name}
        </span>
```

with:

```tsx
        <span className="font-pixel text-[10px] text-muted-foreground/40">
          usman
        </span>
```

Keep the Yoda quote and the © year exactly as they are.

- [ ] **Step 3: Verify**

Run: `pnpm lint && pnpm build`
Expected: exit 0.

Visual check: pixel-font "say hello!" heading; email CTA and social pills unchanged; footer shows tiny pixel "usman" left, Yoda quote center, year right. Check `personal` import is still used in `footer.tsx` — it is not after this change, so **remove the now-unused `import { personal } …` line** or lint fails.

- [ ] **Step 4: Commit**

```bash
git add src/components/contact.tsx src/components/footer.tsx
git commit -m "feat(contact): pixel say-hello heading and playful footer"
```

---

### Task 8: Full-page verification pass

**Files:**
- None expected (fix-forward if issues found).

- [ ] **Step 1: Production build**

Run: `pnpm lint && pnpm build`
Expected: exit 0, `/` static.

- [ ] **Step 2: Responsive visual pass**

With `pnpm dev` running, check at 375px, 768px, and 1280px widths:
- No horizontal scrollbar anywhere (`.bleed` + `overflow-x: clip` working).
- Section titles wrap acceptably at 375px (clamp floor 3.25rem).
- Nav sheet works on mobile; "say hello!" anchors to contact.
- Star field and Star Wars crawl unaffected.

- [ ] **Step 3: Reduced-motion pass**

Emulate `prefers-reduced-motion: reduce` (DevTools → Rendering). Expected: hero cursor stops blinking but remains visible; crawl and pulse dot already covered by the existing media query.

- [ ] **Step 4: Contrast spot-check**

Amber `oklch(0.78 0.13 72)` on background `oklch(0.07 0 0)` — verify the hero "i am" and nav logo read clearly; both are large-text/decorative uses well above AA thresholds (amber on near-black ≈ 9:1).

- [ ] **Step 5: Push and open PR**

```bash
git push -u origin retro-arcade-redesign
gh pr create --title "Retro-arcade redesign" --body "Restyles the portfolio into the retro-arcade space look per docs/superpowers/specs/2026-07-18-retro-arcade-redesign-design.md: pixel display font (small sizes), huge full-bleed section titles, minimal centered hero with blinking cursor, lowercase playful nav. Dark theme, star field, crawl, and all content unchanged."
```
