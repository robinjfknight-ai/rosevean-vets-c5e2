/**
 * IMAGE RESOLVER — resolves a placeholder key to its assigned image.
 *
 * Images are either transparent cut-outs (float on a brand panel) or full-bleed
 * photos (object-cover); the `kind` on each assignment tells `SiteImage` which
 * treatment to use. Assignments live in `image-assignments.ts` (editable by the
 * dashboard); the placeholder list lives in `placeholders.ts`. Files are bundled
 * in public/images/pets/ (+ public/images/placeholders/ for per-site uploads),
 * so every site is self-contained.
 */

import { imageAssignments, type Assignment } from "./image-assignments";
import type { PlaceholderKey } from "./placeholders";

export type { Assignment };
export type { ImageKind } from "./placeholders";

/** The image assigned to a placeholder, or null if none (render nothing). */
export function placeholderImage(key: PlaceholderKey): Assignment | null {
  return imageAssignments[key] ?? null;
}

const BLOG_KEYS: PlaceholderKey[] = ["blog.1", "blog.2", "blog.3", "blog.4"];

/**
 * Deterministically pick a blog image for a seed (e.g. a post slug), so the same
 * post always shows the same image. Skips empty slots; returns null if none set.
 */
export function blogImage(seed: string): Assignment | null {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  for (let i = 0; i < BLOG_KEYS.length; i++) {
    const a = imageAssignments[BLOG_KEYS[(hash + i) % BLOG_KEYS.length]];
    if (a) return a;
  }
  return null;
}

/** Back-compat convenience for the hero path. */
export const heroImage =
  imageAssignments["home.hero"]?.src ?? "/images/pets/hero.png";
