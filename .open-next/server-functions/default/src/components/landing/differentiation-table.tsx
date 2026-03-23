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
    return <CheckCircle className="w-5 h-5 text-green-500 shadow-sm" />;
  if (status === "no")
    return <XCircle className="w-5 h-5 text-red-500 shadow-sm" />;
  return <AlertTriangle className="w-5 h-5 text-yellow-500 shadow-sm" />;
};

export default function DifferentiationTable() {
  return (
    <section id="why-custom" className="bg-transparent py-12 md:py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black font-headline tracking-tighter mb-4">
            Built for Real Businesses
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-medium">
            A clear look at why customized engineering beats generic shortcuts.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto bg-card/30 backdrop-blur-xl rounded-3xl border border-border/40 shadow-2xl overflow-hidden"
        >
          {/* Header - Hidden on small mobile, grid on desktop */}
          <div className="hidden md:grid grid-cols-4 p-6 border-b border-border/50 bg-muted/30 items-center">
            <div className="font-headline text-[10px] uppercase font-black tracking-[0.2em] text-muted-foreground">
              Core Engineering
            </div>
            <div className="text-xs uppercase font-bold text-muted-foreground/80 pl-4 border-l border-border/20">
              Standard AI
            </div>
            <div className="text-xs uppercase font-bold text-muted-foreground/80 pl-4 border-l border-border/20">
              DIY Tools
            </div>
            <div className="text-xs uppercase font-black tracking-[0.1em] text-primary">
              Our Custom Build
            </div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-border/20">
            {comparisonData.map((row, idx) => (
              <div 
                key={idx} 
                className="flex flex-col md:grid md:grid-cols-4 p-6 md:p-7 gap-6 md:gap-0 items-start md:items-center hover:bg-white/[0.02] transition-colors"
              >
                {/* Feature Title */}
                <div className="font-black text-center md:text-left text-foreground text-base md:text-sm tracking-tight w-full md:w-auto">
                  {row.feature}
                </div>
                
                {/* Options Container - Flex wrap on mobile, Grid children on desktop */}
                <div className="flex flex-wrap gap-4 md:contents w-full">
                  {/* Standard AI */}
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-2 md:gap-3 md:border-l md:border-border/20 md:pl-0 min-w-[140px] flex-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/80 md:hidden">Standard AI</span>
                    <div className="flex items-center gap-2.5">
                      <StatusIcon status={row.chatgpt.status as any} />
                      <span className="text-sm text-muted-foreground/80 font-medium">{row.chatgpt.text}</span>
                    </div>
                  </div>

                  {/* DIY Tools */}
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-2 md:gap-3 md:border-l md:border-border/20 md:pl-0 min-w-[140px] flex-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/80 md:hidden">DIY Tools</span>
                    <div className="flex items-center gap-2.5">
                      <StatusIcon status={row.nocode.status as any} />
                      <span className="text-sm text-muted-foreground/80 font-medium">{row.nocode.text}</span>
                    </div>
                  </div>

                  {/* Custom Build */}
                  <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3 md:border-l md:border-border/20 md:pl-4 bg-primary/10 md:bg-primary/5 p-4 md:p-4 rounded-2xl w-full md:w-auto md:h-full md:-my-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-primary/60 md:hidden">The AImatic Way</span>
                    <div className="flex items-center gap-2.5">
                      <StatusIcon status={row.custom.status as any} />
                      <span className="text-sm font-bold text-primary">{row.custom.text}</span>
                    </div>
                  </div>
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
