"use client";

import { useEffect, useRef } from "react";

const processSteps = [
  {
    number: "01",
    english: "ONBOARDING",
    title: "온보딩 질문지",
    description: "진료과, 핵심 진료, 운영 현황과 기존 채널을 확인해 병원 GEO의 기준 정보를 수집합니다.",
  },
  {
    number: "02",
    english: "SITE STRUCTURE",
    title: "홈페이지 구조화",
    description: "AI와 검색엔진이 병원 정보의 관계를 이해하도록 페이지 계층과 내부 연결 구조를 설계합니다.",
  },
  {
    number: "03",
    english: "ENTITY BUILD",
    title: "정보성 엔티티 구축",
    description: "병원, 의료진, 진료 분야와 지역 정보를 일관된 출처 기반의 엔티티로 연결합니다.",
  },
  {
    number: "04",
    english: "DISTRIBUTION",
    title: "외부 채널 배포",
    description: "검수한 콘텐츠를 블로그와 관련 외부 채널에 배포해 병원 정보의 접점을 확장합니다.",
  },
  {
    number: "05",
    english: "CITATION CHECK",
    title: "AI 인용률 확인",
    description: "주요 질문별 인용 여부와 출처 노출을 점검하고 결과를 다음 구조 개선에 반영합니다.",
  },
  {
    number: "06",
    english: "MONTHLY REPORT",
    title: "월간 리포트",
    description: "발행 링크와 AI 인용률을 정리하고, 시크릿 모드 검색 결과를 캡처해 월간 보고서로 전달합니다.",
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
      className="geo-process-section relative overflow-hidden border-b border-blue-100 bg-[#fffaf4]"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-[#d26383] opacity-30" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-[1152px] px-5 py-20 sm:px-6 lg:py-28">
        <div className="grid gap-6 border-b border-[#ddc7d0] pb-10 lg:grid-cols-[0.38fr_1.62fr] lg:items-end lg:gap-12 lg:pb-12">
          <p className="self-start text-xs font-bold tracking-[0.16em] text-blue-600">HOW WE WORK</p>
          <div>
            <h2 className="max-w-4xl break-keep text-3xl font-extrabold leading-tight text-[#3b2934] sm:text-4xl lg:text-[3rem]">
              질문을 찾고, 답변을 설계하고,<br />결과를 다시 측정합니다.
            </h2>
            <p className="mt-5 max-w-2xl break-keep text-base leading-8 text-[#6f5962]">
              병원을 이해하는 온보딩부터 월간 결과 보고까지, 각 단계의 데이터를 다음 작업으로 연결합니다.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {processSteps.map((step, index) => (
            <article
              key={step.number}
              className={`geo-process-step relative min-h-64 rounded-lg border p-6 sm:p-7 ${index === 0 || index === 5 ? "border-[#d26383] bg-[#fff1f5]" : "border-[#eadde2] bg-[#fffdf9]"}`}
              style={{ transitionDelay: `${index * 140}ms` }}
            >
              <div className="flex items-start justify-between gap-5 border-b border-[#e5d4da] pb-5">
                <p className="text-[10px] font-bold tracking-[0.12em] text-blue-600">{step.english}</p>
                <span className="font-mono text-2xl font-bold text-[#e4a9bb]">{step.number}</span>
              </div>
              <h3 className="mt-7 break-keep text-xl font-bold leading-snug text-[#3b2934]">{step.title}</h3>
              <p className="mt-4 break-keep text-sm leading-7 text-[#6f5962]">{step.description}</p>
            </article>
          ))}
        </div>

        <p className="mt-12 border-t border-blue-200 pt-6 text-sm font-bold leading-7 text-[#3b2934] md:text-center">
          온보딩부터 월간 리포트까지 한 번의 운영은 <span className="text-blue-700">1개월 사이클</span>입니다.
          <span className="block">확인된 결과를 다음 설계에 반영하며 계약 기간 동안 이 과정을 반복합니다.</span>
        </p>
      </div>
    </section>
  );
}
