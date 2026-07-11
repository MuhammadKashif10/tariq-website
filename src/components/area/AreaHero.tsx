import { PageHero } from "@/components/site/PageHero";
import { Cta } from "@/components/site/Cta";
import type { AreaData, AreaImage } from "@/data/area-content";
import type { CtaLabels } from "@/lib/area/cta";

/** Section 2 — Hero (Required). Uses the reusable community-type hero image. */
export function AreaHero({
  area,
  heroImage,
  ctaLabels,
}: {
  area: AreaData;
  heroImage: AreaImage;
  ctaLabels: CtaLabels;
}) {
  return (
    <PageHero
      eyebrow={`Dubai — ${area.name}`}
      title={area.heroHeading}
      sub={area.heroSubheading}
      image={heroImage}
    >
      <Cta
        variant="wa"
        size="lg"
        label={ctaLabels.primary}
        whatsappContext={`Area: ${area.name}`}
      />
      <Cta variant="call" size="lg" label={ctaLabels.secondary} />
    </PageHero>
  );
}
