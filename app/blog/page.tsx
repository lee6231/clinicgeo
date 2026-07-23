import { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ArticleCard } from "@/components/ArticleCard";
import { buildMetadata } from "@/lib/seo";
import { posts } from "@/lib/posts";
import { isArticleListed } from "@/lib/editorial";

export const metadata: Metadata = buildMetadata(
  "/blog",
  "전체 콘텐츠",
  "Clinic GEO의 병원 선택 가이드와 GEO 공식 자료 관련 공개 콘텐츠 목록입니다.",
);

export default function BlogPage() {
  const publishedPosts = posts.filter((post) => post.published && isArticleListed(post.slug));

  return (
    <div className="min-h-screen bg-white text-slate-950">
      <Header />
      <main className="mx-auto max-w-6xl px-6 py-16">
        <div className="max-w-3xl">
          <p className="text-sm font-bold text-teal-800">콘텐츠 아카이브</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            공개 콘텐츠 목록
          </h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            병원 선택 기준과 GEO 공식 자료를 중심으로 편집·보강한 콘텐츠를 확인할 수 있습니다.
          </p>
        </div>

        {publishedPosts.length === 0 ? (
          <div className="mt-10 rounded-lg border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-slate-600">
            아직 발행된 아티클이 없습니다.
          </div>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {publishedPosts.map((post) => (
              <ArticleCard key={post.slug} post={post} />
            ))}
          </div>
        )}

        <div className="mt-10">
          <Link href="/" className="text-sm font-bold text-teal-900 underline underline-offset-4">
            Clinic GEO 홈으로 돌아가기
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
