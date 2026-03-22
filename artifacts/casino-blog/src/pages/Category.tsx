import { Layout } from "@/components/Layout";
import { ArticleCard, ArticleCardSkeleton } from "@/components/ArticleCard";
import { useGetArticles } from "@workspace/api-client-react";
import { useRoute } from "wouter";

export default function Category() {
  const [, params] = useRoute("/category/:category");
  // Capitalize hyphenated slug to normal string for API/Display
  const categorySlug = params?.category || "all";
  const categoryName = categorySlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  const { data: articlesData, isLoading } = useGetArticles({ 
    category: categorySlug === "all" ? undefined : categoryName,
    limit: 18
  });

  return (
    <Layout>
      {/* Category Hero */}
      <section className="pt-24 pb-16 border-b border-border bg-card/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-50" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-black text-gold-gradient mb-6">
            {categoryName}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our curated selection of {categoryName.toLowerCase()} guides, reviews, and latest news to stay ahead of the game.
          </p>
          {articlesData && (
            <div className="mt-8 text-sm font-bold text-primary tracking-widest uppercase">
              {articlesData.total} Articles Found
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
