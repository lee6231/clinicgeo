import { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ArticleCard } from "@/components/ArticleCard";
import { buildMetadata } from "@/lib/seo";
import { posts } from "@/lib/posts";

export const metadata: Metadata = buildMetadata("/blog", "전체 아티클", "Clinic GEO의 모든 발행된 아티클 목록입니다.");

export default function BlogPage() {
  const publishedPosts = posts.filter((post) => post.published);

  return (
    <div className="min-h-screen bg-white text-slate-950">
      <Header />
      <main className="mx-auto max-w-6xl px-6 py-16">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">Blog</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            발행된 아티클 목록
          </h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            Clinic GEO에서 발행된 병·의원 GEO 아티클을 확인할 수 있습니다.
          </p>
        </div>

        {publishedPosts.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-slate-600">
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
          <Link href="/" className="text-sm font-semibold text-blue-700">
            홈으로 돌아가기 →
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
