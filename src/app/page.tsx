import Link from "next/link";
import {
  clinic,
  reviews,
  carePlans,
  posts,
  planName,
  locations,
  mapEmbed,
  mapLink,
  type Location,
} from "@/lib/clinic";
import { content } from "@/lib/content";
import { placeholderImage, blogImage } from "@/lib/images";
import { SiteImage } from "@/components/site-image";
import { JsonLd } from "@/components/json-ld";
import { practiceJsonLd } from "@/lib/seo";
import { Container, Eyebrow, ButtonLink, StarRating } from "@/components/ui";
import type { Metadata } from "next";

export const metadata: Metadata = { alternates: { canonical: "/" } };
import {
  TrustRow,
  ReviewsSection,
  ServicesGrid,
  FinalCta,
} from "@/components/sections";
import {
  PawIcon,
  PhoneIcon,
  PinIcon,
  ClockIcon,
  ArrowRightIcon,
  CheckIcon,
} from "@/components/icons";

/* ---------------- Hero (beats 01–02) ---------------- */

function Hero() {
  const { hero } = content.home;
  const heroImg = placeholderImage("home.hero");
  return (
    <section className="relative overflow-hidden bg-cream">
      {/* soft decorative shapes */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-24 h-96 w-96 rounded-full bg-forest-100 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-coral-400/20 blur-3xl"
      />

      <Container className="relative grid items-center gap-12 py-20 sm:py-28 lg:grid-cols-[1.05fr_0.95fr] lg:py-32 lg:gap-16">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-forest-100 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-forest-700">
            <PawIcon className="h-4 w-4" />
            {hero.badge}
          </span>
          <h1 className="mt-5 font-display text-3xl font-semibold leading-[1.12] tracking-tight text-forest-900 sm:text-4xl lg:text-[2.5rem]">
            {hero.headlineLines.map((line, i) => (
              <span key={i}>
                {i > 0 && <br />}
                {line}
              </span>
            ))}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
            {hero.body}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/register" variant="primary" size="lg">
              Register my pet
            </ButtonLink>
            <ButtonLink href="/book" variant="secondary" size="lg">
              Book an appointment
            </ButtonLink>
          </div>

          <a
            href={clinic.phone.mainHref}
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-forest-700 hover:text-coral-600"
          >
            <PhoneIcon className="h-4 w-4" />
            Or call us on {clinic.phone.main}
          </a>
        </div>

        {/* Hero image floating on a brand panel + floating trust badges */}
        <div className="relative">
          {heroImg ? (
            <SiteImage
              image={heroImg}
              tone="brand"
              align="bottom"
              className="aspect-[4/3] w-full rounded-3xl shadow-xl ring-1 ring-forest-100"
              imgClassName={heroImg.kind === "cutout" ? "p-4" : ""}
            />
          ) : (
            <div className="aspect-[4/3] w-full rounded-3xl bg-gradient-to-br from-forest-600 to-forest-800 shadow-xl ring-1 ring-forest-100" />
          )}

          {/* Review aggregate (blueprint #2) floating over the photo */}
          {reviews.count > 0 && (
            <div className="absolute -bottom-5 -left-2 rounded-2xl bg-forest-700 px-5 py-4 text-white shadow-lg sm:-left-5">
              <div className="flex items-center gap-2">
                <StarRating rating={reviews.rating} />
                <span className="font-display text-xl font-semibold">
                  {reviews.rating} ★
                </span>
              </div>
              <p className="mt-1 text-sm text-forest-100">
                from{" "}
                <span className="font-semibold text-white">
                  {reviews.count.toLocaleString()}+ reviews
                </span>
              </p>
            </div>
          )}

          {clinic.emergency && (
            <div className="absolute -right-2 -top-4 rounded-2xl bg-paper px-4 py-3 text-center shadow-lg ring-1 ring-forest-100 sm:-right-5">
              <p className="font-display text-lg font-semibold text-forest-800">
                24<span className="text-coral-500">hr</span>
              </p>
              <p className="text-xs font-semibold uppercase tracking-wide text-coral-600">
                Emergency care
              </p>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}

/* ---------------- Founder / mission (beat 03) ---------------- */

function MissionSection() {
  const { mission } = content.home;
  const aboutImg = placeholderImage("home.about");
  return (
    <section className="bg-paper">
      <Container className="grid items-center gap-12 py-20 sm:py-28 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          {aboutImg && (
            <SiteImage
              image={aboutImg}
              tone="soft"
              align="bottom"
              className="aspect-[5/4] w-full rounded-3xl shadow-lg ring-1 ring-forest-100"
            />
          )}
          <div className="mt-4 grid grid-cols-2 gap-4">
            {mission.stats.map((s) => (
              <Stat key={s.label} number={s.number} label={s.label} />
            ))}
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <Eyebrow>{mission.eyebrow}</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-forest-800 sm:text-4xl lg:text-[2.5rem]">
            {mission.heading}
          </h2>
          <div className="mt-5 space-y-4 text-muted">
            {mission.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <ButtonLink href="/about" variant="ghost" className="mt-7">
            {mission.ctaLabel}
            <ArrowRightIcon className="h-4 w-4" />
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div className="rounded-2xl bg-forest-50 p-5 ring-1 ring-forest-100">
      <p className="font-display text-3xl font-semibold text-forest-700">
        {number}
      </p>
      <p className="mt-1 text-sm leading-snug text-muted">{label}</p>
    </div>
  );
}

/* ---------------- Care Club promo (beat 07) ---------------- */

function CareClubPromo() {
  const featured = carePlans.find((p) => p.featured) ?? carePlans[0];
  if (!planName || !featured) return null;
  return (
    <section className="bg-forest-800 text-white">
      <Container className="grid items-center gap-12 py-20 sm:py-28 lg:grid-cols-2">
        <div>
          <Eyebrow>
            <span className="text-coral-400">{planName}</span>
          </Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[2.5rem]">
            {content.home.careClub.heading}
          </h2>
          <p className="mt-4 max-w-lg text-forest-100">
            {content.home.careClub.body}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/care-club" variant="primary" size="lg">
              Explore the plans
            </ButtonLink>
            <ButtonLink href="/care-club" variant="white" size="lg">
              See what&apos;s included
            </ButtonLink>
          </div>
        </div>

        <div className="rounded-3xl bg-forest-700 p-8 ring-1 ring-forest-600">
          <p className="text-sm font-semibold uppercase tracking-wide text-coral-400">
            Most popular
          </p>
          <h3 className="mt-1 font-display text-2xl font-semibold">
            {featured.name}
          </h3>
          <p className="mt-2 flex items-baseline gap-1">
            <span className="font-display text-5xl font-semibold">
              £{featured.price}
            </span>
            <span className="text-forest-200">{featured.cadence}</span>
          </p>
          <ul className="mt-6 space-y-3 text-sm">
            {featured.features.map((f) => (
              <li key={f} className="flex items-start gap-2.5">
                <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-coral-400" />
                <span className="text-forest-50">{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

/* ---------------- Location / hours (beat 08) ---------------- */

function SurgeryCard({ loc }: { loc: Location }) {
  return (
    <div className="overflow-hidden rounded-3xl bg-paper shadow-sm ring-1 ring-forest-100">
      <iframe
        title={`Map of ${loc.name}`}
        src={mapEmbed(loc)}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-56 w-full border-0"
      />
      <div className="p-6">
        <h3 className="font-display text-xl font-semibold text-forest-800">
          {loc.name}
        </h3>
        <p className="mt-2 flex items-start gap-2 text-sm text-muted">
          <PinIcon className="mt-0.5 h-5 w-5 shrink-0 text-forest-500" />
          {loc.line1}, {loc.area}, {loc.county} {loc.postcode}
        </p>
        <p className="mt-2 flex items-center gap-2 text-sm">
          <PhoneIcon className="h-5 w-5 shrink-0 text-forest-500" />
          <a href={loc.phoneHref} className="font-semibold text-forest-700">
            {loc.phone}
          </a>
        </p>
        <div className="mt-4 flex items-start gap-2 text-sm">
          <ClockIcon className="mt-0.5 h-5 w-5 shrink-0 text-forest-500" />
          <div className="flex-1 space-y-1">
            {loc.hours.map((h) => (
              <p key={h.day} className="flex justify-between gap-4">
                <span className="text-muted">{h.day}</span>
                <span className="text-right text-ink/80">{h.time}</span>
              </p>
            ))}
          </div>
        </div>
        <a
          href={mapLink(loc)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-coral-600 hover:text-coral-500"
        >
          Get directions
          <ArrowRightIcon className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}

function LocationSection() {
  return (
    <section className="bg-cream">
      <Container className="py-20 sm:py-28">
        <div className="max-w-2xl">
          <Eyebrow>{content.home.location.eyebrow}</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-forest-800 sm:text-4xl lg:text-[2.5rem]">
            {content.home.location.heading}
          </h2>
          <p className="mt-3 text-muted">{content.home.location.body}</p>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {locations.map((loc) => (
            <SurgeryCard key={loc.name} loc={loc} />
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ---------------- Blog teasers (beat 09) ---------------- */

function AdviceSection() {
  if (posts.length === 0) return null;
  return (
    <section className="bg-paper">
      <Container className="py-20 sm:py-28">
        <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <Eyebrow>{content.home.advice.eyebrow}</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-forest-800 sm:text-4xl lg:text-[2.5rem]">
              {content.home.advice.heading}
            </h2>
          </div>
          <ButtonLink href="/blog" variant="ghost">
            All articles
            <ArrowRightIcon className="h-4 w-4" />
          </ButtonLink>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {posts.map((post) => {
            const img = blogImage(post.slug);
            return (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl ring-1 ring-forest-100 transition-shadow hover:shadow-md"
            >
              {img && (
                <SiteImage
                  image={img}
                  tone="soft"
                  align="bottom"
                  className="h-40"
                  imgClassName={`transition-transform duration-500 group-hover:scale-105 ${img.kind === "cutout" ? "p-2" : ""}`}
                />
              )}
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-3 text-xs text-muted">
                  <span className="font-semibold uppercase tracking-wide text-forest-500">
                    {post.category}
                  </span>
                  <span>·</span>
                  <span>{post.readingTime}</span>
                </div>
                <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-forest-800 group-hover:text-forest-600">
                  {post.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                  {post.excerpt}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-coral-600">
                  Read more
                  <ArrowRightIcon className="h-4 w-4" />
                </span>
              </div>
            </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

/* ---------------- Pet banner (the peeking row) ---------------- */

function PetBanner() {
  const bannerImg = placeholderImage("home.banner");
  if (!bannerImg) return null;
  return (
    <section className="bg-paper">
      <Container className="pt-16 text-center sm:pt-20">
        <Eyebrow>Every member of the family</Eyebrow>
        <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-forest-800 sm:text-3xl">
          Cats, dogs and the little ones too
        </h2>
        <SiteImage
          image={bannerImg}
          tone="paper"
          align="bottom"
          className="mt-6 h-36 w-full sm:h-48 lg:h-56"
        />
      </Container>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <JsonLd data={practiceJsonLd()} />
      <Hero />
      <TrustRow />
      <MissionSection />
      <ReviewsSection />
      <ServicesGrid limit={4} />
      <CareClubPromo />
      <LocationSection />
      <AdviceSection />
      <PetBanner />
      <FinalCta />
    </>
  );
}
