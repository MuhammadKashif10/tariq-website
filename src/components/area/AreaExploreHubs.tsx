import Link from "next/link";
import { ArrowRight } from "lucide-react";

/** Section 17 — Explore All Services / All Areas (Required, identical). */
export function AreaExploreHubs() {
  return (
    <section className="container-prose py-12">
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-center">
        <Link
          href="/services"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-action"
        >
          Explore all junk removal services <ArrowRight className="h-4 w-4" />
        </Link>
        <span className="text-muted-foreground" aria-hidden="true">
          |
        </span>
        <Link
          href="/areas"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-action"
        >
          View all Dubai service areas <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
