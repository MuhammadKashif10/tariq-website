// =============================================================================
// BUILD-TIME SEO AUDIT
// -----------------------------------------------------------------------------
// Fails the production build when any deployment-blocking SEO issue exists.
// Invoked from the Area route's generateStaticParams (runs once at build).
//
// Coverage map (requirement → check):
//   duplicate titles / descriptions / H1s / intros / narratives / FAQs → getRegistryErrors()
//   thin content (min length)                                          → getRegistryErrors()
//   missing/invalid schema inputs (geo, name, faq)                     → getAreaDataErrors()
//   missing OpenGraph image (heroImageKey) / missing alt (name)        → getAreaDataErrors()
//   missing nearby areas / related articles (counts)                   → getAreaDataErrors()
//   broken internal links (nearby / services / articles)               → below
//   orphan Area Pages                                                  → below
//   duplicate canonical / static-title collision                      → below
// =============================================================================

import { areaContent, type AreaData } from "@/data/area-content";
import { contentExists } from "@/data/content-registry";
import { services } from "@/data/services";
import { getAreaDataErrors, getPublishedAreas, getRegistryErrors } from "@/lib/area/validation";

// Titles of the hand-authored static routes. Kept in sync manually; prevents an
// Area metaTitle from colliding with a static page title.
const STATIC_TITLES: readonly string[] = [
  "Junk Removal Dubai | Same-Day Junk Pickup & Clearance",
  "Junk Removal Services Dubai | Furniture, Appliances & Clearance",
  "Junk Removal Service Areas in Dubai | All 40+ Communities",
];

const serviceSlugs = new Set(services.map((s) => s.slug));

export function getAuditErrors(): string[] {
  const errors: string[] = [];
  const all: AreaData[] = Object.values(areaContent);

  // Field-level validity for every populated area (no silent skipping).
  for (const a of all) {
    for (const fieldError of getAreaDataErrors(a)) {
      errors.push(`[${a.slug}] ${fieldError}`);
    }
  }

  // Duplicates (incl. CTA/Why-Choose-Us headings) + minimum rendered length.
  errors.push(...getRegistryErrors());

  // Site-wide metadata uniqueness across ALL data-driven pages + static routes.
  // Area-vs-area title/description duplicates are covered by getRegistryErrors;
  // this adds service-vs-service and every cross-surface collision (zero-maintenance —
  // it reads services.ts + the area registry directly).
  const titleOwners = new Map<string, string>();
  const descOwners = new Map<string, string>();
  const check = (
    map: Map<string, string>,
    value: string | undefined,
    owner: string,
    add: boolean,
  ) => {
    if (!value?.trim()) return;
    const key = value.trim().toLowerCase();
    const prev = map.get(key);
    if (prev) errors.push(`Duplicate metadata: "${owner}" matches "${prev}"`);
    else if (add) map.set(key, owner);
  };
  for (const title of STATIC_TITLES) check(titleOwners, title, "static-route", true);
  for (const s of services) {
    check(titleOwners, s.metaTitle, `service:${s.slug}`, true);
    check(descOwners, s.metaDescription, `service:${s.slug}`, true);
  }
  for (const a of all) {
    check(titleOwners, a.metaTitle, `area:${a.slug}`, false); // area-vs-area handled above
    check(descOwners, a.metaDescription, `area:${a.slug}`, false);
  }

  const publishedSlugs = new Set(getPublishedAreas().map((a) => a.slug));

  // How many times each area is referenced as a "nearby area" (orphan detection).
  // All array reads are null-safe: field-level errors are reported above, and the
  // audit must aggregate a clean report rather than throw on malformed data.
  const referencedBy = new Map<string, number>();
  for (const a of all) {
    for (const near of a.nearbyAreas ?? []) {
      referencedBy.set(near, (referencedBy.get(near) ?? 0) + 1);
    }
  }

  const canonicals = new Map<string, string>();

  for (const a of all) {
    // Broken internal links — nearby areas must be published Area Pages.
    for (const near of a.nearbyAreas ?? []) {
      if (!publishedSlugs.has(near)) {
        errors.push(`[${a.slug}] nearby area "${near}" is not a published Area Page`);
      }
    }

    // Broken internal links — services must exist.
    for (const svc of [...(a.relatedServices ?? []), ...(a.topServices ?? [])]) {
      if (!serviceSlugs.has(svc)) {
        errors.push(`[${a.slug}] references unknown service "${svc}"`);
      }
    }

    // Related Articles must all exist — never silently filter (fail the build).
    for (const article of a.relatedArticles ?? []) {
      if (!contentExists(article)) {
        errors.push(`[${a.slug}] related article "${article}" not found in content registry`);
      }
    }

    // Orphan detection — a published area must be reachable from a sibling.
    if (publishedSlugs.has(a.slug) && (referencedBy.get(a.slug) ?? 0) === 0) {
      errors.push(`[${a.slug}] is orphaned (no other area links to it via nearbyAreas)`);
    }

    // Duplicate canonical URLs.
    const canonical = `/areas/${a.slug}`;
    const prev = canonicals.get(canonical);
    if (prev) errors.push(`Duplicate canonical ${canonical}: "${a.slug}" and "${prev}"`);
    else canonicals.set(canonical, a.slug);
  }

  return errors;
}

/** Throws (failing `next build`) if any deployment-blocking SEO issue exists. */
export function auditAreaRegistry(): void {
  const errors = getAuditErrors();
  if (errors.length > 0) {
    throw new Error(
      `SEO build audit failed with ${errors.length} issue(s):\n - ${errors.join("\n - ")}`,
    );
  }
}
