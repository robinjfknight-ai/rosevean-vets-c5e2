import type { Metadata } from "next";
import { Container, Eyebrow, StarRating } from "@/components/ui";
import { RegisterForm } from "@/components/register-form";
import { reviews } from "@/lib/clinic";
import { content } from "@/lib/content";
import { placeholderImage } from "@/lib/images";
import { SiteImage } from "@/components/site-image";
import { CheckIcon } from "@/components/icons";

export const metadata: Metadata = {
  alternates: { canonical: "/register" },
  title: "Register your pet",
  description: content.register.body,
};

export default function RegisterPage() {
  const r = content.register;
  const asideImg = placeholderImage("register.aside");
  return (
    <section className="bg-cream">
      <Container className="py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          {/* Reassurance column */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <Eyebrow>{r.eyebrow}</Eyebrow>
            <h1 className="mt-3 font-display text-3xl font-semibold leading-[1.12] tracking-tight text-forest-900 sm:text-4xl lg:text-[2.5rem]">
              {r.title}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted">{r.body}</p>

            <ul className="mt-7 space-y-3.5">
              {r.reassurance.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-forest-100 text-forest-600">
                    <CheckIcon className="h-4 w-4" />
                  </span>
                  <span className="text-ink/85">{item}</span>
                </li>
              ))}
            </ul>

            {reviews.count > 0 && (
              <div className="mt-8 rounded-2xl bg-forest-700 p-6 text-white">
                <div className="flex items-center gap-2">
                  <StarRating rating={reviews.rating} />
                  <span className="font-semibold">{reviews.rating} ★</span>
                </div>
                <p className="mt-2 text-sm text-forest-100">
                  Rated {reviews.rating} from{" "}
                  <span className="font-semibold text-white">
                    {reviews.count.toLocaleString()}+ reviews
                  </span>{" "}
                  by {reviews.reviewedBy}.
                </p>
              </div>
            )}

            {asideImg && (
              <SiteImage
                image={asideImg}
                tone="soft"
                align="bottom"
                className="mt-8 aspect-[4/3] w-full rounded-3xl shadow-sm ring-1 ring-forest-100"
              />
            )}
          </aside>

          {/* Form */}
          <div>
            <RegisterForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
