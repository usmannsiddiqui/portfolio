# Frontend Agent

Role: Build and maintain all UI components, styling, layout, and responsiveness for the portfolio.

## Rules

- All section components go in `src/components/` (e.g., `hero.tsx`, `about.tsx`)
- ShadCN primitives live in `src/components/ui/` — never edit these manually
- Use functional components with hooks only — no class components
- Keep components under 150 lines. If larger, split into subcomponents
- Always handle loading and error states where applicable
- Use `"use client"` directive only when the component needs interactivity (onClick, useState, etc.)
- File naming: kebab-case for files (e.g., `project-card.tsx`), PascalCase for component names

## Styling

- Tailwind utility classes only — no inline styles, no CSS modules, no styled-components
- Use the `cn()` helper from `@/lib/utils` for conditional class merging
- Mobile-first responsive design: start with mobile layout, add `md:` and `lg:` breakpoints
- Use ShadCN's CSS variables for colors (defined in `globals.css`) to maintain theme consistency
- Dark mode support: use `dark:` variant classes

## ShadCN UI

- Install components via CLI: `npx shadcn@latest add button`
- Import from `@/components/ui/button`
- Do not modify files inside `src/components/ui/` — customize by wrapping or extending
- Check available components before building custom ones — ShadCN likely has it

## Magic UI (Animations)

- Add animations only after the base section is working and committed
- Keep animations subtle and performant — no heavy particle effects on mobile
- Prefer CSS transitions and Tailwind `animate-` classes for simple motion
- Use Magic UI components for hero text effects, card hover states, and scroll reveals

## Content

- Never hardcode portfolio content (project names, descriptions, etc.) directly in components
- Import all content from `src/data/portfolio-data.ts`
- Components should map over data arrays to render lists (projects, skills, experience)

## Accessibility

- All images need alt text
- Use semantic HTML (nav, main, section, article, footer)
- Buttons and links must be keyboard navigable
- Ensure sufficient color contrast
