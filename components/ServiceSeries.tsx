"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

const services = [
  {
    number: "01",
    category: "AI SEARCH",
    title: "GEO — AI 최적화 설계",
    description: "AI가 병원 정보를 찾고 이해할 수 있도록 엔티티와 콘텐츠 구조를 설계합니다.",
    naver: false,
  },
  {
    number: "02",
    category: "AI CITATION",
    title: "병원 AI 인용 서브 홈페이지",
    description: "병원 서브 홈페이지를 제작하고, AI가 해당 병원을 인용할 수 있도록 정보성 엔티티를 연결합니다.",
    naver: false,
  },
  {
    number: "03",
    category: "NAVER PLACE",
    title: "네이버 플레이스",
    description: "네이버 플레이스를 7일 관리 방식으로 운영하며 지역·진료 키워드 순위 작업을 진행합니다.",
    naver: true,
  },
  {
    number: "04",
    category: "NAVER BLOG",
    title: "병원 브랜딩 블로그",
    description: "병원의 진료 철학과 강점을 담은 브랜딩 콘텐츠를 월 12회 발행합니다.",
    naver: true,
  },
  {
    number: "05",
    category: "NAVER SEARCH",
    title: "네이버 25개 키워드 블로그 상위노출",
    description: "25개 목표 키워드의 블로그 상위노출을 진행하고, 노출 달성 후 25일간 유지 관리합니다.",
    naver: true,
  },
];

function NaverMark() {
  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#03c75a] text-white" aria-label="네이버">
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
        <path d="M16.273 12.845 7.376 0H0v24h7.726V11.156L16.624 24H24V0h-7.727v12.845Z" />
      </svg>
    </span>
  );
}

export function ServiceSeries() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = Array.from(section.querySelectorAll<HTMLElement>("[data-service-card]"));
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      cards.forEach((card) => card.classList.add("is-visible"));
      return;
    }

    section.classList.add("is-ready");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="service-series relative overflow-hidden border-b border-blue-100 bg-[#f7f6f2]" id="services">
      <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-blue-50 to-transparent" aria-hidden="true" />
      <div className="absolute -right-28 top-20 h-72 w-72 rounded-full bg-blue-100/55 blur-3xl" aria-hidden="true" />

      <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-5 py-14 sm:px-6 lg:grid-cols-[0.56fr_1.44fr] lg:gap-14 lg:py-20">
        <div className="self-start lg:sticky lg:top-28">
          <p className="text-xs font-bold tracking-[0.12em] text-blue-700">02 · WHAT WE DO</p>
          <h2 className="mt-3 max-w-sm break-keep text-3xl font-bold leading-tight text-[#102a43] sm:text-4xl">
            병원 성장을 위한 다섯 가지 작업
          </h2>
          <p className="mt-4 max-w-sm break-keep text-sm leading-6 text-slate-600">
            AI 인용 구조부터 네이버 검색 관리까지 한 흐름으로 운영합니다.
          </p>
          <Link href="/contact" className="mt-6 inline-flex items-center gap-3 border-b-2 border-blue-700 pb-1 text-sm font-bold text-blue-800 transition hover:border-blue-500 hover:text-blue-600">
            업무 범위 문의하기 <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {services.map((service, index) => (
            <article
              key={service.number}
              data-service-card
              className={`service-reveal-card relative overflow-hidden rounded-2xl border border-blue-100 bg-[#fbfaf7] p-5 shadow-[0_14px_38px_rgba(16,42,67,0.06)] sm:p-6 ${index === services.length - 1 ? "sm:col-span-2" : ""}`}
              style={{ transitionDelay: `${index * 100}ms, ${index * 100}ms, 0ms` }}
            >
              <div className="absolute inset-y-0 left-0 w-1 bg-blue-600" aria-hidden="true" />
              <div className="flex items-start justify-between gap-5">
                <div className="flex items-center gap-3">
                  {service.naver ? <NaverMark /> : (
                    <span className="flex h-9 min-w-9 items-center justify-center rounded-lg bg-blue-700 px-2 text-[10px] font-bold tracking-[0.08em] text-white">
                      GEO
                    </span>
                  )}
                  <span className={`text-[11px] font-bold tracking-[0.12em] ${service.naver ? "text-[#009f47]" : "text-blue-700"}`}>
                    {service.category}
                  </span>
                </div>
                <span className="font-mono text-sm font-bold text-blue-300">{service.number} / 05</span>
              </div>
              <h3 className="mt-5 break-keep text-xl font-bold leading-snug text-[#102a43] sm:text-[22px]">{service.title}</h3>
              <p className="mt-3 max-w-2xl break-keep text-sm leading-6 text-slate-600">{service.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
