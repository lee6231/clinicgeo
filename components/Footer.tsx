import Link from "next/link";

const footerLinks = [
  { href: "/editorial-policy", label: "편집·선정 기준" },
  { href: "/advertising-disclosure", label: "광고·제휴·이해관계" },
  { href: "/correction-request", label: "정보 수정 원칙" },
];

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="text-lg font-bold text-white">Clinic GEO</p>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400">
            지역·진료 분야·이용 조건에 맞는 병원 선택 기준과 검색엔진·AI 플랫폼의 GEO 공식 자료를
            정리하는 편집형 정보 사이트입니다.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-x-5 gap-y-3 text-sm">
          {footerLinks.map((item) => (
            <Link key={item.href} href={item.href} className="font-medium text-slate-300 hover:text-white">
              {item.label}
            </Link>
          ))}
          <Link href="/about" className="font-medium text-slate-300 hover:text-white">
            Clinic GEO 소개
          </Link>
          <Link href="/blog" className="font-medium text-slate-300 hover:text-white">
            전체 콘텐츠
          </Link>
        </div>
      </div>
      <div className="border-t border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5 text-xs leading-5 text-slate-500 sm:px-6 md:flex-row md:justify-between">
          <p>작성 및 편집: Clinic GEO 편집팀</p>
          <p>광고·제휴·운영 관계는 각 콘텐츠와 고지 페이지에서 별도로 표시합니다.</p>
        </div>
      </div>
    </footer>
  );
}
