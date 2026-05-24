import { ShieldCheck, BadgeCheck, Leaf, Clock } from "lucide-react";

const items = [
  { icon: ShieldCheck, label: "Licensed in Dubai" },
  { icon: BadgeCheck, label: "Fully Insured" },
  { icon: Leaf, label: "Eco-Friendly Disposal" },
  { icon: Clock, label: "Same-Day Service" },
];

export function TrustBar() {
  return (
    <section className="border-y border-border bg-surface">
      <div className="container-prose grid grid-cols-2 gap-6 py-6 sm:grid-cols-4">
        {items.map((it) => (
          <div key={it.label} className="flex items-center gap-2.5 text-sm font-medium text-foreground">
            <it.icon className="h-5 w-5 text-action" strokeWidth={2} />
            <span>{it.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
