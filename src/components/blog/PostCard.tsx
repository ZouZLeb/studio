import Link from 'next/link';
import Image from 'next/image';
import type { Post } from '@/lib/posts';

type Props = { post: Post };

export function PostCard({ post }: Props) {
  const { frontmatter, slug } = post;

  return (
    <article className="group flex flex-col h-full rounded-2xl border border-border/50 bg-card/40 backdrop-blur-sm overflow-hidden hover:shadow-2xl hover:shadow-primary/5 hover:border-primary/30 transition-all duration-500 hover:-translate-y-1">
      {/* Featured Image */}
      <Link href={`/blog/${slug}`} className="block relative w-full aspect-[16/9] overflow-hidden bg-muted/20">
        {frontmatter.bannerImage ? (
          <Image
            src={frontmatter.bannerImage}
            alt={frontmatter.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-muted/20 to-background" />
        )}
        {/* Overlay gradient for text readability if needed */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
      </Link>

      <div className="flex flex-col flex-1 p-6 relative">
        {frontmatter.category && (
          <div className="mb-4">
            <Link
              href={`/blog/category/${frontmatter.category.toLowerCase().replace(/\s+/g, '-')}`}
              className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary hover:bg-primary/20 transition-colors"
            >
              {frontmatter.category}
            </Link>
          </div>
        )}

        <Link href={`/blog/${slug}`} className="block mb-3">
          <h2 className="text-xl font-bold group-hover:text-primary transition-colors leading-snug line-clamp-3">
            {frontmatter.title}
          </h2>
        </Link>

        <p className="text-sm text-muted-foreground mb-6 line-clamp-3 flex-1 leading-relaxed">
          {frontmatter.description}
        </p>

        <div className="flex items-center justify-between mt-auto pt-5 border-t border-border/50">
          <time
            dateTime={frontmatter.publishedAt}
            className="text-xs font-medium text-muted-foreground/80 flex items-center gap-1.5"
          >
            {new Date(frontmatter.publishedAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </time>

          {frontmatter.tags && frontmatter.tags.length > 0 && (
            <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70">
              {frontmatter.tags.slice(0, 2).join(' · ')}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
