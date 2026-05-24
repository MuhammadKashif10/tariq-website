import type { Metadata } from "next";
import { ShieldCheck, Zap, Wallet, Leaf } from "lucide-react";
import { Cta } from "@/components/site/Cta";
import { CtaBanner } from "@/components/site/CtaBanner";
import { HowItWorks } from "@/components/site/HowItWorks";
import { PageHero } from "@/components/site/PageHero";
import { ServiceCard } from "@/components/site/ServiceCard";
import { TrustBar } from "@/components/site/TrustBar";
import { services } from "@/data/services";
import { absoluteUrl } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Junk Removal Services Dubai | Furniture, Appliances & Clearance",
  description:
    "Full list of junk removal services in Dubai - furniture, appliances, mattresses, office and villa clearance, debris and e-waste. Same-day pickup may be available.",
  alternates: { canonical: absoluteUrl("/services") },
  openGraph: {
    title: "Junk Removal Services Dubai",
    description: "Furniture, appliances, mattresses, clearances, debris, e-waste - handled across Dubai.",
    url: absoluteUrl("/services"),
  },
};

const why = [
  { icon: ShieldCheck, t: "Licensed & Insured", d: "Operating legally in Dubai with full insurance." },
  { icon: Zap, t: "Same-Day Available", d: "Slots open daily across most Dubai areas." },
  { icon: Wallet, t: "Transparent Pricing", d: "Confirmed upfront before any work starts." },
  { icon: Leaf, t: "Eco-First Disposal", d: "Donate, recycle, dispose responsibly." },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Complete Junk Removal Services in Dubai - One Team, Everything Hauled"
        sub="Pick your service below or message us on WhatsApp and we'll handle the rest."
      >
        <Cta variant="wa" size="lg" />
        <Cta variant="schedule" size="lg" />
      </PageHero>

      <TrustBar />

      <section className="container-prose py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-action">All Services</p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">What We Remove Across Dubai</h2>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((s) => <ServiceCard key={s.slug} service={s} />)}
        </div>
      </section>

      <HowItWorks />

      <section className="bg-surface py-20">
        <div className="container-prose">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">Why Choose Us</h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {why.map((w) => (
              <div key={w.t} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                <w.icon className="h-8 w-8 text-action" strokeWidth={1.8} />
                <h3 className="mt-4 font-display text-lg font-semibold">{w.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{w.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner heading="Not Sure Which Service You Need? Just Send a Photo." />
    </>
  );
}
