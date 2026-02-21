"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { motion } from "framer-motion";
import { ShieldCheck, AlertCircle, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const ComparisonCard = ({
  type,
  label,
  title,
  description,
  imageId,
}: {
  type: "competitor" | "aimatic";
  label: string;
  title: string;
  description: string;
  imageId: string;
}) => {
  const imageData = PlaceHolderImages.find((img) => img.id === imageId);

  return (
    <Card
      className={`relative overflow-hidden border-2 transition-all duration-300 ${
        type === "aimatic" 
          ? "border-primary/50 bg-primary/5 shadow-primary/10 shadow-xl" 
          : "border-destructive/100 bg-muted/30 grayscale-[0.5] opacity-80"
      }`}
    >
      <div className="absolute top-4 right-4 z-20">
        <Badge 
          variant={type === "aimatic" ? "default" : "destructive"}
          className="uppercase tracking-widest text-[10px] font-black px-3 py-1"
        >
          {label}
        </Badge>
      </div>
      
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className={`p-2 rounded-lg ${type === "aimatic" ? "bg-primary/20" : "bg-destructive/10"}`}>
            {type === "aimatic" ? (
              <ShieldCheck className="w-6 h-6 text-primary" aria-hidden="true" />
            ) : (
              <AlertCircle className="w-6 h-6 text-destructive" aria-hidden="true" />
            )}
          </div>
          <div>
            <h3 className="font-black text-lg text-foreground tracking-tight">{title}</h3>
            <p className="text-xs text-muted-foreground font-medium">{description}</p>
          </div>
        </div>
        
        <div className="aspect-[16/10] relative rounded-xl overflow-hidden border border-border/50 bg-slate-900/40">
          {imageData && (
            <Image
              src={imageData.imageUrl}
              alt={`${label}: ${description}`}
              fill
              className="object-cover opacity-90 transition-all duration-500"
              sizes="(max-width: 768px) 100vw, 50vw"
              data-ai-hint={imageData.imageHint}
            />
          )}
          <div className={`absolute inset-0 bg-gradient-to-t ${type === "aimatic" ? "from-primary/20" : "from-black/40"} to-transparent pointer-events-none`} />
        </div>
      </CardContent>
    </Card>
  );
};

export default function Hero() {
  return (
    <section className="relative flex flex-col justify-center pt-24 pb-12 md:pt-32 md:pb-16 overflow-hidden bg-transparent" aria-labelledby="hero-title">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 id="hero-title" className="text-4xl md:text-6xl lg:text-7xl font-black font-headline mb-6 tracking-tight leading-[1.05]">
              Own Your Automation. <br />
              <span className="text-primary italic">Protect Your Data.</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto font-medium"
          >
            Don't rent your business logic from generic AI agencies. 
            AImatic builds custom, high-security systems you own forever. Professional automation for business owners.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button size="lg" className="px-8" asChild aria-label="Book a free automation audit">
              <Link href="#contact" className="flex items-center gap-2">
                Get Your Free Audit <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto relative">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-background border-2 border-border shadow-xl font-black text-sm italic text-muted-foreground">
            VS
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <ComparisonCard
              type="competitor"
              label="Standard Agencies"
              title="The 'Prompt' Wrapper"
              description="Fragile tools built on rented platforms with no data privacy."
              imageId="hero-before"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <ComparisonCard
              type="aimatic"
              label="The AImatic Way"
              title="Custom Engineering"
              description="Secure, self-hosted code that stays within your business walls."
              imageId="hero-after"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
