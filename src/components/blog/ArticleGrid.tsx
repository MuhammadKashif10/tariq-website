import { Newspaper } from "lucide-react";
import type { Article } from "@/data/articles";
import { ArticleCard } from "./ArticleCard";

/**
 * Server component. Data-driven responsive grid of article cards. When the
 * registry has no publishable articles it renders a tasteful empty state
 * instead of a broken/empty section — the page never ships a blank grid.
 */
export function ArticleGrid({ articles }: { articles: Article[] }) {
  if (articles.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-card p-12 text-center shadow-soft">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-secondary text-primary">
          <Newspaper className="h-7 w-7" strokeWidth={1.8} />
        </div>
        <h3 className="mt-5 font-display text-xl font-semibold">Fresh guides are on the way</h3>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          We&apos;re putting together practical junk removal guides, decluttering tips and
          Dubai-specific advice. Check back soon — or message us if there&apos;s something
          you&apos;d like us to cover.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <ArticleCard key={article.slug} article={article} />
      ))}
    </div>
  );
}
