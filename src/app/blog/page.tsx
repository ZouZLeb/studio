import { getAllPosts, getAllCategories } from '@/lib/posts';
import type { Metadata } from 'next';
import { PostCard } from '@/components/blog/PostCard';
import { BlogSidebar } from '@/components/blog/BlogSidebar';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Blog | AImatic',
  description:
    'AI automation insights, tutorials, and updates from the AImatic team.',
  alternates: { canonical: 'https://aimatic.dev/blog' },
  openGraph: {
    type: 'website',
    title: 'Blog | AImatic',
    description: 'AI automation insights, tutorials, and updates from the AImatic team.',
    url: 'https://aimatic.dev/blog',
  },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = getAllCategories();

  return (
    <main className="max-w-7xl mx-auto px-6 py-24">
      <div className="mb-16 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6">
          Knowledge Base
        </div>
        <h1 className="text-4xl md:text-5xl font-black font-headline tracking-tight mb-4">
          The <span className="text-primary">AImatic</span> Blog
        </h1>
        <p className="text-muted-foreground text-lg leading-relaxed">
          Deep dives, automation tutorials, and insights from our engineering team in San Diego.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Post grid */}
        <div className="flex-1">
          {posts.length === 0 ? (
            <p className="text-muted-foreground">No posts published yet.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2">
              {posts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <BlogSidebar categories={categories} />
      </div>
    </main>
  );
}
