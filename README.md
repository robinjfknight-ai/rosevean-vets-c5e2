# Vet site template

The reusable, content-stripped base that the dashboard generator clones to
build a bespoke website for any veterinary practice. The design and conversion
structure (from `bestprinciples.md`) are fixed; per-practice variation comes
entirely from data, copy and theme.

**Read [`CONTRACT.md`](./CONTRACT.md)** — it defines exactly what the generator
fills in:

1. **Facts** → `src/lib/clinic.ts` (scraped)
2. **Copy** → `src/lib/content.ts` (LLM-written)
3. **Theme** → `src/app/globals.css` `@theme` colours
4. **Assets** → `public/logo.svg`, `public/hero.svg`

The placeholder data describes a fictional practice ("Oakfield Veterinary
Practice") so the template builds and previews on its own.

> ⚠️ This is Next.js 16 (App Router, Turbopack). See `AGENTS.md` — APIs differ
> from older Next.js; check `node_modules/next/dist/docs/` before changing code.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # must pass before a generated site ships
```
