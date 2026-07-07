import type { MetadataRoute } from "next";
import { posts } from "@/lib/posts";

const baseUrl = "https://clinicgeo.co.kr";

export default function sitemap(): MetadataRoute.Sitemap {
  const publishedPosts = posts.filter((post) => post.published);

  const staticRoutes = [
    "/",
    "/blog",
    "/category/hospital-geo",
    "/category/geo-agency-guide",
    "/category/dental-geo",
    "/category/dermatology-geo",
    "/category/orthopedics-geo",
    "/category/internal-medicine-geo",
    "/category/plastic-surgery-geo",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  const postRoutes = publishedPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(),
  }));

  return [...staticRoutes, ...postRoutes];
}
