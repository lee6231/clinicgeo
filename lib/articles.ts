import fs from "fs";
import path from "path";

export type ArticleQuickAnswer = {
  definition_sentence: string;
  framing_sentence: string;
  selection_criteria: string;
  conclusion_sentence: string;
  sources?: string[];
};

export type ArticleDataCard = {
  title: string;
  body: string;
};

export type ArticleSection = {
  heading: string;
  paragraphs: Array<{ text: string; sources?: string[] }>;
  table?: {
    caption?: string;
    columns?: string[];
    rows?: string[][];
    note?: string;
    sources?: string[];
  } | null;
};

export type ArticleConclusion = {
  heading: string;
  paragraphs: string[];
};

export type ArticleFaq = {
  question: string;
  answer: string;
  sources?: string[];
};

export type ArticleInternalLink =
  | string
  | {
      label: string;
      url: string;
      description?: string;
    };

export type Article = {
  title: string;
  slug: string;
  categorySlug: string;
  categoryName: string;
  focus_keyword: string;
  meta_description: string;
  quick_answer: ArticleQuickAnswer;
  data_cards: ArticleDataCard[];
  sections: ArticleSection[];
  conclusion: ArticleConclusion;
  faqs: ArticleFaq[];
  tags: string[];
  references?: string[];
  caution_checklist: string[];
  internal_links?: ArticleInternalLink[];
  publishedAt: string;
  updatedAt?: string;
  published: boolean;
};

const articlesDirectory = path.join(process.cwd(), "content", "articles");

function readArticleFromFile(filePath: string): Article | null {
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const raw = fs.readFileSync(filePath, "utf8");
  const parsed = JSON.parse(raw) as Article;

  return parsed;
}

export function getAllArticles(): Article[] {
  if (!fs.existsSync(articlesDirectory)) {
    return [];
  }

  return fs
    .readdirSync(articlesDirectory)
    .filter((fileName) => fileName.endsWith(".json"))
    .map((fileName) => readArticleFromFile(path.join(articlesDirectory, fileName)))
    .filter((article): article is Article => Boolean(article))
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getPublishedArticles(): Article[] {
  return getAllArticles().filter((article) => article.published);
}

export function getArticleBySlug(slug: string): Article | null {
  return getAllArticles().find((article) => article.slug === slug) ?? null;
}
