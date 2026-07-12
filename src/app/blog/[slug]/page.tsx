import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArticleBySlug, getPublishedArticles } from "@/data/articles";
import { auditArticleRegistry } from "@/lib/blog/validation";
import { ArticleTemplate } from "@/components/blog/ArticleTemplate";
import { absoluteUrl } from "@/lib/site-config";

type Props = { params: Promise<{ slug: string }> };

// Only registered article slugs are valid routes — no on-demand arbitrary slugs.
export const dynamicParams = false;

// Runs once at build: fails the build on any registry governance violation, then
// returns the published article slugs to statically generate. With an empty
// registry this yields no pages and every /blog/* request 404s.
export function generateStaticParams() {
  auditArticleRegistry();
  return getPublishedArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "Article Not Found" };

  const title = article.metaTitle ?? article.title;
  const description = article.metaDescription ?? article.excerpt;
  const url = absoluteUrl(`/blog/${article.slug}`);

  return {
    title,
    description,
    ...(article.keywords?.length ? { keywords: article.keywords } : {}),
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title,
      description,
      url,
      images: [{ url: article.image.src, alt: article.image.alt }],
      publishedTime: article.publishedAt,
      ...(article.updatedAt ? { modifiedTime: article.updatedAt } : {}),
      ...(article.author ? { authors: [article.author] } : {}),
      section: article.category,
      ...(article.tags?.length ? { tags: article.tags } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [article.image.src],
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  return <ArticleTemplate article={article} />;
}
