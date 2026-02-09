"use client";

import { Check, ShieldCheck, Zap, Code, Database, UserCheck, FileText, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import Link from "next/link";

const valuePropositions = [
  {
    icon: ShieldCheck,
    title: "Cybersecurity Certified",
    description: "Every workflow is built by Security+ and AWS certified engineers, ensuring zero vulnerabilities in your data path."
  },
  {
    icon: Code,
    title: "100% IP Ownership",
    description: "You own the source code, the n8n workflows, and the custom scripts. No vendor lock-in, no recurring licensing fees."
  },
  {
    icon: Database,
    title: "Data Sovereignty",
    description: "We deploy to your private VPC or self-hosted servers. Your sensitive data never touches our infrastructure."
  },
  {
    icon: Zap,
    title: "No Per-Task Fees",
    description: "Stop paying SaaS taxes. Once built, you can run millions of tasks without the costs associated with Zapier or Make."
  },
  {
    icon: UserCheck,
    title: "Custom n8n Nodes",
    description: "We build proprietary nodes for your internal tools, providing deep integration that generic platforms can't offer."
  },
  {
    icon: FileText,
    title: "Full Documentation",
    description: "Every system comes with comprehensive technical docs and training for your internal team to maintain control."
  }
];

export default function Pricing() {
  return (
    <section id="pricing" className="bg-transparent md:py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-extrabold font-headline mb-4">
            The SecureAutomate Standard
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We don't just build automations; we engineer private, production-grade systems that your business owns completely.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 max-w-6xl mx-auto">
          {valuePropositions.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="flex gap-4 p-6 rounded-xl bg-card/40 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-colors h-full">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <item.icon className="w-6 h-6" />
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto bg-slate-900/90 backdrop-blur-md text-white rounded-2xl p-10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-yellow-400 to-primary"></div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold mb-2 flex items-center justify-center md:justify-start gap-2 text-white">
                <Globe className="text-primary w-6 h-6" /> Ready for a Private Build?
              </h3>
              <p className="text-gray-400 max-w-md">
                Get an accurate quote based on your specific complexity using our calculator or book a strategy session.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
               <Link href="#roi-calculator" className="btn-custom-glass opacity-80 hover:opacity-100">
                  <div className="btn-custom-glass-inner">
                    <div className="btn-custom-glass-text px-4">Use Cost Calculator</div>
                  </div>
               </Link>
               <Link href="#contact" className="btn-custom-glass">
                  <div className="btn-custom-glass-inner">
                    <div className="btn-custom-glass-text px-4">Book Architecture Audit</div>
                  </div>
               </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}