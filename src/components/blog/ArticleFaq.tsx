import { ChevronDown } from "lucide-react";
import type { ArticleFaqItem } from "@/data/articles";

/**
 * Server component. Conditional article FAQ using native <details> — expandable
 * with zero client JavaScript. Renders nothing when there are no items.
 */
export function ArticleFaq({ items }: { items: ArticleFaqItem[] }) {
  if (!items || items.length === 0) return null;

  return (
    <section className="container-prose py-16 md:py-20">
      <div className="mx-auto max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-action">FAQ</p>
        <h2 className="mt-2 text-3xl font-bold md:text-4xl">Frequently Asked Questions</h2>
        <div className="mt-8 space-y-3">
          {items.map((item, i) => (
            <details
              key={i}
              className="group rounded-2xl border border-border bg-card p-5 shadow-soft transition open:border-action"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display font-semibold">
                {item.q}
                <ChevronDown className="h-5 w-5 shrink-0 text-action transition group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-muted-foreground">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
