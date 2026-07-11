import Link from "next/link";
import { MapPin } from "lucide-react";
import type { AreaData } from "@/data/area-content";
import { resolveNearbyAreas } from "@/lib/area/links";

/**
 * Section 16 — Nearby Areas We Also Serve (Required).
 * Driven by the curated `nearbyAreas` field — never by array order.
 */
export function AreaNearbyAreas({ area }: { area: AreaData }) {
  const nearby = resolveNearbyAreas(area.nearbyAreas);

  return (
    <section className="bg-surface py-20">
      <div className="container-prose">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold md:text-4xl">We Also Serve Nearby Communities</h2>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {nearby.map((item) => (
            <Link
              key={item.slug}
              href={item.href}
              className="group flex items-center gap-2 rounded-lg border border-border bg-card px-3.5 py-3 text-sm font-medium hover:border-action"
            >
              <MapPin className="h-3.5 w-3.5 text-action" />
              <span className="truncate">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
