import type { MetadataRoute } from "next";
import { abs } from "@/lib/seo";

/** Allow everything, point crawlers at the sitemap. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: abs("/sitemap.xml"),
    host: abs("/"),
  };
}
