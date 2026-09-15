<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes; APIs, conventions, and file structure may differ from older Next.js projects. Read the relevant guide in `node_modules/next/dist/docs/` before writing code when framework behavior matters.
<!-- END:nextjs-agent-rules -->

## Workspace context

Before editing this project, read the shared workspace documents in the parent folder:

- `../AGENTS.md`
- `../PROJECT_CONTEXT.md`
- `../USER_CONTEXT.md`
- `../WORKFLOW.md`
- `../INTERVIEW.md`

This project is the Clinic GEO medical/clinic-focused content hub operated under SUMMITFEED. Preserve Korean content, SEO metadata, JSON-LD, categories, article data, and medical marketing compliance context carefully.

## Planning skill reference scope

For Clinic GEO site planning, redesign, information architecture, or page-role work, use the `기획` skill only in cross-project reference mode. Reference exactly these shared areas:

- brand and site-purpose definition
- search intent and user-question structure
- sitemap and page roles
- entity connections
- evidence structures that are easy for AI systems to cite
- implementation priorities and completion conditions
- plan documentation and verification procedures

Do not import Make SITE-specific assumptions such as a non-monetization goal, recommendation/comparison-first architecture, regional Top 3 structure, review-based evaluation, candidate-shortage rules, or fixed output formats. Clinic GEO's source of truth is that it is a SUMMITFEED sub-brand and hospital-marketing company focused on hospital GEO; this project's documents and user decisions take precedence.

## Active parallel work split (2026-09-15, user-directed — check before editing)

Claude and Codex are working in this repo at the same time this week. Before starting work, check `git status`/`git diff` for changes outside your own lane below, and do not overwrite the other agent's in-progress files.

- **Claude (design lane):** Homepage/landing visual design and layout components — e.g. `components/GeoServiceCards.tsx`, other `components/*` visual sections, `app/page.tsx` section composition, category/hospital directory page layout (`app/hospitals`, `app/category/[slug]`). Claude does not edit SEO metadata plumbing, article/author content, or structured-data generators unless the user explicitly asks.
- **Codex (SEO + copy lane):** Homepage SEO and manuscript/content edits — e.g. `lib/seo.ts`, `app/sitemap.ts`, `app/api/og/*`, `app/authors/*`, `lib/authors.ts`, `components/ArticleRenderer.tsx`, `app/blog/[slug]/page.tsx` metadata/JSON-LD, and `content/articles/*` copy.
- If a change genuinely requires touching the other lane's files (e.g. a design change needs a new SEO-relevant field), say so explicitly to the user instead of editing silently, so the other agent's concurrent work isn't clobbered.
- This split is a temporary in-session coordination note, not a permanent architecture rule — update or remove it once this round of parallel work is done.

