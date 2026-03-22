import { ReactNode, useState, useRef } from "react";
import { Link, useRoute } from "wouter";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import categories from "@/data/categories.json";

type Category = (typeof categories)[number];

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
            <nav className="hidden lg:flex items-center gap-1">
              {categories.map((cat) => (
                <DesktopNavItem key={cat.slug} category={cat} />
              ))}
              <Link
                href="/about"
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                About
              </Link>
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
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="lg:hidden overflow-hidden bg-card border-b border-border"
            >
              <div className="px-4 py-3 space-y-1">
                {categories.map((cat) => (
                  <MobileNavItem
                    key={cat.slug}
                    category={cat}
                    onClose={() => setIsMobileMenuOpen(false)}
                  />
                ))}
                <Link
                  href="/about"
                  className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-white/5 rounded-md transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
              <div className="px-3 py-1 border border-border rounded text-xs font-bold text-foreground">18+</div>
              <div className="px-3 py-1 border border-border rounded text-xs font-bold text-foreground">BeGambleAware.org</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ── Desktop: hover dropdown ── */
function DesktopNavItem({ category }: { category: Category }) {
  const [isOpen, setIsOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isActive] = useRoute(`/category/${category.slug}*`);

  function open() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setIsOpen(true);
  }

  function close() {
    closeTimer.current = setTimeout(() => setIsOpen(false), 120);
  }

  return (
    <div
      className="relative"
      onMouseEnter={open}
      onMouseLeave={close}
    >
      <Link
        href={`/category/${category.slug}`}
        className={cn(
          "flex items-center gap-1 px-3 py-2 text-sm font-medium transition-all duration-200 hover:text-primary relative",
          isActive ? "text-primary" : "text-muted-foreground"
        )}
      >
        {category.name}
        <ChevronDown
          className={cn(
            "w-3.5 h-3.5 transition-transform duration-200",
            isOpen ? "rotate-180" : ""
          )}
        />
        {isActive && (
          <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-primary shadow-[0_0_8px_rgba(201,168,76,0.6)]" />
        )}
      </Link>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            onMouseEnter={open}
            onMouseLeave={close}
            className="absolute top-full left-0 pt-2 z-50 min-w-[200px]"
          >
            <div
              className="rounded-xl overflow-hidden border border-primary/15 shadow-[0_8px_32px_rgba(0,0,0,0.6)]"
              style={{ background: "#0f0f14", borderLeft: "2px solid #C9A84C" }}
            >
              <div className="py-2">
                <Link
                  href={`/category/${category.slug}`}
                  className="block px-4 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-white/5 transition-colors font-semibold border-b border-white/5 mb-1"
                  onClick={() => setIsOpen(false)}
                >
                  All {category.name}
                </Link>
                {category.subcategories.map((sub) => (
                  <Link
                    key={sub.slug}
                    href={`/category/${category.slug}/${sub.slug}`}
                    className="block px-4 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-white/5 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {sub.name}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Mobile: accordion toggle ── */
function MobileNavItem({ category, onClose }: { category: Category; onClose: () => void }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div>
      <div className="flex items-center">
        <Link
          href={`/category/${category.slug}`}
          className="flex-1 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-white/5 rounded-md transition-colors"
          onClick={onClose}
        >
          {category.name}
        </Link>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="px-2 py-2 text-muted-foreground hover:text-primary transition-colors"
          aria-label={`Toggle ${category.name} submenu`}
        >
          <ChevronDown
            className={cn(
              "w-4 h-4 transition-transform duration-200",
              isExpanded ? "rotate-180" : ""
            )}
          />
        </button>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div
              className="ml-4 mb-1 border-l-2 pl-3 py-1 space-y-0.5"
              style={{ borderColor: "#C9A84C" }}
            >
              {category.subcategories.map((sub) => (
                <Link
                  key={sub.slug}
                  href={`/category/${category.slug}/${sub.slug}`}
                  className="block px-2 py-1.5 text-sm text-muted-foreground hover:text-primary transition-colors rounded"
                  onClick={onClose}
                >
                  {sub.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
