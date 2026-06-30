import type { Metadata } from "next";
import { Container, Eyebrow } from "@/components/ui";
import { BookForm } from "@/components/book-form";
import { clinic } from "@/lib/clinic";
import { content } from "@/lib/content";
import { placeholderImage } from "@/lib/images";
import { SiteImage } from "@/components/site-image";
import { ClockIcon, PhoneIcon } from "@/components/icons";

export const metadata: Metadata = {
  alternates: { canonical: "/book" },
  title: "Book an appointment",
  description: content.book.body,
};

export default function BookPage() {
  const b = content.book;
  const asideImg = placeholderImage("book.aside");
  return (
    <section className="bg-cream">
      <Container className="py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <Eyebrow>{b.eyebrow}</Eyebrow>
            <h1 className="mt-3 font-display text-3xl font-semibold leading-[1.12] tracking-tight text-forest-900 sm:text-4xl lg:text-[2.5rem]">
              {b.title}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted">{b.body}</p>

            <div className="mt-7 space-y-4">
              <div className="flex gap-3 rounded-2xl bg-paper p-5 ring-1 ring-forest-100">
                <ClockIcon className="h-6 w-6 shrink-0 text-forest-500" />
                <div className="text-sm">
                  <p className="font-semibold text-forest-800">Opening hours</p>
                  {clinic.hours.map((h) => (
                    <p key={h.day} className="text-muted">
                      {h.day}: {h.time}
                    </p>
                  ))}
                </div>
              </div>
              {clinic.emergency && (
                <div className="flex gap-3 rounded-2xl bg-forest-700 p-5 text-white">
                  <PhoneIcon className="h-6 w-6 shrink-0 text-coral-400" />
                  <div className="text-sm">
                    <p className="font-semibold">Urgent or out of hours?</p>
                    <p className="text-forest-100">
                      {b.urgentNote}{" "}
                      <a
                        href={clinic.emergency.phoneHref}
                        className="font-semibold text-white"
                      >
                        {clinic.emergency.phone}
                      </a>
                    </p>
                  </div>
                </div>
              )}
            </div>

            {asideImg && (
              <SiteImage
                image={asideImg}
                tone="soft"
                align="bottom"
                className="mt-8 aspect-[4/3] w-full rounded-3xl shadow-sm ring-1 ring-forest-100"
              />
            )}
          </aside>

          <div>
            <BookForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
