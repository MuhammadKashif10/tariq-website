import { ClipboardList } from "lucide-react";
import type { AreaData } from "@/data/area-content";

/**
 * Section 11 — Local Access & Preparation Notes (Optional).
 * Only verifiable / generally-applicable notes are stored; renders when present.
 */
export function AreaAccessNotes({ area }: { area: AreaData }) {
  if (!area.accessNotes?.length) return null;

  return (
    <section className="container-prose py-20">
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-action">
            Before Pickup
          </p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">
            Access & Preparation Notes for {area.name}
          </h2>
          <p className="mt-4 text-muted-foreground">
            A few practical details help pickups in {area.name} run smoothly, especially around
            building or community access.
          </p>
        </div>
        <ul className="grid gap-3">
          {area.accessNotes.map((note) => (
            <li
              key={note}
              className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 shadow-soft"
            >
              <ClipboardList className="mt-0.5 h-5 w-5 shrink-0 text-action" />
              <span className="text-foreground">{note}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
