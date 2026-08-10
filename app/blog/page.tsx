import type { Metadata } from "next";
import Link from "next/link";
import { ArticleCard } from "@/components/ArticleCard";
import { PageFrame } from "@/components/PageFrame";
import { isArticleListed } from "@/lib/editorial";
import { categories, posts } from "@/lib/posts";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(
  "/blog",
  "병원 GEO 블로그",
  "기존에 발행한 병원 GEO 아티클을 병원 공통, 정형외과, 피부과, 치과, 성형외과, 내과별로 모아 제공합니다.",
);

export default function BlogPage() {
  const publishedPosts = posts
    .filter((post) => post.published && isArticleListed(post.slug))
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

  return (
    <PageFrame tone="white">
      <main>
        <section className="border-b border-blue-100 bg-[#f4f8ff]">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:py-20">
            <p className="text-xs font-bold text-teal-700">HOSPITAL GEO BLOG</p>
            <h1 className="mt-4 text-4xl font-bold text-[#17365d] sm:text-5xl">병원 GEO 블로그</h1>
            <p className="mt-5 max-w-3xl break-keep text-base leading-8 text-slate-600 sm:text-lg">
              병원 공통 전략과 진료과별 AI 검색·인용 최적화 아티클을 분류해 제공합니다.
            </p>
          </div>
        </section>

        <section className="border-b border-slate-200 bg-white">
          <nav className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-5 py-5 sm:px-6" aria-label="GEO 블로그 진료과 분류">
            {categories.map((category) => (
              <Link key={category.slug} href={`/category/${category.slug}`} className="shrink-0 rounded-md border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700 hover:border-teal-700 hover:text-teal-800">
                {category.name}
              </Link>
            ))}
          </nav>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:py-20">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-2xl font-bold text-[#17365d]">전체 아티클</h2>
            <p className="text-sm text-slate-500">{publishedPosts.length}개 콘텐츠</p>
          </div>
          {publishedPosts.length === 0 ? (
            <div className="mt-8 border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-slate-600">아직 발행된 아티클이 없습니다.</div>
          ) : (
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {publishedPosts.map((post) => <ArticleCard key={post.slug} post={post} />)}
            </div>
          )}
        </section>
      </main>
    </PageFrame>
  );
}
