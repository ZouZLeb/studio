import { getAllPosts, getAllCategories } from '@/lib/posts';
import { PostCard } from '@/components/blog/PostCard';
import { BlogSidebar } from '@/components/blog/BlogSidebar';
import type { Metadata } from 'next';

type Props = { params: Promise<{ category: string }> };

export async function generateStaticParams() {
  return getAllCategories().map((category) => ({
    category: category.toLowerCase().replace(/\s+/g, '-'),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const decoded = decodeURIComponent(category).replace(/-/g, ' ');
  return {
    title: `${decoded} | Blog | AImatic`,
    description: `Browse all AImatic blog posts in the ${decoded} category.`,
    alternates: {
      canonical: `https://aimatic.dev/blog/category/${category}`,
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category).replace(/-/g, ' ');

  const allPosts = getAllPosts();
  const categories = getAllCategories();

  const posts = allPosts.filter(
    (p) =>
      p.frontmatter.category?.toLowerCase() === decodedCategory.toLowerCase(),
  );

  return (
    <main className="max-w-7xl mx-auto px-6 py-24">
      <div className="mb-16 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6">
          Category
        </div>
        <h1 className="text-4xl md:text-5xl font-black font-headline tracking-tight mb-4 capitalize">
          {decodedCategory}
        </h1>
        <p className="text-muted-foreground text-lg leading-relaxed">
          {posts.length} post{posts.length !== 1 ? 's' : ''} published.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-1">
          {posts.length === 0 ? (
            <p className="text-muted-foreground">No posts in this category.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2">
              {posts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </div>
        <BlogSidebar
          categories={categories}
          activeCategory={decodedCategory}
        />
      </div>
    </main>
  );
}
