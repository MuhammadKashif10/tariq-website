// =============================================================================
// CONTENT REGISTRY  (compatibility layer over the Articles registry)
// -----------------------------------------------------------------------------
// Area Pages reference editorial content via `relatedArticles` slugs. That
// governance check (see lib/seo/audit.ts) resolves slugs through the helpers
// below. The canonical source of truth is now `data/articles.ts`; this module
// simply projects it to the lightweight shape the area audit needs, so a single
// registry drives both the Blog and the Area ↔ Article link integrity.
//
// Governance rule (unchanged): an Area Page cannot be published unless all of
// its `relatedArticles` slugs resolve here. References are NEVER silently
// filtered — a missing one fails the production build.
// =============================================================================

import { getPublishedArticles } from "./articles";

export interface ContentEntry {
  slug: string;
  title: string;
}

const toEntry = (a: { slug: string; title: string }): ContentEntry => ({
  slug: a.slug,
  title: a.title,
});

/** Published editorial content, projected from the Articles registry. */
export const contentRegistry: ContentEntry[] = getPublishedArticles().map(toEntry);

export const getContentEntry = (slug: string): ContentEntry | undefined =>
  contentRegistry.find((entry) => entry.slug === slug);

export const contentExists = (slug: string): boolean =>
  contentRegistry.some((entry) => entry.slug === slug);
