// =============================================================================
// AREA PAGE REGISTRY
// -----------------------------------------------------------------------------
// The `areaContent` registry is assembled from the per-region data modules in
// ./areas (the single source of truth). The frozen data-model types live in
// ./area-content-types and are re-exported here, so every existing
// `@/data/area-content` import keeps working unchanged.
//
// Adding a new area = add one object to the relevant region file; every consumer
// (grids, sitemap, generateStaticParams, build audit) picks it up automatically.
// =============================================================================

import type { AreaData } from "./area-content-types";
// Explicit /index path: a legacy `areas.ts` file also exists, and a bare
// "./areas" would resolve to that file instead of this directory module.
import { AREA_LIST } from "./areas/index";

export type {
  CommunityType,
  HeroImageKey,
  CtaVariantKey,
  SearchIntent,
  AccessNotesSource,
  GeoPoint,
  AreaFaqItem,
  AreaPropertyType,
  AreaImage,
  AreaData,
} from "./area-content-types";

export const areaContent: Record<string, AreaData> = Object.fromEntries(
  AREA_LIST.map((area) => [area.slug, area]),
);

export const getAreaContent = (slug: string): AreaData | undefined => areaContent[slug];

export const allAreaContent = (): AreaData[] => Object.values(areaContent);
