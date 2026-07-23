import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ArticleCard } from "@/components/ArticleCard";
import { JsonLd } from "@/components/JsonLd";
import { categories, posts } from "@/lib/posts";
import { buildMetadata, siteUrl } from "@/lib/seo";
import { isArticleListed } from "@/lib/editorial";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const category = categories.find((item) => item.slug === slug);

  if (!category) {
    return buildMetadata(`/category/${slug}`, "카테고리를 찾을 수 없습니다", "요청하신 카테고리는 존재하지 않습니다.");
  }

  return buildMetadata(`/category/${slug}`, category.name, category.description);
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = categories.find((item) => item.slug === slug);

  if (!category) {
    notFound();
  }

  const categoryPosts = posts.filter(
    (post) => post.published && post.categorySlug === slug && isArticleListed(post.slug),
  );

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: category.name,
      description: category.description,
      url: `${siteUrl}/category/${category.slug}`,
      itemListElement: categoryPosts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: post.title,
        url: `${siteUrl}/blog/${post.slug}`,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "홈", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "전체 콘텐츠", item: `${siteUrl}/blog` },
        {
          "@type": "ListItem",
          position: 3,
          name: category.name,
          item: `${siteUrl}/category/${category.slug}`,
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-950">
      <Header />
      <JsonLd jsonLd={jsonLd} />
      <main className="mx-auto max-w-6xl px-6 py-16">
        <div className="max-w-3xl">
          <p className="text-sm font-bold text-teal-800">콘텐츠 분류</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{category.name}</h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">{category.description}</p>
        </div>

        {categoryPosts.length === 0 ? (
          <div className="mt-10 rounded-lg border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-slate-600">
            이 카테고리에는 아직 발행된 아티클이 없습니다.
          </div>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {categoryPosts.map((post) => (
              <ArticleCard key={post.slug} post={post} />
            ))}
          </div>
        )}

        <div className="mt-10">
          <Link href="/blog" className="text-sm font-bold text-teal-900 underline underline-offset-4">
            전체 콘텐츠 보기
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
