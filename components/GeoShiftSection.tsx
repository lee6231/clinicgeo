"use client";

import { useEffect, useRef } from "react";

export function GeoShiftSection() {
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
      { threshold: 0.3, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="geo-shift-section relative overflow-hidden border-b border-blue-100 bg-[#eff3f6]">
      <div className="absolute -left-28 top-16 h-80 w-80 rounded-full bg-white blur-3xl" aria-hidden="true" />
      <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-blue-200/45 blur-3xl" aria-hidden="true" />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-5 py-16 sm:px-6 lg:min-h-[620px] lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:py-20">
        <div className="lg:translate-y-5">
          <p className="text-xs font-bold tracking-[0.16em] text-blue-700">SEO → GEO</p>
          <h2 className="mt-4 max-w-xl break-keep text-3xl font-bold leading-tight text-[#102a43] sm:text-4xl lg:text-[2.75rem]">
            <span className="block">SEO, 끝난 게 아닙니다.</span>
            <span className="mt-2 block">다만 환자들이 AI에 묻기 시작했습니다.</span>
          </h2>
          <p className="mt-6 max-w-xl break-keep text-base leading-8 text-slate-600">
            검색 결과에서 병원을 찾는 흐름은 계속됩니다. 이제는 그보다 먼저 AI가 병원을 이해하고 답변에 인용할 수 있어야 합니다.
          </p>
          <p className="mt-7 inline-block border-l-4 border-blue-600 pl-5 text-base font-bold leading-7 text-[#102a43] sm:text-lg lg:whitespace-nowrap">
            현재 AI 노출은 선택이 아닌 브랜딩입니다.
          </p>
        </div>

        <div className="rounded-[2rem] border border-blue-100 bg-[#fbfaf7]/90 px-6 py-10 shadow-[0_24px_70px_rgba(16,42,67,0.1)] backdrop-blur-sm sm:px-10 sm:py-12">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 sm:gap-7" aria-label="SEO에서 GEO로 전환">
            <div className="text-center">
              <span className="block text-[10px] font-bold tracking-[0.16em] text-slate-400">SEARCH ENGINE</span>
              <span className="geo-shift-seo mt-2 block text-5xl font-bold tracking-[-0.07em] sm:text-7xl lg:text-[5.5rem]">SEO</span>
            </div>
            <div className="geo-shift-chevrons flex items-center gap-1 text-3xl font-light sm:gap-2 sm:text-5xl" aria-hidden="true">
              <span>›</span><span>›</span><span>›</span>
            </div>
            <div className="text-center">
              <span className="block text-[10px] font-bold tracking-[0.16em] text-blue-500">GENERATIVE ENGINE</span>
              <span className="geo-shift-geo mt-2 block text-5xl font-bold tracking-[-0.07em] sm:text-7xl lg:text-[5.5rem]">GEO</span>
            </div>
          </div>

          <div className="relative mt-10 h-1 overflow-hidden rounded-full bg-blue-100" aria-hidden="true">
            <div className="geo-shift-beam absolute inset-y-0 left-0 w-1/3 rounded-full bg-gradient-to-r from-transparent via-blue-500 to-blue-700" />
          </div>

          <div className="mt-7 grid grid-cols-2 gap-5 border-t border-blue-100 pt-6 text-sm">
            <div>
              <span className="block font-bold text-[#102a43]">검색되는 병원</span>
              <span className="mt-1 block text-slate-500">SEO 검색 기반</span>
            </div>
            <div className="text-right">
              <span className="block font-bold text-blue-700">AI가 인용하는 병원</span>
              <span className="mt-1 block text-slate-500">GEO 브랜드 확장</span>
            </div>
          </div>

          <p className="geo-shift-result mt-8 rounded-xl bg-blue-700 px-5 py-4 text-center text-sm font-bold text-white">
            SEO의 검색 기반 위에 GEO의 AI 인용 구조를 더합니다.
          </p>
        </div>
      </div>
    </section>
  );
}
