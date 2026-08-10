import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/ArticleCard";
import { JsonLd } from "@/components/JsonLd";
import { PageFrame } from "@/components/PageFrame";
import { isArticleListed } from "@/lib/editorial";
import { getHospitalEntitiesByLocation } from "@/lib/hospitals";
import { categories, posts } from "@/lib/posts";
import { getDirectorySpecialty, regions } from "@/lib/regions";
import { buildMetadata, siteUrl } from "@/lib/seo";

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const category = categories.find((item) => item.slug === slug);
  const specialty = getDirectorySpecialty(slug);

  if (!category) {
    return buildMetadata(`/category/${slug}`, "카테고리를 찾을 수 없습니다", "요청하신 카테고리는 존재하지 않습니다.");
  }

  if (specialty) {
    return buildMetadata(
      `/category/${slug}`,
      `${specialty.name} 병원 정보`,
      `서울, 대전, 대구, 부산, 광주의 ${specialty.name} 정보를 지역과 구 단위로 찾아보세요.`,
    );
  }

  return buildMetadata(`/category/${slug}`, category.name, category.description);
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = categories.find((item) => item.slug === slug);
  if (!category) notFound();

  const specialty = getDirectorySpecialty(slug);
  const categoryPosts = posts.filter(
    (post) => post.published && post.categorySlug === slug && isArticleListed(post.slug),
  );

  if (!specialty) {
    return (
      <PageFrame tone="white">
        <main className="mx-auto max-w-6xl px-5 py-16 sm:px-6">
          <p className="text-sm font-bold text-blue-700">병원 GEO 블로그</p>
          <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">{category.name}</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">{category.description}</p>
          {categoryPosts.length > 0 ? (
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {categoryPosts.map((post) => <ArticleCard key={post.slug} post={post} />)}
            </div>
          ) : (
            <div className="mt-10 border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-slate-600">
              이 카테고리에는 아직 발행된 아티클이 없습니다.
            </div>
          )}
        </main>
      </PageFrame>
    );
  }

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: `${specialty.name} 병원 정보`,
      description: specialty.description,
      url: `${siteUrl}/category/${specialty.slug}`,
      itemListElement: regions.map((region, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: `${region.name} ${specialty.name}`,
        url: `${siteUrl}/category/${specialty.slug}/${region.slug}`,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "홈", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "병원 찾기", item: `${siteUrl}/hospitals` },
        { "@type": "ListItem", position: 3, name: specialty.name, item: `${siteUrl}/category/${specialty.slug}` },
      ],
    },
  ];

  return (
    <PageFrame tone="white">
      <JsonLd jsonLd={jsonLd} />
      <main>
        <section className="border-b border-blue-100 bg-[#f4f8ff]">
          <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:py-18">
            <nav className="text-sm text-slate-500" aria-label="현재 위치">
              <Link href="/hospitals" className="hover:text-blue-700">병원 찾기</Link>
              <span className="mx-2">/</span>
              <span>{specialty.name}</span>
            </nav>
            <p className="mt-8 text-xs font-bold text-blue-700">SPECIALTY DIRECTORY</p>
            <h1 className="mt-3 break-keep text-4xl font-bold text-[#17365d] sm:text-5xl">{specialty.name} 병원 정보</h1>
            <p className="mt-5 max-w-3xl break-keep text-base leading-8 text-slate-600 sm:text-lg">
              먼저 지역을 선택한 뒤 구 단위로 좁혀 보세요. 병원별 기본 정보와 진료 범위, 이용 정보를 한 자리씩 확인할 수 있습니다.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:py-20">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold text-blue-700">STEP 01</p>
              <h2 className="mt-3 text-3xl font-bold text-[#17365d]">지역을 선택하세요</h2>
            </div>
            <p className="text-sm text-slate-500">서울 및 주요 광역시부터 순차 확대합니다</p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {regions.map((region) => {
              const count = getHospitalEntitiesByLocation(specialty.slug, region.slug).length;
              return (
                <Link
                  key={region.slug}
                  href={`/category/${specialty.slug}/${region.slug}`}
                  className="group min-h-48 rounded-lg border border-blue-100 bg-white p-6 transition hover:-translate-y-0.5 hover:border-blue-400 hover:shadow-[0_12px_30px_rgba(37,99,235,0.10)]"
                >
                  <span className="text-xs font-bold text-blue-600">{String(region.districts.length).padStart(2, "0")} AREAS</span>
                  <h3 className="mt-8 text-2xl font-bold text-[#17365d] group-hover:text-blue-700">{region.name}</h3>
                  <p className="mt-2 text-sm text-slate-500">{region.description}</p>
                  <p className="mt-5 text-xs font-semibold text-blue-700">등록 정보 {count}곳 →</p>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="border-y border-blue-100 bg-[#f7faff]">
          <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6">
            <div className="grid gap-8 md:grid-cols-3">
              {["진료과 선택", "광역 지역·구 선택", "업체 정보 확인"].map((item, index) => (
                <div key={item} className="border-l-2 border-blue-500 pl-5">
                  <p className="text-xs font-bold text-blue-600">0{index + 1}</p>
                  <h3 className="mt-2 font-bold text-[#17365d]">{item}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {categoryPosts.length > 0 && (
          <section className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:py-20">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-bold text-blue-700">GEO BLOG</p>
                <h2 className="mt-3 text-2xl font-bold text-[#17365d]">관련 {specialty.name} 아티클</h2>
              </div>
              <Link href="/blog" className="text-sm font-bold text-blue-700 hover:underline">전체 보기</Link>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {categoryPosts.map((post) => <ArticleCard key={post.slug} post={post} />)}
            </div>
          </section>
        )}
      </main>
    </PageFrame>
  );
}
