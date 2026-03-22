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
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center pt-20 pb-32 overflow-hidden">
        {/* Background Image Setup */}
        <div className="absolute inset-0 z-0">
          <img 
            src={`${import.meta.env.BASE_URL}images/hero-bg.png`} 
            alt="Luxury Casino Background" 
            className="w-full h-full object-cover object-center opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Text */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="col-span-1 lg:col-span-6 space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold uppercase tracking-wider">
                <Crown className="w-4 h-4" />
                Premium Casino Guide
              </div>
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif font-black leading-[1.1] text-foreground">
                Play Like <br />
                <span className="text-gold-gradient">A High Roller.</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-lg">
                Exclusive casino reviews, VIP bonuses, and expert strategies curated for players who demand the best.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link 
                  href="/category/bonuses"
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-[#E5C974] text-primary-foreground font-bold hover:shadow-[0_0_30px_rgba(201,168,76,0.4)] hover:-translate-y-1 transition-all duration-300 text-lg flex items-center gap-2"
                >
                  Explore Top Casinos
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link 
                  href="/category/casino-reviews"
                  className="px-8 py-4 rounded-xl glass-card text-foreground font-bold hover:bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 text-lg"
                >
                  Read Reviews
                </Link>
              </div>
            </motion.div>

            {/* Featured Article Hero Card */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="col-span-1 lg:col-span-6 lg:ml-auto w-full max-w-lg"
            >
              {loadingArticles ? (
                <ArticleCardSkeleton />
              ) : featuredArticle ? (
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-[2rem] blur-xl opacity-50 group-hover:opacity-100 transition duration-500" />
                  <ArticleCard article={featuredArticle} />
                </div>
              ) : null}
            </motion.div>

          </div>
        </div>
      </section>

      {/* Gold Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

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
