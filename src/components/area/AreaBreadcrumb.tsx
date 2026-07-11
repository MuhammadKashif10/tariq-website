import Link from "next/link";
import type { AreaData } from "@/data/area-content";

/** Section 1 — Breadcrumb (Required). */
export function AreaBreadcrumb({ area }: { area: AreaData }) {
  return (
    <nav aria-label="Breadcrumb" className="container-prose pt-6 text-sm text-muted-foreground">
      <Link href="/" className="hover:text-primary">
        Home
      </Link>
      <span className="mx-2" aria-hidden="true">
        /
      </span>
      <Link href="/areas" className="hover:text-primary">
        Service Areas
      </Link>
      <span className="mx-2" aria-hidden="true">
        /
      </span>
      <span className="text-foreground">{area.name}</span>
    </nav>
  );
}
