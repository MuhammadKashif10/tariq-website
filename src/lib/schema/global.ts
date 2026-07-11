// =============================================================================
// UNIFIED GLOBAL ENTITY GRAPH
// -----------------------------------------------------------------------------
// One connected @graph for the whole site: Organization ↔ WebSite ↔ LocalBusiness,
// linked by stable @id. Rendered ONCE in the root layout. Per-page Service schema
// references the LocalBusiness by @id (never re-declares it).
//
// geo and logo are intentionally OMITTED until verified coordinates / a real logo
// asset exist — they are never fabricated or substituted with the favicon.
// No Review / Rating / AggregateRating / Offer schema is emitted.
// =============================================================================

import { absoluteUrl, site } from "@/lib/site-config";

export const ORG_ID = absoluteUrl("/#organization");
export const WEBSITE_ID = absoluteUrl("/#website");
export const LOCALBUSINESS_ID = absoluteUrl("/#localbusiness");

export function globalSchemaGraph() {
  const organization = {
    "@type": "Organization",
    "@id": ORG_ID,
    name: site.name,
    url: absoluteUrl("/"),
    ...(site.sameAs.length > 0 ? { sameAs: site.sameAs } : {}),
    // logo: omitted until a real company logo asset is available.
  };

  const website = {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: absoluteUrl("/"),
    name: site.name,
    publisher: { "@id": ORG_ID },
    // No SearchAction: the site exposes no on-site search endpoint.
  };

  const localBusiness = {
    "@type": "LocalBusiness",
    "@id": LOCALBUSINESS_ID,
    name: site.name,
    url: absoluteUrl("/"),
    telephone: site.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address,
      addressLocality: "Dubai",
      addressCountry: "AE",
    },
    openingHours: ["Sa-Th 07:00-22:00", "Fr 09:00-22:00"],
    priceRange: "$$",
    parentOrganization: { "@id": ORG_ID },
    ...(site.sameAs.length > 0 ? { sameAs: site.sameAs } : {}),
    // geo: omitted until verified coordinates are available (never guessed).
    // logo / image: omitted until a real logo asset is available.
  };

  return {
    "@context": "https://schema.org",
    "@graph": [organization, website, localBusiness],
  };
}

export interface BreadcrumbItem {
  name: string;
  path: string;
}

/**
 * Generic BreadcrumbList builder (schema.org valid). Reusable across page types;
 * `path` is resolved to an absolute URL. Positions are 1-indexed in order.
 */
export function breadcrumbListSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
