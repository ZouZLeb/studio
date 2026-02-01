"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Lock, Bug, Activity, Check } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";

const processSteps = [
  {
    id: 1,
    icon: ShieldCheck,
    title: "Threat Modeling",
    description: "Identify vulnerabilities before writing code.",
    details: [
      "Data flow analysis to map sensitive data paths",
      "Attack surface mapping to find potential entry points",
      "Compliance requirement review (GDPR, HIPAA, SOC 2)",
      "Vetting of all third-party integrations and APIs",
    ],
  },
  {
    id: 2,
    icon: Lock,
    title: "Secure Architecture",
    description: "Build on a production-grade foundation.",
    details: [
      "OAuth 2.0 / JWT for robust authentication",
      "End-to-end encryption for data in transit and at rest",
      "Principle of least privilege for role-based access",
      "API rate limiting & DDoS protection",
      "Secure secrets management (never hardcoded credentials)",
    ],
  },
  {
    id: 3,
    icon: Bug,
    title: "Testing & Validation",
    description: "Test against real-world attack scenarios.",
    details: [
      "Automated security scanning (OWASP Top 10)",
      "Manual penetration testing for business logic flaws",
      "Input validation & sanitization testing",
      "Rigorous error handling and fail-safe verification",
      "Load testing to ensure production readiness and stability",
    ],
  },
  {
    id: 4,
    icon: Activity,
    title: "Monitoring & Maintenance",
    description: "Continuous security and proactive upkeep.",
    details: [
      "Real-time error and anomaly tracking (e.g., Sentry)",
      "Uptime monitoring with a 99.9% SLA guarantee",
      "Automated dependency scanning and security patching",
      "Regular performance monitoring and optimization",
      "Optional monthly security audits and reports",
    ],
  },
];

export default function SecurityProcess() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <section id="security" className="bg-slate-900 text-primary-foreground">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">
            Built by Developers With Security Clearance
          </h2>
          <p className="text-lg text-primary-foreground/70 mt-4 max-w-3xl mx-auto">
            Every automation we build goes through our rigorous 4-stage security process before a single line of code is deployed to production.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-x-8 gap-y-4 mb-12 relative">
             <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-700 hidden md:block" />
            {processSteps.map((step, idx) => (
              <motion.div
                key={step.id}
                className="cursor-pointer text-center relative z-10"
                onClick={() => setActiveStep(step.id)}
                whileHover={{ scale: 1.05 }}
              >
                <div className={cn("mx-auto w-16 h-16 rounded-full border-4 flex items-center justify-center transition-all duration-300",
                activeStep === step.id ? 'bg-primary border-blue-300' : 'bg-gray-700 border-gray-600 hover:border-primary'
                )}>
                  <step.icon className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold mt-4 mb-1">{step.title}</h3>
                <p className="text-primary-foreground/60 text-sm">{step.description}</p>
              </motion.div>
            ))}
          </div>

          <Card className="bg-slate-800 border-slate-700">
            <AnimatePresence mode="wait">
              {activeStep && (
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <CardContent className="p-8">
                     <h3 className="text-xl font-bold mb-4 font-headline">{processSteps.find(s => s.id === activeStep)?.title} Deep Dive</h3>
                    <ul className="space-y-3">
                        {processSteps
                        .find((s) => s.id === activeStep)
                        ?.details.map((detail, idx) => (
                            <motion.li
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex items-start gap-3"
                            >
                            <Check className="w-5 h-5 mt-1 text-green-400 flex-shrink-0" />
                            <span>{detail}</span>
                            </motion.li>
                        ))}
                    </ul>
                  </CardContent>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </div>
      </div>
    </section>
  );
}
