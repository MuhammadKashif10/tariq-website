// =============================================================================
// ARTICLES REGISTRY — single source of truth for the Blog
// -----------------------------------------------------------------------------
// Every published blog article lives here. The Blog Listing page (/blog) and,
// later, the single-article route both read exclusively from this registry —
// there is NO hardcoded article content anywhere in the UI. Add an entry here
// and it renders automatically (featured slot, latest grid, sitemap, schema)
// with zero code changes. Scales cleanly to hundreds of posts.
//
// This registry is intentionally EMPTY until real articles are authored. The
// listing page is fully data-driven and degrades gracefully to an empty state.
//
// GOVERNANCE: consumers must go through the helpers below (getPublishedArticles,
// getFeaturedArticle, …) which validate, de-duplicate and order entries — never
// map over `articles` directly in a component.
// =============================================================================

/** Editorial categories. Keep this list curated; a card's category must be one of these. */
export const ARTICLE_CATEGORIES = [
  "Guides",
  "Tips & Advice",
  "Sustainability",
  "Dubai Living",
  "Pricing",
] as const;

export type ArticleCategory = (typeof ARTICLE_CATEGORIES)[number];

export interface ArticleImage {
  /** Local path under /public (e.g. "/images/blog/my-post.webp") for next/image optimization. */
  src: string;
  /** Descriptive, article-specific alt text — never generic. */
  alt: string;
}

export interface ArticleFaqItem {
  q: string;
  a: string;
}

// -----------------------------------------------------------------------------
// CONTENT MODEL — a structured block union renders the article body.
// This is deliberately a discriminated union: NEW block variants (e.g. "video",
// "download", "callout") are additive and require no change to the template
// architecture — only a new `case` in the block renderer. Article bodies are
// authored as data, never as hardcoded JSX.
// -----------------------------------------------------------------------------
export type ArticleBlock =
  | {
      type: "heading";
      level: 2 | 3;
      text: string;
      /** stable anchor id (enables a future TOC / deep links). */ id: string;
    }
  | { type: "paragraph"; text: string }
  | { type: "list"; ordered?: boolean; items: string[] }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "quote"; text: string; attribution?: string };

export interface Article {
  /** URL-safe unique identifier. Maps to /blog/{slug}. */
  slug: string;
  title: string;
  /** 1–2 sentence summary shown on cards and used as the meta/OG description fallback. */
  excerpt: string;
  category: ArticleCategory;
  /** ISO 8601 date (YYYY-MM-DD). Drives ordering and the visible publish date. */
  publishedAt: string;
  /** ISO 8601 date of the last meaningful edit. Optional; feeds dateModified. */
  updatedAt?: string;
  /** Whole-minute reading estimate, shown as "N min read". */
  readingTimeMinutes: number;
  /** Featured image (hero, card thumbnail + OpenGraph image). */
  image: ArticleImage;
  /** The article body, as structured content blocks. */
  content: ArticleBlock[];
  /** Optional per-article FAQ. Renders (and emits FAQ schema) only when present. */
  faq?: ArticleFaqItem[];
  /**
   * Optional explicit related-article slugs (curated ordering). Every slug MUST
   * resolve to a published article or the build fails. When omitted, related
   * articles are derived automatically (same category, then newest).
   */
  relatedSlugs?: string[];
  /** Promotes the post to the single Featured slot. Newest featured post wins. */
  featured?: boolean;
  /** Byline. Falls back to the organisation when omitted. */
  author?: string;
  /** Free-form topical tags (future-proofing: tag pages, filtering). */
  tags?: string[];
  /** SEO overrides — fall back to title / excerpt when omitted. */
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
}

// -----------------------------------------------------------------------------
// THE REGISTRY — published articles.
// -----------------------------------------------------------------------------
export const articles: Article[] = [
  {
    slug: "junk-removal-cost-dubai",
    title: "Junk Removal Cost in Dubai: What Really Affects the Price",
    excerpt:
      "Junk removal in Dubai isn't priced from a fixed menu. Here's what genuinely determines the cost — and how to get an accurate quote you can trust.",
    category: "Pricing",
    publishedAt: "2026-07-12",
    readingTimeMinutes: 7,
    featured: true,
    tags: ["Junk Removal Cost", "Pricing", "Home Clearance", "Dubai"],
    keywords: [
      "junk removal cost dubai",
      "junk removal price dubai",
      "cost of junk removal dubai",
      "junk disposal cost dubai",
      "house clearance cost dubai",
    ],
    metaTitle: "Junk Removal Cost in Dubai: What Affects the Price",
    metaDescription:
      "Understand what shapes junk removal cost in Dubai — volume, item type, access and disposal — plus how to get an accurate quote and keep the price sensible.",
    image: {
      src: "/images/blog/junk-removal-cost-dubai.webp",
      alt: "Household items and cardboard boxes gathered together before a home clear-out in Dubai.",
    },
    relatedSlugs: ["furniture-disposal-dubai"],
    content: [
      {
        type: "paragraph",
        text: "Deciding to clear out unwanted items is easy. Working out what it will cost is where most people in Dubai get stuck. Junk removal doesn't come from a fixed price list, so two homes on the same street can pay noticeably different amounts depending on what needs to go and how easily a crew can reach it. This guide breaks down what actually shapes the cost, so you can budget sensibly and compare quotes with confidence.",
      },
      {
        type: "heading",
        level: 2,
        id: "how-pricing-works",
        text: "How junk removal is usually priced in Dubai",
      },
      {
        type: "paragraph",
        text: "Most junk removal in Dubai is quoted in one of three ways. Knowing which model a provider is using makes their quote far easier to understand.",
      },
      {
        type: "list",
        items: [
          "By volume — you pay for how much of the vehicle your items fill, often described as a quarter load, half load or full load.",
          "By item — a set charge per piece, common for one-off pickups such as a single sofa, fridge or mattress.",
          "By the job — one combined price to clear a whole room, apartment or villa in a single visit.",
        ],
      },
      {
        type: "paragraph",
        text: "None of these is automatically cheaper than the others. The right model depends on how much you have and how mixed it is. A single bulky item and a full villa clear-out are simply different kinds of job.",
      },
      {
        type: "heading",
        level: 2,
        id: "cost-factors",
        text: "What affects the cost of junk removal in Dubai",
      },
      {
        type: "paragraph",
        text: "Beyond the pricing model, a handful of practical factors push the final figure up or down. These are the things worth thinking about before you ask for a quote.",
      },
      {
        type: "heading",
        level: 3,
        id: "volume",
        text: "The volume of items",
      },
      {
        type: "paragraph",
        text: "Volume is usually the single biggest driver. More items mean more vehicle space, more loading time, and sometimes a second trip. A quick way to gauge your own job is to picture how much of a pickup truck your things would fill once they're stacked together.",
      },
      {
        type: "heading",
        level: 3,
        id: "item-type",
        text: "The type of items",
      },
      {
        type: "paragraph",
        text: "What you're removing matters as much as how much. Light, easy-to-carry items are simple. Bulky, heavy or awkward pieces — wardrobes, sofa beds, treadmills, large desks — need more people and more care. Some categories also call for special handling: appliances and electronics belong in proper appliance and e-waste streams rather than general waste, and anything with refrigerant, batteries or chemicals has to be dealt with responsibly.",
      },
      {
        type: "image",
        src: "/images/blog/bulky-furniture-heavy-item.webp",
        alt: "A person lifting a heavy wooden table during a home clearance.",
        caption: "Bulky and heavy pieces take more hands and more time, which affects the price.",
      },
      {
        type: "heading",
        level: 3,
        id: "access",
        text: "How easy your junk is to reach",
      },
      {
        type: "paragraph",
        text: "In a city built around high-rise living, access is a genuine cost factor. A ground-floor villa with a driveway is quick to work. A high-floor apartment that needs a service lift booked through building management, a long walk to the loading bay, or tight stairwells all add time — and time is what you're paying for. Villa communities such as Arabian Ranches or Dubai Hills are usually straightforward for a truck to reach, while towers in Dubai Marina or JLT often involve lift scheduling and building access rules.",
      },
      {
        type: "heading",
        level: 3,
        id: "labour",
        text: "Labour and dismantling",
      },
      {
        type: "paragraph",
        text: "Some items only leave the room once they come apart. Fitted wardrobes, bunk beds and large office desks often need dismantling before they can be carried out. The more hands and the more disassembly a job needs, the more it costs to finish.",
      },
      {
        type: "heading",
        level: 3,
        id: "disposal",
        text: "Disposal and recycling",
      },
      {
        type: "paragraph",
        text: "Responsible providers don't simply dump everything in one place. Usable items may be set aside for donation, recyclable materials separated out, and the rest taken to appropriate facilities. Handling waste properly carries its own cost, and that's reflected in a fair quote. It's also the part worth paying for — it's what stops your clear-out ending up dumped somewhere it shouldn't be.",
      },
      {
        type: "image",
        src: "/images/blog/loaded-junk-removal-truck-dubai.webp",
        alt: "A truck loaded with discarded items and waste ready to be taken away.",
        caption: "Where your junk ends up is part of the job — and part of the cost.",
      },
      {
        type: "heading",
        level: 2,
        id: "apartment-vs-villa",
        text: "Why apartments and villas often cost different amounts",
      },
      {
        type: "paragraph",
        text: "Two jobs with an identical pile of junk can still land at different prices depending on the setting. Apartment clearances in Dubai's towers tend to involve lift bookings, shared corridors and tighter timing windows. Villa clearances usually offer easier vehicle access, but often come with larger volumes once gardens, storerooms and maid's rooms are included. Neither is inherently more expensive — they simply present different challenges.",
      },
      {
        type: "heading",
        level: 2,
        id: "accurate-quote",
        text: "How to get an accurate quote",
      },
      {
        type: "paragraph",
        text: "The clearer you are about the job, the more accurate — and comparable — your quotes will be. Before you contact a provider, it helps to do a few things:",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Take a few photos or a short video of everything you want removed.",
          "Note any large or heavy items separately, along with anything that needs dismantling.",
          "Mention your floor, whether there's lift access, and how far the nearest loading point is.",
          "Say whether you need a single item collected or a whole space cleared.",
        ],
      },
      {
        type: "paragraph",
        text: "With that information, a provider can give you a firm figure rather than a rough guess, and you'll be comparing like with like across different quotes.",
      },
      {
        type: "heading",
        level: 2,
        id: "reduce-cost",
        text: "Practical ways to keep the cost down",
      },
      {
        type: "paragraph",
        text: "You have more control over the price than you might expect.",
      },
      {
        type: "list",
        items: [
          "Sell or donate anything still usable before the crew arrives — less volume, lower cost.",
          "Gather items into one accessible spot so loading is quicker.",
          "Combine a clear-out with a neighbour, or with an end-of-tenancy move, to fill a load efficiently.",
          "Clear a path to the door in advance so no time is lost shifting things around.",
        ],
      },
      {
        type: "heading",
        level: 2,
        id: "same-day",
        text: "Does same-day junk removal cost more?",
      },
      {
        type: "paragraph",
        text: "Not necessarily. Same-day junk removal is about availability rather than a premium tier — it comes down to whether a crew and vehicle are free when you need them. If your schedule is flexible, booking a slot that suits the provider's route can sometimes be the more efficient choice. If you need something gone today, same-day options across Dubai make that possible.",
      },
      {
        type: "heading",
        level: 2,
        id: "bottom-line",
        text: "The bottom line",
      },
      {
        type: "paragraph",
        text: "There's no single price tag for junk removal in Dubai because no two clear-outs are identical. Volume, item type, access and disposal all feed into the final number. The most reliable way to know what your job will cost is to describe it accurately and ask for a proper quote — whether that's a one-off furniture removal, a full house or villa clearance, construction debris after a renovation, or responsible e-waste disposal. Understanding the factors above puts you in a much stronger position to judge whether a quote is fair.",
      },
    ],
    faq: [
      {
        q: "How is junk removal priced in Dubai?",
        a: "It's usually quoted by volume (how much of the truck your items fill), by individual item, or as a single price to clear a whole space. The model varies by provider, so it's worth asking which one applies to your quote.",
      },
      {
        q: "Does the amount of junk or the type of items matter more?",
        a: "Both matter, but volume is normally the biggest factor because it decides how much vehicle space and loading time you need. Heavy or awkward items add to that by requiring more people and careful handling.",
      },
      {
        q: "Will bulky or heavy furniture cost more to remove?",
        a: "Generally yes. Large items such as wardrobes, sofa beds and appliances take more labour, sometimes need dismantling, and take up more space in the vehicle — all of which affects the price.",
      },
      {
        q: "Can I get a fixed price before the job starts?",
        a: "Usually, if you provide clear details. Photos or a short video of the items, along with your floor and access situation, let a provider give a firm figure rather than an on-the-day estimate.",
      },
      {
        q: "Do high-floor apartments cost more to clear than villas?",
        a: "Not automatically. High floors can add time if a service lift needs booking or access is tight, while villas may involve larger volumes. The setting changes the challenge more than it changes a fixed rate.",
      },
    ],
  },
  {
    slug: "furniture-disposal-dubai",
    title: "Furniture Disposal in Dubai: How to Get Rid of Old Furniture",
    excerpt:
      "From donating and reselling to booking a proper collection, here are your real options for disposing of old furniture in Dubai — and how to do it responsibly.",
    category: "Guides",
    publishedAt: "2026-07-12",
    readingTimeMinutes: 7,
    tags: ["Furniture Disposal", "Recycling", "Home Clearance", "Dubai"],
    keywords: [
      "furniture disposal dubai",
      "old furniture disposal dubai",
      "get rid of furniture dubai",
      "sofa disposal dubai",
      "furniture removal dubai",
    ],
    metaTitle: "Furniture Disposal in Dubai: Your Options Explained",
    metaDescription:
      "A practical guide to furniture disposal in Dubai — how to donate, sell, recycle or remove old furniture responsibly, and how to prepare it for collection.",
    image: {
      src: "/images/blog/furniture-disposal-dubai.webp",
      alt: "An old sofa left outdoors against a wall, ready for furniture disposal.",
    },
    relatedSlugs: ["junk-removal-cost-dubai"],
    content: [
      {
        type: "paragraph",
        text: "Old furniture has a way of lingering. A sofa you've replaced, a bed frame from a previous flat, an office desk that no longer fits — they sit in a spare room or out on a balcony because getting rid of them in Dubai isn't always obvious. The good news is that you have several genuine options, from giving a piece a second life to arranging a proper collection. This guide walks through each one so you can pick the route that suits your situation.",
      },
      {
        type: "heading",
        level: 2,
        id: "what-it-involves",
        text: "What furniture disposal actually involves",
      },
      {
        type: "paragraph",
        text: "Furniture disposal simply means responsibly getting an unwanted piece out of your home and on to wherever it should go next — a new owner, a recycling stream, or a licensed disposal facility. In Dubai, the challenge is rarely the decision to let something go. It's the logistics of moving a heavy item out of an apartment or villa and making sure it's dealt with properly once it's out.",
      },
      {
        type: "heading",
        level: 2,
        id: "options",
        text: "Your options for getting rid of furniture in Dubai",
      },
      {
        type: "paragraph",
        text: "There's no single right answer here. The best choice depends on the item's condition, its size, and how quickly you need it gone.",
      },
      {
        type: "heading",
        level: 3,
        id: "donate",
        text: "Donate furniture that still has life in it",
      },
      {
        type: "paragraph",
        text: "If a piece is clean and functional, donating is often the most satisfying route. Usable furniture is frequently passed on within communities, to people setting up a first home, or to those who can put it to good use. Keeping a sturdy item in circulation is far better than sending it to waste, and it usually costs you nothing beyond arranging transport.",
      },
      {
        type: "heading",
        level: 3,
        id: "sell",
        text: "Sell or give it away online",
      },
      {
        type: "paragraph",
        text: "Dubai has an active second-hand culture. Marketplaces such as Dubizzle and community buy-and-sell groups make it easy to list a sofa, dining set or wardrobe — either for a small sum or free to whoever collects it. This works best when you have a little time to spare and an item that people still want.",
      },
      {
        type: "image",
        src: "/images/blog/rearranging-sofa-living-room.webp",
        alt: "Two people repositioning a grey sofa inside a living room.",
        caption: "A well-kept sofa in good condition is often easiest to pass on to a new owner.",
      },
      {
        type: "heading",
        level: 3,
        id: "recycle",
        text: "Recycle what can't be reused",
      },
      {
        type: "paragraph",
        text: "Not every piece finds a second owner. Furniture is usually a mix of materials — wood, metal, foam and glass — and some of that can be recycled rather than sent to landfill. Separating materials where you can, or using a service that does it for you, keeps more out of general waste.",
      },
      {
        type: "heading",
        level: 3,
        id: "removal-service",
        text: "Arrange a furniture removal or clearance service",
      },
      {
        type: "paragraph",
        text: "When an item is broken, bulky, or you simply don't have the time or means to move it, a removal service is the straightforward option. A crew handles the lifting, works around lifts and stairs, and takes the piece away for donation, recycling or proper disposal in one visit. It's the usual choice for heavy pieces, several items at once, or a full clear-out.",
      },
      {
        type: "image",
        src: "/images/blog/moving-old-couch-out-dubai.webp",
        alt: "A worker carrying a large couch out of a building.",
        caption: "For heavy or bulky pieces, a removal crew handles the lifting and transport.",
      },
      {
        type: "heading",
        level: 2,
        id: "bins",
        text: "Why you shouldn't just leave furniture by the bins",
      },
      {
        type: "paragraph",
        text: "It's tempting to carry an old chair down to the nearest bin area and walk away, but bulky furniture isn't part of standard household waste collection. Most buildings and gated communities in Dubai ask residents to arrange bulky-item removal separately, and leaving furniture beside communal bins can block access and create problems for building management and your neighbours. Arranging a proper collection avoids all of that.",
      },
      {
        type: "heading",
        level: 2,
        id: "prepare",
        text: "How to prepare furniture for collection",
      },
      {
        type: "paragraph",
        text: "A little preparation makes disposal faster and safer, especially in a high-rise.",
      },
      {
        type: "list",
        items: [
          "Empty drawers, shelves and any storage compartments.",
          "Dismantle flat-pack or bolted items if you can — it makes them easier to carry and kinder on walls and lifts.",
          "Measure doorways, corridors and the lift if the piece is large.",
          "Book the service lift with building management where one is required.",
          "Protect floors and clear a path to the door before the crew arrives.",
        ],
      },
      {
        type: "heading",
        level: 2,
        id: "settings",
        text: "Apartment, villa and office furniture",
      },
      {
        type: "paragraph",
        text: "The setting shapes the job. In apartment towers around areas like Dubai Marina or JLT, the main considerations are lift access and timing. In villa communities such as Arabian Ranches or Dubai Hills, access is usually easier, but volumes can be larger once you add garden furniture, storerooms and spare rooms. Offices bring their own needs — desks, chairs and storage units in quantity, often on a schedule that avoids disrupting the working day. Larger office or property clear-outs are typically handled as a full clearance rather than piece by piece.",
      },
      {
        type: "image",
        src: "/images/blog/cleared-living-room-after-furniture-removal.webp",
        alt: "An empty living room with wooden flooring after the furniture has been removed.",
        caption:
          "The end goal: a cleanly cleared space, with the old furniture responsibly dealt with.",
      },
      {
        type: "heading",
        level: 2,
        id: "choosing",
        text: "Choosing a furniture disposal service",
      },
      {
        type: "paragraph",
        text: "If you decide to book a collection, a few things separate a considered service from a van that just hauls things away:",
      },
      {
        type: "list",
        items: [
          "Responsible disposal — items donated, recycled or taken to licensed facilities rather than dumped.",
          "Careful handling — crews who protect your floors, walls and shared corridors.",
          "Dismantling included — so fitted or oversized pieces can actually leave the room.",
          "Clear communication — a firm quote based on the items and access, not vague on-the-day pricing.",
        ],
      },
      {
        type: "paragraph",
        text: "Getting these right matters more than speed alone — though same-day collection is available across Dubai when you need a piece gone quickly.",
      },
      {
        type: "heading",
        level: 2,
        id: "conclusion",
        text: "Making the right choice for your furniture",
      },
      {
        type: "paragraph",
        text: "Disposing of furniture in Dubai comes down to matching the method to the item. Something in good condition deserves a second life through donation or resale; something broken or bulky is usually best handled by a removal service that will lift, transport and dispose of it responsibly. Whichever route you take, the goal is the same — clearing the space cleanly without cutting corners on where your old furniture ends up.",
      },
    ],
    faq: [
      {
        q: "What's the easiest way to get rid of a sofa in Dubai?",
        a: "For a usable sofa, listing it online or offering it within your community often finds a taker quickly. For a worn or bulky one, a furniture removal service is simplest — they handle the lifting and take it away for donation, recycling or disposal in a single visit.",
      },
      {
        q: "Can I donate used furniture in Dubai?",
        a: "Yes. Furniture in good, clean condition is regularly passed on within communities and to people setting up new homes. Donating keeps a usable item in circulation and is often free once transport is arranged.",
      },
      {
        q: "Do I need to dismantle furniture before it's collected?",
        a: "It helps but isn't always required. Taking flat-pack or bolted items apart makes them easier to move and protects walls and lifts, but many removal crews can dismantle pieces on site if needed.",
      },
      {
        q: "Can old furniture be recycled?",
        a: "Parts of it often can. Furniture usually combines wood, metal, foam and glass, and separating those materials — or using a service that does — keeps more out of general waste than throwing the whole piece away.",
      },
      {
        q: "How do I dispose of office furniture in Dubai?",
        a: "Office furniture is usually handled as a larger clearance because of the quantity involved — desks, chairs and storage together. Booking a service that can work around your operating hours and remove everything in one visit is generally the practical approach.",
      },
    ],
  },
];

// -----------------------------------------------------------------------------
// VALIDATION + ACCESSORS (the only supported way to read articles)
// -----------------------------------------------------------------------------

const isFilled = (v: unknown): v is string => typeof v === "string" && v.trim().length > 0;

const CATEGORY_SET = new Set<string>(ARTICLE_CATEGORIES);

/**
 * True when an entry is complete enough to publish (never render partial data).
 * This is the runtime guard used by the accessors below; the build-time audit
 * in `lib/blog/validation.ts` reports the same failures with descriptive
 * messages (and adds registry-wide checks like slug/metadata uniqueness).
 */
export function isValidArticle(a: Article): boolean {
  return (
    isFilled(a.slug) &&
    isFilled(a.title) &&
    isFilled(a.excerpt) &&
    CATEGORY_SET.has(a.category) &&
    isFilled(a.publishedAt) &&
    !Number.isNaN(Date.parse(a.publishedAt)) &&
    typeof a.readingTimeMinutes === "number" &&
    a.readingTimeMinutes > 0 &&
    !!a.image &&
    isFilled(a.image.src) &&
    isFilled(a.image.alt) &&
    Array.isArray(a.content) &&
    a.content.length > 0
  );
}

const byNewest = (a: Article, b: Article) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt);

/**
 * All publishable articles, de-duplicated by slug and ordered newest-first.
 * The single source of truth for every blog surface (listing, sitemap, schema).
 */
export function getPublishedArticles(): Article[] {
  const seen = new Set<string>();
  return articles
    .filter(isValidArticle)
    .filter((a) => {
      if (seen.has(a.slug)) return false;
      seen.add(a.slug);
      return true;
    })
    .sort(byNewest);
}

/** The single Featured article (newest post flagged `featured`), or null if none. */
export function getFeaturedArticle(): Article | null {
  return getPublishedArticles().find((a) => a.featured) ?? null;
}

/**
 * The latest articles for the grid. Excludes the given slug (typically the
 * featured post so it isn't shown twice) and optionally caps the count.
 */
export function getLatestArticles(
  options: { excludeSlug?: string; limit?: number } = {},
): Article[] {
  const { excludeSlug, limit } = options;
  const list = getPublishedArticles().filter((a) => a.slug !== excludeSlug);
  return typeof limit === "number" ? list.slice(0, limit) : list;
}

export function getArticleBySlug(slug: string): Article | undefined {
  return getPublishedArticles().find((a) => a.slug === slug);
}

/** Distinct categories that actually have published articles (for future filters). */
export function getActiveCategories(): ArticleCategory[] {
  const present = new Set(getPublishedArticles().map((a) => a.category));
  return ARTICLE_CATEGORIES.filter((c) => present.has(c));
}

/**
 * Related articles for a given article, always drawn from the registry:
 *   1. explicit `relatedSlugs` (curated order), resolved through the registry;
 *   2. topped up with same-category posts, then the newest remaining posts.
 * Self is always excluded. Fails gracefully — returns [] when nothing qualifies.
 */
export function getRelatedArticles(article: Article, limit = 3): Article[] {
  const pool = getPublishedArticles().filter((a) => a.slug !== article.slug);
  const chosen: Article[] = [];
  const take = (a: Article) => {
    if (chosen.length < limit && !chosen.some((c) => c.slug === a.slug)) chosen.push(a);
  };

  for (const slug of article.relatedSlugs ?? []) {
    const match = pool.find((a) => a.slug === slug);
    if (match) take(match);
  }
  for (const a of pool.filter((a) => a.category === article.category)) take(a);
  for (const a of pool) take(a);

  return chosen.slice(0, limit);
}

/**
 * Neighbouring articles in chronological (newest-first) order.
 * `previous` is the newer post, `next` is the older post — either may be null.
 */
export function getAdjacentArticles(slug: string): {
  previous: Article | null;
  next: Article | null;
} {
  const list = getPublishedArticles();
  const i = list.findIndex((a) => a.slug === slug);
  if (i === -1) return { previous: null, next: null };
  return { previous: list[i - 1] ?? null, next: list[i + 1] ?? null };
}

/** Heading blocks of an article, for a future table of contents / deep links. */
export function getTableOfContents(article: Article): { id: string; text: string; level: 2 | 3 }[] {
  return article.content
    .filter((b): b is Extract<ArticleBlock, { type: "heading" }> => b.type === "heading")
    .map((b) => ({ id: b.id, text: b.text, level: b.level }));
}
