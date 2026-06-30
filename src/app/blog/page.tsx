import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Container } from "@/components/ui";
import { FinalCta } from "@/components/sections";
import { posts } from "@/lib/clinic";
import { blogImage } from "@/lib/images";
import { SiteImage } from "@/components/site-image";
import { ArrowRightIcon } from "@/components/icons";

export const metadata: Metadata = {
  alternates: { canonical: "/blog" },
  title: "Pet health advice",
  description:
    "Practical pet-health advice from our team — seasonal tips, preventative care and guidance for every life stage.",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Pet health advice"
        title="Advice from our team to your home"
        intro="Honest, practical guidance written by the vets and nurses who care for your pets — no jargon, no scare tactics."
      />

      <section className="bg-cream">
        <Container className="py-20 sm:py-28">
          <div className="grid gap-6 md:grid-cols-3">
            {posts.map((post) => {
              const img = blogImage(post.slug);
              return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl bg-paper ring-1 ring-forest-100 transition-shadow hover:shadow-md"
              >
                {img && (
                  <SiteImage
                    image={img}
                    tone="soft"
                    align="bottom"
                    className="h-44"
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
                  <h2 className="mt-3 font-display text-lg font-semibold leading-snug text-forest-800 group-hover:text-forest-600">
                    {post.title}
                  </h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                    {post.excerpt}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs text-muted">
                      {formatDate(post.date)}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-coral-600">
                      Read
                      <ArrowRightIcon className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
              );
            })}
          </div>
        </Container>
      </section>

      <FinalCta />
    </>
  );
}
