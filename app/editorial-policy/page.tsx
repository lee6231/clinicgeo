import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame, PageIntro } from "@/components/PageFrame";
import { lastVerified } from "@/lib/editorial";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(
  "/editorial-policy",
  "Clinic GEO 편집·선정 기준",
  "병원 선택 정보와 GEO 자료를 편집하는 기준, 공식 정보 우선 원칙, 이해관계와 오류 수정 원칙을 안내합니다.",
);

const policies = [
  ["병원 후보 선정", "지역, 진료 분야, 공식 의료진 정보, 진료 범위, 이용 조건과 정보 공개 여부를 확인합니다. 후기 수나 확인되지 않은 평점은 선정 근거로 사용하지 않습니다."],
  ["GEO 자료 편집", "검색·크롤링, 구조화 데이터와 AI 크롤러 정보는 검색엔진, AI 플랫폼과 Schema.org의 공식 문서를 우선해 정리합니다."],
  ["공식 정보 우선", "병원 공식 홈페이지, 정부·공공기관, 검색엔진과 Schema.org 공식 문서를 우선합니다. 공개 페이지에서 확인하기 어려운 항목은 확인되지 않은 정보로 구분합니다."],
  ["순위와 추천의 의미", "추천과 순위는 의료 수준이나 치료 결과를 뜻하지 않습니다. 조건별로 확인할 수 있는 후보와 선택 기준을 정리한 것입니다."],
  ["광고·제휴 구분", "광고, 제휴, 정보 제공, 편집 후보, 운영 관계를 텍스트 라벨로 구분합니다. 경제적 이해관계가 있으면 콘텐츠 상단과 하단에 표시합니다."],
  ["운영·사업상 이해관계", "Clinic GEO는 써밋피드와 운영 또는 사업상 이해관계가 있습니다. 관련 서비스를 언급하는 콘텐츠에는 이 관계를 숨기지 않고 표시합니다."],
  ["오류 수정", "병원명, 주소, 진료 시간, 공식 링크와 관계 표시에 오류가 확인되면 공식 근거와 확인일을 기록해 수정합니다."],
  ["의료 정보", "Clinic GEO의 콘텐츠는 정보 제공과 선택 기준 정리를 목적으로 하며 진단, 치료, 의학적 판단을 대신하지 않습니다."],
  ["AI·검색 변동성", "검색과 생성형 AI 답변은 시점, 질문, 위치, 계정과 플랫폼 정책에 따라 달라질 수 있습니다. 특정 노출, 인용, 추천이나 순위를 보장하지 않습니다."],
];

export default function EditorialPolicyPage() {
  return (
    <PageFrame tone="white">
      <main>
        <PageIntro
          eyebrow="편집 정책"
          title="Clinic GEO 편집·선정 기준"
          description="Clinic GEO의 추천과 순위는 의료 수준이나 치료 결과를 보장하는 평가가 아닙니다. 공개된 공식 정보와 각 콘텐츠에 명시한 편집 기준을 기준으로 비교합니다."
        />
        <section className="mx-auto max-w-5xl px-5 py-14 sm:px-6">
          <div className="grid gap-px overflow-hidden border border-slate-200 bg-slate-200 md:grid-cols-2">
            {policies.map(([title, description]) => (
              <section key={title} className="bg-white p-6">
                <h2 className="text-lg font-bold">{title}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
              </section>
            ))}
          </div>
          <div className="mt-10 border-l-4 border-slate-900 bg-slate-50 px-5 py-5 text-sm leading-7 text-slate-700">
            <p><strong>작성 및 편집:</strong> Clinic GEO 편집팀</p>
            <p><strong>최종 수정·확인:</strong> {lastVerified}</p>
            <p><strong>의료전문가 검수:</strong> 별도 검수 표기가 없는 콘텐츠에는 적용되지 않음</p>
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/correction-request" className="rounded-md bg-teal-800 px-5 py-3 text-sm font-bold text-white hover:bg-teal-900">
              정보 수정 원칙 보기
            </Link>
            <Link href="/advertising-disclosure" className="rounded-md border border-slate-300 px-5 py-3 text-sm font-bold text-slate-800 hover:border-teal-700">
              광고·이해관계 기준 보기
            </Link>
          </div>
        </section>
      </main>
    </PageFrame>
  );
}
