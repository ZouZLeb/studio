import Link from 'next/link';
import type { Post } from '@/lib/posts';

type Props = { posts: Post[] };

export function RelatedPosts({ posts }: Props) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block rounded-xl border border-border bg-card p-5 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
          >
            {post.frontmatter.category && (
              <span className="text-xs font-bold uppercase tracking-widest text-primary mb-2 block">
                {post.frontmatter.category}
              </span>
            )}
            <h3 className="font-semibold text-base group-hover:text-primary transition-colors leading-snug mb-2">
              {post.frontmatter.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {post.frontmatter.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
