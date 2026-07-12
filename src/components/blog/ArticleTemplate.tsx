import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Clock, PenLine } from "lucide-react";
import type { Article } from "@/data/articles";
import { getAdjacentArticles, getRelatedArticles, getTableOfContents } from "@/data/articles";
import { formatArticleDate, formatReadingTime } from "@/lib/blog/format";
import { articleFaqSchema, articleSchema } from "@/lib/schema/blog";
import { breadcrumbListSchema } from "@/lib/schema/global";
import { CtaBanner } from "@/components/site/CtaBanner";
import { ArticleContent } from "./ArticleContent";
import { ArticleTableOfContents } from "./ArticleTableOfContents";
import { ArticleFaq } from "./ArticleFaq";
import { RelatedArticles } from "./RelatedArticles";
import { ArticlePrevNext } from "./ArticlePrevNext";

/**
 * The single reusable article template. Every article renders from here; all
 * variation comes from the `article` data (registry-driven). Optional sections
 * (FAQ, related, prev/next) self-guard and render nothing when absent.
 */
export function ArticleTemplate({ article }: { article: Article }) {
  const related = getRelatedArticles(article);
  const { previous, next } = getAdjacentArticles(article.slug);

  // Data-driven TOC: skip empty headings; show as a sidebar only when it earns
  // its space (3+ headings). Computed once so the layout and the TOC agree.
  const tocItems = getTableOfContents(article).filter(
    (item) => item.id.trim().length > 0 && item.text.trim().length > 0,
  );
  const showToc = tocItems.length >= 3;

  const breadcrumb = breadcrumbListSchema([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: article.title, path: `/blog/${article.slug}` },
  ]);

  return (
    <>
      {/* Schema: Article (BlogPosting) + Breadcrumb + FAQ (Organization is global). */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema(article)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      {article.faq && article.faq.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleFaqSchema(article.faq)) }}
        />
      )}

      {/* 1 — Breadcrumb (mirrors BreadcrumbList schema) */}
      <nav aria-label="Breadcrumb" className="container-prose pt-6 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/blog" className="hover:text-primary">
          Blog
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{article.title}</span>
      </nav>

      {/* 2 — Hero: category, H1 title, meta (date, reading time, author) */}
      <header className="relative overflow-hidden bg-gradient-hero text-primary-foreground">
        <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-action/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-whatsapp/15 blur-3xl" />
        <div className="container-prose relative py-14 md:py-20">
          <div className="mx-auto max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-action">
              {article.category}
            </p>
            <h1 className="mt-3 text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
              {article.title}
            </h1>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-primary-foreground/85">
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4" />
                <time dateTime={article.publishedAt}>{formatArticleDate(article.publishedAt)}</time>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {formatReadingTime(article.readingTimeMinutes)}
              </span>
              {article.author && (
                <span className="inline-flex items-center gap-1.5">
                  <PenLine className="h-4 w-4" />
                  {article.author}
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* 3 — Featured image */}
      <div className="container-prose -mt-8 md:-mt-12">
        <div className="relative mx-auto aspect-[16/9] max-w-4xl overflow-hidden rounded-3xl border border-border bg-secondary shadow-elevated">
          <Image
            src={article.image.src}
            alt={article.image.alt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 896px"
            className="object-cover"
          />
        </div>
      </div>

      {/* 4 — Table of contents (sidebar on desktop) + article body */}
      <div className="container-prose py-12 md:py-16">
        {showToc ? (
          <div className="grid gap-10 lg:grid-cols-[16rem_minmax(0,1fr)]">
            <ArticleTableOfContents items={tocItems} />
            <article>
              <ArticleContent blocks={article.content} />
            </article>
          </div>
        ) : (
          <article>
            <ArticleContent blocks={article.content} />
          </article>
        )}
      </div>

      {/* 5 — FAQ (conditional) */}
      <ArticleFaq items={article.faq ?? []} />

      {/* 6 — Related articles */}
      <RelatedArticles articles={related} />

      {/* 7 — Previous / Next */}
      <ArticlePrevNext previous={previous} next={next} />

      {/* 8 — CTA */}
      <CtaBanner heading="Got Junk to Clear? Let's Get It Gone." />
    </>
  );
}
