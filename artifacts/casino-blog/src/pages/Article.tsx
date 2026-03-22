import { Layout } from "@/components/Layout";
import { ReadingProgress } from "@/components/ReadingProgress";
import { AffiliateCard, AffiliateCardSkeleton } from "@/components/AffiliateCard";
import { ArticleCard } from "@/components/ArticleCard";
import { useGetArticleBySlug, useGetAffiliates, useGetArticles } from "@workspace/api-client-react";
import { useRoute, Link } from "wouter";
import { formatDate } from "@/lib/utils";
import { Clock, User, ChevronRight, Share2, Twitter, Facebook } from "lucide-react";
import { motion } from "framer-motion";

export default function Article() {
  const [, params] = useRoute("/articles/:slug");
  const slug = params?.slug || "";

  const { data: article, isLoading, error } = useGetArticleBySlug(slug, {
    query: { enabled: !!slug, retry: false }
  });
  
  const { data: affiliatesData, isLoading: loadingAffiliates } = useGetAffiliates();
  
  // Fetch related articles based on category
  const { data: relatedData } = useGetArticles(
    { category: article?.category || undefined, limit: 4 },
    { query: { enabled: !!article?.category } }
  );

  const relatedArticles = relatedData?.articles?.filter(a => a.id !== article?.id).slice(0, 3) || [];
  const imageUrl = article?.image || `${import.meta.env.BASE_URL}images/article-placeholder.png`;

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen pt-32 px-4 max-w-4xl mx-auto w-full animate-pulse">
          <div className="w-24 h-6 bg-white/5 rounded-full mb-6" />
          <div className="w-3/4 h-16 bg-white/5 rounded mb-6" />
          <div className="w-1/2 h-6 bg-white/5 rounded mb-12" />
          <div className="w-full aspect-video bg-white/5 rounded-2xl mb-12" />
          <div className="space-y-4">
            <div className="w-full h-4 bg-white/5 rounded" />
            <div className="w-full h-4 bg-white/5 rounded" />
            <div className="w-5/6 h-4 bg-white/5 rounded" />
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !article) {
    return (
      <Layout>
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl font-serif text-foreground mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-8">The content you're looking for doesn't exist or was moved.</p>
          <Link href="/" className="px-6 py-3 bg-primary text-primary-foreground font-bold rounded-lg hover:opacity-90">
            Return to Homepage
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <ReadingProgress />

      {/* Article Header & Featured Image */}
      <div className="relative pt-20 pb-32 md:pt-32 md:pb-48 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={imageUrl} 
            alt={article.title} 
            className="w-full h-full object-cover object-center opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Breadcrumb */}
          <nav className="flex items-center justify-center gap-2 text-sm text-primary font-bold uppercase tracking-wider mb-8">
            <Link href="/" className="hover:text-[#E5C974] transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            {article.category && (
              <>
                <Link href={`/category/${article.category.toLowerCase()}`} className="hover:text-[#E5C974] transition-colors">
                  {article.category}
                </Link>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </>
            )}
            <span className="text-muted-foreground truncate max-w-[200px]">{article.title}</span>
          </nav>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-black text-foreground leading-[1.1] mb-8"
          >
            {article.title}
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground font-medium"
          >
            <div className="flex items-center gap-2 text-foreground bg-white/5 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md">
              <User className="w-4 h-4 text-primary" />
              {article.author || "Editorial Team"}
            </div>
            <div className="flex items-center gap-2">
              {formatDate(article.date)}
            </div>
            {article.readTime && (
              <div className="flex items-center gap-2 text-primary">
                <Clock className="w-4 h-4" />
                {article.readTime} read
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12 relative -mt-20 z-20">
        
        {/* Left Sidebar (Share) */}
        <div className="hidden lg:block lg:col-span-1">
          <div className="sticky top-32 flex flex-col items-center gap-4">
            <span className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-2" style={{ writingMode: 'vertical-rl' }}>Share</span>
            <div className="w-px h-12 bg-border mb-2" />
            <button className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors">
              <Twitter className="w-4 h-4" />
            </button>
            <button className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors">
              <Facebook className="w-4 h-4" />
            </button>
            <button className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <article className="lg:col-span-8 bg-card/50 backdrop-blur-xl border border-white/5 rounded-[2rem] p-6 sm:p-10 md:p-16 shadow-2xl">
          {article.content ? (
            <div 
              className="prose prose-lg prose-gold prose-invert max-w-none prose-img:rounded-2xl prose-img:shadow-xl prose-headings:font-serif prose-a:font-bold hover:prose-a:text-[#E5C974]"
              dangerouslySetInnerHTML={{ __html: article.content }} 
            />
          ) : (
            <div className="py-20 text-center text-muted-foreground italic font-serif">
              Article content is being written...
            </div>
          )}

          {/* Author Bio Box */}
          <div className="mt-16 pt-8 border-t border-border flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-muted border-2 border-primary/20 overflow-hidden shrink-0">
              {article.authorAvatar ? (
                <img src={article.authorAvatar} alt={article.author} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary font-serif text-2xl font-bold">
                  {(article.author || "E").charAt(0)}
                </div>
              )}
            </div>
            <div>
              <h4 className="text-lg font-bold text-foreground">Written by {article.author || "Editorial Team"}</h4>
              <p className="text-muted-foreground text-sm mt-1 leading-relaxed">
                {article.authorBio || "Resident gambling expert and strategy analyst at CasinoKing. Bringing you years of professional casino experience to help you beat the house."}
              </p>
            </div>
          </div>
        </article>

        {/* Right Sidebar (Offers) */}
        <aside className="lg:col-span-3 space-y-8">
          <div className="sticky top-32">
            <h3 className="text-xl font-serif font-bold text-foreground border-b border-border pb-4 mb-6">
              Exclusive Offers
            </h3>
            <div className="space-y-4">
              {loadingAffiliates ? (
                <div className="w-full h-48 bg-card rounded-xl animate-pulse" />
              ) : affiliatesData?.affiliates?.slice(0,3).map(affiliate => (
                <a 
                  key={affiliate.id}
                  href={affiliate.link || "#"}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="block p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors group"
                >
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 rounded bg-background flex items-center justify-center text-xs font-bold shrink-0 overflow-hidden border border-white/5">
                      {affiliate.logo ? <img src={affiliate.logo} alt="" className="w-full p-1" /> : affiliate.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-foreground group-hover:text-primary transition-colors text-sm">{affiliate.name}</div>
                      <div className="text-primary text-xs font-bold">{affiliate.bonus}</div>
                    </div>
                  </div>
                  <div className="w-full py-2 text-center bg-white/5 rounded text-sm font-bold text-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    Claim Offer
                  </div>
                </a>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="bg-card/30 py-24 border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-serif font-bold text-foreground mb-12 text-center">
              Continue Reading
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedArticles.map((rel) => (
                <ArticleCard key={rel.id} article={rel} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom Affiliates Wide */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-serif font-bold text-foreground">Top Rated Casinos This Month</h2>
            <p className="text-muted-foreground mt-2">Ready to play? Check out our highest rated platforms.</p>
          </div>
          <div className="space-y-4">
            {loadingAffiliates ? (
              <AffiliateCardSkeleton />
            ) : affiliatesData?.affiliates?.slice(0, 2).map((affiliate) => (
              <AffiliateCard key={affiliate.id} affiliate={affiliate} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
