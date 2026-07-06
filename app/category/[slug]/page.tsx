import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ArticleCard } from "@/components/ArticleCard";
import { JsonLd } from "@/components/JsonLd";
import { categories, posts } from "@/lib/posts";
import { buildMetadata } from "@/lib/seo";

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

  const categoryPosts = posts.filter((post) => post.published && post.categorySlug === slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: category.name,
    description: category.description,
    url: `https://clinicgeo.co.kr/category/${category.slug}`,
    itemListElement: categoryPosts.map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: post.title,
      url: `https://clinicgeo.co.kr/blog/${post.slug}`,
    })),
  };

  return (
    <div className="min-h-screen bg-white text-slate-950">
      <Header />
      <JsonLd jsonLd={jsonLd} />
      <main className="mx-auto max-w-6xl px-6 py-16">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">Category</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{category.name}</h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">{category.description}</p>
        </div>

        {categoryPosts.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-slate-600">
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
          <Link href="/blog" className="text-sm font-semibold text-blue-700">
            전체 아티클 보기 →
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
