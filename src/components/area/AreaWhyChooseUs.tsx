import { CheckCircle2 } from "lucide-react";
import type { AreaData } from "@/data/area-content";

/** Shared trust reasons (Hybrid section — same skeleton, area data layered in). */
const BASE_REASONS = [
  "Licensed and insured for apartment, villa and office work",
  "Crews used to Dubai building access and lift protocols",
  "Careful floor, wall and lift protection on every job",
  "Responsible disposal through donation, recycling and licensed facilities",
  "WhatsApp-first booking with clear communication before pickup",
];

/** Section 13 — Why {Area} Residents Choose Us (Required, hybrid). */
export function AreaWhyChooseUs({ area }: { area: AreaData }) {
  const reasons = [...BASE_REASONS, ...(area.experienceNotes ?? [])];

  return (
    <section className="container-prose py-20">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-action">Why Us</p>
        <h2 className="mt-3 text-3xl font-bold md:text-4xl">Why {area.name} Residents Choose Us</h2>
        <p className="mt-4 text-muted-foreground">{area.coverageStatement}</p>
      </div>
      <ul className="mx-auto mt-10 grid max-w-3xl gap-3">
        {reasons.map((reason) => (
          <li
            key={reason}
            className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 shadow-soft"
          >
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-action" />
            <span className="text-foreground">{reason}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
