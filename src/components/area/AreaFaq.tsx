import { ChevronDown } from "lucide-react";
import type { AreaData, AreaFaqItem } from "@/data/area-content";

/**
 * Section 14 — Area FAQ (Required, unique).
 * Server-rendered with native <details> so every answer is present in the
 * initial HTML (AEO-friendly) with no client-side JavaScript.
 * `items` are the already-composed 4 unique + 2–3 rotated global FAQs, shared
 * with the FAQPage schema for content/schema parity.
 */
export function AreaFaq({ area, items }: { area: AreaData; items: AreaFaqItem[] }) {
  return (
    <section className="bg-surface py-20">
      <div className="container-prose">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-action">Area FAQ</p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">
            Junk Removal in {area.name} — Questions & Answers
          </h2>
        </div>
        <div className="mx-auto mt-10 grid max-w-4xl gap-4">
          {items.map((faq, i) => (
            <details
              key={faq.q}
              open={i === 0}
              className="group overflow-hidden rounded-2xl border border-border bg-card shadow-soft"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 font-display text-base font-semibold text-foreground marker:content-none [&::-webkit-details-marker]:hidden">
                {faq.q}
                <ChevronDown className="h-5 w-5 shrink-0 text-action transition-transform duration-200 group-open:rotate-180" />
              </summary>
              <div className="border-t border-border px-6 py-4 text-sm text-muted-foreground">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
