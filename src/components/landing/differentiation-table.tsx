"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

const comparisonData = [
  {
    feature: "Data Privacy & Safety",
    chatgpt: { status: "no", text: "Data shared with LLM providers" },
    nocode: { status: "partial", text: "Stored on 3rd party servers" },
    custom: { status: "yes", text: "100% Private & Self-Hosted" },
    details:
      "Generic AI tools often feed your sensitive business data back into training models. We build isolated systems where your data never leaves your private environment, ensuring complete security and compliance.",
  },
  {
    feature: "System Ownership",
    chatgpt: { status: "no", text: "Subscription-locked" },
    nocode: { status: "no", text: "Platform-dependent" },
    custom: { status: "yes", text: "You own the source code" },
    details:
      "Stop paying 'SaaS taxes'. When we build your system, we deliver the full source code and workflow files. You own the intellectual property 100%, with no recurring fees to keep your automation running.",
  },
  {
    feature: "Reliability & Scale",
    chatgpt: { status: "no", text: "Basic prompt logic" },
    nocode: { status: "partial", text: "Fragile templates" },
    custom: { status: "yes", text: "Production-grade code" },
    details:
      "Generic templates break when your business grows. We use professional engineering practices (Node.js/Python) to handle complex logic, multi-app syncs, and heavy workloads that no-code tools can't manage.",
  },
  {
    feature: "Engineering Standard",
    chatgpt: { status: "no", text: "Hobbyist level" },
    nocode: { status: "partial", text: "Standard drag-and-drop" },
    custom: { status: "yes", text: "Certified Security Engineers" },
    details:
      "We aren't just 'AI enthusiasts'. Every system is designed by Security+ and AWS certified developers using threat modeling, encryption, and the principle of least privilege.",
  },
];

const StatusIcon = ({ status }: { status: "yes" | "no" | "partial" }) => {
  if (status === "yes")
    return <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />;
  if (status === "no")
    return <XCircle className="w-5 h-5 text-red-500 mx-auto" />;
  return <AlertTriangle className="w-5 h-5 text-yellow-500 mx-auto" />;
};

export default function DifferentiationTable() {
  return (
    <section id="why-custom" className="bg-transparent">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">
            Automation Built for Professionals
          </h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
            Compare our engineering approach to generic "AI agencies" and standard no-code tools.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto bg-card/40 backdrop-blur-md rounded-2xl border border-border/50 shadow-sm overflow-hidden"
        >
          <div className="hidden md:grid md:grid-cols-5 p-5 border-b border-border/50 font-bold text-center bg-muted/20">
            <div className="text-left font-headline text-sm uppercase tracking-wider text-muted-foreground col-span-2">Strategic Benefit</div>
            <div className="text-xs uppercase tracking-tighter">AI Wrappers</div>
            <div className="text-xs uppercase tracking-tighter">No-Code Tools</div>
            <div className="text-xs uppercase tracking-tighter text-primary">Secure Build</div>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {comparisonData.map((row, idx) => (
              <AccordionItem value={`item-${idx}`} key={idx} className="border-border/50 last:border-0">
                <AccordionTrigger className="grid md:grid-cols-5 w-full p-5 hover:bg-muted/30 transition-colors text-left md:text-center group">
                  <span className="col-span-2 text-left font-bold text-foreground pr-4">
                    {row.feature}
                  </span>
                  <div className="hidden md:block">
                    <StatusIcon status={row.chatgpt.status} />
                  </div>
                  <div className="hidden md:block">
                    <StatusIcon status={row.nocode.status} />
                  </div>
                  <div className="hidden md:block">
                    <StatusIcon status={row.custom.status} />
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="px-5 pb-6 pt-2">
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="md:hidden grid grid-cols-2 gap-y-3 text-sm mb-6 border-b border-border/50 pb-6">
                        <div className="flex items-center gap-2">
                          <StatusIcon status={row.chatgpt.status} />
                          <span className="text-muted-foreground text-xs">AI Wrappers</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <StatusIcon status={row.nocode.status} />
                          <span className="text-muted-foreground text-xs">No-Code Tools</span>
                        </div>
                        <div className="flex items-center gap-2 col-span-2">
                          <StatusIcon status={row.custom.status} />
                          <span className="text-primary font-bold text-xs">Secure Custom Build</span>
                        </div>
                      </div>
                      
                      <div className="col-span-3">
                        <div className="bg-primary/5 p-4 rounded-xl border border-primary/10">
                           <p className="text-foreground/90 leading-relaxed italic">
                             "{row.details}"
                           </p>
                        </div>
                      </div>

                      <div className="hidden md:block space-y-1">
                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">AI Wrappers</h4>
                        <p className="text-sm font-medium opacity-80">{row.chatgpt.text}</p>
                      </div>
                      <div className="hidden md:block space-y-1">
                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">No-Code</h4>
                        <p className="text-sm font-medium opacity-80">{row.nocode.text}</p>
                      </div>
                      <div className="hidden md:block space-y-1">
                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-primary">Secure Build</h4>
                        <p className="text-sm font-bold">{row.custom.text}</p>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
