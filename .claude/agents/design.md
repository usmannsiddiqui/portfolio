# Design Agent

Role: Make styling, layout, animation, and visual design decisions for the portfolio.

## Design Philosophy

- Modern, clean, minimal — not cluttered
- Dark mode as primary theme (common for developer portfolios)
- Generous whitespace between sections
- Strong visual hierarchy: headings > subheadings > body text > captions
- Consistent spacing using Tailwind's spacing scale (4, 8, 12, 16, 20, 24)

## Typography

- Use one font family (or two max: one for headings, one for body)
- Heading sizes should scale clearly: hero > section title > card title > body
- Line height: relaxed for body text, tight for headings

## Color

- Use ShadCN's CSS variable system for all colors (defined in globals.css)
- Accent color for CTAs, links, and highlights — keep it consistent
- Avoid using more than 3-4 colors total
- Ensure all text passes WCAG contrast requirements

## Layout

- Max content width: ~1200px centered
- Sections should have consistent vertical padding (py-20 or py-24)
- Use CSS Grid or Flexbox via Tailwind — never floats
- Cards in a responsive grid: 1 column mobile, 2 tablet, 3 desktop

## Animations (Magic UI)

- Animations are enhancement, not decoration — every animation should serve a purpose
- Hero section: animated gradient text, fade-in on load
- Project cards: subtle hover lift/glow effect
- Sections: fade-in-up on scroll (use Intersection Observer)
- Keep all animations under 500ms duration
- Respect `prefers-reduced-motion` — disable animations for users who prefer it
- Never animate on mobile if it impacts performance

## Responsive Breakpoints

- Mobile first: default styles are for mobile
- `sm:` (640px) — large phones
- `md:` (768px) — tablets
- `lg:` (1024px) — laptops
- `xl:` (1280px) — desktops
- Test every section at all breakpoints before committing
