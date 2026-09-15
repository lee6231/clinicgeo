import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { PageFrame } from "@/components/PageFrame";
import { isArticleListed } from "@/lib/editorial";
import { categories, getParentCategory, getRelatedCategories, posts } from "@/lib/posts";
import { buildMetadata, siteUrl } from "@/lib/seo";

type SeriesProfile = {
  number: string;
  title: string;
  description: string;
  deskNote: string;
  topics: [string, string, string];
};

const seriesProfiles: Record<string, SeriesProfile> = {
  "hospital-geo": {
    number: "00",
    title: "병원 GEO 인사이트",
    description: "병원 홈페이지 구조, 환자 질문, AI 인용 측정과 월간 보강을 하나의 운영 흐름으로 정리하는 대분류 칼럼입니다.",
    deskNote: "진료과를 넘어 병의원 GEO 전체 전략과 대행사 선택, 측정 체계를 다루는 대분류 시리즈입니다. 아래 4개 진료과 칼럼은 이 대분류의 소분류입니다.",
    topics: ["병원 GEO 진단과 우선순위", "메인·팬아웃 질문 설계", "AI 인용 측정과 월간 보강"],
  },
  "orthopedics-geo": {
    number: "01",
    title: "정형외과 GEO 칼럼",
    description: "허리·목·관절 통증처럼 증상으로 시작되는 환자 질문과 검사·치료 정보를 연결합니다.",
    deskNote: "증상 질문에서 진료 페이지와 의료진 정보까지 이어지는 정형외과 GEO 구조를 연재합니다.",
    topics: ["허리·목·관절 증상 질문", "검사·치료 페이지 구조", "의료진·진료 엔티티 연결"],
  },
  "dermatology-geo": {
    number: "02",
    title: "피부과 GEO 칼럼",
    description: "리프팅·여드름·색소·흉터 질문을 중심으로 시술, 장비와 의료진 정보를 구조화합니다.",
    deskNote: "피부과 홈페이지가 환자의 질문에 직접 답하고 AI가 공식 출처로 이해할 수 있는 구조를 다룹니다.",
    topics: ["리프팅·여드름·색소 질문", "시술·장비·의료진 정보 구조", "피부과 홈페이지 AI 인용 점검"],
  },
  "dental-geo": {
    number: "03",
    title: "치과 GEO 칼럼",
    description: "임플란트·교정·보존 진료의 질문을 진단 과정, 비용 정보와 선택 기준으로 확장합니다.",
    deskNote: "치과를 찾는 환자의 실제 질문과 홈페이지 원본 정보가 연결되는 GEO 설계를 연재합니다.",
    topics: ["임플란트·교정 환자 질문", "진단 과정·비용 정보 구조", "치과 홈페이지 AI 인용 점검"],
  },
  "plastic-surgery-geo": {
    number: "04",
    title: "성형외과 GEO 칼럼",
    description: "눈·코·윤곽과 재수술 질문에 필요한 상담, 수술과 사후 관리 정보를 연결합니다.",
    deskNote: "상담 전 질문부터 수술 과정과 회복 정보까지 이어지는 성형외과 GEO 콘텐츠를 다룹니다.",
    topics: ["눈·코·윤곽 상담 질문", "수술·회복·사후 관리 구조", "성형외과 홈페이지 AI 인용 점검"],
  },
};

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(date));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const category = categories.find((item) => item.slug === slug);
  const profile = seriesProfiles[slug];

  if (!category || !profile) {
    return buildMetadata(`/category/${slug}`, "칼럼을 찾을 수 없습니다", "요청하신 칼럼 시리즈는 존재하지 않습니다.");
  }

  return buildMetadata(`/category/${slug}`, profile.title, profile.description);
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = categories.find((item) => item.slug === slug);
  const profile = seriesProfiles[slug];
  if (!category || !profile) notFound();

  const categoryPosts = posts
    .filter((post) => post.published && post.categorySlug === slug && isArticleListed(post.slug))
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  const relatedCategories = getRelatedCategories(slug).filter((item) => seriesProfiles[item.slug]);
  const parentCategory = getParentCategory(slug);
  const isParentCategory = !category.parentSlug;
  const collectionId = `${siteUrl}/category/${slug}#collection`;

  const breadcrumbItems = [
    { "@type": "ListItem", position: 1, name: "홈", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "진료별 GEO 칼럼", item: `${siteUrl}/hospitals` },
    ...(parentCategory
      ? [{ "@type": "ListItem", position: 3, name: parentCategory.name, item: `${siteUrl}/category/${parentCategory.slug}` }]
      : []),
    {
      "@type": "ListItem",
      position: parentCategory ? 4 : 3,
      name: profile.title,
      item: `${siteUrl}/category/${slug}`,
    },
  ];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": collectionId,
      name: profile.title,
      description: profile.description,
      url: `${siteUrl}/category/${slug}`,
      ...(parentCategory ? { isPartOf: { "@id": `${siteUrl}/category/${parentCategory.slug}#collection` } } : {}),
      ...(isParentCategory
        ? {
            hasPart: relatedCategories.map((item) => ({
              "@type": "CollectionPage",
              "@id": `${siteUrl}/category/${item.slug}#collection`,
              name: item.name,
              url: `${siteUrl}/category/${item.slug}`,
            })),
          }
        : {}),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbItems,
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: `${profile.title} 발행 칼럼`,
      itemListElement: categoryPosts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${siteUrl}/blog/${post.slug}`,
        name: post.title,
      })),
    },
  ];

  return (
    <PageFrame tone="white">
      <JsonLd jsonLd={jsonLd} />
      <main>
        <section className="relative overflow-hidden border-b border-blue-100 bg-[#eff3f6]">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,42,67,0.045)_1px,transparent_1px)] bg-[length:12.5%_100%]" aria-hidden="true" />
          <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-6 lg:grid-cols-[1.12fr_0.88fr] lg:items-end lg:gap-16 lg:py-18">
            <div>
              <nav className="text-sm text-slate-500" aria-label="현재 위치">
                <Link href="/hospitals" className="hover:text-blue-700">진료별 GEO 칼럼</Link>
                {parentCategory && (
                  <>
                    <span className="mx-2">/</span>
                    <Link href={`/category/${parentCategory.slug}`} className="hover:text-blue-700">{parentCategory.name}</Link>
                  </>
                )}
                <span className="mx-2">/</span>
                <span>{category.name}</span>
              </nav>
              <div className="mt-10 flex items-center gap-4 text-[10px] font-bold tracking-[0.16em] text-blue-700">
                <span>CLINIC GEO JOURNAL</span>
                <span className="h-px w-10 bg-blue-400" aria-hidden="true" />
                <span>SERIES {profile.number}</span>
              </div>
              <h1 className="mt-5 break-keep text-4xl font-bold leading-tight text-[#102a43] sm:text-5xl">{profile.title}</h1>
              <p className="mt-5 max-w-3xl break-keep text-base leading-8 text-slate-600 sm:text-lg">{profile.description}</p>
              <dl className="mt-8 flex flex-wrap border-y border-[#102a43]/20 py-4 text-sm">
                <div className="mr-7 border-r border-blue-200 pr-7">
                  <dt className="text-[10px] font-bold tracking-[0.12em] text-blue-500">PUBLISHED</dt>
                  <dd className="mt-1 font-bold text-[#102a43]">{categoryPosts.length}편</dd>
                </div>
                <div>
                  <dt className="text-[10px] font-bold tracking-[0.12em] text-blue-500">FORMAT</dt>
                  <dd className="mt-1 font-bold text-[#102a43]">질문형 연재 칼럼</dd>
                </div>
              </dl>
            </div>

            <aside className="border-t-2 border-[#102a43] bg-[#fbfaf7] px-6 py-7 shadow-[0_18px_50px_rgba(16,42,67,0.08)] sm:px-8" aria-label={`${profile.title} 연재 구성`}>
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold tracking-[0.14em] text-blue-600">SERIES DESK</p>
                <span className="font-mono text-3xl font-light text-blue-300">{profile.number}</span>
              </div>
              <p className="mt-5 break-keep text-sm leading-7 text-slate-600">{profile.deskNote}</p>
              <ol className="mt-6 border-t border-blue-100">
                {profile.topics.map((topic, index) => (
                  <li key={topic} className="grid grid-cols-[2.5rem_1fr] gap-3 border-b border-blue-100 py-4 text-sm">
                    <span className="font-mono font-bold text-blue-400">0{index + 1}</span>
                    <span className="font-bold text-[#102a43]">{topic}</span>
                  </li>
                ))}
              </ol>
            </aside>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:py-20">
          <div className="flex flex-col gap-4 border-b-2 border-[#102a43] pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold tracking-[0.14em] text-blue-600">PUBLISHED ISSUES</p>
              <h2 className="mt-3 text-3xl font-bold text-[#102a43]">발행된 칼럼</h2>
            </div>
            <p className="max-w-xl break-keep text-sm leading-6 text-slate-500">환자가 실제로 묻는 질문에서 시작해 병원 홈페이지 구조와 AI 인용 점검까지 순서대로 연결합니다.</p>
          </div>

          {categoryPosts.length > 0 ? (
            <div className="border-b border-blue-100">
              {categoryPosts.map((post, index) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group grid gap-4 border-b border-blue-100 py-7 last:border-b-0 sm:grid-cols-[5rem_1fr_auto] sm:items-center lg:py-8">
                  <span className="font-mono text-sm font-bold text-blue-400">EP.{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.12em] text-blue-600">{category.name}</p>
                    <h3 className="mt-2 break-keep text-xl font-bold leading-8 text-[#102a43] transition group-hover:text-blue-700">{post.title}</h3>
                    <p className="mt-2 line-clamp-2 max-w-4xl text-sm leading-6 text-slate-500">{post.description}</p>
                  </div>
                  <div className="flex items-center justify-between gap-5 sm:block sm:text-right">
                    <time className="text-xs text-slate-400" dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                    <span className="ml-4 text-blue-500 transition group-hover:translate-x-1 sm:mt-3 sm:block" aria-hidden="true">→</span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="border-b border-blue-100 py-12">
              <div className="flex items-center gap-3 text-xs font-bold tracking-[0.12em] text-blue-500">
                <span>UPCOMING</span>
                <span className="h-px flex-1 bg-blue-100" aria-hidden="true" />
                <span>EP.01</span>
              </div>
              <h3 className="mt-5 text-2xl font-bold text-[#102a43]">첫 번째 {category.name} 칼럼을 준비하고 있습니다.</h3>
              <p className="mt-3 break-keep text-sm leading-7 text-slate-500">첫 주제는 ‘{profile.topics[0]}’입니다. 이후 질문 설계와 AI 인용 점검 칼럼을 순서대로 발행합니다.</p>
            </div>
          )}
        </section>

        <section className="border-y border-blue-100 bg-[#eff3f6]">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-6 lg:grid-cols-[0.68fr_1.32fr] lg:gap-16 lg:py-16">
            <div>
              <p className="text-xs font-bold tracking-[0.14em] text-blue-600">NEXT ON THE DESK</p>
              <h2 className="mt-3 break-keep text-3xl font-bold leading-tight text-[#102a43]">이어질 칼럼 주제</h2>
              <p className="mt-4 max-w-sm break-keep text-sm leading-7 text-slate-500">단편 글을 나열하지 않고 하나의 질문이 다음 실무 단계로 이어지도록 시리즈를 구성합니다.</p>
            </div>
            <ol className="border-y border-[#102a43]/20 sm:grid sm:grid-cols-3 sm:divide-x sm:divide-blue-100">
              {profile.topics.map((topic, index) => (
                <li key={topic} className="border-b border-blue-100 py-6 last:border-b-0 sm:border-b-0 sm:px-6 sm:first:pl-0 sm:last:pr-0">
                  <span className="font-mono text-xs font-bold text-blue-500">NEXT {String(index + 1).padStart(2, "0")}</span>
                  <h3 className="mt-4 break-keep text-lg font-bold leading-7 text-[#102a43]">{topic}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-500">질문 정의 → 원본 정보 → 홈페이지 구조 → AI 인용 확인 순서로 정리합니다.</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:py-16">
          <div className="flex flex-col gap-4 border-b border-blue-200 pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold tracking-[0.14em] text-blue-600">{isParentCategory ? "SUB CATEGORY" : "OTHER SERIES"}</p>
              <h2 className="mt-3 text-2xl font-bold text-[#102a43]">{isParentCategory ? "소분류 진료과 칼럼" : "다른 진료별 GEO 칼럼"}</h2>
            </div>
            <Link href="/hospitals" className="w-fit border-b border-blue-700 pb-1 text-sm font-bold text-blue-700">전체 시리즈 보기 →</Link>
          </div>
          <nav className="grid border-l border-blue-100 sm:grid-cols-2 lg:grid-cols-5" aria-label={isParentCategory ? "소분류 진료과 칼럼" : "다른 진료별 GEO 칼럼"}>
            {relatedCategories.slice(0, 5).map((item) => {
              const siblingProfile = seriesProfiles[item.slug];
              const issueCount = posts.filter((post) => post.published && post.categorySlug === item.slug && isArticleListed(post.slug)).length;
              return (
                <Link key={item.slug} href={`/category/${item.slug}`} className="group border-b border-r border-blue-100 px-5 py-6 transition hover:bg-blue-50">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-blue-500">SERIES {siblingProfile.number}</span>
                    <span className="text-blue-300 transition group-hover:translate-x-1 group-hover:text-blue-600" aria-hidden="true">→</span>
                  </div>
                  <h3 className="mt-5 font-bold text-[#102a43]">{siblingProfile.title}</h3>
                  <p className="mt-2 text-xs text-slate-500">현재 {issueCount}편</p>
                </Link>
              );
            })}
          </nav>
        </section>
      </main>
    </PageFrame>
  );
}