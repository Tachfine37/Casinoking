import { Layout } from "@/components/Layout";
import { Link } from "wouter";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <Layout>
      <div className="flex-1 flex items-center justify-center min-h-[70vh] py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 text-center glass-card p-12 rounded-[3rem] border border-white/10">
          <div className="flex justify-center text-primary">
            <AlertCircle className="w-24 h-24 opacity-80" />
          </div>
          <div>
            <h1 className="text-5xl font-serif font-black text-foreground mb-4">404</h1>
            <h2 className="text-2xl font-bold text-foreground mb-4">Page Not Found</h2>
            <p className="text-muted-foreground mb-8">
              The page you are looking for has folded. It might have been moved or the URL is incorrect.
            </p>
            <Link 
              href="/"
              className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-bold rounded-xl text-primary-foreground bg-primary hover:bg-[#E5C974] transition-colors shadow-lg hover:shadow-[0_0_20px_rgba(201,168,76,0.4)] w-full sm:w-auto"
            >
              Return to Lobby
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
