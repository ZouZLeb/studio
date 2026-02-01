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
import { ArrowRight, BarChart, FileText, FlaskConical, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const caseStudiesData = [
  {
    id: 1,
    clientType: "E-commerce Operations Manager",
    industry: "Retail",
    problem:
      "Spent 15+ hours weekly pulling sales data from Shopify, formatting in Excel, and manually sending reports to leadership. Prone to human error.",
    solution:
      "Built a custom Python automation that connects to the Shopify API, processes data, generates formatted Excel reports, and automatically emails them to stakeholders every Monday at 6 AM.",
    beforeImageId: "case-study-1-before",
    afterImageId: "case-study-1-after",
    metrics: {
      timeSaved: 15,
      timeUnit: "hrs/week",
      roi: 3,
      roiUnit: "weeks",
      errorReduction: 100,
    },
    fullDetails: {
      techStack: ["Python", "Shopify API", "Pandas", "SendGrid"],
      timeline: "2 weeks",
      testimonial:
        "This has been a game-changer for our team. What used to take up a significant portion of my Monday is now done before I even wake up. The accuracy is perfect, and we've been able to make faster decisions.",
    },
  },
  {
    id: 2,
    clientType: "SaaS Marketing Lead",
    industry: "Software",
    problem:
      "Manually syncing lead data from HubSpot to a custom analytics platform, resulting in a 48-hour delay in reporting and frequent data mismatches.",
    solution:
      "Developed a real-time data pipeline using webhooks. New HubSpot leads are instantly processed and pushed to the analytics platform's API, providing up-to-the-minute marketing insights.",
    beforeImageId: "case-study-2-before",
    afterImageId: "case-study-2-after",
    metrics: {
      timeSaved: 8,
      timeUnit: "hrs/week",
      roi: 4,
      roiUnit: "weeks",
      dataLag: 99,
    },
    fullDetails: {
      techStack: ["Node.js", "HubSpot API", "Webhooks", "PostgreSQL"],
      timeline: "3 weeks",
      testimonial:
        "Our marketing dashboards are now live. We can react to campaign performance in hours, not days. The integration has been flawless and has fundamentally improved our marketing agility.",
    },
  },
];

const IndustryBenchmarkCard = () => (
  <Card className="flex flex-col bg-muted/50">
    <CardContent className="p-6 flex-grow flex flex-col">
      <div className="mb-4">
        <BarChart className="w-10 h-10 text-primary" />
      </div>
      <h3 className="text-lg font-bold mb-2">Industry Benchmark Results</h3>
      <p className="text-sm text-muted-foreground mb-4">
        According to McKinsey research, AI automation delivers significant business impact.
      </p>
      <div className="space-y-4 text-sm mt-auto">
        <div className="flex items-center gap-3">
          <Zap className="w-5 h-5 text-primary" />
          <span><span className="font-bold">20-30%</span> of time saved with automation</span>
        </div>
        <div className="flex items-center gap-3">
          <FileText className="w-5 h-5 text-primary" />
          <span><span className="font-bold">45%</span> reduction in operational errors</span>
        </div>
        <div className="flex items-center gap-3">
          <FlaskConical className="w-5 h-5 text-primary" />
          <span>ROI typically achieved within <span className="font-bold">2-6 months</span></span>
        </div>
      </div>
       <Button variant="link" asChild className="mt-4 justify-start p-0 h-auto">
        <a href="#" target="_blank" rel="noopener noreferrer">
          View Research <ArrowRight className="ml-1 w-4 h-4" />
        </a>
      </Button>
    </CardContent>
  </Card>
);

export default function CaseStudies() {
  const [selectedCase, setSelectedCase] = useState<typeof caseStudiesData[0] | null>(null);

  const getImg = (id: string) => PlaceHolderImages.find((img) => img.id === id);

  return (
    <section id="case-studies" className="bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">
            Real Automations, Real Results
          </h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
            See how we&apos;ve transformed operations and delivered measurable value for businesses like yours.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {caseStudiesData.map((study, idx) => {
            const beforeImg = getImg(study.beforeImageId);
            const afterImg = getImg(study.afterImageId);
            return (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
            >
              <Card
                className="h-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 cursor-pointer group flex flex-col"
                onClick={() => setSelectedCase(study)}
              >
                <div className="relative h-48 bg-muted">
                  <div className="absolute inset-0 flex">
                    {beforeImg && (
                      <Image
                        src={beforeImg.imageUrl}
                        alt="Before automation"
                        width={300}
                        height={200}
                        className="w-1/2 h-full object-cover"
                        data-ai-hint={beforeImg.imageHint}
                      />
                    )}
                    {afterImg && (
                      <Image
                        src={afterImg.imageUrl}
                        alt="After automation"
                        width={300}
                        height={200}
                        className="w-1/2 h-full object-cover"
                        data-ai-hint={afterImg.imageHint}
                      />
                    )}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/90 text-foreground px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm">
                    BEFORE → AFTER
                  </div>
                   <Badge variant="secondary" className="absolute bottom-2 left-2">{study.industry}</Badge>
                </div>

                <CardContent className="p-6 flex-grow flex flex-col">
                  <h3 className="text-lg font-bold mb-3">{study.clientType}</h3>
                  <p className="text-sm text-muted-foreground mb-4 flex-grow">{study.problem}</p>
                  
                  <div className="grid grid-cols-3 gap-4 py-4 border-t border-b">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">
                        <CountUp end={study.metrics.timeSaved} duration={2} />{study.metrics.timeSaved % 1 !== 0 ? '' : '+'}
                      </div>
                      <div className="text-xs text-muted-foreground">Saved {study.metrics.timeUnit}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">
                        <CountUp end={study.metrics.roi} duration={2} />
                      </div>
                      <div className="text-xs text-muted-foreground">ROI in {study.metrics.roiUnit}</div>
                    </div>
                    <div className="text-center">
                       <div className="text-2xl font-bold text-primary">
                        <CountUp end={study.metrics.errorReduction || study.metrics.dataLag || 0} duration={2} suffix="%" />
                      </div>
                      <div className="text-xs text-muted-foreground">{study.metrics.errorReduction ? 'Error ↓' : 'Data Lag ↓'}</div>
                    </div>
                  </div>
                  
                  <Button variant="link" className="mt-4 self-start p-0 h-auto text-primary group-hover:underline">
                    View Full Case Study <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )})}
          <IndustryBenchmarkCard />
        </div>
      </div>

      <Dialog open={selectedCase !== null} onOpenChange={(isOpen) => !isOpen && setSelectedCase(null)}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <Badge variant="secondary" className="mb-2 w-fit">{selectedCase?.industry}</Badge>
            <DialogTitle className="text-2xl">{selectedCase?.clientType}</DialogTitle>
            <DialogDescription>{selectedCase?.problem}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div>
              <h4 className="font-semibold mb-2">Solution</h4>
              <p className="text-sm text-muted-foreground">{selectedCase?.solution}</p>
            </div>
             <div>
              <h4 className="font-semibold mb-2">Tech Stack</h4>
              <div className="flex flex-wrap gap-2">
                {selectedCase?.fullDetails.techStack.map(tech => <Badge key={tech} variant="outline">{tech}</Badge>)}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Project Timeline</h4>
              <p className="text-sm text-muted-foreground">{selectedCase?.fullDetails.timeline}</p>
            </div>
            {selectedCase?.fullDetails.testimonial && (
              <blockquote className="mt-2 border-l-2 pl-4 italic text-muted-foreground">
                "{selectedCase.fullDetails.testimonial}"
              </blockquote>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
