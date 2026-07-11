import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Camera, CheckCircle2, Clock, Leaf, MapPinned, MessageCircle, ShieldCheck, Sofa, Truck, Users, Wallet, Zap } from "lucide-react";
import { AreaGrid } from "@/components/site/AreaGrid";
import { Cta } from "@/components/site/Cta";
import { CtaBanner } from "@/components/site/CtaBanner";
import { HowItWorks } from "@/components/site/HowItWorks";
import { PageHero } from "@/components/site/PageHero";
import { ServiceCard } from "@/components/site/ServiceCard";
import { TrustBar } from "@/components/site/TrustBar";
import { services } from "@/data/services";
import { absoluteUrl } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Junk Removal Dubai | Same-Day Junk Pickup & Clearance",
  description:
    "Junk removal Dubai service for furniture removal, appliance removal, rubbish removal, waste collection and house clearance. Same-day pickup may be available.",
  alternates: { canonical: absoluteUrl("/") },
  openGraph: {
    title: "Junk Removal Dubai | Same-Day Junk Pickup & Clearance",
    description: "Junk removal Dubai service for furniture, appliances, rubbish, waste and house clearance across the city.",
    url: absoluteUrl("/"),
  },
};

const whyUs = [
  { icon: Zap, t: "Same-Day Junk Pickup", d: "Same day junk removal Dubai slots are available when scheduling, truck capacity and building access allow." },
  { icon: Wallet, t: "Clear Pickup Details", d: "Photos help us confirm scope and give practical options for cheap junk removal Dubai requests without surprise add-ons." },
  { icon: ShieldCheck, t: "Licensed & Insured", d: "A careful junk removal company Dubai residents can book for homes, villas and apartment buildings." },
  { icon: Leaf, t: "Responsible Disposal", d: "Usable, recyclable and disposal items are sorted for responsible waste removal Dubai support where suitable." },
  { icon: Users, t: "Respectful Crew", d: "A practical team focused on clear communication and careful handling." },
  { icon: MapPinned, t: "Dubai-Wide Coverage", d: "From Dubai Marina to Mirdif, Jebel Ali to Deira." },
];

const stats = [
  { v: "Photo", l: "WhatsApp Details" },
  { v: "Dubai", l: "Wide Pickup" },
  { v: "Same Day", l: "When Available" },
  { v: "Safe", l: "Disposal Support" },
];

const heroTrust = [
  { icon: MessageCircle, label: "Fast WhatsApp response" },
  { icon: Camera, label: "Send pickup photos" },
  { icon: Clock, label: "Same-day junk pickup" },
  { icon: Truck, label: "Dubai-wide junk collection" },
];

const proofItems = [
  { icon: Clock, title: "Same-Day Pickup Available", body: "When slots are open, we can collect furniture, appliances and general junk on the same day." },
  { icon: ShieldCheck, title: "Licensed & Insured Crew", body: "A careful junk removal service Dubai customers can use for apartments, villas and building access requirements." },
  { icon: MapPinned, title: "Dubai-Wide Service", body: "Local pickup support for searches like junk removal near me, from high-rise towers to villa neighborhoods." },
  { icon: Camera, title: "WhatsApp Pickup Details", body: "Send photos of the junk so the team can check volume, access and disposal needs quickly." },
  { icon: Leaf, title: "Safe Disposal Support", body: "Items are handled with donation, recycling and responsible garbage removal Dubai practices where suitable." },
  { icon: Sofa, title: "All Common Junk Types", body: "Furniture removal Dubai, appliance removal Dubai, villa clearance, debris and general junk removal." },
];

const guarantees = [
  "Clear communication before the pickup is confirmed",
  "Careful handling around floors, lifts, walls and common areas",
  "No hidden surprise after the pickup details are confirmed",
  "Respectful team for homes, villas and apartments",
  "Same-day support when scheduling and access allow",
];

const customerExperience = [
  { title: "Clear WhatsApp Communication", text: "Send photos, pickup area and access details so the team can respond with the right next step for junk pickup Dubai jobs." },
  { title: "Careful Pickup Handling", text: "The crew plans for lifts, stairs, loading areas and bulky items before arriving at the property." },
  { title: "Dubai Area Coordination", text: "Pickup timing can be planned around apartment towers, villa communities and building rules across Dubai." },
];

export default function Home() {
  return (
    <>
      <PageHero
        eyebrow="Dubai - Same-Day Pickup"
        title="Fast Junk Removal Dubai - Same-Day Pickup Anywhere in the City"
        sub="From a single sofa to full house clearance Dubai jobs, our licensed and insured team handles junk pickup Dubai customers can book quickly for furniture, appliances, rubbish, debris and clutter. Book in 60 seconds on WhatsApp."
      >
        <Cta variant="wa" size="lg" />
        <Cta variant="call" size="lg" />
        <div className="flex w-full flex-wrap gap-2 pt-2">
          {heroTrust.map((item) => (
            <span key={item.label} className="inline-flex items-center gap-1.5 rounded-full border border-primary-foreground/15 bg-primary-foreground/10 px-3 py-1.5 text-xs font-semibold text-primary-foreground/90">
              <item.icon className="h-3.5 w-3.5 text-action" />
              {item.label}
            </span>
          ))}
        </div>
      </PageHero>

      <TrustBar />

      <section className="container-prose py-20">
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_2fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-action">Trust & Proof</p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">A Practical Junk Removal Company Dubai Customers Can Book With Confidence</h2>
            <p className="mt-4 text-muted-foreground">
              Send photos on WhatsApp, confirm the pickup details, and get support for furniture, appliance, villa and general rubbish removal Dubai needs.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/services" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-action">
                View services <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/areas" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-action">
                Check areas <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-action">
                Request pickup <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {proofItems.map((item) => (
              <div key={item.title} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                <item.icon className="h-7 w-7 text-action" strokeWidth={1.8} />
                <h3 className="mt-4 font-display text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-prose py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-action">What We Do</p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">Every Type of Junk Removal in Dubai - Handled in One Visit</h2>
          <p className="mt-4 text-muted-foreground">
            Whether you&apos;re upgrading your apartment in Dubai Marina, booking garden waste removal Dubai support after landscaping, or finishing a villa renovation in Arabian Ranches, our crew arrives with the right truck, tools and team.
          </p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((s) => <ServiceCard key={s.slug} service={s} />)}
        </div>
        <div className="mt-10 flex justify-center"><Cta variant="schedule" size="lg" /></div>
      </section>

      <HowItWorks />

      <section className="bg-surface py-20">
        <div className="container-prose">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-action">Pricing Guidance</p>
              <h2 className="mt-3 text-3xl font-bold md:text-4xl">Send Photos to Check Pickup Details and Pricing</h2>
              <p className="mt-4 text-muted-foreground">
                Final pricing depends on item volume, building or villa access, pickup area, crew time and disposal type. Send photos on WhatsApp so the team can review the job and suggest the best junk removal Dubai option before confirming.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Cta variant="wa" size="lg" />
                <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-background px-6 py-3.5 text-base font-semibold text-foreground shadow-soft hover:bg-muted">
                  Schedule Online <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <h3 className="font-display text-xl font-semibold">What Affects Pickup Pricing?</h3>
              <ul className="mt-5 space-y-3">
                {["Item volume and weight", "Lift, stairs, parking and loading access", "Pickup area and timing", "Furniture dismantling or heavy lifting", "Waste collection Dubai, recycling or donation handling"].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-foreground">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-action" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm text-muted-foreground">We avoid pricing blindly. Confirmed details help prevent surprise changes after arrival.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface py-20">
        <div className="container-prose">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-action">Why Choose Us</p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">A Clear, Careful Junk Removal Team for Dubai</h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {whyUs.map((w) => (
              <div key={w.t} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                <w.icon className="h-8 w-8 text-action" strokeWidth={1.8} />
                <h3 className="mt-4 font-display text-lg font-semibold">{w.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{w.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-prose py-20">
        <div className="grid items-start gap-10 md:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-action">Service Promise</p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">Clear Communication, Careful Handling, No Surprise After Confirmation</h2>
            <p className="mt-4 text-muted-foreground">
              Junk collection Dubai jobs often involve lifts, parking, building security and heavy items. We confirm the important details first so pickup day is straightforward.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/services" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-action">
                Explore services <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-action">
                Contact for Pickup <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <ul className="grid gap-3">
            {guarantees.map((item) => (
              <li key={item} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 shadow-soft">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-action" />
                <span className="text-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-prose py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-action">Citywide Coverage</p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">Junk Removal Across Every Corner of Dubai</h2>
          <p className="mt-4 text-muted-foreground">High-rise apartments, waterfront villas, business towers, family communities - choose your area for local waste removal Dubai support.</p>
        </div>
        <div className="mt-10"><AreaGrid limit={16} /></div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/areas" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-action">
            View all Dubai areas <ArrowRight className="h-4 w-4" />
          </Link>
          <span className="text-muted-foreground">-</span>
          <Cta variant="schedule" />
        </div>
      </section>

      <section className="bg-surface py-20">
        <div className="container-prose">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-action">Customers</p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">What Customers Can Expect</h2>
            <p className="mt-4 text-muted-foreground">
              Real customer reviews can be added here after they are collected and approved. Until then, this section explains how our rubbish removal Dubai process works without making review claims.
            </p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {customerExperience.map((item) => (
              <div key={item.title} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                <CheckCircle2 className="h-6 w-6 text-action" />
                <h3 className="mt-4 font-display text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-prose py-20">
        <div className="grid gap-6 rounded-3xl bg-gradient-brand p-10 text-primary-foreground md:grid-cols-4 md:p-14">
          {stats.map((s) => (
            <div key={s.l} className="text-center">
              <div className="font-display text-4xl font-bold md:text-5xl">{s.v}</div>
              <div className="mt-2 text-sm uppercase tracking-wider text-primary-foreground/70">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      <CtaBanner
        heading="Ready for Same Day Junk Removal Dubai Support?"
        sub="Message us on WhatsApp with a photo of your junk so we can check pickup details, availability and the right collection option."
      />
    </>
  );
}
