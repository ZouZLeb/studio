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
          ? "backdrop-blur-md bg-background/30 border-b border-border py-3" 
          : "py-6 bg-transparent"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className={cn(
            "p-1.5 rounded-lg transition-all duration-300",
            "bg-primary/20 group-hover:bg-primary/30"
          )}>
            <CodeXml className="w-6 h-6 text-primary" />
          </div>
          <span className="font-black text-xl tracking-tight transition-colors font-headline text-foreground">
            SecureAutomate
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8 text-[13px] font-bold uppercase tracking-[0.1em]">
          {['Why Custom', 'Services', 'Pricing', 'About'].map((item) => (
            <Link 
              key={item}
              href={`#${item.toLowerCase().replace(' ', '-')}`} 
              className="transition-all duration-200 text-muted-foreground hover:text-primary"
            >
              {item}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <ModeToggle />
          <Button asChild variant="default" className="p-0">
            <Link href="#contact">
              <div className="btn-custom-glass-inner">
                <div className="btn-custom-glass-text">Book a Call</div>
              </div>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
