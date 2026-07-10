import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { ArticleRenderer } from "@/components/ArticleRenderer";
import { posts } from "@/lib/posts";
import { buildMetadata, siteUrl } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((item) => item.slug === slug);

  if (!post || post.published !== true || !post.article) {
    return buildMetadata(`/blog/${slug}`, "아티클을 찾을 수 없습니다", "요청하신 아티클은 존재하지 않습니다.");
  }

  const article = post.article;
  const title = article?.title ?? post.title;
  const description = article?.meta_description ?? post.description;
  const canonicalUrl = `${siteUrl}/blog/${post.slug}`;

  return {
    ...buildMetadata(`/blog/${slug}`, title, description),
    openGraph: {
      type: "article",
      title,
      description,
      url: canonicalUrl,
      siteName: "Clinic GEO by SUMMITFEED",
      locale: "ko_KR",
    },
    alternates: {
      canonical: `/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find((item) => item.slug === slug);

  if (!post || post.published !== true || !post.article) {
    notFound();
  }

  const article = post.article;
  const canonicalUrl = `${siteUrl}/blog/${post.slug}`;
  const faqs = Array.isArray(article.faqs) ? article.faqs : [];
  const tags = Array.isArray(article.tags) ? article.tags : [];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: article.title,
      description: article.meta_description,
      datePublished: article.publishedAt,
      dateModified: article.updatedAt ?? article.publishedAt,
      author: {
        "@type": "Organization",
        name: "SUMMITFEED",
      },
      publisher: {
        "@type": "Organization",
        name: "SUMMITFEED",
        url: siteUrl,
      },
      mainEntityOfPage: canonicalUrl,
      articleSection: article.categoryName,
      keywords: tags,
    },
    ...(faqs.length > 0
      ? [
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
              },
            })),
          },
        ]
      : []),
  ];

  return (
    <div className="min-h-screen bg-white text-slate-950">
      <Header />
      <JsonLd jsonLd={jsonLd} />
      <main className="mx-auto flex max-w-5xl flex-col gap-8 px-6 py-16 sm:px-8 lg:px-10">
        <ArticleRenderer article={article} />
      </main>
      <Footer />
    </div>
  );
}
