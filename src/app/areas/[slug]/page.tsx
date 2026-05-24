import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BriefcaseBusiness, Building2, CheckCircle2, ClipboardList, Home, MapPin } from "lucide-react";
import { Cta } from "@/components/site/Cta";
import { CtaBanner } from "@/components/site/CtaBanner";
import { PageHero } from "@/components/site/PageHero";
import { ServiceCard } from "@/components/site/ServiceCard";
import { areas, getArea, getNearbyAreas, type Area } from "@/data/areas";
import { services } from "@/data/services";
import { absoluteUrl } from "@/lib/site-config";

type Props = { params: Promise<{ slug: string }> };

const reasons = [
  "Crews familiar with local buildings and access rules",
  "Same-day pickup slots available",
  "Licensed and insured for high-rise and villa work",
  "Floor and lift protection on every job",
  "Eco-friendly disposal at licensed Dubai facilities",
];

function getAreaProfile(area: Area) {
  const text = `${area.name} ${area.blurb} ${area.about}`.toLowerCase();
  const hasOffice = text.includes("office") || text.includes("business") || text.includes("commercial") || text.includes("warehouse") || text.includes("industrial");
  const hasVilla = text.includes("villa") || text.includes("townhouse") || text.includes("community");
  const hasApartment = text.includes("apartment") || text.includes("tower") || text.includes("high-rise") || text.includes("mid-rise") || text.includes("building");

  const propertyNotes = [
    hasApartment ? `${area.name} apartment pickups often need lift timing, loading-bay access and building security coordination.` : `Apartment pickups in and around ${area.name} are planned around access, parking and item size.`,
    hasVilla ? `${area.name} villa and townhouse jobs commonly include garage clearouts, bulky furniture, garden waste and move-out junk.` : `Villa-style pickups near ${area.name} can include furniture, appliances, storeroom items and outdoor clutter.`,
    hasOffice ? `${area.name} office cleanout Dubai requests may involve desks, chairs, cabinets, electronics and after-hours access.` : `Small office and shop pickups in ${area.name} can be arranged when access and timing are confirmed.`,
  ];

  const commonNeeds = [
    `Furniture removal from homes, apartments and offices in ${area.name}`,
    `Appliance and mattress pickup during move-outs or upgrades`,
    `Mixed junk pickup Dubai requests after renovation, relocation or decluttering`,
    hasVilla ? "Villa, garage, garden and storeroom clearance support" : "Balcony, storage room and common household junk removal",
    hasOffice ? "Office furniture, e-waste and cabinet removal" : "Small business and home-office item removal",
  ];

  const accessNotes = [
    "Share photos of the items before pickup is scheduled",
    "Confirm lift, stair, loading bay or parking restrictions",
    "Check whether building or community security needs advance notice",
    "Separate personal items from anything being removed",
  ];

  return { commonNeeds, propertyNotes, accessNotes };
}

export function generateStaticParams() {
  return areas.map((area) => ({ slug: area.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const area = getArea(slug);
  if (!area) return { title: "Area Not Found" };
  return {
    title: `Junk Removal ${area.name} Dubai | Same-Day Pickup & Clearance`,
    description: `Junk removal in ${area.name}, Dubai - furniture, appliances, debris and full clearances. Same-day pickups may be available.`,
    alternates: { canonical: absoluteUrl(`/areas/${area.slug}`) },
    openGraph: {
      title: `Junk Removal in ${area.name}, Dubai`,
      description: `Same-day junk removal may be available across ${area.name}.`,
      url: absoluteUrl(`/areas/${area.slug}`),
    },
  };
}

export default async function AreaDetailPage({ params }: Props) {
  const { slug } = await params;
  const area = getArea(slug);
  if (!area) notFound();
  const nearby = getNearbyAreas(area.slug, 6);
  const profile = getAreaProfile(area);

  return (
    <>
      <nav className="container-prose pt-6 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/areas" className="hover:text-primary">Areas</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{area.name}</span>
      </nav>

      <PageHero
        eyebrow={`Dubai - ${area.name}`}
        title={`Junk Removal in ${area.name}, Dubai - Same-Day Pickup From Your Building`}
        sub={`Whether it's a single sofa from a high-rise or a full apartment clearance, our ${area.name} crew is on call. Message us on WhatsApp with a photo and we'll be there.`}
      >
        <Cta variant="wa" size="lg" whatsappContext={`Area: ${area.name}`} />
        <Cta variant="call" size="lg" />
      </PageHero>

      <section className="container-prose py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-action">Services</p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">Every Junk Removal Service Available in {area.name}</h2>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((s) => <ServiceCard key={s.slug} service={s} />)}
        </div>
      </section>

      <section className="container-prose py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-action">Local Pickup Needs</p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">Common Junk Removal Requests in {area.name}</h2>
            <p className="mt-4 text-muted-foreground">
              Junk removal in {area.name} can vary by property type, access rules and item volume. Send pickup details on WhatsApp so the team can check the right crew and timing.
            </p>
            <div className="mt-6">
              <Link href="/services" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-action">
                View all junk removal services <MapPin className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <ul className="grid gap-3">
            {profile.commonNeeds.map((item) => (
              <li key={item} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 shadow-soft">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-action" />
                <span className="text-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-surface py-20">
        <div className="container-prose grid items-start gap-12 md:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-action">About</p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">Working in {area.name}, Dubai</h2>
            <p className="mt-4 text-muted-foreground">{area.blurb}</p>
          </div>
          <p className="text-muted-foreground md:mt-12">{area.about}</p>
        </div>
      </section>

      <section className="container-prose py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-action">Property Access</p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">Apartment, Villa and Office Pickup Notes for {area.name}</h2>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {[
            { icon: Building2, title: "Apartment Pickup", body: profile.propertyNotes[0] },
            { icon: Home, title: "Villa & Townhouse Pickup", body: profile.propertyNotes[1] },
            { icon: BriefcaseBusiness, title: "Office & Business Pickup", body: profile.propertyNotes[2] },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <item.icon className="h-8 w-8 text-action" strokeWidth={1.8} />
              <h3 className="mt-4 font-display text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-prose py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold md:text-4xl">Why {area.name} Residents Trust Us</h2>
        </div>
        <ul className="mx-auto mt-10 grid max-w-3xl gap-3">
          {reasons.map((r) => (
            <li key={r} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 shadow-soft">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-action" />
              <span className="text-foreground">{r}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="container-prose py-20">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-action">Before Pickup</p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">What to Confirm for {area.name} Junk Pickup</h2>
            <p className="mt-4 text-muted-foreground">
              Same-day pickup may be available in {area.name} when crew scheduling, truck capacity and building or community access allow.
            </p>
          </div>
          <ul className="grid gap-3">
            {profile.accessNotes.map((item) => (
              <li key={item} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 shadow-soft">
                <ClipboardList className="mt-0.5 h-5 w-5 shrink-0 text-action" />
                <span className="text-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-surface py-20">
        <div className="container-prose">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">We Also Serve Nearby Communities</h2>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {nearby.map((n) => (
              <Link key={n.slug} href={`/areas/${n.slug}`} className="group flex items-center gap-2 rounded-lg border border-border bg-card px-3.5 py-3 text-sm font-medium hover:border-action">
                <MapPin className="h-3.5 w-3.5 text-action" />
                <span className="truncate">{n.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner heading={`Need a Pickup in ${area.name} Today? Let's Get It Booked.`} />
    </>
  );
}
