/**
 * PLACEHOLDER REGISTRY — the named image locations across the site.
 *
 * Single source of truth for WHERE images can go. The dashboard mirrors this
 * list (dashboard/src/lib/placeholders.ts) to drive the image manager. Each
 * placeholder is OPTIONAL and presence-driven: if nothing is assigned, the
 * section renders without the image (its original text/icon layout).
 *
 * The editable resolved map lives in `image-assignments.ts` (rewritten by the
 * dashboard); `images.ts` resolves a placeholder key to its assigned image.
 */

export type ImageKind = "cutout" | "photo";

export type PlaceholderKey =
  | "home.hero"
  | "home.about"
  | "home.banner"
  | "cta.pet"
  | "hero.about"
  | "hero.services"
  | "hero.careclub"
  | "hero.contact"
  | "about.story"
  | "register.aside"
  | "book.aside"
  | "careclub.feature"
  | "blog.1"
  | "blog.2"
  | "blog.3"
  | "blog.4";

export type PlaceholderGroup =
  | "Homepage"
  | "About"
  | "Services"
  | "Care plan"
  | "Register"
  | "Book"
  | "Contact"
  | "Blog & articles"
  | "Site-wide";

export type Placeholder = {
  key: PlaceholderKey;
  group: PlaceholderGroup;
  /** Position-based label — names WHERE it appears. */
  label: string;
  /** Plain "where it appears on the site" description. */
  where: string;
};

/** Ordered as they appear, grouped by page. Drives the dashboard manager. */
export const PLACEHOLDERS: Placeholder[] = [
  { key: "home.hero", group: "Homepage", label: "Hero (top of homepage)", where: "The big image at the very top, beside the headline." },
  { key: "home.about", group: "Homepage", label: "About block (below the hero)", where: "Beside your story, the first section under the hero." },
  { key: "home.banner", group: "Homepage", label: "Banner (near the bottom)", where: "The wide strip of pets above the closing call-to-action." },
  { key: "hero.about", group: "About", label: "About page header", where: "Beside the title at the top of the About page." },
  { key: "about.story", group: "About", label: "About story feature", where: "A feature image within the About page's story." },
  { key: "hero.services", group: "Services", label: "Services page header", where: "Beside the title at the top of the Services page." },
  { key: "hero.careclub", group: "Care plan", label: "Care plan page header", where: "Beside the title at the top of the Prices & plans page." },
  { key: "careclub.feature", group: "Care plan", label: "Care plan feature", where: "A feature image in the 'why join' section." },
  { key: "register.aside", group: "Register", label: "Register page aside", where: "In the reassurance column beside the registration form." },
  { key: "book.aside", group: "Book", label: "Book page aside", where: "In the column beside the booking form." },
  { key: "hero.contact", group: "Contact", label: "Contact page header", where: "Beside the title at the top of the Contact page." },
  { key: "cta.pet", group: "Site-wide", label: "Closing call-to-action", where: "Beside the 'Register / Book' band that ends most pages." },
  { key: "blog.1", group: "Blog & articles", label: "Blog image 1", where: "Rotates across blog cards and article headers." },
  { key: "blog.2", group: "Blog & articles", label: "Blog image 2", where: "Rotates across blog cards and article headers." },
  { key: "blog.3", group: "Blog & articles", label: "Blog image 3", where: "Rotates across blog cards and article headers." },
  { key: "blog.4", group: "Blog & articles", label: "Blog image 4", where: "Rotates across blog cards and article headers." },
];

export const PLACEHOLDER_KEYS = PLACEHOLDERS.map((p) => p.key);

export const PLACEHOLDER_GROUPS: PlaceholderGroup[] = [
  "Homepage",
  "About",
  "Services",
  "Care plan",
  "Register",
  "Book",
  "Contact",
  "Site-wide",
  "Blog & articles",
];
