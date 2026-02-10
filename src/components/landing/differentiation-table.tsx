"use client";

import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const comparisonData = [
  {
    feature: "Your Privacy",
    chatgpt: { status: "no", text: "They see everything" },
    nocode: { status: "partial", text: "Stored in their cloud" },
    custom: { status: "yes", text: "100% Private" },
  },
  {
    feature: "Who Owns It?",
    chatgpt: { status: "no", text: "You rent it monthly" },
    nocode: { status: "no", text: "They own the platform" },
    custom: { status: "yes", text: "You own the code" },
  },
  {
    feature: "Reliability",
    chatgpt: { status: "no", text: "Simple & fragile" },
    nocode: { status: "partial", text: "Easily breaks" },
    custom: { status: "yes", text: "Built to last" },
  },
  {
    feature: "Expert Support",
    chatgpt: { status: "no", text: "DIY / Hobbyist" },
    nocode: { status: "partial", text: "General help" },
    custom: { status: "yes", text: "Pro Developers" },
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
            Built for Real Businesses
          </h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
            A clear look at why customized engineering beats generic shortcuts.
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
              Main Benefit
            </div>
            <div className="text-center md:text-left text-xs uppercase font-bold text-muted-foreground md:col-start-2">
              Standard AI
            </div>
            <div className="text-center md:text-left text-xs uppercase font-bold text-muted-foreground">
              DIY Tools
            </div>
            <div className="text-center md:text-left text-xs uppercase font-black tracking-widest text-primary">
              Our Custom Build
            </div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-border/30">
            {comparisonData.map((row, idx) => (
              <div 
                key={idx} 
                className="grid grid-cols-1 md:grid-cols-4 p-6 items-center hover:bg-white/5 transition-colors"
              >
                <div className="font-bold text-foreground text-sm md:text-base">
                  {row.feature}
                </div>
                
                {/* Standard AI */}
                <div className="flex items-center gap-3 md:border-l md:border-border/20">
                  <StatusIcon status={row.chatgpt.status as any} />
                  <span className="text-xs md:text-sm text-muted-foreground">{row.chatgpt.text}</span>
                </div>

                {/* DIY Tools */}
                <div className="flex items-center gap-3 md:border-l md:border-border/20">
                  <StatusIcon status={row.nocode.status as any} />
                  <span className="text-xs md:text-sm text-muted-foreground">{row.nocode.text}</span>
                </div>

                {/* Custom Build */}
                <div className="flex items-center gap-3 md:border-l md:border-border/20 bg-primary/5 -m-2 p-2 rounded-lg">
                  <StatusIcon status={row.custom.status as any} />
                  <span className="text-xs md:text-sm font-bold text-primary">{row.custom.text}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
        
        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">
            No Monthly Fees • You Own the Code • Private & Secure
          </p>
        </div>
      </div>
    </section>
  );
}
