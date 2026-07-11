import type { AreaData } from "@/data/area-content";
import { buildAreaFaqs } from "@/lib/area/faq";
import { resolveCta } from "@/lib/area/cta";
import { getHeroImage } from "@/lib/area/hero-images";
import { areaFaqSchema, areaServiceSchema, breadcrumbSchema } from "@/lib/area/schema";

import { TrustBar } from "@/components/site/TrustBar";
import { HowItWorks } from "@/components/site/HowItWorks";
import { CtaBanner } from "@/components/site/CtaBanner";

import { AreaBreadcrumb } from "./AreaBreadcrumb";
import { AreaHero } from "./AreaHero";
import { AreaIntro } from "./AreaIntro";
import { AreaDemandHighlights } from "./AreaDemandHighlights";
import { AreaServices } from "./AreaServices";
import { AreaPopularRequests } from "./AreaPopularRequests";
import { AreaPropertyTypes } from "./AreaPropertyTypes";
import { AreaLandmarks } from "./AreaLandmarks";
import { AreaAccessNotes } from "./AreaAccessNotes";
import { AreaSeasonalNotes } from "./AreaSeasonalNotes";
import { AreaWhyChooseUs } from "./AreaWhyChooseUs";
import { AreaFaq } from "./AreaFaq";
import { AreaRelatedArticles } from "./AreaRelatedArticles";
import { AreaNearbyAreas } from "./AreaNearbyAreas";
import { AreaExploreHubs } from "./AreaExploreHubs";

/**
 * The single reusable Area Page template. Every Area Page renders from here;
 * all variation comes from the `area` data. Section order is the frozen order.
 * Optional sections self-guard and render nothing when their data is absent.
 * (Section 19 — Floating CTA — is provided globally by the root layout.)
 */
export function AreaPageTemplate({ area }: { area: AreaData }) {
  const faqItems = buildAreaFaqs(area);
  const cta = resolveCta(area.ctaVariantKey);
  const heroImage = getHeroImage(area);

  return (
    <>
      {/* Schema: per-area Service + Breadcrumb + FAQ (LocalBusiness is global). */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(areaServiceSchema(area)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(area)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(areaFaqSchema(faqItems)) }}
      />
      {/* 1 */} <AreaBreadcrumb area={area} />
      {/* 2 */} <AreaHero area={area} heroImage={heroImage} ctaLabels={cta.hero} />
      {/* 3 */} <TrustBar />
      {/* 4 */} <AreaIntro area={area} />
      {/* 5 */} <AreaDemandHighlights area={area} />
      {/* 6 */} <AreaServices area={area} />
      {/* 7 */} <AreaPopularRequests area={area} />
      {/* 8 */} <AreaPropertyTypes area={area} />
      {/* 9 */} <AreaLandmarks area={area} />
      {/* 10 */} <HowItWorks />
      {/* 11 */} <AreaAccessNotes area={area} />
      {/* 12 */} <AreaSeasonalNotes area={area} />
      {/* 13 */} <AreaWhyChooseUs area={area} />
      {/* 14 */} <AreaFaq area={area} items={faqItems} />
      {/* 15 */} <AreaRelatedArticles area={area} />
      {/* 16 */} <AreaNearbyAreas area={area} />
      {/* 17 */} <AreaExploreHubs />
      {/* 18 */}
      <CtaBanner
        heading={`Ready for a Pickup in ${area.name}?`}
        primaryLabel={cta.final.primary}
        secondaryLabel={cta.final.secondary}
      />
    </>
  );
}
