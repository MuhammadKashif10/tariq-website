import type { MetadataRoute } from "next";
import { areas } from "@/data/areas";
import { services } from "@/data/services";
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
  const areaPaths = areas.map((a) => `/areas/${a.slug}`);

  return [...staticPaths, ...servicePaths, ...areaPaths].map((path) => ({
    url: absoluteUrl(path),
    changeFrequency: "weekly",
  }));
}
