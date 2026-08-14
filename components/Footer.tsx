import Link from "next/link";

const categoryLinks = [
  ["병원 GEO", "/category/hospital-geo"],
  ["정형외과 GEO", "/category/orthopedics-geo"],
  ["피부과 GEO", "/category/dermatology-geo"],
  ["치과 GEO", "/category/dental-geo"],
  ["성형외과 GEO", "/category/plastic-surgery-geo"],
  ["내과 GEO", "/category/internal-medicine-geo"],
];

const serviceLinks = [
  ["GEO 서비스", "/#services"],
  ["진행 프로세스", "/#process"],
  ["GEO 인사이트", "/blog"],
  ["자주 묻는 질문", "/#faq"],
  ["운영·편집 기준", "/editorial-policy"],
  ["문의하기", "/#contact"],
];

export function Footer() {
  return (
    <footer className="border-t border-blue-950 bg-[#0e2438] text-blue-100">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-6 lg:grid-cols-[1.25fr_0.75fr_0.75fr] lg:py-16">
        <div>
          <p className="text-lg font-bold text-white">Clinic GEO</p>
          <p className="mt-3 max-w-lg text-sm leading-7 text-blue-200/75">
            Clinic GEO는 써밋피드(SUMMITFEED)가 직접 운영하는 병의원 GEO 전문 사이트입니다. 병원 홈페이지 구조화, 정보성 엔티티 발행, AI 인용률 측정과 네이버 채널 운영을 하나의 흐름으로 연결합니다.
          </p>
          <a href="mailto:summit-ai@summitfeed.co.kr" className="mt-4 inline-block text-sm font-semibold text-blue-300">
            summit-ai@summitfeed.co.kr
          </a>
        </div>
        <div>
          <h2 className="text-xs font-bold tracking-[0.1em] text-white">진료별 GEO 칼럼</h2>
          <div className="mt-5 grid grid-cols-2 gap-x-5 gap-y-3 text-sm lg:grid-cols-1">
            {categoryLinks.map(([label, href]) => (
              <Link key={href} href={href} className="hover:text-white">{label}</Link>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-xs font-bold tracking-[0.1em] text-white">서비스·안내</h2>
          <div className="mt-5 grid gap-3 text-sm">
            {serviceLinks.map(([label, href]) => (
              <Link key={`${label}-${href}`} href={href} className="hover:text-white">{label}</Link>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-blue-900">
        <div className="mx-auto max-w-7xl px-5 py-7 text-xs leading-6 text-blue-300/65 sm:px-6">
          <dl className="flex flex-wrap gap-x-6 gap-y-1 text-blue-100/80">
            <div className="flex gap-2"><dt className="font-bold text-white">상호</dt><dd>SUMMITFEED</dd></div>
            <div className="flex gap-2"><dt className="font-bold text-white">대표</dt><dd>이승찬</dd></div>
            <div className="flex gap-2"><dt className="font-bold text-white">사업자등록번호</dt><dd>884-73-00630</dd></div>
          </dl>
          <p className="mt-2">© SUMMITFEED. Clinic GEO.</p>
        </div>
      </div>
    </footer>
  );
}
