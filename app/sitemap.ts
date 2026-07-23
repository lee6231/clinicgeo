import type { MetadataRoute } from "next";
import { posts } from "@/lib/posts";
import { siteUrl } from "@/lib/seo";
import { isArticleListed } from "@/lib/editorial";

export default function sitemap(): MetadataRoute.Sitemap {
  const publishedPosts = posts.filter((post) => post.published && isArticleListed(post.slug));

  const staticRoutes = [
    "/",
    "/about",
    "/blog",
    "/hospitals",
    "/hospital-guides",
    "/geo-resources",
    "/editorial-policy",
    "/advertising-disclosure",
    "/correction-request",
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
