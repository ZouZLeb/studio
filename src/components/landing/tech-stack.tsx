"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  OpenAILogo,
  AnthropicLogo,
  LangChainLogo,
  PythonLogo,
  NodeJsLogo,
  PostgreSQLLogo,
  AWSLogo,
  DockerLogo,
  HubSpotLogo,
  SlackLogo,
  JiraLogo,
  OAuthLogo,
} from "../icons/tech-logos";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import type { FC, SVGProps } from "react";

type Tech = {
  name: string;
  logo: FC<SVGProps<SVGSVGElement>>;
  description: string;
};

type Category = {
  category: string;
  technologies: Tech[];
  benefit: string;
};

const techStack: Category[] = [
  {
    category: "AI & Intelligence",
    benefit: "For processing complex data and intelligent decision making.",
    technologies: [
      { name: "OpenAI", logo: OpenAILogo, description: "Advanced reasoning and text analysis." },
      { name: "Anthropic", logo: AnthropicLogo, description: "Highly secure and accurate AI models." },
      { name: "LangChain", logo: LangChainLogo, description: "Linking AI models to your private data." },
    ],
  },
  {
    category: "Business Ecosystem",
    benefit: "Integrating the tools your team uses every single day.",
    technologies: [
      { name: "HubSpot", logo: HubSpotLogo, description: "Syncing leads and customer data." },
      { name: "Slack", logo: SlackLogo, description: "Real-time team notifications & alerts." },
      { name: "Jira", logo: JiraLogo, description: "Project tracking and task management." },
    ],
  },
  {
    category: "Modern Engineering",
    benefit: "The custom code that makes your automation unique and fast.",
    technologies: [
      { name: "n8n", logo: NodeJsLogo, description: "The private core of your workflows." },
      { name: "Python", logo: PythonLogo, description: "Custom scripts for complex logic." },
      { name: "PostgreSQL", logo: PostgreSQLLogo, description: "Secure, high-speed data storage." },
    ],
  },
  {
    category: "Cloud & Security",
    benefit: "Ensuring your system is encrypted, scalable, and private.",
    technologies: [
      { name: "AWS", logo: AWSLogo, description: "Industry-standard private hosting." },
      { name: "Docker", logo: DockerLogo, description: "Isolated, portable system containers." },
      { name: "OAuth 2.0", logo: OAuthLogo, description: "Secure, permission-based app access." },
    ],
  },
];

export default function TechStack() {
  return (
    <section id="tech-stack" className="bg-slate-900 text-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">
            Engineered with Enterprise-Grade Tech
          </h2>
          <p className="text-lg text-gray-400 mt-4 max-w-3xl mx-auto">
            We don't use "no-code" toys. We build with the same professional tools used by 
            leading software engineering teams and Fortune 500 companies.
          </p>
        </div>

        <div className="max-w-6xl mx-auto space-y-12">
          {techStack.map((category, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 border-b border-slate-700 pb-4">
                <div className="max-w-xl">
                    <h3 className="text-2xl font-bold text-primary mb-1">{category.category}</h3>
                    <p className="text-gray-400 text-sm">{category.benefit}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.technologies.map((tech, techIdx) => (
                  <motion.div
                    key={techIdx}
                    className="flex items-center gap-4 p-5 rounded-xl bg-slate-800/40 border border-slate-700 hover:border-primary/50 transition-all group"
                    whileHover={{ scale: 1.02, backgroundColor: "rgba(30, 41, 59, 0.6)" }}
                  >
                    <div className="flex-shrink-0 bg-slate-900 p-3 rounded-lg group-hover:text-primary transition-colors">
                      <tech.logo className="w-8 h-8" />
                    </div>
                    <div>
                      <h4 className="font-bold text-base">{tech.name}</h4>
                      <p className="text-xs text-gray-500 leading-relaxed">{tech.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-20 text-center">
            <p className="text-sm text-gray-500 italic max-w-2xl mx-auto">
                * We integrate with hundreds of other tools including Salesforce, Asana, Google Workspace, Stripe, and custom internal APIs. If it has a way to talk, we can automate it.
            </p>
        </div>
      </div>
    </section>
  );
}
