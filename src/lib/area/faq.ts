import type { AreaData, AreaFaqItem } from "@/data/area-content";
import { faqs as globalFaqs } from "@/data/faqs";

/** Stable, build-safe hash of a slug (no Date.now / Math.random). */
function slugHash(slug: string): number {
  let h = 0;
  for (let i = 0; i < slug.length; i++) {
    h = (h * 31 + slug.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

/**
 * Builds the displayed FAQ list for an Area Page:
 *   - the 4 unique, area-specific FAQs, followed by
 *   - 2–3 GLOBAL FAQs, rotated deterministically by slug so no two pages
 *     show an identical FAQ block.
 *
 * The returned list is the single source used for both rendering AND the
 * FAQPage schema, guaranteeing schema/visible-content parity.
 */
export function buildAreaFaqs(area: AreaData): AreaFaqItem[] {
  const hash = slugHash(area.slug);
  const count = 2 + (hash % 2); // 2 or 3

  const usedQuestions = new Set(area.faqUnique.map((f) => f.q.trim().toLowerCase()));
  const pool = globalFaqs.filter((f) => !usedQuestions.has(f.q.trim().toLowerCase()));

  const rotated: AreaFaqItem[] = [];
  if (pool.length > 0) {
    const start = hash % pool.length;
    for (let k = 0; k < count && k < pool.length; k++) {
      rotated.push(pool[(start + k) % pool.length]);
    }
  }

  return [...area.faqUnique, ...rotated];
}
