import type { MetadataRoute } from "next";
import { posts } from "@/lib/posts";
import { siteUrl } from "@/lib/seo";
import { isArticleListed, lastVerified } from "@/lib/editorial";
import { getIndexableHospitalEntities } from "@/lib/hospitals";
import { directorySpecialties, regions } from "@/lib/regions";

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
    "/contact",
    "/category/hospital-geo",
    "/category/dental-geo",
    "/category/dermatology-geo",
    "/category/orthopedics-geo",
    "/category/internal-medicine-geo",
    "/category/plastic-surgery-geo",
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

  const regionRoutes = directorySpecialties.flatMap((specialty) =>
    regions.map((region) => ({
      url: `${siteUrl}/category/${specialty.slug}/${region.slug}`,
      lastModified: new Date(lastVerified),
    })),
  );

  const districtRoutes = Array.from(
    new Map(
      getIndexableHospitalEntities().map((hospital) => {
        const url = `${siteUrl}/category/${hospital.specialtySlug}/${hospital.regionSlug}/${hospital.districtSlug}`;
        return [url, { url, lastModified: new Date(hospital.verifiedAt) }];
      }),
    ).values(),
  );

  return [...staticRoutes, ...regionRoutes, ...districtRoutes, ...hospitalRoutes, ...postRoutes];
}
