# Portfolio — Muhammad Usman Siddiqui

Personal developer portfolio built with Next.js, TypeScript, Tailwind CSS, ShadCN UI, and Magic UI. Showcases AI consulting, software development, and consulting experience at Penn State.

## Tech Stack

- **Framework:** Next.js (App Router, TypeScript)
- **Styling:** Tailwind CSS v4
- **UI Components:** ShadCN UI (Radix primitives + Tailwind)
- **Animations:** Magic UI (layered on top of ShadCN)
- **Deployment:** TBD (not Vercel)

## Project Structure

```
src/
├── app/
│   ├── layout.tsx        ← root layout, fonts, metadata
│   ├── page.tsx          ← homepage (all sections rendered here)
│   └── globals.css       ← Tailwind + ShadCN CSS variables
├── components/
│   ├── ui/               ← ShadCN UI primitives (button, card, etc.)
│   ├── navbar.tsx
│   ├── hero.tsx
│   ├── about.tsx
│   ├── projects.tsx
│   ├── experience.tsx
│   ├── skills.tsx
│   ├── contact.tsx
│   └── footer.tsx
├── lib/
│   └── utils.ts          ← cn() helper for Tailwind class merging
└── data/
    └── portfolio-data.ts ← centralized content (projects, experience, skills)
```

## Architecture

- This is a **single-page portfolio** — all sections live on the homepage.
- Section components are in `src/components/` and imported into `src/app/page.tsx`.
- ShadCN components are installed into `src/components/ui/` via `npx shadcn@latest add <component>`.
- All portfolio content (projects, experience entries, skills) is stored in `src/data/portfolio-data.ts` so components stay clean.
- No backend. Contact form can use a third-party email API if needed later.

## Conventions

- **Components:** Functional components with hooks only. PascalCase filenames.
- **Styling:** Tailwind utility classes only — no inline styles, no CSS modules.
- **Imports:** Use `@/` alias (e.g., `@/components/ui/button`).
- **State:** Minimal client state. Use `"use client"` directive only when needed (interactivity, hooks).
- **Commits:** Descriptive messages using conventional format — `feat(section): description`, `fix(navbar): description`, `style(hero): description`.

## Section Order

1. Navbar (sticky, responsive)
2. Hero (name, title, CTAs)
3. About (bio, education, roles)
4. Projects (cards with tech stack, links)
5. Experience (timeline)
6. Skills (categorized grid)
7. Contact (email, LinkedIn, GitHub)
8. Footer

## Portfolio Content — Muhammad Usman Siddiqui

**Tagline:** AI Developer · Software Engineer · Technology Consultant

**About:**
- Junior Computer Science major at Penn State University
- AI Consultant at Penn State IT Learning & Development (Microsoft Copilot consultations)
- Software Developer Intern at Penn State Libraries (Rails, ETDA integrations)
- Consultant Trainee at Nittany Lion Consulting Group
- HackPSU Communications Organizer

**Skills:**
- Languages: C, Python, JavaScript/TypeScript, Ruby, SQL
- Frameworks: React, Next.js, Ruby on Rails
- AI: LLMs, Microsoft Copilot Studio, AI agent development, prompt engineering
- Tools: Git, Docker, Linux, Claude Code, Power Automate

## Known Considerations

- ShadCN components must be installed individually (`npx shadcn@latest add button`, etc.)
- Magic UI is added after base sections are built — animations come last
- Keep bundle size small — this is a portfolio, not a web app
- Prioritize mobile responsiveness from the start
