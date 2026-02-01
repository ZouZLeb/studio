"use client";

import { motion } from "framer-motion";
import { Bot, Link2, MessageSquare, Code, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";

const services = [
  {
    id: 1,
    icon: Bot,
    title: "AI-Powered Workflow Automation",
    description: "Eliminate repetitive, manual tasks that drain your team's time and introduce errors.",
    examples: [
      "Automated data entry and CRM updates",
      "Dynamic report generation (sales, finance, ops)",
      "Intelligent email processing & response routing",
      "Document data extraction (invoices, forms, etc.)",
    ],
    roi: "Save 10-25 hours/week per employee",
    color: "text-blue-400",
  },
  {
    id: 2,
    icon: Link2,
    title: "System Integration & API Development",
    description: "Connect your disconnected software tools into one seamless, automated workflow.",
    examples: [
      "Real-time Shopify ↔ QuickBooks sync",
      "Salesforce ↔ Marketing platform integration",
      "Custom connectors for proprietary databases",
      "Legacy system modernization & API wrapping",
    ],
    roi: "Eliminate 5-10 hours/week of data transfer",
    color: "text-purple-400",
  },
  {
    id: 3,
    icon: MessageSquare,
    title: "Custom AI Chatbots & Support",
    description: "Provide 24/7 intelligent support that actually understands your business context.",
    examples: [
      "Internal knowledge base chatbots for employees",
      "Customer support ticket triage and resolution",
      "Website lead qualification and meeting scheduling",
      "Interactive training & onboarding assistants",
    ],
    roi: "Handle 60-80% of routine inquiries instantly",
    color: "text-green-400",
  },
];

export default function ServicesOverview() {
  return (
    <section id="services" className="bg-white dark:bg-slate-950/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">What We Build For You</h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
            From single-task automation to complex system integrations, we build custom solutions, not cookie-cutter templates.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {services.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="h-full"
            >
              <Card className="h-full flex flex-col hover:border-primary transition-colors hover:shadow-lg">
                <CardHeader>
                  <div className="mb-4">
                     <service.icon className={`w-12 h-12 ${service.color}`} />
                  </div>
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col flex-grow">
                  <p className="text-muted-foreground mb-6 flex-grow">
                    {service.description}
                  </p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-sm mb-3">
                      Common Examples:
                    </h4>
                    <ul className="space-y-2">
                      {service.examples.map((example, i) => (
                        <li
                          key={i}
                          className="text-sm text-muted-foreground flex items-start gap-2"
                        >
                          <span className={`${service.color} mt-1`}>•</span>
                          <span>{example}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t mt-auto">
                     <Badge variant="secondary" className="bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300">
                        <Zap className="w-4 h-4 mr-2" /> {service.roi}
                     </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
