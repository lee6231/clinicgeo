"use client";

import Image from "next/image";

type Channel = {
  label: string;
  sub: string;
  accent: string;
  screenshot: string;
  screenshotAlt: string;
};

const channels: Channel[] = [
  {
    label: "병원 GEO 최적화",
    sub: "AI 검색 인용 구조 설계",
    accent: "#b8863f",
    screenshot: "/channel-proof/chatgpt-recommendation.jpg",
    screenshotAlt: "ChatGPT가 병원 GEO 대행사를 추천하는 답변 화면",
  },
  {
    label: "네이버 플레이스",
    sub: "지역 검색 노출 운영",
    accent: "#03c75a",
    screenshot: "/channel-proof/naver-place-results.jpg",
    screenshotAlt: "네이버 플레이스 강남 성형외과 검색 결과 화면",
  },
  {
    label: "블로그 SEO",
    sub: "30개 키워드 상위노출",
    accent: "#c35476",
    screenshot: "/channel-proof/naver-blog-results.jpg",
    screenshotAlt: "네이버 블로그 강남 성형외과 검색 결과 화면",
  },
  {
    label: "SEO·AEO",
    sub: "검색·AI 답변 동시 대응",
    accent: "#3f6fa8",
    screenshot: "/channel-proof/naver-web-results.jpg",
    screenshotAlt: "네이버 통합검색 강남 성형외과 웹사이트 검색 결과 화면",
  },
];

// duplicated once for a seamless infinite loop
const track = [...channels, ...channels];

function Phone({ channel, priority }: { channel: Channel; priority: boolean }) {
  return (
    <div className="flex w-[230px] shrink-0 flex-col items-center sm:w-[280px] lg:w-[340px]">
      <div className="relative w-full">
        {/* ground shadow */}
        <div
          className="absolute -bottom-6 left-1/2 h-8 w-[78%] -translate-x-1/2 rounded-[50%] bg-[#3b2934]/25 blur-xl"
          aria-hidden="true"
        />
        <div
          className="relative aspect-[9/19.5] w-full overflow-hidden rounded-[2.5rem] p-[3px] shadow-[0_40px_70px_-20px_rgba(59,41,52,0.45)]"
          style={{ background: "linear-gradient(160deg, #6b5560 0%, #2a1e24 55%, #171115 100%)" }}
        >
          <div className="relative h-full w-full overflow-hidden rounded-[2.3rem] bg-[#fbfaf7]">
            <div className="absolute left-1/2 top-0 z-20 h-5 w-24 -translate-x-1/2 rounded-b-2xl bg-[#171115]" aria-hidden="true" />

            <Image
              src={channel.screenshot}
              alt={channel.screenshotAlt}
              fill
              sizes="340px"
              className="object-contain object-top"
              priority={priority}
            />

            {/* glass highlight */}
            <div
              className="pointer-events-none absolute inset-0 z-10"
              style={{ background: "linear-gradient(115deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0) 26%)" }}
              aria-hidden="true"
            />

            {/* floating caption chip */}
            <div className="absolute inset-x-3 bottom-3 z-20 flex items-center gap-2 rounded-full px-3 py-2 shadow-[0_10px_24px_rgba(0,0,0,0.25)]" style={{ backgroundColor: channel.accent }}>
              <div className="min-w-0">
                <p className="truncate text-[11px] font-black leading-tight text-white sm:text-xs">{channel.label}</p>
                <p className="truncate text-[9px] leading-tight text-white/75 sm:text-[10px]">{channel.sub}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function GeoServiceCards() {
  return (
    <section className="relative overflow-hidden border-b border-[#eadde2]" style={{ background: "linear-gradient(180deg, #2a1e24 0%, #3b2934 55%, #4a3540 100%)" }}>
      <style>{`
        @keyframes geo-marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .geo-marquee-track {
          animation: geo-marquee-scroll 40s linear infinite;
        }
        .geo-marquee-viewport:hover .geo-marquee-track {
          animation-play-state: paused;
        }
      `}</style>

      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#e985a3]/20 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-[#03c75a]/10 blur-3xl" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-[1152px] py-16 sm:py-20">
        <div className="px-5 text-center sm:px-6">
          <p className="text-[11px] font-bold tracking-[0.18em] text-[#e985a3]">WHAT WE OPTIMIZE</p>
          <h2 className="mt-4 break-keep text-2xl font-black leading-tight text-white sm:text-3xl">
            네 가지 채널에서 병원의 검색 노출을 만듭니다.
          </h2>
        </div>

        <div
          className="geo-marquee-viewport relative mt-16 overflow-hidden py-6"
          style={{
            maskImage: "linear-gradient(90deg, transparent 0, black 8%, black 92%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(90deg, transparent 0, black 8%, black 92%, transparent 100%)",
          }}
        >
          <div className="geo-marquee-track flex w-max gap-10 px-8 sm:gap-14 lg:gap-16">
            {track.map((channel, index) => (
              <Phone key={`${channel.label}-${index}`} channel={channel} priority={index === 0} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
