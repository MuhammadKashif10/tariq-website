import { ServiceCard } from "@/components/site/ServiceCard";
import type { AreaData } from "@/data/area-content";
import { orderServices } from "@/lib/area/services";

/** Section 6 — Services Available in {Area} (Required). Respects topServices order. */
export function AreaServices({ area }: { area: AreaData }) {
  const ordered = orderServices(area.topServices);
  return (
    <section className="container-prose py-20">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-action">Services</p>
        <h2 className="mt-3 text-3xl font-bold md:text-4xl">
          Every Junk Removal Service Available in {area.name}
        </h2>
      </div>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {ordered.map((service) => (
          <ServiceCard key={service.slug} service={service} />
        ))}
      </div>
    </section>
  );
}
