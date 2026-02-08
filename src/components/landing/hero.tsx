"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { motion } from "framer-motion";
import { ShieldCheck, Database } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ComparisonCard = ({
  type,
  title,
  description,
  imageId,
}: {
  type: "before" | "after";
  title: string;
  description: string;
  imageId: string;
}) => {
  const imageData = PlaceHolderImages.find((img) => img.id === imageId);

  return (
    <Card
      className={`relative overflow-hidden border-2 transition-all duration-300 hover:shadow-xl ${
        type === "after" 
          ? "border-primary/50 bg-primary/5 backdrop-blur-sm" 
          : "border-destructive/40 bg-destructive/5 backdrop-blur-sm"
      }`}
    >
      <CardContent className="p-5">
        <div className="flex items-center gap-3 mb-4">
          {type === "after" ? (
            <ShieldCheck className="w-6 h-6 text-green-600 dark:text-green-400" />
          ) : (
            <Database className="w-6 h-6 text-red-600 dark:text-red-400" />
          )}
          <div>
            <h3 className="font-bold text-lg text-foreground">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
        <div className="aspect-video relative rounded-md overflow-hidden bg-slate-900/40">
          {imageData && (
            <Image
              src={imageData.imageUrl}
              alt={description}
              fill
              className="object-cover opacity-90 hover:opacity-100 transition-opacity"
              sizes="(max-width: 768px) 100vw, 50vw"
              data-ai-hint={imageData.imageHint}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-transparent">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black font-headline mb-6 tracking-tight leading-[1.1]">
              Stop Sending Your Data to <span className="text-primary italic">Opaque AI Wrappers</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto font-medium"
          >
            We build high-performance automation with n8n and custom scripts. 
            Real engineering for security-first businesses. No data leaks, no monthly per-task fees, complete ownership.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button asChild variant="default">
              <Link href="#why-custom">
                Ownership vs Renting
              </Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="#contact">
                Book Free Consultation
              </Link>
            </Button>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <ComparisonCard
              type="before"
              title="Generic AI Agencies"
              description="Your data feeds their models via generic SaaS tools"
              imageId="hero-before"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <ComparisonCard
              type="after"
              title="Our Engineered Systems"
              description="Private n8n workflows & custom scripts you own"
              imageId="hero-after"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}