import { CalendarCheck, MessageSquare, ReceiptText, Recycle, Truck } from "lucide-react";
import { Cta } from "./Cta";

const steps = [
  { icon: MessageSquare, title: "Send Photos on WhatsApp", body: "Share photos or a short video of the items, plus your Dubai area." },
  { icon: ReceiptText, title: "Check Pickup Details", body: "We review item volume, access and disposal needs before confirming." },
  { icon: CalendarCheck, title: "Confirm Pickup Time", body: "Choose an available slot that works for your building, villa or office." },
  { icon: Truck, title: "Crew Removes the Junk", body: "Our crew arrives, handles lifting and clears the items carefully." },
  { icon: Recycle, title: "Responsible Disposal", body: "Usable, recyclable and disposal items are handled through suitable channels." },
];

export function HowItWorks() {
  return (
    <section className="container-prose py-20">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-action">How It Works</p>
        <h2 className="mt-3 text-3xl font-bold md:text-4xl">A Simple WhatsApp-to-Pickup Workflow for Junk Removal in Dubai</h2>
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {steps.map((s, i) => (
          <div key={s.title} className="relative rounded-2xl border border-border bg-card p-7 shadow-soft">
            <span className="absolute -top-3 left-7 inline-flex h-6 items-center rounded-full bg-action px-2.5 text-xs font-bold text-action-foreground">Step {i + 1}</span>
            <s.icon className="h-9 w-9 text-primary" strokeWidth={1.7} />
            <h3 className="mt-4 text-xl font-semibold">{s.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
          </div>
        ))}
      </div>
      <div className="mt-10 flex justify-center"><Cta variant="book" size="lg" /></div>
    </section>
  );
}
