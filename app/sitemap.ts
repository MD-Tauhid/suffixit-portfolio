import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

// The site is a single page, so the sitemap has a single entry.
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${siteUrl}/`, changeFrequency: "monthly", priority: 1 }];
}
