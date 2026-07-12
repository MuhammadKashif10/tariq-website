import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Article } from "@/data/articles";

interface Props {
  previous: Article | null;
  next: Article | null;
}

/**
 * Server component. Previous/next post navigation. Renders only when at least
 * one neighbour exists; each cell is present only when its target exists.
 */
export function ArticlePrevNext({ previous, next }: Props) {
  if (!previous && !next) return null;

  return (
    <nav aria-label="Article navigation" className="container-prose py-8">
      <div className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-2">
        {previous ? (
          <Link
            href={`/blog/${previous.slug}`}
            className="group flex flex-col rounded-2xl border border-border bg-card p-5 shadow-soft transition hover:border-action hover:shadow-elevated"
          >
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <ArrowLeft className="h-3.5 w-3.5" /> Previous
            </span>
            <span className="mt-2 font-display font-semibold transition group-hover:text-action">
              {previous.title}
            </span>
          </Link>
        ) : (
          <span className="hidden sm:block" />
        )}

        {next ? (
          <Link
            href={`/blog/${next.slug}`}
            className="group flex flex-col rounded-2xl border border-border bg-card p-5 text-right shadow-soft transition hover:border-action hover:shadow-elevated"
          >
            <span className="inline-flex items-center justify-end gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Next <ArrowRight className="h-3.5 w-3.5" />
            </span>
            <span className="mt-2 font-display font-semibold transition group-hover:text-action">
              {next.title}
            </span>
          </Link>
        ) : (
          <span className="hidden sm:block" />
        )}
      </div>
    </nav>
  );
}
