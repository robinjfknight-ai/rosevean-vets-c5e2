import Link from "next/link";
import {
  reviews,
  accreditations,
  services,
  carePlans,
  type Service,
  type Plan,
} from "@/lib/clinic";
import { content } from "@/lib/content";
import { placeholderImage } from "@/lib/images";
import { Container, Eyebrow, StarRating, ButtonLink } from "./ui";
import { SiteImage } from "./site-image";
import { Icon, CheckIcon, ArrowRightIcon, StarIcon } from "./icons";

/* ---------- Trust / accreditation row (blueprint #3) ---------- */

export function TrustRow() {
  return (
    <section className="border-y border-forest-100 bg-paper">
      <Container className="py-7">
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-5 text-center">
          {accreditations.map((a) => (
            <li key={a.label} className="max-w-[12rem]">
              <p className="text-sm font-semibold text-forest-700">{a.label}</p>
              <p className="mt-0.5 text-xs leading-snug text-muted">{a.detail}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/* ---------- Reviews with explicit aggregate (blueprint #2) ---------- */

export function ReviewsSection() {
  // Hidden entirely for practices with no review data (keeps the page honest).
  if (reviews.count === 0) return null;
  return (
    <section className="bg-forest-50">
      <Container className="py-20 sm:py-28">
        <div className="flex flex-col items-center gap-5 text-center">
          <Eyebrow>{content.reviews.eyebrow}</Eyebrow>
          <div className="flex flex-col items-center gap-2">
            <StarRating rating={reviews.rating} className="scale-110" />
            <p className="font-display text-3xl font-semibold text-forest-800 sm:text-4xl">
              {reviews.rating} ★ from {reviews.count.toLocaleString()}+ reviews
            </p>
            <p className="text-sm text-muted">
              Based on {reviews.source}
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {reviews.testimonials.map((t) => (
            <figure
              key={t.author}
              className="flex flex-col rounded-2xl bg-paper p-7 shadow-sm ring-1 ring-forest-100"
            >
              <span className="mb-3 inline-flex text-gold">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} className="h-4 w-4" />
                ))}
              </span>
              <blockquote className="flex-1 text-[1.05rem] leading-relaxed text-ink/85">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-5 text-sm">
                <span className="font-semibold text-forest-700">{t.author}</span>
                <span className="text-muted"> — {t.pet}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ---------- Services grid (blueprint homepage beat 06) ---------- */

function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="group flex flex-col rounded-2xl bg-paper p-6 shadow-sm ring-1 ring-forest-100 transition-shadow hover:shadow-md">
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-forest-50 text-forest-600 ring-1 ring-forest-100">
        <Icon name={service.icon as never} className="h-6 w-6" />
      </span>
      <h3 className="mt-5 font-display text-lg font-semibold text-forest-800">
        {service.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
        {service.blurb}
      </p>
    </div>
  );
}

export function ServicesGrid({
  limit,
  heading = true,
}: {
  limit?: number;
  heading?: boolean;
}) {
  const list = limit ? services.slice(0, limit) : services;
  return (
    <section className="bg-cream">
      <Container className="py-20 sm:py-28">
        {heading && (
          <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
            <div className="max-w-xl">
              <Eyebrow>What we do</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-forest-800 sm:text-4xl lg:text-[2.5rem]">
                {content.services.gridHeading}
              </h2>
              <p className="mt-3 text-muted">{content.services.gridBody}</p>
            </div>
            <ButtonLink href="/services" variant="ghost">
              See all services
              <ArrowRightIcon className="h-4 w-4" />
            </ButtonLink>
          </div>
        )}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ---------- Care Club plan cards (blueprint #5) ---------- */

function PlanCard({ plan }: { plan: Plan }) {
  return (
    <div
      className={`relative flex flex-col rounded-3xl p-7 ${
        plan.featured
          ? "bg-forest-700 text-white shadow-lg ring-1 ring-forest-600"
          : "bg-paper text-ink ring-1 ring-forest-100 shadow-sm"
      }`}
    >
      {plan.featured && (
        <span className="absolute -top-3 left-7 rounded-full bg-coral-500 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
          Most popular
        </span>
      )}
      <h3
        className={`font-display text-xl font-semibold ${
          plan.featured ? "text-white" : "text-forest-800"
        }`}
      >
        {plan.name}
      </h3>
      <p
        className={`mt-1 text-sm ${
          plan.featured ? "text-forest-100" : "text-muted"
        }`}
      >
        {plan.summary}
      </p>
      <p className="mt-5 flex items-baseline gap-1">
        <span className="font-display text-4xl font-semibold">£{plan.price}</span>
        <span
          className={`text-sm ${plan.featured ? "text-forest-200" : "text-muted"}`}
        >
          {plan.cadence}
        </span>
      </p>
      <ul className="mt-6 flex-1 space-y-3 text-sm">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5">
            <CheckIcon
              className={`mt-0.5 h-4 w-4 shrink-0 ${
                plan.featured ? "text-coral-400" : "text-forest-500"
              }`}
            />
            <span className={plan.featured ? "text-forest-50" : "text-ink/80"}>
              {f}
            </span>
          </li>
        ))}
      </ul>
      <ButtonLink
        href="/register"
        variant={plan.featured ? "primary" : "ghost"}
        size="lg"
        className="mt-7"
      >
        Join this plan
      </ButtonLink>
    </div>
  );
}

export function CarePlans() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {carePlans.map((p) => (
        <PlanCard key={p.name} plan={p} />
      ))}
    </div>
  );
}

/* ---------- Final CTA band (blueprint homepage beat 10) ---------- */

export function FinalCta() {
  const petImg = placeholderImage("cta.pet");
  return (
    <section className="bg-cream">
      <Container className="py-20 sm:py-28">
        <div className="overflow-hidden rounded-3xl bg-forest-700 text-white">
          <div
            className={
              petImg
                ? "grid items-center gap-6 sm:gap-10 lg:grid-cols-[0.8fr_1.2fr]"
                : ""
            }
          >
            {petImg && (
              <SiteImage
                image={petImg}
                tone="none"
                align="bottom"
                className="hidden h-full min-h-[16rem] w-full lg:block"
              />
            )}
            <div className="px-7 py-14 text-center sm:px-12">
              <h2 className="mx-auto max-w-2xl font-display text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[2.5rem]">
                {content.finalCta.heading}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-forest-100">
                {content.finalCta.body}
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <ButtonLink href="/register" variant="primary" size="lg">
                  Register your pet
                </ButtonLink>
                <ButtonLink href="/book" variant="white" size="lg">
                  Book an appointment
                </ButtonLink>
              </div>
              <p className="mt-6 text-sm text-forest-200">
                Prefer to talk?{" "}
                <Link href="/contact" className="font-semibold text-white underline">
                  Call or visit us
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
