import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import {
  baseMetadata,
  publisherName,
  shortSiteDescription,
  siteUrl,
  summitfeedOrganizationId,
  summitfeedUrl,
  websiteId,
} from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  ...baseMetadata,
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "16x16 32x32 48x48" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/favicon.svg",
    apple: "/apple-icon.png",
  },
  verification: {
    google: "MNfPzAsS8gQ8y6aAgeNA3fcxex6NB52Vedcm8ajTUVs",
    other: {
      "msvalidate.01": "0CA366194B957ADC4BCE3905409C9F93",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased" data-scroll-behavior="smooth">
      <body className="min-h-full flex flex-col">
        <JsonLd
          jsonLd={[
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": summitfeedOrganizationId,
              name: publisherName,
              alternateName: "SUMMITFEED",
              url: summitfeedUrl,
              founder: {
                "@type": "Person",
                name: "이승찬",
              },
              taxID: "884-73-00630",
              brand: {
                "@type": "Brand",
                name: "Clinic GEO",
                url: siteUrl,
                logo: `${siteUrl}/icon.png`,
              },
              logo: `${siteUrl}/icon.png`,
              makesOffer: [
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "병원 GEO 최적화", serviceType: "GEO Optimization" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "네이버 플레이스 운영", serviceType: "Naver Place Management" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "블로그 키워드 상위노출", serviceType: "Blog SEO" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "SEO·AEO 최적화", serviceType: "SEO/AEO Optimization" } },
              ],
            },
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": websiteId,
              name: "Clinic GEO",
              url: siteUrl,
              inLanguage: "ko-KR",
              description: shortSiteDescription,
              about: "병의원 GEO 서비스와 진료별 실무 기준",
              publisher: {
                "@id": summitfeedOrganizationId,
              },
              creator: {
                "@id": summitfeedOrganizationId,
              },
              copyrightHolder: {
                "@id": summitfeedOrganizationId,
              },
            },
          ]}
        />
        {children}
      </body>
    </html>
  );
}
