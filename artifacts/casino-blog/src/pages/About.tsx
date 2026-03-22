import { Layout } from "@/components/Layout";
import { ShieldCheck, Trophy, Target } from "lucide-react";

export default function About() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative pt-32 pb-48 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={`${import.meta.env.BASE_URL}images/about-image.png`} 
            alt="Luxury Casino Lounge" 
            className="w-full h-full object-cover object-center opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-serif font-black text-foreground mb-8">
            The Standard for <br/><span className="text-gold-gradient">Excellence.</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            CasinoKing is an independent editorial platform dedicated to uncovering the truth in online gambling. We review, test, and strategize so you can play with confidence.
          </p>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-24 bg-card/50 relative z-10 -mt-20 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            
            <div className="p-8 rounded-[2rem] glass-card border border-white/5 hover:border-primary/30 transition-colors">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-foreground mb-4">Unbiased Reviews</h3>
              <p className="text-muted-foreground leading-relaxed">
                We deposit our own money, test the customer service, and scrutinize the terms and conditions. Our reviews are brutally honest because your bankroll is on the line.
              </p>
            </div>

            <div className="p-8 rounded-[2rem] glass-card border border-white/5 hover:border-primary/30 transition-colors">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
                <Trophy className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-foreground mb-4">Verified Bonuses</h3>
              <p className="text-muted-foreground leading-relaxed">
                We negotiate exclusive offers and ensure every bonus listed on CasinoKing is legitimate, fair, and provides real value to our readers. No hidden traps.
              </p>
            </div>

            <div className="p-8 rounded-[2rem] glass-card border border-white/5 hover:border-primary/30 transition-colors">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
                <Target className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-foreground mb-4">Expert Strategy</h3>
              <p className="text-muted-foreground leading-relaxed">
                Authored by professional players and industry insiders, our strategy guides are designed to lower the house edge and maximize your winning potential.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Content Block */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg prose-gold prose-invert max-w-none">
            <h2 className="font-serif">Our Mission</h2>
            <p>
              The online gambling industry is vast, complex, and sometimes murky. CasinoKing was founded with a singular mission: to provide clarity, transparency, and high-end editorial content for players who demand more.
            </p>
            <p>
              Whether you are a high-roller looking for premium VIP programs or a casual player seeking the best slot bonuses, we believe you deserve accurate information. We don't just list casinos; we evaluate them against rigorous editorial standards.
            </p>
            <h2 className="font-serif mt-12">Responsible Gambling</h2>
            <p>
              Gambling should be treated as entertainment, not a way to make money. We are staunch advocates for responsible gambling and exclusively partner with operators who provide robust player protection tools. If gambling ceases to be fun, we strongly encourage you to seek help through organizations like BeGambleAware.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
