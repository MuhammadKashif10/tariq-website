import type { MetadataRoute } from "next";
import { services } from "@/data/services";
import { getValidAreaSlugs } from "@/lib/area/validation";
import { absoluteUrl } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "/",
    "/about",
    "/services",
    "/areas",
    "/faq",
    "/contact",
    "/privacy-policy",
    "/terms-conditions",
  ];
  const servicePaths = services.map((s) => `/services/${s.slug}`);
  // Only areas with complete, valid content (i.e. actually rendered) are listed.
  const areaPaths = getValidAreaSlugs().map((slug) => `/areas/${slug}`);

  // Build-time freshness signal (the frozen area model has no per-page date field).
  const lastModified = new Date();

  return [...staticPaths, ...servicePaths, ...areaPaths].map((path) => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency: "weekly",
  }));
}
