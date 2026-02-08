"use client";

import { motion } from "framer-motion";
import { 
  PhoneCall, 
  FileText, 
  Code2, 
  ShieldCheck, 
  Rocket, 
  RefreshCcw,
  ArrowRight
} from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";

const steps = [
  {
    title: "Free Architecture Audit",
    description: "A 15-minute technical review of your manual bottlenecks.",
    icon: PhoneCall,
    badge: "Free",
    color: "text-blue-500",
  },
  {
    title: "Fixed-Fee Blueprint",
    description: "Complete system scope with transparent, guaranteed pricing.",
    icon: FileText,
    badge: "Fixed Price",
    color: "text-amber-500",
  },
  {
    title: "Secure Custom Build",
    description: "n8n workflows & custom scripts built for your private VPC.",
    icon: Code2,
    badge: "n8n + Code",
    color: "text-purple-500",
  },
  {
    title: "Security Validation",
    description: "Rigorous testing to ensure 0% data leakage to third-parties.",
    icon: ShieldCheck,
    badge: "Private",
    color: "text-green-500",
  },
  {
    title: "System Handover",
    description: "You receive the source code. 100% IP ownership. No vendor lock-in.",
    icon: Rocket,
    badge: "You Own It",
    color: "text-red-500",
  },
  {
    title: "Managed Support",
    description: "Optional ongoing priority updates and lifecycle monitoring.",
    icon: RefreshCcw,
    badge: "Optional",
    color: "text-cyan-500",
  },
];

export default function ProcessOverview() {
  return (
    <section id="services" className="bg-transparent py-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-black font-headline mb-4 tracking-tight">
            The Engineering Lifecycle
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A transparent, security-first process designed to transition your team from manual work to complete automation ownership.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative group"
            >
              <Card className="h-full border-border/50 bg-card/40 backdrop-blur-md hover:border-primary/50 transition-all duration-300">
                <CardContent className="pt-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className={`p-3 rounded-xl bg-muted/20 ${step.color} group-hover:scale-110 transition-transform duration-300`}>
                      <step.icon size={32} />
                    </div>
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-none text-[10px] uppercase font-bold tracking-widest">
                      {step.badge}
                    </Badge>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                    <span className="text-primary/40 text-sm font-mono tracking-tighter">0{idx + 1}</span>
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
              
              {/* Desktop arrow connector */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-muted-foreground/20">
                  <ArrowRight size={24} className="group-hover:text-primary/40 transition-colors" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <div className="mt-16 max-w-4xl mx-auto">
          <div className="grid sm:grid-cols-3 gap-4 text-center">
            <div className="p-4 border-r border-border/30 last:border-0">
               <h4 className="font-bold text-foreground">Zero Task Fees</h4>
               <p className="text-xs text-muted-foreground mt-1">Once built, run unlimited tasks on your own hardware.</p>
            </div>
            <div className="p-4 border-r border-border/30 last:border-0">
               <h4 className="font-bold text-foreground">Complete IP</h4>
               <p className="text-xs text-muted-foreground mt-1">Full source code and documentation provided at handover.</p>
            </div>
            <div className="p-4 last:border-0">
               <h4 className="font-bold text-foreground">Data Sovereignty</h4>
               <p className="text-xs text-muted-foreground mt-1">Your proprietary data never touches our servers.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
