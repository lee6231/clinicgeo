import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame, PageIntro } from "@/components/PageFrame";
import { lastVerified } from "@/lib/editorial";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(
  "/correction-request",
  "정보 수정 원칙",
  "Clinic GEO가 병원 정보와 공식 링크의 오류를 확인하고 수정하는 원칙을 안내합니다.",
);

const correctionSteps = [
  ["1. 공식 출처 확인", "의료기관 공식 홈페이지, 공공기관, 검색엔진·AI 플랫폼의 원문처럼 책임 주체가 명확한 자료를 확인합니다."],
  ["2. 변경 시점 구분", "현재 정보와 과거 정보를 섞지 않고 공식 페이지의 게시일·수정일과 Clinic GEO의 확인일을 함께 봅니다."],
  ["3. 표현 범위 검토", "확인된 사실만 고치며 치료 효과, 우월성, 순위처럼 공식 근거로 확정할 수 없는 표현은 추가하지 않습니다."],
  ["4. 수정 기록 반영", "확인된 변경 사항은 본문과 최종 확인일에 반영합니다."],
];

export default function CorrectionRequestPage() {
  return (
    <PageFrame>
      <main>
        <PageIntro
          eyebrow="오류 수정"
          title="정보를 확인하고 수정하는 원칙"
          description="Clinic GEO는 별도 문의 폼을 운영하지 않습니다. 공개된 공식 자료에서 오류나 변경을 확인하면 아래 순서에 따라 콘텐츠와 확인일을 고칩니다."
        />
        <section className="mx-auto max-w-5xl px-5 py-14 sm:px-6">
          <div className="grid gap-px overflow-hidden border border-slate-200 bg-slate-200 md:grid-cols-2">
            {correctionSteps.map(([title, description]) => (
              <article key={title} className="bg-white p-6">
                <h2 className="text-lg font-bold">{title}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
              </article>
            ))}
          </div>
          <div className="mt-10 border-l-4 border-teal-700 bg-teal-50 px-5 py-5 text-sm leading-7 text-slate-700">
            <p className="font-bold text-teal-950">현재 기준 확인일 {lastVerified}</p>
            <p className="mt-2">
              병원 진료 시간, 의료진 일정, 비용과 예약 가능 여부는 수시로 바뀔 수 있습니다. 실제 방문이나
              의사결정 전에는 해당 의료기관의 최신 공식 안내를 직접 확인해야 합니다.
            </p>
          </div>
          <Link
            href="/editorial-policy"
            className="mt-8 inline-flex rounded-md bg-teal-800 px-5 py-3 text-sm font-bold text-white hover:bg-teal-900"
          >
            전체 편집 기준 보기
          </Link>
        </section>
      </main>
    </PageFrame>
  );
}
