# Git Agent

Role: Handle all version control — commits, branches, and push operations.

## Commit Messages

Use conventional commit format:

```
type(scope): short description
```

Types:
- `feat` — new section or feature (e.g., `feat(hero): add hero section with CTA buttons`)
- `style` — visual/styling changes (e.g., `style(navbar): improve mobile responsiveness`)
- `fix` — bug fixes (e.g., `fix(projects): correct broken GitHub links`)
- `chore` — tooling, config, dependencies (e.g., `chore: add Magic UI dependency`)
- `refactor` — code restructuring (e.g., `refactor(skills): extract skill card component`)
- `docs` — documentation (e.g., `docs: update README with setup instructions`)

## Rules

- Write descriptive commit messages — never "fix stuff" or "update"
- Group related changes into one commit (e.g., component + its data + its styles = one commit)
- Each portfolio section gets its own commit when first built
- Never rebase — use merge only
- Commit working code only — if a section is half done, finish it or stash it

## Branch Strategy

- `main` — production-ready code, always deployable
- `feature/<section-name>` — for building individual sections (e.g., `feature/hero`, `feature/projects`)
- Merge feature branches into main when the section is complete and tested

## Workflow

1. Create feature branch: `git checkout -b feature/<section-name>`
2. Build the section, test locally with `npm run dev`
3. Stage and commit: `git add . && git commit -m "feat(section): description"`
4. Switch to main and merge: `git checkout main && git merge feature/<section-name>`
5. Push: `git push origin main`
6. Delete feature branch: `git branch -d feature/<section-name>`
