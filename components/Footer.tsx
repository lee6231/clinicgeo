import Link from "next/link";

const hospitalLinks = [
  ["진료과별 병원", "/hospitals"],
  ["병원 선택 가이드", "/hospital-guides"],
  ["병원 GEO 블로그", "/blog"],
];

const aboutLinks = [
  ["정보 확인 기준", "/editorial-policy"],
  ["편집 기준", "/editorial-policy"],
  ["광고·제휴 공개", "/advertising-disclosure"],
  ["문의하기", "/contact"],
];

export function Footer() {
  return (
    <footer className="border-t border-blue-950 bg-[#10264b] text-blue-100">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-6 lg:grid-cols-[1.25fr_0.75fr_0.75fr] lg:py-16">
        <div>
          <p className="text-lg font-bold text-white">Clinic GEO</p>
          <p className="mt-3 max-w-lg text-sm leading-7 text-blue-200/75">
            의료기관 공식 홈페이지와 공공기관의 공개 정보를 바탕으로 진료과별 병원 정보를 정리하는 독립 정보 미디어입니다. 실제 진료 적합성은 상담과 진단을 통해 확인해 주세요.
          </p>
          <a href="mailto:summit-ai@summitfeed.co.kr" className="mt-4 inline-block text-sm font-semibold text-blue-300">
            summit-ai@summitfeed.co.kr
          </a>
        </div>
        <div>
          <h2 className="text-xs font-bold text-white">HOSPITAL GUIDE</h2>
          <div className="mt-5 grid gap-3 text-sm">
            {hospitalLinks.map(([label, href]) => (
              <Link key={href} href={href} className="hover:text-white">{label}</Link>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-xs font-bold text-white">ABOUT</h2>
          <div className="mt-5 grid gap-3 text-sm">
            {aboutLinks.map(([label, href]) => (
              <Link key={`${label}-${href}`} href={href} className="hover:text-white">{label}</Link>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-blue-900">
        <div className="mx-auto max-w-7xl px-5 py-6 text-xs leading-6 text-blue-300/60 sm:px-6">
          <p>본 사이트는 의료기관 공식 홈페이지와 공공기관의 공개 정보를 바탕으로 병원 정보를 정리하는 독립 정보 미디어입니다. 병원 정보는 변경될 수 있으며, 방문 전 해당 의료기관에 직접 확인해 주세요. 특정 병원의 순위나 치료 결과를 보장하지 않습니다.</p>
          <p className="mt-2">© Clinic GEO by SUMMITFEED</p>
        </div>
      </div>
    </footer>
  );
}
