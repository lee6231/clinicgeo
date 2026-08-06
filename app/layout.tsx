import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { baseMetadata, siteUrl } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  ...baseMetadata,
  title: "Clinic GEO | 병원·치과 선택과 GEO 공식 자료",
  description:
    "Clinic GEO는 병원·치과 선택 기준과 검색엔진·AI 플랫폼의 GEO 공식 자료를 정리하는 편집형 정보 사이트입니다.",
  icons: {
    icon: "/favicon.ico",
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
              about: "병원·치과 선택 기준과 GEO 공식 자료",
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
