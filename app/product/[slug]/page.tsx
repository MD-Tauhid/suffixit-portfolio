import { notFound, permanentRedirect } from "next/navigation";
import { legacyProductSlugs } from "@/lib/products";
export const dynamicParams = false;
export function generateStaticParams() { return Object.keys(legacyProductSlugs).map(slug => ({ slug })); }
export default async function LegacyProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const destination = legacyProductSlugs[slug];
  if (!destination) notFound();
  permanentRedirect("/products/" + destination);
}
