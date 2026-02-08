
"use client";

import { motion } from "framer-motion";
import {
  OpenAILogo,
  AnthropicLogo,
  LangChainLogo,
  PythonLogo,
  PostgreSQLLogo,
  AWSLogo,
  DockerLogo,
  HubSpotLogo,
  SlackLogo,
  JiraLogo,
  OAuthLogo,
  N8NLogo,
} from "../icons/tech-logos";
import type { ElementType } from "react";

type Tech = {
  name: string;
  Logo: ElementType;
  description: string;
};

const technologies: Tech[] = [
  { name: "n8n", Logo: N8NLogo, description: "Private workflow core" },
  { name: "Python", Logo: PythonLogo, description: "Advanced custom logic" },
  { name: "OpenAI", Logo: OpenAILogo, description: "Secure reasoning" },
  { name: "Anthropic", Logo: AnthropicLogo, description: "Private AI models" },
  { name: "PostgreSQL", Logo: PostgreSQLLogo, description: "Private data vault" },
  { name: "AWS", Logo: AWSLogo, description: "Secure cloud hosting" },
  { name: "Docker", Logo: DockerLogo, description: "Isolated environments" },
  { name: "OAuth 2.0", Logo: OAuthLogo, description: "Secure auth protocols" },
  { name: "HubSpot", Logo: HubSpotLogo, description: "CRM synchronization" },
  { name: "Slack", Logo: SlackLogo, description: "Team communication" },
  { name: "Jira", Logo: JiraLogo, description: "Project architecture" },
  { name: "LangChain", Logo: LangChainLogo, description: "Private data linking" },
];

export default function TechStack() {
  // Use exactly two sets for a perfect 0 to -50% loop
  const duplicatedTechs = [...technologies, ...technologies];

  return (
    <section id="tech-stack" className="bg-transparent overflow-hidden py-12 md:py-16">
      <div className="mx-auto">
        <div className="max-w-4xl mx-auto text-center mb-10">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold font-headline mb-4"
          >
            Elite Technology Stack
          </motion.h2>
          <p className="text-muted-foreground text-sm max-w-2xl mx-auto">
            We integrate with the most powerful tools in the industry using 
            professional engineering standards. No wrappers, just pure integration.
          </p>
        </div>

        <div className="relative w-full pointer-events-none select-none">
          
          <div className="flex overflow-hidden">
            <motion.div
              className="flex gap-4 py-4"
              animate={{
                x: [0, "-50%"],
              }}
              transition={{
                duration: 60, // Slower, smoother movement
                ease: "linear",
                repeat: Infinity,
              }}
              style={{ width: "max-content" }}
            >
              {duplicatedTechs.map((tech, idx) => (
                <div
                  key={`${tech.name}-${idx}`}
                  className="flex items-center gap-3 p-4 w-64 rounded-xl bg-card/40 backdrop-blur-md border border-border/50 transition-all shadow-sm"
                >
                  <div className="flex-shrink-0 text-muted-foreground">
                    <tech.Logo size={28} />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-sm leading-none mb-1 text-foreground">{tech.name}</h4>
                    <p className="text-[10px] text-muted-foreground truncate">{tech.description}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-10 text-center"
        >
          <p className="text-[11px] text-muted-foreground uppercase tracking-widest font-semibold">
            + 2000 Other Enterprise Integrations Available
          </p>
        </motion.div>
      </div>
    </section>
  );
}
