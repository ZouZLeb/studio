"use client";

import Image from "next/image";
import { Linkedin, Github, Award, Briefcase, Verified } from "lucide-react";
import { Card } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "../ui/button";

export default function AboutSection() {
  const headshot = PlaceHolderImages.find((img) => img.id === "about-headshot");

  return (
    <section id="about" className="bg-white dark:bg-slate-950/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">
            Built by Engineers, Not Marketers
          </h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
            We bring enterprise-grade software development and security practices to every project, ensuring robust and reliable automation solutions.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <Card className="overflow-hidden">
            <div className="grid md:grid-cols-5 gap-8 items-start">
              <div className="md:col-span-2 p-6 md:p-8 bg-muted/50">
                <div className="relative aspect-square mb-6">
                  {headshot && (
                    <Image
                      src={headshot.imageUrl}
                      alt="Founder of SecureAutomate"
                      fill
                      className="rounded-lg object-cover shadow-lg"
                      data-ai-hint={headshot.imageHint}
                    />
                  )}
                </div>
                <h3 className="text-2xl font-bold font-headline">Your Name</h3>
                <p className="text-primary mb-4">
                  Founder, Lead Software & Security Engineer
                </p>

                <div className="flex gap-4 mb-6">
                  <Button variant="outline" size="sm" asChild>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <Linkedin className="mr-2" /> LinkedIn
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2" /> GitHub
                    </a>
                  </Button>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <Briefcase className="w-5 h-5 text-primary flex-shrink-0" />
                    <span><strong>8+ years</strong> in software development</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Award className="w-5 h-5 text-primary flex-shrink-0" />
                    <span>AWS Certified Developer</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Verified className="w-5 h-5 text-primary flex-shrink-0" />
                    <span>Security+ Certified</span>
                  </div>
                </div>
              </div>

              <div className="md:col-span-3 p-6 md:p-8">
                <div className="prose prose-lg max-w-none text-foreground/90">
                  <p>
                    After years as a software developer and cybersecurity analyst, I
                    watched the &apos;AI automation&apos; space explode with agencies
                    just reselling ChatGPT access with a huge markup. Most
                    couldn&apos;t write a single line of code.
                  </p>

                  <p className="font-semibold text-foreground">
                    We&apos;re different. Every system we build is custom-coded,
                    security-audited, and production-ready. We don&apos;t use
                    templates. We don&apos;t resell SaaS tools. We build actual
                    software that integrates with your actual systems.
                  </p>

                  <p>
                    With a background in enterprise software development and
                    penetration testing, we bring enterprise-grade security and
                    reliability to every project—even the starter ones.
                  </p>

                  <p>
                    When you work with us, you&apos;re working directly with the engineer
                    who writes the code. No account managers. No outsourcing. Just
                    honest, technical expertise applied to your specific problem.
                  </p>
                </div>

                <div className="mt-8 grid sm:grid-cols-3 gap-4">
                  <Card className="bg-primary/5 p-4">
                    <h4 className="font-bold mb-1 text-primary">No BS</h4>
                    <p className="text-sm text-foreground/80">
                      We tell you what you need, not what makes us the most money.
                    </p>
                  </Card>
                  <Card className="bg-primary/5 p-4">
                    <h4 className="font-bold mb-1 text-primary">Security First</h4>
                    <p className="text-sm text-foreground/80">
                      Every line of code is written with security in mind.
                    </p>
                  </Card>
                   <Card className="bg-primary/5 p-4">
                    <h4 className="font-bold mb-1 text-primary">Real Code</h4>
                    <p className="text-sm text-foreground/80">
                      Custom solutions, not repackaged SaaS subscriptions.
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
