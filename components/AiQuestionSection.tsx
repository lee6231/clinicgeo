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

function PlatformMark({ platform }: { platform: "gpt" | "gemini" }) {
  if (platform === "gemini") {
    return (
      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-500" aria-label="Gemini">
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
          <path d="M20.616 10.835a14.147 14.147 0 0 1-4.45-3.001 14.111 14.111 0 0 1-3.678-6.452.503.503 0 0 0-.975 0 14.134 14.134 0 0 1-3.679 6.452 14.155 14.155 0 0 1-4.45 3.001c-.65.28-1.318.505-2.002.678a.502.502 0 0 0 0 .975c.684.172 1.35.397 2.002.677a14.147 14.147 0 0 1 4.45 3.001 14.112 14.112 0 0 1 3.679 6.453.502.502 0 0 0 .975 0c.172-.685.397-1.351.677-2.003a14.145 14.145 0 0 1 3.001-4.45 14.113 14.113 0 0 1 6.453-3.678.503.503 0 0 0 0-.975 13.245 13.245 0 0 1-2.003-.678Z" />
        </svg>
      </span>
    );
  }

  return (
    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f9e7ed] text-[#3b2934]" aria-label="ChatGPT">
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
      <section ref={sectionRef} className="ai-question-section border-b border-blue-100 bg-[#fff1f5]">
        <div className="mx-auto w-full max-w-[1152px] px-5 py-20 sm:px-6 lg:py-28">
          <div className="grid gap-6 border-b border-[#ddc7d0] pb-10 lg:grid-cols-[0.38fr_1.62fr] lg:items-end lg:gap-12 lg:pb-12">
            <p className="self-start text-xs font-bold tracking-[0.16em] text-blue-600">PATIENT QUESTIONS</p>
            <div>
              <h2 className="max-w-4xl break-keep text-3xl font-extrabold leading-tight text-[#3b2934] sm:text-4xl lg:text-[3rem]">
                환자들은 이제 검색어 대신<br />자신의 상황을 AI에 설명합니다.
              </h2>
              <p className="mt-5 max-w-2xl break-keep text-base leading-8 text-[#6f5962]">
                증상과 치료 목적, 지역 조건을 문장으로 묻고 그 답변 안에서 병원을 발견하고 비교합니다.
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {questions.map((item, index) => (
              <article
                key={item.number}
                className="ai-question-card flex min-h-72 flex-col rounded-lg border border-[#eadde2] bg-[#fffaf4] p-7 shadow-[0_18px_48px_rgba(93,73,82,0.07)]"
                style={{ transitionDelay: `${index * 180}ms` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <PlatformMark platform={item.logo as "gpt" | "gemini"} />
                    <span className="text-sm font-bold text-[#3b2934]">{item.platform}</span>
                  </div>
                  <span className="font-mono text-xs font-bold text-blue-300">Q{item.number}</span>
                </div>
                <p className="mt-9 flex-1 break-keep text-2xl font-bold leading-snug text-[#3b2934]">“{item.question}”</p>
                <p className="mt-6 border-t border-blue-100 pt-4 text-xs leading-5 text-[#7d6972]">{item.context}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
  );
}
