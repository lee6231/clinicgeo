"use client";

import { useEffect, useRef } from "react";

const questions = [
  {
    number: "01",
    platform: "ChatGPT",
    logo: "gpt",
    question: "허리디스크, 어디가 잘해?",
    context: "증상과 진료 목적을 함께 묻는 병원 탐색",
  },
  {
    number: "02",
    platform: "Gemini",
    logo: "gemini",
    question: "코 재수술하려는데 어디가 잘해?",
    context: "치료 이력과 조건을 담은 전문 분야 탐색",
  },
  {
    number: "03",
    platform: "ChatGPT",
    logo: "gpt",
    question: "임플란트 치과 추천해줘.",
    context: "지역과 진료 분야를 기준으로 한 추천 요청",
  },
];

const entityFlow = [
  {
    number: "01",
    english: "PUBLIC WEB",
    title: "AI가 읽을 수 있는 공개 웹사이트",
    description: "병원 정보가 독립된 URL과 명확한 문서 구조를 갖도록 발행합니다.",
  },
  {
    number: "02",
    english: "CONSISTENT ENTITY",
    title: "일관된 정보성 엔티티",
    description: "병원명, 의료진, 진료 분야와 지역 정보를 같은 기준으로 정리합니다.",
  },
  {
    number: "03",
    english: "SOURCE CONNECTION",
    title: "출처와 채널 연결",
    description: "관련 원고와 외부 채널을 연결해 AI가 확인할 수 있는 정보 관계를 만듭니다.",
  },
];

function PlatformMark({ platform }: { platform: "gpt" | "gemini" }) {
  if (platform === "gemini") {
    return (
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-500" aria-label="Gemini">
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
          <path d="M20.616 10.835a14.147 14.147 0 0 1-4.45-3.001 14.111 14.111 0 0 1-3.678-6.452.503.503 0 0 0-.975 0 14.134 14.134 0 0 1-3.679 6.452 14.155 14.155 0 0 1-4.45 3.001c-.65.28-1.318.505-2.002.678a.502.502 0 0 0 0 .975c.684.172 1.35.397 2.002.677a14.147 14.147 0 0 1 4.45 3.001 14.112 14.112 0 0 1 3.679 6.453.502.502 0 0 0 .975 0c.172-.685.397-1.351.677-2.003a14.145 14.145 0 0 1 3.001-4.45 14.113 14.113 0 0 1 6.453-3.678.503.503 0 0 0 0-.975 13.245 13.245 0 0 1-2.003-.678Z" />
        </svg>
      </span>
    );
  }

  return (
    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#eef1f2] text-[#172638]" aria-label="ChatGPT">
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
        <path fillRule="evenodd" d="M9.205 8.658v-2.26c0-.19.072-.333.238-.428l4.543-2.616c.619-.357 1.356-.523 2.117-.523 2.854 0 4.662 2.212 4.662 4.566 0 .167 0 .357-.024.547l-4.71-2.759a.797.797 0 0 0-.856 0l-5.97 3.473Zm10.609 8.8V12.06c0-.333-.143-.57-.429-.737l-5.97-3.473 1.95-1.118a.433.433 0 0 1 .476 0l4.543 2.617c1.309.76 2.189 2.378 2.189 3.948 0 1.808-1.07 3.473-2.76 4.163ZM7.802 12.703l-1.95-1.142c-.167-.095-.239-.238-.239-.428V5.899c0-2.545 1.95-4.472 4.591-4.472 1 0 1.927.333 2.712.928L8.23 5.067c-.285.166-.428.404-.428.737v6.898ZM12 15.128l-2.795-1.57v-3.33L12 8.658l2.795 1.57v3.33L12 15.128Zm1.796 7.23c-1 0-1.927-.332-2.712-.927l4.686-2.712c.285-.166.428-.404.428-.737v-6.898l1.974 1.142c.167.095.238.238.238.428v5.233c0 2.545-1.974 4.472-4.614 4.472Zm-5.637-5.303-4.544-2.617c-1.308-.761-2.188-2.378-2.188-3.948A4.482 4.482 0 0 1 4.21 6.327v5.423c0 .333.143.571.428.738l5.947 3.449-1.95 1.118a.432.432 0 0 1-.476 0Zm-.262 3.9c-2.688 0-4.662-2.021-4.662-4.519 0-.19.024-.38.047-.57l4.686 2.71c.286.167.571.167.856 0l5.97-3.448v2.26c0 .19-.07.333-.237.428l-4.543 2.616c-.619.357-1.356.523-2.117.523Zm5.899 2.83a5.947 5.947 0 0 0 5.827-4.756C22.287 18.339 24 15.84 24 13.296c0-1.665-.713-3.282-1.998-4.448.119-.5.19-.999.19-1.498 0-3.401-2.759-5.947-5.946-5.947-.642 0-1.26.095-1.88.31A5.962 5.962 0 0 0 10.205 0a5.947 5.947 0 0 0-5.827 4.757C1.713 5.447 0 7.945 0 10.49c0 1.666.713 3.283 1.998 4.448-.119.5-.19 1-.19 1.499 0 3.401 2.759 5.946 5.946 5.946.642 0 1.26-.095 1.88-.309a5.96 5.96 0 0 0 4.162 1.713Z" />
      </svg>
    </span>
  );
}

export function AiQuestionSection() {
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
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section ref={sectionRef} className="ai-question-section border-b border-blue-100 bg-[#fbfaf7]">
        <div className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-6 lg:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold tracking-[0.16em] text-blue-700">05 · PATIENT QUESTIONS</p>
            <h2 className="mt-4 break-keep text-3xl font-bold leading-tight text-[#102a43] sm:text-4xl lg:text-[2.75rem]">
              환자들은 이제 AI에 이렇게 물어봅니다.
            </h2>
            <p className="mt-5 break-keep text-base leading-8 text-slate-600">
              짧은 검색어 대신 자신의 상황과 진료 목적을 문장으로 설명하고 병원을 추천받습니다.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {questions.map((item, index) => (
              <article
                key={item.number}
                className="ai-question-card flex min-h-64 flex-col rounded-2xl border border-blue-100 bg-[#f7f6f2] p-6 shadow-[0_18px_48px_rgba(16,42,67,0.07)]"
                style={{ transitionDelay: `${index * 180}ms` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <PlatformMark platform={item.logo as "gpt" | "gemini"} />
                    <span className="text-sm font-bold text-[#102a43]">{item.platform}</span>
                  </div>
                  <span className="font-mono text-xs font-bold text-blue-300">Q{item.number}</span>
                </div>
                <p className="mt-9 flex-1 break-keep text-2xl font-bold leading-snug text-[#102a43]">“{item.question}”</p>
                <p className="mt-6 border-t border-blue-100 pt-4 text-xs leading-5 text-slate-500">{item.context}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-b border-blue-100 bg-[#eff3f6]">
        <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(#cbd6e0_1px,transparent_1px)] [background-size:24px_24px]" aria-hidden="true" />
        <div className="relative mx-auto grid w-full max-w-7xl gap-12 px-5 py-16 sm:px-6 lg:grid-cols-[0.84fr_1.16fr] lg:items-center lg:gap-20 lg:py-20">
          <div>
            <p className="text-xs font-bold tracking-[0.16em] text-blue-700">05-1 · AI-READABLE ENTITY</p>
            <h2 className="mt-4 max-w-xl break-keep text-3xl font-bold leading-tight text-[#102a43] sm:text-4xl">
              네이버에 쌓인 SEO만으로는<br />AI 인용까지 이어지기 어렵습니다.
            </h2>
            <p className="mt-6 max-w-xl break-keep text-base leading-8 text-slate-600">
              네이버 내부에만 축적된 콘텐츠는 플랫폼별 수집 정책과 접근 범위 때문에 외부 AI가 안정적으로 직접 읽고 인용하기 어렵습니다.
            </p>
            <p className="mt-4 max-w-xl break-keep text-base font-bold leading-8 text-[#102a43]">
              그래서 AI가 읽을 수 있는 공개 웹사이트에 정보성 엔티티 문서를 발행하고, 같은 병원 정보를 일관되게 연결해야 합니다.
            </p>
          </div>

          <div className="border-y-2 border-[#102a43] bg-[#fbfaf7]/75 px-5 sm:px-7">
            {entityFlow.map((item) => (
              <div key={item.number} className="grid gap-2 border-b border-blue-100 py-6 last:border-b-0 sm:grid-cols-[3rem_12rem_1fr] sm:items-center">
                <span className="font-mono text-xs font-bold text-blue-500">{item.number}</span>
                <div>
                  <p className="text-[10px] font-bold tracking-[0.12em] text-blue-500">{item.english}</p>
                  <h3 className="mt-1 break-keep font-bold text-[#102a43]">{item.title}</h3>
                </div>
                <p className="break-keep text-sm leading-6 text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="relative mx-auto max-w-7xl border-t border-blue-200 px-5 py-6 text-center text-sm font-bold leading-7 text-[#102a43] sm:px-6">
          일관된 정보가 여러 출처에 연결될수록 <span className="text-blue-700">AI가 병원을 이해하고 추천 후보로 연결할 근거가 생깁니다.</span>
        </p>
      </section>
    </>
  );
}
