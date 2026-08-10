import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { baseMetadata, siteUrl } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  ...baseMetadata,
  title: "Clinic GEO | 진료과별 병원 정보와 병원 GEO 블로그",
  description:
    "Clinic GEO는 정형외과, 피부과, 치과, 성형외과, 내과의 병원 정보와 관련 GEO 아티클을 연결하는 정보 허브입니다.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico",
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
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <JsonLd
          jsonLd={[
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": `${siteUrl}/#organization`,
              name: "Clinic GEO",
              url: siteUrl,
              logo: `${siteUrl}/icon.png`,
            },
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": `${siteUrl}/#website`,
              name: "Clinic GEO",
              url: siteUrl,
              inLanguage: "ko-KR",
              about: "진료과별 병원 정보와 병원 GEO 아티클",
              publisher: {
                "@id": `${siteUrl}/#organization`,
              },
            },
          ]}
        />
        {children}
      </body>
    </html>
  );
}
