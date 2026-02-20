"use client";

import { Button } from "@/components/ui/button";
import { useScroll } from "framer-motion";
import { CodeXml, Menu } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/mode-toggle";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navItems = [
  { name: 'Why AImatic', href: '#why-custom' },
  { name: 'Projects', href: '#case-studies' },
  { name: 'Process', href: '#lifecycle' },
  { name: 'Calculator', href: '#roi-calculator' },
];

export default function Navigation() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return scrollY.on("change", (latest) => {
      setIsScrolled(latest > 20);
    });
  }, [scrollY]);

  if (!mounted) {
    return (
      <header className="fixed top-0 z-50 w-full py-6 bg-transparent">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-primary/20">
              <CodeXml className="w-6 h-6 text-primary" />
            </div>
            <span className="font-black text-xl tracking-tight font-headline">AImatic</span>
          </div>
        </div>
      </header>
    );
  }

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
            AImatic
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-[11px] font-bold uppercase tracking-[0.2em]">
          {navItems.map((item) => (
            <Link 
              key={item.name}
              href={item.href} 
              className="transition-all duration-200 text-muted-foreground hover:text-primary"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-4">
          <ModeToggle />
          
          <div className="hidden md:block">
            <Button asChild variant="default">
              <Link href="#contact">
                Book a Call
              </Link>
            </Button>
          </div>

          {/* Mobile Burger Menu */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-background/95 backdrop-blur-xl border-l border-border/50 w-72">
                <SheetHeader className="text-left pb-6 border-b border-border/30">
                  <SheetTitle className="flex items-center gap-2">
                    <CodeXml className="text-primary w-5 h-5" />
                    <span className="font-headline font-black text-lg">AImatic</span>
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-6 mt-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="text-sm font-bold uppercase tracking-[0.15em] text-muted-foreground hover:text-primary transition-colors"
                    >
                      {item.name}
                    </Link>
                  ))}
                  <div className="pt-6 border-t border-border/30 mt-4">
                    <Button asChild className="w-full" onClick={() => setIsOpen(false)}>
                      <Link href="#contact">
                        Book a Consultation
                      </Link>
                    </Button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
