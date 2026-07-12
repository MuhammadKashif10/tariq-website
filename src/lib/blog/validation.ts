// =============================================================================
// BUILD-TIME BLOG GOVERNANCE
// -----------------------------------------------------------------------------
// Fails `next build` when the Articles registry is invalid. Invoked once from
// the /blog/[slug] route's generateStaticParams. With an empty registry there
// is nothing to validate and the build passes cleanly.
//
// Coverage map (requirement → check):
//   missing required fields        → getArticleErrors() (field + content-block level)
//   slug uniqueness                → getArticleRegistryErrors()
//   metadata uniqueness            → getArticleRegistryErrors() (title + description,
//                                     incl. cross-surface collision with services)
//   broken related-article links   → getArticleRegistryErrors()
// =============================================================================

import { articles, ARTICLE_CATEGORIES, type Article, type ArticleBlock } from "@/data/articles";
import { services } from "@/data/services";

const isFilled = (v: unknown): v is string => typeof v === "string" && v.trim().length > 0;

const CATEGORIES = new Set<string>(ARTICLE_CATEGORIES);
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** Validates a single content block; returns descriptive errors (empty = valid). */
function getBlockErrors(b: ArticleBlock, i: number): string[] {
  const at = `content[${i}] (${b.type})`;
  switch (b.type) {
    case "heading":
      return [
        ...(isFilled(b.text) ? [] : [`${at} requires text`]),
        ...(isFilled(b.id) ? [] : [`${at} requires a stable id`]),
        ...(b.level === 2 || b.level === 3 ? [] : [`${at} level must be 2 or 3`]),
      ];
    case "paragraph":
      return isFilled(b.text) ? [] : [`${at} requires text`];
    case "list":
      return Array.isArray(b.items) && b.items.length > 0 && b.items.every(isFilled)
        ? []
        : [`${at} requires at least one non-empty item`];
    case "image":
      return isFilled(b.src) && isFilled(b.alt) ? [] : [`${at} requires src and descriptive alt`];
    case "quote":
      return isFilled(b.text) ? [] : [`${at} requires text`];
    default:
      return [`${at} is an unknown block type`];
  }
}

/** Field-level validity for one article (descriptive). Empty array = valid. */
export function getArticleErrors(a: Article): string[] {
  const e: string[] = [];
  const req = (v: unknown, name: string) => {
    if (!isFilled(v)) e.push(`${name} is required`);
  };

  req(a.slug, "slug");
  if (isFilled(a.slug) && !SLUG_RE.test(a.slug)) e.push(`slug "${a.slug}" must be kebab-case`);
  req(a.title, "title");
  req(a.excerpt, "excerpt");
  if (!CATEGORIES.has(a.category)) e.push(`category "${a.category}" is not a known category`);

  if (!isFilled(a.publishedAt) || Number.isNaN(Date.parse(a.publishedAt))) {
    e.push("publishedAt must be a valid ISO date");
  }
  if (a.updatedAt !== undefined && Number.isNaN(Date.parse(a.updatedAt))) {
    e.push("updatedAt, when present, must be a valid ISO date");
  }
  if (typeof a.readingTimeMinutes !== "number" || a.readingTimeMinutes <= 0) {
    e.push("readingTimeMinutes must be a positive number");
  }
  if (!a.image || !isFilled(a.image.src) || !isFilled(a.image.alt)) {
    e.push("image (src + descriptive alt) is required");
  }
  if (!Array.isArray(a.content) || a.content.length === 0) {
    e.push("content must contain at least one block");
  } else {
    a.content.forEach((b, i) => e.push(...getBlockErrors(b, i)));
  }
  if (a.faq?.some((f) => !isFilled(f.q) || !isFilled(f.a))) {
    e.push("each faq item requires both a question and an answer");
  }
  return e;
}

/** Registry-wide governance: uniqueness + link integrity. Empty array = clean. */
export function getArticleRegistryErrors(): string[] {
  const errors: string[] = [];

  // Field-level validity for every entry (no silent skipping).
  for (const a of articles) {
    for (const err of getArticleErrors(a)) errors.push(`[${a.slug || "?"}] ${err}`);
  }

  // Slug uniqueness.
  const slugs = new Set<string>();
  for (const a of articles) {
    if (!isFilled(a.slug)) continue;
    if (slugs.has(a.slug)) errors.push(`Duplicate article slug "${a.slug}"`);
    else slugs.add(a.slug);
  }

  // Metadata uniqueness — effective title/description, across articles AND
  // against service pages (cheap cross-surface collision guard).
  const titleOwners = new Map<string, string>();
  const descOwners = new Map<string, string>();
  const check = (map: Map<string, string>, value: string | undefined, owner: string) => {
    if (!isFilled(value)) return;
    const key = value.trim().toLowerCase();
    const prev = map.get(key);
    if (prev) errors.push(`Duplicate metadata: "${owner}" matches "${prev}"`);
    else map.set(key, owner);
  };
  for (const s of services) {
    check(titleOwners, s.metaTitle, `service:${s.slug}`);
    check(descOwners, s.metaDescription, `service:${s.slug}`);
  }
  for (const a of articles) {
    check(titleOwners, a.metaTitle ?? a.title, `article:${a.slug}`);
    check(descOwners, a.metaDescription ?? a.excerpt, `article:${a.slug}`);
  }

  // Broken related-article links — every relatedSlug must resolve, and not to self.
  for (const a of articles) {
    for (const rel of a.relatedSlugs ?? []) {
      if (rel === a.slug) {
        errors.push(`[${a.slug}] relatedSlugs cannot reference itself`);
      } else if (!slugs.has(rel)) {
        errors.push(`[${a.slug}] related article "${rel}" is not a registered article`);
      }
    }
  }

  return errors;
}

/** Throws (failing `next build`) if the Articles registry has any issue. */
export function auditArticleRegistry(): void {
  const errors = getArticleRegistryErrors();
  if (errors.length > 0) {
    throw new Error(
      `Blog registry audit failed with ${errors.length} issue(s):\n - ${errors.join("\n - ")}`,
    );
  }
}
