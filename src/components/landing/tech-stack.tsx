"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  OpenAILogo,
  AnthropicLogo,
  LangChainLogo,
  PineconeLogo,
  PythonLogo,
  NodeJsLogo,
  PostgreSQLLogo,
  MongoDBLogo,
  AWSLogo,
  DockerLogo,
  OAuthLogo,
} from "../icons/tech-logos";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import type { FC, SVGProps } from "react";

type Tech = {
  name: string;
  logo: FC<SVGProps<SVGSVGElement>>;
  useCases: string[];
};

type Category = {
  category: string;
  technologies: Tech[];
  description: string;
};

const techStack: Category[] = [
  {
    category: "AI & Machine Learning",
    technologies: [
      { name: "OpenAI API", logo: OpenAILogo, useCases: ["all", "ecommerce", "saas", "healthcare"] },
      { name: "Anthropic Claude", logo: AnthropicLogo, useCases: ["all", "saas", "healthcare"] },
      { name: "LangChain", logo: LangChainLogo, useCases: ["all", "saas"] },
      { name: "Pinecone", logo: PineconeLogo, useCases: ["saas"] },
    ],
    description: "For natural language processing, document analysis, and intelligent automation.",
  },
  {
    category: "Backend Development",
    technologies: [
      { name: "Python", logo: PythonLogo, useCases: ["all", "ecommerce", "saas", "healthcare"] },
      { name: "Node.js", logo: NodeJsLogo, useCases: ["all", "ecommerce", "saas"] },
      { name: "PostgreSQL", logo: PostgreSQLLogo, useCases: ["all", "ecommerce", "saas", "healthcare"] },
      { name: "MongoDB", logo: MongoDBLogo, useCases: ["all", "saas"] },
    ],
    description: "The backbone for robust API development, data processing, and business logic.",
  },
  {
    category: "Security & Infrastructure",
    technologies: [
      { name: "AWS", logo: AWSLogo, useCases: ["all", "ecommerce", "saas", "healthcare"] },
      { name: "Docker", logo: DockerLogo, useCases: ["all", "saas"] },
      { name: "OAuth 2.0", logo: OAuthLogo, useCases: ["all", "ecommerce", "saas", "healthcare"] },
    ],
    description: "To ensure enterprise-grade security, scalability, and reliability.",
  },
];

const useCaseFilters = [
  { id: "all", label: "All Industries" },
  { id: "ecommerce", label: "E-commerce" },
  { id: "saas", label: "SaaS" },
  { id: "healthcare", label: "Healthcare" },
];

export default function TechStack() {
  const [selectedFilter, setSelectedFilter] = useState("all");

  return (
    <section id="tech-stack" className="bg-slate-900 text-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">
            Built With Production-Grade Tools
          </h2>
          <p className="text-lg text-gray-400 mt-4 max-w-3xl mx-auto">
            We use the same battle-tested technology stack trusted by Fortune 500 companies.
          </p>
        </div>

        <div className="flex justify-center gap-2 md:gap-4 mb-12 flex-wrap">
          {useCaseFilters.map((filter) => (
            <Button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              variant={selectedFilter === filter.id ? "secondary" : "ghost"}
              className={cn(selectedFilter === filter.id ? "bg-primary text-primary-foreground" : "text-gray-300 hover:bg-slate-800 hover:text-white" )}
            >
              {filter.label}
            </Button>
          ))}
        </div>

        <div className="max-w-6xl mx-auto space-y-8">
          {techStack.map((category, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-slate-800/50 rounded-lg p-6 md:p-8 border border-slate-700"
            >
              <h3 className="text-2xl font-bold mb-2">{category.category}</h3>
              <p className="text-gray-400 mb-6">{category.description}</p>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {category.technologies.map((tech, techIdx) => {
                  const isRelevant = selectedFilter === "all" || tech.useCases.includes(selectedFilter);
                  return (
                    <motion.div
                      key={techIdx}
                      title={tech.name}
                      className={cn(
                        "flex flex-col items-center justify-center p-4 rounded-lg transition-all duration-300 aspect-square",
                        isRelevant
                          ? "bg-slate-700/70 border border-slate-600"
                          : "bg-slate-800/30 opacity-40 grayscale"
                      )}
                      whileHover={isRelevant ? { scale: 1.05, backgroundColor: "hsl(var(--primary) / 0.2)" } : {}}
                    >
                      <tech.logo className="w-10 h-10 md:w-12 md:h-12 mb-2" />
                      <span className="text-xs md:text-sm font-semibold text-center text-gray-300">
                        {tech.name}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
