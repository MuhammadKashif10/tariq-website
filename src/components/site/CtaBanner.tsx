import { Cta } from "./Cta";

interface Props {
  heading: string;
  sub?: string;
}

export function CtaBanner({ heading, sub }: Props) {
  return (
    <section className="container-prose py-16">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-hero px-8 py-14 text-center text-primary-foreground shadow-elevated md:px-14 md:py-20">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-action/20 blur-3xl" />
        <div className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-whatsapp/15 blur-3xl" />
        <h2 className="relative text-3xl font-bold md:text-4xl">{heading}</h2>
        {sub && <p className="relative mx-auto mt-4 max-w-2xl text-primary-foreground/85">{sub}</p>}
        <div className="relative mt-8 flex flex-wrap justify-center gap-3">
          <Cta variant="wa" size="lg" />
          <Cta variant="call" size="lg" />
        </div>
      </div>
    </section>
  );
}
