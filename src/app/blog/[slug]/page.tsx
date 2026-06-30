import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, ButtonLink } from "@/components/ui";
import { FinalCta } from "@/components/sections";
import { posts } from "@/lib/clinic";
import { blogImage } from "@/lib/images";
import { SiteImage } from "@/components/site-image";
import { JsonLd } from "@/components/json-ld";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { ArrowRightIcon } from "@/components/icons";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await props.params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  const url = `/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url,
      publishedTime: post.date,
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPostPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const body = post.body.length > 0 ? post.body : [post.excerpt];
  const image = blogImage(post.slug);

  return (
    <>
      <JsonLd data={articleJsonLd(post)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Advice", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ])}
      />
      <article>
        <header className="border-b border-forest-100 bg-forest-50">
          <Container className="py-16 sm:py-20">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-forest-600 hover:text-forest-800"
            >
              <ArrowRightIcon className="h-4 w-4 rotate-180" />
              All advice
            </Link>
            <div className="mt-5 flex items-center gap-3 text-xs text-muted">
              <span className="font-semibold uppercase tracking-wide text-forest-500">
                {post.category}
              </span>
              <span>·</span>
              <span>{formatDate(post.date)}</span>
              <span>·</span>
              <span>{post.readingTime}</span>
            </div>
            <h1 className="mt-3 max-w-3xl font-display text-3xl font-semibold leading-[1.12] tracking-tight text-forest-900 sm:text-4xl lg:text-[2.5rem]">
              {post.title}
            </h1>
          </Container>
        </header>

        {image && (
          <Container className="pt-10 sm:pt-12">
            <SiteImage
              image={image}
              tone="soft"
              align="bottom"
              className="aspect-[2/1] w-full rounded-3xl shadow-lg ring-1 ring-forest-100"
            />
          </Container>
        )}

        <Container className="py-16 sm:py-20">
          <div className="max-w-2xl space-y-5 text-lg leading-relaxed text-ink/85">
            <p className="font-display text-xl font-medium text-forest-700">
              {post.excerpt}
            </p>
            {body.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          <div className="mt-12 max-w-2xl rounded-2xl bg-forest-50 p-7 ring-1 ring-forest-100">
            <p className="font-display text-lg font-semibold text-forest-800">
              Worried about your pet?
            </p>
            <p className="mt-2 text-muted">
              Our team is always happy to take a look. Book an appointment or
              register online — it only takes a couple of minutes.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/book" variant="primary">
                Book an appointment
              </ButtonLink>
              <ButtonLink href="/register" variant="ghost">
                Register your pet
              </ButtonLink>
            </div>
          </div>
        </Container>
      </article>

      <FinalCta />
    </>
  );
}
