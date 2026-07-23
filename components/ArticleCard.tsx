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
    ? "border-teal-400"
    : post.categorySlug.includes("dermatology")
      ? "border-rose-400"
      : post.categorySlug.includes("plastic")
        ? "border-amber-400"
        : "border-teal-500";

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:border-teal-300 hover:shadow-lg"
    >
      <article className="flex min-h-[360px] w-full flex-col">
        <div className={`relative aspect-[16/9] overflow-hidden border-l-4 bg-slate-950 p-5 text-white ${accent}`}>
          <div className="flex items-center justify-between border-b border-slate-700 pb-3">
            <p className="text-[10px] font-bold text-teal-300">Clinic GEO 편집 노트</p>
            <p className="text-[10px] font-semibold text-slate-500">{post.categoryName}</p>
          </div>
          <div className="mt-5 grid grid-cols-[1fr_5rem] gap-5">
            <div>
              <p className="text-xs font-bold text-amber-400">공개 기준·공식 정보</p>
              <h3 className="mt-2 line-clamp-3 text-xl font-bold leading-7 text-white">{post.title}</h3>
            </div>
            <div className="grid content-start gap-2 pt-1" aria-hidden>
              <span className="h-2 bg-teal-500" />
              <span className="h-2 bg-slate-600" />
              <span className="h-2 w-4/5 bg-slate-600" />
              <span className="mt-3 h-px bg-slate-700" />
              <span className="h-6 border border-slate-600" />
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500">
            <span className="text-orange-600">{formatDate(post.publishedAt)}</span>
            <span className="h-1 w-1 rounded-full bg-slate-300" />
            <span>{post.categoryName}</span>
          </div>
          <h3 className="mt-3 line-clamp-2 text-lg font-semibold leading-7 text-slate-950 group-hover:text-teal-800">
            {post.title}
          </h3>
          <p className="mt-3 line-clamp-3 flex-1 text-sm leading-6 text-slate-600">{post.description}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {visualKeywords.slice(0, 3).map((keyword) => (
              <span key={keyword} className="rounded-sm bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </article>
    </Link>
  );
}
