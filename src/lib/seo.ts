/**
 * SEO helpers — structured data (JSON-LD) built FROM the site's own data
 * (`clinic.ts` / `content.ts`). Because it derives from the facts, any edit to
 * the practice's name, address, phone, reviews, locations or posts updates the
 * structured data automatically — there's nothing separate to keep in sync.
 *
 * See SEO.md for the full playbook. Render objects with the `<JsonLd>`
 * component (components/json-ld.tsx).
 */

import { clinic, reviews, locations, fullAddress } from "./clinic";
import type { Location, Post } from "./schema";
import { content } from "./content";

const BASE = content.meta.baseUrl.replace(/\/$/, "");

/** Absolute URL from a site-relative path. */
export function abs(path: string): string {
  return `${BASE}${path.startsWith("/") ? path : `/${path}`}`;
}

function postalAddress(a: {
  streetAddress: string;
  locality: string;
  region: string;
  postcode: string;
}) {
  return {
    "@type": "PostalAddress",
    streetAddress: a.streetAddress,
    addressLocality: a.locality,
    addressRegion: a.region,
    postalCode: a.postcode,
    addressCountry: "GB",
  };
}

function locationNode(loc: Location, idx: number) {
  const node: Record<string, unknown> = {
    "@type": ["VeterinaryCare", "LocalBusiness"],
    "@id": abs(`/#location-${idx}`),
    name: locations.length > 1 ? `${clinic.name} — ${loc.name}` : clinic.name,
    url: BASE,
    image: abs(clinic.logo),
    address: postalAddress({
      streetAddress: loc.line1,
      locality: loc.area,
      region: loc.county,
      postcode: loc.postcode,
    }),
    telephone: loc.phone,
    parentOrganization: { "@id": abs("/#practice") },
  };
  if (typeof loc.lat === "number" && typeof loc.lng === "number") {
    node.geo = { "@type": "GeoCoordinates", latitude: loc.lat, longitude: loc.lng };
  }
  return node;
}

/**
 * VeterinaryCare + LocalBusiness graph for the homepage: the practice as an
 * Organization, each physical surgery as a LocalBusiness with geo, the brand's
 * review aggregate, and the area served.
 */
export function practiceJsonLd() {
  const practice: Record<string, unknown> = {
    "@type": ["VeterinaryCare", "Organization"],
    "@id": abs("/#practice"),
    name: clinic.name,
    legalName: clinic.legalName ?? clinic.name,
    url: BASE,
    logo: abs(clinic.logo),
    image: abs("/opengraph-image"),
    description: content.meta.description,
    telephone: clinic.phone.main,
    email: clinic.email,
    address: postalAddress({
      streetAddress: clinic.address.line1,
      locality: clinic.address.town,
      region: clinic.address.county,
      postcode: clinic.address.postcode,
    }),
    areaServed: clinic.county,
    priceRange: "££",
  };
  if (clinic.facebook) practice.sameAs = [clinic.facebook];
  if (reviews.count > 0) {
    practice.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: reviews.rating,
      reviewCount: reviews.count,
      bestRating: 5,
      worstRating: 1,
    };
  }
  return {
    "@context": "https://schema.org",
    "@graph": [practice, ...locations.map(locationNode)],
  };
}

/** WebSite node (enables the site name in results). */
export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": abs("/#website"),
    url: BASE,
    name: clinic.name,
    inLanguage: "en-GB",
    publisher: { "@id": abs("/#practice") },
  };
}

/** Article node for a blog post. */
export function articleJsonLd(post: Post) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    articleSection: post.category,
    inLanguage: "en-GB",
    mainEntityOfPage: abs(`/blog/${post.slug}`),
    author: { "@type": "Organization", name: clinic.name, url: BASE },
    publisher: { "@id": abs("/#practice") },
  };
}

/** BreadcrumbList from [{name, path}] pairs. */
export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  };
}

/** Convenience: full address string (re-exported for callers). */
export { fullAddress };
