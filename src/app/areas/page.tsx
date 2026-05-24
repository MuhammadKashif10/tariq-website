import type { Metadata } from "next";
import { Clock, Recycle, Truck, Users } from "lucide-react";
import { AreaGrid } from "@/components/site/AreaGrid";
import { Cta } from "@/components/site/Cta";
import { CtaBanner } from "@/components/site/CtaBanner";
import { PageHero } from "@/components/site/PageHero";
import { absoluteUrl } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Junk Removal Service Areas in Dubai | All 40+ Communities",
  description:
    "We provide junk removal across Dubai areas - Marina, Downtown, JBR, Palm, Arabian Ranches, Mirdif and more. Same-day pickups may be available.",
  alternates: { canonical: absoluteUrl("/areas") },
  openGraph: {
    title: "Junk Removal Service Areas in Dubai",
    description: "All 40+ Dubai communities covered.",
    url: absoluteUrl("/areas"),
  },
};

const points = [
  { icon: Truck, t: "Fleet Across the City", d: "Vans and trucks stationed across Dubai." },
  { icon: Users, t: "Local Crews", d: "Teams who know building rules and access routes." },
  { icon: Clock, t: "Same-Day Slots", d: "Available across most communities every day." },
  { icon: Recycle, t: "Licensed Disposal", d: "Partners across Dubai for eco-friendly handling." },
];

export default function AreasPage() {
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

      <CtaBanner heading="Can't See Your Area? Message Us - We Almost Certainly Cover It." />
    </>
  );
}
