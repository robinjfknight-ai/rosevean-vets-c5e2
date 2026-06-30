"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { clinic, locations, nav } from "@/lib/clinic";
import { content } from "@/lib/content";
import { ButtonLink } from "./ui";
import { PhoneIcon, MenuIcon, CloseIcon } from "./icons";

function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link href="/" onClick={onClick} className="flex items-center gap-3 text-forest-800">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={clinic.logo} alt={clinic.name} width={364} height={168} className="h-28 w-auto" />
    </Link>
  );
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50">
      {/* Utility strip — phone numbers, desktop only (kept off tablet so it never crowds) */}
      <div className="hidden bg-forest-800 text-forest-100 lg:block">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-8 py-1.5 text-sm">
          <p className="text-forest-200">{content.header.utilityNote}</p>
          <div className="flex items-center gap-5">
            {locations.map((loc) => (
              <a
                key={loc.name}
                href={loc.phoneHref}
                className="inline-flex items-center gap-1.5 text-forest-100 hover:text-coral-400"
              >
                <PhoneIcon className="h-4 w-4" />
                <span className="font-semibold text-white">
                  {loc.name.replace(" Surgery", "")}
                </span>
                {loc.phone}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div
        className={`border-b transition-colors ${
          scrolled || open
            ? "border-forest-100 bg-cream/95 backdrop-blur"
            : "border-transparent bg-cream"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-8">
          <Logo onClick={() => setOpen(false)} />

          <nav className="hidden items-center gap-7 lg:flex">
            {nav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-semibold tracking-tight transition-colors ${
                    active
                      ? "text-forest-700"
                      : "text-ink/70 hover:text-forest-700"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Persistent dual CTA + tap-to-call */}
          <div className="flex items-center gap-2">
            <a
              href={clinic.phone.mainHref}
              aria-label={`Call us on ${clinic.phone.main}`}
              className="flex h-10 w-10 items-center justify-center rounded-full text-forest-700 ring-1 ring-inset ring-forest-200 hover:bg-forest-50 lg:hidden"
            >
              <PhoneIcon className="h-5 w-5" />
            </a>
            <ButtonLink href="/register" variant="ghost" className="hidden sm:inline-flex">
              Register
            </ButtonLink>
            <ButtonLink href="/book" variant="primary" className="hidden sm:inline-flex">
              <span className="lg:hidden">Book</span>
              <span className="hidden lg:inline">Book appointment</span>
            </ButtonLink>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="flex h-10 w-10 items-center justify-center rounded-full text-forest-700 ring-1 ring-inset ring-forest-200 hover:bg-forest-50 lg:hidden"
            >
              {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="border-b border-forest-100 bg-cream lg:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-4 sm:px-8">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl px-3 py-2.5 text-base font-semibold text-ink/80 hover:bg-forest-50 hover:text-forest-700"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 grid grid-cols-2 gap-3">
              <ButtonLink href="/register" variant="ghost" size="lg">
                Register
              </ButtonLink>
              <ButtonLink href="/book" variant="primary" size="lg">
                Book
              </ButtonLink>
            </div>
            <a
              href={clinic.phone.mainHref}
              className="mt-3 inline-flex items-center justify-center gap-2 text-sm font-semibold text-forest-700"
            >
              <PhoneIcon className="h-4 w-4" />
              {clinic.phone.main}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
