import type { Metadata } from "next";
import { categories } from "@/lib/posts";

export const siteUrl = "https://clinicgeo.co.kr";

export const baseMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Clinic GEO | 병·의원 AI 검색 최적화",
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
    title: "Clinic GEO | 병·의원 AI 검색 최적화",
    description:
      "Clinic GEO는 SUMMITFEED가 운영하는 병·의원 전용 AI 검색 최적화 GEO 콘텐츠 사이트입니다. 병원 GEO, 치과 GEO, 피부과 GEO, 정형외과 GEO, 내과 GEO, 성형외과 GEO 전략을 정리합니다.",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export function buildMetadata(pathname: string, title?: string, description?: string): Metadata {
  const url = new URL(pathname, siteUrl).toString();
  const resolvedTitle = title ?? "Clinic GEO | 병·의원 AI 검색 최적화";
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
    },
    twitter: {
      ...baseMetadata.twitter,
      title: resolvedTitle,
      description: resolvedDescription,
    },
  };
}

export function categorySlugToName(slug: string) {
  return categories.find((category) => category.slug === slug)?.name ?? slug;
}
