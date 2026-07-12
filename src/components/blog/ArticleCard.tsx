import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Clock } from "lucide-react";
import type { Article } from "@/data/articles";
import { formatArticleDate, formatReadingTime } from "@/lib/blog/format";

/**
 * Server component. Renders one article card entirely from registry data:
 * featured image, category, publish date, reading time, title, excerpt and a
 * "Read Article" affordance. Styling mirrors ServiceCard (rounded-2xl border
 * card, soft shadow, hover lift) so the blog reads as one system.
 */
export function ArticleCard({ article }: { article: Article }) {
  const href = `/blog/${article.slug}`;
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition hover:-translate-y-1 hover:border-action hover:shadow-elevated">
      <Link href={href} className="relative block aspect-[16/9] overflow-hidden bg-secondary">
        <Image
          src={article.image.src}
          alt={article.image.alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition duration-300 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 inline-flex items-center rounded-full bg-background/90 px-3 py-1 text-xs font-semibold text-primary shadow-soft backdrop-blur">
          {article.category}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5" />
            <time dateTime={article.publishedAt}>{formatArticleDate(article.publishedAt)}</time>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            {formatReadingTime(article.readingTimeMinutes)}
          </span>
        </div>

        <h3 className="mt-3 font-display text-lg font-semibold leading-snug">
          <Link href={href} className="transition hover:text-action">
            {article.title}
          </Link>
        </h3>

        <p className="mt-2 flex-1 text-sm text-muted-foreground">{article.excerpt}</p>

        <Link
          href={href}
          className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary transition group-hover:text-action"
          aria-label={`Read article: ${article.title}`}
        >
          Read Article
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
        </Link>
      </div>
    </article>
  );
}
