import Link from "next/link";
import { navigation } from "@/lib/editorial";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-6">
        <Link href="/" className="group flex items-center gap-3" aria-label="Clinic GEO 홈">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-teal-800 text-sm font-bold text-white">
            CG
          </span>
          <span>
            <span className="block text-lg font-bold text-slate-950">Clinic GEO</span>
            <span className="hidden text-[11px] font-medium text-slate-500 sm:block">병원 선택과 GEO 공식 자료</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="주요 메뉴">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-teal-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <details className="relative lg:hidden">
          <summary className="cursor-pointer list-none rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50">
            메뉴
          </summary>
          <nav
            className="absolute right-0 mt-2 w-[min(19rem,calc(100vw-2.5rem))] border border-slate-200 bg-white p-2 shadow-xl"
            aria-label="모바일 메뉴"
          >
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-md px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-teal-50 hover:text-teal-900"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </details>
      </div>
    </header>
  );
}
