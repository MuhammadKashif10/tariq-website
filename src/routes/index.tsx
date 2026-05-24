import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { TrustBar } from "@/components/site/TrustBar";
import { ServiceCard } from "@/components/site/ServiceCard";
import { HowItWorks } from "@/components/site/HowItWorks";
import { AreaGrid } from "@/components/site/AreaGrid";
import { CtaBanner } from "@/components/site/CtaBanner";
import { Cta } from "@/components/site/Cta";
import { services } from "@/data/services";
import { absoluteUrl } from "@/lib/site-config";
import {
  Zap, Wallet, ShieldCheck, Leaf, Users, MapPinned, ArrowRight,
  MessageCircle, Camera, Clock, Truck, CheckCircle2, Sofa,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Junk Removal Dubai | Same-Day Pickup & Clearance Service" },
      { name: "description", content: "Licensed, insured junk removal in Dubai. Furniture, appliances, debris & full clearances — same-day pickup across all Dubai areas. WhatsApp us now." },
      { property: "og:title", content: "Junk Removal Dubai | Same-Day Pickup & Clearance Service" },
      { property: "og:description", content: "Licensed, insured junk removal in Dubai. Same-day pickup across all Dubai areas." },
      { property: "og:url", content: absoluteUrl("/") },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/") }],
  }),
  component: Home,
});

const whyUs = [
  { icon: Zap, t: "Same-Day Pickup", d: "Available when scheduling, truck capacity and building access allow." },
  { icon: Wallet, t: "Clear Pickup Details", d: "Photos help us confirm the scope before pickup details are finalized." },
  { icon: ShieldCheck, t: "Licensed & Insured", d: "A careful crew for homes, offices, villas and apartment buildings." },
  { icon: Leaf, t: "Responsible Disposal", d: "Usable, recyclable and disposal items are sorted where suitable." },
  { icon: Users, t: "Respectful Crew", d: "A practical team focused on clear communication and careful handling." },
  { icon: MapPinned, t: "Dubai-Wide Coverage", d: "From Dubai Marina to Mirdif, Jebel Ali to Deira." },
];

const customerExperience = [
  { title: "Clear WhatsApp Communication", text: "Send photos, pickup area and access details so the team can respond with the right next step." },
  { title: "Careful Pickup Handling", text: "The crew plans for lifts, stairs, loading areas and bulky items before arriving at the property." },
  { title: "Dubai Area Coordination", text: "Pickup timing can be planned around apartment towers, villa communities, offices and building rules." },
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
  { icon: Clock, label: "Same-day slots available" },
  { icon: Truck, label: "Dubai-wide pickup" },
];

const proofItems = [
  { icon: Clock, title: "Same-Day Pickup Available", body: "When slots are open, we can collect furniture, appliances and general junk on the same day." },
  { icon: ShieldCheck, title: "Licensed & Insured Crew", body: "A careful team for apartments, villas, offices and building access requirements." },
  { icon: MapPinned, title: "Dubai-Wide Service", body: "Pickup support across Dubai communities, from high-rise towers to villa neighborhoods." },
  { icon: Camera, title: "WhatsApp Pickup Details", body: "Send photos of the junk so the team can check volume, access and disposal needs quickly." },
  { icon: Leaf, title: "Safe Disposal Support", body: "Items are handled with donation, recycling and responsible disposal in mind where suitable." },
  { icon: Sofa, title: "All Common Junk Types", body: "Furniture, appliances, villa clearance, office clearance, debris and general junk removal." },
];

const guarantees = [
  "Clear communication before the pickup is confirmed",
  "Careful handling around floors, lifts, walls and common areas",
  "No hidden surprise after the pickup details are confirmed",
  "Respectful team for homes, offices, villas and apartments",
  "Same-day support when scheduling and access allow",
];

function Home() {
  return (
    <>
      <PageHero
        eyebrow="Dubai · Same-Day Pickup"
        title="Fast, Reliable Junk Removal in Dubai — Same-Day Pickup, Anywhere in the City"
        sub="From a single sofa to a full villa clearance, our licensed and insured team hauls away furniture, appliances, debris and clutter — and disposes of it responsibly. Book in 60 seconds on WhatsApp."
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

      {/* Trust Proof */}
      <section className="container-prose py-20">
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_2fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-action">Trust & Proof</p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">A Practical Junk Removal Team in Dubai You Can Book With Confidence</h2>
            <p className="mt-4 text-muted-foreground">
              Send photos on WhatsApp, confirm the pickup details, and get support for furniture, appliance, villa, office and general junk removal across Dubai.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/services" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-action">
                View services <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/areas" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-action">
                Check areas <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-action">
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

      {/* Services Overview */}
      <section className="container-prose py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-action">What We Do</p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">Every Type of Junk Removal in Dubai — Handled in One Visit</h2>
          <p className="mt-4 text-muted-foreground">
            Whether you're upgrading your apartment in Dubai Marina, clearing an office in DIFC, or finishing a villa renovation in Arabian Ranches, our crew arrives with the right truck, tools and team.
          </p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((s) => <ServiceCard key={s.slug} service={s} />)}
        </div>
        <div className="mt-10 flex justify-center"><Cta variant="schedule" size="lg" /></div>
      </section>

      <HowItWorks />

      {/* Pricing Guidance */}
      <section className="bg-surface py-20">
        <div className="container-prose">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-action">Pricing Guidance</p>
              <h2 className="mt-3 text-3xl font-bold md:text-4xl">Send Photos to Check Pickup Details and Pricing</h2>
              <p className="mt-4 text-muted-foreground">
                Final pricing depends on item volume, building or villa access, pickup area, crew time and disposal type. Send photos on WhatsApp so the team can review the job before confirming.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Cta variant="wa" size="lg" />
                <Link to="/contact" className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-background px-6 py-3.5 text-base font-semibold text-foreground shadow-soft hover:bg-muted">
                  Schedule Online <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <h3 className="font-display text-xl font-semibold">What Affects Pickup Pricing?</h3>
              <ul className="mt-5 space-y-3">
                {["Item volume and weight", "Lift, stairs, parking and loading access", "Pickup area and timing", "Furniture dismantling or heavy lifting", "Disposal, recycling or donation handling"].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-foreground">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-action" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm text-muted-foreground">
                We avoid quoting blindly. Confirmed details help prevent surprise changes after arrival.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
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

      {/* Service Guarantee */}
      <section className="container-prose py-20">
        <div className="grid items-start gap-10 md:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-action">Service Promise</p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">Clear Communication, Careful Handling, No Surprise After Confirmation</h2>
            <p className="mt-4 text-muted-foreground">
              Junk removal often involves lifts, parking, building security and heavy items. We confirm the important details first so pickup day is straightforward.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/services" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-action">
                Explore services <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-action">
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

      {/* Service Areas Overview */}
      <section className="container-prose py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-action">Citywide Coverage</p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">Junk Removal Across Every Corner of Dubai</h2>
          <p className="mt-4 text-muted-foreground">High-rise apartments, waterfront villas, business towers, family communities — pick your area.</p>
        </div>
        <div className="mt-10"><AreaGrid limit={16} /></div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link to="/areas" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-action">
            View all 40 areas <ArrowRight className="h-4 w-4" />
          </Link>
          <span className="text-muted-foreground">·</span>
          <Cta variant="schedule" />
        </div>
      </section>

      {/* Customer Experience */}
      <section className="bg-surface py-20">
        <div className="container-prose">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-action">Customers</p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">What Customers Can Expect</h2>
            <p className="mt-4 text-muted-foreground">
              Real customer reviews can be added here after they are collected and approved. Until then, this section explains the service experience without making review claims.
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

      {/* Stats */}
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
        heading="Ready to Clear It Out? Let's Make It Disappear Today."
        sub="Message us on WhatsApp with a photo of your junk so we can check pickup details and availability."
      />
    </>
  );
}
