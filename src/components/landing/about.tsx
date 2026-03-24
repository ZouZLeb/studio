"use client";

import { Shield, Code, Cpu, MapPin, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { BrandName } from "../brand-name";
import Image from "next/image";
import Link from "next/link";

export default function AboutSection() {
  const headshot = PlaceHolderImages.find((img) => img.id === "about-headshot");
  const hasImage = !!headshot?.imageUrl;

  return (
    <section id="about" className="bg-transparent py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-headline text-foreground tracking-tight">
            San Diego's Premier AI Automation Agency
          </h2>
          <p className="text-xl text-muted-foreground mt-6 max-w-3xl mx-auto leading-relaxed">
            Real developers based in San Diego, CA. We build high-quality, secure systems that solve problems while ensuring you own your technology.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <Card className="overflow-hidden bg-card/40 backdrop-blur-md border-border/50 shadow-2xl ring-1 ring-white/10">
            {hasImage ? (
              /* Image Grid Layout (Original) */
              <div className="grid md:grid-cols-5 gap-0 items-stretch">
                <div className="md:col-span-2 p-8 md:p-10 bg-muted/20 border-r border-border/30">
                  <div className="relative aspect-square mb-8 rounded-2xl overflow-hidden bg-muted/40 flex items-center justify-center shadow-inner group">
                    <Image
                      src={headshot.imageUrl}
                      alt="The AImatic Team"
                      fill
                      className="rounded-2xl object-cover shadow-lg transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 40vw"
                    />
                    <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-2xl pointer-events-none"></div>
                  </div>
                  
                  <h3 className="text-2xl font-bold font-headline text-foreground mb-1">The Team</h3>
                  <p className="text-primary font-medium mb-6 flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> Based in San Diego, CA
                  </p>

                  <div className="space-y-4 text-sm mt-8">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50 border border-border/30">
                      <Shield className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-foreground/80 font-medium">Focus on <strong className="text-foreground">Privacy</strong></span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50 border border-border/30">
                      <Code className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-foreground/80 font-medium">Experts in <strong className="text-foreground">Custom Tools</strong></span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50 border border-border/30">
                      <Cpu className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-foreground/80 font-medium">You <strong className="text-foreground">Own</strong> Everything</span>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-3 p-8 md:p-12 flex flex-col justify-center">
                  <div className="prose prose-lg dark:prose-invert max-w-none text-foreground/80 prose-p:leading-relaxed prose-strong:text-foreground">
                    <p>
                      The AI space is full of "prompt-wrappers" and agencies that just glue random chat tools together. 
                      They often don't know where your data goes, and they charge you recurring fees forever.
                    </p>

                    <p className="font-semibold text-foreground bg-primary/5 p-6 rounded-xl border-l-4 border-primary shadow-sm">
                      At <BrandName />, we are real developers with a background in security and large-scale engineering. 
                      We help San Diego businesses <strong>save time</strong> and <strong>automate lead generation</strong> 
                      using private systems that live on your own servers.
                    </p>

                    <p>
                      Whether you need an <strong>AI chatbot for small business</strong> or you are looking for 
                      <strong>how to automate email follow-ups</strong> securely, we deliver code you own 100%. 
                      No vendor lock-in, just pure performance.
                    </p>

                    <div className="pt-6">
                      <Link 
                        href="/qa" 
                        target="_blank"
                        className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-bold group transition-colors"
                      >
                        Explore our Q&A & Expert Advice
                        <Sparkles className="w-4 h-4 transition-transform group-hover:scale-110 group-hover:rotate-12" />
                      </Link>
                    </div>
                  </div>

                  <div className="mt-12 grid sm:grid-cols-3 gap-4">
                    <Card className="bg-primary/5 p-5 border-border/50 hover:bg-primary/10 transition-colors">
                      <h4 className="font-bold mb-2 text-primary">Local Support</h4>
                      <p className="text-sm text-foreground/70 leading-snug">
                        On-site or remote support from San Diego professionals.
                      </p>
                    </Card>
                    <Card className="bg-primary/5 p-5 border-border/50 hover:bg-primary/10 transition-colors">
                      <h4 className="font-bold mb-2 text-primary">Data Sovereignty</h4>
                      <p className="text-sm text-foreground/70 leading-snug">
                        Your business data stays with you, always and forever.
                      </p>
                    </Card>
                     <Card className="bg-primary/5 p-5 border-border/50 hover:bg-primary/10 transition-colors">
                      <h4 className="font-bold mb-2 text-primary">Full IP Rights</h4>
                      <p className="text-sm text-foreground/70 leading-snug">
                        You own 100% of the custom code we build for you.
                      </p>
                    </Card>
                  </div>
                </div>
              </div>
            ) : (
              /* Text-Centric Image-less Layout */
              <div className="p-8 md:p-16 lg:p-20">
                <div className="max-w-4xl mx-auto">
                  <div className="flex flex-col items-center text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-6">
                      <MapPin className="w-3.5 h-3.5" /> Based in San Diego, CA
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold font-headline text-foreground mb-6">
                      Our Engineering Philosophy
                    </h3>
                    <div className="w-20 h-1 bg-primary rounded-full mb-10"></div>
                  </div>

                  <div className="prose prose-xl dark:prose-invert max-w-none text-foreground/80 prose-p:leading-relaxed prose-strong:text-foreground">
                    <p className="text-center mb-12">
                      The AI space is full of "prompt-wrappers" and agencies that just glue random chat tools together. 
                      They often don't know where your data goes, and they charge you recurring fees forever.
                    </p>

                    <Card className="bg-primary/10 p-8 md:p-10 rounded-2xl border-none shadow-lg relative overflow-hidden group mb-12">
                      <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
                      <div className="relative z-10">
                         <p className="text-2xl md:text-3xl font-semibold text-foreground leading-tight !mt-0 italic">
                          "At <BrandName />, we are real developers with a background in security and large-scale engineering. 
                          We build private systems that live on your own servers."
                        </p>
                      </div>
                    </Card>

                    <div className="grid md:grid-cols-2 gap-12 mt-12 mb-16">
                      <div>
                        <p className="!mt-0">
                          Whether you need an <strong>AI chatbot for small business</strong> or you are looking 
                          for <strong>how to automate email follow-ups</strong> securely, we deliver code you own 100%. 
                          No vendor lock-in, just pure performance.
                        </p>
                      </div>
                      <div>
                        <p className="!mt-0">
                          We provide the architecture, the workflows, and the documentation. 
                          You keep complete control over your business intelligence and customer information.
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-center pt-8">
                       <Link 
                        href="/qa" 
                        target="_blank"
                        className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-bold text-lg group transition-colors"
                      >
                        Explore our Q&A & Expert Advice
                        <Sparkles className="w-5 h-5 transition-transform group-hover:scale-110 group-hover:rotate-12" />
                      </Link>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-6 pt-12 border-t border-border/30">
                    <div className="flex flex-col items-center text-center">
                      <Shield className="w-8 h-8 text-primary mb-4" />
                      <h4 className="font-bold text-lg mb-2 text-foreground">Data Privacy</h4>
                      <p className="text-sm text-muted-foreground">Your data never leaves your controlled environment.</p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <Code className="w-8 h-8 text-primary mb-4" />
                      <h4 className="font-bold text-lg mb-2 text-foreground">Custom Builds</h4>
                      <p className="text-sm text-muted-foreground">Enterprise-grade tools built specifically for your needs.</p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <Cpu className="w-8 h-8 text-primary mb-4" />
                      <h4 className="font-bold text-lg mb-2 text-foreground">Complete IP</h4>
                      <p className="text-sm text-muted-foreground">You own 100% of the intellectual property we create.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </section>
  );
}
