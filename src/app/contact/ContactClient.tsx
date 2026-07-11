import { Clock, MapPin, MessageCircle, Phone } from "lucide-react";
import { Cta } from "@/components/site/Cta";
import { PageHero } from "@/components/site/PageHero";
import { site, telHref, waHref } from "@/lib/site-config";

export function ContactClient() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Contact Dubai's Fastest Junk Removal Team"
        sub="Call us or send a message on WhatsApp with a photo of your junk, and we'll confirm pickup details and availability right away."
      >
        <Cta variant="wa" size="lg" />
        <Cta variant="call" size="lg" />
      </PageHero>

      <section className="container-prose py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold md:text-4xl">Reach Us Directly</h2>
          <p className="mt-4 text-muted-foreground">
            WhatsApp is the quickest way to book. Send photos of the items and your Dubai area, and
            we&apos;ll come back with the right pickup option and timing.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2">
          <a
            href={telHref}
            className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5 shadow-soft hover:border-action"
          >
            <Phone className="mt-0.5 h-5 w-5 text-action" />
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Phone</div>
              <div className="font-medium text-foreground">{site.phoneDisplay}</div>
            </div>
          </a>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5 shadow-soft hover:border-action"
          >
            <MessageCircle className="mt-0.5 h-5 w-5 text-whatsapp" />
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">WhatsApp</div>
              <div className="font-medium text-foreground">{site.phoneDisplay}</div>
            </div>
          </a>
          <div className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5 shadow-soft">
            <MapPin className="mt-0.5 h-5 w-5 text-action" />
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Address</div>
              <div className="font-medium text-foreground">{site.address}</div>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5 shadow-soft">
            <Clock className="mt-0.5 h-5 w-5 text-action" />
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Working Hours</div>
              <div className="font-medium text-foreground">{site.hours}</div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Cta variant="wa" size="lg" />
          <Cta variant="call" size="lg" />
        </div>
      </section>

      <section className="container-prose pb-20">
        <h2 className="mb-6 font-display text-2xl font-bold">Find Us on the Map</h2>
        <div className="overflow-hidden rounded-3xl border border-border shadow-soft">
          <iframe
            title={`${site.name} location`}
            src="https://www.google.com/maps?q=Business+Bay+Dubai&output=embed"
            width="100%"
            height="420"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block"
          />
        </div>
      </section>
    </>
  );
}
