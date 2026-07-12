import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Clock } from "lucide-react";
import type { Article } from "@/data/articles";
import { formatArticleDate, formatReadingTime } from "@/lib/blog/format";

/**
 * Server component. Wide, two-column hero treatment for the single Featured
 * article. Reuses the same card language as ArticleCard at a larger scale.
 */
export function FeaturedArticleCard({ article }: { article: Article }) {
  const href = `/blog/${article.slug}`;
  return (
    <article className="group grid overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition hover:shadow-elevated lg:grid-cols-2">
      <Link
        href={href}
        className="relative block aspect-[16/10] overflow-hidden bg-secondary lg:aspect-auto"
      >
        <Image
          src={article.image.src}
          alt={article.image.alt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition duration-300 group-hover:scale-105"
        />
      </Link>

      <div className="flex flex-col justify-center gap-4 p-8 md:p-10">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
          <span className="inline-flex items-center rounded-full bg-secondary px-3 py-1 font-semibold text-primary">
            {article.category}
          </span>
          <span className="inline-flex items-center gap-1.5 text-muted-foreground">
            <CalendarDays className="h-3.5 w-3.5" />
            <time dateTime={article.publishedAt}>{formatArticleDate(article.publishedAt)}</time>
          </span>
          <span className="inline-flex items-center gap-1.5 text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            {formatReadingTime(article.readingTimeMinutes)}
          </span>
        </div>

        <h3 className="font-display text-2xl font-bold leading-tight md:text-3xl">
          <Link href={href} className="transition hover:text-action">
            {article.title}
          </Link>
        </h3>

        <p className="text-muted-foreground">{article.excerpt}</p>

        <Link
          href={href}
          className="mt-1 inline-flex w-fit items-center justify-center gap-2 rounded-lg bg-action px-5 py-2.5 text-sm font-semibold text-action-foreground shadow-soft transition hover:opacity-90"
          aria-label={`Read featured article: ${article.title}`}
        >
          Read Article <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
