import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AiQuestionSection } from "@/components/AiQuestionSection";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { GeoProcessSection } from "@/components/GeoProcessSection";
import { GeoShiftSection } from "@/components/GeoShiftSection";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { ServiceSeries } from "@/components/ServiceSeries";
import { buildMetadata, siteDescription, siteUrl, websiteId } from "@/lib/seo";

export const metadata: Metadata = {
  ...buildMetadata("/", "병의원 GEO 서비스와 인사이트", siteDescription),
  title: {
    absolute: "병의원 GEO 서비스와 인사이트 | Clinic GEO by SUMMITFEED",
  },
  openGraph: {
    ...buildMetadata("/", "병의원 GEO 서비스와 인사이트", siteDescription).openGraph,
    title: "병의원 GEO 서비스와 인사이트 | Clinic GEO by SUMMITFEED",
  },
  twitter: {
    ...buildMetadata("/", "병의원 GEO 서비스와 인사이트", siteDescription).twitter,
    title: "병의원 GEO 서비스와 인사이트 | Clinic GEO by SUMMITFEED",
  },
};

const inHouseSteps = [
  {
    number: "01",
    title: "AIGEO 원고 설계",
    description: "진료과와 핵심 질문을 분석해 AI가 이해하기 쉬운 원고 구조를 직접 설계합니다.",
  },
  {
    number: "02",
    title: "원고 작성·검수",
    description: "병원 자료와 확인 가능한 출처를 바탕으로 작성하고, 표현과 정보 구조를 직접 검수합니다.",
  },
  {
    number: "03",
    title: "발행·정보 연결",
    description: "완성된 원고를 서브 홈페이지와 블로그에 발행하고 병원 엔티티와 연결합니다.",
  },
];

const faqs = [
  {
    question: "병원 GEO는 정확히 어떤 서비스인가요?",
    answer: "병원 GEO는 ChatGPT, Gemini, Perplexity, Claude와 같은 생성형 AI가 병원의 진료 정보와 전문 분야를 이해할 수 있도록 홈페이지와 콘텐츠 구조를 정비하는 작업입니다. 단순히 글을 많이 발행하는 방식이 아니라, 병원 정보와 진료 항목, 의료진, 지역, 환자 질문이 서로 연결되도록 설계합니다.",
  },
  {
    question: "기존 SEO나 네이버 블로그 마케팅과 무엇이 다른가요?",
    answer: "SEO와 블로그 마케팅이 검색 결과에서의 노출을 목표로 한다면, GEO는 AI가 특정 질문에 답변할 때 병원이나 홈페이지를 참고하도록 만드는 데 초점을 둡니다. 두 방식은 서로 대체하는 관계가 아니라 함께 운영했을 때 효과가 커집니다.",
  },
  {
    question: "기존 홈페이지가 있어도 GEO 작업이 가능한가요?",
    answer: "가능합니다. 기존 홈페이지의 제목, 페이지 구성, 내부 링크, FAQ, 구조화 데이터, 진료 정보 등을 먼저 점검한 뒤 필요한 부분을 보완합니다. 홈페이지를 새로 제작하지 않아도 현재 구조를 활용해 단계적으로 개선할 수 있습니다.",
  },
  {
    question: "어떤 내용을 중심으로 작업하나요?",
    answer: "병원의 주요 진료 분야와 지역, 의료진 정보, 환자가 자주 묻는 질문을 기준으로 작업합니다. 예를 들어 단순히 ‘정형외과’라는 키워드만 다루는 것이 아니라, 증상·검사·치료 과정·내원 시점처럼 실제 환자가 궁금해하는 질문까지 함께 구성합니다.",
  },
  {
    question: "GEO 작업 후 AI 인용까지 얼마나 걸리나요?",
    answer: "공개된 병원 정보가 AI 답변에 반영되도록 홈페이지 상태와 검색엔진 색인을 정리합니다. 일반적으로 4~8주의 관찰 기간을 두고 인용 여부를 확인하며, 그동안 부족한 질문과 페이지를 지속적으로 보완합니다.",
  },
  {
    question: "AI 노출과 인용 여부는 어떻게 확인하나요?",
    answer: "ChatGPT, Gemini, Perplexity, Claude 4개 AI 플랫폼의 API를 활용해 병원별로 선정한 20개 질문을 측정합니다. 질문별 병원명 언급, 홈페이지 출처 인용과 추천 포함 여부를 누적하고, 1·2·3개월차 인용률(%) 변화와 질문별 결과를 월간 리포트로 제공합니다.",
  },
];

const aiPlatforms = [
  {
    name: "GPT",
    color: "#ffffff",
    path: "M9.205 8.658v-2.26c0-.19.072-.333.238-.428l4.543-2.616c.619-.357 1.356-.523 2.117-.523 2.854 0 4.662 2.212 4.662 4.566 0 .167 0 .357-.024.547l-4.71-2.759a.797.797 0 00-.856 0l-5.97 3.473zm10.609 8.8V12.06c0-.333-.143-.57-.429-.737l-5.97-3.473 1.95-1.118a.433.433 0 01.476 0l4.543 2.617c1.309.76 2.189 2.378 2.189 3.948 0 1.808-1.07 3.473-2.76 4.163zM7.802 12.703l-1.95-1.142c-.167-.095-.239-.238-.239-.428V5.899c0-2.545 1.95-4.472 4.591-4.472 1 0 1.927.333 2.712.928L8.23 5.067c-.285.166-.428.404-.428.737v6.898zM12 15.128l-2.795-1.57v-3.33L12 8.658l2.795 1.57v3.33L12 15.128zm1.796 7.23c-1 0-1.927-.332-2.712-.927l4.686-2.712c.285-.166.428-.404.428-.737v-6.898l1.974 1.142c.167.095.238.238.238.428v5.233c0 2.545-1.974 4.472-4.614 4.472zm-5.637-5.303l-4.544-2.617c-1.308-.761-2.188-2.378-2.188-3.948A4.482 4.482 0 014.21 6.327v5.423c0 .333.143.571.428.738l5.947 3.449-1.95 1.118a.432.432 0 01-.476 0zm-.262 3.9c-2.688 0-4.662-2.021-4.662-4.519 0-.19.024-.38.047-.57l4.686 2.71c.286.167.571.167.856 0l5.97-3.448v2.26c0 .19-.07.333-.237.428l-4.543 2.616c-.619.357-1.356.523-2.117.523zm5.899 2.83a5.947 5.947 0 005.827-4.756C22.287 18.339 24 15.84 24 13.296c0-1.665-.713-3.282-1.998-4.448.119-.5.19-.999.19-1.498 0-3.401-2.759-5.947-5.946-5.947-.642 0-1.26.095-1.88.31A5.962 5.962 0 0010.205 0a5.947 5.947 0 00-5.827 4.757C1.713 5.447 0 7.945 0 10.49c0 1.666.713 3.283 1.998 4.448-.119.5-.19 1-.19 1.499 0 3.401 2.759 5.946 5.946 5.946.642 0 1.26-.095 1.88-.309a5.96 5.96 0 004.162 1.713z",
  },
  {
    name: "Gemini",
    color: "#8ab4f8",
    path: "M20.616 10.835a14.147 14.147 0 01-4.45-3.001 14.111 14.111 0 01-3.678-6.452.503.503 0 00-.975 0 14.134 14.134 0 01-3.679 6.452 14.155 14.155 0 01-4.45 3.001c-.65.28-1.318.505-2.002.678a.502.502 0 000 .975c.684.172 1.35.397 2.002.677a14.147 14.147 0 014.45 3.001 14.112 14.112 0 013.679 6.453.502.502 0 00.975 0c.172-.685.397-1.351.677-2.003a14.145 14.145 0 013.001-4.45 14.113 14.113 0 016.453-3.678.503.503 0 000-.975 13.245 13.245 0 01-2.003-.678z",
  },
  {
    name: "Perplexity",
    color: "#20b8cd",
    path: "M19.785 0v7.272H22.5V17.62h-2.935V24l-7.037-6.194v6.145h-1.091v-6.152L4.392 24v-6.465H1.5V7.188h2.884V0l7.053 6.494V.19h1.09v6.49L19.786 0zm-7.257 9.044v7.319l5.946 5.234V14.44l-5.946-5.397zm-1.099-.08l-5.946 5.398v7.235l5.946-5.234V8.965zm8.136 7.58h1.844V8.349H13.46l6.105 5.54v2.655zm-8.982-8.28H2.59v8.195h1.8v-2.576l6.192-5.62zM5.475 2.476v4.71h5.115l-5.115-4.71zm13.219 0l-5.115 4.71h5.115v-4.71z",
  },
  {
    name: "Claude",
    color: "#d97757",
    path: "M4.709 15.955l4.72-2.647.08-.23-.08-.128H9.2l-.79-.048-2.698-.073-2.339-.097-2.266-.122-.571-.121L0 11.784l.055-.352.48-.321.686.06 1.52.103 2.278.158 1.652.097 2.449.255h.389l.055-.157-.134-.098-.103-.097-2.358-1.596-2.552-1.688-1.336-.972-.724-.491-.364-.462-.158-1.008.656-.722.881.06.225.061.893.686 1.908 1.476 2.491 1.833.365.304.145-.103.019-.073-.164-.274-1.355-2.446-1.446-2.49-.644-1.032-.17-.619a2.97 2.97 0 01-.104-.729L6.283.134 6.696 0l.996.134.42.364.62 1.414 1.002 2.229 1.555 3.03.456.898.243.832.091.255h.158V9.01l.128-1.706.237-2.095.23-2.695.08-.76.376-.91.747-.492.584.28.48.685-.067.444-.286 1.851-.559 2.903-.364 1.942h.212l.243-.242.985-1.306 1.652-2.064.73-.82.85-.904.547-.431h1.033l.76 1.129-.34 1.166-1.064 1.347-.881 1.142-1.264 1.7-.79 1.36.073.11.188-.02 2.856-.606 1.543-.28 1.841-.315.833.388.091.395-.328.807-1.969.486-2.309.462-3.439.813-.042.03.049.061 1.549.146.662.036h1.622l3.02.225.79.522.474.638-.079.485-1.215.62-1.64-.389-3.829-.91-1.312-.329h-.182v.11l1.093 1.068 2.006 1.81 2.509 2.33.127.578-.322.455-.34-.049-2.205-1.657-.851-.747-1.926-1.62h-.128v.17l.444.649 2.345 3.521.122 1.08-.17.353-.608.213-.668-.122-1.374-1.925-1.415-2.167-1.143-1.943-.14.08-.674 7.254-.316.37-.729.28-.607-.461-.322-.747.322-1.476.389-1.924.315-1.53.286-1.9.17-.632-.012-.042-.14.018-1.434 1.967-2.18 2.945-1.726 1.845-.414.164-.717-.37.067-.662.401-.589 2.388-3.036 1.44-1.882.93-1.086-.006-.158h-.055L4.132 18.56l-1.13.146-.487-.456.061-.746.231-.243 1.908-1.312-.006.006z",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f7f6f2] text-[#172638]">
      <Header tone="hero" />
      <JsonLd
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Clinic GEO",
            description: siteDescription,
            url: siteUrl,
            isPartOf: { "@id": websiteId },
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: { "@type": "Answer", text: faq.answer },
            })),
          },
        ]}
      />

      <main>
        <section className="relative flex h-[calc(100svh-4rem)] min-h-[620px] max-h-[820px] items-center overflow-hidden bg-[#07121e]">
          <div className="relative mx-auto w-full max-w-5xl px-5 py-16 text-center sm:px-6">
            <div className="relative mx-auto h-14 w-64" aria-label="GPT, Gemini, Perplexity, Claude">
              <span className="sr-only">GPT, Gemini, Perplexity, Claude</span>
              {aiPlatforms.map((platform, index) => (
                <div
                  key={platform.name}
                  className="ai-logo-rotator-item absolute inset-0 flex items-center justify-center gap-3"
                  style={{ animationDelay: `${index * 3}s` }}
                  aria-hidden="true"
                >
                  <svg viewBox="0 0 24 24" className="h-9 w-9 shrink-0" fill={platform.color} aria-hidden="true">
                    <path fillRule="evenodd" d={platform.path} />
                  </svg>
                  <span className="text-2xl font-semibold tracking-[-0.03em] text-white">{platform.name}</span>
                </div>
              ))}
            </div>

            <p className="mt-8 text-xs font-bold tracking-[0.16em] text-blue-300">병원 GEO · GENERATIVE ENGINE OPTIMIZATION</p>
            <h1 className="mx-auto mt-6 max-w-4xl break-keep text-4xl font-bold leading-[1.12] tracking-[-0.045em] text-white sm:text-5xl lg:text-[4.5rem]">
              병원은 <span className="text-blue-300">AI 검색</span>에서
              <br />
              어떻게 추천될까
            </h1>
            <p className="mx-auto mt-7 max-w-2xl break-keep text-base font-bold leading-8 text-white sm:text-lg">
              Clinic GEO는 써밋피드(SUMMITFEED)가 직접 운영하는 병의원 GEO 전문 사이트입니다.
            </p>
            <p className="mx-auto mt-2 max-w-2xl break-keep text-sm leading-7 text-slate-400 sm:text-base">
              병원 홈페이지 구조화, 진료별 질문 콘텐츠, 정보성 엔티티 발행, ChatGPT·Gemini·Perplexity·Claude
              인용 측정, 네이버 채널 운영과 월간 보강을 하나의 흐름으로 연결합니다.
            </p>
            <Link href="/blog" className="mt-9 inline-flex items-center gap-3 border-b border-white pb-1 text-sm font-bold text-white transition hover:border-blue-300 hover:text-blue-300">
              GEO 인사이트 보기 <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>

        <ServiceSeries />

        <section className="relative overflow-hidden border-b border-blue-100 bg-[#fbfaf7]">
          <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-blue-50 to-transparent" aria-hidden="true" />
          <div
            className="absolute inset-0 opacity-30 [background-image:radial-gradient(#cbd6e0_1px,transparent_1px)] [background-size:24px_24px]"
            aria-hidden="true"
          />
          <div className="relative mx-auto w-full max-w-7xl px-5 py-16 sm:px-6 lg:py-20">
            <div className="grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16">
              <div>
                <p className="text-xs font-bold tracking-[0.16em] text-blue-700">03 · IN-HOUSE PRODUCTION</p>
                <h2 className="mt-4 max-w-xl break-keep text-3xl font-bold leading-tight text-[#102a43] sm:text-4xl lg:text-[2.75rem]">
                  외주가 아닙니다.<br />설계부터 발행까지 직접 합니다.
                </h2>
                <p className="mt-5 max-w-xl break-keep text-sm leading-7 text-slate-600 sm:text-base">
                  Clinic GEO는 AIGEO 원고의 방향을 정하는 일부터 작성, 검수, 발행까지 전 과정을 내부에서 직접 실행합니다.
                </p>

                <div className="mt-8 overflow-hidden rounded-2xl border border-blue-100 bg-[#f7f6f2]/92 shadow-[0_16px_44px_rgba(16,42,67,0.06)]">
                  {inHouseSteps.map((step) => (
                    <div key={step.number} className="grid gap-3 border-b border-blue-100 px-5 py-4 last:border-b-0 sm:grid-cols-[3rem_9rem_1fr] sm:items-center sm:px-6">
                      <span className="font-mono text-xs font-bold text-blue-500">{step.number}</span>
                      <h3 className="font-bold text-[#102a43]">{step.title}</h3>
                      <p className="break-keep text-sm leading-6 text-slate-600">{step.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <figure className="overflow-hidden rounded-2xl border border-blue-100 bg-[#f7f6f2] p-2 shadow-[0_22px_60px_rgba(16,42,67,0.1)]">
                <div className="relative aspect-[3/2] overflow-hidden rounded-xl bg-blue-50">
                  <Image
                    src="/clinicgeo-inhouse-production.webp"
                    alt="AIGEO 원고 자료를 직접 작성하고 구성하는 작업 모습"
                    fill
                    sizes="(min-width: 1024px) 46vw, 100vw"
                    className="object-cover"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#071426]/95 via-[#071426]/80 to-transparent px-5 pb-5 pt-14 text-sm font-bold text-white">
                    원고 설계부터 검수·발행까지, 한 팀이 직접 실행합니다.
                  </figcaption>
                </div>
              </figure>
            </div>

            <p className="mt-12 border-t border-blue-200 pt-6 text-center text-sm font-bold text-[#102a43]">
              기획과 제작 과정을 나누지 않습니다. <span className="text-blue-700">외주 없이, 우리 손으로 끝까지 만듭니다.</span>
            </p>
          </div>
        </section>

        <GeoShiftSection />

        <GeoProcessSection />

        <AiQuestionSection />

        <section id="faq" className="flex min-h-[70svh] scroll-mt-16 items-center border-b border-blue-100 bg-[#fbfaf7]">
          <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 py-16 sm:px-6 lg:grid-cols-[0.6fr_1.4fr] lg:py-24">
            <div>
              <p className="text-xs font-bold text-teal-700">06 · FAQ</p>
              <h2 className="mt-4 break-keep text-3xl font-bold sm:text-4xl">병원에서 자주 묻는 질문</h2>
              <p className="mt-5 break-keep leading-8 text-slate-600">도입 전 가장 많이 확인하는 병원 GEO의 작업 범위와 운영 기준을 정리했습니다.</p>
            </div>
            <div className="border-t-2 border-[#102a43]">
              {faqs.map((faq, index) => (
                <details key={faq.question} className="group border-b border-slate-200" open={index === 0}>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-5 text-base font-bold text-[#102a43]">
                    <span className="flex items-start gap-4">
                      <span className="font-mono text-xs leading-6 text-blue-500">{String(index + 1).padStart(2, "0")}</span>
                      <span>{faq.question}</span>
                    </span>
                    <span className="text-xl font-normal text-teal-700 group-open:rotate-45" aria-hidden="true">+</span>
                  </summary>
                  <p className="max-w-3xl pb-6 pr-10 text-sm leading-7 text-slate-600">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="relative scroll-mt-16 overflow-hidden border-b border-blue-100 bg-gradient-to-b from-[#fbfaf7] to-[#eff3f6]">
          <div className="absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-100/60 blur-3xl" aria-hidden="true" />
          <div className="relative mx-auto max-w-4xl px-5 py-16 sm:px-6 lg:py-24">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-bold tracking-[0.16em] text-blue-700">CONTACT</p>
              <h2 className="mt-4 text-3xl font-bold text-[#102a43] sm:text-4xl">문의하기</h2>
              <p className="mt-4 break-keep text-sm leading-7 text-slate-600 sm:text-base">
                병원명과 사이트 주소를 남겨 주시면 필요한 작업 범위를 확인한 뒤 연락드립니다.
              </p>
            </div>
            <div className="mt-10">
              <ContactForm />
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
