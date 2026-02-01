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
    feature: "Integration with existing systems",
    chatgpt: { status: "no", text: "Copy/paste only" },
    nocode: { status: "partial", text: "Limited connectors" },
    custom: { status: "yes", text: "Full API integration" },
    details:
      "ChatGPT requires manual data transfer. No-code tools like Zapier offer thousands of connectors but can't handle custom or legacy systems. We build direct API connections to ANY system your business uses: from Salesforce to a proprietary database.",
  },
  {
    feature: "Security & compliance",
    chatgpt: { status: "no", text: "No control" },
    nocode: { status: "partial", text: "Basic encryption" },
    custom: { status: "yes", text: "SOC 2 ready, custom controls" },
    details:
      "Using public tools for sensitive data is a risk. No-code platforms offer basic security but may not meet strict compliance needs. Our custom builds are designed for SOC 2, HIPAA, or GDPR compliance from the ground up.",
  },
  {
    feature: "Handles complex edge cases",
    chatgpt: { status: "no", text: "Breaks easily" },
    nocode: { status: "no", text: "Rigid workflows" },
    custom: { status: "yes", text: "Resilient error handling" },
    details:
      "Templates and prompts fail when something unexpected happens. No-code tools follow rigid paths. We build robust error handling and logic to manage real-world complexity, ensuring your automation doesn't stop when an anomaly occurs.",
  },
  {
    feature: "Scalability & performance",
    chatgpt: { status: "no", text: "Manual per request" },
    nocode: { status: "partial", text: "Expensive at scale" },
    custom: { status: "yes", text: "Production-grade infrastructure" },
    details:
      "No-code tools become prohibitively expensive as your usage grows (per 'task' or 'zap'). We build solutions on scalable cloud infrastructure (like AWS/GCP) that handle high volume efficiently and cost-effectively.",
  },
  {
    feature: "Maintenance & support",
    chatgpt: { status: "no", text: "You handle" },
    nocode: { status: "no", text: "You handle" },
    custom: { status: "yes", text: "Included in package" },
    details:
      "When a third-party tool changes its API, your no-code workflow breaks, and it's your problem to fix. We provide ongoing support and maintenance to ensure your custom automation remains operational long-term.",
  },
];

const StatusIcon = ({ status }: { status: "yes" | "no" | "partial" }) => {
  if (status === "yes")
    return <CheckCircle className="w-6 h-6 text-green-600 mx-auto" />;
  if (status === "no")
    return <XCircle className="w-6 h-6 text-red-600 mx-auto" />;
  return <AlertTriangle className="w-6 h-6 text-yellow-500 mx-auto" />;
};

export default function DifferentiationTable() {
  return (
    <section id="why-custom" className="bg-white dark:bg-slate-950/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">
            Why Custom Automation Beats Prompts
          </h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
            An informed decision requires a clear comparison. Here&apos;s how the options stack up on key business criteria.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto bg-card rounded-lg border shadow-sm"
        >
          <div className="hidden md:grid md:grid-cols-5 p-4 border-b font-bold text-center">
            <div className="text-left font-headline text-lg col-span-2">Feature</div>
            <div>ChatGPT/Templates</div>
            <div>No-Code Tools</div>
            <div>Custom Build</div>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {comparisonData.map((row, idx) => (
              <AccordionItem value={`item-${idx}`} key={idx}>
                <AccordionTrigger className="grid md:grid-cols-5 w-full p-4 hover:bg-muted/50 transition-colors text-left md:text-center group">
                  <span className="col-span-2 text-left font-semibold text-foreground">
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
                  <div className="p-6 bg-primary/5 border-t">
                    <p className="text-muted-foreground mb-4 md:hidden">
                        A detailed look at how each option performs.
                    </p>
                    <div className="grid md:grid-cols-3 gap-6 text-sm">
                      <div className="md:hidden grid grid-cols-2 gap-y-2 text-sm mb-4 border-b pb-4">
                        <span className="font-semibold">ChatGPT:</span> <StatusIcon status={row.chatgpt.status} />
                        <span className="font-semibold">No-Code:</span> <StatusIcon status={row.nocode.status} />
                        <span className="font-semibold">Custom:</span> <StatusIcon status={row.custom.status} />
                      </div>
                      <div className="md:hidden">
                        <p className="text-foreground">{row.details}</p>
                      </div>
                      <div className="hidden md:block">
                        <h4 className="font-bold mb-2">ChatGPT/Templates</h4>
                        <p className="text-muted-foreground">{row.chatgpt.text}</p>
                      </div>
                      <div className="hidden md:block">
                        <h4 className="font-bold mb-2">No-Code Tools</h4>
                        <p className="text-muted-foreground">{row.nocode.text}</p>
                      </div>
                      <div className="hidden md:block">
                        <h4 className="font-bold mb-2">Custom Build</h4>
                        <p className="text-muted-foreground">{row.custom.text}</p>
                      </div>
                    </div>
                     <p className="hidden md:block text-muted-foreground mt-4 pt-4 border-t">{row.details}</p>
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
