import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { ArticleRenderer } from "@/components/ArticleRenderer";
import { posts } from "@/lib/posts";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((item) => item.slug === slug);

  if (!post || !post.published) {
    return buildMetadata(`/blog/${slug}`, "아티클을 찾을 수 없습니다", "요청하신 아티클은 존재하지 않습니다.");
  }

  const article = post.article;
  const title = article?.title ?? post.title;
  const description = article?.meta_description ?? post.description;
  const canonicalUrl = `https://clinicgeo.co.kr/blog/${post.slug}`;

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

  if (!post || !post.published || !post.article) {
    notFound();
  }

  const article = post.article;
  const canonicalUrl = `https://clinicgeo.co.kr/blog/${post.slug}`;

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
        url: "https://clinicgeo.co.kr",
      },
      mainEntityOfPage: canonicalUrl,
      articleSection: article.categoryName,
      keywords: article.tags,
    },
    ...(article.faqs && article.faqs.length > 0
      ? [
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: article.faqs.map((item) => ({
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
        <header className="rounded-3xl border border-slate-200 bg-slate-50/80 p-8 shadow-sm sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">{article.categoryName}</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{article.title}</h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">{article.meta_description}</p>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-slate-500">
            <span>발행일 {article.publishedAt}</span>
            <span>발행 주체 Clinic GEO by SUMMITFEED</span>
            {article.updatedAt ? <span>수정일 {article.updatedAt}</span> : null}
          </div>
        </header>

        <ArticleRenderer article={article} />
      </main>
      <Footer />
    </div>
  );
}
