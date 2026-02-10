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

const steps = [
  {
    title: "Free Problem Review",
    description: "A quick 15-minute call to find where your business is losing time.",
    icon: PhoneCall,
    badge: "Step 01",
    color: "text-blue-500",
    gradient: "from-blue-500 to-blue-500/20",
  },
  {
    title: "Get Your Custom Plan",
    description: "We give you a clear project scope with a one-time fixed price.",
    icon: FileText,
    badge: "Step 02",
    color: "text-amber-500",
    gradient: "from-amber-500/20 to-amber-500",
  },
  {
    title: "We Build Your System",
    description: "Our developers write the code and set up your private automation.",
    icon: Code2,
    badge: "Step 03",
    color: "text-purple-500",
    gradient: "from-purple-500 to-purple-500/20",
  },
  {
    title: "Privacy & Safety Check",
    description: "We test everything to ensure your company data stays 100% private.",
    icon: ShieldCheck,
    badge: "Step 04",
    color: "text-green-500",
    gradient: "from-green-500/20 to-green-500",
  },
  {
    title: "Handover & Training",
    description: "You get the keys. 100% ownership of your tools with full instructions.",
    icon: Rocket,
    badge: "Step 05",
    color: "text-red-500",
    gradient: "from-red-500 to-red-500/20",
  },
  {
    title: "Ongoing Support",
    description: "Optional monthly help to keep your systems updated and growing.",
    icon: RefreshCcw,
    badge: "Step 06",
    color: "text-cyan-500",
    gradient: "from-cyan-500/20 to-cyan-500",
  },
];

export default function ProcessOverview() {
  return (
    <section id="lifecycle" className="bg-transparent py-10 md:py-16 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-3xl md:text-5xl font-black font-headline mb-4 tracking-tight">
            How We Work Together
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A simple, step-by-step journey from manual work to complete automation.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="absolute left-8 md:left-1/2 top-[60px] bottom-[60px] w-px bg-gradient-to-b from-primary/50 via-primary/30 to-primary/50 -translate-x-1/2 z-0" />

          <div className="space-y-12 md:space-y-0">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={cn(
                  "relative flex flex-col md:flex-row items-center justify-between min-h-[140px]",
                  idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                )}
              >
                <div 
                  className={cn(
                    "absolute top-1/2 -translate-y-1/2 h-[2px] z-[1] hidden md:block pointer-events-none bg-gradient-to-r",
                    step.gradient,
                    idx % 2 === 0 ? "right-1/2 w-[8%]" : "left-1/2 w-[8%]"
                  )} 
                />

                <div 
                  className={cn(
                    "absolute left-8 top-1/2 -translate-y-1/2 w-12 h-[2px] z-[1] block md:hidden pointer-events-none bg-gradient-to-r",
                    step.gradient
                  )} 
                />

                <div className={cn(
                  "w-full md:w-[42%] pl-20 md:pl-0 z-10",
                  idx % 2 === 0 ? "md:text-right" : "md:text-left"
                )}>
                  <Card className="border-border/50 bg-card/60 backdrop-blur-md hover:border-primary/50 transition-all duration-300 group shadow-none hover:shadow-lg">
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
                </div>

                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center">
                  <div className={cn(
                    "w-12 h-12 rounded-full border-4 border-background bg-card flex items-center justify-center shadow-xl ring-1 ring-border",
                    "hover:scale-110 transition-transform duration-300 group"
                  )}>
                    <step.icon size={20} className={step.color} />
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
               <h4 className="font-bold text-foreground text-sm uppercase tracking-tight">Zero Monthly Fees</h4>
               <p className="text-[11px] text-muted-foreground">Run your tools forever without per-task costs.</p>
            </div>
            <div className="space-y-1">
               <h4 className="font-bold text-foreground text-sm uppercase tracking-tight">Full Ownership</h4>
               <p className="text-[11px] text-muted-foreground">You get 100% of the code and instructions at handover.</p>
            </div>
            <div className="space-y-1">
               <h4 className="font-bold text-foreground text-sm uppercase tracking-tight">100% Privacy</h4>
               <p className="text-[11px] text-muted-foreground">Your business data never touches our servers.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
