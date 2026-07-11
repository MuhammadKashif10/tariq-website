// =============================================================================
// CONTENT REGISTRY
// -----------------------------------------------------------------------------
// Single source of truth for published editorial content (blog / guides) that
// Area Pages may reference via `relatedArticles`. Empty until content exists.
//
// Governance rule: an Area Page cannot be published unless all of its
// `relatedArticles` slugs resolve to entries here. Related Articles are NEVER
// silently filtered — a missing reference fails the production build.
// =============================================================================

export interface ContentEntry {
  slug: string;
  title: string;
  // Room to grow without touching consumers: category, publishedAt, description…
}

export const contentRegistry: ContentEntry[] = [];

export const getContentEntry = (slug: string): ContentEntry | undefined =>
  contentRegistry.find((entry) => entry.slug === slug);

export const contentExists = (slug: string): boolean =>
  contentRegistry.some((entry) => entry.slug === slug);
