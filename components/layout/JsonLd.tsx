import { faqs } from "@/lib/content";
import { site, siteUrl } from "@/lib/site";

/** Structured data built only from facts present in the original page. */
export default function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: site.name,
        url: `${siteUrl}/`,
        logo: `${siteUrl}${site.logo}`,
        email: site.email,
        telephone: site.phone,
        description: site.description,
        address: {
          "@type": "PostalAddress",
          streetAddress: "Cha-70, 70/A, Rupayan Millennium Square (9A), Progoti Sharoni, North Badda, Gulshan",
          addressLocality: "Dhaka",
          postalCode: "1212",
          addressCountry: "BD",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: `${siteUrl}/`,
        name: site.name,
        inLanguage: "en",
        publisher: { "@id": `${siteUrl}/#organization` },
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
