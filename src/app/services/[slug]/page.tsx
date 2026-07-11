import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CalendarCheck,
  CheckCircle2,
  ClipboardCheck,
  HelpCircle,
  MessageSquare,
  Recycle,
  Truck,
  Wallet,
} from "lucide-react";
import { AreaGrid } from "@/components/site/AreaGrid";
import { Cta } from "@/components/site/Cta";
import { CtaBanner } from "@/components/site/CtaBanner";
import { PageHero } from "@/components/site/PageHero";
import { ServiceCard } from "@/components/site/ServiceCard";
import { getService, services, type Service } from "@/data/services";
import { absoluteUrl } from "@/lib/site-config";
import { LOCALBUSINESS_ID, breadcrumbListSchema } from "@/lib/schema/global";

type Props = { params: Promise<{ slug: string }> };

const steps = [
  { icon: MessageSquare, t: "Book via WhatsApp", d: "Send a photo and your area." },
  {
    icon: CalendarCheck,
    t: "Slot Confirmed",
    d: "We confirm timing and crew size after reviewing the pickup details.",
  },
  {
    icon: Truck,
    t: "Pickup Day",
    d: "Uniformed crew arrives, protects your space, loads everything.",
  },
  {
    icon: Recycle,
    t: "Eco Disposal",
    d: "Donated, recycled or routed to licensed Dubai facilities.",
  },
];

const pricingFactors = [
  "Item volume, weight and number of pieces",
  "Lift, stairs, parking and loading access",
  "Dismantling, heavy lifting or extra crew time",
  "Pickup area, preferred timing and disposal type",
];

const preparationSteps = [
  "Send clear photos or a short video on WhatsApp",
  "Confirm your Dubai area, building name and pickup access",
  "Separate anything that should not be removed",
  "Tell us about lift bookings, loading bays or security requirements",
];

function getServiceFaqs(service: Service) {
  return [
    {
      q: `What does ${service.name} in Dubai include?`,
      a: `${service.name} includes pickup planning, careful removal, loading and suitable disposal support for approved items related to ${service.primaryKeyword}.`,
    },
    {
      q: `How is ${service.name} pricing worked out?`,
      a: "Pricing depends on item volume, access, crew time, pickup area and disposal requirements. Photos help the team confirm pickup details before arrival.",
    },
    {
      q: `Can you provide same-day ${service.shortName.toLowerCase()} pickup?`,
      a: "Same-day pickup may be available when crew scheduling, truck capacity and building access allow. WhatsApp is the fastest way to check availability.",
    },
    {
      q: `What should I prepare before ${service.name.toLowerCase()}?`,
      a: "Please share photos, confirm the pickup location and remove personal items from anything being collected. Let us know about stairs, lift bookings or loading restrictions.",
    },
  ];
}

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "Service Not Found" };
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical: absoluteUrl(`/services/${service.slug}`) },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: absoluteUrl(`/services/${service.slug}`),
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const Icon = service.icon;
  const related = services.filter((s) => s.slug !== service.slug).slice(0, 3);
  const serviceFaqs = getServiceFaqs(service);
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.name,
    provider: { "@id": LOCALBUSINESS_ID },
    areaServed: { "@type": "City", name: "Dubai" },
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: serviceFaqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  // Mirrors the visible breadcrumb: Home / Services / {service.name}.
  const breadcrumbSchema = breadcrumbListSchema([
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: service.name, path: `/services/${service.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <nav className="container-prose pt-6 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/services" className="hover:text-primary">
          Services
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{service.name}</span>
      </nav>

      <PageHero
        eyebrow={service.shortName + " - Dubai"}
        title={`${service.name} in Dubai - Fast, Clean Pickup Support`}
        sub={service.intro}
      >
        <Cta variant="wa" size="lg" whatsappContext={`Service: ${service.name}`} />
        <Cta variant="call" size="lg" />
      </PageHero>

      <section className="container-prose py-20">
        <div className="grid items-start gap-12 md:grid-cols-[1fr_2fr]">
          <div>
            <span className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-brand text-primary-foreground shadow-elevated">
              <Icon className="h-8 w-8" strokeWidth={1.7} />
            </span>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-action">
              About this service
            </p>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">
              What Is {service.name} in Dubai?
            </h2>
          </div>
          <div className="space-y-5 text-muted-foreground">
            {service.longIntro.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="container-prose py-20">
        <div className="grid gap-10 lg:grid-cols-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-action">
              Service Details
            </p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              What This {service.shortName} Service Includes
            </h2>
            <p className="mt-4 text-muted-foreground">
              This {service.primaryKeyword} service is planned around the items, access route and
              disposal needs before pickup is confirmed.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2">
            {[
              "WhatsApp photo review before scheduling",
              "Pickup planning for apartment, villa or office access",
              "Careful lifting, loading and removal from the property",
              "Support for responsible sorting, recycling or disposal where suitable",
            ].map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 shadow-soft"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-action" />
                <span className="text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface py-20">
        <div className="container-prose">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">What We Take Away</h2>
          </div>
          <ul className="mx-auto mt-10 grid max-w-4xl gap-3 sm:grid-cols-2">
            {service.handles.map((h) => (
              <li
                key={h}
                className="flex items-start gap-3 rounded-xl border border-border bg-card p-4"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-action" />
                <span className="text-foreground">{h}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-prose py-20">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <Wallet className="h-8 w-8 text-action" strokeWidth={1.8} />
            <h2 className="mt-4 font-display text-2xl font-bold">
              How Pickup Pricing Is Worked Out
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Pricing for {service.name.toLowerCase()} depends on the actual job details. Photos
              help the team check the load and access before confirming.
            </p>
            <ul className="mt-5 space-y-3">
              {pricingFactors.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-foreground">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-action" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <ClipboardCheck className="h-8 w-8 text-action" strokeWidth={1.8} />
            <h2 className="mt-4 font-display text-2xl font-bold">Before Pickup, Please Prepare</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              A few details make junk pickup Dubai appointments smoother, especially in towers,
              gated communities and offices.
            </p>
            <ul className="mt-5 space-y-3">
              {preparationSteps.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-foreground">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-action" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="container-prose py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold md:text-4xl">How {service.name} Works</h2>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <div
              key={s.t}
              className="relative rounded-2xl border border-border bg-card p-6 shadow-soft"
            >
              <span className="absolute -top-3 left-6 inline-flex h-6 items-center rounded-full bg-action px-2.5 text-xs font-bold text-action-foreground">
                Step {i + 1}
              </span>
              <s.icon className="h-8 w-8 text-primary" strokeWidth={1.7} />
              <h3 className="mt-4 font-display text-lg font-semibold">{s.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-surface py-20">
        <div className="container-prose">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">
              Why Dubai Residents Choose Us for {service.shortName}
            </h2>
          </div>
          <ul className="mx-auto mt-10 grid max-w-3xl gap-3">
            {service.whyUs.map((w) => (
              <li
                key={w}
                className="flex items-start gap-3 rounded-xl border border-border bg-card p-4"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-action" />
                <span className="text-foreground">{w}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-prose py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-action">Coverage</p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">
            {service.name} Across Every Dubai Community
          </h2>
          <p className="mt-4 text-muted-foreground">
            Explore our{" "}
            <Link href="/areas" className="font-semibold text-primary hover:text-action">
              Dubai service areas
            </Link>{" "}
            to check pickup coverage for your community.
          </p>
        </div>
        <div className="mt-10">
          <AreaGrid />
        </div>
      </section>

      <section className="container-prose py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-action">
            Service FAQ
          </p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">
            Questions About {service.name} in Dubai
          </h2>
        </div>
        <div className="mx-auto mt-10 grid max-w-4xl gap-4">
          {serviceFaqs.map((faq) => (
            <div key={faq.q} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <div className="flex items-start gap-3">
                <HelpCircle className="mt-0.5 h-5 w-5 shrink-0 text-action" />
                <div>
                  <h3 className="font-display text-lg font-semibold">{faq.q}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{faq.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-surface py-20">
        <div className="container-prose">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">Related Services</h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {related.map((r) => (
              <ServiceCard key={r.slug} service={r} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/services" className="text-sm font-semibold text-primary hover:text-action">
              View all services →
            </Link>
            <span className="mx-3 text-muted-foreground">|</span>
            <Link href="/areas" className="text-sm font-semibold text-primary hover:text-action">
              View Dubai service areas →
            </Link>
          </div>
        </div>
      </section>

      <CtaBanner heading={`Need ${service.shortName} in Dubai Today? Let's Schedule It.`} />
    </>
  );
}
