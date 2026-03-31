import Link from 'next/link';

type Props = {
  categories: string[];
  activeCategory?: string;
};

export function BlogSidebar({ categories, activeCategory }: Props) {
  return (
    <aside className="w-full lg:w-60 shrink-0">
      <div className="sticky top-24 space-y-8">
        {/* Categories */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
            Categories
          </h3>
          <nav className="flex flex-col gap-1">
            <Link
              href="/blog"
              className={`text-sm px-3 py-2 rounded-lg transition-colors ${
                !activeCategory
                  ? 'bg-primary text-primary-foreground font-semibold'
                  : 'hover:bg-muted text-foreground'
              }`}
            >
              All Posts
            </Link>
            {categories.map((category) => {
              const href = `/blog/category/${category.toLowerCase().replace(/\s+/g, '-')}`;
              const isActive =
                activeCategory?.toLowerCase() === category.toLowerCase();
              return (
                <Link
                  key={category}
                  href={href}
                  className={`text-sm px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary text-primary-foreground font-semibold'
                      : 'hover:bg-muted text-foreground'
                  }`}
                >
                  {category}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Back to site */}
        <div className="border-t border-border pt-6">
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to main site
          </Link>
        </div>
      </div>
    </aside>
  );
}
