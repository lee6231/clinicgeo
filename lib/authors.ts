import {
  publisherName,
  siteUrl,
  summitfeedOrganizationId,
  summitfeedUrl,
} from "@/lib/seo";

export const clinicGeoEditorialTeam = {
  slug: "clinicgeo-editorial-team",
  name: "Clinic GEO 편집팀",
  alternateNames: [
    "클리닉GEO 편집팀",
    "SUMMITFEED Clinic GEO 운영팀",
    "써밋피드(SUMMITFEED) · Clinic GEO 운영팀",
  ],
  pathname: "/authors/clinicgeo-editorial-team",
  url: `${siteUrl}/authors/clinicgeo-editorial-team`,
  id: `${siteUrl}/authors/clinicgeo-editorial-team#organization`,
  description:
    "Clinic GEO 편집팀은 써밋피드(SUMMITFEED)의 병의원 GEO 실무 조직으로, 공개 자료를 바탕으로 병원 마케팅·검색 구조·AI 인용 관련 콘텐츠를 작성하고 갱신합니다.",
  defaultBasis:
    "검색엔진·AI 플랫폼 공식 문서와 공개적으로 재확인 가능한 자료를 우선하며, 확인하지 못한 내용은 추정하지 않습니다.",
} as const;

export function resolveArticleAuthor() {
  return clinicGeoEditorialTeam;
}

export function buildClinicGeoEditorialTeamJsonLd() {
  return {
    "@type": "Organization",
    "@id": clinicGeoEditorialTeam.id,
    name: clinicGeoEditorialTeam.name,
    alternateName: [...clinicGeoEditorialTeam.alternateNames],
    url: clinicGeoEditorialTeam.url,
    description: clinicGeoEditorialTeam.description,
    logo: `${siteUrl}/icon.png`,
    parentOrganization: {
      "@type": "Organization",
      "@id": summitfeedOrganizationId,
      name: publisherName,
      url: summitfeedUrl,
    },
  };
}
