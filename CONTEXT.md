# Portfolio Project — Context File

Use this file to onboard an AI assistant to this project. It covers who I am, what's built, what's planned, and open questions.

---

## Who I Am

**Muhammad Usman Siddiqui**
- Junior Computer Science major at Penn State University
- Tagline: AI Developer · Software Engineer · Technology Consultant

**Current Roles:**
- **AI Consultant** — Penn State IT Learning & Development. Run Microsoft Copilot consultations for faculty/staff, help them integrate AI into their workflows.
- **AI Guide** — Penn State AI Guides program (has its own website). Student-facing AI education and support role.
- **Software Developer Intern** — Penn State Libraries. Working with Ruby on Rails, ETDA integrations.
- **Consultant Trainee** — Nittany Lion Consulting Group. Student-run consulting org at Penn State.
- **Communications Organizer** — HackPSU. Penn State's flagship hackathon.

**Skills:**
- Languages: C, Python, JavaScript/TypeScript, Ruby, SQL
- Frameworks: React, Next.js, Ruby on Rails
- AI: LLMs, Microsoft Copilot Studio, AI agent development, prompt engineering
- Tools: Git, Docker, Linux, Claude Code, Power Automate

---

## What This Project Is

A personal developer portfolio — single-page website that showcases my experience, projects, and skills. The goal is a polished, professional site I can share with recruiters, collaborators, and anyone who wants to learn more about me.

No backend. All content is static. Contact is via `mailto:` link (opens user's mail client with my email pre-filled). Resume will be a hosted PDF in `/public/`.

---

## Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 15 (App Router, TypeScript) | Industry standard, good SSG, familiar |
| Styling | Tailwind CSS v4 | Utility-first, fast iteration |
| UI Primitives | ShadCN UI (Radix + Tailwind) | Accessible, unstyled base components |
| Animations | Magic UI | Layered on ShadCN, portfolio-friendly motion |
| Fonts | Geist Sans + Geist Mono (currently) | Next.js default, open to changing |
| Deployment | Netlify | Auto-deploys from GitHub, no static export needed |

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx        ← root layout, fonts, metadata, dark mode
│   ├── page.tsx          ← homepage (all sections rendered here)
│   └── globals.css       ← Tailwind + ShadCN CSS variables
├── components/
│   ├── ui/               ← ShadCN primitives (button, sheet installed)
│   ├── navbar.tsx        ← BUILT (sticky, responsive, mobile sheet drawer)
│   ├── hero.tsx          ← NOT BUILT YET
│   ├── about.tsx         ← NOT BUILT YET
│   ├── projects.tsx      ← NOT BUILT YET
│   ├── experience.tsx    ← NOT BUILT YET
│   ├── skills.tsx        ← NOT BUILT YET
│   ├── contact.tsx       ← NOT BUILT YET
│   └── footer.tsx        ← NOT BUILT YET
├── lib/
│   └── utils.ts          ← cn() helper
└── data/
    └── portfolio-data.ts ← NOT CREATED YET (will hold all content)
```

---

## Current State

**Built:**
- Navbar — sticky, responsive. Desktop: inline links. Mobile: hamburger → slide-out Sheet drawer. Uses ShadCN Sheet + Button. Dark mode by default.
- Root layout with dark mode (`className="dark"` on `<html>`), Geist fonts, metadata set.

**Not built yet:**
- Hero, About, Projects, Experience, Skills, Contact, Footer sections
- `src/data/portfolio-data.ts` (centralized content file)
- Resume PDF in `/public/`

---

## Planned Sections (in order)

1. **Navbar** ✅
2. **Hero** — Name, title/tagline, two CTAs (e.g. View Projects, Contact Me or Download Resume)
3. **About** — Short bio, education, current roles summary
4. **Projects** — Cards with title, description, tech stack tags, GitHub/live links
5. **Experience** — Timeline of roles (Penn State Libraries, AI Consultant, AI Guides, NLCG, HackPSU)
6. **Skills** — Categorized grid (Languages, Frameworks, AI, Tools)
7. **Contact** — Email (mailto link), LinkedIn, GitHub icons/links
8. **Footer** — Minimal. Name + year + maybe a quip.

---

## Key Links to Feature

- LinkedIn profile
- GitHub profile
- Penn State AI Guides website (my role there)
- Resume (PDF, hosted at `/public/resume.pdf`, viewable in browser)
- Penn State Libraries (employer)

---

## Design Direction

- Dark mode as primary (already set)
- Aiming for distinctive, not generic — avoid the standard purple gradient / Inter font / card grid look that every dev portfolio has
- Open to: editorial, minimal-brutalist, refined dark with sharp accents, typographic-led
- Animations come last (Magic UI added after all sections are built)
- Mobile-first, responsive throughout

---

## Deployment

- **Platform:** Netlify
- **Trigger:** Auto-deploys on every push to `main`
- **Config:** `netlify.toml` at root, `@netlify/plugin-nextjs` installed
- No `output: 'export'` — full Next.js support retained

---

## Open Questions / Things to Decide

- What projects do I feature? (need to list actual projects with descriptions)
- Final email address for mailto link
- LinkedIn + GitHub URLs
- AI Guides website URL
- Resume PDF — do I embed it on a `/resume` page or just link directly to the PDF?
- Font choice — stick with Geist or pick something more distinctive?
- Color palette / accent color
- Do I want a profile photo in the Hero or keep it text-only?
