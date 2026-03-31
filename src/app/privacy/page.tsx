'use client';

import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Lock, EyeOff, Scale } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Navigation from '@/components/landing/navigation';
import Footer from '@/components/landing/footer';
import { BrandName } from '@/components/brand-name';

export default function PrivacyPage() {
  return (
    <div className="relative min-h-screen">
      {/* Background Decor */}
      <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute top-[-10%] left-[-5%] w-[60vw] h-[60vh] bg-primary/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[60vw] h-[60vh] bg-accent/5 blur-[120px] rounded-full" />
      </div>

      <Navigation />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <Button variant="ghost" asChild className="mb-8 -ml-4">
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
          </Button>

          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-black font-headline mb-4 tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground text-lg">
              Last updated: February 21, 2026
            </p>
          </div>

          <Card className="p-8 md:p-12 bg-card/40 backdrop-blur-xl border-border/50 shadow-2xl">
            <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <ShieldCheck className="text-primary w-6 h-6" />
                  <h2 className="text-2xl font-bold m-0">Our Privacy Commitment</h2>
                </div>
                <p>
                  At <BrandName />, privacy isn&apos;t just a feature—it&apos;s our core product. We build systems that give you total control over your data. This policy explains how we handle information during our engineering process and on this website.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-bold mb-4">1. Data Ownership & Sovereignty</h3>
                <p>
                  Unlike standard AI agencies, we do not store your business data on our infrastructure. All automations we build are deployed directly to <strong>your private environment</strong> (Cloudflare, AWS, or local servers). 
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Your Data:</strong> Stays in your systems.</li>
                  <li><strong>Your Keys:</strong> You provide access via environment variables we never persist.</li>
                  <li><strong>Your Code:</strong> You own 100% of the intellectual property upon project completion.</li>
                </ul>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <EyeOff className="text-primary w-6 h-6" />
                  <h3 className="text-xl font-bold m-0">2. Information We Collect</h3>
                </div>
                <p>
                  We only collect information necessary to provide our services:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Contact Information:</strong> Name, email, and business details provided via lead forms or our chatbot.</li>
                  <li><strong>Usage Data:</strong> Anonymous technical data (IP address, browser type) to improve site performance and security.</li>
                  <li><strong>Project Context:</strong> Details about your tech stack shared during consultations to provide accurate quotes.</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-bold mb-4">3. How We Use Information</h3>
                <p>
                  We use your information solely to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Schedule consultations and send project roadmaps.</li>
                  <li>Perform security audits and architecture reviews.</li>
                  <li>Communicate status updates during the build phase.</li>
                </ul>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Lock className="text-primary w-6 h-6" />
                  <h3 className="text-xl font-bold m-0">4. Security Standards</h3>
                </div>
                <p>
                  We implement industry-standard security protocols:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>HMAC Signing:</strong> All chatbot communications are cryptographically signed.</li>
                  <li><strong>Zero-Retention:</strong> We do not store sensitive API keys in our internal databases.</li>
                  <li><strong>Encrypted Transport:</strong> All data is transmitted via HTTPS (TLS 1.3).</li>
                </ul>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Scale className="text-primary w-6 h-6" />
                  <h3 className="text-xl font-bold m-0">5. Legal Rights</h3>
                </div>
                <p>
                  Depending on your location (GDPR, CCPA), you have the right to access, correct, or delete your personal information. To exercise these rights, please contact us at <a href="mailto:privacy@aimatic.dev" className="text-primary hover:underline">privacy@aimatic.dev</a>.
                </p>
              </section>

              <div className="pt-8 border-t border-border/50 text-center">
                <p className="text-sm text-muted-foreground italic">
                  AImatic is built on the principle that your business logic belongs to you.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
