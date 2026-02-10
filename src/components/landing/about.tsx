"use client";

import Image from "next/image";
import { Shield, Code, Cpu } from "lucide-react";
import { Card } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function AboutSection() {
  const headshot = PlaceHolderImages.find((img) => img.id === "about-headshot");

  return (
    <section id="about" className="bg-transparent">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">
            Real Developers, Not Just "Prompt Users"
          </h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
            We focus on building high-quality, secure systems that solve problems while ensuring you own your technology.
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
                      alt="The SecureAutomate Team"
                      fill
                      className="rounded-lg object-cover shadow-lg"
                      data-ai-hint={headshot.imageHint}
                    />
                  )}
                </div>
                <h3 className="text-2xl font-bold font-headline">The Team</h3>
                <p className="text-primary mb-4">
                  Software Developers & Security Experts
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
                    The AI space is full of agencies that just glue random chat tools together. 
                    They don't know where your data goes, and they charge you forever to keep things running.
                  </p>

                  <p className="font-semibold text-foreground">
                    We're building something different. Our team consists of real developers 
                    with a background in security. We build systems that live on your servers, 
                    using your existing tools, so you stay in control.
                  </p>

                  <p>
                    When you work with us, your privacy comes first. We ensure you 
                    don't have to share sensitive customer info with random AI companies. 
                    You keep complete control over your own information.
                  </p>

                  <p>
                    We deliver the code, the workflows, and the instructions. 
                    You own the system. We provide ongoing support on your terms, 
                    not as a way to keep you locked into a subscription.
                  </p>
                </div>

                <div className="mt-8 grid sm:grid-cols-3 gap-4">
                  <Card className="bg-primary/5 p-4 border-border/50">
                    <h4 className="font-bold mb-1 text-primary">No Shortcuts</h4>
                    <p className="text-sm text-foreground/80">
                      We build real tools, not just chat buttons.
                    </p>
                  </Card>
                  <Card className="bg-primary/5 p-4 border-border/50">
                    <h4 className="font-bold mb-1 text-primary">Your Data</h4>
                    <p className="text-sm text-foreground/80">
                      Your info stays with you, always.
                    </p>
                  </Card>
                   <Card className="bg-primary/5 p-4 border-border/50">
                    <h4 className="font-bold mb-1 text-primary">Full Ownership</h4>
                    <p className="text-sm text-foreground/80">
                      You own 100% of what we build.
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
