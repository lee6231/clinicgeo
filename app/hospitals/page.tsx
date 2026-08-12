import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { PageFrame } from "@/components/PageFrame";
import { isArticleListed } from "@/lib/editorial";
import { posts } from "@/lib/posts";
import { buildMetadata, siteUrl } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(
  "/hospitals",
  "진료별 GEO 칼럼",
  "정형외과, 피부과, 치과, 성형외과, 내과의 환자 질문과 AI 인용 구조를 진료과별 연재 칼럼으로 제공합니다.",
);

const specialtySeries = [
  {
    slug: "orthopedics-geo",
    name: "정형외과 GEO",
    number: "01",
    description: "허리·목·관절 통증처럼 증상으로 시작되는 환자 질문과 검사·치료 정보를 연결합니다.",
  },
  {
    slug: "dermatology-geo",
    name: "피부과 GEO",
    number: "02",
    description: "피부 질환과 미용 진료에서 환자가 확인하는 장비·시술·의료진 정보를 구조화합니다.",
  },
  {
    slug: "dental-geo",
    name: "치과 GEO",
    number: "03",
    description: "임플란트·교정·보존 진료의 진단 과정과 선택 기준을 질문 단위로 정리합니다.",
  },
  {
    slug: "plastic-surgery-geo",
    name: "성형외과 GEO",
    number: "04",
    description: "눈·코·윤곽과 재수술 질문에 필요한 상담·수술·사후 관리 정보를 연결합니다.",
  },
  {
    slug: "internal-medicine-geo",
    name: "내과 GEO",
    number: "05",
    description: "건강검진과 만성질환, 소화기·호흡기 증상 질문을 세부 진료 정보로 확장합니다.",
  },
];

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

  return (
    <PageFrame tone="white">
      <JsonLd
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "진료별 GEO 칼럼",
            description: "진료과별 환자 질문과 병원 AI 인용 구조를 시리즈로 발행하는 Clinic GEO 칼럼",
            url: `${siteUrl}/hospitals`,
            hasPart: series.map((item) => ({
              "@type": "CollectionPage",
              name: item.name,
              url: `${siteUrl}/category/${item.slug}`,
            })),
          },
        ]}
      />

      <main>
        <section className="relative overflow-hidden border-b border-blue-100 bg-[#eff3f6]">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,42,67,0.04)_1px,transparent_1px)] bg-[length:12.5%_100%]" aria-hidden="true" />
          <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:gap-16 lg:py-16">
            <div className="relative z-10">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] font-bold tracking-[0.16em] text-blue-700">
                <span>CLINIC GEO JOURNAL</span>
                <span className="h-px w-10 bg-blue-400" aria-hidden="true" />
                <span>ISSUE 01</span>
              </div>
              <h1 className="mt-5 break-keep text-4xl font-bold leading-tight text-[#102a43] sm:text-5xl">진료별 GEO 칼럼</h1>
              <p className="mt-5 max-w-xl break-keep text-base leading-8 text-slate-600">
                진료과마다 환자가 묻는 방식과 AI가 확인해야 할 정보는 다릅니다. 환자 질문부터 병원 정보 구조, AI 인용 기준까지 진료과별 연재로 정리합니다.
              </p>
              <dl className="mt-8 flex flex-wrap border-y border-[#102a43]/20 py-4 text-sm">
                <div className="mr-7 border-r border-blue-200 pr-7">
                  <dt className="text-[10px] font-bold tracking-[0.12em] text-blue-500">SPECIALTY</dt>
                  <dd className="mt-1 font-bold text-[#102a43]">5개 진료과</dd>
                </div>
                <div>
                  <dt className="text-[10px] font-bold tracking-[0.12em] text-blue-500">FORMAT</dt>
                  <dd className="mt-1 font-bold text-[#102a43]">연재형 정보 칼럼</dd>
                </div>
              </dl>
            </div>

            <figure className="relative min-w-0">
              <div className="absolute inset-8 rounded-full bg-blue-200/50 blur-3xl" aria-hidden="true" />
              <div className="relative aspect-[3/2] w-full overflow-hidden border border-blue-100 bg-[#f7f6f2] shadow-[0_24px_60px_rgba(16,42,67,0.1)]">
                <Image
                  src="/clinicgeo-journal-background.webp"
                  alt="진료별 GEO 정보를 다루는 의료 정보 저널 지면"
                  fill
                  priority
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="object-contain"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#eff3f6]/24 via-transparent to-[#f7f6f2]/12" aria-hidden="true" />
              </div>
              <figcaption className="mt-3 flex items-center justify-between border-t border-[#102a43]/30 pt-2 text-[10px] font-bold tracking-[0.12em] text-slate-500">
                <span>CLINIC GEO · SPECIALTY EDITION</span>
                <span>VOL. 01</span>
              </figcaption>
            </figure>
          </div>
        </section>

        <section className="border-b border-blue-100 bg-[#fbfaf7]">
          <nav className="mx-auto grid max-w-7xl border-l border-blue-100 sm:grid-cols-2 lg:grid-cols-5" aria-label="진료별 GEO 시리즈">
            {series.map((item) => (
              <Link key={item.slug} href={`#series-${item.slug}`} className="group border-b border-r border-blue-100 px-5 py-6 transition hover:bg-blue-50 lg:border-b-0">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-blue-500">SERIES {item.number}</span>
                  <span className="text-sm text-blue-300 transition group-hover:translate-x-1 group-hover:text-blue-600" aria-hidden="true">→</span>
                </div>
                <h2 className="mt-5 text-lg font-bold text-[#102a43]">{item.name}</h2>
                <p className="mt-2 text-xs text-slate-500">현재 {item.articles.length}편</p>
              </Link>
            ))}
          </nav>
        </section>

        <section className="relative mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:py-20">
          <div className="flex flex-col gap-4 border-b-2 border-[#102a43] pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold tracking-[0.14em] text-blue-600">EDITORIAL INDEX · SERIES 01—05</p>
              <h2 className="mt-3 text-3xl font-bold text-[#102a43]">진료과별 연재 지면</h2>
            </div>
            <p className="max-w-xl break-keep text-sm leading-6 text-slate-500">한 편의 단편 글이 아니라 환자 질문, 병원 정보, AI 인용 구조가 순서대로 연결되는 연재 칼럼입니다.</p>
          </div>

          <div className="relative">
            {series.map((item) => (
              <section key={item.slug} id={`series-${item.slug}`} className="scroll-mt-24 border-b border-blue-100 py-10 lg:grid lg:grid-cols-[7rem_0.68fr_1.32fr] lg:gap-10">
                <div className="mb-5 flex items-baseline gap-2 lg:mb-0 lg:block lg:border-r lg:border-blue-100">
                  <span className="text-[10px] font-bold tracking-[0.14em] text-blue-500">SERIES</span>
                  <strong className="font-mono text-4xl font-light text-[#102a43] lg:mt-2 lg:block">{item.number}</strong>
                </div>

                <div>
                  <p className="text-[10px] font-bold tracking-[0.14em] text-blue-500">
                    {item.articles.length > 0 ? `${item.articles.length} ARTICLES PUBLISHED` : "FIRST ISSUE IN PREPARATION"}
                  </p>
                  <h2 className="mt-3 text-3xl font-bold text-[#102a43]">{item.name}</h2>
                  <p className="mt-4 max-w-md break-keep text-sm leading-7 text-slate-600">{item.description}</p>
                  <Link href={`/category/${item.slug}`} className="mt-6 inline-flex items-center gap-3 border-b border-blue-700 pb-1 text-sm font-bold text-blue-700">
                    시리즈 전체 보기 <span aria-hidden="true">→</span>
                  </Link>
                </div>

                <div className="mt-8 border-t border-blue-200 lg:mt-0">
                  {item.articles.length > 0 ? (
                    item.articles.map((article, articleIndex) => (
                      <Link key={article.slug} href={`/blog/${article.slug}`} className="group grid gap-3 border-b border-blue-100 py-5 sm:grid-cols-[4.5rem_1fr_auto] sm:items-center">
                        <span className="font-mono text-xs font-bold text-blue-400">EP.{String(articleIndex + 1).padStart(2, "0")}</span>
                        <div>
                          <h3 className="break-keep font-bold leading-6 text-[#102a43] transition group-hover:text-blue-700">{article.title}</h3>
                          <p className="mt-1 line-clamp-1 text-sm text-slate-500">{article.description}</p>
                        </div>
                        <time className="text-xs text-slate-400" dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
                      </Link>
                    ))
                  ) : (
                    <div className="border-b border-blue-100 py-7">
                      <div className="flex items-center gap-3 text-xs font-bold tracking-[0.12em] text-blue-500">
                        <span>UPCOMING</span>
                        <span className="h-px flex-1 bg-blue-100" aria-hidden="true" />
                        <span>EP.01</span>
                      </div>
                      <h3 className="mt-4 text-lg font-bold text-[#102a43]">첫 번째 칼럼을 준비하고 있습니다.</h3>
                      <p className="mt-2 break-keep text-sm leading-6 text-slate-500">이 진료과에서 환자가 자주 묻는 질문부터 순서대로 발행합니다.</p>
                    </div>
                  )}
                </div>
              </section>
            ))}
          </div>
        </section>

        <section className="border-t border-blue-100 bg-[#eff3f6]">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-6 lg:grid-cols-[0.62fr_1.38fr] lg:gap-16 lg:py-16">
            <div>
              <p className="text-xs font-bold tracking-[0.14em] text-blue-600">EDITORIAL STANDARD</p>
              <h2 className="mt-3 break-keep text-3xl font-bold leading-tight text-[#102a43]">진료별 GEO 칼럼이<br className="hidden lg:block" /> 정보를 정리하는 기준</h2>
            </div>
            <div>
              <ol className="grid border-y border-[#102a43]/20 sm:grid-cols-3 sm:divide-x sm:divide-blue-100">
                <li className="py-5 sm:pr-6">
                  <span className="font-mono text-xs font-bold text-blue-500">01</span>
                  <h3 className="mt-3 font-bold text-[#102a43]">환자 질문에서 시작</h3>
                  <p className="mt-2 break-keep text-sm leading-6 text-slate-500">실제로 AI에 묻는 증상과 진료 질문을 기준으로 주제를 정합니다.</p>
                </li>
                <li className="border-t border-blue-100 py-5 sm:border-t-0 sm:px-6">
                  <span className="font-mono text-xs font-bold text-blue-500">02</span>
                  <h3 className="mt-3 font-bold text-[#102a43]">확인 가능한 정보로 작성</h3>
                  <p className="mt-2 break-keep text-sm leading-6 text-slate-500">진료 범위와 의료진, 검사·치료 정보를 과장 없이 연결합니다.</p>
                </li>
                <li className="border-t border-blue-100 py-5 sm:border-t-0 sm:pl-6">
                  <span className="font-mono text-xs font-bold text-blue-500">03</span>
                  <h3 className="mt-3 font-bold text-[#102a43]">AI 인용 구조까지 점검</h3>
                  <p className="mt-2 break-keep text-sm leading-6 text-slate-500">검색과 생성형 AI가 읽을 수 있는 출처와 연결 구조를 함께 살핍니다.</p>
                </li>
              </ol>
              <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="break-keep text-sm text-slate-500">진료과별 칼럼 외의 병원 GEO 분석은 GEO 인사이트에서 확인할 수 있습니다.</p>
                <Link href="/blog" className="inline-flex w-fit items-center gap-3 border-b border-blue-700 pb-1 text-sm font-bold text-blue-700">
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
