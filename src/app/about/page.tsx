import type { Metadata } from "next";
import { PageHero, Container, Eyebrow } from "@/components/ui";
import { TrustRow, ReviewsSection, FinalCta } from "@/components/sections";
import { content } from "@/lib/content";
import { placeholderImage } from "@/lib/images";
import { SiteImage } from "@/components/site-image";
import { PawIcon, StethoscopeIcon, HeartIcon } from "@/components/icons";

export const metadata: Metadata = {
  alternates: { canonical: "/about" },
  title: "About us",
  description: content.about.hero.intro,
};

const TeamIcon = { stethoscope: StethoscopeIcon, heart: HeartIcon, paw: PawIcon };

export default function AboutPage() {
  const { hero, narrative, values, team } = content.about;
  const storyImg = placeholderImage("about.story");
  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        intro={hero.intro}
        image={placeholderImage("hero.about")}
      />

      <TrustRow />

      {/* Narrative */}
      <section className="bg-paper">
        <Container className="grid items-start gap-12 py-20 sm:py-28 lg:grid-cols-2">
          <div className="space-y-4 text-muted">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-forest-800 sm:text-4xl lg:text-[2.5rem]">
              {narrative.heading}
            </h2>
            {narrative.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="grid gap-5">
            {values.map((v) => (
              <div
                key={v.title}
                className="rounded-2xl bg-forest-50 p-6 ring-1 ring-forest-100"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-forest-600 text-white">
                    <PawIcon className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-lg font-semibold text-forest-800">
                    {v.title}
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {v.text}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Story feature image */}
      {storyImg && (
        <section className="bg-paper pb-20 sm:pb-28">
          <Container>
            <SiteImage
              image={storyImg}
              tone="soft"
              align="bottom"
              className="aspect-[16/7] w-full rounded-3xl shadow-lg ring-1 ring-forest-100"
            />
          </Container>
        </section>
      )}

      {/* Team */}
      <section className="bg-cream">
        <Container className="py-20 sm:py-28">
          <Eyebrow>{team.eyebrow}</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-forest-800 sm:text-4xl lg:text-[2.5rem]">
            {team.heading}
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.members.map((m) => {
              const Icon = TeamIcon[m.icon];
              return (
                <div
                  key={m.name ?? m.role}
                  className="flex flex-col rounded-2xl bg-paper shadow-sm ring-1 ring-forest-100 overflow-hidden"
                >
                  {m.photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={m.photo} alt={m.name ?? m.role}
                      className="aspect-square w-full object-cover object-top" loading="lazy" />
                  ) : (
                    <div className="aspect-square w-full flex items-center justify-center bg-forest-100 text-forest-400">
                      <Icon className="h-12 w-12" />
                    </div>
                  )}
                  <div className="p-4">
                    {m.name && <h3 className="font-display text-base font-semibold text-forest-800 leading-tight">{m.name}</h3>}
                    <p className="mt-0.5 text-xs font-medium text-forest-500 uppercase tracking-wide">{m.role}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{m.bio}</p>
                  </div>
                </div>
              );
            })}
          </div>
          {team.note && (
            <p className="mt-6 text-sm text-muted">{team.note}</p>
          )}
        </Container>
      </section>

      <ReviewsSection />
      <FinalCta />
    </>
  );
}
