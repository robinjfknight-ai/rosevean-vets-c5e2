"use client";

import { useState } from "react";
import { PawIcon } from "./icons";
import type { Assignment } from "@/lib/images";

/**
 * Renders an assigned image in the right treatment for its kind:
 *   - "cutout" → transparent cut-out, `object-contain` on a brand-tone panel
 *     (bottom-aligned so animals "stand" on the floor); never cropped.
 *   - "photo"  → full-bleed photograph, `object-cover` to fill the frame.
 * Falls back to a calm paw motif if the file is missing (instead of a broken
 * image). Sizing/aspect comes from the caller via `className`.
 */

export type Tone = "brand" | "soft" | "cream" | "paper" | "none";

const PANEL: Record<Tone, { bg: string; paw: string }> = {
  brand: { bg: "bg-gradient-to-br from-forest-600 to-forest-800", paw: "text-white/25" },
  soft: { bg: "bg-gradient-to-br from-forest-50 to-forest-100", paw: "text-forest-300" },
  cream: { bg: "bg-cream", paw: "text-forest-200" },
  paper: { bg: "bg-paper", paw: "text-forest-200" },
  none: { bg: "", paw: "text-white/30" },
};

export function SiteImage({
  image,
  tone = "soft",
  align = "bottom",
  className = "",
  imgClassName = "",
}: {
  image: Assignment;
  tone?: Tone;
  align?: "bottom" | "center";
  className?: string;
  imgClassName?: string;
}) {
  const [ok, setOk] = useState(true);
  const isPhoto = image.kind === "photo";
  const panel = isPhoto ? "bg-forest-100" : PANEL[tone].bg;
  const fit = isPhoto ? "object-cover" : "object-contain";
  const pos = align === "bottom" && !isPhoto ? "object-bottom" : "object-center";

  return (
    <div className={`relative overflow-hidden ${panel} ${className}`}>
      {ok ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={image.src}
          alt={image.alt}
          loading="lazy"
          onError={() => setOk(false)}
          className={`h-full w-full ${fit} ${pos} ${imgClassName}`}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <PawIcon className={`h-1/3 w-1/3 ${PANEL[tone].paw}`} />
        </div>
      )}
    </div>
  );
}
