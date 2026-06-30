import Link from "next/link";
import { clinic, locations, nav, reviews } from "@/lib/clinic";
import { content } from "@/lib/content";
import { PhoneIcon, PinIcon, FacebookIcon } from "./icons";

export function SiteFooter() {
  return (
    <footer className="bg-forest-900 text-forest-100">
      {/* Emergency strip — only when the practice offers an out-of-hours service */}
      {clinic.emergency && (
        <div className="border-b border-forest-800 bg-forest-800">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-5 py-4 text-center sm:flex-row sm:px-8 sm:text-left">
            <p className="text-sm text-forest-100">
              <span className="font-semibold text-white">Out of hours?</span>{" "}
              {content.footer.emergencyNote}
            </p>
            <a
              href={clinic.emergency.phoneHref}
              className="inline-flex items-center gap-2 rounded-full bg-coral-500 px-5 py-2 text-sm font-semibold text-white hover:bg-coral-600"
            >
              <PhoneIcon className="h-4 w-4" />
              24hr line: {clinic.emergency.phone}
            </a>
          </div>
        </div>
      )}

      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={clinic.logo} alt={clinic.name} width={364} height={168} className="h-16 w-auto" />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-forest-200">
            {content.footer.blurb}
          </p>
          {clinic.email && (
            <p className="mt-4 flex items-center gap-2 text-sm text-forest-200">
              <PhoneIcon className="h-4 w-4 shrink-0 text-forest-400" />
              <a href={`mailto:${clinic.email}`} className="hover:text-white">
                {clinic.email}
              </a>
            </p>
          )}
          {clinic.facebook && (
            <div className="mt-5">
              <a
                href={clinic.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full bg-forest-800 px-4 py-2 text-sm font-semibold text-white ring-1 ring-forest-700 transition-colors hover:bg-[#1877F2] hover:ring-[#1877F2]"
              >
                <FacebookIcon className="h-5 w-5" />
                Follow us on Facebook
              </a>
            </div>
          )}
          {reviews.count > 0 && (
            <div className="mt-4 flex items-center gap-3">
              <span className="flex gap-0.5 text-amber-400 text-base leading-none">
                {"★★★★★".slice(0, Math.round(reviews.rating))}
              </span>
              <span className="text-sm text-forest-200 font-medium">
                {reviews.rating.toFixed(1)} · {reviews.count}+ {reviews.source}
              </span>
            </div>
          )}
        </div>

        {/* Surgeries */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-forest-400">
            Our surgeries
          </h3>
          <ul className="mt-4 space-y-4 text-sm">
            {locations.map((loc) => (
              <li key={loc.name}>
                <p className="font-semibold text-white">{loc.name}</p>
                <p className="flex items-start gap-2 text-forest-200">
                  <PinIcon className="mt-0.5 h-4 w-4 shrink-0 text-forest-400" />
                  <span>
                    {loc.line1}, {loc.area}, {loc.postcode}
                  </span>
                </p>
                <a
                  href={loc.phoneHref}
                  className="mt-1 inline-flex items-center gap-1.5 text-forest-200 hover:text-white"
                >
                  <PhoneIcon className="h-4 w-4 text-forest-400" />
                  {loc.phone}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Explore */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-forest-400">
            Explore
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-forest-200 hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/register" className="text-forest-200 hover:text-white">
                Register your pet
              </Link>
            </li>
            <li>
              <Link href="/book" className="text-forest-200 hover:text-white">
                Book an appointment
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-forest-800">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-5 text-xs text-forest-400 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>
            © {new Date().getFullYear()} {clinic.legalName}.
            {content.footer.finePrint ? ` ${content.footer.finePrint}` : ""}
          </p>
          <p>{content.footer.bottomTagline}</p>
        </div>
      </div>
    </footer>
  );
}
