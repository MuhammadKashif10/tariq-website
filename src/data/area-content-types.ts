// =============================================================================
// FROZEN AREA PAGE DATA MODEL — types
// -----------------------------------------------------------------------------
// The shape of every Area Page, kept in its own module so the per-region data
// files can import it WITHOUT creating an import cycle with the registry
// assembly in area-content.ts. The public surface is unchanged: area-content.ts
// re-exports every one of these types, so existing `@/data/area-content` imports
// keep working.
//
// Field requiredness mirrors the frozen architecture (Required vs Optional).
// Optional fields drive Optional sections: when a field is absent, its section
// does not render (no placeholders, no empty cards).
// =============================================================================

/** Community archetype — drives conditional copy AND the reusable hero image. */
export type CommunityType =
  | "high-rise"
  | "waterfront"
  | "villa-community"
  | "business-district"
  | "industrial"
  | "master-planned"
  | "mixed";

/** Hero images are reused per community type — never one image per area. */
export type HeroImageKey = CommunityType;

/** Deterministic CTA wording rotation key (hero vs final always differ). */
export type CtaVariantKey = "A" | "B" | "C" | "D" | "E";

/** Area Pages carry a single, fixed search intent to protect the keyword firewall. */
export type SearchIntent = "local-commercial";

/** Provenance tag enforcing the "no invented access details" governance rule. */
export type AccessNotesSource = "general" | "publicly-known";

export interface GeoPoint {
  lat: number;
  lng: number;
}

export interface AreaFaqItem {
  q: string;
  a: string;
}

export interface AreaPropertyType {
  type: string;
  note: string;
}

export interface AreaImage {
  src: string;
  alt: string;
}

export interface AreaData {
  // --- Identity & routing --------------------------------------------------
  slug: string;
  name: string;
  shortName: string;
  aliases?: string[];

  // --- Metadata / SERP -----------------------------------------------------
  metaTitle: string;
  metaDescription: string;
  ogTitle?: string;
  ogDescription?: string;

  // --- Hero & intro (unique prose) -----------------------------------------
  heroHeading: string;
  heroSubheading: string;
  intro: string[];

  // --- Local highlights: "Why This Area Needs Professional Junk Removal" ---
  demandDrivers: string[];
  demandNarrative: string[];

  // --- Community & local entity graph --------------------------------------
  communityType: CommunityType[];
  subCommunities?: string[];
  landmarks?: string[];
  notableBuildings?: string[];
  geo: GeoPoint;

  // --- Demand & service layer ----------------------------------------------
  popularRequests?: string[];
  propertyTypes?: AreaPropertyType[];
  topServices: string[];
  seasonalNotes?: string[];

  // --- Keyword & semantic layer --------------------------------------------
  primaryKeyword: string;
  secondaryKeywords: string[];
  semanticEntities: string[];
  searchIntent: SearchIntent;

  // --- Access notes (constrained to verifiable / general facts) ------------
  accessNotes?: string[];
  accessNotesSource?: AccessNotesSource;

  // --- E-E-A-T -------------------------------------------------------------
  experienceNotes?: string[];
  coverageStatement: string;

  // --- FAQ (exactly 4 unique; globals rotated in by the template) ----------
  faqUnique: AreaFaqItem[];

  // --- Related articles (exactly 3 when the blog exists; relaxed while pending) ---
  relatedArticles: string[];

  // --- Relationships -------------------------------------------------------
  nearbyAreas: string[];
  relatedServices: string[];

  // --- Media ---------------------------------------------------------------
  heroImageKey: HeroImageKey;
  localImage?: AreaImage;
  gallery?: AreaImage[];

  // --- CTA -----------------------------------------------------------------
  ctaVariantKey: CtaVariantKey;
}
