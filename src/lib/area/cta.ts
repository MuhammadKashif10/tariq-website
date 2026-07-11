import type { CtaVariantKey } from "@/data/area-content";

export interface CtaLabels {
  /** Applied to the WhatsApp action. */
  primary: string;
  /** Applied to the Call action. */
  secondary: string;
}

/**
 * Rotation pool. Only the WORDING rotates — the underlying actions and
 * destinations (WhatsApp / Call / Contact) are identical on every page.
 */
export const CTA_VARIANTS: readonly CtaLabels[] = [
  { primary: "Schedule Collection", secondary: "Speak With Our Team" },
  { primary: "Arrange Pickup", secondary: "Call the Team" },
  { primary: "Book Your Collection", secondary: "Talk to Us Today" },
  { primary: "Get a Pickup Slot", secondary: "Speak to Our Crew" },
  { primary: "Plan Your Clear-Out", secondary: "Call Now" },
];

const KEY_INDEX: Record<CtaVariantKey, number> = { A: 0, B: 1, C: 2, D: 3, E: 4 };

/**
 * Resolves hero and final CTA wording for an area.
 * The final set is offset from the hero set so the two are ALWAYS different
 * within a single page, while remaining deterministic across builds.
 */
export function resolveCta(key: CtaVariantKey): { hero: CtaLabels; final: CtaLabels } {
  const i = KEY_INDEX[key];
  return {
    hero: CTA_VARIANTS[i],
    final: CTA_VARIANTS[(i + 2) % CTA_VARIANTS.length],
  };
}
