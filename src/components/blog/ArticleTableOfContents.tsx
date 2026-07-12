interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

/**
 * Server component. Static, data-driven Table of Contents rendered as a sticky
 * left sidebar on desktop (and a stacked card on mobile). Zero client JS:
 * navigation is plain anchor links to existing heading IDs; smooth scrolling is
 * CSS-only (see styles.css). The parent template decides whether to show it and
 * supplies the pre-filtered heading items; this guard keeps it safe in isolation.
 */
export function ArticleTableOfContents({ items }: { items: TocItem[] }) {
  if (items.length < 3) return null;

  return (
    <nav
      aria-label="Table of Contents"
      className="lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:self-start lg:overflow-y-auto"
    >
      <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
        <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-action">
          On this page
        </h2>
        <ol className="mt-4 space-y-2 text-sm">
          {items.map((item) => (
            <li key={item.id} className={item.level === 3 ? "ml-4" : ""}>
              <a
                href={`#${item.id}`}
                className="text-muted-foreground transition hover:text-action"
              >
                {item.text}
              </a>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
