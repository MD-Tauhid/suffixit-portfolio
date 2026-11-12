import type { MetadataRoute } from "next";
import { productDetails } from "@/lib/products";
import { serviceDetails } from "@/lib/services";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${siteUrl}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/career`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/services`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/products`, changeFrequency: "monthly", priority: 0.9 },
    ...productDetails.map(product => ({ url: `${siteUrl}/products/${product.slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...serviceDetails.map(service => ({ url: `${siteUrl}/services/${service.slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
    { url: `${siteUrl}/contact`, changeFrequency: "monthly", priority: 0.7 },
  ];
}
