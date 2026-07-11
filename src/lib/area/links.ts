import { getAreaContent } from "@/data/area-content";
import { getContentEntry } from "@/data/content-registry";
import { services } from "@/data/services";

export interface ResolvedLink {
  slug: string;
  label: string;
  href: string;
}

/** Presentational slug → Title Case (e.g. "furniture-removal" → "Furniture Removal"). */
export function slugToTitle(slug: string): string {
  return slug
    .split("-")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

/**
 * Resolves nearby-area slugs to links. Names come from the Area Content registry
 * (single source of truth); a readable fallback is derived only if absent.
 */
export function resolveNearbyAreas(slugs: string[]): ResolvedLink[] {
  return slugs.map((slug) => ({
    slug,
    label: getAreaContent(slug)?.name ?? slugToTitle(slug),
    href: `/areas/${slug}`,
  }));
}

/** Resolves related-service slugs to links using the canonical service data. */
export function resolveRelatedServices(slugs: string[]): ResolvedLink[] {
  return slugs
    .map((slug) => {
      const service = services.find((s) => s.slug === slug);
      if (!service) return null;
      return { slug, label: service.name, href: `/services/${slug}` };
    })
    .filter((l): l is ResolvedLink => l !== null);
}

/**
 * Resolves related-article slugs to blog links using the content registry as the
 * source of truth for titles. Existence is enforced at build time (the audit
 * fails the build if any reference is missing) — this never silently filters.
 */
export function resolveRelatedArticles(slugs: string[]): ResolvedLink[] {
  return slugs.map((slug) => ({
    slug,
    label: getContentEntry(slug)?.title ?? slugToTitle(slug),
    href: `/blog/${slug}`,
  }));
}
