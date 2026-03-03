"use client";

import Image from "next/image";
import { Shield, Code, Cpu, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { BrandName } from "../brand-name";

export default function AboutSection() {
  const headshot = PlaceHolderImages.find((img) => img.id === "about-headshot");

  return (
    <section id="about" className="bg-transparent">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">
            San Diego's Premier AI Automation Agency
          </h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
            Real developers based in San Diego, CA. We focus on building high-quality, secure systems that solve problems while ensuring you own your technology.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <Card className="overflow-hidden bg-card/40 backdrop-blur-md border-border/50">
            <div className="grid md:grid-cols-5 gap-8 items-start">
              <div className="md:col-span-2 p-6 md:p-8 bg-muted/30">
                <div className="relative aspect-square mb-6">
                  {headshot && (
                    <Image
                      src={headshot.imageUrl}
                      alt="The AImatic Team"
                      fill
                      className="rounded-lg object-cover shadow-lg"
                      data-ai-hint={headshot.imageHint}
                    />
                  )}
                </div>
                <h3 className="text-2xl font-bold font-headline">The Team</h3>
                <p className="text-primary mb-4 flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> Based in San Diego, CA
                </p>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-primary flex-shrink-0" />
                    <span>Focus on <strong>Privacy</strong></span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Code className="w-5 h-5 text-primary flex-shrink-0" />
                    <span>Experts in <strong>Custom Tools</strong></span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Cpu className="w-5 h-5 text-primary flex-shrink-0" />
                    <span>You <strong>Own</strong> Everything</span>
                  </div>
                </div>
              </div>

              <div className="md:col-span-3 p-6 md:p-8">
                <div className="prose prose-lg max-w-none text-foreground/90">
                  <p>
                    The AI space is full of "prompt-wrappers" and agencies that just glue random chat tools together. 
                    They often don't know where your data goes, and they charge you recurring fees forever.
                  </p>

                  <p className="font-semibold text-foreground">
                    At <BrandName />, we are real developers with a background in security and large-scale engineering. 
                    We help San Diego businesses <strong>save time</strong> and <strong>automate lead generation</strong> 
                    using private systems that live on your own servers.
                  </p>

                  <p>
                    Whether you need an <strong>AI chatbot for small business</strong> or you are looking for 
                    <strong>how to automate email follow-ups</strong> securely, we deliver code you own 100%. 
                    No vendor lock-in, just pure performance.
                  </p>

                  <p>
                    We provide the architecture, the workflows, and the documentation. 
                    You keep complete control over your business intelligence and customer information.
                  </p>
                </div>

                <div className="mt-8 grid sm:grid-cols-3 gap-4">
                  <Card className="bg-primary/5 p-4 border-border/50">
                    <h4 className="font-bold mb-1 text-primary">Local Support</h4>
                    <p className="text-sm text-foreground/80">
                      On-site or remote support from San Diego.
                    </p>
                  </Card>
                  <Card className="bg-primary/5 p-4 border-border/50">
                    <h4 className="font-bold mb-1 text-primary">Data Sovereignty</h4>
                    <p className="text-sm text-foreground/80">
                      Your info stays with you, always.
                    </p>
                  </Card>
                   <Card className="bg-primary/5 p-4 border-border/50">
                    <h4 className="font-bold mb-1 text-primary">Full IP Rights</h4>
                    <p className="text-sm text-foreground/80">
                      You own 100% of the custom build.
                    </p>
                  </Card>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
