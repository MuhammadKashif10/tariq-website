import { CheckCircle2 } from "lucide-react";
import type { AreaData } from "@/data/area-content";

/** Section 7 — Popular Removal Requests (Optional). Renders only when data exists. */
export function AreaPopularRequests({ area }: { area: AreaData }) {
  if (!area.popularRequests?.length) return null;

  return (
    <section className="container-prose py-20">
      <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-action">
            Local Pickup Needs
          </p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">
            Popular Junk Removal Requests in {area.name}
          </h2>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2">
          {area.popularRequests.map((request) => (
            <li
              key={request}
              className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 shadow-soft"
            >
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-action" />
              <span className="text-foreground">{request}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
