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
        "sticky top-0 z-40 w-full transition-all duration-300",
        isScrolled ? "bg-background/80 backdrop-blur-lg border-b" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <CodeXml className={cn("w-7 h-7 text-primary", !isScrolled && "text-white")} />
          <span className={cn("font-bold text-lg font-headline", !isScrolled && "text-white")}>
            SecureAutomate
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="#why-custom" className={cn("hover:text-primary transition-colors", !isScrolled && "text-gray-300 hover:text-white")}>
            Why Custom
          </Link>
          <Link href="#services" className={cn("hover:text-primary transition-colors", !isScrolled && "text-gray-300 hover:text-white")}>
            Services
          </Link>
           <Link href="#pricing" className={cn("hover:text-primary transition-colors", !isScrolled && "text-gray-300 hover:text-white")}>
            Pricing
          </Link>
          <Link href="#about" className={cn("hover:text-primary transition-colors", !isScrolled && "text-gray-300 hover:text-white")}>
            About
          </Link>
        </nav>
        <Button asChild>
          <Link href="#contact">Book a Call</Link>
        </Button>
      </div>
    </header>
  );
}
