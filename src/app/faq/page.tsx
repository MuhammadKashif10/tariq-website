import type { Metadata } from "next";
import { faqs } from "@/data/faqs";
import { absoluteUrl } from "@/lib/site-config";
import { FaqClient } from "./FaqClient";

export const metadata: Metadata = {
  title: "Junk Removal Dubai FAQ | Pricing, Process & Areas Answered",
  description:
    "Answers to common questions about junk removal in Dubai - areas, items accepted, timing, booking, pricing and disposal.",
  alternates: { canonical: absoluteUrl("/faq") },
  openGraph: {
    title: "Junk Removal Dubai FAQ",
    description: "Pricing, process, areas, items accepted, booking and disposal.",
    url: absoluteUrl("/faq"),
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function FaqPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <FaqClient />
    </>
  );
}
