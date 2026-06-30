/**
 * SCHEMA — the static type definitions for a generated vet site.
 *
 * This file never changes per practice. The generator regenerates the DATA
 * files (clinic.ts = facts, content.ts = copy) as plain typed values that
 * conform to the types below. Keeping types here (separate from data) means
 * the generated data files are pure JSON-serialisable values — trivial and
 * safe to emit. See CONTRACT.md.
 */

/* ------------------------------- FACTS ------------------------------- */

export type Hours = { day: string; time: string };

export type Location = {
  name: string;
  line1: string;
  area: string;
  county: string;
  postcode: string;
  phone: string;
  phoneHref: string;
  lat: number;
  lng: number;
  hours: Hours[];
};

export type Emergency = {
  label?: string;
  phone: string;
  phoneHref: string;
};

export type Clinic = {
  name: string;
  shortName: string;
  logoSubtext?: string;
  logo: string;
  heroImage: string;
  tagline: string;
  county: string;
  legalName: string;
  phone: { main: string; mainHref: string };
  /** null → no emergency strips / 24hr badges anywhere. */
  emergency: Emergency | null;
  email: string | null;
  /** null → no Facebook links anywhere. */
  facebook: string | null;
  facebookStats: { recommend: number; reviews: number };
  address: { line1: string; town: string; county: string; postcode: string };
  hours: Hours[];
};

export type Testimonial = { quote: string; author: string; pet: string };

export type Reviews = {
  rating: number;
  count: number;
  source: string;
  reviewedBy: string;
  testimonials: Testimonial[];
};

export type Accreditation = { label: string; detail: string };

export type ServiceSection = {
  heading?: string;
  paragraphs: string[];
  bullets?: string[];
};

export type Service = {
  slug: string;
  title: string;
  blurb: string;
  /** Key into the icon registry in components/icons.tsx. */
  icon: string;
  popular?: boolean;
  sections?: ServiceSection[];
};

export type Plan = {
  name: string;
  price: number;
  cadence: string;
  summary: string;
  features: string[];
  featured?: boolean;
};

export type PriceItem = { service: string; price: string };
export type PriceGroup = { category: string; items: PriceItem[] };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string; // ISO yyyy-mm-dd
  readingTime: string;
  body: string[];
};

export type NavItem = { label: string; href: string };

/* ------------------------------- COPY -------------------------------- */

export type Stat = { number: string; label: string };
export type TitledText = { title: string; text: string };
export type JourneyStep = { step: string; title: string; text: string };
export type TeamMember = {
  name?: string;
  photo?: string;
  icon: "stethoscope" | "heart" | "paw";
  role: string;
  bio: string;
};

export type SiteContent = {
  meta: {
    baseUrl: string;
    defaultTitle: string;
    titleTemplate: string;
    description: string;
    ogDescription: string;
    /** Brand colours, for the OG image + browser theme-colour. Optional so
     *  older profiles still type-check; emit fills them from the theme. */
    brandColor?: string;
    accentColor?: string;
  };
  header: { utilityNote: string };
  footer: {
    blurb: string;
    emergencyNote: string;
    bottomTagline: string;
    finePrint: string;
  };
  home: {
    hero: { badge: string; headlineLines: string[]; body: string };
    mission: {
      eyebrow: string;
      heading: string;
      paragraphs: string[];
      stats: Stat[];
      ctaLabel: string;
    };
    careClub: { heading: string; body: string };
    location: { eyebrow: string; heading: string; body: string };
    advice: { eyebrow: string; heading: string };
  };
  reviews: { eyebrow: string };
  services: { gridHeading: string; gridBody: string };
  finalCta: { heading: string; body: string };
  about: {
    hero: { eyebrow: string; title: string; intro: string };
    narrative: { heading: string; paragraphs: string[] };
    values: TitledText[];
    team: {
      eyebrow: string;
      heading: string;
      members: TeamMember[];
      note: string;
    };
  };
  servicesPage: {
    hero: { eyebrow: string; title: string; intro: string };
    processHeading: string;
    journey: JourneyStep[];
  };
  careClub: {
    hero: { eyebrow: string; title: string; intro: string };
    priceHeading: string;
    priceNote: string;
    planHeading: string;
    planBody: string;
    planNote: string;
    whyEyebrow: string;
    whyHeading: string;
    benefits: string[];
  };
  contact: {
    hero: { eyebrow: string; title: string; intro: string };
    emergencyBody: string;
  };
  register: {
    eyebrow: string;
    title: string;
    body: string;
    reassurance: string[];
    successBody: string;
  };
  book: {
    eyebrow: string;
    title: string;
    body: string;
    urgentNote: string;
  };
};

/* ------------------------------ HELPERS ------------------------------ */
/* Pure functions — no data dependency, safe to keep in the static schema. */

export function fullAddress(loc: Location) {
  return `${loc.line1}, ${loc.area}, ${loc.county} ${loc.postcode}`;
}

export function mapEmbed(loc: Location) {
  return `https://maps.google.com/maps?q=${loc.lat},${loc.lng}&z=16&output=embed`;
}

export function mapLink(loc: Location) {
  return `https://www.google.com/maps/search/?api=1&query=${loc.lat},${loc.lng}`;
}
