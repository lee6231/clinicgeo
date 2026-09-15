import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { PageFrame } from "@/components/PageFrame";
import { isArticleListed } from "@/lib/editorial";
import { getChildCategories, getCategoryBySlug, posts } from "@/lib/posts";
import { buildMetadata, siteUrl } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(
  "/hospitals",
  "병원 GEO 칼럼",
  "정형외과, 피부과, 치과, 성형외과의 환자 질문과 AI 인용 구조를 진료과별 연재 칼럼으로 제공합니다.",
);

const BLUE_GRADIENT = "linear-gradient(155deg, #2563eb 0%, #1e3a8a 100%)";

const specialtyDescriptions: Record<string, string> = {
  "orthopedics-geo": "허리·목·관절 통증처럼 증상으로 시작되는 환자 질문과 검사·치료 정보를 연결합니다.",
  "dermatology-geo": "피부 질환과 미용 진료에서 환자가 확인하는 장비·시술·의료진 정보를 구조화합니다.",
  "dental-geo": "임플란트·교정·보존 진료의 진단 과정과 선택 기준을 질문 단위로 정리합니다.",
  "plastic-surgery-geo": "눈·코·윤곽과 재수술 질문에 필요한 상담·수술·사후 관리 정보를 연결합니다.",
};

const parentCategory = getCategoryBySlug("hospital-geo");
const specialtySeries = getChildCategories("hospital-geo").map((category, index) => ({
  slug: category.slug,
  name: category.name,
  number: String(index + 1).padStart(2, "0"),
  description: specialtyDescriptions[category.slug] ?? category.description,
}));

function formatDate(date: string) {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(date));
}

export default function HospitalsPage() {
  const publishedPosts = posts
    .filter((post) => post.published && isArticleListed(post.slug))
    .sort((a, b) => a.publishedAt.localeCompare(b.publishedAt));

  const series = specialtySeries.map((specialty) => ({
    ...specialty,
    articles: publishedPosts.filter((post) => post.categorySlug === specialty.slug),
  }));
  const parentArticles = parentCategory
    ? publishedPosts.filter((post) => post.categorySlug === parentCategory.slug)
    : [];
  const parentCollectionId = `${siteUrl}/category/hospital-geo#collection`;

  return (
    <PageFrame tone="white">
      <JsonLd
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "@id": parentCollectionId,
            name: parentCategory?.name ?? "병원 GEO 인사이트",
            description: "대분류인 병원 GEO 인사이트와 그 아래 진료과별 소분류 칼럼을 함께 발행하는 Clinic GEO 칼럼 허브",
            url: `${siteUrl}/hospitals`,
            hasPart: [
              { "@type": "CollectionPage", name: parentCategory?.name, url: `${siteUrl}/category/hospital-geo` },
              ...series.map((item) => ({
                "@type": "CollectionPage",
                name: item.name,
                url: `${siteUrl}/category/${item.slug}`,
              })),
            ],
          },
        ]}
      />

      <main>
        <section className="relative overflow-hidden border-b border-slate-200 bg-white">
          <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[#dbeafe]/60 blur-3xl" aria-hidden="true" />
          <div className="relative mx-auto max-w-4xl px-5 py-16 text-center sm:px-6 lg:py-20">
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[10px] font-bold tracking-[0.16em] text-[#2563eb]">
              <span>CLINIC GEO COLUMN</span>
            </div>
            <h1 className="mt-5 break-keep text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">병원 GEO 칼럼</h1>
            <p className="mx-auto mt-5 max-w-2xl break-keep text-base leading-8 text-slate-600">
              병원의 진료 정보와 환자 질문을 진료과별로 정리해 AI가 인용할 수 있는 구조로 연재합니다.
            </p>
            <dl className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 border-y border-slate-200 py-4 text-sm">
              <div>
                <dt className="text-[10px] font-bold tracking-[0.12em] text-[#2563eb]">STRUCTURE</dt>
                <dd className="mt-1 font-bold text-slate-900">대분류 1 · 소분류 5개 진료과</dd>
              </div>
              <div>
                <dt className="text-[10px] font-bold tracking-[0.12em] text-[#2563eb]">FORMAT</dt>
                <dd className="mt-1 font-bold text-slate-900">연재형 정보 칼럼</dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="relative overflow-hidden border-b border-slate-200" style={{ background: BLUE_GRADIENT }}>
          <div className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
          <div className="relative mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:py-12">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="flex items-center gap-3 text-[10px] font-bold tracking-[0.16em] text-[#bfdbfe]">
                  <span>대분류 · MAIN CATEGORY</span>
                </div>
                <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">{parentCategory?.name ?? "병원 GEO 인사이트"}</h2>
                <p className="mt-2 max-w-2xl break-keep text-sm leading-6 text-[#dbeafe]">
                  진료과를 넘어선 병원 GEO 전체 전략, 대행사 선택, AI 인용 측정 기준을 다루는 대분류 칼럼입니다. 아래 5개 진료과 칼럼은 이 대분류의 소분류입니다.
                </p>
              </div>
              <Link
                href="/category/hospital-geo"
                className="inline-flex w-fit shrink-0 items-center gap-3 rounded-md bg-white px-5 py-3 text-sm font-bold text-[#1d4ed8] transition hover:bg-[#eff6ff]"
              >
                {parentArticles.length > 0 ? `대분류 칼럼 ${parentArticles.length}편 보기` : "대분류 칼럼 보기"} <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>

        <section className="border-b border-slate-200 bg-slate-50">
          <nav className="mx-auto grid max-w-7xl gap-4 px-5 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-5" aria-label="진료별 GEO 시리즈">
            {series.map((item) => (
              <Link
                key={item.slug}
                href={`#series-${item.slug}`}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_24px_-14px_rgba(15,23,42,0.25)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_36px_-14px_rgba(37,99,235,0.35)]"
              >
                <span
                  className="absolute inset-x-0 top-0 h-1"
                  style={{ background: BLUE_GRADIENT }}
                  aria-hidden="true"
                />
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#2563eb]">SERIES {item.number}</span>
                  <span className="text-sm text-[#93c5fd] transition group-hover:translate-x-1 group-hover:text-[#2563eb]" aria-hidden="true">→</span>
                </div>
                <h2 className="mt-5 text-lg font-bold text-slate-900">{item.name}</h2>
                <p className="mt-2 text-xs text-slate-500">현재 {item.articles.length}편</p>
              </Link>
            ))}
          </nav>
        </section>

        <section className="relative mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:py-20">
          <div className="flex flex-col gap-4 border-b-2 border-slate-900 pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold tracking-[0.14em] text-[#2563eb]">소분류 · SERIES 01—05</p>
              <h2 className="mt-3 text-3xl font-bold text-slate-900">진료과별 연재 지면</h2>
            </div>
            <p className="max-w-xl break-keep text-sm leading-6 text-slate-500">한 편의 단편 글이 아니라 환자 질문, 병원 정보, AI 인용 구조가 순서대로 연결되는 연재 칼럼입니다.</p>
          </div>

          <div className="relative">
            {series.map((item) => (
              <section key={item.slug} id={`series-${item.slug}`} className="scroll-mt-24 border-b border-slate-200 py-10 lg:grid lg:grid-cols-[7rem_0.68fr_1.32fr] lg:gap-10">
                <div className="mb-5 flex items-baseline gap-3 lg:mb-0 lg:block lg:border-r lg:border-slate-200">
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-mono text-xs font-extrabold text-white lg:h-12 lg:w-12"
                    style={{ background: BLUE_GRADIENT }}
                    aria-hidden="true"
                  >
                    {item.number}
                  </span>
                </div>

                <div>
                  <p className="text-[10px] font-bold tracking-[0.14em] text-[#2563eb]">
                    {item.articles.length > 0 ? `${item.articles.length} ARTICLES PUBLISHED` : "FIRST ISSUE IN PREPARATION"}
                  </p>
                  <h2 className="mt-3 text-3xl font-bold text-slate-900">{item.name}</h2>
                  <p className="mt-4 max-w-md break-keep text-sm leading-7 text-slate-600">{item.description}</p>
                  <Link href={`/category/${item.slug}`} className="mt-6 inline-flex items-center gap-3 border-b border-[#2563eb] pb-1 text-sm font-bold text-[#1d4ed8] hover:text-[#1e40af]">
                    시리즈 전체 보기 <span aria-hidden="true">→</span>
                  </Link>
                </div>

                <div className="mt-8 border-t border-slate-200 lg:mt-0">
                  {item.articles.length > 0 ? (
                    item.articles.map((article, articleIndex) => (
                      <Link key={article.slug} href={`/blog/${article.slug}`} className="group grid gap-3 border-b border-slate-200 py-5 sm:grid-cols-[4.5rem_1fr_auto] sm:items-center">
                        <span className="font-mono text-xs font-bold text-[#60a5fa]">EP.{String(articleIndex + 1).padStart(2, "0")}</span>
                        <div>
                          <h3 className="break-keep font-bold leading-6 text-slate-900 transition group-hover:text-[#1d4ed8]">{article.title}</h3>
                          <p className="mt-1 line-clamp-1 text-sm text-slate-500">{article.description}</p>
                        </div>
                        <time className="text-xs text-slate-400" dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
                      </Link>
                    ))
                  ) : (
                    <div className="border-b border-slate-200 py-7">
                      <div className="flex items-center gap-3 text-xs font-bold tracking-[0.12em] text-[#eff6ff]0">
                        <span>UPCOMING</span>
                        <span className="h-px flex-1 bg-slate-200" aria-hidden="true" />
                        <span>EP.01</span>
                      </div>
                      <h3 className="mt-4 text-lg font-bold text-slate-900">첫 번째 칼럼을 준비하고 있습니다.</h3>
                      <p className="mt-2 break-keep text-sm leading-6 text-slate-500">이 진료과에서 환자가 자주 묻는 질문부터 순서대로 발행합니다.</p>
                    </div>
                  )}
                </div>
              </section>
            ))}
          </div>
        </section>

        <section className="border-t border-slate-200 bg-slate-50">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-6 lg:grid-cols-[0.62fr_1.38fr] lg:gap-16 lg:py-16">
            <div>
              <p className="text-xs font-bold tracking-[0.14em] text-[#2563eb]">EDITORIAL STANDARD</p>
              <h2 className="mt-3 break-keep text-3xl font-bold leading-tight text-slate-900">병원 GEO 칼럼이<br className="hidden lg:block" /> 정보를 정리하는 기준</h2>
            </div>
            <div>
              <ol className="grid border-y border-slate-300 sm:grid-cols-3 sm:divide-x sm:divide-slate-200">
                <li className="py-5 sm:pr-6">
                  <span className="font-mono text-xs font-bold text-[#2563eb]">01</span>
                  <h3 className="mt-3 font-bold text-slate-900">환자 질문에서 시작</h3>
                  <p className="mt-2 break-keep text-sm leading-6 text-slate-500">실제로 AI에 묻는 증상과 진료 질문을 기준으로 주제를 정합니다.</p>
                </li>
                <li className="border-t border-slate-200 py-5 sm:border-t-0 sm:px-6">
                  <span className="font-mono text-xs font-bold text-[#2563eb]">02</span>
                  <h3 className="mt-3 font-bold text-slate-900">확인 가능한 정보로 작성</h3>
                  <p className="mt-2 break-keep text-sm leading-6 text-slate-500">진료 범위와 의료진, 검사·치료 정보를 과장 없이 연결합니다.</p>
                </li>
                <li className="border-t border-slate-200 py-5 sm:border-t-0 sm:pl-6">
                  <span className="font-mono text-xs font-bold text-[#2563eb]">03</span>
                  <h3 className="mt-3 font-bold text-slate-900">AI 인용 구조까지 점검</h3>
                  <p className="mt-2 break-keep text-sm leading-6 text-slate-500">검색과 생성형 AI가 읽을 수 있는 출처와 연결 구조를 함께 살핍니다.</p>
                </li>
              </ol>
              <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="break-keep text-sm text-slate-500">진료과별 칼럼 외의 병원 GEO 분석은 GEO 인사이트에서 확인할 수 있습니다.</p>
                <Link href="/blog" className="inline-flex w-fit items-center gap-3 border-b border-[#2563eb] pb-1 text-sm font-bold text-[#1d4ed8] hover:text-[#1e40af]">
                  GEO 인사이트 전체 보기 <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </PageFrame>
  );
}
