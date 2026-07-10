import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArticleCard } from "@/components/ArticleCard";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { categories, posts } from "@/lib/posts";
import { buildMetadata } from "@/lib/seo";

const POSTS_PER_PAGE = 6;

const metrics = [
  { label: "주요 AI 채널", value: "4", detail: "ChatGPT, Gemini, Perplexity, Claude" },
  { label: "진료과 카테고리", value: "6", detail: "병원, 치과, 피부과, 정형외과, 내과, 성형외과" },
  { label: "콘텐츠 기준", value: "GEO", detail: "AI 인용과 검색 의도를 함께 고려" },
];

const processSteps = [
  "검색 질문과 진료과별 의도를 먼저 분류합니다.",
  "AI가 인용하기 쉬운 정의, 기준, 비교 구조로 정리합니다.",
  "의료·광고 표현을 점검하며 안전한 정보형 콘텐츠로 발행합니다.",
];

type HomeProps = {
  searchParams?: Promise<{
    page?: string | string[];
  }>;
};

export const metadata: Metadata = buildMetadata(
  "/",
  "Clinic GEO | 병의원 GEO",
  "Clinic GEO는 병의원과 진료과별 AI 검색 최적화 전략을 정리하는 SUMMITFEED의 GEO 콘텐츠 사이트입니다.",
);

function resolvePage(pageParam: string | string[] | undefined, totalPages: number) {
  const pageValue = Array.isArray(pageParam) ? pageParam[0] : pageParam;
  const parsedPage = Number.parseInt(pageValue ?? "1", 10);
  const safePage = Number.isFinite(parsedPage) ? parsedPage : 1;

  return Math.min(Math.max(safePage, 1), totalPages);
}

function pageHref(page: number) {
  return page === 1 ? "/" : `/?page=${page}`;
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const publishedPosts = posts
    .filter((post) => post.published)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  const totalPages = Math.max(1, Math.ceil(publishedPosts.length / POSTS_PER_PAGE));
  const currentPage = resolvePage(params?.page, totalPages);
  const pageStart = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = publishedPosts.slice(pageStart, pageStart + POSTS_PER_PAGE);
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="min-h-screen bg-[#f7f8fb] text-slate-950">
      <Header />
      <JsonLd
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Clinic GEO by SUMMITFEED",
          description: "병의원과 진료과별 AI 검색 최적화 GEO 콘텐츠 사이트",
          url: "https://clinicgeo.co.kr",
        }}
      />
      <main>
        <section className="relative min-h-[620px] overflow-hidden bg-slate-950 text-white md:min-h-[720px]">
          <Image
            src="/clinicgeo-dentist-monitor-hero.png"
            alt="치과 진료실에서 Clinic GEO 화면을 확인하는 모습"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/76 to-slate-950/20" />
          <div className="relative mx-auto flex min-h-[620px] max-w-6xl flex-col justify-center px-6 py-16 md:min-h-[720px] md:py-24">
            <p className="w-fit rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-sm font-semibold text-white/90 backdrop-blur">
              Clinic GEO by SUMMITFEED
            </p>
            <h1 className="mt-6 max-w-4xl break-keep text-5xl font-semibold leading-tight text-white sm:text-6xl lg:text-7xl">
              병의원 GEO
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/78">
              Clinic GEO는 병원, 치과, 피부과, 정형외과, 내과, 성형외과처럼 진료과별로 달라지는 AI 검색 질문을
              인용하기 쉬운 GEO 콘텐츠 구조로 정리합니다.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="#articles"
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-orange-100"
              >
                최신 GEO 아티클 보기
              </Link>
              <Link
                href="/blog"
                className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                전체 아티클
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto grid max-w-6xl gap-4 px-6 py-10 md:grid-cols-3">
            {metrics.map((metric) => (
              <div key={metric.label} className="rounded-lg border border-slate-200 bg-white p-6">
                <p className="text-sm font-semibold text-slate-500">{metric.label}</p>
                <p className="mt-3 text-4xl font-semibold text-slate-950">{metric.value}</p>
                <p className="mt-3 text-sm leading-6 text-slate-600">{metric.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:py-20">
          <div>
            <p className="text-sm font-semibold uppercase text-orange-600">GEO Landing</p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight text-slate-950 sm:text-4xl">
              아티클 허브보다 먼저, 병·의원 GEO의 기준을 보여줍니다.
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-600">
              메인 화면은 단순한 목록이 아니라 Clinic GEO가 어떤 관점으로 의료 분야 AI 검색을 다루는지 보여주는
              랜딩 구조로 정리했습니다. 방문자는 서비스 방향을 먼저 이해하고, 바로 아래에서 발행된 아티클을
              이어서 확인할 수 있습니다.
            </p>
          </div>
          <div className="grid gap-3">
            {processSteps.map((step, index) => (
              <div key={step} className="flex gap-4 rounded-lg border border-slate-200 bg-white p-5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-950 text-sm font-semibold text-white">
                  {index + 1}
                </span>
                <p className="pt-1 text-base leading-7 text-slate-700">{step}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-y border-slate-200 bg-white">
          <div className="mx-auto max-w-6xl px-6 py-12">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase text-orange-600">Categories</p>
                <h2 className="mt-3 text-3xl font-semibold text-slate-950">진료과별 GEO 주제</h2>
              </div>
              <p className="max-w-xl text-sm leading-6 text-slate-600">
                발행되는 아티클은 진료과별 검색 의도에 맞춰 분류됩니다. 필요한 주제만 골라 볼 수 있도록 카테고리
                진입점을 유지했습니다.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/category/${category.slug}`}
                  className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-orange-300 hover:bg-orange-50 hover:text-orange-700"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="articles" className="mx-auto max-w-6xl px-6 py-16">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase text-orange-600">Latest Articles</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">최신 GEO 아티클</h2>
            </div>
            <p className="text-sm font-medium text-slate-500">
              {publishedPosts.length}개 중 {paginatedPosts.length}개 표시
            </p>
          </div>

          {paginatedPosts.length === 0 ? (
            <div className="mt-10 rounded-lg border border-dashed border-slate-300 bg-white p-10 text-center text-slate-600">
              아직 발행된 아티클이 없습니다.
            </div>
          ) : (
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {paginatedPosts.map((post) => (
                <ArticleCard key={post.slug} post={post} />
              ))}
            </div>
          )}

          {totalPages > 1 ? (
            <nav className="mt-12 flex justify-center gap-2" aria-label="아티클 페이지">
              {pageNumbers.map((page) => {
                const isActive = page === currentPage;

                return (
                  <Link
                    key={page}
                    href={pageHref(page)}
                    aria-current={isActive ? "page" : undefined}
                    className={
                      isActive
                        ? "flex h-10 min-w-10 items-center justify-center rounded-full bg-slate-950 px-4 text-sm font-semibold text-white"
                        : "flex h-10 min-w-10 items-center justify-center rounded-full border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:border-orange-300 hover:text-orange-700"
                    }
                  >
                    {page}
                  </Link>
                );
              })}
            </nav>
          ) : null}
        </section>
      </main>
      <Footer />
    </div>
  );
}
