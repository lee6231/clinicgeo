import Link from "next/link";
import type { Post } from "@/lib/posts";

const visualKeywords = ["GEO", "AI", "검색", "인용", "병원", "전략"];

function formatDate(date: string) {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(date));
}

export function ArticleCard({ post }: { post: Post }) {
  const accent = post.categorySlug.includes("dental")
    ? "bg-teal-400"
    : post.categorySlug.includes("dermatology")
      ? "bg-rose-400"
      : post.categorySlug.includes("plastic")
        ? "bg-orange-400"
        : "bg-blue-400";

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl"
    >
      <article className="flex min-h-[360px] w-full flex-col">
        <div className="relative aspect-[16/9] overflow-hidden bg-[#090909] p-5 text-white">
          <div className="absolute inset-0 opacity-70 [background:radial-gradient(circle_at_78%_32%,rgba(249,115,22,0.34),transparent_18%),radial-gradient(circle_at_92%_74%,rgba(255,255,255,0.12),transparent_16%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_32%)]" />
          <div className="absolute right-5 top-5 h-16 w-16 rounded-full bg-orange-100/95" />
          <div className={`absolute right-12 top-14 h-7 w-7 rounded-full ${accent}`} />
          <div className="absolute bottom-8 right-9 grid grid-cols-2 gap-1.5">
            <span className="h-4 w-10 rounded-sm bg-white/90" />
            <span className="h-4 w-7 rounded-sm bg-white/70" />
            <span className="h-4 w-7 rounded-sm bg-orange-500" />
            <span className="h-4 w-10 rounded-sm bg-white/80" />
          </div>
          <div className="relative flex h-full flex-col justify-between">
            <p className="text-[10px] font-semibold uppercase text-white/55">Clinic GEO</p>
            <div>
              <p className="text-xs font-semibold text-orange-400">{post.categoryName}</p>
              <h3 className="mt-2 line-clamp-2 max-w-[72%] text-xl font-semibold leading-6 text-white">
                {post.title}
              </h3>
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500">
            <span className="text-orange-600">{formatDate(post.publishedAt)}</span>
            <span className="h-1 w-1 rounded-full bg-slate-300" />
            <span>{post.categoryName}</span>
          </div>
          <h3 className="mt-3 line-clamp-2 text-lg font-semibold leading-7 text-slate-950 group-hover:text-blue-700">
            {post.title}
          </h3>
          <p className="mt-3 line-clamp-3 flex-1 text-sm leading-6 text-slate-600">{post.description}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {visualKeywords.slice(0, 3).map((keyword) => (
              <span key={keyword} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </article>
    </Link>
  );
}
