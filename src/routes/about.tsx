import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Cta } from "@/components/site/Cta";
import { CtaBanner } from "@/components/site/CtaBanner";
import { absoluteUrl, site } from "@/lib/site-config";
import { Heart, Handshake, Leaf, Wallet, CheckCircle2, User } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us | Dubai's Trusted Junk Removal Company" },
      { name: "description", content: "Meet the licensed, insured Dubai junk removal team clearing homes, offices and villas across the city with same-day pickups and eco-friendly disposal." },
      { property: "og:title", content: "About Us | Dubai's Trusted Junk Removal Company" },
      { property: "og:description", content: "Licensed, insured, eco-friendly Dubai junk removal team." },
      { property: "og:url", content: absoluteUrl("/about") },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/about") }],
  }),
  component: About,
});

const values = [
  { icon: CheckCircle2, t: "Reliability", d: "Confirmed slots, on-time arrivals, no ghosting." },
  { icon: Heart, t: "Respect", d: "We protect your floors, walls and neighbours." },
  { icon: Leaf, t: "Responsibility", d: "We donate, recycle and dispose through licensed Dubai facilities." },
  { icon: Wallet, t: "Affordability", d: "Honest, upfront pricing with no hidden fees." },
];

const diff = [
  "Fully licensed and insured under UAE regulations",
  "Same-day pickups available across all 40+ Dubai areas",
  "Responsible disposal support with recycling and donation considered where suitable",
  "Respectful, practical crew for homes, offices and villas",
  "WhatsApp-first booking with direct team communication",
];

function About() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={`The ${site.name} Team That Shows Up - On Time, Every Time`}
        sub="We're a local, licensed crew built for one job: making your unwanted stuff disappear quickly, cleanly and responsibly."
      >
        <Cta variant="wa" size="lg" />
        <Cta variant="call" size="lg" />
      </PageHero>

      <section className="container-prose py-20">
        <div className="grid items-start gap-12 md:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-action">Our Story</p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">Built in Dubai, for Dubai</h2>
          </div>
          <div className="space-y-5 text-muted-foreground">
            <p>We started after one too many residents told us the same story: an old sofa stuck on the balcony, a fridge nobody would haul, a villa half-cleared with no one to finish the job.</p>
            <p>We built a service the city actually needed — fast bookings on WhatsApp, fair pricing, real insurance, and a team that treats your home like it's their own. Today we operate across every major community in Dubai, from Marina towers to Arabian Ranches villas.</p>
          </div>
        </div>
      </section>

      <section className="bg-surface py-20">
        <div className="container-prose">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-action">Mission & Values</p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">What We Stand For</h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.t} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                <v.icon className="h-8 w-8 text-action" strokeWidth={1.8} />
                <h3 className="mt-4 font-display text-lg font-semibold">{v.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-prose py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-action">Why We're Different</p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">Five Reasons Dubai Chooses Us</h2>
        </div>
        <ul className="mx-auto mt-10 grid max-w-3xl gap-3">
          {diff.map((d) => (
            <li key={d} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 shadow-soft">
              <Handshake className="mt-0.5 h-5 w-5 shrink-0 text-action" />
              <span className="text-foreground">{d}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-surface py-20">
        <div className="container-prose">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-action">Our Team</p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">The People Behind the Pickup</h2>
            <p className="mt-4 text-muted-foreground">A practical team trained for furniture, appliance, office, villa and general junk removal requests across Dubai.</p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {["Operations Lead", "Crew Supervisor", "Customer Care", "Disposal Coordinator"].map((role) => (
              <div key={role} className="rounded-2xl border border-border bg-card p-6 text-center shadow-soft">
                <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-gradient-brand text-primary-foreground">
                  <User className="h-9 w-9" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold">Team Member</h3>
                <p className="text-sm text-muted-foreground">{role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner heading="Want to See Our Team in Action? Let's Schedule Your Pickup." />
    </>
  );
}
