import blogCache from './blog-cache.json';

export type PostFrontmatter = {
  title: string;
  slug: string;
  description: string;
  bannerImage?: string;
  youtubeVideoId?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonicalUrl?: string;
  tags?: string[];
  category?: string;
  publishedAt: string;
  updatedAt?: string;
  draft?: boolean;
};

export type Post = {
  frontmatter: PostFrontmatter;
  content: string;
  slug: string;
};

const posts = blogCache as Post[];

/** Read all published posts, sorted newest first. */
export function getAllPosts(): Post[] {
  return posts;
}

/** Get a single published post by slug. Returns null if not found or draft. */
export function getPostBySlug(slug: string): Post | null {
  return posts.find((p) => p.slug === slug) ?? null;
}

/** Get all unique categories from published posts. */
export function getAllCategories(): string[] {
  const categories = posts
    .map((p) => p.frontmatter.category)
    .filter((c): c is string => Boolean(c));
  return [...new Set(categories)];
}

/** Get all unique tags from published posts. */
export function getAllTags(): string[] {
  const tags = posts.flatMap((p) => p.frontmatter.tags ?? []);
  return [...new Set(tags)];
}

/** Get related posts scored by shared tags + same category, excluding the current post. */
export function getRelatedPosts(currentSlug: string, limit = 3): Post[] {
  const current = posts.find((p) => p.slug === currentSlug);
  if (!current) return [];

  const currentTags = current.frontmatter.tags ?? [];
  const currentCategory = current.frontmatter.category;

  return posts
    .filter((p) => p.slug !== currentSlug)
    .map((p) => {
      const sharedTags = (p.frontmatter.tags ?? []).filter((t) =>
        currentTags.includes(t),
      ).length;
      const sameCategory =
        p.frontmatter.category === currentCategory ? 1 : 0;
      return { post: p, score: sharedTags + sameCategory };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.post);
}
