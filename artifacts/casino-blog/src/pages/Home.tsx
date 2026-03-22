import { Layout } from "@/components/Layout";
import { ArticleCard, ArticleCardSkeleton } from "@/components/ArticleCard";
import { AffiliateCard, AffiliateCardSkeleton } from "@/components/AffiliateCard";
import { useGetArticles, useGetAffiliates } from "@workspace/api-client-react";
import { Link } from "wouter";
import { ArrowRight, Trophy, Flame, Crown } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  // Fetch lists
  const { data: articlesData, isLoading: loadingArticles } = useGetArticles({ page: 1, limit: 9 });
  const { data: affiliatesData, isLoading: loadingAffiliates } = useGetAffiliates();
  
  // Extract featured article from list if it exists, else use first
  const featuredArticle = articlesData?.articles?.find(a => a.featured) || articlesData?.articles?.[0];
  const regularArticles = articlesData?.articles?.filter(a => a.id !== featuredArticle?.id).slice(0, 6) || [];

  return (
    <Layout>
      {/* Top Casino Picks (Affiliates) */}
      <section className="py-24 bg-card/30 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-widest mb-2 text-sm">
                <Trophy className="w-4 h-4" />
                Verified & Tested
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
                Top Casino Picks
              </h2>
            </div>
            <Link href="/category/bonuses" className="text-primary hover:text-[#E5C974] flex items-center gap-1 font-bold group transition-colors">
              See All Offers 
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="flex flex-col gap-6">
            {loadingAffiliates ? (
              <>
                <AffiliateCardSkeleton />
                <AffiliateCardSkeleton />
                <AffiliateCardSkeleton />
              </>
            ) : affiliatesData?.affiliates?.length ? (
              affiliatesData.affiliates.slice(0, 5).map((affiliate, idx) => (
                <motion.div
                  key={affiliate.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <AffiliateCard affiliate={affiliate} index={idx} />
                </motion.div>
              ))
            ) : (
              <div className="text-center py-12 glass-card rounded-2xl border-dashed">
                <Crown className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-20" />
                <p className="text-muted-foreground">Premium offers are being updated. Check back soon.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Latest Articles Grid */}
      <section className="py-24 bg-background relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="flex items-center gap-2 text-secondary font-bold uppercase tracking-widest mb-2 text-sm">
                <Flame className="w-4 h-4" />
                Fresh Insights
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
                Latest Articles
              </h2>
            </div>
            <Link href="/category/all" className="text-muted-foreground hover:text-foreground flex items-center gap-1 font-bold group transition-colors">
              View Editorial Desk
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loadingArticles ? (
              <>
                <ArticleCardSkeleton />
                <ArticleCardSkeleton />
                <ArticleCardSkeleton />
                <ArticleCardSkeleton />
                <ArticleCardSkeleton />
                <ArticleCardSkeleton />
              </>
            ) : regularArticles.length ? (
              regularArticles.map((article, idx) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <ArticleCard article={article} />
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-20 glass-card rounded-2xl border-dashed">
                <p className="text-muted-foreground">No articles published yet.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}
