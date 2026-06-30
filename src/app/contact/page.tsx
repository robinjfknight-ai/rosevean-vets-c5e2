import type { Metadata } from "next";
import { PageHero, Container, ButtonLink } from "@/components/ui";
import {
  clinic,
  locations,
  mapEmbed,
  mapLink,
  reviews,
  type Location,
} from "@/lib/clinic";
import { content } from "@/lib/content";
import { placeholderImage } from "@/lib/images";
import {
  PinIcon,
  ClockIcon,
  PhoneIcon,
  ArrowRightIcon,
  FacebookIcon,
} from "@/components/icons";

export const metadata: Metadata = {
  alternates: { canonical: "/contact" },
  title: "Contact & find us",
  description: content.contact.hero.intro,
};

function SurgeryBlock({ loc }: { loc: Location }) {
  return (
    <div className="overflow-hidden rounded-3xl bg-paper shadow-sm ring-1 ring-forest-100">
      <iframe
        title={`Map of ${loc.name}`}
        src={mapEmbed(loc)}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-64 w-full border-0"
      />
      <div className="p-7">
        <h2 className="font-display text-2xl font-semibold text-forest-800">
          {loc.name}
        </h2>

        <dl className="mt-5 space-y-4 text-sm">
          <div className="flex gap-3">
            <PinIcon className="h-5 w-5 shrink-0 text-forest-500" />
            <div>
              <dt className="font-semibold text-forest-800">Address</dt>
              <dd className="text-muted">
                {loc.line1}, {loc.area}, {loc.county} {loc.postcode}
              </dd>
            </div>
          </div>
          <div className="flex gap-3">
            <PhoneIcon className="h-5 w-5 shrink-0 text-forest-500" />
            <div>
              <dt className="font-semibold text-forest-800">Phone</dt>
              <dd>
                <a href={loc.phoneHref} className="font-semibold text-forest-700">
                  {loc.phone}
                </a>
              </dd>
            </div>
          </div>
          <div className="flex gap-3">
            <ClockIcon className="h-5 w-5 shrink-0 text-forest-500" />
            <div className="flex-1">
              <dt className="font-semibold text-forest-800">Opening hours</dt>
              <dd className="mt-1 space-y-1">
                {loc.hours.map((h) => (
                  <p key={h.day} className="flex justify-between gap-4">
                    <span className="text-muted">{h.day}</span>
                    <span className="text-right text-ink/85">{h.time}</span>
                  </p>
                ))}
              </dd>
            </div>
          </div>
        </dl>

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

export default function ContactPage() {
  const { hero, emergencyBody } = content.contact;
  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        intro={hero.intro}
        image={placeholderImage("hero.contact")}
      />

      <section className="bg-cream">
        <Container className="py-16 sm:py-20">
          <div className="grid gap-8 lg:grid-cols-2">
            {locations.map((loc) => (
              <SurgeryBlock key={loc.name} loc={loc} />
            ))}
          </div>

          {/* Email + emergency + CTAs */}
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl bg-paper p-7 shadow-sm ring-1 ring-forest-100">
              <h2 className="font-display text-xl font-semibold text-forest-800">
                Get in touch
              </h2>
              {clinic.email ? (
                <p className="mt-2 text-sm text-muted">
                  Email us any time at{" "}
                  <a href={`mailto:${clinic.email}`} className="font-semibold text-forest-700">
                    {clinic.email}
                  </a>
                  .
                </p>
              ) : (
                <p className="mt-2 text-sm text-muted">
                  Call us on{" "}
                  <a href={clinic.phone.mainHref} className="font-semibold text-forest-700">
                    {clinic.phone.main}
                  </a>{" "}
                  or book an appointment below.
                </p>
              )}
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/register" variant="primary">
                  Register your pet
                </ButtonLink>
                <ButtonLink href="/book" variant="secondary">
                  Book an appointment
                </ButtonLink>
              </div>
              {clinic.facebook && (
                <a
                  href={clinic.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#1877F2] hover:underline"
                >
                  <FacebookIcon className="h-5 w-5" />
                  Follow us on Facebook
                </a>
              )}
              {reviews.count > 0 && (
                <div className="mt-3 flex items-center gap-2">
                  <span className="flex gap-0.5 text-amber-400 text-sm leading-none">
                    {"★★★★★".slice(0, Math.round(reviews.rating))}
                  </span>
                  <span className="text-xs text-muted font-medium">
                    {reviews.rating.toFixed(1)} · {reviews.count}+ {reviews.source}
                  </span>
                </div>
              )}
            </div>

            {clinic.emergency && (
              <div className="flex flex-col justify-center rounded-3xl bg-forest-700 p-7 text-white">
                <div className="flex items-center gap-3">
                  <PhoneIcon className="h-6 w-6 text-coral-400" />
                  <h2 className="font-display text-xl font-semibold">
                    24-hour emergency service
                  </h2>
                </div>
                <p className="mt-2 text-sm text-forest-100">
                  {emergencyBody}{" "}
                  <a
                    href={clinic.emergency.phoneHref}
                    className="font-semibold text-white"
                  >
                    {clinic.emergency.phone}
                  </a>
                  .
                </p>
              </div>
            )}
          </div>
        </Container>
      </section>
    </>
  );
}
