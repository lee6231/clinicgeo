import type { Article } from "@/lib/articles";
import { getAllArticles } from "@/lib/articles";
import { getCategoryName } from "@/lib/categories";

export type { Category } from "@/lib/categories";
export {
  categories,
  getCategoryBySlug,
  getChildCategories,
  getParentCategory,
  getRelatedCategories,
} from "@/lib/categories";

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

function toPost(article: Article): Post {
  return {
    title: article.title,
    slug: article.slug,
    description: article.meta_description,
    categorySlug: article.categorySlug,
    categoryName: getCategoryName(article.categorySlug),
    publishedAt: article.publishedAt,
    updatedAt: article.updatedAt,
    published: article.published,
    article,
  };
}

export const posts: Post[] = getAllArticles().map(toPost);
