"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const caseStudiesData = [
  {
    id: 1,
    clientType: "Instant Lead Assistant",
    industry: "Sales & Real Estate",
    problem: "Customer messages from Email, DMs, and SMS were being missed or taking hours to answer.",
    solution: "A private AI helper that answers customers instantly. It qualifies leads, updates the database, and books meetings automatically.",
    imageId: "case-leads",
    metrics: {
      timeSaved: 20,
      timeUnit: "hrs/week",
      roi: 2,
      roiUnit: "weeks",
      improvement: 95,
      improvementLabel: "More Replies ↑",
    },
    fullDetails: {
      techStack: ["n8n", "Private AI", "Twilio", "CRM"],
      timeline: "2 weeks",
      testimonial: "It's so fast that clients think they are talking to a human. It's booked 15 meetings this week without us doing anything.",
    },
  },
  {
    id: 2,
    clientType: "Smart Marketing Engine",
    industry: "Marketing Agencies",
    problem: "Thousands of old leads were sitting untouched because following up manually was impossible.",
    solution: "A system that checks in with every lead every 30 days. It only alerts the sales team when someone is ready to buy.",
    imageId: "case-marketing",
    metrics: {
      timeSaved: 40,
      timeUnit: "hrs/month",
      roi: 3,
      roiUnit: "weeks",
      improvement: 28,
      improvementLabel: "Revenue ↑",
    },
    fullDetails: {
      techStack: ["n8n", "Slack", "Database Sync"],
      timeline: "3 weeks",
      testimonial: "We are closing deals from leads we talked to 6 months ago that we would have completely forgotten about.",
    },
  },
  {
    id: 3,
    clientType: "Paperwork Automator",
    industry: "Construction",
    problem: "Managing blueprints and project updates was manual, causing frequent delays and high overhead.",
    solution: "An AI system that prepares documents and handles status updates automatically for clients and engineers.",
    imageId: "case-pm",
    metrics: {
      timeSaved: 15,
      timeUnit: "hrs/week",
      roi: 4,
      roiUnit: "weeks",
      improvement: 60,
      improvementLabel: "Less Admin ↓",
    },
    fullDetails: {
      techStack: ["Python", "n8n", "File Automator"],
      timeline: "5 weeks",
      testimonial: "Admin work was killing our profits. This system handles the boring stuff so our team can actually build.",
    },
  },
];

export default function CaseStudies() {
  const [selectedCase, setSelectedCase] = useState<typeof caseStudiesData[0] | null>(null);

  const getImg = (id: string) => PlaceHolderImages.find((img) => img.id === id);

  return (
    <section id="case-studies" className="bg-transparent">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">
            Real Work, Real Results
          </h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
            Custom tools built for businesses that want to save time and grow faster.
          </p>
        </div>

        <div className="max-w-7xl mx-auto relative px-4 md:px-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-6">
              {caseStudiesData.map((study) => {
                const studyImg = getImg(study.imageId);
                return (
                  <CarouselItem key={study.id} className="pl-6 md:basis-1/2 lg:basis-1/3 py-4">
                    <Card
                      className="h-full overflow-hidden bg-card/40 backdrop-blur-md cursor-pointer group flex flex-col border-border/50"
                      onClick={() => setSelectedCase(study)}
                    >
                      <div className="relative h-48 bg-muted/20">
                        {studyImg && (
                          <Image
                            src={studyImg.imageUrl}
                            alt={study.clientType}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            data-ai-hint={studyImg.imageHint}
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <Badge variant="secondary" className="absolute bottom-2 left-2">{study.industry}</Badge>
                      </div>

                      <CardContent className="p-6 flex-grow flex flex-col">
                        <h3 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                          {study.clientType}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4 flex-grow line-clamp-3">
                          {study.problem}
                        </p>
                        
                        <div className="grid grid-cols-3 gap-2 py-4 border-t border-b bg-muted/10 -mx-6 px-4">
                          <div className="text-center">
                            <div className="text-lg font-bold text-primary">
                              <CountUp end={study.metrics.timeSaved} duration={2} />{study.metrics.timeSaved % 1 !== 0 ? '' : '+'}
                            </div>
                            <div className="text-[9px] uppercase font-bold text-muted-foreground whitespace-nowrap">
                              {study.metrics.timeUnit}
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-primary">
                              <CountUp end={study.metrics.roi} duration={2} />
                            </div>
                            <div className="text-[9px] uppercase font-bold text-muted-foreground">
                              Pays off in {study.metrics.roiUnit}
                            </div>
                          </div>
                          <div className="text-center">
                             <div className="text-lg font-bold text-primary">
                              <CountUp end={study.metrics.improvement} duration={2} suffix="%" />
                            </div>
                            <div className="text-[9px] uppercase font-bold text-muted-foreground leading-tight">
                              {study.metrics.improvementLabel}
                            </div>
                          </div>
                        </div>
                        
                        <Button variant="link" className="mt-4 self-start p-0 h-auto text-primary group-hover:underline text-xs shadow-none">
                          See How it Works <ArrowRight className="ml-2 w-3 h-3 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            
            <div className="flex items-center justify-end gap-3 mt-4 md:mt-0">
              <CarouselPrevious className="static md:absolute md:-left-12 left-auto top-auto md:top-1/2 translate-y-0 md:-translate-y-1/2 h-10 w-10" />
              <CarouselNext className="static md:absolute md:-right-12 right-auto top-auto md:top-1/2 translate-y-0 md:-translate-y-1/2 h-10 w-10" />
            </div>
          </Carousel>
        </div>
      </div>

      <Dialog open={selectedCase !== null} onOpenChange={(isOpen) => !isOpen && setSelectedCase(null)}>
        <DialogContent className="sm:max-w-2xl bg-background/95 backdrop-blur-xl">
          <DialogHeader>
            <Badge variant="secondary" className="mb-2 w-fit">{selectedCase?.industry}</Badge>
            <DialogTitle className="text-2xl">{selectedCase?.clientType}</DialogTitle>
            <DialogDescription>{selectedCase?.problem}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div>
              <h4 className="font-semibold mb-2">What We Built</h4>
              <p className="text-sm text-muted-foreground">{selectedCase?.solution}</p>
            </div>
             <div>
              <h4 className="font-semibold mb-2">Tools Used</h4>
              <div className="flex flex-wrap gap-2">
                {selectedCase?.fullDetails.techStack.map(tech => <Badge key={tech} variant="outline">{tech}</Badge>)}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Time to Build</h4>
              <p className="text-sm text-muted-foreground">{selectedCase?.fullDetails.timeline}</p>
            </div>
            {selectedCase?.fullDetails.testimonial && (
              <blockquote className="mt-2 border-l-2 pl-4 italic text-muted-foreground bg-muted/20 py-4 pr-4 rounded-r-lg">
                "{selectedCase.fullDetails.testimonial}"
              </blockquote>
            )}
            <Button size="lg" className="w-full mt-4" asChild>
              <a href="#contact">Get a Similar System for Your Team</a>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
