import { ReactNode } from "react";
import { Link, useRoute } from "wouter";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/category/casino-reviews", label: "Casino Reviews" },
  { href: "/category/slots", label: "Slots" },
  { href: "/category/poker", label: "Poker" },
  { href: "/category/sports-betting", label: "Sports Betting" },
  { href: "/category/bonuses", label: "Bonuses" },
  { href: "/category/strategy", label: "Strategy" },
  { href: "/about", label: "About" },
];

export function Layout({ children }: { children: ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col relative bg-noise">
      {/* Sticky Premium Navbar */}
      <header className="sticky top-0 z-50 w-full glass-card border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 flex items-center group">
              <span className="font-serif text-3xl font-black text-gold-gradient group-hover:drop-shadow-[0_0_15px_rgba(201,168,76,0.4)] transition-all duration-300">
                CasinoKing
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-8 items-center">
              {NAV_LINKS.map((link) => (
                <NavLink key={link.href} href={link.href} label={link.label} />
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center">
              <Link 
                href="/category/bonuses"
                className="px-6 py-2.5 rounded-full bg-primary/10 text-primary border border-primary/30 font-semibold hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_20px_rgba(201,168,76,0.3)] transition-all duration-300"
              >
                Top Casinos
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-card border-b border-border animate-in slide-in-from-top-2">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 text-base font-medium text-muted-foreground hover:text-primary hover:bg-white/5 rounded-md transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {children}
      </main>

      {/* Newsletter Bar */}
      <section className="bg-card border-y border-white/5 py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4">Stay Ahead of the Game</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join the King's circle. Get exclusive VIP bonuses, high-roller strategy guides, and unfiltered casino reviews delivered directly to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-1 px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
              required
            />
            <button 
              type="submit"
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-[#E5C974] text-primary-foreground font-bold hover:shadow-[0_0_20px_rgba(201,168,76,0.3)] hover:scale-105 transition-all duration-300"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Luxury Footer */}
      <footer className="bg-background py-12 border-t border-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <span className="font-serif text-2xl font-black text-gold-gradient block mb-4">CasinoKing</span>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
                The premier destination for luxury casino reviews, expert betting strategies, and exclusive high-roller bonuses. Navigate the gambling world with royal confidence.
              </p>
            </div>
            <div>
              <h4 className="text-foreground font-bold mb-4 font-serif">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/category/casino-reviews" className="hover:text-primary transition-colors">Casino Reviews</Link></li>
                <li><Link href="/category/slots" className="hover:text-primary transition-colors">Top Slots</Link></li>
                <li><Link href="/category/bonuses" className="hover:text-primary transition-colors">Exclusive Bonuses</Link></li>
                <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-foreground font-bold mb-4 font-serif">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Responsible Gambling</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-muted-foreground max-w-3xl text-center md:text-left">
              <strong>Disclaimer:</strong> This site contains affiliate links. We may earn a commission at no extra cost to you when you use these links. Gambling involves risk. Please gamble responsibly. 18+ only.
            </p>
            <div className="flex gap-4 opacity-50 grayscale hover:grayscale-0 transition-all duration-300">
              {/* Mock badges for GamCare & BeGambleAware */}
              <div className="px-3 py-1 border border-border rounded text-xs font-bold text-foreground">18+</div>
              <div className="px-3 py-1 border border-border rounded text-xs font-bold text-foreground">BeGambleAware.org</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  const [isActive] = useRoute(href);
  return (
    <Link 
      href={href} 
      className={cn(
        "text-sm font-medium transition-all duration-200 hover:text-primary relative py-2",
        isActive ? "text-primary" : "text-muted-foreground"
      )}
    >
      {label}
      {isActive && (
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary shadow-[0_0_8px_rgba(201,168,76,0.6)]" />
      )}
    </Link>
  );
}
