import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { absoluteUrl, site } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `Privacy Policy | ${site.name}`,
  description:
    "How we collect, use and protect your personal data when you use our Dubai junk removal service. UAE PDPL and GDPR aligned.",
  alternates: { canonical: absoluteUrl("/privacy-policy") },
  openGraph: { url: absoluteUrl("/privacy-policy") },
};

const sections = [
  { h: "1. Introduction", b: [`This Privacy Policy explains how ${site.name} ("we", "us", "our") collects, uses, stores and protects information you provide when using our website and services. We comply with the UAE Personal Data Protection Law (Federal Decree-Law No. 45 of 2021) and, where applicable, the EU General Data Protection Regulation (GDPR).`] },
  { h: "2. Information We Collect", b: ["Contact details: name, phone number, WhatsApp number, email address.", "Service details: pickup area, building/address, description and photos of items.", "Technical data: IP address, browser type, device type, pages visited.", "Cookies: session, analytics and preference cookies."] },
  { h: "3. How We Use Your Information", b: ["To confirm and schedule pickups.", "To communicate with you via call, WhatsApp or email.", "To improve our service, website and customer experience.", "To comply with legal and regulatory obligations in the UAE."] },
  { h: "4. Cookies", b: ["We use cookies to operate the site and measure performance. You may disable cookies in your browser; some features may stop working."] },
  { h: "5. Sharing With Third Parties", b: ["Licensed disposal and recycling partners (job-related details only).", "Payment processors (for transactions).", "Analytics providers (anonymised data).", "We do not sell your personal data."] },
  { h: "6. Data Retention", b: ["We retain personal data only as long as necessary to deliver the service and meet legal record-keeping requirements."] },
  { h: "7. Your Rights", b: ["Access the data we hold about you.", "Request correction or deletion.", "Withdraw consent for marketing.", "Lodge a complaint with the UAE Data Office."] },
  { h: "8. Data Security", b: ["We use industry-standard measures (encryption, access controls, secure storage) to protect your data."] },
  { h: "9. International Transfers", b: ["Where data is transferred outside the UAE, we ensure appropriate safeguards under UAE PDPL and GDPR."] },
  { h: "10. Changes to This Policy", b: ["We may update this Policy. Material changes will be posted on this page with an updated date."] },
  { h: "11. Contact", b: [`For privacy questions, email ${site.email} or call us.`] },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" sub="Last updated: 24 May 2026" />
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
