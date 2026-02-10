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
    <section className="relative flex flex-col justify-center pt-24 pb-12 md:pt-32 md:pb-16 overflow-hidden bg-transparent">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black font-headline mb-6 tracking-tight leading-[1.1]">
              Stop Sending Your Private Data to <span className="text-primary italic">Random Chat Apps</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto font-medium"
          >
            We build custom tools that run on your own private servers. 
            No data leaks, no monthly per-task fees, and 100% ownership. It's real engineering for businesses that care about security.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button className=" w-auto" asChild variant="default">
              <Link href="#contact">
                Talk to an Expert
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
              title="Generic Chat Tools"
              description="Your company secrets feed their AI models"
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
              title="Our Custom Systems"
              description="Private tools that only you can see and control"
              imageId="hero-after"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
