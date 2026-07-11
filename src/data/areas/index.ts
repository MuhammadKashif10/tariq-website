// =============================================================================
// AREA DATA — assembly point
// -----------------------------------------------------------------------------
// The single ordered list of every published Area, concatenated from the
// per-region modules. `area-content.ts` turns this into the keyed registry that
// the grids, sitemap, generateStaticParams and build audit all read from.
//
// To add an area: append one object to the relevant region module. Nothing else
// needs touching — ordering is normalised (alphabetically) downstream in
// getPublishedAreas(), and the build audit enforces uniqueness + link integrity.
// =============================================================================

import type { AreaData } from "@/data/area-content-types";
import { NEW_DUBAI_AREAS } from "./new-dubai";
import { CENTRAL_AREAS } from "./central";
import { OLD_DUBAI_AREAS } from "./old-dubai";
import { DUBAILAND_AREAS } from "./dubailand";
import { EMAAR_VILLA_AREAS } from "./emaar-villas";

export const AREA_LIST: AreaData[] = [
  ...NEW_DUBAI_AREAS,
  ...CENTRAL_AREAS,
  ...OLD_DUBAI_AREAS,
  ...DUBAILAND_AREAS,
  ...EMAAR_VILLA_AREAS,
];
