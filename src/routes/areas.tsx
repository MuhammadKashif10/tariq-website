import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { AreaGrid } from "@/components/site/AreaGrid";
import { CtaBanner } from "@/components/site/CtaBanner";
import { Cta } from "@/components/site/Cta";
import { absoluteUrl } from "@/lib/site-config";
import { Truck, Users, Clock, Recycle } from "lucide-react";

export const Route = createFileRoute("/areas")({
  head: () => ({
    meta: [
      { title: "Junk Removal Service Areas in Dubai | All 40+ Communities" },
      { name: "description", content: "We provide junk removal across every Dubai area — Marina, Downtown, JBR, Palm, Arabian Ranches, Mirdif and more. Same-day pickups citywide." },
      { property: "og:title", content: "Junk Removal Service Areas in Dubai" },
      { property: "og:description", content: "All 40+ Dubai communities covered." },
      { property: "og:url", content: absoluteUrl("/areas") },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/areas") }],
  }),
  component: Areas,
});

const points = [
  { icon: Truck, t: "Fleet Across the City", d: "Vans and trucks stationed across Dubai." },
  { icon: Users, t: "Local Crews", d: "Teams who know building rules and access routes." },
  { icon: Clock, t: "Same-Day Slots", d: "Available across most communities every day." },
  { icon: Recycle, t: "Licensed Disposal", d: "Partners across Dubai for eco-friendly handling." },
];

function Areas() {
  return (
    <>
      <PageHero
        eyebrow="Service Areas"
        title="Junk Removal in Every Corner of Dubai"
        sub="From waterfront towers to desert villa communities, our licensed crew covers all 40+ Dubai areas. Find your neighbourhood below."
      >
        <Cta variant="wa" size="lg" />
        <Cta variant="schedule" size="lg" />
      </PageHero>

      <section className="container-prose py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-action">All Areas</p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">Pick Your Dubai Area</h2>
        </div>
        <div className="mt-10"><AreaGrid /></div>
      </section>

      <section className="bg-surface py-20">
        <div className="container-prose">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">One Team, Every Community</h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {points.map((p) => (
              <div key={p.t} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                <p.icon className="h-8 w-8 text-action" strokeWidth={1.8} />
                <h3 className="mt-4 font-display text-lg font-semibold">{p.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner heading="Can't See Your Area? Message Us — We Almost Certainly Cover It." />
    </>
  );
}
