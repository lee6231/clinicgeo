import fs from "fs";
import path from "path";

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

function readArticleJson(slug: string) {
  const filePath = path.join(process.cwd(), "content", "articles", `${slug}.json`);
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const raw = fs.readFileSync(filePath, "utf8");
  return JSON.parse(raw) as any;
}

function renderArticleBody(article: any) {
  if (!article) {
    return undefined;
  }

  const parts: string[] = [];

  function renderSection(section: any) {
    if (section.heading) {
      parts.push(`<h2>${section.heading}</h2>`);
    }

    if (section.paragraphs) {
      section.paragraphs.forEach((paragraph: any) => {
        if (paragraph.text) {
          parts.push(`<p>${paragraph.text}</p>`);
        }
      });
    }

    if (section.subsections) {
      section.subsections.forEach((subsection: any) => {
        if (subsection.heading) {
          parts.push(`<h3>${subsection.heading}</h3>`);
        }
        if (subsection.paragraphs) {
          subsection.paragraphs.forEach((paragraph: any) => {
            if (paragraph.text) {
              parts.push(`<p>${paragraph.text}</p>`);
            }
          });
        }
      });
    }
  }

  if (Array.isArray(article.sections)) {
    article.sections.forEach(renderSection);
  }

  if (article.conclusion) {
    if (article.conclusion.heading) {
      parts.push(`<h2>${article.conclusion.heading}</h2>`);
    }
    if (article.conclusion.paragraphs) {
      article.conclusion.paragraphs.forEach((paragraph: any) => {
        if (paragraph) {
          parts.push(`<p>${paragraph}</p>`);
        }
      });
    }
  }

  return parts.join("\n");
}

const publishedArticle = readArticleJson("hospital-geo-agency-selection-ai-citation");

export const posts: Post[] = [
  {
    title: publishedArticle?.title ?? "AI 검색 시대 병원 GEO 대행사 선택, 인용 구조 설계가 핵심인 이유",
    slug: "hospital-geo-agency-selection-ai-citation",
    description:
      publishedArticle?.meta_description ??
      "병원 GEO 대행사 추천 기준은 AI 인용률 측정, Schema 설계, 의료법 검수 역량. SUMMITFEED의 실시간 대시보드 관리 시스템과 차별점을 비교 분석합니다.",
    categorySlug: "hospital-geo",
    categoryName: "병원 GEO 아티클",
    publishedAt: "2026-07-06",
    published: true,
    body: renderArticleBody(publishedArticle),
    faq: publishedArticle?.faqs?.map((item: any) => ({
      question: item.question,
      answer: item.answer,
    })),
  },
];