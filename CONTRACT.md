# Template contract

This is the **gold-standard veterinary site template** — a Next.js 16 app whose
design, layout and conversion structure (from `bestprinciples.md`) never change.
To produce a site for a specific practice, a generator fills in **three layers**
and swaps **two image files**. Nothing else is edited.

```
┌─ DESIGN (never changes) ─ components + Tailwind classes + page structure
│
├─ 1. FACTS   → src/lib/clinic.ts     (scraped from the target vet)
├─ 2. COPY    → src/lib/content.ts    (LLM-written in the practice's voice)
├─ 3. THEME   → src/app/globals.css   (@theme colour values only)
│
└─ ASSETS     → public/logo.svg, public/hero.svg
```

The generator's whole job per practice = produce a new `clinic.ts`, a new
`content.ts`, a recoloured `@theme` block, and two images. Then `next build`.

---

## 1. FACTS — `src/lib/clinic.ts`

Structured, verifiable data. Every value here should be **sourced from the vet's
real site** (or left at a safe default and flagged for human review).

### Exports

| Export | Type | Notes |
|---|---|---|
| `locations` | `Location[]` | One per surgery. Drives header phone list, footer, contact + home maps. 1..n supported. |
| `clinic` | object | Identity + contact. See fields below. |
| `reviews` | object | `rating`, `count`, `source`, `reviewedBy`, `testimonials[]`. **`count` = 0 hides the review aggregate, testimonials & review cards.** |
| `accreditations` | `Accreditation[]` | Trust-row chips (`label` + `detail`). |
| `services` | `Service[]` | `slug`, `title`, `blurb`, `icon`, `popular?`. `icon` MUST be a key in the icon registry (see below). |
| `planName` | `string \| null` | Health-plan name. **`null` hides the plan everywhere.** |
| `carePlans` | `Plan[]` | Membership tiers. Empty also hides the plan. |
| `priceUpdated` | `string` | Label next to the price list. |
| `priceList` | `PriceGroup[]` | **Empty hides the price table.** |
| `posts` | `Post[]` | Blog. Each has a `body: string[]`. **Empty hides the advice/blog section + nav item.** |
| `nav` | array | Primary nav. Prune items whose section is absent. |
| `fullAddress`, `mapEmbed`, `mapLink` | helpers | Do not change. |

### `clinic` fields

| Field | Purpose |
|---|---|
| `name` | Full legal/marketing name. Used in `<title>`, alt text, consent copy. |
| `shortName` | Header/footer wordmark, success messages. |
| `logoSubtext` | Small caps line under the wordmark (e.g. "Veterinary Practice"). |
| `logo` | Path in `/public` (default `/logo.svg`). |
| `heroImage` | Path in `/public` (default `/hero.svg`). |
| `tagline` | One-line descriptor (OG fallback). |
| `county` | Region, used in copy. |
| `legalName` | Footer copyright entity. |
| `phone.main` / `phone.mainHref` | Primary number (header, hero, forms). |
| `emergency` | `{ phone, phoneHref } \| null`. **`null` hides all 24hr strips/badges.** |
| `email` | Footer + contact mailto. |
| `facebook` | URL `\| null`. **`null` hides all Facebook links.** |
| `facebookStats` | `{ recommend, reviews }` shown beside the FB link. |
| `address`, `hours` | Convenience views of `locations[0]`. |

### Icon registry (valid `service.icon` values)

`paw`, `heart`, `stethoscope`, `shield`, `scalpel`, `tooth`, `microscope`, `cat`.
Unknown keys fall back to `paw`. To add an icon, extend `src/components/icons.tsx`.

---

## 2. COPY — `src/lib/content.ts`

Every headline, paragraph, eyebrow, CTA lead-in and success message. All values
are **final strings** (no logic, no JSX) and should be written **in the
practice's voice**, naming its towns / "two surgeries" / services correctly.

Shape is the exported `SiteContent` type. Top-level keys:

- `meta` — `baseUrl`, `defaultTitle`, `titleTemplate`, `description`, `ogDescription`
- `header` — `utilityNote`
- `footer` — `blurb`, `emergencyNote`, `bottomTagline`, `finePrint` (`""` to hide)
- `home` — `hero` (`badge`, `headlineLines[]`, `body`), `mission` (`eyebrow`, `heading`, `paragraphs[]`, `stats[]`, `ctaLabel`), `careClub`, `location`, `advice`
- `reviews` — `eyebrow`
- `services` — `gridHeading`, `gridBody`
- `finalCta` — `heading`, `body`
- `about` — `hero`, `narrative`, `values[]`, `team` (`members[]` with `icon` of `stethoscope|heart|paw`)
- `servicesPage` — `hero`, `processHeading`, `journey[]`
- `careClub` — `hero`, price + plan + why blocks, `benefits[]`
- `contact` — `hero`, `emergencyBody`
- `register` — `eyebrow`, `title`, `body`, `reassurance[]`, `successBody`
- `book` — `eyebrow`, `title`, `body`, `urgentNote` (lead-in before the emergency number)

**Universal UI labels stay in components**, not here — e.g. "Register my pet",
"Book an appointment", "Get directions", "Read more". They never vary by practice.

> Keep COPY consistent with FACTS. If `clinic.emergency` is null, the copy
> should not promise a 24-hour service; if there is one location, don't say
> "two surgeries". The generator is responsible for keeping the two in sync.

---

## 3. THEME — `src/app/globals.css` (`@theme` block)

Re-skin by overwriting **only the colour values**. **Token names never change**
— components reference them everywhere:

- `forest-50 … forest-900` — primary scale (read as "primary", legacy name).
  Map a colour sampled from the logo to ~`forest-700/800`, then build a 50→900
  ramp (light tints → dark shades).
- `coral-400/500/600` — accent, reserved for primary CTAs. Keep it
  contrasting with the primary so CTAs retain hierarchy.
- `cream`, `paper`, `ink`, `muted`, `gold` — surfaces, text, star colour.

Fonts (`--font-sans` Inter, `--font-display` Fraunces) and the craft rules
(optical sizing, `text-wrap`, kerning) are part of the design — leave them.

---

## Assets — `public/`

| File | Default | Replace with |
|---|---|---|
| `logo.svg` | Neutral paw mark | The practice's logo (any web format; update `clinic.logo` if the extension differs). |
| `hero.svg` | Illustrated placeholder | A hero image/illustration (update `clinic.heroImage` if renamed). |

---

## Validate

```bash
npm install      # first time only
npm run build    # MUST pass — TypeScript + static generation of all routes
```

A generated site is only shippable once `next build` succeeds. The 14 routes are:
`/`, `/about`, `/services`, `/care-club`, `/contact`, `/register`, `/book`,
`/blog`, `/blog/[slug]` (one per post).
