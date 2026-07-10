import type { MetadataRoute } from "next";
import { posts } from "@/lib/posts";
import { siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const publishedPosts = posts.filter((post) => post.published);

  const staticRoutes = [
    "/",
    "/about",
    "/blog",
    "/category/hospital-geo",
    "/category/dental-geo",
    "/category/dermatology-geo",
    "/category/orthopedics-geo",
    "/category/internal-medicine-geo",
    "/category/plastic-surgery-geo",
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
  }));

  const postRoutes = publishedPosts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(),
  }));

  return [...staticRoutes, ...postRoutes];
}
