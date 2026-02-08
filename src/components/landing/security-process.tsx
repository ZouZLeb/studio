"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Lock, Bug, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

const processSteps = [
  {
    id: 1,
    icon: ShieldCheck,
    title: "Privacy Audit & Modeling",
    description: "Map your data to ensure 0% leakage to third-parties.",
  },
  {
    id: 2,
    icon: Lock,
    title: "Secure Architecture",
    description: "Self-hosted, encrypted, and production-grade.",
  },
  {
    id: 3,
    icon: Bug,
    title: "Verification & Hardening",
    description: "Rigorous testing by security-certified engineers.",
  },
  {
    id: 4,
    icon: Activity,
    title: "Lifecycle Support",
    description: "Continuous monitoring and priority updates.",
  },
];

export default function SecurityProcess() {
  return (
    <section id="security" className="bg-transparent">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-foreground">
            Certified Security First. No Compromises.
          </h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
            We don't just build automations; we engineer secure systems. Our 4-stage lifecycle ensures your proprietary data stays proprietary.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 relative">
            {/* Subtle connecting line for desktop */}
            <div className="absolute top-12 left-0 w-full h-px bg-border/20 hidden md:block" />
            
            {processSteps.map((step, idx) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="text-center relative z-10 group"
              >
                <div className={cn(
                  "mx-auto w-20 h-20 rounded-full border border-border bg-card/40 backdrop-blur-md flex items-center justify-center transition-all duration-300",
                  "group-hover:border-primary/50 group-hover:bg-primary/5"
                )}>
                  <step.icon className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold mt-6 mb-2 text-foreground">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
