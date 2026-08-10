import type { DirectorySpecialtySlug } from "@/lib/regions";

export type HospitalEntity = {
  slug: string;
  name: string;
  specialtySlug: DirectorySpecialtySlug;
  specialtyName: string;
  regionSlug: string;
  regionName: string;
  districtSlug: string;
  districtName: string;
  address: string;
  phone?: string;
  officialWebsite?: string;
  summary: string;
  medicalServices: string[];
  doctors?: Array<{ name: string; role?: string }>;
  hours?: string[];
  amenities?: string[];
  relatedArticleSlugs: string[];
  verifiedAt: string;
  published: boolean;
  isExample?: boolean;
};

// 확인이 끝난 의료기관만 published: true로 공개합니다.
export const hospitalEntities: HospitalEntity[] = [];

export function getPublishedHospitalEntities() {
  return hospitalEntities.filter((hospital) => hospital.published);
}

export function getIndexableHospitalEntities() {
  return hospitalEntities.filter((hospital) => hospital.published && !hospital.isExample);
}

export function getHospitalEntitiesByLocation(
  specialtySlug: DirectorySpecialtySlug,
  regionSlug?: string,
  districtSlug?: string,
) {
  return getPublishedHospitalEntities().filter(
    (hospital) =>
      hospital.specialtySlug === specialtySlug &&
      (!regionSlug || hospital.regionSlug === regionSlug) &&
      (!districtSlug || hospital.districtSlug === districtSlug),
  );
}

export function getHospitalEntityBySlug(slug: string) {
  return getPublishedHospitalEntities().find((hospital) => hospital.slug === slug) ?? null;
}
