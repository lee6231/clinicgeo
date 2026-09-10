const services = [
  {
    number: "01",
    category: "Generative Engine Optimization",
    title: "GEO",
    description: "ChatGPT와 생성형 검색 결과에서 병원 정보가 신뢰할 수 있는 출처로 인용되도록 콘텐츠와 엔티티 구조를 설계합니다.",
    points: ["AI 답변 노출 진단", "인용 구조 설계", "GEO 콘텐츠 전략"],
    naver: false,
  },
  {
    number: "02",
    category: "AI Citation Website",
    title: "병원 AI 인용 홈페이지",
    description: "병원별 정보성 페이지를 만들고 진료 분야, 의료진, 지역과 환자 질문을 하나의 공개 웹 구조로 연결합니다.",
    points: ["공개 웹 문서", "진료 정보 구조화", "병원 엔티티 연결"],
    naver: false,
  },
  {
    number: "03",
    category: "Naver Place",
    title: "네이버 플레이스",
    description: "지역과 진료 키워드의 검색 흐름을 확인하고 플레이스 정보, 콘텐츠, 순위 변화를 일관되게 관리합니다.",
    points: ["지역 검색 분석", "플레이스 운영", "순위 변화 점검"],
    naver: true,
  },
  {
    number: "04",
    category: "Naver Branding Blog",
    title: "병원 브랜딩 블로그",
    description: "병원의 진료 철학과 강점을 환자가 이해하기 쉬운 정보성 콘텐츠로 정리해 월 12회 발행합니다.",
    points: ["진료 철학 정리", "월 12회 발행", "브랜드 검색 강화"],
    naver: true,
  },
  {
    number: "05",
    category: "Naver Search",
    title: "네이버 SEO",
    description: "25개 목표 키워드를 기준으로 블로그 검색 노출을 진행하고, 달성 이후에도 노출 상태를 점검합니다.",
    points: ["25개 목표 키워드", "상위 노출 진행", "달성 후 유지 관리"],
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
  return (
    <section className="border-b border-[#eadde2] bg-[#fffaf4]" id="services">
      <div className="mx-auto w-full max-w-[1152px] px-5 py-20 sm:px-6 lg:py-28">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-24">
          <div>
            <p className="text-[11px] font-bold tracking-[0.18em] text-[#c35476]">WHAT WE DO</p>
            <h2 className="mt-5 max-w-xl break-keep text-[2.5rem] font-black leading-[1.05] text-[#3b2934] sm:text-[3.1rem]">
              검색부터 선택까지,<br />하나의 흐름으로.
            </h2>
          </div>
          <p className="max-w-md break-keep text-[15px] leading-7 text-[#67535c] lg:pb-1">
            채널별로 흩어진 운영을 줄이고, 검색에서 발견되어 실제 선택으로 이어지는 병원 마케팅 구조를 설계합니다.
          </p>
        </div>

        <div className="mt-14 grid gap-4">
          {services.map((service) => (
            <article
              key={service.number}
              className="grid gap-6 rounded-lg border border-[#e2d4d9] bg-[#fffdf9] px-5 py-7 shadow-[0_14px_38px_rgba(77,50,64,0.06)] transition-shadow hover:shadow-[0_20px_48px_rgba(77,50,64,0.1)] sm:px-7 lg:grid-cols-[60px_220px_1fr_220px] lg:items-center lg:gap-8 lg:px-8"
            >
              <span className="font-mono text-xs font-bold text-[#c57b92]">{service.number}</span>
              <div className="flex items-center gap-3">
                {service.naver ? <NaverMark /> : (
                  <span className="flex h-9 min-w-9 items-center justify-center rounded-lg bg-[#3b2934] px-2 text-[10px] font-bold text-white">GEO</span>
                )}
                <div>
                  <h3 className="break-keep text-xl font-black text-[#3b2934]">{service.title}</h3>
                  <p className="mt-1 text-[10px] font-bold text-[#a57888]">{service.category}</p>
                </div>
              </div>
              <p className="break-keep text-sm leading-7 text-[#67535c]">{service.description}</p>
              <ul className="space-y-2 text-xs font-semibold text-[#795f69]">
                {service.points.map((point) => <li key={point}>· {point}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
