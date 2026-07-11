import { MapPin, Building } from "lucide-react";
import type { AreaData } from "@/data/area-content";

interface Group {
  key: string;
  title: string;
  items: string[];
}

/**
 * Section 9 — Landmarks & Sub-communities We Cover (Optional).
 * Renders whichever of sub-communities / landmarks / notable buildings exist.
 */
export function AreaLandmarks({ area }: { area: AreaData }) {
  const groups: Group[] = [
    { key: "sub", title: "Sub-communities", items: area.subCommunities ?? [] },
    { key: "landmarks", title: "Nearby Landmarks", items: area.landmarks ?? [] },
    { key: "buildings", title: "Notable Buildings", items: area.notableBuildings ?? [] },
  ].filter((g) => g.items.length > 0);

  if (groups.length === 0) return null;

  return (
    <section className="container-prose py-20">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-action">Coverage</p>
        <h2 className="mt-3 text-3xl font-bold md:text-4xl">
          Landmarks & Sub-communities We Cover in {area.name}
        </h2>
      </div>
      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {groups.map((group) => (
          <div key={group.key}>
            <h3 className="flex items-center gap-2 font-display text-lg font-semibold">
              {group.key === "buildings" ? (
                <Building className="h-5 w-5 text-action" />
              ) : (
                <MapPin className="h-5 w-5 text-action" />
              )}
              {group.title}
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="rounded-lg border border-border bg-card px-3 py-1.5 text-sm text-foreground"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
