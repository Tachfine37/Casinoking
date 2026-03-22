import { Link } from "wouter";
import { type Article } from "@workspace/api-client-react/src/generated/api.schemas";
import { formatDate } from "@/lib/utils";
import { Clock, ArrowRight } from "lucide-react";

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  // Use generated placeholder if no image provided
  const imageUrl = article.image || `${import.meta.env.BASE_URL}images/article-placeholder.png`;

  return (
    <Link 
      href={`/articles/${article.slug}`}
      className="group flex flex-col bg-card rounded-2xl border border-white/5 overflow-hidden hover:border-primary/40 hover:shadow-[0_0_30px_rgba(201,168,76,0.1)] transition-all duration-500"
    >
      <div className="aspect-[16/10] w-full overflow-hidden relative bg-muted">
        <img 
          src={imageUrl} 
          alt={article.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-60" />
        
        {article.category && (
          <div className="absolute top-4 left-4 bg-primary/90 backdrop-blur-md text-primary-foreground text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
            {article.category}
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-1 relative">
        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3 font-medium">
          <span>{formatDate(article.date)}</span>
          {article.readTime && (
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {article.readTime}
            </span>
          )}
        </div>
        
        <h3 className="text-xl font-serif text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2 mb-3 leading-snug">
          {article.title}
        </h3>
        
        <p className="text-sm text-muted-foreground line-clamp-3 flex-1 leading-relaxed">
          {article.excerpt}
        </p>
        
        <div className="mt-6 flex items-center text-primary text-sm font-bold tracking-wide uppercase group-hover:translate-x-1 transition-transform duration-300">
          Read Article <ArrowRight className="w-4 h-4 ml-2" />
        </div>
      </div>
    </Link>
  );
}

export function ArticleCardSkeleton() {
  return (
    <div className="flex flex-col bg-card rounded-2xl border border-white/5 overflow-hidden animate-pulse">
      <div className="aspect-[16/10] w-full bg-white/5" />
      <div className="p-6 flex flex-col flex-1">
        <div className="w-24 h-3 bg-white/5 rounded mb-4" />
        <div className="w-full h-6 bg-white/5 rounded mb-2" />
        <div className="w-3/4 h-6 bg-white/5 rounded mb-4" />
        <div className="w-full h-4 bg-white/5 rounded mb-2" />
        <div className="w-full h-4 bg-white/5 rounded mb-2" />
        <div className="w-2/3 h-4 bg-white/5 rounded mt-auto" />
      </div>
    </div>
  );
}
