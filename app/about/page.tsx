import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata, siteUrl } from "@/lib/seo";

const capabilities = [
  "병의원 GEO 콘텐츠 기획 및 발행",
  "ChatGPT·Gemini·Perplexity·Claude 검색 질문 구조 분석",
  "진료과별 FAQ, 표, 체크리스트 기반 답변형 콘텐츠 설계",
  "의료광고 위험 표현 사전 점검과 사실 확인 흐름 정리",
  "SUMMITFEED 본진 사이트와 연계한 AI 검색 최적화 전략 운영",
];

export const metadata: Metadata = buildMetadata(
  "/about",
  "회사소개",
  "Clinic GEO는 SUMMITFEED가 운영하는 병의원 전용 GEO 콘텐츠 사이트입니다. 병원과 진료과별 AI 검색 최적화 콘텐츠를 정리합니다.",
);

export default function AboutPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      name: "Clinic GEO 회사소개",
      url: `${siteUrl}/about`,
      description:
        "Clinic GEO는 SUMMITFEED가 운영하는 병의원 전용 GEO 콘텐츠 사이트로, 의료 분야 AI 검색 최적화 콘텐츠를 발행합니다.",
      mainEntity: {
        "@type": "Organization",
        name: "SUMMITFEED",
        alternateName: "Clinic GEO",
        url: siteUrl,
        sameAs: ["https://www.summitfeed.co.kr"],
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "SUMMITFEED",
      alternateName: "Clinic GEO",
      url: siteUrl,
      sameAs: ["https://www.summitfeed.co.kr"],
      description:
        "SUMMITFEED는 병의원과 전문 업종의 AI 검색 최적화, GEO 콘텐츠 구조 설계, AI 인용 가능성 개선을 지원합니다.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f7f8fb] text-slate-950">
      <Header />
      <JsonLd jsonLd={jsonLd} />
      <main>
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
            <p className="text-sm font-semibold uppercase text-orange-600">About Clinic GEO</p>
            <h1 className="mt-4 max-w-3xl break-keep text-4xl font-semibold leading-tight text-slate-950 sm:text-5xl">
              Clinic GEO는 SUMMITFEED가 운영하는 병의원 GEO 콘텐츠 사이트입니다.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              병원, 치과, 피부과, 정형외과, 내과, 성형외과처럼 진료과별로 달라지는 AI 검색 질문을
              정리하고, ChatGPT·Gemini·Perplexity·Claude 같은 생성형 AI 환경에서 이해하기 쉬운
              답변형 콘텐츠 구조를 다룹니다.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/blog"
                className="rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                발행 아티클 보기
              </Link>
              <a
                href="https://www.summitfeed.co.kr"
                className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-orange-300 hover:text-orange-700"
                target="_blank"
                rel="noopener noreferrer"
              >
                SUMMITFEED 본진 보기
              </a>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-6xl gap-8 px-6 py-14 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-semibold uppercase text-orange-600">What We Do</p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight text-slate-950">
              의료 콘텐츠를 AI가 이해하기 쉬운 구조로 정리합니다.
            </h2>
          </div>
          <div className="grid gap-3">
            {capabilities.map((item) => (
              <div key={item} className="rounded-lg border border-slate-200 bg-white p-5 text-base leading-7 text-slate-700">
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="border-y border-slate-200 bg-white">
          <div className="mx-auto grid max-w-6xl gap-8 px-6 py-14 md:grid-cols-3">
            <div>
              <p className="text-sm font-semibold text-slate-500">운영 주체</p>
              <p className="mt-3 text-2xl font-semibold text-slate-950">SUMMITFEED</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-500">운영 사이트</p>
              <p className="mt-3 text-2xl font-semibold text-slate-950">Clinic GEO</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-500">주요 주제</p>
              <p className="mt-3 text-2xl font-semibold text-slate-950">병의원 GEO</p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-14">
          <div className="rounded-lg border border-slate-200 bg-white p-8">
            <h2 className="text-2xl font-semibold text-slate-950">콘텐츠 운영 기준</h2>
            <p className="mt-5 text-base leading-8 text-slate-600">
              Clinic GEO의 콘텐츠는 특정 치료 효과나 AI 인용 결과를 보장하지 않습니다. 대신 질문 의도,
              정보 구조, 사실 확인, 의료광고 표현 리스크를 함께 고려해 병의원 마케팅 담당자가 참고할 수 있는
              정보형 콘텐츠를 발행합니다.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
