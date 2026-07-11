import Link from "next/link";
import { BookOpen, ArrowRight } from "lucide-react";
import type { AreaData } from "@/data/area-content";
import { resolveRelatedArticles } from "@/lib/area/links";

/**
 * Section 15 — Related Articles. Driven by relatedArticles (exactly 3 when the
 * blog exists). Self-guards to render nothing while the blog is pending and the
 * list is empty — no empty section, no dangling /blog links.
 */
export function AreaRelatedArticles({ area }: { area: AreaData }) {
  const articles = resolveRelatedArticles(area.relatedArticles);
  if (articles.length === 0) return null;

  return (
    <section className="container-prose py-20">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-action">
          Related Reading
        </p>
        <h2 className="mt-3 text-3xl font-bold md:text-4xl">Helpful Junk Removal Guides</h2>
      </div>
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={article.href}
            className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-soft transition hover:-translate-y-1 hover:border-action hover:shadow-elevated"
          >
            <BookOpen className="h-7 w-7 text-action" strokeWidth={1.8} />
            <h3 className="mt-4 flex-1 font-display text-lg font-semibold">{article.label}</h3>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:text-action">
              Read More <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
