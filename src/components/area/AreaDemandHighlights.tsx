import { CheckCircle2 } from "lucide-react";
import type { AreaData } from "@/data/area-content";

/**
 * Section 5 — "Why This Area Needs Professional Junk Removal" (Required, unique).
 * The core anti-doorway section: explains why demand differs in this community.
 */
export function AreaDemandHighlights({ area }: { area: AreaData }) {
  return (
    <section className="bg-surface py-20">
      <div className="container-prose">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-action">
            Local Demand
          </p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">
            Why {area.name} Needs Professional Junk Removal
          </h2>
        </div>
        <div className="mx-auto mt-6 max-w-3xl space-y-5 text-center text-muted-foreground">
          {area.demandNarrative.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <ul className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2">
          {area.demandDrivers.map((driver) => (
            <li
              key={driver}
              className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5 shadow-soft"
            >
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-action" />
              <span className="text-foreground">{driver}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
