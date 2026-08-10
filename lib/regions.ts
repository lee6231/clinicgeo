export type DirectorySpecialtySlug =
  | "orthopedics-geo"
  | "dermatology-geo"
  | "dental-geo"
  | "plastic-surgery-geo"
  | "internal-medicine-geo";

export type DirectorySpecialty = {
  slug: DirectorySpecialtySlug;
  name: string;
  description: string;
};

export type District = { slug: string; name: string };

export type Region = {
  slug: string;
  name: string;
  description: string;
  districts: District[];
};

export const directorySpecialties: DirectorySpecialty[] = [
  { slug: "orthopedics-geo", name: "정형외과", description: "척추·관절·통증 진료 정보를 지역별로 확인합니다." },
  { slug: "dermatology-geo", name: "피부과", description: "피부 질환과 미용 진료 정보를 지역별로 확인합니다." },
  { slug: "dental-geo", name: "치과", description: "임플란트·교정·보존 진료 정보를 지역별로 확인합니다." },
  { slug: "plastic-surgery-geo", name: "성형외과", description: "상담·수술·사후 관리 정보를 지역별로 확인합니다." },
  { slug: "internal-medicine-geo", name: "내과", description: "건강검진과 만성질환 진료 정보를 지역별로 확인합니다." },
];

const toDistricts = (items: string[][]): District[] => items.map(([slug, name]) => ({ slug, name }));

export const regions: Region[] = [
  {
    slug: "seoul",
    name: "서울",
    description: "25개 자치구별 병원 정보",
    districts: toDistricts([
      ["gangnam-gu", "강남구"], ["gangdong-gu", "강동구"], ["gangbuk-gu", "강북구"], ["gangseo-gu", "강서구"],
      ["gwanak-gu", "관악구"], ["gwangjin-gu", "광진구"], ["guro-gu", "구로구"], ["geumcheon-gu", "금천구"],
      ["nowon-gu", "노원구"], ["dobong-gu", "도봉구"], ["dongdaemun-gu", "동대문구"], ["dongjak-gu", "동작구"],
      ["mapo-gu", "마포구"], ["seodaemun-gu", "서대문구"], ["seocho-gu", "서초구"], ["seongdong-gu", "성동구"],
      ["seongbuk-gu", "성북구"], ["songpa-gu", "송파구"], ["yangcheon-gu", "양천구"], ["yeongdeungpo-gu", "영등포구"],
      ["yongsan-gu", "용산구"], ["eunpyeong-gu", "은평구"], ["jongno-gu", "종로구"], ["jung-gu", "중구"],
      ["jungnang-gu", "중랑구"],
    ]),
  },
  {
    slug: "daejeon",
    name: "대전",
    description: "5개 구별 병원 정보",
    districts: toDistricts([
      ["dong-gu", "동구"], ["jung-gu", "중구"], ["seo-gu", "서구"], ["yuseong-gu", "유성구"], ["daedeok-gu", "대덕구"],
    ]),
  },
  {
    slug: "daegu",
    name: "대구",
    description: "9개 구·군별 병원 정보",
    districts: toDistricts([
      ["jung-gu", "중구"], ["dong-gu", "동구"], ["seo-gu", "서구"], ["nam-gu", "남구"], ["buk-gu", "북구"],
      ["suseong-gu", "수성구"], ["dalseo-gu", "달서구"], ["dalseong-gun", "달성군"], ["gunwi-gun", "군위군"],
    ]),
  },
  {
    slug: "busan",
    name: "부산",
    description: "16개 구·군별 병원 정보",
    districts: toDistricts([
      ["jung-gu", "중구"], ["seo-gu", "서구"], ["dong-gu", "동구"], ["yeongdo-gu", "영도구"],
      ["busanjin-gu", "부산진구"], ["dongnae-gu", "동래구"], ["nam-gu", "남구"], ["buk-gu", "북구"],
      ["haeundae-gu", "해운대구"], ["saha-gu", "사하구"], ["geumjeong-gu", "금정구"], ["gangseo-gu", "강서구"],
      ["yeonje-gu", "연제구"], ["suyeong-gu", "수영구"], ["sasang-gu", "사상구"], ["gijang-gun", "기장군"],
    ]),
  },
  {
    slug: "gwangju",
    name: "광주",
    description: "5개 구별 병원 정보",
    districts: toDistricts([
      ["dong-gu", "동구"], ["seo-gu", "서구"], ["nam-gu", "남구"], ["buk-gu", "북구"], ["gwangsan-gu", "광산구"],
    ]),
  },
];

export function getDirectorySpecialty(slug: string) {
  return directorySpecialties.find((specialty) => specialty.slug === slug) ?? null;
}

export function getRegionBySlug(slug: string) {
  return regions.find((region) => region.slug === slug) ?? null;
}

export function getDistrictBySlug(regionSlug: string, districtSlug: string) {
  return getRegionBySlug(regionSlug)?.districts.find((district) => district.slug === districtSlug) ?? null;
}
