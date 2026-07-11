import type { AreaData, AreaFaqItem } from "@/data/area-content";
import { absoluteUrl } from "@/lib/site-config";
import { LOCALBUSINESS_ID } from "@/lib/schema/global";

/**
 * Per-area Service schema. Ties the junk-removal service to THIS area via
 * `areaServed` (with geo), complementing the global LocalBusiness node in the
 * root layout. Provider mirrors the existing service-page pattern.
 */
export function areaServiceSchema(area: AreaData) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Junk Removal",
    name: `Junk Removal in ${area.name}, Dubai`,
    provider: { "@id": LOCALBUSINESS_ID },
    areaServed: {
      "@type": "Place",
      name: `${area.name}, Dubai`,
      geo: {
        "@type": "GeoCoordinates",
        latitude: area.geo.lat,
        longitude: area.geo.lng,
      },
    },
    url: absoluteUrl(`/areas/${area.slug}`),
  };
}

/** Breadcrumb schema: Home › Service Areas › {Area}. */
export function breadcrumbSchema(area: AreaData) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Service Areas", item: absoluteUrl("/areas") },
      {
        "@type": "ListItem",
        position: 3,
        name: area.name,
        item: absoluteUrl(`/areas/${area.slug}`),
      },
    ],
  };
}

/** FAQ schema built from the SAME displayed FAQ list (schema/content parity). */
export function areaFaqSchema(items: AreaFaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
