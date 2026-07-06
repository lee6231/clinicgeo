export type Category = {
  name: string;
  slug: string;
  description: string;
};

export type Post = {
  title: string;
  slug: string;
  description: string;
  categorySlug: string;
  categoryName: string;
  publishedAt: string;
  updatedAt?: string;
  published: boolean;
  body?: string;
  faq?: {
    question: string;
    answer: string;
  }[];
};

export const categories: Category[] = [
  {
    name: "병원 GEO 아티클",
    slug: "hospital-geo",
    description: "병원이 AI 검색에서 추천·인용되기 위해 필요한 기본 전략과 구조를 다룹니다.",
  },
  {
    name: "치과 GEO",
    slug: "dental-geo",
    description: "임플란트, 교정, 라미네이트 등 치과 진료 영역의 AI 검색 최적화 전략을 다룹니다.",
  },
  {
    name: "피부과 GEO",
    slug: "dermatology-geo",
    description: "리프팅, 여드름, 색소, 흉터 등 피부과 검색 질문에 대응하는 GEO 전략을 다룹니다.",
  },
  {
    name: "정형외과 GEO",
    slug: "orthopedics-geo",
    description: "허리통증, 어깨통증, 도수치료 등 증상 기반 AI 검색 최적화 전략을 다룹니다.",
  },
  {
    name: "내과 GEO",
    slug: "internal-medicine-geo",
    description: "건강검진, 만성질환, 소화기, 호흡기 등 내과 영역의 AI 검색 최적화 전략을 다룹니다.",
  },
  {
    name: "성형외과 GEO",
    slug: "plastic-surgery-geo",
    description: "눈성형, 코성형, 안면윤곽, 지방흡입 등 성형외과 AI 검색 대응 전략을 다룹니다.",
  },
];

export const posts: Post[] = [];