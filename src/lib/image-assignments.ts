/**
 * IMAGE ASSIGNMENTS — which image fills each placeholder on THIS site.
 *
 * This is the editable surface the dashboard's image manager rewrites. Each
 * entry is fully resolved ({ src, alt, kind }) so the file is self-contained
 * and trivial to regenerate. Metadata helpers live in `images.ts`; the list of
 * placeholders lives in `placeholders.ts`.
 *
 * Defaults below point at the bundled cut-out library in public/images/pets/.
 * A placeholder with no entry simply renders nothing (presence-driven).
 */

import type { PlaceholderKey, ImageKind } from "./placeholders";

export type Assignment = { src: string; alt: string; kind: ImageKind };

export const imageAssignments: Partial<Record<PlaceholderKey, Assignment>> = {
  "home.hero": { src: "/images/pets/hero.png", alt: "A happy spaniel bounding towards you with its ears flying", kind: "cutout" },
  "home.about": { src: "/images/pets/mission.png", alt: "A vet resting her forehead gently against a golden retriever", kind: "cutout" },
  "home.banner": { src: "/images/pets/banner.png", alt: "A row of kittens and puppies peeking over a ledge", kind: "cutout" },
  "cta.pet": { src: "/images/pets/gallery-2.png", alt: "A fluffy apricot labradoodle offering a paw", kind: "cutout" },
  "hero.about": { src: "/images/pets/mission.png", alt: "A vet resting her forehead gently against a golden retriever", kind: "cutout" },
  "about.story": { src: "/images/pets/banner.png", alt: "A row of kittens and puppies peeking over a ledge", kind: "cutout" },
  "hero.services": { src: "/images/pets/gallery-1.png", alt: "An alert tricolour collie tilting its head", kind: "cutout" },
  "hero.careclub": { src: "/images/pets/gallery-4.png", alt: "Two kittens and a puppy peeking over a ledge", kind: "cutout" },
  "careclub.feature": { src: "/images/pets/gallery-2.png", alt: "A fluffy apricot labradoodle offering a paw", kind: "cutout" },
  "register.aside": { src: "/images/pets/gallery-4.png", alt: "Two kittens and a puppy peeking over a ledge", kind: "cutout" },
  "book.aside": { src: "/images/pets/gallery-1.png", alt: "An alert tricolour collie tilting its head", kind: "cutout" },
  "hero.contact": { src: "/images/pets/gallery-3.png", alt: "A beagle peeking up with big, hopeful eyes", kind: "cutout" },
  "blog.1": { src: "/images/pets/gallery-1.png", alt: "An alert tricolour collie tilting its head", kind: "cutout" },
  "blog.2": { src: "/images/pets/gallery-2.png", alt: "A fluffy apricot labradoodle offering a paw", kind: "cutout" },
  "blog.3": { src: "/images/pets/gallery-3.png", alt: "A beagle peeking up with big, hopeful eyes", kind: "cutout" },
  "blog.4": { src: "/images/pets/gallery-4.png", alt: "Two kittens and a puppy peeking over a ledge", kind: "cutout" },
};
