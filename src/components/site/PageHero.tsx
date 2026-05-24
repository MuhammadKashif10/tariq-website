interface Props {
  eyebrow?: string;
  title: string;
  sub?: string;
  children?: React.ReactNode;
}

export function PageHero({ eyebrow, title, sub, children }: Props) {
  return (
    <section className="relative overflow-hidden bg-gradient-hero text-primary-foreground">
      <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-action/20 blur-3xl" />
      <div className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-whatsapp/15 blur-3xl" />
      <div className="container-prose relative py-16 md:py-24">
        {eyebrow && <p className="text-xs font-semibold uppercase tracking-[0.2em] text-action">{eyebrow}</p>}
        <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-tight md:text-5xl">{title}</h1>
        {sub && <p className="mt-5 max-w-2xl text-lg text-primary-foreground/85">{sub}</p>}
        {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
      </div>
    </section>
  );
}
