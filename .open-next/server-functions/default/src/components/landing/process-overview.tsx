"use client";

import { motion } from "framer-motion";
import { 
  PhoneCall, 
  FileText, 
  Code2, 
  ShieldCheck, 
  Rocket, 
  RefreshCcw
} from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { BrandName } from "../brand-name";

const steps = [
  {
    title: "Free Problem Review",
    description: "A quick 15-minute call to identify where your business is losing time and where automation can have the highest ROI.",
    icon: PhoneCall,
    badge: "Step 01",
    color: "text-blue-500",
    gradient: "from-blue-500 to-blue-500/20",
  },
  {
    title: "Custom Project Roadmap",
    description: "We provide a clear architectural scope with fixed pricing. No hidden fees, no per-task costs, and no monthly licensing.",
    icon: FileText,
    badge: "Step 02",
    color: "text-amber-500",
    gradient: "from-amber-500/20 to-amber-500",
  },
  {
    title: "Expert Engineering Phase",
    description: "Our security-certified developers build your private n8n or Python automation directly in your environment.",
    icon: Code2,
    badge: "Step 03",
    color: "text-purple-500",
    gradient: "from-purple-500 to-purple-500/20",
  },
  {
    title: "Security & Privacy Audit",
    description: "We perform rigorous hardening and testing to ensure your business data stays 100% private and proprietary.",
    icon: ShieldCheck,
    badge: "Step 04",
    color: "text-green-500",
    gradient: "from-green-500/20 to-green-500",
  },
  {
    title: "System Handover & IP",
    description: "You receive the keys. 100% ownership of your tools, source code, and comprehensive documentation.",
    icon: Rocket,
    badge: "Step 05",
    color: "text-red-500",
    gradient: "from-red-500 to-red-500/20",
  },
  {
    title: "Ongoing Maintenance",
    description: "Optional monthly support to keep your systems updated, secure, and scaling with your company's growth.",
    icon: RefreshCcw,
    badge: "Step 06",
    color: "text-cyan-500",
    gradient: "from-cyan-500/20 to-cyan-500",
  },
];

export default function ProcessOverview() {
  return (
    <section id="lifecycle" className="bg-transparent py-10 md:py-16 relative overflow-hidden" aria-labelledby="process-title">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 md:mb-20">
          <h2 id="process-title" className="text-3xl md:text-5xl font-black font-headline mb-4 tracking-tight">
            The <BrandName /> Engineering Lifecycle
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A developer-backed journey from manual tasks to complete, secure, and self-hosted business automation.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="absolute left-8 md:left-1/2 top-[80px] bottom-[80px] w-px bg-gradient-to-b from-primary/50 via-primary/20 to-primary/50 -translate-x-1/2 z-0" />

          <div className="space-y-12 md:space-y-0">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={cn(
                  "relative flex flex-col md:flex-row items-center justify-between min-h-[160px]",
                  idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                )}
              >
                <div 
                  className={cn(
                    "absolute top-1/2 -translate-y-1/2 h-[2px] z-[1] hidden md:block pointer-events-none opacity-40",
                    "bg-gradient-to-r",
                    step.gradient,
                    idx % 2 === 0 ? "right-1/2 w-[8%]" : "left-1/2 w-[8%]"
                  )} 
                />

                <div 
                  className={cn(
                    "absolute left-8 top-1/2 -translate-y-1/2 w-12 h-[2px] z-[1] block md:hidden pointer-events-none opacity-40",
                    "bg-gradient-to-r",
                    step.gradient
                  )} 
                />

                <article className={cn(
                  "w-full md:w-[42%] pl-20 md:pl-0 z-10",
                  idx % 2 === 0 ? "md:text-right" : "md:text-left"
                )}>
                  <Card className="border-border/50 bg-card/60 backdrop-blur-md hover:border-primary/50 transition-all duration-300 group shadow-none">
                    <CardContent className="p-6">
                      <div className={cn(
                        "flex items-center gap-2 mb-3",
                        idx % 2 === 0 ? "md:flex-row-reverse" : "flex-row"
                      )}>
                        <Badge variant="secondary" className="bg-primary/10 text-primary border-none text-[9px] uppercase font-bold tracking-[0.2em] px-2 py-0.5">
                          {step.badge}
                        </Badge>
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-foreground">
                        {step.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </CardContent>
                  </Card>
                </article>

                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center">
                  <div className={cn(
                    "w-12 h-12 rounded-full border-4 border-background bg-card flex items-center justify-center shadow-xl ring-1 ring-border",
                    "transition-transform duration-300"
                  )}>
                    <step.icon size={20} className={step.color} aria-hidden="true" />
                  </div>
                </div>

                <div className="hidden md:block w-[42%]" />
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-20 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center border-t border-border/30 pt-10">
            <div className="space-y-1">
               <h4 className="font-bold text-foreground text-sm uppercase tracking-tight">Zero SaaS Taxes</h4>
               <p className="text-[11px] text-muted-foreground">Run your business tools forever without task-based fees.</p>
            </div>
            <div className="space-y-1">
               <h4 className="font-bold text-foreground text-sm uppercase tracking-tight">Full System Ownership</h4>
               <p className="text-[11px] text-muted-foreground">You own 100% of the source code and workflow logic.</p>
            </div>
            <div className="space-y-1">
               <h4 className="font-bold text-foreground text-sm uppercase tracking-tight">Privacy First</h4>
               <p className="text-[11px] text-muted-foreground">Your sensitive proprietary data never touches our infrastructure.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
