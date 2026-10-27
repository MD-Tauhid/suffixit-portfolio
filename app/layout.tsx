import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { site, siteUrl } from "@/lib/site";

// Self-hosted copies of the original Google Fonts (Plus Jakarta Sans 400-800, Instrument Serif italic).
const jakarta = localFont({
  src: "./fonts/plus-jakarta-sans-latin-wght-normal.woff2",
  weight: "200 800",
  variable: "--font-jakarta",
  display: "swap",
});
const serif = localFont({
  src: "./fonts/instrument-serif-latin-400-italic.woff2",
  weight: "400",
  style: "italic",
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: site.title,
  description: site.description,
  applicationName: site.shortName,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  icons: { icon: site.logo },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title: site.title,
    description: site.description,
    images: [{ url: site.logo, ...site.logoSize, alt: site.shortName }],
  },
  twitter: {
    card: "summary",
    title: site.title,
    description: site.description,
    images: [site.logo],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jakarta.variable} ${serif.variable}`}>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
