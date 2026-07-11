import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AreaPageTemplate } from "@/components/area/AreaPageTemplate";
import { getAreaContent } from "@/data/area-content";
import { getValidAreaSlugs, isValidAreaData } from "@/lib/area/validation";
import { getHeroImage } from "@/lib/area/hero-images";
import { auditAreaRegistry } from "@/lib/seo/audit";
import { absoluteUrl } from "@/lib/site-config";

type Props = { params: Promise<{ slug: string }> };

// Runs once at build. Fails the build on any SEO governance violation, then
// returns the published (valid) area slugs to statically generate.
export function generateStaticParams() {
  auditAreaRegistry();
  return getValidAreaSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const area = getAreaContent(slug);
  if (!area || !isValidAreaData(area)) return { title: "Area Not Found" };

  const hero = getHeroImage(area);

  return {
    title: area.metaTitle,
    description: area.metaDescription,
    alternates: { canonical: absoluteUrl(`/areas/${area.slug}`) },
    openGraph: {
      title: area.ogTitle ?? area.metaTitle,
      description: area.ogDescription ?? area.metaDescription,
      url: absoluteUrl(`/areas/${area.slug}`),
      images: [{ url: hero.src, alt: hero.alt }],
    },
    twitter: {
      card: "summary_large_image",
      images: [hero.src],
    },
  };
}

export default async function AreaDetailPage({ params }: Props) {
  const { slug } = await params;
  const area = getAreaContent(slug);
  if (!area || !isValidAreaData(area)) notFound();

  return <AreaPageTemplate area={area} />;
}
