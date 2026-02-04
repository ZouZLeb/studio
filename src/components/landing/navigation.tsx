"use client";

import { Button } from "@/components/ui/button";
import { useScroll } from "framer-motion";
import { CodeXml } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/mode-toggle";

export default function Navigation() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setIsScrolled(latest > 20);
    });
  }, [scrollY]);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        isScrolled 
          ? "bg-background/95 backdrop-blur-md border-b py-3 shadow-md" 
          : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className={cn(
            "p-1.5 rounded-lg transition-all duration-300",
            isScrolled ? "bg-primary/10" : "bg-white/20 group-hover:bg-white/30"
          )}>
            <CodeXml className={cn("w-6 h-6", isScrolled ? "text-primary" : "text-white")} />
          </div>
          <span className={cn(
            "font-black text-xl tracking-tight transition-colors font-headline", 
            isScrolled ? "text-foreground" : "text-white"
          )}>
            SecureAutomate
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8 text-[13px] font-bold uppercase tracking-[0.1em]">
          {['Why Custom', 'Services', 'Pricing', 'About'].map((item) => (
            <Link 
              key={item}
              href={`#${item.toLowerCase().replace(' ', '-')}`} 
              className={cn(
                "transition-all duration-200", 
                isScrolled 
                  ? "text-muted-foreground hover:text-primary font-semibold" 
                  : "text-white/90 hover:text-white"
              )}
            >
              {item}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className={cn(
            "flex items-center gap-2 rounded-full transition-colors",
            !isScrolled && "bg-black/20 backdrop-blur-sm px-1"
          )}>
            <ModeToggle />
          </div>
          <Button 
            asChild 
            className={cn(
              "font-bold transition-all h-10 px-6",
              !isScrolled 
                ? "bg-white text-slate-950 hover:bg-slate-100 shadow-lg border-none" 
                : "bg-primary text-primary-foreground"
            )}
          >
            <Link href="#contact">Book a Call</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}