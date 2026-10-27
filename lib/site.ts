/**
 * Site-wide constants. Every value below comes from the original index.html,
 * except `siteUrl`, which must be confirmed (see README).
 */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://suffixit.com").replace(/\/$/, "");

export const site = {
  name: "Suffix IT Limited",
  shortName: "Suffix IT",
  title: "Suffix IT Limited — Software Company in Bangladesh",
  description:
    "Suffix IT Limited is a software and ICT solution company in Bangladesh: ERP, HCM, Field Force, e-commerce, mobile apps and custom software.",
  email: "info@suffixit.com",
  phone: "+88 01958 424000",
  phoneHref: "tel:+8801958424000",
  address: "Cha-70, 70/A, Rupayan Millennium Square (9A), Progoti Sharoni, North Badda, Gulshan, Dhaka-1212, Bangladesh",
  logo: "/assets/img/suffix-logo.png",
  logoSize: { width: 420, height: 164 },
} as const;
