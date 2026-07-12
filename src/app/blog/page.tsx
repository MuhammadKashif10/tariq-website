import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Building2, HelpCircle, MapPin, Wrench } from "lucide-react";
import { Cta } from "@/components/site/Cta";
import { CtaBanner } from "@/components/site/CtaBanner";
import { PageHero } from "@/components/site/PageHero";
import { ArticleGrid } from "@/components/blog/ArticleGrid";
import { FeaturedArticleCard } from "@/components/blog/FeaturedArticleCard";
import { getFeaturedArticle, getLatestArticles, getPublishedArticles } from "@/data/articles";
import { breadcrumbListSchema } from "@/lib/schema/global";
import { blogSchema } from "@/lib/schema/blog";
import { absoluteUrl, site } from "@/lib/site-config";

const BLOG_DESCRIPTION =
  "Practical junk removal guides, decluttering tips and Dubai-specific advice from the Fast Junk Service Dubai team — how to clear furniture, appliances, villas and offices the easy way.";

export const metadata: Metadata = {
  title: "Blog | Junk Removal Guides, Tips & Advice for Dubai",
  description: BLOG_DESCRIPTION,
  alternates: { canonical: absoluteUrl("/blog") },
  openGraph: {
    title: "The Fast Junk Service Dubai Blog",
    description: BLOG_DESCRIPTION,
    url: absoluteUrl("/blog"),
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Fast Junk Service Dubai Blog",
    description: BLOG_DESCRIPTION,
  },
};

// Internal-link hub to the site's pillar pages (SEO + discovery).
const internalLinks = [
  {
    href: "/services",
    label: "Our Services",
    desc: "Furniture, appliances, debris & full clearances.",
    icon: Wrench,
  },
  {
    href: "/areas",
    label: "Service Areas",
    desc: "Junk removal across all 40+ Dubai communities.",
    icon: MapPin,
  },
  {
    href: "/about",
    label: "About Us",
    desc: "The local crew behind every fast, clean pickup.",
    icon: Building2,
  },
  {
    href: "/faq",
    label: "FAQ",
    desc: "Answers on pricing, timing and how we work.",
    icon: HelpCircle,
  },
];

export default function BlogPage() {
  const published = getPublishedArticles();
  const featured = getFeaturedArticle();
  const latest = getLatestArticles({ excludeSlug: featured?.slug });

  const breadcrumbSchema = breadcrumbListSchema([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogSchema(published, BLOG_DESCRIPTION)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Visible breadcrumb — mirrors BreadcrumbList schema. */}
      <nav aria-label="Breadcrumb" className="container-prose pt-6 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">Blog</span>
      </nav>

      {/* 1 — Hero */}
      <PageHero
        eyebrow="Blog"
        title="Junk Removal Guides, Tips & Advice for Dubai"
        sub="Straight-talking guides on clearing furniture, appliances, villas and offices — plus decluttering tips and eco-friendly disposal advice tailored to Dubai living."
      >
        <Cta variant="wa" size="lg" />
        <Cta variant="schedule" size="lg" />
      </PageHero>

      {/* 2 — Featured Article (only when one is available) */}
      {featured && (
        <section className="container-prose py-16 md:py-20">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-action">
                Featured
              </p>
              <h2 className="mt-2 text-3xl font-bold md:text-4xl">Editor&apos;s Pick</h2>
            </div>
          </div>
          <FeaturedArticleCard article={featured} />
        </section>
      )}

      {/* 3 — Latest Articles grid (data-driven; graceful empty state) */}
      <section className={`container-prose py-16 md:py-20 ${featured ? "pt-0 md:pt-0" : ""}`}>
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-action">Latest</p>
          <h2 className="mt-2 text-3xl font-bold md:text-4xl">Latest Articles</h2>
        </div>
        <ArticleGrid articles={latest} />
      </section>

      {/* 4 — Internal links to pillar pages */}
      <section className="bg-surface py-16 md:py-20">
        <div className="container-prose">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-action">Explore</p>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">Keep Exploring</h2>
            <p className="mt-4 text-muted-foreground">
              Ready to book, or want to know more? Head to the pages Dubai residents use most.
            </p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {internalLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-soft transition hover:-translate-y-1 hover:border-action hover:shadow-elevated"
              >
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-secondary text-primary transition group-hover:bg-action group-hover:text-action-foreground">
                  <l.icon className="h-6 w-6" strokeWidth={1.8} />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold">{l.label}</h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{l.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:text-action">
                  Visit <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5 — CTA */}
      <CtaBanner heading="Skip the Reading - Let's Just Clear It for You." />
    </>
  );
}
