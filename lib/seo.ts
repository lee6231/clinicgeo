import type { Metadata } from "next";
import { categories } from "@/lib/posts";

export const siteUrl = "https://www.clinicgeo.co.kr";
export const baseMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Clinic GEO | 병원·치과 선택과 GEO 공식 자료",
    template: "%s | Clinic GEO",
  },
  description:
    "Clinic GEO는 병원·치과 선택 기준과 검색엔진·AI 플랫폼의 GEO 공식 자료를 정리하는 편집형 정보 사이트입니다.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    siteName: "Clinic GEO",
    locale: "ko_KR",
    type: "website",
    title: "Clinic GEO | 병원·치과 선택과 GEO 공식 자료",
    description:
      "병원·치과 선택 기준과 검색엔진·AI 플랫폼의 GEO 공식 자료를 한곳에서 확인하세요.",
    url: siteUrl,
  },
  twitter: {
    card: "summary",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export function buildMetadata(pathname: string, title?: string, description?: string): Metadata {
  const url = new URL(pathname, siteUrl).toString();
  const resolvedTitle = title ?? "병원·치과 선택과 GEO 공식 자료";
  const resolvedDescription =
    description ??
    baseMetadata.description ??
    "Clinic GEO는 병원 선택 기준과 GEO 공식 자료를 정리하는 편집형 정보 사이트입니다.";

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
