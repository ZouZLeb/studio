"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { motion } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";
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
      className={`relative overflow-hidden border-2 ${
        type === "after" ? "border-primary" : "border-destructive/50"
      }`}
    >
      <CardContent className="p-4">
        <div className="flex items-center gap-3 mb-3">
          {type === "after" ? (
            <CheckCircle className="w-6 h-6 text-green-500" />
          ) : (
            <XCircle className="w-6 h-6 text-red-500" />
          )}
          <div>
            <h3 className="font-semibold text-lg text-foreground">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
        <div className="aspect-video relative rounded-md overflow-hidden bg-muted">
          {imageData && (
            <Image
              src={imageData.imageUrl}
              alt={description}
              fill
              className="object-cover"
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
    <section className="relative min-h-[90vh] md:min-h-screen bg-slate-900 text-primary-foreground flex items-center py-20 md:py-0">
       <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-blue-900/40 opacity-80"></div>
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat opacity-5"></div>
      <div className="container mx-auto px-6 relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline mb-4 text-center max-w-4xl mx-auto"
        >
          Stop Paying &apos;AI Agencies&apos; to Prompt ChatGPT For You
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-lg md:text-xl text-primary-foreground/70 mb-10 text-center max-w-3xl mx-auto"
        >
          Custom automation systems built by software engineers with
          cybersecurity expertise. Production-ready, secure, and scalable. From
          $399.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-8 mb-10 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <ComparisonCard
              type="before"
              title="Typical AI Agency"
              description="Fancy prompts + markup"
              imageId="hero-before"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <ComparisonCard
              type="after"
              title="Our Approach"
              description="Custom code + API integrations"
              imageId="hero-after"
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button size="lg" asChild>
            <Link href="#why-custom">See The Difference</Link>
          </Button>
          <Button size="lg" variant="outline" className="border-primary-foreground/50 hover:bg-primary-foreground/10" asChild>
             <Link href="#contact">Book Free Consultation</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
