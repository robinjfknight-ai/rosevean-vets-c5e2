@AGENTS.md

# Working in this site

This is a generated marketing website for a UK veterinary practice, built from a
shared best-practice template. When editing it (e.g. via the dashboard chat),
follow these conventions so changes stay consistent and on-brand.

## Stack

- Next.js 16 (App Router, Turbopack) · React 19 · Tailwind CSS v4 · TypeScript.
- **This is Next.js 16** — APIs/conventions differ from older versions (see
  AGENTS.md). Don't guess; check `node_modules/next/dist/docs/` if unsure.

## Where things live

- `src/lib/clinic.ts` — FACTS: name, locations, phones, hours, services, prices,
  reviews, and the `nav` array. Pure typed data.
- `src/lib/content.ts` — COPY: every headline/paragraph, typed by `schema.ts`.
- `src/lib/schema.ts` — types + helpers (don't change shapes lightly).
- `src/lib/placeholders.ts` — the named image **placeholders** (`home.hero`,
  `hero.about`, `register.aside`, `cta.pet`, `blog.1–4`, …). `images.ts` resolves
  a placeholder to its assigned image via `placeholderImage(key)` / `blogImage()`;
  `src/lib/image-assignments.ts` is the editable map the dashboard rewrites.
  Render with `<SiteImage image={…}>` (cut-out-on-panel or full-bleed photo by
  `kind`). Placeholders are presence-driven — render only when assigned.
- `src/components/` — `ui.tsx` (Container, Section, Eyebrow, ButtonLink,
  StarRating, PageHero), `sections.tsx`, `icons.tsx`, header/footer, forms.
- `src/app/<route>/page.tsx` — pages. Add new routes here.

## Design system — match it exactly

- Colours are **Tailwind tokens, never raw hex**: primary scale
  `forest-50…900`, accent `coral-400/500/600`, plus `cream`, `paper`, `ink`,
  `muted`, `gold` (defined in `src/app/globals.css` `@theme`). Use the tokens so
  the practice's brand colour applies automatically.
- Type: `font-display` (Fraunces) for headings, `font-sans` (Inter) for body.
- Imagery: render placeholders with `<SiteImage image={placeholderImage(key)}>`.
  Cut-outs (`kind:"cutout"`) sit `object-contain` on a brand `tone` panel
  (`brand` hero, `soft` cards, `cream`/`paper`/`none` elsewhere); photos
  (`kind:"photo"`) fill `object-cover`. Always guard `{img && <SiteImage…/>}`.
  `alt` travels with the image. Don't pass off stock pets as the real team —
  team/premises must be real. To add a new spot: add a key to `placeholders.ts`
  (+ the dashboard mirror) and render it presence-driven.
- Cards: `rounded-3xl bg-paper shadow-sm ring-1 ring-forest-100`. Reuse this and
  the existing section patterns rather than inventing new styles.
- Standard section header: `<Eyebrow>` + display heading + intro (see the
  existing pages / `PageHero`).
- Wrap page content in `<Container>`. Section padding uses one scale —
  marketing `py-20 sm:py-28`, forms/articles `py-16 sm:py-20`. Match neighbours.

## Content vs structure

- Wording, prices, hours, services, team → edit the DATA in `clinic.ts` /
  `content.ts`.
- New pages or sections → add under `src/app` / `src/components` matching the
  existing files, and wire new pages into the `nav` array in `clinic.ts`.
- Optional sections are presence-driven — empty arrays / `null` hide cleanly
  (see `CONTRACT.md`).

## SEO — keep it intact (see ../SEO.md)

- SEO is **data-driven**: titles, JSON-LD (`lib/seo.ts`), `sitemap.ts` and the
  OG image all derive from `clinic.ts` / `content.ts`. Editing facts/copy
  updates SEO automatically — just keep the data accurate.
- **New page/route** → add unique `metadata` (title + description),
  `alternates.canonical`, a `sitemap.ts` entry, and JSON-LD if it's a real
  entity. **New blog post** → automatic (derives from `posts`).
- Never ship a missing/duplicate title, a missing canonical, or structured data
  describing something not on the page.

## Before finishing any change

- Run `npm run build` and make sure it passes (fix type/lint errors).
- Keep British English and the calm, trustworthy tone.
