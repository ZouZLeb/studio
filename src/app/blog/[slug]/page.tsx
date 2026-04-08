import { getAllPosts, getPostBySlug, getRelatedPosts } from '@/lib/posts';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { RelatedPosts } from '@/components/blog/RelatedPosts';
import Link from 'next/link';

const SITE_URL = 'https://aimatic.dev';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const { frontmatter } = post;

  return {
    title: `${frontmatter.title} | AImatic Blog`,
    description: frontmatter.description,
    alternates: {
      canonical:
        frontmatter.canonicalUrl ?? `${SITE_URL}/blog/${frontmatter.slug}`,
    },
    openGraph: {
      type: 'article',
      title: frontmatter.ogTitle ?? frontmatter.title,
      description: frontmatter.ogDescription ?? frontmatter.description,
      url: `${SITE_URL}/blog/${frontmatter.slug}`,
      publishedTime: frontmatter.publishedAt,
      modifiedTime: frontmatter.updatedAt,
      tags: frontmatter.tags,
      images: frontmatter.ogImage
        ? [{ url: frontmatter.ogImage, width: 1200, height: 630 }]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: frontmatter.ogTitle ?? frontmatter.title,
      description: frontmatter.ogDescription ?? frontmatter.description,
      images: frontmatter.ogImage ? [frontmatter.ogImage] : [],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return notFound();

  const { frontmatter, content } = post;
  const related = getRelatedPosts(slug);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: frontmatter.title,
    description: frontmatter.description,
    datePublished: frontmatter.publishedAt,
    dateModified: frontmatter.updatedAt ?? frontmatter.publishedAt,
    url: `${SITE_URL}/blog/${slug}`,
    image: frontmatter.ogImage ?? undefined,
    keywords: frontmatter.tags?.join(', '),
    articleSection: frontmatter.category,
    publisher: {
      '@type': 'Organization',
      name: 'AImatic Dev Solutions',
      url: SITE_URL,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="max-w-4xl mx-auto px-6 py-24">
        {/* Breadcrumb back link */}
        <Link
          href="/blog"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 inline-block"
        >
          ← Back to Blog
        </Link>

        {/* Featured Banner Image */}
        {frontmatter.bannerImage && (
          <div className="mb-10 w-full aspect-video md:aspect-[21/9] relative rounded-2xl overflow-hidden shadow-lg border border-border bg-muted">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={frontmatter.bannerImage} 
              alt={frontmatter.title} 
              className="object-cover w-full h-full"
            />
          </div>
        )}

        {/* Post header */}
        <header className="mb-10">
          {frontmatter.category && (
            <Link
              href={`/blog/category/${frontmatter.category.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-xs font-bold uppercase tracking-widest text-primary mb-3 inline-block hover:underline"
            >
              {frontmatter.category}
            </Link>
          )}

          <h1 className="text-4xl font-bold tracking-tight mb-4 leading-tight">
            {frontmatter.title}
          </h1>

          <p className="text-muted-foreground text-sm">
            Published{' '}
            <time dateTime={frontmatter.publishedAt}>
              {new Date(frontmatter.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            {frontmatter.updatedAt &&
              frontmatter.updatedAt !== frontmatter.publishedAt && (
                <>
                  {' '}
                  · Updated{' '}
                  <time dateTime={frontmatter.updatedAt}>
                    {new Date(frontmatter.updatedAt).toLocaleDateString(
                      'en-US',
                      {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      },
                    )}
                  </time>
                </>
              )}
          </p>

          {frontmatter.tags && frontmatter.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {frontmatter.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 rounded-full bg-muted text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Featured YouTube Video */}
        {frontmatter.youtubeVideoId && (
          <div className="mb-10 aspect-video w-full rounded-2xl overflow-hidden shadow-lg border border-border bg-black">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${frontmatter.youtubeVideoId}`}
              title="Featured YouTube video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}

        {/* MDX body pre-compiled at build time */}
        <article 
          className="prose prose-neutral dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: content }}
        />

        {/* Related posts */}
        {related.length > 0 && (
          <section className="mt-16 pt-12 border-t border-border">
            <RelatedPosts posts={related} />
          </section>
        )}
      </main>
    </>
  );
}
