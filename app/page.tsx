import type { Metadata } from "next";
import Link from "next/link";
import { ArticleCard } from "@/components/ArticleCard";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import {
  exploreGroups,
  hospitalGuides,
  isArticleListed,
  lastVerified,
  quickPaths,
  resources,
} from "@/lib/editorial";
import { posts } from "@/lib/posts";
import { buildMetadata, siteUrl } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(
  "/",
  "병원·치과 선택 가이드와 GEO 공식 자료",
  "Clinic GEO는 병원·치과 선택 기준과 검색엔진·AI 플랫폼의 GEO 공식 자료를 정리하는 편집형 정보 사이트입니다.",
);

const editorialCriteria = [
  ["공식 정보 우선", "병원·업체 홈페이지와 검색엔진·공공기관 원문을 먼저 확인합니다."],
  ["조건별 후보", "병원은 순위보다 지역, 진료 분야, 이용 조건에 맞는 후보로 정리합니다."],
  ["관계 공개", "광고·제휴·운영 관계를 편집 기준과 분리해 상단과 하단에 표시합니다."],
  ["확인일 표시", "바뀔 수 있는 정보에는 마지막 확인일과 직접 확인할 항목을 남깁니다."],
];

export default function Home() {
  const listedPosts = posts
    .filter((post) => post.published && isArticleListed(post.slug))
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  const featuredResources = resources.filter((resource) => resource.type === "공식 자료").slice(0, 3);

  return (
    <div className="min-h-screen bg-[#f8faf9] text-slate-950">
      <Header />
      <JsonLd
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Clinic GEO",
            description: "병원·치과 선택 기준과 GEO 공식 자료를 정리하는 편집형 정보 사이트",
            url: siteUrl,
            isPartOf: {
              "@type": "WebSite",
              name: "Clinic GEO",
              url: siteUrl,
            },
          },
        ]}
      />

      <main>
        <section className="min-h-[620px] border-b border-slate-200 bg-white sm:min-h-[660px]">
          <div className="mx-auto flex min-h-[620px] max-w-7xl items-center px-5 py-16 sm:min-h-[660px] sm:px-6">
            <div className="max-w-3xl">
              <p className="text-sm font-bold text-teal-800">병원 선택과 GEO 정보를 확인하는 편집 가이드</p>
              <h1 className="mt-5 break-keep text-4xl font-bold leading-tight text-slate-950 sm:text-6xl lg:text-7xl">
                병원 선택과 GEO 자료,
                <br />
                어디서부터 확인할까요?
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-700">
                Clinic GEO는 병원·치과를 선택할 때 확인할 기준과 AI 검색 환경을 이해하는 데 필요한 공식
                자료를 정리합니다.
              </p>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
                후기 수나 광고 문구만 보지 않고 병원 공식 홈페이지, 의료진 정보, 진료 범위와 이용 조건을
                확인합니다. GEO 정보는 검색엔진과 AI 플랫폼의 원문 안내를 우선합니다.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  href="/hospital-guides"
                  className="rounded-md bg-teal-800 px-5 py-3 text-sm font-bold text-white transition hover:bg-teal-900"
                >
                  병원·치과 선택 기준 보기
                </Link>
                <Link
                  href="/geo-resources"
                  className="rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-800 transition hover:border-teal-700 hover:text-teal-900"
                >
                  GEO 공식 자료 보기
                </Link>
                <Link
                  href="/editorial-policy"
                  className="rounded-md px-2 py-3 text-sm font-bold text-teal-900 underline decoration-teal-300 underline-offset-4"
                >
                  편집 기준 확인하기
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6">
            <div className="max-w-2xl">
              <p className="text-sm font-bold text-amber-700">빠른 선택</p>
              <h2 className="mt-2 text-3xl font-bold">무엇을 찾고 있나요?</h2>
            </div>
            <div className="mt-8 grid gap-px overflow-hidden border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-3">
              {quickPaths.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group min-h-44 bg-white p-6 transition hover:bg-teal-50"
                >
                  <span className="text-xs font-bold text-teal-700">{item.marker}</span>
                  <h3 className="mt-8 text-xl font-bold group-hover:text-teal-900">{item.label}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:py-20">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-bold text-teal-800">병원·치과 선택 가이드</p>
              <h2 className="mt-2 text-3xl font-bold">광고 문구보다 먼저 볼 기준</h2>
            </div>
            <Link href="/hospital-guides" className="text-sm font-bold text-teal-900 underline underline-offset-4">
              전체 선택 기준 보기
            </Link>
          </div>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {hospitalGuides.map((guide) => (
              <article key={guide.id} className="flex min-h-72 flex-col border border-slate-200 bg-white p-6">
                <div className="flex items-center justify-between gap-4">
                  <span className="rounded-sm bg-teal-50 px-2.5 py-1 text-xs font-bold text-teal-800">{guide.specialty}</span>
                  <span className="text-xs font-semibold text-slate-500">확인 기준 {guide.criteriaCount}개</span>
                </div>
                <h3 className="mt-8 text-2xl font-bold leading-8">{guide.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">{guide.summary}</p>
                <div className="mt-6 border-t border-slate-200 pt-4">
                  <p className="text-xs text-slate-500">정보 최종 확인 {lastVerified}</p>
                  <Link
                    href={`/hospital-guides#${guide.id}`}
                    className="mt-2 inline-flex text-sm font-bold text-teal-900 underline decoration-teal-300 underline-offset-4"
                  >
                    {guide.linkLabel}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="border-y border-slate-200 bg-[#eef6f3]">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:py-20">
            <div className="max-w-3xl">
              <p className="text-sm font-bold text-teal-800">지역·진료과별 탐색</p>
              <h2 className="mt-2 text-3xl font-bold">원하는 조건부터 좁혀보세요</h2>
              <p className="mt-4 text-base leading-7 text-slate-600">
                아래 항목은 병원 순위가 아니라 후보를 찾기 위한 조건입니다. 실제 진료 여부와 이용 정보는
                의료기관의 공식 안내에서 다시 확인해야 합니다.
              </p>
            </div>
            <div className="mt-10 grid gap-8 lg:grid-cols-3">
              {exploreGroups.map((group) => (
                <section key={group.title}>
                  <h3 className="text-lg font-bold">{group.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{group.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <Link
                        key={item}
                        href={group.href}
                        className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:border-teal-700 hover:text-teal-900"
                      >
                        {item}
                      </Link>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:py-20">
          <div className="max-w-3xl">
            <p className="text-sm font-bold text-teal-800">GEO 공식 자료·링크 큐레이션</p>
            <h2 className="mt-2 text-3xl font-bold">원문을 먼저 확인할 수 있도록 정리했습니다</h2>
          </div>
          <div className="mt-8 divide-y divide-slate-200 border-y border-slate-200">
            {featuredResources.map((resource) => (
              <article key={resource.url} className="grid gap-4 py-6 md:grid-cols-[0.7fr_1.3fr_auto] md:items-center">
                <div>
                  <p className="text-xs font-bold text-teal-800">{resource.category}</p>
                  <h3 className="mt-2 text-lg font-bold">{resource.title}</h3>
                  <p className="mt-1 text-xs text-slate-500">{resource.source}</p>
                </div>
                <p className="text-sm leading-7 text-slate-600">{resource.summary}</p>
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-bold text-teal-900 underline underline-offset-4"
                >
                  공식 자료 열기
                </a>
              </article>
            ))}
          </div>
          <Link href="/geo-resources" className="mt-7 inline-flex text-sm font-bold text-teal-900 underline underline-offset-4">
            전체 GEO 자료실 보기
          </Link>
        </section>

        <section className="border-y border-slate-200 bg-slate-950 text-white">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:py-20">
            <div>
              <p className="text-sm font-bold text-teal-300">Clinic GEO 편집 기준</p>
              <h2 className="mt-3 text-3xl font-bold leading-tight">무엇을 확인했고, 무엇은 확인하지 못했는지 구분합니다</h2>
              <Link
                href="/editorial-policy"
                className="mt-7 inline-flex text-sm font-bold text-white underline decoration-amber-400 underline-offset-4"
              >
                편집·선정 기준 전문 보기
              </Link>
            </div>
            <div className="grid gap-px bg-slate-700 sm:grid-cols-2">
              {editorialCriteria.map(([title, description]) => (
                <div key={title} className="bg-slate-900 p-6">
                  <h3 className="font-bold text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-400">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:py-20">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold text-amber-700">최신 콘텐츠</p>
              <h2 className="mt-2 text-3xl font-bold">최근 보강한 병원·GEO 자료</h2>
            </div>
            <Link href="/blog" className="text-sm font-bold text-teal-900 underline underline-offset-4">
              전체 콘텐츠 보기
            </Link>
          </div>
          {listedPosts.length > 0 ? (
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {listedPosts.slice(0, 4).map((post) => (
                <ArticleCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <p className="mt-8 border border-slate-200 bg-white p-6 text-sm text-slate-600">보강 중인 콘텐츠가 없습니다.</p>
          )}
        </section>

        <section className="border-t border-slate-200 bg-[#dff3ee]">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-bold text-teal-800">공식 정보 확인 순서</p>
              <h2 className="mt-2 text-3xl font-bold">병원 정보와 GEO 자료는 출처부터 확인합니다</h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-700">
                병원 정보는 의료기관 공식 홈페이지와 최신 공지에서, GEO 정보는 검색엔진·AI 플랫폼의 공식
                문서에서 확인합니다. Clinic GEO는 이 확인 순서와 체크 항목을 정리해 알려드립니다.
              </p>
            </div>
            <Link
              href="/geo-resources"
              className="w-fit rounded-md bg-teal-900 px-6 py-3 text-sm font-bold text-white hover:bg-slate-950"
            >
              GEO 공식 자료 확인하기
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
