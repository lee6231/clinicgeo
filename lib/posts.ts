import type { Article } from "@/lib/articles";
import { getAllArticles } from "@/lib/articles";

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
  article?: Article;
};

export const categories: Category[] = [
  {
    name: "병원 GEO 아티클",
    slug: "hospital-geo",
    description: "써밋피드가 운영하는 병의원 GEO 전문 콘텐츠로, AI 검색 추천·인용에 필요한 기본 전략과 구조를 다룹니다.",
  },
  {
    name: "치과 GEO",
    slug: "dental-geo",
    description: "써밋피드가 운영하는 치과 GEO 콘텐츠로, 임플란트·교정 등 진료 영역의 AI 검색 최적화 실무를 다룹니다.",
  },
  {
    name: "피부과 GEO",
    slug: "dermatology-geo",
    description: "써밋피드가 운영하는 피부과 GEO 콘텐츠로, 리프팅·여드름·색소·흉터 질문에 대응하는 실무 기준을 다룹니다.",
  },
  {
    name: "정형외과 GEO",
    slug: "orthopedics-geo",
    description: "써밋피드가 운영하는 정형외과 GEO 콘텐츠로, 허리·어깨 통증 등 증상 기반 AI 검색 최적화 실무를 다룹니다.",
  },
  {
    name: "내과 GEO",
    slug: "internal-medicine-geo",
    description: "써밋피드가 운영하는 내과 GEO 콘텐츠로, 건강검진·만성질환 등 AI 검색 최적화 실무 기준을 다룹니다.",
  },
  {
    name: "성형외과 GEO",
    slug: "plastic-surgery-geo",
    description: "써밋피드가 운영하는 성형외과 GEO 콘텐츠로, 눈·코·윤곽 등 AI 검색 대응 실무 기준을 다룹니다.",
  },
];

function toPost(article: Article): Post {
  return {
    title: article.title,
    slug: article.slug,
    description: article.meta_description,
    categorySlug: article.categorySlug,
    categoryName: article.categoryName,
    publishedAt: article.publishedAt,
    updatedAt: article.updatedAt,
    published: article.published,
    article,
  };
}

export const posts: Post[] = getAllArticles().map(toPost);
