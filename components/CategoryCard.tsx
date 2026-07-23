import Link from "next/link";
import type { Category } from "@/lib/posts";

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/category/${category.slug}`}
      className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:border-teal-300 hover:shadow-md"
    >
      <h3 className="text-lg font-semibold text-slate-950">{category.name}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-600">{category.description}</p>
    </Link>
  );
}
