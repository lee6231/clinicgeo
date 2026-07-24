import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame, PageIntro } from "@/components/PageFrame";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(
  "/about",
  "Clinic GEO 소개",
  "Clinic GEO는 병원·치과 선택 기준과 GEO 공식 자료를 정리하는 편집형 정보 사이트입니다.",
);

const roles = [
  ["병원 선택", "지역·진료 분야·이용 조건에 맞춰 공식 정보에서 확인할 항목을 정리합니다."],
  ["선택 체크리스트", "치과·피부과와 야간·주말 진료처럼 상황별로 확인할 항목을 제공합니다."],
  ["GEO 공식 자료", "검색엔진, AI 플랫폼과 Schema.org의 공식 문서를 목적별로 연결합니다."],
  ["편집 기준 공개", "정보 출처, 확인일, 의료 정보 한계와 이해관계 표시 원칙을 공개합니다."],
];

export default function AboutPage() {
  return (
    <PageFrame>
      <main>
        <PageIntro
          eyebrow="Clinic GEO 소개"
          title="병원 선택 기준과 GEO 공식 자료를 정리하는 편집형 정보 사이트"
          description="Clinic GEO는 특정 GEO 대행사의 서비스 소개나 문의 접수 페이지가 아닙니다. 병원·치과 선택에 필요한 확인 기준과 GEO 원문 자료를 독립적인 정보 탐색 흐름으로 편집합니다."
        />
        <section className="mx-auto max-w-6xl px-5 py-14 sm:px-6">
          <div className="grid gap-px overflow-hidden border border-slate-200 bg-slate-200 md:grid-cols-2">
            {roles.map(([title, description]) => (
              <article key={title} className="bg-white p-6">
                <h2 className="text-xl font-bold">{title}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
              </article>
            ))}
          </div>
          <div className="mt-10 border-l-4 border-amber-500 bg-amber-50 p-6">
            <h2 className="text-xl font-bold text-amber-950">독립 운영 원칙</h2>
            <p className="mt-3 text-sm leading-7 text-slate-700">
              Clinic GEO는 콘텐츠에서 언급하는 병원·업체·대행사와 별도로 운영됩니다. 특정 업체를 언급하거나
              외부 자료로 연결하는 것은 운영 관계를 의미하지 않습니다. 광고, 제휴 또는 자료 제공 등 별도의
              경제적 이해관계가 있는 경우에는 해당 콘텐츠에 명확히 표시합니다.
            </p>
            <Link
              href="/advertising-disclosure"
              className="mt-4 inline-flex text-sm font-bold text-amber-950 underline underline-offset-4"
            >
              광고·제휴 및 이해관계 안내 보기
            </Link>
          </div>
        </section>
      </main>
    </PageFrame>
  );
}
