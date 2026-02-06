
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
import type { FC } from "react";
import type { IconProps } from "@icons-pack/react-simple-icons";

type Tech = {
  name: string;
  Logo: FC<IconProps>;
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
  return (
    <section id="tech-stack" className="bg-slate-900 text-white overflow-hidden py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold font-headline mb-4"
          >
            Elite Technology Stack
          </motion.h2>
          <p className="text-gray-400 text-sm max-w-2xl mx-auto">
            We integrate with the most powerful tools in the industry using 
            professional engineering standards. No wrappers, just pure integration.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {technologies.map((tech, idx) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all hover:bg-white/10 group"
            >
              <div className="flex-shrink-0 text-gray-400 group-hover:text-primary transition-colors">
                <tech.Logo size={28} />
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-sm leading-none mb-1">{tech.name}</h4>
                <p className="text-[10px] text-gray-500 truncate">{tech.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="text-[11px] text-gray-500 uppercase tracking-widest font-semibold">
            + 400 Other Enterprise Integrations Available
          </p>
        </motion.div>
      </div>
    </section>
  );
}
