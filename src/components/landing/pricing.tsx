"use client";

import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import Link from "next/link";
import { cn } from "@/lib/utils";

const pricingTiers = [
  {
    name: "Starter",
    price: "$399",
    priceDetail: "one-time",
    bestFor: "Single workflow automation",
    features: [
      "1 automated workflow",
      "Up to 2 system integrations",
      "Basic error handling",
      "Email notifications",
    ],
    timeline: "1-2 weeks",
    cta: "Get Started",
    ctaLink: "#contact",
    highlighted: false,
  },
  {
    name: "Professional",
    price: "$1,500 - $3k",
    priceDetail: "one-time project",
    bestFor: "Multi-system integrations",
    features: [
      "Multiple automated workflows",
      "3-5 system integrations",
      "Advanced AI processing",
      "Custom dashboard/UI",
      "Comprehensive error handling",
    ],
    timeline: "2-4 weeks",
    cta: "Schedule Consultation",
    ctaLink: "#contact",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "$5k+",
    priceDetail: "custom scope",
    bestFor: "Complex, scalable systems",
    features: [
      "Unlimited workflows",
      "Enterprise-grade security",
      "Custom AI models",
      "Dedicated support & SLA",
      "Priority updates",
    ],
    timeline: "4-8 weeks",
    cta: "Contact Us",
    ctaLink: "#contact",
    highlighted: false,
  },
];

const includedFeatures = [
    "Full Security Audit",
    "Thorough Testing",
    "Complete Documentation",
    "30-Day Post-Launch Support",
]

export default function Pricing() {
  return (
    <section id="pricing" className="bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">
            Transparent Pricing. No Hidden Fees.
          </h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
            We believe in upfront pricing. Choose a plan that fits your needs, or contact us for a custom quote.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-12 items-start">
          {pricingTiers.map((tier, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={cn(tier.highlighted && "transform lg:scale-105 z-10")}
            >
              <Card
                className={cn(
                  "h-full flex flex-col",
                  tier.highlighted
                    ? "bg-primary text-primary-foreground border-2 border-primary"
                    : "bg-card"
                )}
              >
                <div className="p-8">
                  {tier.highlighted && (
                    <div className="bg-yellow-400 text-blue-900 text-xs font-bold py-1 px-3 rounded-full inline-block mb-4 absolute -top-4">
                      MOST POPULAR
                    </div>
                  )}
                  <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                  <p className={cn("mb-4", tier.highlighted ? "text-primary-foreground/80" : "text-muted-foreground")}>
                    {tier.bestFor}
                  </p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">{tier.price}</span>
                    <span className={cn("text-sm ml-2", tier.highlighted ? "text-primary-foreground/70" : "text-muted-foreground")}>
                      {tier.priceDetail}
                    </span>
                  </div>
                  
                  <Button asChild className={cn("w-full", !tier.highlighted && "bg-primary")} size="lg">
                    <Link href={tier.ctaLink}>{tier.cta}</Link>
                  </Button>
                </div>
                
                <div className="p-8 bg-black/5 dark:bg-white/5 flex-grow">
                   <h4 className="font-semibold mb-3">Top features:</h4>
                  <ul className="space-y-3">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check
                          className={cn("w-5 h-5 mt-0.5 flex-shrink-0", tier.highlighted ? "text-green-300" : "text-green-600")}
                        />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                 <div className="p-8 border-t dark:border-white/10">
                    <span className="text-sm font-semibold">Typical Timeline: </span>
                    <span className="text-sm">{tier.timeline}</span>
                  </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center bg-card rounded-lg p-6 max-w-4xl mx-auto border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">All Plans Include:</h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {includedFeatures.map((feature, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-green-600" />
                    <span>{feature}</span>
                </div>
            ))}
          </div>
          <p className="text-muted-foreground text-sm mt-4">
            No recurring monthly fees unless you request an ongoing maintenance and support package.
          </p>
        </div>
      </div>
    </section>
  );
}
