import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { JsonLd } from "@/components/JsonLd";
import { baseMetadata } from "@/lib/seo";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  ...baseMetadata,
  title: "Clinic GEO | 병·의원 GEO 아티클 허브",
  description:
    "Clinic GEO는 SUMMITFEED가 운영하는 병·의원 전용 AI 검색 최적화 아티클 허브입니다. 병원 GEO, 치과 GEO, 피부과 GEO, 정형외과 GEO, 내과 GEO, 성형외과 GEO 전략을 정리합니다.",
  verification: {
    google: "MNfPzAsS8gQ8y6aAgeNA3fcxex6NB52Vedcm8ajTUVs",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <JsonLd
          jsonLd={[
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "SUMMITFEED",
              alternateName: "Clinic GEO",
              url: "https://clinicgeo.co.kr",
              description: "SUMMITFEED가 운영하는 병·의원 전용 GEO 아티클 허브",
            },
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Clinic GEO by SUMMITFEED",
              url: "https://clinicgeo.co.kr",
              inLanguage: "ko-KR",
              about: "병·의원 전용 AI 검색 최적화, GEO, AI 인용률",
            },
          ]}
        />
        {children}
      </body>
    </html>
  );
}
