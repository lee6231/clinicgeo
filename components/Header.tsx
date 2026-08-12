import Image from "next/image";
import Link from "next/link";

const navigation = [
  { href: "/hospitals", label: "진료별 GEO" },
  { href: "/blog", label: "GEO 인사이트" },
];

type HeaderProps = {
  tone?: "default" | "hero";
};

export function Header({ tone = "default" }: HeaderProps) {
  const isHero = tone === "hero";

  return (
    <header className={isHero ? "relative z-50 border-b border-white/10 bg-[#081521] text-white" : "sticky top-0 z-50 border-b border-blue-100 bg-[#fbfaf7]/95 backdrop-blur"}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-6">
        <Link href="/" className="flex items-center gap-3" aria-label="Clinic GEO 홈">
          <Image
            src="/clinic-geo-mark.png"
            alt=""
            width={40}
            height={40}
            priority
            className="h-10 w-10 shrink-0 object-contain"
          />
          <span className="block">
            <span className={`block text-base font-bold ${isHero ? "text-white" : "text-[#102a43]"}`}>Clinic GEO</span>
            <span className={`hidden text-[10px] font-semibold tracking-[0.08em] sm:block ${isHero ? "text-slate-400" : "text-slate-500"}`}>SUMMITFEED · HOSPITAL GEO</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 xl:flex" aria-label="주요 메뉴">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className={`rounded-md px-2.5 py-2 text-sm font-semibold transition ${isHero ? "text-slate-300 hover:bg-white/10 hover:text-white" : "text-slate-700 hover:bg-blue-50 hover:text-blue-700"}`}>
              {item.label}
            </Link>
          ))}
          <Link href="/contact" className={`ml-2 rounded-md px-4 py-2 text-sm font-bold ${isHero ? "bg-[#f7f6f2] text-[#081521] hover:bg-white" : "bg-[#102a43] text-white hover:bg-blue-800"}`}>
            문의하기
          </Link>
        </nav>

        <details className="relative xl:hidden">
          <summary className={`cursor-pointer list-none rounded-md border px-3 py-2 text-sm font-semibold ${isHero ? "border-white/30 text-white hover:bg-white/10" : "border-slate-300 text-slate-800 hover:bg-slate-50"}`}>메뉴</summary>
          <nav className="absolute right-0 mt-2 w-[min(20rem,calc(100vw-2.5rem))] border border-slate-200 bg-white p-2 text-slate-800 shadow-xl" aria-label="모바일 메뉴">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href} className="block rounded-md px-4 py-3 text-sm font-semibold hover:bg-blue-50 hover:text-blue-700">{item.label}</Link>
            ))}
            <Link href="/contact" className="mt-1 block rounded-md bg-[#102a43] px-4 py-3 text-sm font-bold text-white">문의하기</Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
