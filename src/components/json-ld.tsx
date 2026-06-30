/**
 * Renders a JSON-LD structured-data block. Server component — the script is in
 * the initial HTML, exactly what crawlers want. Pass an object from `lib/seo`.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Structured data is our own, derived from site data — safe to inline.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
