import type { MetadataRoute } from "next";
import { shortSiteDescription } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Clinic GEO by SUMMITFEED",
    short_name: "Clinic GEO",
    description: shortSiteDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#fffaf4",
    theme_color: "#3b2934",
    lang: "ko-KR",
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
