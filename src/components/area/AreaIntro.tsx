import type { AreaData } from "@/data/area-content";

/** Section 4 — Local Intro / Community Overview (Required, unique). */
export function AreaIntro({ area }: { area: AreaData }) {
  return (
    <section className="container-prose py-20">
      <div className="grid items-start gap-12 md:grid-cols-[1fr_2fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-action">
            Community Overview
          </p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">
            Junk Removal in {area.name}, Dubai
          </h2>
        </div>
        <div className="space-y-5 text-muted-foreground">
          {area.intro.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
