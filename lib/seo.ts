import type { Metadata } from "next";
import { categories } from "@/lib/posts";

export const siteUrl = "https://www.clinicgeo.co.kr";
export const ogImage = {
  url: "/clinicgeo-dentist-monitor-hero.png",
  width: 1680,
  height: 900,
  alt: "Clinic GEO by SUMMITFEED 병의원 GEO 콘텐츠 화면",
};

export const baseMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Clinic GEO | 병의원 GEO",
    template: "%s | Clinic GEO",
  },
  description:
    "Clinic GEO는 SUMMITFEED가 운영하는 병·의원 전용 AI 검색 최적화 GEO 콘텐츠 사이트입니다. 병원 GEO, 치과 GEO, 피부과 GEO, 정형외과 GEO, 내과 GEO, 성형외과 GEO 전략을 정리합니다.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    siteName: "Clinic GEO by SUMMITFEED",
    locale: "ko_KR",
    type: "website",
    title: "Clinic GEO | 병의원 GEO",
    description:
      "Clinic GEO는 SUMMITFEED가 운영하는 병·의원 전용 AI 검색 최적화 GEO 콘텐츠 사이트입니다. 병원 GEO, 치과 GEO, 피부과 GEO, 정형외과 GEO, 내과 GEO, 성형외과 GEO 전략을 정리합니다.",
    url: siteUrl,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    images: [ogImage.url],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export function buildMetadata(pathname: string, title?: string, description?: string): Metadata {
  const url = new URL(pathname, siteUrl).toString();
  const resolvedTitle = title ?? "Clinic GEO | 병의원 GEO";
  const resolvedDescription = description ?? baseMetadata.description ?? "Clinic GEO는 SUMMITFEED가 운영하는 병·의원 전용 AI 검색 최적화 GEO 콘텐츠 사이트입니다.";

  return {
    ...baseMetadata,
    title: resolvedTitle,
    description: resolvedDescription,
    alternates: {
      canonical: pathname,
    },
    openGraph: {
      ...baseMetadata.openGraph,
      title: resolvedTitle,
      description: resolvedDescription,
      url,
      images: [ogImage],
    },
    twitter: {
      ...baseMetadata.twitter,
      title: resolvedTitle,
      description: resolvedDescription,
      images: [ogImage.url],
    },
  };
}

export function categorySlugToName(slug: string) {
  return categories.find((category) => category.slug === slug)?.name ?? slug;
}
