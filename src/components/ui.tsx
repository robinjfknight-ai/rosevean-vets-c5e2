import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { StarIcon } from "./icons";
import { SiteImage } from "./site-image";
import type { Assignment } from "@/lib/images";

type Variant = "primary" | "secondary" | "ghost" | "white";

const variants: Record<Variant, string> = {
  primary:
    "bg-coral-500 text-white hover:bg-coral-600 shadow-sm shadow-coral-600/20",
  secondary:
    "bg-forest-600 text-white hover:bg-forest-700 shadow-sm shadow-forest-900/20",
  ghost:
    "bg-transparent text-forest-700 ring-1 ring-inset ring-forest-200 hover:bg-forest-50",
  white: "bg-white text-forest-700 hover:bg-forest-50 shadow-sm",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
} as const;

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-500 disabled:opacity-60 disabled:pointer-events-none";

type ButtonLinkProps = {
  variant?: Variant;
  size?: keyof typeof sizes;
} & ComponentProps<typeof Link>;

export function ButtonLink({
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={`${buttonBase} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    />
  );
}

type ButtonProps = {
  variant?: Variant;
  size?: keyof typeof sizes;
} & ComponentProps<"button">;

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${buttonBase} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    />
  );
}

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-forest-500">
      <span className="h-px w-6 bg-forest-300" aria-hidden />
      {children}
    </span>
  );
}

export function PageHero({
  eyebrow,
  title,
  intro,
  children,
  image,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  children?: ReactNode;
  /** Optional placeholder image — when set, the hero becomes two-column. */
  image?: Assignment | null;
}) {
  return (
    <section className="border-b border-forest-100 bg-forest-50">
      <Container className="py-20 sm:py-28">
        <div
          className={
            image ? "grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]" : ""
          }
        >
          <div className="max-w-2xl">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1 className="mt-3 font-display text-3xl font-semibold leading-[1.12] tracking-tight text-forest-900 sm:text-4xl lg:text-[2.5rem]">
              {title}
            </h1>
            {intro && (
              <p className="mt-5 text-lg leading-relaxed text-muted">{intro}</p>
            )}
            {children && <div className="mt-7">{children}</div>}
          </div>
          {image && (
            <SiteImage
              image={image}
              tone="soft"
              align="bottom"
              className="aspect-[4/3] w-full rounded-3xl shadow-lg ring-1 ring-forest-100"
            />
          )}
        </div>
      </Container>
    </section>
  );
}

export function StarRating({
  rating,
  className = "",
}: {
  rating: number;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex text-gold ${className}`}
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon
          key={i}
          className={`h-5 w-5 ${i < Math.round(rating) ? "" : "opacity-30"}`}
        />
      ))}
    </span>
  );
}
