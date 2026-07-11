import type { AreaData, AreaImage, HeroImageKey } from "@/data/area-content";

/**
 * Shared hero image library — ONE reusable image per community type.
 * Area Pages never require a unique hero image; the community type selects it.
 * (Add the actual assets to /public/images/areas/ during the content phase.)
 */
export const HERO_IMAGES: Record<HeroImageKey, string> = {
  "high-rise": "/images/areas/hero-high-rise.webp",
  waterfront: "/images/areas/hero-waterfront.webp",
  "villa-community": "/images/areas/hero-villa-community.webp",
  "business-district": "/images/areas/hero-business-district.webp",
  industrial: "/images/areas/hero-industrial.webp",
  "master-planned": "/images/areas/hero-master-planned.webp",
  mixed: "/images/areas/hero-mixed.webp",
};

/** Resolves the reusable hero image plus an area-specific, descriptive alt. */
export function getHeroImage(area: AreaData): AreaImage {
  return {
    src: HERO_IMAGES[area.heroImageKey],
    alt: `Junk removal in ${area.name}, Dubai — Fast Junk Service Dubai`,
  };
}
