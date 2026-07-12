import type { Article } from "@/data/articles";
import { ArticleCard } from "./ArticleCard";

/**
 * Server component. Related-articles grid, sourced entirely from the registry
 * (see getRelatedArticles). Renders nothing when there are no related posts —
 * fails gracefully and stays scalable.
 */
export function RelatedArticles({ articles }: { articles: Article[] }) {
  if (!articles || articles.length === 0) return null;

  return (
    <section className="bg-surface py-16 md:py-20">
      <div className="container-prose">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-action">
            Keep Reading
          </p>
          <h2 className="mt-2 text-3xl font-bold md:text-4xl">Related Articles</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}
