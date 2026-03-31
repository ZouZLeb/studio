"use client";

import Link from "next/link";
import Image from "next/image";
import { BrandName } from "@/components/brand-name";
import { ModeToggle } from "@/components/mode-toggle";
import logo from "../../app/logo.png";
import { ArrowLeft } from "lucide-react";

export function BlogHeader() {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-background/80 border-b border-border shadow-sm">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 group transition-opacity hover:opacity-80">
            <Image src={logo} alt="AImatic Logo" width={32} height={32} className="h-8 w-auto" priority />
            <BrandName className="text-xl tracking-tight text-foreground" />
          </Link>
          <div className="hidden md:block h-6 w-px bg-border mx-2"></div>
          <Link href="/blog" className="hidden md:flex text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Blog Home
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
