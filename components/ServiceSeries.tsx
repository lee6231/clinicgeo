type IconKey = "geo" | "place" | "blog";

const services: Array<{
  category: string;
  title: string;
  description: string;
  points: string[];
  icon: IconKey;
  gradient: string;
  glow: string;
}> = [
  {
    category: "Generative Engine Optimization",
    title: "GEO",
    description: "ChatGPT와 생성형 검색 결과에서 병원 정보가 신뢰할 수 있는 출처로 인용되도록 콘텐츠와 엔티티 구조를 설계합니다.",
    points: ["AI 답변 노출 진단", "인용 구조 설계", "GEO 콘텐츠 전략"],
    icon: "geo",
    gradient: "linear-gradient(155deg, #5c3d4a 0%, #2a1c22 100%)",
    glow: "#e985a3",
  },
  {
    category: "Naver Place",
    title: "네이버 플레이스",
    description: "지역과 진료 키워드의 검색 흐름을 확인하고 플레이스 정보, 콘텐츠, 순위 변화를 일관되게 관리합니다.",
    points: ["지역 검색 분석", "플레이스 운영", "순위 변화 점검"],
    icon: "place",
    gradient: "linear-gradient(155deg, #03c75a 0%, #05834a 100%)",
    glow: "#baf5d2",
  },
  {
    category: "Naver Branding Blog · SEO",
    title: "브랜딩 블로그",
    description: "병원의 진료 철학과 강점을 환자가 이해하기 쉬운 정보성 콘텐츠로 정리하고, 25개 목표 키워드의 검색 노출을 관리합니다.",
    points: ["정보성 콘텐츠 발행", "25개 키워드 상위노출", "달성 후 유지 관리"],
    icon: "blog",
    gradient: "linear-gradient(155deg, #eeae4f 0%, #c97b23 100%)",
    glow: "#ffe9c2",
  },
];

function ServiceIcon({ icon }: { icon: IconKey }) {
  const common = { viewBox: "0 0 24 24", className: "relative h-8 w-8 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.25)]", fill: "currentColor" } as const;
  switch (icon) {
    case "geo":
      return <svg {...common}><path d="M12 2 2 7l10 5 10-5-10-5Zm0 8L2 15l10 5 10-5-10-5Z" /></svg>;
    case "place":
      return <svg {...common}><path d="M12 2C7.58 2 4 5.58 4 10c0 5.25 7 12 8 12s8-6.75 8-12c0-4.42-3.58-8-8-8Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" /></svg>;
    case "blog":
      return <svg {...common} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16v16H4z" /><path d="M8 9h8M8 13h5" /></svg>;
  }
}

export function ServiceSeries() {
  return (
    <section className="relative overflow-hidden border-b border-[#eadde2] bg-[#fffaf4]" id="services">
      <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-[#f5c2d2]/40 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-[#3b2934]/[0.06] blur-3xl" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-[1152px] px-5 py-20 sm:px-6 lg:py-28">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-24">
          <h2 className="max-w-xl break-keep text-[2.5rem] font-black leading-[1.05] text-[#3b2934] sm:text-[3.1rem]">
            GEO부터 네이버까지,<br />세 채널로 잇습니다.
          </h2>
          <p className="max-w-md break-keep text-[15px] leading-7 text-[#67535c] lg:pb-1">
            세 개 채널을 따로 맡기지 않고, 한 팀이 검색 결과와 AI 답변을 함께 관리합니다.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.title}
              className="group relative flex min-h-[21rem] flex-col overflow-hidden rounded-[1.75rem] p-7 shadow-[0_28px_60px_-16px_rgba(59,41,52,0.35)] transition-transform duration-300 hover:-translate-y-1.5"
              style={{ background: service.gradient }}
            >
              <div
                className="pointer-events-none absolute -right-10 -top-16 h-56 w-56 rounded-full opacity-30 blur-2xl transition-opacity duration-300 group-hover:opacity-50"
                style={{ backgroundColor: service.glow }}
                aria-hidden="true"
              />

              <div className="relative flex items-center justify-between">
                <p className="max-w-[70%] break-keep text-[10px] font-bold tracking-[0.14em] text-white/70">{service.category}</p>
                <span
                  className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full shadow-[inset_0_2px_10px_rgba(255,255,255,0.35),0_14px_26px_rgba(0,0,0,0.25)]"
                  style={{ background: "linear-gradient(145deg, rgba(255,255,255,0.32), rgba(255,255,255,0.05))" }}
                  aria-hidden="true"
                >
                  <span className="absolute left-2.5 top-2 h-3 w-6 rounded-full bg-white/40 blur-[2px]" />
                  <ServiceIcon icon={service.icon} />
                </span>
              </div>

              <h3 className="relative mt-5 break-keep text-2xl font-black leading-tight text-white">{service.title}</h3>
              <p className="relative mt-3 break-keep text-sm leading-6 text-white/85">{service.description}</p>

              <ul className="relative mt-auto space-y-2 border-t border-white/15 pt-5 text-xs font-semibold text-white/85">
                {service.points.map((point) => (
                  <li key={point} className="flex items-center gap-2">
                    <span className="h-1 w-1 shrink-0 rounded-full bg-white/70" />
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
