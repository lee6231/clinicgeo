import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { categories } from "@/lib/posts";
import { buildMetadata, siteUrl } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(
  "/",
  "진료과별 병원 정보와 병원 GEO 블로그",
  "Clinic GEO는 정형외과, 피부과, 치과, 성형외과, 내과의 병원 정보를 확인하고 관련 GEO 아티클을 함께 살펴보는 병원 정보 허브입니다.",
);

const specialtyOrder = [
  "orthopedics-geo",
  "dermatology-geo",
  "dental-geo",
  "plastic-surgery-geo",
  "internal-medicine-geo",
];

const specialtyDetails: Record<string, { number: string; shortName: string; description: string }> = {
  "orthopedics-geo": {
    number: "01",
    shortName: "정형외과",
    description: "척추·관절·통증 진료 범위와 의료진, 검사·치료 정보를 확인합니다.",
  },
  "dermatology-geo": {
    number: "02",
    shortName: "피부과",
    description: "피부 질환과 미용 진료의 상담 주체, 장비, 비용 안내를 살펴봅니다.",
  },
  "dental-geo": {
    number: "03",
    shortName: "치과",
    description: "임플란트·교정·보존 진료와 의료진, 진단 장비 정보를 정리합니다.",
  },
  "plastic-surgery-geo": {
    number: "04",
    shortName: "성형외과",
    description: "진료 분야와 의료진, 상담·수술·사후 관리 정보를 확인합니다.",
  },
  "internal-medicine-geo": {
    number: "05",
    shortName: "내과",
    description: "건강검진과 만성질환, 소화기·호흡기 진료 정보를 살펴봅니다.",
  },
};

const entityFields = [
  ["기본 정보", "공식 병원명, 주소, 전화번호, 진료 시간"],
  ["진료 정보", "진료과목, 의료진, 주요 진료 범위, 보유 장비"],
  ["이용 정보", "예약 방식, 주차, 야간·주말 진료, 공식 홈페이지"],
  ["콘텐츠 연결", "병원별 엔티티 글과 관련 병원 GEO 아티클"],
];

const processSteps = [
  {
    number: "1",
    title: "공개 정보 수집",
    description: "의료기관 공식 홈페이지와 공공기관에 공개된 기본 정보, 진료과목, 의료진 정보를 확인합니다.",
  },
  {
    number: "2",
    title: "이용 정보 대조",
    description: "진료 시간, 예약, 주차와 지도 서비스의 공개 이용 정보를 함께 살펴봅니다.",
  },
  {
    number: "3",
    title: "교차 검증",
    description: "병원명과 주소가 일치하는지 확인하고, 출처가 불분명한 정보는 공개하지 않습니다.",
  },
  {
    number: "4",
    title: "근거로 정리",
    description: "확인된 항목만 병원별 페이지에 정리하고 정보의 마지막 확인일을 표시합니다.",
  },
];

const faqs = [
  {
    question: "병원 정보는 어디에서 확인하나요?",
    answer: "의료기관 공식 홈페이지와 건강보험심사평가원 등 공공기관의 공개 정보, 지도 서비스에 공개된 이용 정보를 확인합니다. 병원별 상세 페이지에는 확인한 출처와 마지막 확인일을 함께 표시합니다.",
  },
  {
    question: "Clinic GEO가 병원 순위를 정하거나 추천하나요?",
    answer: "특정 병원의 우열이나 치료 효과를 평가하지 않습니다. 진료과, 위치, 의료진, 진료 시간과 이용 조건처럼 병원을 알아볼 때 확인할 정보를 정리합니다.",
  },
  {
    question: "리뷰와 별점만으로 병원을 비교하나요?",
    answer: "리뷰와 별점은 공개된 참고 정보 중 하나일 뿐, 의료 서비스의 수준이나 진료 결과를 판단하는 기준으로 사용하지 않습니다. 실제 진료 적합성은 의료진의 상담과 진단을 통해 확인해야 합니다.",
  },
  {
    question: "진료과별 병원은 어떤 기준으로 분류하나요?",
    answer: "병원이 공식적으로 안내한 진료과목과 주요 진료 범위를 기준으로 정형외과, 피부과, 치과, 성형외과, 내과로 구분합니다. 여러 진료과를 운영하는 경우 확인 가능한 범위에서 함께 표시합니다.",
  },
  {
    question: "진료 시간과 의료진 정보는 항상 최신인가요?",
    answer: "병원 정보는 변경될 수 있으므로 마지막 확인일을 표시합니다. 방문이나 예약 전에는 해당 의료기관의 공식 홈페이지 또는 전화로 최신 정보를 다시 확인해 주세요.",
  },
  {
    question: "잘못된 병원 정보는 어떻게 수정하나요?",
    answer: "문의하기 페이지에서 병원명, 수정할 내용과 확인 가능한 공식 출처를 보내 주세요. 내용을 확인한 뒤 정보 페이지에 반영합니다.",
  },
];

export default function Home() {
  const specialties = specialtyOrder
    .map((slug) => categories.find((category) => category.slug === slug))
    .filter((category): category is (typeof categories)[number] => Boolean(category));

  return (
    <div className="min-h-screen bg-white text-[#1f3a5f]">
      <Header />
      <JsonLd
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Clinic GEO",
            description: "진료과별 병원 정보와 병원 GEO 아티클을 연결하는 병원 정보 허브",
            url: siteUrl,
            isPartOf: { "@type": "WebSite", name: "Clinic GEO", url: siteUrl },
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
        <section
          className="relative flex h-[calc(100svh-6rem)] min-h-[560px] max-h-[780px] items-center overflow-hidden bg-cover bg-[62%_center] lg:bg-center"
          style={{ backgroundImage: "url('/clinicgeo-hospital-hero.png')" }}
        >
          <div className="absolute inset-0 bg-[#f7faff]/75 lg:bg-[#f7faff]/62" aria-hidden="true" />
          <div className="relative mx-auto w-full max-w-7xl px-5 py-14 sm:px-6">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase text-teal-800">01 · HOSPITAL INFORMATION HUB</p>
              <h1 className="mt-5 break-keep text-4xl font-bold leading-tight text-[#17365d] sm:text-5xl lg:text-6xl">
                병원을 찾을 때,
                <br />
                정보부터 확인하세요
              </h1>
              <p className="mt-6 max-w-xl break-keep text-base leading-8 text-slate-700 sm:text-lg">
                Clinic GEO는 진료과별 병원 정보를 한곳에 정리하고, 각 병원을 이해하는 데 필요한 엔티티 정보와 관련 아티클을 연결합니다.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/hospitals" className="rounded-md bg-[#2563eb] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#1d4ed8]">
                  진료과별 병원 찾기
                </Link>
                <Link href="/blog" className="rounded-md border border-blue-300 bg-white/90 px-6 py-3.5 text-sm font-bold text-[#17365d] transition hover:border-blue-600">
                  병원 GEO 블로그
                </Link>
              </div>
            </div>
          </div>
          <span className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[10px] font-bold tracking-[0.22em] text-slate-600">SCROLL</span>
        </section>

        <section className="flex min-h-[70svh] items-center border-b border-blue-100 bg-[#f7faff]" id="specialties">
          <div className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-6 lg:py-24">
            <div className="max-w-2xl">
              <p className="text-xs font-bold text-teal-700">02 · SPECIALTIES</p>
              <h2 className="mt-3 break-keep text-3xl font-bold sm:text-4xl">진료과부터 선택해 보세요</h2>
              <p className="mt-4 leading-7 text-slate-600">진료과별 병원 정보와 관련 GEO 콘텐츠가 하나의 흐름으로 이어집니다.</p>
            </div>
            <div className="mt-10 grid border-l border-t border-slate-200 sm:grid-cols-2 lg:grid-cols-5">
              {specialties.map((category) => {
                const detail = specialtyDetails[category.slug];
                return (
                  <Link
                    key={category.slug}
                    href={`/category/${category.slug}`}
                    className="group min-h-64 border-b border-r border-blue-100 bg-white p-6 transition hover:bg-[#eef4ff]"
                  >
                    <span className="text-xs font-bold text-teal-700">{detail.number}</span>
                    <h3 className="mt-14 text-2xl font-bold text-[#17365d] group-hover:text-blue-700">{detail.shortName}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{detail.description}</p>
                    <span className="mt-7 inline-block text-sm font-bold text-teal-800">정보 보기 →</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="flex min-h-[70svh] items-center border-b border-slate-200 bg-white">
          <div className="mx-auto grid w-full max-w-7xl gap-12 px-5 py-16 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:py-24">
            <div>
              <p className="text-xs font-bold text-blue-600">03 · ENTITY STANDARD</p>
              <h2 className="mt-3 break-keep text-3xl font-bold sm:text-4xl">병원 한 곳을 하나의 정보 단위로 정리합니다</h2>
              <p className="mt-5 break-keep leading-8 text-slate-600">
                단순 목록이 아니라 병원별 상세 페이지에 공식 정보, 진료 정보, 이용 조건과 관련 아티클을 함께 연결합니다. 확인되지 않은 정보는 채우지 않고 마지막 확인일을 표시합니다.
              </p>
              <Link href="/hospitals" className="mt-7 inline-flex rounded-md border border-blue-600 px-5 py-3 text-sm font-bold text-blue-700 hover:bg-blue-50">
                병원 정보 구조 살펴보기
              </Link>
            </div>
            <div className="border-t-2 border-[#17365d]">
              {entityFields.map(([title, description], index) => (
                <div key={title} className="grid gap-2 border-b border-slate-200 py-5 sm:grid-cols-[4rem_9rem_1fr] sm:items-center">
                  <span className="text-xs font-bold text-teal-700">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="font-bold text-[#17365d]">{title}</h3>
                  <p className="text-sm leading-6 text-slate-600">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="process" className="flex min-h-[70svh] scroll-mt-16 items-center border-b border-blue-100 bg-[#f3f7ff]">
          <div className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-6 lg:py-24">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-bold text-blue-700">04 · PROCESS</p>
              <h2 className="mt-4 break-keep text-3xl font-bold sm:text-4xl">어떻게 정리하나요?</h2>
              <p className="mt-5 break-keep leading-8 text-slate-600">
                공개된 의료기관 정보를 확인하고 여러 출처를 대조해, 병원을 알아볼 때 참고할 수 있는 내용으로 정리합니다.
              </p>
            </div>
            <div className="relative mt-12 grid gap-9 md:grid-cols-2 lg:grid-cols-4 lg:gap-7">
              <div className="absolute left-[12.5%] right-[12.5%] top-7 hidden h-px bg-blue-200 lg:block" aria-hidden="true" />
              {processSteps.map((step) => (
                <article key={step.number} className="relative text-center">
                  <span className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-md bg-blue-600 text-lg font-bold text-white shadow-[0_10px_24px_rgba(37,99,235,0.2)]">
                    {step.number}
                  </span>
                  <h3 className="mt-6 text-lg font-bold text-[#17365d]">{step.title}</h3>
                  <p className="mx-auto mt-3 max-w-xs text-sm leading-7 text-slate-600">{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="flex min-h-[70svh] scroll-mt-16 items-center border-b border-slate-200 bg-white">
          <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 py-16 sm:px-6 lg:grid-cols-[0.6fr_1.4fr] lg:py-24">
            <div>
              <p className="text-xs font-bold text-teal-700">05 · FAQ</p>
              <h2 className="mt-4 break-keep text-3xl font-bold sm:text-4xl">병원 선택,<br className="hidden lg:block" /> 무엇이 궁금하세요?</h2>
              <p className="mt-5 break-keep leading-8 text-slate-600">병원 정보를 확인할 때 자주 묻는 질문을 정리했습니다.</p>
            </div>
            <div className="border-t-2 border-[#17365d]">
              {faqs.map((faq, index) => (
                <details key={faq.question} className="group border-b border-slate-200" open={index === 0}>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-5 text-base font-bold text-[#17365d]">
                    <span>{faq.question}</span>
                    <span className="text-xl font-normal text-teal-700 group-open:rotate-45" aria-hidden="true">+</span>
                  </summary>
                  <p className="max-w-3xl pb-6 pr-10 text-sm leading-7 text-slate-600">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="scroll-mt-16 border-b border-blue-100 bg-[#f4f8ff]">
          <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-6 lg:grid-cols-[0.62fr_1.38fr] lg:py-24">
            <div>
              <p className="text-xs font-bold text-blue-700">06 · CONTACT</p>
              <h2 className="mt-4 break-keep text-3xl font-bold text-[#17365d] sm:text-4xl">
                병원 정보 등록과
                <br className="hidden lg:block" /> GEO 콘텐츠를 문의하세요
              </h2>
              <p className="mt-5 break-keep text-base leading-8 text-slate-600">
                병원별 정보 등록, 엔티티 페이지, 진료과별 GEO 콘텐츠와 정보 수정 요청을 접수합니다. 남겨주신 내용은 SUMMITFEED 담당자가 확인합니다.
              </p>
              <dl className="mt-8 border-t border-blue-200 text-sm">
                <div className="border-b border-blue-200 py-4">
                  <dt className="font-bold text-[#17365d]">문의 이메일</dt>
                  <dd className="mt-1">
                    <a href="mailto:summit-ai@summitfeed.co.kr" className="font-semibold text-blue-700 underline underline-offset-4">
                      summit-ai@summitfeed.co.kr
                    </a>
                  </dd>
                </div>
                <div className="border-b border-blue-200 py-4">
                  <dt className="font-bold text-[#17365d]">문의 범위</dt>
                  <dd className="mt-1 leading-6 text-slate-600">병원 정보 등록, GEO 콘텐츠, 정보 수정 요청</dd>
                </div>
              </dl>
            </div>
            <div className="bg-white p-6 shadow-[0_12px_36px_rgba(23,54,93,0.08)] sm:p-8">
              <ContactForm />
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
