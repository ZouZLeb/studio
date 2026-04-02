import Link from 'next/link';
import { Ghost, Home, BookOpen } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center relative z-10">
      {/* Atmospheric Background blob specifically for the 404 page */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vh] bg-primary/5 dark:bg-primary/5 blur-[120px] rounded-full -z-10 pointer-events-none" />

      <div className="space-y-6 max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="flex justify-center flex-col items-center">
          <div className="bg-primary/10 p-6 rounded-full mb-6">
            <Ghost className="w-16 h-16 text-primary animate-bounce duration-1000" />
          </div>
          <h1 className="text-7xl font-bold tracking-tighter text-foreground mb-2">404</h1>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground">Oops! Nothing Here</h2>
        </div>
        
        <p className="text-muted-foreground text-lg px-4">
          Looks like our automation bots got a little carried away and misplaced this page. Don't worry, even the best systems experience a short circuit sometimes!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 pt-4">
          <Link 
            href="/"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8 gap-2"
          >
            <Home className="w-4 h-4" />
            Back to Homepage
          </Link>
          <Link 
            href="/blog"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8 gap-2"
          >
            <BookOpen className="w-4 h-4" />
            Read the Blog
          </Link>
        </div>
      </div>
    </div>
  );
}
