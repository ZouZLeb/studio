
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
import { ArrowRight, FileText, Zap, ShieldCheck } from "lucide-react";
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
    clientType: "Omni-Channel Lead Concierge",
    industry: "Sales & Real Estate",
    problem: "Leads arriving via Email, DMs, and SMS were being missed or taking 12+ hours to receive a response.",
    solution: "A private n8n-powered AI agent that handles instant responses across all channels. It qualifies leads, inserts data into the CRM, and books appointments on the sales team's calendar automatically.",
    imageId: "case-leads",
    metrics: {
      timeSaved: 20,
      timeUnit: "hrs/week",
      roi: 2,
      roiUnit: "weeks",
      improvement: 95,
      improvementLabel: "Response Rate ↑",
    },
    fullDetails: {
      techStack: ["n8n", "OpenAI API (Private)", "Twilio", "HubSpot"],
      timeline: "2 weeks",
      testimonial: "The response is so fast and natural that clients think they are talking to a dedicated assistant. It's booked 15 meetings this week alone without us touching it.",
    },
  },
  {
    id: 2,
    clientType: "The 'Infinite Pipeline' Marketing Engine",
    industry: "SaaS & Agencies",
    problem: "Thousands of old leads were sitting dormant in the database because the manual follow-up workload was impossible.",
    solution: "An automated sales system that initiates personalized conversations with all leads, revisits 'cold' leads every 30 days, and notifies the team via Slack only when a lead shows 'high-intent' buying signals.",
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
      techStack: ["n8n", "Node.js", "Slack API", "Custom Lead Scoring"],
      timeline: "3 weeks",
      testimonial: "It's like having a 24/7 sales rep who never gets tired. We are closing deals from leads we talked to 6 months ago that we would have otherwise forgotten.",
    },
  },
  {
    id: 3,
    clientType: "Autonomous Project Architect",
    industry: "Construction & Engineering",
    problem: "Project blueprints, inventory dispatching, and client status updates were manual, causing frequent delays and overhead.",
    solution: "A trained project agent that handles blueprint preparation, inventory checks via ERP, and streamlines the entire project status workflow for the client portal.",
    imageId: "case-pm",
    metrics: {
      timeSaved: 15,
      timeUnit: "hrs/week",
      roi: 4,
      roiUnit: "weeks",
      improvement: 60,
      improvementLabel: "Admin Work ↓",
    },
    fullDetails: {
      techStack: ["Python", "n8n", "ERP Integration", "Auto-Blueprinting"],
      timeline: "5 weeks",
      testimonial: "Admin overhead was killing our margins. This system handles the paperwork so our engineers can actually focus on building.",
    },
  },
  {
    id: 4,
    clientType: "Precision Invoice & Quote Engine",
    industry: "Professional Services",
    problem: "Crafting quotes and invoices took hours of manual data entry and was prone to pricing errors.",
    solution: "A custom generator that takes client details and project scope to craft perfect quotes with dynamic discounts. Once agreed, it generates a full invoice and sends it directly via the client's preferred channel.",
    imageId: "case-billing",
    metrics: {
      timeSaved: 8,
      timeUnit: "hrs/week",
      roi: 2,
      roiUnit: "weeks",
      improvement: 100,
      improvementLabel: "Accuracy ↑",
    },
    fullDetails: {
      techStack: ["Node.js", "n8n", "Stripe API", "PDF Generation"],
      timeline: "2 weeks",
      testimonial: "What used to take half a day now happens in 2 minutes. The professional look of our quotes has significantly increased our win rate.",
    },
  },
  {
    id: 5,
    clientType: "Smart Recruitment & Onboarding",
    industry: "Corporate HR",
    problem: "Screening hundreds of resumes and manually handling new hire paperwork was slowing down company growth.",
    solution: "Automated screening logic that ranks candidates based on criteria, schedules interviews, and handles the entire document signature and onboarding sequence without human intervention.",
    imageId: "case-hr",
    metrics: {
      timeSaved: 25,
      timeUnit: "hrs/week",
      roi: 6,
      roiUnit: "weeks",
      improvement: 70,
      improvementLabel: "Hiring Speed ↑",
    },
    fullDetails: {
      techStack: ["n8n", "Greenhouse API", "DocuSign", "Private LLM"],
      timeline: "4 weeks",
      testimonial: "Our HR team can finally focus on culture and strategy rather than chasing signatures and sorting through resumes.",
    },
  },
  {
    id: 6,
    clientType: "Secure Knowledge Base Assistant",
    industry: "Enterprise / Legal",
    problem: "Staff spent hours searching through internal documentation and legacy files for technical answers.",
    solution: "A self-hosted, private AI assistant integrated with the company's internal tools. It provides instant, accurate answers while ensuring zero data leaks to public LLM models.",
    imageId: "case-support",
    metrics: {
      timeSaved: 12,
      timeUnit: "hrs/staff/mo",
      roi: 8,
      roiUnit: "weeks",
      improvement: 50,
      improvementLabel: "Search Time ↓",
    },
    fullDetails: {
      techStack: ["PostgreSQL (Vector)", "n8n", "Custom Python RAG", "Self-Hosted"],
      timeline: "6 weeks",
      testimonial: "Our data is our lifeblood. Having a system this smart that we also completely own and control is the ultimate competitive advantage.",
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
            Real Automations, Real Results
          </h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
            High-performance systems built by software engineers, designed for security and massive ROI.
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
                      className="h-full overflow-hidden transition-all duration-300 bg-card/40 backdrop-blur-md hover:shadow-2xl hover:-translate-y-1 cursor-pointer group flex flex-col border-border/50"
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
                          View Full System Details <ArrowRight className="ml-2 w-3 h-3 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <div className="hidden md:block">
              <CarouselPrevious className="-left-12 h-10 w-10" />
              <CarouselNext className="-right-12 h-10 w-10" />
            </div>
          </Carousel>
        </div>

        <div className="mt-16 max-w-5xl mx-auto">
          <Card className="flex flex-col md:flex-row bg-card/40 backdrop-blur-md border-border/50 border-dashed p-8 items-center gap-8">
            <div className="flex-shrink-0 bg-primary/10 p-4 rounded-full">
              <ShieldCheck className="w-12 h-12 text-primary" />
            </div>
            <div className="flex-grow text-center md:text-left">
              <h3 className="text-xl font-bold mb-2">The Engineering Standard</h3>
              <p className="text-sm text-muted-foreground mb-4 max-w-2xl">
                Generic AI wrappers put your data at risk. Our engineered systems ensure complete sovereignty, full source code ownership, and enterprise-grade security.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 text-[11px] uppercase tracking-wider font-bold text-primary">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  <span>100% IP Ownership</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Zero Data Leakage</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  <span>Custom Code Logic</span>
                </div>
              </div>
            </div>
            <div className="flex-shrink-0 w-full md:w-auto">
              <Button size="lg" className="w-full md:w-auto" asChild>
                <a href="#contact">Request Architecture Audit</a>
              </Button>
            </div>
          </Card>
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
              <h4 className="font-semibold mb-2">The Engineered Solution</h4>
              <p className="text-sm text-muted-foreground">{selectedCase?.solution}</p>
            </div>
             <div>
              <h4 className="font-semibold mb-2">Technology Stack</h4>
              <div className="flex flex-wrap gap-2">
                {selectedCase?.fullDetails.techStack.map(tech => <Badge key={tech} variant="outline">{tech}</Badge>)}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Build Timeline</h4>
              <p className="text-sm text-muted-foreground">{selectedCase?.fullDetails.timeline}</p>
            </div>
            {selectedCase?.fullDetails.testimonial && (
              <blockquote className="mt-2 border-l-2 pl-4 italic text-muted-foreground bg-muted/20 py-4 pr-4 rounded-r-lg">
                "{selectedCase.fullDetails.testimonial}"
              </blockquote>
            )}
            <Button size="lg" className="w-full mt-4" asChild>
              <a href="#contact">Discuss a Similar Build for Your Team</a>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
