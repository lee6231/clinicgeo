import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { PageFrame, PageIntro } from "@/components/PageFrame";
import { lastVerified, resources } from "@/lib/editorial";
import { buildMetadata, siteUrl } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(
  "/geo-resources",
  "GEO 자료실 | AI 검색 최적화 공식 자료와 링크",
  "검색·크롤링, 구조화 데이터와 AI 크롤러의 공식 링크를 편집 설명과 함께 제공합니다.",
);

export default function GeoResourcesPage() {
  const categories = Array.from(new Set(resources.map((resource) => resource.category)));

  return (
    <PageFrame>
      <JsonLd
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "GEO 자료실",
            description: "AI 검색 최적화 공식 자료와 링크 큐레이션",
            url: `${siteUrl}/geo-resources`,
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "홈", item: siteUrl },
              { "@type": "ListItem", position: 2, name: "GEO 자료실", item: `${siteUrl}/geo-resources` },
            ],
          },
        ]}
      />
      <main>
        <PageIntro
          eyebrow="GEO 자료실"
          title="요약보다 원문을 먼저 확인하는 공식 링크 모음"
          description="검색·크롤링, 구조화 데이터와 AI 크롤러의 공식 자료를 목적별로 정리했습니다. 각 링크는 무엇을 확인할 때 필요한지 함께 설명합니다."
        />

        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-6">
          <p className="text-xs font-semibold text-slate-500">전체 링크 정보 최종 확인 {lastVerified}</p>
          <div className="mt-10 space-y-16">
            {categories.map((category) => {
              const categoryResources = resources.filter((resource) => resource.category === category);
              return (
                <section key={category}>
                  <h2 className="text-3xl font-bold">{category}</h2>
                  <div className="mt-6 divide-y divide-slate-200 border-y border-slate-200 bg-white">
                    {categoryResources.map((resource) => (
                      <article key={resource.url} className="grid gap-5 px-5 py-6 md:grid-cols-[0.8fr_1.2fr] md:px-6">
                        <div>
                          <div className="flex flex-wrap gap-2">
                            <span className="rounded-sm bg-teal-50 px-2 py-1 text-xs font-bold text-teal-800">{resource.type}</span>
                            <span className="rounded-sm bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600">{resource.source}</span>
                          </div>
                          <h3 className="mt-4 text-xl font-bold">{resource.title}</h3>
                          <a
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 inline-flex text-sm font-bold text-teal-900 underline decoration-teal-300 underline-offset-4"
                          >
                            {resource.title} 공식 링크 열기
                          </a>
                        </div>
                        <div className="text-sm leading-7 text-slate-600">
                          <p>{resource.summary}</p>
                          <p className="mt-3 border-l-2 border-amber-400 pl-4">
                            <strong className="text-slate-900">필요한 이유:</strong> {resource.reason}
                          </p>
                          <p className="mt-3 text-xs text-slate-500">마지막 확인 {lastVerified}</p>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </main>
    </PageFrame>
  );
}
