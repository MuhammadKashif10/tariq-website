import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero } from "@/components/site/PageHero";
import { Cta } from "@/components/site/Cta";
import { absoluteUrl, site, telHref, waHref } from "@/lib/site-config";
import { areas } from "@/data/areas";
import { services } from "@/data/services";
import { Phone, MessageCircle, Mail, MapPin, Clock, Send, CheckCircle2, AlertCircle } from "lucide-react";

const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT as string | undefined;

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: `Contact ${site.name} | Call, WhatsApp or Book Online` },
      { name: "description", content: "Contact our Dubai junk removal team — Call Now, WhatsApp Us, or book a pickup using the form. Same-day slots across all Dubai areas." },
      { property: "og:title", content: `Contact ${site.name}` },
      { property: "og:description", content: "Call, WhatsApp or schedule a pickup online." },
      { property: "og:url", content: absoluteUrl("/contact") },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/contact") }],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;
    setError("");

    if (!FORMSPREE_ENDPOINT) {
      setError("Form endpoint is not configured yet. Please WhatsApp us for an instant reply.");
      return;
    }

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.set("_subject", `New junk removal lead - ${site.name}`);
    formData.set("business_email", site.email);

    try {
      setSubmitting(true);
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (!response.ok) throw new Error("Submission failed");

      setSent(true);
      form.reset();
    } catch {
      setError("Sorry, your request could not be sent. Please try again or message us on WhatsApp.");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Contact Dubai's Fastest Junk Removal Team"
        sub="Call, message us on WhatsApp, or fill in the form and we'll follow up on your pickup details."
      >
        <Cta variant="wa" size="lg" />
        <Cta variant="call" size="lg" />
      </PageHero>

      <section className="container-prose py-20">
        <div className="grid gap-12 lg:grid-cols-[3fr_2fr]">
          {/* Form */}
          <div className="rounded-3xl border border-border bg-card p-8 shadow-soft md:p-10">
            <h2 className="font-display text-2xl font-bold">Schedule a Pickup Online</h2>
            <p className="mt-2 text-sm text-muted-foreground">Fill in the details and we'll get back to you as soon as possible.</p>

            {sent ? (
              <div className="mt-8 flex items-start gap-3 rounded-xl border border-action/30 bg-action/10 p-5">
                <CheckCircle2 className="mt-0.5 h-6 w-6 text-action" />
                <div>
                  <p className="font-semibold text-foreground">Thanks — your request is in.</p>
                  <p className="mt-1 text-sm text-muted-foreground">We'll contact you shortly. For an instant reply, WhatsApp us.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="text-sm">
                    <span className="font-medium text-foreground">Full Name</span>
                    <input required name="name" type="text" className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-foreground outline-none focus:border-ring" />
                  </label>
                  <label className="text-sm">
                    <span className="font-medium text-foreground">Phone Number (UAE)</span>
                    <input required name="phone" type="tel" placeholder={site.phoneDisplay} className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-foreground outline-none focus:border-ring" />
                  </label>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="text-sm">
                    <span className="font-medium text-foreground">Email Address</span>
                    <input name="email" type="email" placeholder={site.email} className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-foreground outline-none focus:border-ring" />
                  </label>
                  <label className="text-sm">
                    <span className="font-medium text-foreground">Service Type</span>
                    <select required name="service_type" className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-foreground outline-none focus:border-ring">
                      <option value="">Select service...</option>
                      {services.map((s) => <option key={s.slug} value={s.name}>{s.name}</option>)}
                    </select>
                  </label>
                </div>
                <label className="text-sm">
                  <span className="font-medium text-foreground">Your Dubai Area</span>
                  <select required name="area_location" className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-foreground outline-none focus:border-ring">
                    <option value="">Select your area…</option>
                    {areas.map((a) => <option key={a.slug} value={a.name}>{a.name}</option>)}
                  </select>
                </label>
                <label className="text-sm">
                  <span className="font-medium text-foreground">Items to Remove</span>
                  <textarea required name="message_details" rows={5} placeholder="Tell us what needs to go - and when you'd like pickup." className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-foreground outline-none focus:border-ring" />
                </label>
                {error && (
                  <div className="flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/10 p-4">
                    <AlertCircle className="mt-0.5 h-5 w-5 text-destructive" />
                    <p className="text-sm text-foreground">{error}</p>
                  </div>
                )}
                <button type="submit" disabled={submitting} className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-action px-6 py-3.5 text-base font-semibold text-action-foreground shadow-soft hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70">
                  {submitting ? "Sending..." : "Schedule a Pickup"} <Send className="h-4 w-4" />
                </button>
              </form>
            )}
          </div>

          {/* Details */}
          <div className="space-y-4">
            <h2 className="font-display text-2xl font-bold">Reach Us Directly</h2>
            <a href={telHref} className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5 shadow-soft hover:border-action">
              <Phone className="mt-0.5 h-5 w-5 text-action" />
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Phone</div>
                <div className="font-medium text-foreground">{site.phoneDisplay}</div>
              </div>
            </a>
            <a href={waHref} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5 shadow-soft hover:border-action">
              <MessageCircle className="mt-0.5 h-5 w-5 text-whatsapp" />
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">WhatsApp</div>
                <div className="font-medium text-foreground">{site.phoneDisplay}</div>
              </div>
            </a>
            <a href={`mailto:${site.email}`} className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5 shadow-soft hover:border-action">
              <Mail className="mt-0.5 h-5 w-5 text-action" />
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email</div>
                <div className="font-medium text-foreground">{site.email}</div>
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
