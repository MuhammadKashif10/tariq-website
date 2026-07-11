import { CalendarClock } from "lucide-react";
import type { AreaData } from "@/data/area-content";

/** Section 12 — Seasonal / Turnover Notes (Optional). Renders only when data exists. */
export function AreaSeasonalNotes({ area }: { area: AreaData }) {
  if (!area.seasonalNotes?.length) return null;

  return (
    <section className="bg-surface py-20">
      <div className="container-prose">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-action">Timing</p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">
            Seasonal & Turnover Patterns in {area.name}
          </h2>
        </div>
        <ul className="mx-auto mt-10 grid max-w-3xl gap-3">
          {area.seasonalNotes.map((note) => (
            <li
              key={note}
              className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 shadow-soft"
            >
              <CalendarClock className="mt-0.5 h-5 w-5 shrink-0 text-action" />
              <span className="text-foreground">{note}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
