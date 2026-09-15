export type Category = {
  slug: string;
  name: string;
  description: string;
  parentSlug?: string;
};

export const categories: Category[] = [
  {
    slug: "hospital-geo",
    name: "병원 GEO 인사이트",
    description:
      "써밋피드가 운영하는 병원 GEO 대분류 콘텐츠로, 진료과를 넘어선 병의원 GEO 전략과 대행사 선택, AI 인용 측정 기준을 다룹니다.",
  },
  {
    slug: "orthopedics-geo",
    name: "정형외과 GEO",
    description:
      "써밋피드가 운영하는 정형외과 GEO 콘텐츠로, 허리·어깨 통증 등 증상 기반 AI 검색 최적화 실무를 다룹니다.",
    parentSlug: "hospital-geo",
  },
  {
    slug: "dermatology-geo",
    name: "피부과 GEO",
    description:
      "써밋피드가 운영하는 피부과 GEO 콘텐츠로, 리프팅·여드름·색소·흉터 질문에 대응하는 실무 기준을 다룹니다.",
    parentSlug: "hospital-geo",
  },
  {
    slug: "dental-geo",
    name: "치과 GEO",
    description:
      "써밋피드가 운영하는 치과 GEO 콘텐츠로, 임플란트·교정 등 진료 영역의 AI 검색 최적화 실무를 다룹니다.",
    parentSlug: "hospital-geo",
  },
  {
    slug: "plastic-surgery-geo",
    name: "성형외과 GEO",
    description:
      "써밋피드가 운영하는 성형외과 GEO 콘텐츠로, 눈·코·윤곽 등 AI 검색 대응 실무 기준을 다룹니다.",
    parentSlug: "hospital-geo",
  },
];

export function getCategoryBySlug(slug: string): Category | null {
  return categories.find((category) => category.slug === slug) ?? null;
}

export function getCategoryName(slug: string): string {
  return getCategoryBySlug(slug)?.name ?? slug;
}

export function getChildCategories(parentSlug: string): Category[] {
  return categories.filter((category) => category.parentSlug === parentSlug);
}

export function getParentCategory(slug: string): Category | null {
  const category = getCategoryBySlug(slug);
  return category?.parentSlug ? getCategoryBySlug(category.parentSlug) : null;
}

/**
 * For a child category, its siblings (same parent, excluding itself).
 * For a parent category (no parentSlug), its own children.
 */
export function getRelatedCategories(slug: string): Category[] {
  const category = getCategoryBySlug(slug);
  if (!category) return [];

  if (category.parentSlug) {
    return categories.filter(
      (item) => item.parentSlug === category.parentSlug && item.slug !== slug,
    );
  }

  return getChildCategories(slug);
}
