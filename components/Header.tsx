import Image from "next/image";
import Link from "next/link";

const navigation = [
  { href: "/hospitals", label: "병원 찾기" },
  { href: "/category/orthopedics-geo", label: "정형외과" },
  { href: "/category/dermatology-geo", label: "피부과" },
  { href: "/category/dental-geo", label: "치과" },
  { href: "/category/plastic-surgery-geo", label: "성형외과" },
  { href: "/category/internal-medicine-geo", label: "내과" },
  { href: "/blog", label: "병원 GEO 블로그" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
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
            <span className="block text-base font-bold text-[#17365d]">Clinic GEO</span>
            <span className="hidden text-[10px] font-semibold text-slate-500 sm:block">HOSPITAL INFORMATION HUB</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 xl:flex" aria-label="주요 메뉴">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="rounded-md px-2.5 py-2 text-sm font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-blue-700">
              {item.label}
            </Link>
          ))}
          <Link href="/contact" className="ml-2 rounded-md bg-[#17365d] px-4 py-2 text-sm font-bold text-white hover:bg-blue-700">문의하기</Link>
        </nav>

        <details className="relative xl:hidden">
          <summary className="cursor-pointer list-none rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50">메뉴</summary>
          <nav className="absolute right-0 mt-2 w-[min(20rem,calc(100vw-2.5rem))] border border-slate-200 bg-white p-2 shadow-xl" aria-label="모바일 메뉴">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href} className="block rounded-md px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-blue-50 hover:text-blue-700">{item.label}</Link>
            ))}
            <Link href="/contact" className="mt-1 block rounded-md bg-[#17365d] px-4 py-3 text-sm font-bold text-white">문의하기</Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
