import { ImageResponse } from "next/og";
import { clinic, reviews } from "@/lib/clinic";
import { content } from "@/lib/content";

/**
 * Default social-share image for every route — generated at build time from the
 * practice's name, tagline, review aggregate and BRAND COLOUR (so it inherits
 * the same palette as the site). No static asset to maintain per practice.
 */
export const alt = `${clinic.name} — veterinary care`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  const brand = content.meta.brandColor ?? "#16216a";
  const accent = content.meta.accentColor ?? "#e8843a";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: `linear-gradient(135deg, ${brand} 0%, #0b1220 100%)`,
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "18px",
              height: "18px",
              borderRadius: "9999px",
              background: accent,
            }}
          />
          <div
            style={{
              fontSize: "26px",
              letterSpacing: "4px",
              textTransform: "uppercase",
              opacity: 0.85,
            }}
          >
            {clinic.county ? `Veterinary care · ${clinic.county}` : "Veterinary care"}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: "76px", fontWeight: 700, lineHeight: 1.05 }}>
            {clinic.name}
          </div>
          <div style={{ marginTop: "20px", fontSize: "32px", opacity: 0.9, maxWidth: "900px" }}>
            {content.meta.ogDescription}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "28px", fontSize: "28px" }}>
          {reviews.count > 0 && (
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              {/* diamond instead of a ★ glyph: avoids a dynamic font fetch */}
              <div
                style={{
                  width: "16px",
                  height: "16px",
                  background: accent,
                  transform: "rotate(45deg)",
                }}
              />
              <span>
                Rated {reviews.rating}/5 from {reviews.count.toLocaleString()}+ reviews
              </span>
            </div>
          )}
          <div style={{ opacity: 0.8 }}>{clinic.phone.main}</div>
        </div>
      </div>
    ),
    size,
  );
}
