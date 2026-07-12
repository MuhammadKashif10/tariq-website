// Presentation helpers for blog content. Pure + deterministic (SSR/SSG-safe).

import { format, parseISO } from "date-fns";

/** "12 Jul 2026" — stable, locale-independent display date from an ISO string. */
export function formatArticleDate(iso: string): string {
  return format(parseISO(iso), "d MMM yyyy");
}

/** "6 min read" — human label for a whole-minute reading estimate. */
export function formatReadingTime(minutes: number): string {
  return `${Math.max(1, Math.round(minutes))} min read`;
}
