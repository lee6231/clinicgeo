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
      "써밋피드가 운영하는 병원 GEO 콘텐츠로, 병의원 GEO 전략, 대행사 선택, AI 인용 측정 기준과 진료과별 실무를 함께 다룹니다.",
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
