import type { Metadata } from "next";
import { categories } from "@/lib/posts";

export const siteUrl = "https://clinicgeo.co.kr";
export const baseMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Clinic GEO | 진료과별 병원 정보와 병원 GEO 블로그",
    template: "%s | Clinic GEO",
  },
  description:
    "Clinic GEO는 진료과별 병원 정보와 병원 GEO 아티클을 연결하는 병원 정보 허브입니다.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    siteName: "Clinic GEO",
    locale: "ko_KR",
    type: "website",
    title: "Clinic GEO | 진료과별 병원 정보와 병원 GEO 블로그",
    description:
      "정형외과, 피부과, 치과, 성형외과, 내과의 병원 정보와 GEO 아티클을 한곳에서 확인하세요.",
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
  const resolvedTitle = title ?? "진료과별 병원 정보와 병원 GEO 블로그";
  const resolvedDescription =
    description ??
    baseMetadata.description ??
    "Clinic GEO는 진료과별 병원 정보와 병원 GEO 아티클을 연결하는 정보 허브입니다.";

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
