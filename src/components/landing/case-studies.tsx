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
    clientType: "Automate Lead Generation",
    industry: "Sales & Real Estate",
    problem: "How to automate email follow-ups and respond to DMs before leads go cold.",
    solution: "A private n8n lead engine that answers customers instantly, books meetings, and updates your CRM automatically.",
    imageId: "case-leads",
    metrics: {
      timeSaved: 20,
      timeUnit: "hrs/week",
      roi: 2,
      roiUnit: "weeks",
      improvement: 95,
      improvementLabel: "Faster Replies ↑",
    },
    fullDetails: {
      techStack: ["n8n", "Private AI", "Email Sync"],
      timeline: "2 weeks",
      testimonial: "It's so fast that clients think they are talking to a human. It's booked 15 meetings this week without us doing anything.",
    },
  },
  {
    id: 2,
    clientType: "Social Media Machine",
    industry: "Marketing & Creative",
    problem: "Writing and designing posts for 3 different social platforms every day was a full-time job.",
    solution: "A system that reads your latest news and creates draft posts for LinkedIn, Twitter, and Instagram in your voice.",
    imageId: "case-marketing",
    metrics: {
      timeSaved: 15,
      timeUnit: "hrs/week",
      roi: 3,
      roiUnit: "weeks",
      improvement: 300,
      improvementLabel: "More Posts ↑",
    },
    fullDetails: {
      techStack: ["Image AI", "Writing AI", "Content Calendar"],
      timeline: "3 weeks",
      testimonial: "I used to spend my whole Sunday planning content. Now I just click 'Approve' and the system handles the rest.",
    },
  },
  {
    id: 3,
    clientType: "The Client Update Bot",
    industry: "Professional Services",
    problem: "Clients kept asking 'what's the status?' and answering manually was taking hours.",
    solution: "An automated helper that checks your project board and sends a friendly summary email to every client every Friday.",
    imageId: "case-pm",
    metrics: {
      timeSaved: 10,
      timeUnit: "hrs/week",
      roi: 4,
      roiUnit: "weeks",
      improvement: 80,
      improvementLabel: "Happier Clients ↑",
    },
    fullDetails: {
      techStack: ["Project Sync", "Email Automation"],
      timeline: "2 weeks",
      testimonial: "Our clients love the updates. We haven't had a 'check-in' phone call in over a month.",
    },
  },
  {
    id: 4,
    clientType: "AI Chatbot for Small Business",
    industry: "E-commerce & Tech",
    problem: "Support tickets were piling up overnight and on weekends when the team was offline.",
    solution: "A smart knowledge-based assistant that knows your products and solves common problems instantly at any hour.",
    imageId: "case-support",
    metrics: {
      timeSaved: 40,
      timeUnit: "hrs/month",
      roi: 3,
      roiUnit: "weeks",
      improvement: 60,
      improvementLabel: "Faster Support ↑",
    },
    fullDetails: {
      techStack: ["Knowledge Base", "Chat AI"],
      timeline: "4 weeks",
      testimonial: "It handles about 70% of our questions before a human even needs to look at them.",
    },
  },
  {
    id: 5,
    clientType: "Smart Billing Helper",
    industry: "Trades & Construction",
    problem: "Sending quotes and following up on unpaid invoices was manual and slow.",
    solution: "A system that creates quotes from photos of notes and automatically reminds people when an invoice is due.",
    imageId: "case-billing",
    metrics: {
      timeSaved: 12,
      timeUnit: "hrs/week",
      roi: 3,
      roiUnit: "weeks",
      improvement: 25,
      improvementLabel: "Faster Pay ↑",
    },
    fullDetails: {
      techStack: ["Accounting Sync", "Auto-Reminders"],
      timeline: "3 weeks",
      testimonial: "We get paid faster now because the reminders go out the minute a bill is late.",
    },
  },
  {
    id: 6,
    clientType: "New Hire Onboarder",
    industry: "Growing Startups",
    problem: "Setting up accounts and sending training info to new employees was a messy, manual process.",
    solution: "A 'Team Bot' that sets up every new hire's accounts, sends their welcome pack, and schedules their first meetings.",
    imageId: "case-hr",
    metrics: {
      timeSaved: 8,
      timeUnit: "per hire",
      roi: 5,
      roiUnit: "weeks",
      improvement: 100,
      improvementLabel: "No Errors ↑",
    },
    fullDetails: {
      techStack: ["Slack Bot", "System Provisioning"],
      timeline: "4 weeks",
      testimonial: "Every new hire starts day one with everything they need. No more forgotten passwords or missing docs.",
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
            How to Save Time in My Business with Automation
          </h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
            Real-world examples of how AImatic helps San Diego businesses automate lead generation and follow-ups.
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
                      <div className="relative h-48 bg-muted/20 overflow-hidden">
                        {studyImg && (
                            <Image
                              src={studyImg.imageUrl}
                              alt={study.clientType}
                              fill
                              quality={60}
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                              data-ai-hint={studyImg.imageHint}
                              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
                              ROI in {study.metrics.roiUnit}
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
                          See Implementation <ArrowRight className="ml-2 w-3 h-3 transition-transform group-hover:translate-x-1" />
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
            <Button size="sm" className="mt-4 p-2" asChild>
              <a href="#contact">Build This System for My Team</a>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
