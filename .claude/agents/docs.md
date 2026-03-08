# Docs Agent

Role: Write and maintain documentation — README, inline comments, and code docs.

## Rules

- Keep comments focused on WHY, not WHAT — the code should explain what it does
- Update README.md whenever setup steps or dependencies change
- Document any non-obvious design decisions in comments
- Every data type/interface in `src/data/portfolio-data.ts` should have JSDoc comments

## README.md Should Include

- Project title and one-line description
- Tech stack list
- Setup instructions (clone, install, run)
- Project structure overview
- Deployment instructions (when ready)
- Screenshot of the live site (when ready)

## Inline Comments

- Add comments above complex Tailwind class strings explaining the layout intent
- Comment any workarounds or browser-specific fixes
- Comment Magic UI animation configurations explaining what they do
- Never leave TODO comments without a plan — either fix it now or create an issue
