import { Layout } from "@/components/Layout";
import { ArticleCard, ArticleCardSkeleton } from "@/components/ArticleCard";
import { useGetArticles } from "@workspace/api-client-react";
import { useRoute, Link } from "wouter";
import categories from "@/data/categories.json";

function slugToTitle(slug: string) {
  return slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

export default function Category() {
  const [, params] = useRoute("/category/:rest*");
  const parts = ((params as { rest?: string })?.rest || "").split("/").filter(Boolean);

  const categorySlug = parts[0] || "all";
  const subcategorySlug = parts[1] || null;

  const categoryDef = categories.find(c => c.slug === categorySlug);
  const subcategoryDef = subcategorySlug
    ? categoryDef?.subcategories.find(s => s.slug === subcategorySlug)
    : null;

  const categoryName = categoryDef?.name || slugToTitle(categorySlug);
  const subcategoryName = subcategoryDef?.name || (subcategorySlug ? slugToTitle(subcategorySlug) : null);

  const displayTitle = subcategoryName ? subcategoryName : categoryName;
  const displayDescription = subcategoryName
    ? `Explore our curated ${subcategoryName.toLowerCase()} articles within ${categoryName.toLowerCase()}.`
    : `Explore our curated selection of ${categoryName.toLowerCase()} guides, reviews, and latest news.`;

  const { data: articlesData, isLoading } = useGetArticles({
    category: categorySlug === "all" ? undefined : categoryName,
    limit: 18,
  });

  return (
    <Layout>
      {/* Category Hero */}
      <section className="pt-24 pb-16 border-b border-border bg-card/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-50" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Breadcrumb */}
          <nav className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span className="text-primary/50">›</span>
            {subcategoryName ? (
              <>
                <Link href={`/category/${categorySlug}`} className="hover:text-primary transition-colors">
                  {categoryName}
                </Link>
                <span className="text-primary/50">›</span>
                <span className="text-foreground">{subcategoryName}</span>
              </>
            ) : (
              <span className="text-foreground">{categoryName}</span>
            )}
          </nav>

          <h1 className="text-5xl md:text-6xl font-serif font-black text-gold-gradient mb-6">
            {displayTitle}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {displayDescription}
          </p>
          {articlesData && (
            <div className="mt-8 text-sm font-bold text-primary tracking-widest uppercase">
              {articlesData.total} Articles Found
            </div>
          )}

          {/* Subcategory pills */}
          {categoryDef && !subcategorySlug && (
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              {categoryDef.subcategories.map(sub => (
                <Link
                  key={sub.slug}
                  href={`/category/${categorySlug}/${sub.slug}`}
                  className="px-4 py-1.5 rounded-full border border-primary/20 text-primary/70 text-sm font-medium hover:border-primary hover:text-primary hover:bg-primary/10 transition-all duration-200"
                >
                  {sub.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Article Grid */}
      <section className="py-24 min-h-[50vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              <>
                <ArticleCardSkeleton />
                <ArticleCardSkeleton />
                <ArticleCardSkeleton />
                <ArticleCardSkeleton />
                <ArticleCardSkeleton />
                <ArticleCardSkeleton />
              </>
            ) : articlesData?.articles?.length ? (
              articlesData.articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))
            ) : (
              <div className="col-span-full text-center py-24 glass-card rounded-2xl border-dashed">
                <p className="text-xl text-muted-foreground font-serif">No articles found in this category.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}
