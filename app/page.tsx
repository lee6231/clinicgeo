import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ArticleCard } from "@/components/ArticleCard";
import { CategoryCard } from "@/components/CategoryCard";
import { JsonLd } from "@/components/JsonLd";
import { categories, posts } from "@/lib/posts";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata("/", "Clinic GEO | 병·의원 GEO 아티클 허브", "병·의원 전용 GEO 아티클 허브입니다.");

export default function Home() {
  const publishedPosts = posts.filter((post) => post.published);
  const latestPosts = [...publishedPosts]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, 6);

  return (
    <div className="min-h-screen bg-white text-slate-950">
      <Header />
      <JsonLd
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Clinic GEO by SUMMITFEED",
          description: "병·의원 전용 GEO 아티클 허브",
          url: "https://clinicgeo.co.kr",
        }}
      />
      <main>
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
            <p className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
              병·의원 GEO 아티클 허브
            </p>
            <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              병·의원 GEO 아티클 허브
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              Clinic GEO는 SUMMITFEED가 운영하는 병·의원 전용 AI 검색 최적화 아티클 허브입니다. 병원 GEO, 치과 GEO, 피부과 GEO, 정형외과 GEO, 내과 GEO, 성형외과 GEO 등 진료과별 AI 검색 대응 전략을 정리합니다.
            </p>
            <div className="mt-8">
              <Link href="/blog" className="inline-flex rounded-full bg-blue-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-800">
                전체 아티클 보기
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-16">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">Categories</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">진료과별 GEO 카테고리</h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {categories.map((category) => (
              <CategoryCard key={category.slug} category={category} />
            ))}
          </div>
        </section>

        <section className="border-t border-slate-200 bg-slate-50">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">Latest Articles</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight">최신 아티클</h2>
              </div>
              <Link href="/blog" className="text-sm font-semibold text-blue-700">
                전체 아티클 보기 →
              </Link>
            </div>

            {latestPosts.length === 0 ? (
              <div className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-600">
                아직 발행된 아티클이 없습니다.
              </div>
            ) : (
              <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {latestPosts.map((post) => (
                  <ArticleCard key={post.slug} post={post} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}