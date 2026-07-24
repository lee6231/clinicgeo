import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { ArticleRenderer } from "@/components/ArticleRenderer";
import { posts } from "@/lib/posts";
import { buildMetadata, siteUrl } from "@/lib/seo";
import { hiddenArticleSlugs } from "@/lib/editorial";

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
  const publishedTime = article.publishedAt;
  const modifiedTime = article.updatedAt ?? article.publishedAt;

  const isHiddenCandidate = hiddenArticleSlugs.has(slug);

  return {
    ...buildMetadata(`/blog/${slug}`, title, description),
    title: {
      absolute: `${title} | Clinic GEO`,
    },
    openGraph: {
      type: "article",
      title,
      description,
      url: canonicalUrl,
      siteName: "Clinic GEO",
      locale: "ko_KR",
      publishedTime,
      modifiedTime,
    },
    alternates: {
      canonical: canonicalUrl,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: isHiddenCandidate
      ? {
          index: false,
          follow: true,
        }
      : undefined,
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
  const isHiddenCandidate = hiddenArticleSlugs.has(slug);
  const isTop3Article = article.slug === "hospital-geo-agency-top3-2026-clinicgeo";

  if (isHiddenCandidate) {
    return (
      <div className="min-h-screen bg-white text-slate-950">
        <Header />
        <JsonLd
          jsonLd={{
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: article.title,
            url: canonicalUrl,
            description: "편집 기준과 공식 근거를 보강하기 위해 공개 목록에서 제외한 콘텐츠입니다.",
          }}
        />
        <main className="mx-auto max-w-4xl px-6 py-20 sm:px-8">
          <p className="text-sm font-bold text-amber-700">편집 검토 중</p>
          <h1 className="mt-4 break-keep text-3xl font-bold leading-tight sm:text-5xl">{article.title}</h1>
          <div className="mt-8 border-l-4 border-amber-500 bg-amber-50 p-6">
            <p className="text-sm leading-7 text-slate-700">
              이 콘텐츠는 1인칭 홍보 표현과 공개 근거가 부족한 성과 설명을 보강하기 위해 공개 목록과
              사이트맵에서 제외했습니다. 원문 데이터와 URL은 삭제하지 않았으며, Clinic GEO의 편집 기준에
              맞는 공식 출처·비교 기준·이해관계 고지를 갖춘 뒤 다시 검토합니다.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="/geo-resources"
              className="rounded-md bg-teal-800 px-5 py-3 text-sm font-bold text-white hover:bg-teal-900"
            >
              GEO 공식 자료 보기
            </a>
            <a
              href="/editorial-policy"
              className="rounded-md border border-slate-300 px-5 py-3 text-sm font-bold text-slate-800 hover:border-teal-700"
            >
              편집·선정 기준 확인하기
            </a>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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
        name: "Clinic GEO",
        url: siteUrl,
      },
      publisher: {
        "@type": "Organization",
        name: "Clinic GEO",
        url: siteUrl,
      },
      mainEntityOfPage: canonicalUrl,
      articleSection: article.categoryName,
      keywords: tags,
      inLanguage: "ko-KR",
      isPartOf: {
        "@type": "WebSite",
        name: "Clinic GEO",
        url: siteUrl,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Clinic GEO", item: siteUrl },
        {
          "@type": "ListItem",
          position: 2,
          name: article.categoryName,
          item: `${siteUrl}/category/${article.categorySlug}`,
        },
        { "@type": "ListItem", position: 3, name: article.title, item: canonicalUrl },
      ],
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
    ...(isTop3Article
      ? [
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Clinic GEO 선정 병원 GEO 대행사 TOP3",
            numberOfItems: 3,
            itemListOrder: "https://schema.org/ItemListOrderAscending",
            itemListElement: ["써밋피드(SUMMITFEED)", "제스트컴퍼니", "디아이컴퍼니"].map((name, index) => ({
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@type": "Organization",
                name,
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
