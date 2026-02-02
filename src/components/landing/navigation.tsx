"use client";

import { Button } from "@/components/ui/button";
import { useScroll } from "framer-motion";
import { CodeXml } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function Navigation() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-500",
        isScrolled 
          ? "bg-background/95 backdrop-blur-md border-b py-3 shadow-sm" 
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className={cn(
            "p-1.5 rounded-lg transition-colors",
            isScrolled ? "bg-primary/10" : "bg-white/10 group-hover:bg-white/20"
          )}>
            <CodeXml className={cn("w-6 h-6", isScrolled ? "text-primary" : "text-white")} />
          </div>
          <span className={cn(
            "font-black text-xl tracking-tight transition-colors font-headline", 
            isScrolled ? "text-foreground" : "text-white drop-shadow-sm"
          )}>
            SecureAutomate
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold uppercase tracking-wider">
          <Link 
            href="#why-custom" 
            className={cn(
              "transition-all duration-200", 
              isScrolled 
                ? "text-muted-foreground hover:text-primary" 
                : "text-white/80 hover:text-white drop-shadow-sm"
            )}
          >
            Why Custom
          </Link>
          <Link 
            href="#services" 
            className={cn(
              "transition-all duration-200", 
              isScrolled 
                ? "text-muted-foreground hover:text-primary" 
                : "text-white/80 hover:text-white drop-shadow-sm"
            )}
          >
            Services
          </Link>
           <Link 
            href="#pricing" 
            className={cn(
              "transition-all duration-200", 
              isScrolled 
                ? "text-muted-foreground hover:text-primary" 
                : "text-white/80 hover:text-white drop-shadow-sm"
            )}
          >
            Pricing
          </Link>
          <Link 
            href="#about" 
            className={cn(
              "transition-all duration-200", 
              isScrolled 
                ? "text-muted-foreground hover:text-primary" 
                : "text-white/80 hover:text-white drop-shadow-sm"
            )}
          >
            About
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Button 
            asChild 
            className={cn(
              "font-bold transition-all",
              !isScrolled && "bg-white text-primary hover:bg-slate-100 shadow-lg"
            )}
          >
            <Link href="#contact">Book a Call</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
