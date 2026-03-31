"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { HelpCircle, Zap, Code, Lock, Sparkles, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { BrandName } from "@/components/brand-name";
import Navigation from "@/components/landing/navigation";
import Footer from "@/components/landing/footer";
import { Button } from "@/components/ui/button";

const qaCategories = [
  {
    title: "The Basics",
    icon: <HelpCircle className="w-6 h-6 text-primary" />,
    questions: [
      {
        id: "q1",
        question: "What exactly is AI Automation?",
        answer: "AI automation is the use of artificial intelligence (like LLMs or computer vision) to handle repetitive, intelligent tasks that usually require manual effort. We build 'digital workers' that operate 24/7—handling everything from data extraction to complex decision-making in your workflows."
      },
      {
        id: "q2",
        question: "How is this different from just using ChatGPT?",
        answer: "ChatGPT is a generic tool. We build custom engineering solutions that connect AI models to your specific business data, existing CRMs, and email systems. It's the difference between asking a chatbot a question and having a system that actually executes work on your behalf."
      }
    ]
  },
  {
    title: "Business Impact",
    icon: <Zap className="w-6 h-6 text-primary" />,
    questions: [
      {
        id: "q3",
        question: "How can AI automation save me time?",
        answer: "Most businesses spend 15-20% of their time on 'data bridge' tasks—moving info between systems, following up with leads, or organizing files. We eliminate these bottlenecks by automating the entire flow, giving you back hours of high-value strategy time every week."
      },
      {
        id: "q4",
        question: "What is the typical ROI on these projects?",
        answer: "Most of our implementations pay for themselves within 3 to 6 months. This comes from reclaimed man-hours, reduced human error, and improved lead conversion—since AI agents can respond to customer inquiries in seconds, not hours."
      }
    ]
  },
  {
    title: "Technical Expertise",
    icon: <Code className="w-6 h-6 text-primary" />,
    questions: [
      {
        id: "q5",
        question: "Do I need to be a technical expert to use these tools?",
        answer: "Not at all. We handle 100% of the engineering, architecture, and deployment. You receive a 'turn-key' system with clear documentation. If you can use a web browser, you can manage the automations we build for you."
      },
      {
        id: "q6",
        question: "Can you integrate with my existing software?",
        answer: "Yes. We specialize in building 'glueware'—custom scripts and n8n workflows that connect modern AI with your current tech stack, whether it's HubSpot, Salesforce, specialized databases, or even legacy internal tools."
      }
    ]
  },
  {
    title: "Security & Privacy",
    icon: <Lock className="w-6 h-6 text-primary" />,
    questions: [
      {
        id: "q7",
        question: "Is my business data secure?",
        answer: "Data sovereignty is our core value. Unlike agencies that use public 'prompt-wrappers', we build systems that can live on your own private servers. We ensure your customer data is never used to train public models and stays entirely within your controlled environment."
      },
      {
        id: "q8",
        question: "Who owns the intellectual property?",
        answer: "You do. We provide 100% IP rights for the custom builds we deliver. There are no recurring 'software-as-a-service' fees paid to us. Once we build it and hand it over, the technology belongs to your company forever."
      }
    ]
  }
];

export default function QAContent() {
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Reused Atmospheric Background for consistency */}
      <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none select-none">
        <div className="absolute inset-0 bg-background transition-colors duration-700" />
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] mix-blend-overlay pointer-events-none" 
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
        />
        <div className="absolute -top-[10%] -left-[5%] w-[60vw] h-[60vh] bg-fuchsia-600/10 dark:bg-fuchsia-500/5 blur-[120px] rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vh] bg-primary/5 dark:bg-primary/2 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-15%] right-[-10%] w-[70vw] h-[70vh] bg-indigo-600/10 dark:bg-indigo-700/10 blur-[140px] rounded-full" />
      </div>

      <Navigation />

      <main className="flex-grow pt-32 pb-20 relative z-10">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Back to Home
            </Link>

            <div className="mb-16">
              <h1 className="text-4xl md:text-6xl font-bold font-headline text-foreground mb-6 tracking-tight">
                Common <span className="text-primary">Questions</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                Everything you need to know about AI automation, security, and how <BrandName /> helps you own your technology.
              </p>
            </div>

            <div className="space-y-12">
              {qaCategories.map((category, idx) => (
                <div key={idx} className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                      {category.icon}
                    </div>
                    <h2 className="text-2xl font-bold font-headline text-foreground">{category.title}</h2>
                  </div>

                  <div className="space-y-4">
                    {category.questions.map((q) => (
                      <Card key={q.id} className="overflow-hidden bg-card/40 backdrop-blur-md border-border/50 hover:border-primary/30 transition-all duration-300">
                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value={q.id} className="border-none px-6">
                            <AccordionTrigger className="text-left text-lg font-semibold hover:no-underline py-6">
                              {q.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground text-lg leading-relaxed pb-6">
                              {q.answer}
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Support CTA */}
            <Card className="mt-20 p-8 md:p-12 bg-primary/5 border-primary/20 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[80px] -mr-32 -mt-32 rounded-full" />
               <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="text-center md:text-left">
                  <h3 className="text-2xl font-bold mb-2">Still have questions?</h3>
                  <p className="text-muted-foreground">Book a free 15-minute architecture review with our San Diego team.</p>
                </div>
                <Button size="lg" className="rounded-full px-8 shadow-xl shadow-primary/20" asChild>
                  <Link href="mailto:hello@aimatic.dev">
                    Get in Touch <Sparkles className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
               </div>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
