import type { Metadata } from "next";
import Script from "next/script";
import { siteContent } from "@/content/site-content";

import "./globals.css";

const metadataBase = new URL(siteContent.siteUrl);

export const metadata: Metadata = {
  metadataBase,
  title: siteContent.meta.title,
  description: siteContent.meta.description,
  icons: {
    icon: "/favicon.svg",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteContent.meta.title,
    description: siteContent.meta.description,
    url: "/",
    siteName: siteContent.brandName,
    type: "website",
    images: [
      {
        url: siteContent.meta.ogImageUrl,
        width: 1200,
        height: 630,
        alt: `${siteContent.brandName} marketing site preview`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteContent.meta.title,
    description: siteContent.meta.description,
    images: [siteContent.meta.ogImageUrl],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteContent.siteUrl}/#organization`,
      name: siteContent.brandName,
      url: siteContent.siteUrl,
      email: siteContent.cta.contactEmail,
      description: siteContent.meta.description,
    },
    {
      "@type": "ProfessionalService",
      "@id": `${siteContent.siteUrl}/#professional-service`,
      name: siteContent.brandName,
      url: siteContent.siteUrl,
      description: siteContent.meta.description,
      email: siteContent.cta.contactEmail,
      areaServed: "Global",
      knowsAbout: [
        "AI systems",
        "AI implementation",
        "Agency operations",
        "Workflow design",
        "Automation systems",
        "Client reporting",
        "Operational visibility",
      ],
      provider: {
        "@id": `${siteContent.siteUrl}/#organization`,
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="dns-prefetch" href="https://assets.calendly.com" />
        <link rel="dns-prefetch" href="https://calendly.com" />
        <link rel="preconnect" href="https://assets.calendly.com" crossOrigin="" />
        <link rel="preconnect" href="https://calendly.com" crossOrigin="" />
      </head>
      <body suppressHydrationWarning>
        {children}
        <Script
          id="structured-data"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
