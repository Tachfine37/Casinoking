import { type Affiliate } from "@workspace/api-client-react/src/generated/api.schemas";
import { Star, ExternalLink } from "lucide-react";

interface AffiliateCardProps {
  affiliate: Affiliate;
  index?: number;
}

export function AffiliateCard({ affiliate, index }: AffiliateCardProps) {
  // Star rating logic
  const rating = affiliate.rating || 5;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className="group shimmer-border flex flex-col md:flex-row items-center gap-6 p-6 rounded-2xl bg-card border border-white/5 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(201,168,76,0.15)] transition-all duration-300 relative overflow-hidden">
      
      {/* Position Badge & Editor's Pick */}
      {affiliate.badge && (
        <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-4 py-1 rounded-bl-xl shadow-md z-10">
          {affiliate.badge}
        </div>
      )}
      
      {/* Position Number (Optional luxury touch) */}
      {index !== undefined && (
        <div className="absolute -left-4 -top-6 text-8xl font-serif font-black text-white/5 pointer-events-none select-none z-0">
          {index + 1}
        </div>
      )}

      {/* Logo */}
      <div className="w-24 h-24 shrink-0 rounded-2xl bg-background flex items-center justify-center border border-white/10 shadow-inner overflow-hidden z-10 relative group-hover:border-primary/30 transition-colors">
        {affiliate.logo ? (
          <img src={affiliate.logo} alt={affiliate.name} className="w-full h-full object-contain p-2" loading="lazy" />
        ) : (
          <span className="text-3xl font-serif text-primary font-bold">
            {affiliate.name.charAt(0)}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left z-10">
        <h3 className="text-2xl font-serif font-bold text-foreground group-hover:text-primary transition-colors">
          {affiliate.name}
        </h3>
        
        <div className="flex items-center mt-1 space-x-1">
          {[...Array(5)].map((_, i) => {
            if (i < fullStars) {
              return <Star key={i} className="w-4 h-4 fill-primary text-primary" />;
            }
            if (i === fullStars && hasHalfStar) {
              // Simple half star hack with fill percentage
              return (
                <div key={i} className="relative w-4 h-4">
                  <Star className="w-4 h-4 text-primary absolute" />
                  <div className="absolute inset-0 overflow-hidden w-1/2">
                    <Star className="w-4 h-4 fill-primary text-primary" />
                  </div>
                </div>
              );
            }
            return <Star key={i} className="w-4 h-4 text-muted-foreground/30" />;
          })}
          <span className="text-xs text-muted-foreground font-bold ml-2">{rating.toFixed(1)}/5</span>
        </div>

        <p className="text-sm text-muted-foreground mt-2 line-clamp-2 max-w-xl">
          {affiliate.description}
        </p>

        {affiliate.bonus && (
          <div className="mt-3 inline-flex items-center gap-2 text-primary font-bold px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-sm">
            🎁 {affiliate.bonus}
          </div>
        )}
      </div>

      {/* Action */}
      <div className="w-full md:w-auto shrink-0 z-10 flex flex-col gap-2">
        <a 
          href={affiliate.link || "#"}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="w-full md:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-[#E5C974] text-primary-foreground font-bold hover:shadow-[0_0_25px_rgba(201,168,76,0.4)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 text-lg shadow-lg"
        >
          Claim Bonus
          <ExternalLink className="w-5 h-5" />
        </a>
        <span className="text-[10px] text-muted-foreground text-center block">
          T&Cs Apply. 18+
        </span>
      </div>
    </div>
  );
}

export function AffiliateCardSkeleton() {
  return (
    <div className="flex flex-col md:flex-row items-center gap-6 p-6 rounded-2xl bg-card border border-white/5 animate-pulse">
      <div className="w-24 h-24 shrink-0 rounded-2xl bg-white/5" />
      <div className="flex-1 w-full space-y-3">
        <div className="w-1/3 h-6 bg-white/5 rounded" />
        <div className="w-24 h-4 bg-white/5 rounded" />
        <div className="w-3/4 h-4 bg-white/5 rounded" />
        <div className="w-1/2 h-8 bg-white/5 rounded-full mt-2" />
      </div>
      <div className="w-full md:w-48 h-14 rounded-xl bg-white/5" />
    </div>
  );
}
