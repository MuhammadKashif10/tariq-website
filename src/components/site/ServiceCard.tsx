import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/data/services";

export function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon;
  return (
    <Link
      to="/services/$slug"
      params={{ slug: service.slug }}
      className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-soft transition hover:-translate-y-1 hover:border-action hover:shadow-elevated"
    >
      <span className="grid h-12 w-12 place-items-center rounded-xl bg-secondary text-primary transition group-hover:bg-action group-hover:text-action-foreground">
        <Icon className="h-6 w-6" strokeWidth={1.8} />
      </span>
      <h3 className="mt-5 font-display text-lg font-semibold">{service.name}</h3>
      <p className="mt-2 flex-1 text-sm text-muted-foreground">{service.tagline}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:text-action">
        Learn More <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}
