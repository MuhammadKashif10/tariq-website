import { Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { areas } from "@/data/areas";

export function AreaGrid({ limit }: { limit?: number }) {
  const list = limit ? areas.slice(0, limit) : areas;
  return (
    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4">
      {list.map((a) => (
        <Link
          key={a.slug}
          to="/areas/$slug"
          params={{ slug: a.slug }}
          className="group flex items-center gap-2 rounded-lg border border-border bg-card px-3.5 py-3 text-sm font-medium text-foreground transition hover:border-action hover:bg-action/10"
        >
          <MapPin className="h-3.5 w-3.5 text-action" />
          <span className="truncate">{a.name}</span>
        </Link>
      ))}
    </div>
  );
}
