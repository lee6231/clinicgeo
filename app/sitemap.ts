import type { MetadataRoute } from "next";
import { posts } from "@/lib/posts";
import { siteUrl } from "@/lib/seo";
import { isArticleListed, lastVerified } from "@/lib/editorial";
import { getIndexableHospitalEntities } from "@/lib/hospitals";

export default function sitemap(): MetadataRoute.Sitemap {
  const publishedPosts = posts.filter((post) => post.published && isArticleListed(post.slug));

  const staticRoutes = [
    "/",
    "/about",
    "/authors/clinicgeo-editorial-team",
    "/blog",
    "/hospital-guides",
    "/geo-resources",
    "/editorial-policy",
    "/correction-request",
    "/contact",
    "/category/hospital-geo",
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(lastVerified),
  }));

  const postRoutes = publishedPosts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(),
  }));

  const hospitalRoutes = getIndexableHospitalEntities().map((hospital) => ({
    url: `${siteUrl}/hospitals/${hospital.slug}`,
    lastModified: new Date(hospital.verifiedAt),
  }));

  return [...staticRoutes, ...hospitalRoutes, ...postRoutes];
}
