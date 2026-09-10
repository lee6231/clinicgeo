const stats = [
  {
    value: "7년",
    label: "검색·플레이스 운영",
    description: "검색 운영 경험을 병원 GEO 전략으로 확장합니다.",
  },
  {
    value: "4~8주",
    label: "AI 인용 관찰",
    description: "핵심 질문의 노출 변화를 정기적으로 확인합니다.",
  },
  {
    value: "4개",
    label: "주요 AI 플랫폼",
    description: "ChatGPT·Gemini·Perplexity·Claude",
  },
];

export function GeoShiftSection() {
  return (
    <section className="border-b border-[#eadde2] bg-[#f9e7ed]">
      <div className="mx-auto grid w-full max-w-[1152px] gap-12 px-5 py-20 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-24 lg:py-28">
        <div>
          <p className="text-[11px] font-bold tracking-[0.18em] text-[#c35476]">CLINIC GEO by SUMMITFEED</p>
          <h2 className="mt-5 max-w-xl break-keep text-[2.45rem] font-black leading-[1.08] text-[#3b2934] sm:text-[3rem]">
            AI 인용까지 검증하는<br />병원 마케팅 회사.
          </h2>
        </div>

        <div>
          <p className="max-w-xl break-keep text-[15px] leading-7 text-[#67535c]">
            <strong className="font-black text-[#3b2934]">AI 검색에서 발견되고, 인용되고, 추천되는 병원 구조를 설계합니다.</strong> 질문을 찾고, 답변을 설계하고, 인용을 측정해 다음 운영에 반영합니다.
          </p>
          <div className="mt-9 grid gap-4 sm:grid-cols-3">
            {stats.map((stat) => (
              <article key={stat.value} className="min-h-40 rounded-lg border border-[#eadde2] bg-[#fffaf4] p-5">
                <strong className="block text-3xl font-black text-[#d6537a]">{stat.value}</strong>
                <span className="mt-2 block text-sm font-bold text-[#3b2934]">{stat.label}</span>
                <p className="mt-5 break-keep text-xs leading-5 text-[#806a73]">{stat.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
