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
      className="geo-process-section relative overflow-hidden border-b border-blue-100 bg-[#eff3f6]"
    >
      <div className="absolute -left-28 top-20 h-80 w-80 rounded-full bg-white blur-3xl" aria-hidden="true" />
      <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-blue-200/45 blur-3xl" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-7xl px-5 py-16 sm:px-6 lg:py-20">
        <div className="max-w-3xl">
          <p className="text-xs font-bold tracking-[0.16em] text-blue-700">04 · GEO WORKFLOW</p>
          <h2 className="mt-4 break-keep text-3xl font-bold leading-tight text-[#102a43] sm:text-4xl lg:text-[2.75rem]">
            병원 GEO는 여섯 단계로 실행됩니다.
          </h2>
          <p className="mt-5 max-w-2xl break-keep text-base leading-8 text-slate-600">
            병원을 이해하는 온보딩부터 월간 결과 보고까지, 각 단계의 데이터를 다음 작업으로 연결합니다.
          </p>
        </div>

        <div className="relative mt-14 grid gap-0 md:grid-cols-6">
          <div className="absolute left-[8.333%] right-[8.333%] top-5 hidden h-px bg-blue-200 md:block" aria-hidden="true" />
          {processSteps.map((step, index) => (
            <article
              key={step.number}
              className="geo-process-step relative border-l border-blue-200 py-2 pb-10 pl-8 last:pb-0 md:border-l-0 md:border-t-0 md:px-4 md:pb-0 md:pt-0"
              style={{ transitionDelay: `${index * 520}ms` }}
            >
              <span className="absolute -left-[5px] top-3 h-[9px] w-[9px] rounded-full bg-blue-600 ring-4 ring-[#eff3f6] md:static md:mx-auto md:flex md:h-10 md:w-10 md:items-center md:justify-center md:ring-8 md:ring-[#eff3f6]">
                <span className="hidden font-mono text-[11px] font-bold text-white md:inline">{step.number}</span>
              </span>
              <span className="font-mono text-xs font-bold text-blue-600 md:hidden">{step.number}</span>
              <div className="md:text-center">
                <p className="mt-1 text-[10px] font-bold tracking-[0.12em] text-blue-500 md:mt-6">{step.english}</p>
                <h3 className="mt-2 break-keep text-lg font-bold text-[#102a43]">{step.title}</h3>
                <p className="mt-3 break-keep text-sm leading-6 text-slate-600">{step.description}</p>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-12 border-t border-blue-200 pt-6 text-sm font-bold leading-7 text-[#102a43] md:text-center">
          온보딩부터 월간 리포트까지 한 번의 운영은 <span className="text-blue-700">1개월 사이클</span>입니다.
          <span className="block">확인된 결과를 다음 설계에 반영하며 계약 기간 동안 이 과정을 반복합니다.</span>
        </p>
      </div>
    </section>
  );
}
