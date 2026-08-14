import type { Metadata } from "next";
import { categories } from "@/lib/posts";

export const siteUrl = "https://clinicgeo.co.kr";
export const summitfeedUrl = "https://www.summitfeed.co.kr/";
export const summitfeedOrganizationId = `${summitfeedUrl}#organization`;
export const websiteId = `${siteUrl}/#website`;
export const publisherName = "써밋피드(SUMMITFEED)";
export const articlePublisherLabel = "써밋피드(SUMMITFEED) · Clinic GEO 운영팀";
export const siteDescription =
  "Clinic GEO는 써밋피드(SUMMITFEED)가 직접 운영하는 병의원 GEO 전문 사이트입니다. 병원 홈페이지 구조화, 정보성 콘텐츠와 엔티티 발행, 4개 AI 플랫폼 인용 측정, 네이버 채널 운영 기준을 제공합니다.";
export const shortSiteDescription =
  "써밋피드가 운영하는 병의원 GEO 전문 사이트. 홈페이지 구조화, 정보성 콘텐츠, AI 인용 측정과 네이버 채널 운영을 연결합니다.";

export const baseMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "병의원 GEO 서비스와 인사이트 | Clinic GEO by SUMMITFEED",
    template: "%s | Clinic GEO by SUMMITFEED",
  },
  description: siteDescription,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    siteName: "Clinic GEO",
    locale: "ko_KR",
    type: "website",
    title: "병의원 GEO 서비스와 인사이트 | Clinic GEO by SUMMITFEED",
    description: siteDescription,
    url: siteUrl,
  },
  twitter: {
    card: "summary",
    title: "병의원 GEO 서비스와 인사이트 | Clinic GEO by SUMMITFEED",
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export function buildMetadata(pathname: string, title?: string, description?: string): Metadata {
  const url = new URL(pathname, siteUrl).toString();
  const resolvedTitle = title ?? "병원별 GEO와 GEO 인사이트";
  const resolvedDescription =
    description ??
    baseMetadata.description ??
    siteDescription;

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
