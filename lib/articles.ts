import fs from "fs";
import path from "path";
import { getCategoryName } from "@/lib/categories";

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

export type ArticleSectionParagraph =
  | string
  | {
      text: string;
      sources?: string[];
    };

export type ArticleTable = {
  id?: string;
  type?: string;
  caption?: string;
  headers?: string[];
  columns?: string[];
  rows?: string[][];
  note?: string;
  sources?: string[];
};

export type ArticleRichBlock = {
  type: "p" | "h3" | "table" | "ul" | "ol_check" | "inline_cta" | "legal_callout" | "block_cta";
  text?: string;
  id?: string;
  headers?: string[];
  rows?: string[][];
  items?: Array<
    | string
    | {
        label: string;
        text: string;
      }
  >;
  link?: {
    label: string;
    url: string;
  };
  link_label?: string;
  link_url?: string;
  heading?: string;
  body?: string;
  sub_text?: string;
};

export type ArticleRichSection = {
  heading: string;
  type?: string;
  blocks: ArticleRichBlock[];
};

export type ArticleSection = {
  heading: string;
  paragraphs: ArticleSectionParagraph[];
  table?: ArticleTable | null;
  table_ref?: string;
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
    }
  | {
      anchor: string;
      slug: string;
      position?: string;
    };

export type ArticleReference =
  | string
  | {
      title: string;
      url: string;
    };

export type Article = {
  title: string;
  h1?: string;
  metadata_title?: string;
  slug: string;
  publishAt?: string;
  categorySlug: string;
  categoryName: string;
  category?: string;
  display_category?: string;
  focus_keyword: string;
  meta_description: string;
  author?: string;
  quick_answer: ArticleQuickAnswer;
  summary_paragraphs?: string[];
  summary_label?: string;
  compact_layout?: boolean;
  data_cards_layout?: "two-by-two";
  visual_theme?: "white-blue";
  hide_cta?: boolean;
  caution_title?: string;
  presentation?: {
    summary_label?: string;
    theme?: "white-blue" | string;
    compact_layout?: boolean;
    show_table_of_contents?: boolean;
  };
  entity_connections?: Array<{
    entity: string;
    type: string;
    id?: string;
    relationship: "publisher" | "isPartOf" | "about" | "mentions";
  }>;
  editorial?: {
    author?: string;
    publisher?: string;
    site?: string;
    basis?: string;
    reviewedAt?: string;
  };
  data_cards: ArticleDataCard[];
  stat_strip?: Array<{
    value: string;
    label: string;
  }>;
  sections: ArticleSection[];
  rich_sections?: ArticleRichSection[];
  tables?: ArticleTable[];
  limits_note?: string;
  conclusion: ArticleConclusion;
  faqs: ArticleFaq[];
  author_box?: string[];
  tags: string[];
  references?: ArticleReference[];
  caution_checklist: string[];
  internal_links?: ArticleInternalLink[];
  verified_at?: string;
  revision_log?: string[];
  supplemental_json_ld?: Array<Record<string, unknown>>;
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

  return {
    ...parsed,
    categoryName: getCategoryName(parsed.categorySlug),
  };
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
