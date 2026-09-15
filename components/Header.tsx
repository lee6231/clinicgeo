import Image from "next/image";
import Link from "next/link";

const navigation = [
  { href: "/#services", label: "서비스" },
  { href: "/#process", label: "진행 방식" },
  { href: "/hospitals", label: "진료별 GEO" },
  { href: "/blog", label: "GEO 인사이트" },
];

type HeaderProps = {
  tone?: "default" | "hero";
};

export function Header({ tone = "default" }: HeaderProps) {
  const isHero = tone === "hero";

  return (
    <header className={isHero ? "relative z-50 border-b border-[#eadde2] bg-[#fffaf4]/95 text-[#3b2934] backdrop-blur" : "sticky top-0 z-50 border-b border-[#eadde2] bg-[#fffaf4]/95 text-[#3b2934] backdrop-blur"}>
      <div className="mx-auto flex h-[4.75rem] max-w-[1152px] items-center justify-between px-5 sm:px-6">
        <Link href="/" className="flex items-center gap-3" aria-label="Clinic GEO 홈">
          <Image
            src="/clinic-geo-mark.png"
            alt=""
            width={44}
            height={44}
            priority
            className="h-10 w-10 shrink-0 object-contain"
          />
          <span className="block">
            <span className="block text-[15px] font-black text-[#3b2934]">Clinic GEO</span>
            <span className="hidden text-[10px] font-semibold text-[#8b727c] sm:block">by SUMMITFEED</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="주요 메뉴">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="rounded-md px-3 py-2 text-[13px] font-bold text-[#4e3c45] transition hover:bg-[#f9e8ee] hover:text-[#3b2934]">
              {item.label}
            </Link>
          ))}
          <Link href="/#contact" className="ml-3 rounded-md border border-[#3b2934] px-4 py-2 text-[13px] font-bold text-[#3b2934] transition hover:bg-[#3b2934] hover:text-white">
            문의하기
          </Link>
        </nav>

        <details className="relative lg:hidden">
          <summary className={`cursor-pointer list-none rounded-md border px-3 py-2 text-sm font-semibold ${isHero ? "border-[#cdbbc2] text-[#3b2934] hover:bg-[#f9e8ee]" : "border-slate-300 text-slate-800 hover:bg-slate-50"}`}>메뉴</summary>
          <nav className="absolute right-0 mt-2 w-[min(20rem,calc(100vw-2.5rem))] border border-slate-200 bg-white p-2 text-slate-800 shadow-xl" aria-label="모바일 메뉴">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href} className="block rounded-md px-4 py-3 text-sm font-semibold hover:bg-blue-50 hover:text-blue-700">{item.label}</Link>
            ))}
            <Link href="/#contact" className="mt-1 block rounded-md bg-[#3b2934] px-4 py-3 text-sm font-bold text-white">문의하기</Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
