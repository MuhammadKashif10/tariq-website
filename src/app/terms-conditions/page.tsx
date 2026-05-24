import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { absoluteUrl, site } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `Terms & Conditions | ${site.name}`,
  description:
    "Terms governing our junk removal services in Dubai - bookings, liability, payment, cancellations and prohibited items.",
  alternates: { canonical: absoluteUrl("/terms-conditions") },
  openGraph: { url: absoluteUrl("/terms-conditions") },
};

const sections = [
  { h: "1. Acceptance", b: ["By booking our services or using this website, you agree to these Terms & Conditions."] },
  { h: "2. Services", b: ["We provide junk removal, hauling and clearance services across Dubai, UAE, including but not limited to furniture, appliance, mattress, debris, office, e-waste and full property clearances."] },
  { h: "3. Bookings & Confirmation", b: ["Bookings can be made via WhatsApp, phone, contact form or website.", "A booking is confirmed once we send written confirmation (WhatsApp/email).", "You are responsible for the accuracy of the address, access details and item description provided."] },
  { h: "4. Pricing & Payment", b: ["Prices are confirmed in writing before work begins, based on volume, access and labour.", "Payment is due on completion via cash, card or bank transfer.", "Late or unpaid balances may incur additional charges."] },
  { h: "5. Cancellations & Rescheduling", b: ["Free cancellation or rescheduling up to 2 hours before the scheduled slot.", "Cancellations inside the 2-hour window may incur a service fee.", "No-shows may be charged the full visit fee."] },
  { h: "6. Prohibited Items", b: ["We do not handle: hazardous chemicals, flammables, explosives, asbestos, biomedical/clinical waste, radioactive materials, or any item prohibited under UAE law. You must disclose any potentially regulated items at booking."] },
  { h: "7. Customer Responsibilities", b: ["Ensure items to be removed are accessible.", "Obtain building/community permissions where required.", "Remove personal valuables before pickup; we are not liable for items inside discarded furniture."] },
  { h: "8. Liability", b: ["We carry insurance and take all reasonable care.", "Our liability is limited to direct damages caused by our proven negligence, capped at the value of the specific job.", "We are not liable for indirect, incidental or consequential losses."] },
  { h: "9. Disposal", b: ["By engaging our service, you transfer ownership of removed items to us for sorting, donation, recycling or disposal at licensed Dubai facilities."] },
  { h: "10. Force Majeure", b: ["We are not liable for delays or failures caused by events outside our reasonable control (weather, traffic restrictions, government action, etc.)."] },
  { h: "11. Governing Law", b: ["These Terms are governed by the laws of the Emirate of Dubai and the federal laws of the United Arab Emirates. Disputes shall be subject to the exclusive jurisdiction of the Dubai Courts."] },
  { h: "12. Changes", b: ["We may update these Terms at any time. Continued use of our services constitutes acceptance of the updated Terms."] },
  { h: "13. Contact", b: [`Questions? Email ${site.email} or call us.`] },
];

export default function TermsPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms & Conditions" sub="Last updated: 24 May 2026" />
      <section className="container-prose py-16">
        <div className="mx-auto max-w-3xl space-y-8">
          {sections.map((s) => (
            <div key={s.h}>
              <h2 className="font-display text-xl font-bold text-foreground">{s.h}</h2>
              <div className="mt-3 space-y-2 text-muted-foreground">
                {s.b.map((p) => <p key={p}>{p}</p>)}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
