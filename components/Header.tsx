import Link from "next/link";
import { categories } from "@/lib/posts";

export function Header() {
  return (
    <header className="border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between">
        <Link href="/" className="text-lg font-semibold tracking-tight text-blue-700">
          Clinic GEO <span className="ml-1 text-sm font-medium text-slate-500">by SUMMITFEED</span>
        </Link>

        <nav className="flex flex-wrap gap-4 text-sm font-medium text-slate-700">
          <Link href="/blog" className="transition hover:text-blue-700">
            전체 아티클
          </Link>
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className="transition hover:text-blue-700"
            >
              {category.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
