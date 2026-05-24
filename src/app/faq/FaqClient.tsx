"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { Cta } from "@/components/site/Cta";
import { CtaBanner } from "@/components/site/CtaBanner";
import { PageHero } from "@/components/site/PageHero";
import { faqs } from "@/data/faqs";

export function FaqClient() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Junk Removal in Dubai - Frequently Asked Questions"
        sub="Everything you need to know about how we work, what we take, and how to book."
      >
        <Cta variant="wa" size="lg" />
        <Cta variant="call" size="lg" />
      </PageHero>

      <section className="container-prose py-20">
        <Accordion.Root type="single" collapsible className="mx-auto max-w-3xl space-y-3">
          {faqs.map((f, i) => (
            <Accordion.Item
              key={f.q}
              value={`item-${i}`}
              className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft"
            >
              <Accordion.Header>
                <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-display text-base font-semibold text-foreground hover:bg-muted">
                  {f.q}
                  <ChevronDown className="h-5 w-5 shrink-0 text-action transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                <div className="border-t border-border px-5 py-4 text-muted-foreground">{f.a}</div>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </section>

      <CtaBanner heading="Still Have Questions? We're One Message Away." />
    </>
  );
}
