// =============================================================================
// BLOG SCHEMA (schema.org/Blog + BlogPosting)
// -----------------------------------------------------------------------------
// Built from the Articles registry. The Blog node references the shared
// Organization (@id) as publisher rather than re-declaring it. BlogPosting
// children are emitted only for published articles — with an empty registry the
// Blog node is still valid and simply carries no posts.
// =============================================================================

import type { Article, ArticleFaqItem } from "@/data/articles";
import { absoluteUrl, site } from "@/lib/site-config";
import { ORG_ID } from "./global";

export const BLOG_ID = absoluteUrl("/blog#blog");

const articleAuthor = (a: Article) =>
  a.author ? { "@type": "Person", name: a.author } : { "@id": ORG_ID };

const blogPosting = (a: Article) => ({
  "@type": "BlogPosting",
  headline: a.title,
  url: absoluteUrl(`/blog/${a.slug}`),
  datePublished: a.publishedAt,
  ...(a.updatedAt ? { dateModified: a.updatedAt } : {}),
  ...(a.image?.src ? { image: absoluteUrl(a.image.src) } : {}),
  articleSection: a.category,
  description: a.excerpt,
  author: articleAuthor(a),
  publisher: { "@id": ORG_ID },
});

/**
 * Blog schema for the listing page. `description` documents the section; posts
 * are attached only when the registry has published articles.
 */
export function blogSchema(articles: Article[], description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": BLOG_ID,
    url: absoluteUrl("/blog"),
    name: `${site.name} Blog`,
    description,
    inLanguage: "en",
    publisher: { "@id": ORG_ID },
    ...(articles.length > 0 ? { blogPost: articles.map(blogPosting) } : {}),
  };
}

/**
 * Article (BlogPosting) schema for a single post. References the shared
 * Organization (@id) as publisher and is part of the Blog (@id) — no entity is
 * re-declared. `mainEntityOfPage` binds the schema to its canonical URL.
 */
export function articleSchema(a: Article) {
  const url = absoluteUrl(`/blog/${a.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    isPartOf: { "@id": BLOG_ID },
    headline: a.title,
    description: a.metaDescription ?? a.excerpt,
    articleSection: a.category,
    inLanguage: "en",
    datePublished: a.publishedAt,
    dateModified: a.updatedAt ?? a.publishedAt,
    ...(a.image?.src ? { image: absoluteUrl(a.image.src) } : {}),
    ...(a.tags?.length ? { keywords: a.tags.join(", ") } : {}),
    author: articleAuthor(a),
    publisher: { "@id": ORG_ID },
  };
}

/** FAQPage schema for an article's FAQ block (emit only when items exist). */
export function articleFaqSchema(items: ArticleFaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
