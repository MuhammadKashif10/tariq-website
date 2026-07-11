import { Building2 } from "lucide-react";
import type { AreaData } from "@/data/area-content";

/**
 * Section 8 — Property Types We Serve Here (Optional).
 * Only the property types genuinely present in the area are rendered.
 */
export function AreaPropertyTypes({ area }: { area: AreaData }) {
  if (!area.propertyTypes?.length) return null;

  return (
    <section className="bg-surface py-20">
      <div className="container-prose">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-action">
            Property Types
          </p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">
            Properties We Serve in {area.name}
          </h2>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {area.propertyTypes.map((property) => (
            <div
              key={property.type}
              className="rounded-2xl border border-border bg-card p-6 shadow-soft"
            >
              <Building2 className="h-8 w-8 text-action" strokeWidth={1.8} />
              <h3 className="mt-4 font-display text-lg font-semibold">{property.type}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{property.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
