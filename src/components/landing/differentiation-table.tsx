"use client";

import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const comparisonData = [
  {
    feature: "Data Privacy",
    chatgpt: { status: "no", text: "Shared with LLMs" },
    nocode: { status: "partial", text: "Cloud Stored" },
    custom: { status: "yes", text: "100% Private" },
  },
  {
    feature: "Ownership",
    chatgpt: { status: "no", text: "Subscription Locked" },
    nocode: { status: "no", text: "Platform Owned" },
    custom: { status: "yes", text: "You own the Code" },
  },
  {
    feature: "Reliability",
    chatgpt: { status: "no", text: "Simple Prompts" },
    nocode: { status: "partial", text: "Fragile Templates" },
    custom: { status: "yes", text: "Production Grade" },
  },
  {
    feature: "Expert Build",
    chatgpt: { status: "no", text: "Hobbyist Level" },
    nocode: { status: "partial", text: "Generalist" },
    custom: { status: "yes", text: "Security Engineers" },
  },
];

const StatusIcon = ({ status }: { status: "yes" | "no" | "partial" }) => {
  if (status === "yes")
    return <CheckCircle className="w-5 h-5 text-green-500" />;
  if (status === "no")
    return <XCircle className="w-5 h-5 text-red-500" />;
  return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
};

export default function DifferentiationTable() {
  return (
    <section id="why-custom" className="bg-transparent py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black font-headline tracking-tight">
            Built for Professionals
          </h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
            A clear look at why real engineering beats generic shortcuts.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto bg-card/40 backdrop-blur-md rounded-2xl border border-border/50 shadow-xl overflow-hidden"
        >
          {/* Header */}
          <div className="grid grid-cols-2 md:grid-cols-4 p-6 border-b border-border/50 bg-muted/20 items-center">
            <div className="font-headline text-xs uppercase font-black tracking-widest text-muted-foreground hidden md:block">
              Strategic Benefit
            </div>
            <div className="text-center md:text-left text-xs uppercase font-bold text-muted-foreground md:col-start-2">
              AI Wrappers
            </div>
            <div className="text-center md:text-left text-xs uppercase font-bold text-muted-foreground">
              No-Code Tools
            </div>
            <div className="text-center md:text-left text-xs uppercase font-black tracking-widest text-primary">
              Secure Build
            </div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-border/30">
            {comparisonData.map((row, idx) => (
              <div 
                key={idx} 
                className="grid grid-cols-1 md:grid-cols-4 p-6 items-center gap-4 hover:bg-white/5 transition-colors"
              >
                <div className="font-bold text-foreground text-sm md:text-base">
                  {row.feature}
                </div>
                
                {/* AI Wrappers */}
                <div className="flex items-center gap-3 md:border-l md:border-border/20 md:pl-4">
                  <StatusIcon status={row.chatgpt.status as any} />
                  <span className="text-xs md:text-sm text-muted-foreground">{row.chatgpt.text}</span>
                </div>

                {/* No-Code */}
                <div className="flex items-center gap-3 md:border-l md:border-border/20 md:pl-4">
                  <StatusIcon status={row.nocode.status as any} />
                  <span className="text-xs md:text-sm text-muted-foreground">{row.nocode.text}</span>
                </div>

                {/* Secure Build */}
                <div className="flex items-center gap-3 md:border-l md:border-border/20 md:pl-4 bg-primary/5 -m-2 p-2 rounded-lg">
                  <StatusIcon status={row.custom.status as any} />
                  <span className="text-xs md:text-sm font-bold text-primary">{row.custom.text}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
        
        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">
            Zero Monthly SaaS Taxes • Complete Source Code Control • Security Certified
          </p>
        </div>
      </div>
    </section>
  );
}
