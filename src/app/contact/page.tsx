import type { Metadata } from "next";
import { ContactClient } from "./ContactClient";
import { absoluteUrl, site } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `Contact ${site.name} | Call, WhatsApp or Book Online`,
  description:
    "Contact our Dubai junk removal team - Call Now, WhatsApp Us, or book a pickup using the form. Same-day slots across all Dubai areas.",
  alternates: { canonical: absoluteUrl("/contact") },
  openGraph: {
    title: `Contact ${site.name}`,
    description: "Call, WhatsApp or schedule a pickup online.",
    url: absoluteUrl("/contact"),
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
