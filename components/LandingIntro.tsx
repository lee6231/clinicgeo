import Image from "next/image";

const specialties = [
  { label: "병원마케팅", position: "left-0 top-[8%]" },
  { label: "GEO", position: "right-[4%] top-[10%]" },
  { label: "AEO", position: "right-0 top-[46%]" },
  { label: "플레이스", position: "left-[4%] bottom-[12%]" },
  { label: "SEO", position: "right-[10%] bottom-[8%]" },
];

export function LandingIntro() {
  return (
    <section className="border-b border-[#eadde2] bg-[#fff1f5]">
      <div className="mx-auto grid min-h-[620px] max-w-[1152px] items-center gap-10 px-5 py-16 sm:px-6 lg:grid-cols-[0.88fr_1.12fr] lg:gap-14 lg:py-20">
        <div className="relative z-10">
          <p className="text-[11px] font-bold tracking-[0.18em] text-[#c35476]">HOSPITAL MARKETING COMPANY</p>
          <h1 className="mt-6 break-keep text-[2.8rem] font-black leading-[1.02] text-[#3b2934] sm:text-[3.8rem] lg:text-[4.15rem]">
            병원마케팅,
            <span className="mt-2 block text-[#c35476]">Clinic GEO</span>
          </h1>
          <p className="mt-8 max-w-md break-keep text-[15px] leading-7 text-[#67535c] sm:text-base">
            <strong className="font-black text-[#3b2934]">AI부터 네이버까지, 노출을 설계합니다.</strong> GEO, AEO, 네이버 SEO와 플레이스를 하나의 전략으로 연결해 병원이 검색과 AI 답변 모두에서 발견되도록 만듭니다.
          </p>
        </div>

        <div className="landing-3d-stage relative mx-auto w-full max-w-[650px]">
          <div className="landing-3d-visual relative aspect-[4/3]">
            <Image
              src="/clinicgeo-marketing-3d.png"
              alt="병원 마케팅, 플레이스, GEO, SEO, AEO를 표현한 3D 비주얼"
              fill
              priority
              sizes="(min-width: 1024px) 56vw, 100vw"
              className="object-contain"
            />
          </div>
          {specialties.map((item, index) => (
            <span
              key={item.label}
              className={`landing-3d-label absolute ${item.position} rounded-md border border-[#e1c8d1] bg-[#fffaf4]/95 px-3 py-2 text-xs font-black text-[#533b46] shadow-[0_8px_24px_rgba(86,50,65,0.1)]`}
              style={{ animationDelay: `${index * -0.9}s` }}
            >
              {item.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
