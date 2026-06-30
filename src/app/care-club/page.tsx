import type { Metadata } from "next";
import { PageHero, Container, Eyebrow } from "@/components/ui";
import { CarePlans, FinalCta } from "@/components/sections";
import { priceList, priceUpdated, planName, carePlans } from "@/lib/clinic";
import { content } from "@/lib/content";
import { placeholderImage } from "@/lib/images";
import { SiteImage } from "@/components/site-image";
import { CheckIcon } from "@/components/icons";

export const metadata: Metadata = {
  alternates: { canonical: "/care-club" },
  title: "Prices & health plans",
  description: content.careClub.hero.intro,
};

export default function CareClubPage() {
  const c = content.careClub;
  const hasPlans = !!planName && carePlans.length > 0;
  const featureImg = placeholderImage("careclub.feature");
  return (
    <>
      <PageHero
        eyebrow={c.hero.eyebrow}
        title={c.hero.title}
        intro={c.hero.intro}
        image={placeholderImage("hero.careclub")}
      />

      {/* Full published price list */}
      {priceList.length > 0 && (
        <section className="bg-cream">
          <Container className="py-20 sm:py-28">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
              <div className="max-w-xl">
                <Eyebrow>Price list {priceUpdated}</Eyebrow>
                <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-forest-800 sm:text-4xl lg:text-[2.5rem]">
                  {c.priceHeading}
                </h2>
              </div>
              <p className="max-w-xs text-sm text-muted">{c.priceNote}</p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {priceList.map((group) => (
                <div
                  key={group.category}
                  className="overflow-hidden rounded-2xl bg-paper shadow-sm ring-1 ring-forest-100"
                >
                  <h3 className="border-b border-forest-100 bg-forest-50 px-5 py-3 font-display text-lg font-semibold text-forest-800">
                    {group.category}
                  </h3>
                  <table className="w-full text-sm">
                    <tbody>
                      {group.items.map((row, i) => (
                        <tr
                          key={row.service}
                          className={i % 2 === 0 ? "bg-paper" : "bg-forest-50/60"}
                        >
                          <td className="px-5 py-3 text-ink/85">{row.service}</td>
                          <td className="whitespace-nowrap px-5 py-3 text-right font-semibold text-forest-700">
                            {row.price}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Health plan */}
      {hasPlans && (
        <section className="bg-paper">
          <Container className="py-20 sm:py-28">
            <div className="max-w-2xl">
              <Eyebrow>{planName}</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-forest-800 sm:text-4xl lg:text-[2.5rem]">
                {c.planHeading}
              </h2>
              <p className="mt-3 text-muted">{c.planBody}</p>
            </div>

            <div className="mt-10">
              <CarePlans />
            </div>
            <p className="mt-6 text-center text-sm text-muted">{c.planNote}</p>
          </Container>
        </section>
      )}

      {/* Why join */}
      {hasPlans && (
        <section className="bg-forest-50">
          <Container className="py-20 sm:py-28">
            <div className="grid gap-10 lg:grid-cols-2">
              <div>
                <Eyebrow>{c.whyEyebrow}</Eyebrow>
                <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-forest-800 sm:text-4xl lg:text-[2.5rem]">
                  {c.whyHeading}
                </h2>
                {featureImg && (
                  <SiteImage
                    image={featureImg}
                    tone="paper"
                    align="bottom"
                    className="mt-8 aspect-[4/3] w-full rounded-3xl shadow-sm ring-1 ring-forest-100"
                  />
                )}
              </div>
              <ul className="space-y-4">
                {c.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-forest-100 text-forest-600">
                      <CheckIcon className="h-4 w-4" />
                    </span>
                    <span className="text-ink/85">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </section>
      )}

      <FinalCta />
    </>
  );
}
