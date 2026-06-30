import type { Metadata } from "next";
import { PageHero, Container, ButtonLink } from "@/components/ui";
import { ServicesGrid, ReviewsSection, FinalCta } from "@/components/sections";
import { planName } from "@/lib/clinic";
import { content } from "@/lib/content";
import { placeholderImage } from "@/lib/images";
import { ArrowRightIcon } from "@/components/icons";

export const metadata: Metadata = {
  alternates: { canonical: "/services" },
  title: "Services",
  description: content.servicesPage.hero.intro,
};

export default function ServicesPage() {
  const { hero, processHeading, journey } = content.servicesPage;
  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        intro={hero.intro}
        image={placeholderImage("hero.services")}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/register" variant="primary" size="lg">
            Register your pet
          </ButtonLink>
          <ButtonLink href="/book" variant="secondary" size="lg">
            Book an appointment
          </ButtonLink>
        </div>
      </PageHero>

      <ServicesGrid heading={false} />

      {/* How it works */}
      <section className="bg-paper">
        <Container className="py-20 sm:py-28">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-forest-800 sm:text-4xl lg:text-[2.5rem]">
            {processHeading}
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {journey.map((j) => (
              <div
                key={j.step}
                className="rounded-2xl bg-forest-50 p-7 ring-1 ring-forest-100"
              >
                <span className="font-display text-3xl font-semibold text-forest-300">
                  {j.step}
                </span>
                <h3 className="mt-3 font-display text-lg font-semibold text-forest-800">
                  {j.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {j.text}
                </p>
              </div>
            ))}
          </div>
          {planName && (
            <ButtonLink href="/care-club" variant="ghost" className="mt-8">
              See what the Health Plan covers
              <ArrowRightIcon className="h-4 w-4" />
            </ButtonLink>
          )}
        </Container>
      </section>

      <ReviewsSection />
      <FinalCta />
    </>
  );
}
