// =============================================================================
// GOVERNANCE — Area data validation
// -----------------------------------------------------------------------------
// Enforces the frozen "block invalid data / never fabricate" rules. Only areas
// whose data fully satisfies the contract are eligible to render or be listed.
// The template never emits placeholders; instead, invalid areas are excluded.
// =============================================================================

import { areaContent, type AreaData, type CtaVariantKey } from "@/data/area-content";
import { HERO_IMAGES } from "./hero-images";

const CTA_KEYS: readonly CtaVariantKey[] = ["A", "B", "C", "D", "E"];

const isFilled = (v: unknown): v is string => typeof v === "string" && v.trim().length > 0;

/** Returns a list of governance violations for an area (empty = valid). */
export function getAreaDataErrors(a: AreaData): string[] {
  const e: string[] = [];

  const req = (v: unknown, name: string) => {
    if (!isFilled(v)) e.push(`${name} is required`);
  };

  // Required scalar text
  req(a.slug, "slug");
  req(a.name, "name");
  req(a.shortName, "shortName");
  req(a.metaTitle, "metaTitle");
  req(a.metaDescription, "metaDescription");
  req(a.heroHeading, "heroHeading");
  req(a.heroSubheading, "heroSubheading");
  req(a.coverageStatement, "coverageStatement");
  req(a.primaryKeyword, "primaryKeyword");

  // Required collections (with frozen cardinalities)
  if (!(a.intro?.length >= 2)) e.push("intro requires at least 2 paragraphs");
  if (!(a.demandDrivers?.length >= 1)) e.push("demandDrivers is required");
  if (!(a.demandNarrative?.length >= 1)) e.push("demandNarrative is required");
  if (!(a.communityType?.length >= 1)) e.push("communityType is required");
  if (!(a.secondaryKeywords?.length >= 1)) e.push("secondaryKeywords is required");
  if (!(a.semanticEntities?.length >= 1)) e.push("semanticEntities is required");
  if (!(a.topServices?.length >= 1)) e.push("topServices is required");
  if (a.faqUnique?.length !== 4) e.push("faqUnique must contain exactly 4 items");
  // relatedArticles: RELAXED while the blog is intentionally pending. An area may
  // carry 0 related articles; when the blog ships, restore the exactly-3 rule and
  // the build audit's contentExists() check will re-enforce resolvable references.
  if (a.relatedArticles?.length && a.relatedArticles.length !== 3) {
    e.push("relatedArticles, when present, must contain exactly 3 items");
  }
  if (a.nearbyAreas?.length !== 6) e.push("nearbyAreas must contain exactly 6 items");
  if (a.relatedServices?.length !== 3) e.push("relatedServices must contain exactly 3 items");

  // Enumerations & structured values
  if (a.searchIntent !== "local-commercial") e.push("searchIntent must be 'local-commercial'");
  if (!a.geo || typeof a.geo.lat !== "number" || typeof a.geo.lng !== "number") {
    e.push("geo (lat/lng) is required");
  }
  if (!a.heroImageKey || !(a.heroImageKey in HERO_IMAGES)) e.push("heroImageKey is invalid");
  if (!CTA_KEYS.includes(a.ctaVariantKey)) e.push("ctaVariantKey is invalid");

  // Optional-with-dependency rules
  if (a.accessNotes?.length && !a.accessNotesSource) {
    e.push("accessNotes requires accessNotesSource ('general' | 'publicly-known')");
  }
  if (a.propertyTypes?.some((p) => !isFilled(p.type) || !isFilled(p.note))) {
    e.push("each propertyTypes entry requires a type and a note");
  }

  return e;
}

export const isValidAreaData = (a: AreaData): boolean => getAreaDataErrors(a).length === 0;

/** Throws with a descriptive reason — useful for build-time diagnostics. */
export function assertValidAreaData(a: AreaData): void {
  const errors = getAreaDataErrors(a);
  if (errors.length > 0) {
    throw new Error(`Invalid AreaData "${a.slug}": ${errors.join("; ")}`);
  }
}

/**
 * All areas whose content is complete enough to render/publish.
 * Sorted alphabetically by display name so the SINGLE source of truth used by
 * the Areas grid, the homepage/service grids, the sitemap and generateStaticParams
 * is deterministic and consistent (registry insertion order is not meaningful).
 */
export function getPublishedAreas(): AreaData[] {
  return Object.values(areaContent)
    .filter(isValidAreaData)
    .sort((a, b) => a.name.localeCompare(b.name));
}

/** Slugs of all published (valid) areas. */
export function getValidAreaSlugs(): string[] {
  return getPublishedAreas().map((a) => a.slug);
}

// ---------------------------------------------------------------------------
// REGISTRY-LEVEL GOVERNANCE — uniqueness + minimum rendered content length
// ---------------------------------------------------------------------------

/**
 * Minimum count of rendered, AREA-AUTHORED words. Configurable (pass an override
 * to getRegistryErrors) — deliberately NOT a hard-coded 1,200. It measures only
 * per-area authored text that actually renders, so a thin area cannot pass by
 * riding on shared template/boilerplate.
 */
export const MIN_AREA_WORD_COUNT = 600;

const wordCount = (parts: (string | undefined)[]): number =>
  parts
    .filter((p): p is string => typeof p === "string")
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;

/**
 * Words of area-authored content that actually render on the page.
 * Null-safe: malformed areas (missing required arrays) are handled by the
 * field-level audit, so this must never throw on them.
 */
export function countRenderedWords(a: AreaData): number {
  return wordCount([
    a.heroHeading,
    a.heroSubheading,
    ...(a.intro ?? []),
    ...(a.demandNarrative ?? []),
    ...(a.demandDrivers ?? []),
    a.coverageStatement,
    ...(a.experienceNotes ?? []),
    ...(a.popularRequests ?? []),
    ...(a.propertyTypes ?? []).flatMap((p) => [p.type, p.note]),
    ...(a.subCommunities ?? []),
    ...(a.landmarks ?? []),
    ...(a.notableBuildings ?? []),
    ...(a.accessNotes ?? []),
    ...(a.seasonalNotes ?? []),
    ...(a.faqUnique ?? []).flatMap((f) => [f.q, f.a]),
  ]);
}

/**
 * Uniqueness-required signatures per area. Includes authored fields AND the
 * rendered, name-interpolated template headings (CTA final heading, Why Choose
 * Us heading, Community Overview H2) per the extended duplicate rules.
 *
 * Deliberately EXCLUDED: CTA button labels (intentionally rotated across areas)
 * and shared scaffolding (TrustBar, How It Works, base "why us" reasons, rotated
 * global FAQs) — these repeat by design and must not fail the build.
 */
const UNIQUE_SIGNATURES: { label: string; value: (a: AreaData) => string }[] = [
  { label: "metaTitle", value: (a) => a.metaTitle ?? "" },
  { label: "metaDescription", value: (a) => a.metaDescription ?? "" },
  { label: "H1 (heroHeading)", value: (a) => a.heroHeading ?? "" },
  { label: "heroSubheading", value: (a) => a.heroSubheading ?? "" },
  { label: "intro", value: (a) => (a.intro ?? []).join(" ") },
  { label: "demandNarrative", value: (a) => (a.demandNarrative ?? []).join(" ") },
  { label: "Why Choose Us body (coverageStatement)", value: (a) => a.coverageStatement ?? "" },
  {
    label: "unique FAQ block",
    value: (a) => (a.faqUnique ?? []).map((f) => `${f.q}|${f.a}`).join("||"),
  },
  { label: "CTA final heading", value: (a) => `Ready for a Pickup in ${a.name}?` },
  { label: "Why Choose Us heading", value: (a) => `Why ${a.name} Residents Choose Us` },
  { label: "Community Overview H2", value: (a) => `Junk Removal in ${a.name}, Dubai` },
];

/**
 * Cross-area duplicate detection + minimum rendered-content length.
 * Returns a list of violations (empty = clean).
 */
export function getRegistryErrors(minWords: number = MIN_AREA_WORD_COUNT): string[] {
  const errors: string[] = [];
  const all = Object.values(areaContent);

  for (const a of all) {
    const wc = countRenderedWords(a);
    if (wc < minWords) {
      errors.push(`"${a.slug}" has ${wc} rendered words (minimum ${minWords})`);
    }
  }

  for (const field of UNIQUE_SIGNATURES) {
    const seen = new Map<string, string>();
    for (const a of all) {
      const key = field.value(a).trim().toLowerCase();
      if (!key) continue;
      const prev = seen.get(key);
      if (prev) {
        errors.push(`Duplicate ${field.label}: "${a.slug}" matches "${prev}"`);
      } else {
        seen.set(key, a.slug);
      }
    }
  }

  return errors;
}
