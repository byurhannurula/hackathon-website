import type { MetadataRoute } from "next";
import { siteConfig } from "@/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/api/og/*"],
      disallow: ["/api/", "/kcah-ia-esur/"],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
