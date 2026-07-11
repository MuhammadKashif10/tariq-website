import { services, type Service } from "@/data/services";

/**
 * Returns ALL services, reordered so the area's `topServices` appear first
 * (in the given order), followed by the remaining services in their canonical
 * order. Unknown slugs are ignored. This personalises the service section per
 * area without hiding any service.
 */
export function orderServices(topServices: string[]): Service[] {
  const top = topServices
    .map((slug) => services.find((s) => s.slug === slug))
    .filter((s): s is Service => Boolean(s));

  const topSlugs = new Set(top.map((s) => s.slug));
  const rest = services.filter((s) => !topSlugs.has(s.slug));

  return [...top, ...rest];
}
