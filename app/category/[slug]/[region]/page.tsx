import { notFound, permanentRedirect } from "next/navigation";
import { categories } from "@/lib/posts";

type PageParams = Promise<{ slug: string; region: string }>;

export default async function RegionPage({ params }: { params: PageParams }) {
  const { slug } = await params;
  if (!categories.some((category) => category.slug === slug)) notFound();

  permanentRedirect(`/category/${slug}`);
}