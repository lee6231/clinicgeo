import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { PageFrame, PageIntro } from "@/components/PageFrame";
import { exploreGroups, lastVerified } from "@/lib/editorial";
import { buildMetadata, siteUrl } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(
  "/hospitals",
  "병원·치과 찾기 | 지역·진료과별 선택 기준",
  "지역, 진료 분야, 야간·주말 진료, 주차 등 이용 조건을 정리하고 공식 정보로 병원 후보를 확인하는 방법을 안내합니다.",
);

const verificationSteps = [
  ["1. 조건 정리", "지역, 진료 분야, 방문 가능 시간, 주차와 예약 방식처럼 실제 선택을 바꾸는 조건부터 적습니다."],
  ["2. 공식 정보 확인", "병원 공식 홈페이지에서 의료진, 진료 범위, 진료 시간, 비급여 정보와 예약 안내를 확인합니다."],
  ["3. 당일 재확인", "진료 시간과 접수 마감은 바뀔 수 있으므로 방문 전 의료기관에 직접 확인합니다."],
];

export default function HospitalsPage() {
  return (
    <PageFrame>
      <JsonLd
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "병원·치과 찾기",
            description: "지역·진료 분야·이용 조건별 병원 선택 기준",
            url: `${siteUrl}/hospitals`,
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "홈", item: siteUrl },
              { "@type": "ListItem", position: 2, name: "병원·치과 찾기", item: `${siteUrl}/hospitals` },
            ],
          },
        ]}
      />
      <main>
        <PageIntro
          eyebrow="병원·치과 찾기"
          title="순위보다 내 조건에 맞는 후보를 찾습니다"
          description="Clinic GEO는 병원의 의료 수준이나 치료 효과를 평가하지 않습니다. 공개된 공식 정보에서 선택 조건을 확인하고, 확인되지 않은 정보는 후보 판단에 사용하지 않습니다."
        >
          <Link
            href="/hospital-guides"
            className="inline-flex rounded-md bg-teal-800 px-5 py-3 text-sm font-bold text-white hover:bg-teal-900"
          >
            병원 선택 기준 보기
          </Link>
        </PageIntro>

        <section id="region" className="scroll-mt-24 mx-auto max-w-7xl px-5 py-14 sm:px-6">
          <div className="border-l-4 border-teal-700 bg-teal-50 px-5 py-5 text-sm leading-7 text-slate-700">
            <p className="font-bold text-teal-950">현재 공개 후보 안내</p>
            <p className="mt-2">
              공식 정보 확인이 끝난 실명 병원 후보 목록은 아직 공개하지 않았습니다. 확인되지 않은 병원명, 주소,
              의료진, 진료 시간, 가격이나 평점을 채우지 않고 공식 정보를 확인하는 기준부터 제공합니다.
            </p>
          </div>

          <div className="mt-12 grid gap-9 lg:grid-cols-3">
            {exploreGroups.map((group) => (
              <section key={group.title}>
                <h2 className="text-2xl font-bold">{group.title}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">{group.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
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
        </section>

        <section className="border-y border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6">
            <h2 className="text-3xl font-bold">후보를 확인하는 순서</h2>
            <div className="mt-8 grid gap-px overflow-hidden border border-slate-200 bg-slate-200 md:grid-cols-3">
              {verificationSteps.map(([title, description]) => (
                <article key={title} className="bg-white p-6">
                  <h3 className="text-lg font-bold">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
                </article>
              ))}
            </div>
            <p className="mt-6 text-xs text-slate-500">정보 최종 확인 {lastVerified}</p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-14 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h2 className="text-2xl font-bold">선택 기준을 먼저 보고 싶다면</h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
                치과, 피부과, 야간·주말 진료처럼 상황별로 확인할 항목을 정리했습니다. 특정 병원의 치료 결과를
                보장하거나 의료적 판단을 대신하지 않습니다.
              </p>
            </div>
            <Link
              href="/hospital-guides"
              className="w-fit rounded-md border border-teal-800 px-5 py-3 text-sm font-bold text-teal-900 hover:bg-teal-50"
            >
              병원 선택 가이드 보기
            </Link>
          </div>
        </section>
      </main>
    </PageFrame>
  );
}
