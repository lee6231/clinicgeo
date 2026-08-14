import type { Metadata } from "next";
import { PageFrame, PageIntro } from "@/components/PageFrame";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(
  "/about",
  "Clinic GEO 소개",
  "Clinic GEO는 써밋피드(SUMMITFEED)가 직접 운영하는 병의원 GEO 전문 사이트입니다.",
);

const roles = [
  ["운영 주체", "Clinic GEO의 운영사와 콘텐츠 발행 주체는 써밋피드(SUMMITFEED)입니다. 사이트의 서비스 안내, GEO 인사이트, 진료별 콘텐츠와 문의 접수는 써밋피드의 병의원 GEO 운영 범위 안에서 관리합니다."],
  ["병의원 GEO 실행", "병원별 진료 분야와 지역, 의료진, 환자 질문을 기준으로 홈페이지 구조와 콘텐츠를 정리하고, ChatGPT·Gemini·Perplexity·Claude에서 브랜드 언급, 공식 URL 출처 인용과 추천 포함 여부를 구분해 확인합니다."],
  ["정보성 콘텐츠", "Clinic GEO는 병의원이 AI와 검색엔진에 제공해야 할 공식 정보, 홈페이지 구조, 환자 질문 콘텐츠를 실무 관점에서 정리합니다."],
  ["월간 운영", "AI 인용 결과와 채널 데이터를 바탕으로 홈페이지, 콘텐츠, 네이버 채널을 월 단위로 보강합니다."],
];

export default function AboutPage() {
  return (
    <PageFrame>
      <main>
        <PageIntro
          eyebrow="Clinic GEO 소개"
          title="써밋피드가 운영하는 병의원 GEO 전문 사이트"
          description="Clinic GEO는 써밋피드(SUMMITFEED)가 병의원 업종에 맞춰 직접 운영하는 GEO 전문 사이트입니다. 병원 홈페이지 구조화, 환자 질문 기반 콘텐츠, 정보성 엔티티 발행, AI 인용 측정, 네이버 채널 운영과 월간 보강을 한 흐름으로 연결합니다."
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
        </section>
      </main>
    </PageFrame>
  );
}
