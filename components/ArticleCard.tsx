import Link from "next/link";
import type { Post } from "@/lib/posts";

export function ArticleCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="flex min-h-[260px] flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-blue-300 hover:shadow-md"
    >
      <p className="mb-4 w-fit rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
        {post.categoryName}
      </p>
      <h3 className="text-xl font-semibold leading-8 text-slate-950">{post.title}</h3>
      <p className="mt-4 flex-1 text-sm leading-6 text-slate-600">{post.description}</p>
      <p className="mt-6 text-sm font-semibold text-blue-700">자세히 보기 →</p>
    </Link>
  );
}
