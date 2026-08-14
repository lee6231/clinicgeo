import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame, PageIntro } from "@/components/PageFrame";
import { lastVerified } from "@/lib/editorial";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(
  "/editorial-policy",
  "Clinic GEO 콘텐츠 운영·검수 기준",
  "써밋피드가 운영하는 Clinic GEO의 콘텐츠 작성, 자료 확인과 오류 수정 기준을 안내합니다.",
);

const policies = [
  ["병원 후보 선정", "지역, 진료 분야, 공식 의료진 정보, 진료 범위, 이용 조건과 정보 공개 여부를 확인합니다. 후기 수나 확인되지 않은 평점은 선정 근거로 사용하지 않습니다."],
  ["GEO 자료 편집", "검색·크롤링, 구조화 데이터와 AI 크롤러 정보는 검색엔진, AI 플랫폼과 Schema.org의 공식 문서를 우선해 정리합니다."],
  ["공식 정보 우선", "병원 공식 홈페이지, 정부·공공기관, 검색엔진과 Schema.org 공식 문서를 우선합니다. 공개 페이지에서 확인하기 어려운 항목은 확인되지 않은 정보로 구분합니다."],
  ["비교 콘텐츠 기준", "업체·병원·서비스 비교는 공개된 공식 자료, 확인일과 사전에 정한 평가 항목을 기준으로 작성합니다. 공개 자료에서 확인되지 않는 항목은 미확인으로 표시합니다."],
  ["운영 주체", "Clinic GEO는 써밋피드(SUMMITFEED)가 운영하는 병의원 GEO 전문 사이트입니다."],
  ["오류 수정", "병원명, 주소, 진료 시간과 공식 링크에 오류가 확인되면 공식 근거와 확인일을 기록해 수정합니다."],
];

export default function EditorialPolicyPage() {
  return (
    <PageFrame tone="white">
      <main>
        <PageIntro
          eyebrow="편집 정책"
          title="Clinic GEO 콘텐츠 운영·검수 기준"
          description="Clinic GEO는 써밋피드(SUMMITFEED)가 운영합니다. 공개된 공식 정보와 콘텐츠별 검수 기준을 사용해 병의원 GEO 실무 자료를 제작합니다."
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
            <p><strong>작성 및 편집:</strong> 써밋피드(SUMMITFEED) · Clinic GEO 운영팀</p>
            <p><strong>최종 수정·확인:</strong> {lastVerified}</p>
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/correction-request" className="rounded-md bg-teal-800 px-5 py-3 text-sm font-bold text-white hover:bg-teal-900">
              정보 수정 원칙 보기
            </Link>
          </div>
        </section>
      </main>
    </PageFrame>
  );
}
