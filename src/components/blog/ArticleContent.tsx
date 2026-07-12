import Image from "next/image";
import type { ArticleBlock } from "@/data/articles";

/**
 * Server component. Renders the article body from structured content blocks.
 * The switch is the single extension point: adding a new block variant (video,
 * download, callout…) means adding a case here — the template never changes.
 */
function Block({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "heading":
      return block.level === 2 ? (
        <h2 id={block.id} className="mt-12 scroll-mt-24 text-2xl font-bold md:text-3xl">
          {block.text}
        </h2>
      ) : (
        <h3 id={block.id} className="mt-8 scroll-mt-24 text-xl font-semibold">
          {block.text}
        </h3>
      );

    case "paragraph":
      return <p className="mt-5 leading-relaxed text-foreground/90">{block.text}</p>;

    case "list":
      return block.ordered ? (
        <ol className="mt-5 list-decimal space-y-2 pl-6 text-foreground/90">
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ol>
      ) : (
        <ul className="mt-5 list-disc space-y-2 pl-6 text-foreground/90">
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );

    case "image":
      return (
        <figure className="mt-8">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-border bg-secondary shadow-soft">
            <Image
              src={block.src}
              alt={block.alt}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          </div>
          {block.caption && (
            <figcaption className="mt-2 text-center text-sm text-muted-foreground">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );

    case "quote":
      return (
        <blockquote className="mt-8 border-l-4 border-action pl-5 italic text-foreground/90">
          <p>{block.text}</p>
          {block.attribution && (
            <cite className="mt-2 block text-sm not-italic text-muted-foreground">
              — {block.attribution}
            </cite>
          )}
        </blockquote>
      );

    default:
      return null;
  }
}

export function ArticleContent({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <div className="mx-auto max-w-3xl">
      {blocks.map((block, i) => (
        <Block key={i} block={block} />
      ))}
    </div>
  );
}
