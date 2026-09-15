"use client";

import { useEffect, useRef } from "react";

const processSteps = [
  {
    number: "01",
    title: "환자 질문 선정",
    description: "환자가 ChatGPT·Gemini 등 AI에 실제로 물어볼 가능성이 높은 증상·진료·비교 질문을 분석해 핵심 타겟 질문을 선정합니다.",
  },
  {
    number: "02",
    title: "AI 노출 측정",
    description: "ChatGPT·Gemini·Perplexity·Claude에서 병원이 어떤 질문에 언급·인용되는지 기준 데이터를 확보합니다.",
  },
  {
    number: "03",
    title: "홈페이지 구조 진단",
    description: "검색엔진과 AI가 병원, 진료 분야, 의료진을 이해할 수 있는 상태인지 사이트 전반을 점검합니다.",
  },
  {
    number: "04",
    title: "경쟁 병원·출처 분석",
    description: "같은 질문에서 어떤 병원이 등장하고 어떤 정보가 인용되는지 비교해 정보 격차를 파악합니다.",
  },
  {
    number: "05",
    title: "답변 구조 설계",
    description: "환자 질문과 검색 의도에 맞춰 정보성·비교·선택 기준 콘텐츠 구조를 설계합니다.",
  },
  {
    number: "06",
    title: "정보성 엔티티 구축",
    description: "병원, 의료진, 진료 분야와 지역 정보를 일관된 출처 기반의 엔티티로 연결합니다.",
  },
  {
    number: "07",
    title: "외부 채널 배포",
    description: "검수한 콘텐츠를 블로그와 관련 외부 채널에 배포해 병원 정보의 접점을 확장합니다.",
  },
  {
    number: "08",
    title: "재측정·고도화",
    description: "동일한 질문을 다시 측정해 플랫폼별 변화를 확인하고, 부족한 영역을 월간 리포트로 정리해 다음 운영에 반영합니다.",
  },
];

export function GeoProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !("IntersectionObserver" in window)) {
      section.classList.add("is-active");
      return;
    }

    section.classList.add("is-ready");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        section.classList.add("is-active");
        observer.disconnect();
      },
      { threshold: 0.22, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="geo-process-section relative overflow-hidden border-b border-[#eadde2] bg-white"
    >
      <div className="mx-auto w-full max-w-[1152px] px-5 py-20 sm:px-6 lg:py-28">
        <p className="text-xs font-bold tracking-[0.16em] text-[#c35476]">CLINIC GEO 8-STEP PROCESS</p>
        <h2 className="mt-4 max-w-4xl break-keep text-3xl font-extrabold leading-tight text-[#3b2934] sm:text-4xl lg:text-[3rem]">
          질문을 찾고, 답변을 설계하고,<br />결과를 다시 측정합니다.
        </h2>
        <p className="mt-5 max-w-2xl break-keep text-base leading-8 text-[#6f5962]">
          실제 환자가 AI에 묻는 질문을 기준으로 현재 노출을 진단하고, 병원이 답변 후보로 연결될 수 있는 구조를 단계적으로 설계합니다.
        </p>

        <ol className="mt-14 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4" aria-label="Clinic GEO 8단계 프로세스">
          {processSteps.map((step, index) => (
            <li
              key={step.number}
              className={`geo-process-step relative min-h-[11.5rem] border-t border-[#ddc7d0] pt-9 ${(index + 1) % 4 !== 0 ? "lg:pr-6" : ""}`}
              style={{ transitionDelay: `${index * 90}ms` }}
            >
              <span
                aria-hidden="true"
                className="absolute -top-5 left-0 flex h-10 w-10 items-center justify-center rounded-full border border-[#e4a9bb] bg-[#fff2f6] font-mono text-xs font-extrabold text-[#95445f]"
              >
                {step.number}
              </span>
              {(index + 1) % 4 !== 0 && (
                <span aria-hidden="true" className="absolute -top-3 right-1 hidden font-mono text-sm text-[#c14a72] lg:inline">
                  →
                </span>
              )}
              <h3 className="break-keep text-lg font-bold leading-snug tracking-tight text-[#211d19]">
                {step.title}
              </h3>
              <p className="mt-3 break-keep text-sm leading-7 text-[#625950]">{step.description}</p>
            </li>
          ))}
        </ol>

        <p className="mt-16 border-t border-[#ddc7d0] pt-6 text-sm font-bold leading-7 text-[#3b2934] md:text-center">
          8단계 프로세스 한 사이클은 <span className="text-[#d26383]">1개월</span> 단위로 진행됩니다.
          <span className="block">확인된 결과를 다음 설계에 반영하며 계약 기간 동안 이 과정을 반복합니다.</span>
        </p>
      </div>
    </section>
  );
}
