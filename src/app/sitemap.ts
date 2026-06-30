import type { MetadataRoute } from "next";
import { posts } from "@/lib/clinic";
import { abs } from "@/lib/seo";

/**
 * Sitemap — derived from the site's fixed routes + its blog posts, so adding a
 * post adds a sitemap entry automatically. Absolute URLs come from
 * `content.meta.baseUrl` via `abs()`.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "/", priority: 1.0, freq: "weekly" },
    { path: "/services", priority: 0.9, freq: "monthly" },
    { path: "/register", priority: 0.9, freq: "monthly" },
    { path: "/book", priority: 0.9, freq: "monthly" },
    { path: "/care-club", priority: 0.8, freq: "monthly" },
    { path: "/about", priority: 0.7, freq: "monthly" },
    { path: "/contact", priority: 0.7, freq: "monthly" },
    { path: "/blog", priority: 0.6, freq: "weekly" },
  ];

  const staticEntries: MetadataRoute.Sitemap = routes.map((r) => ({
    url: abs(r.path),
    lastModified: now,
    changeFrequency: r.freq,
    priority: r.priority,
  }));

  const postEntries: MetadataRoute.Sitemap = posts.map((p) => ({
    url: abs(`/blog/${p.slug}`),
    lastModified: new Date(p.date),
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  return [...staticEntries, ...postEntries];
}
