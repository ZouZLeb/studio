'use client';

import Link from 'next/link';
import { ArrowLeft, FileText, Code, CreditCard, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Navigation from '@/components/landing/navigation';
import Footer from '@/components/landing/footer';
import { BrandName } from '@/components/brand-name';

export default function TermsPage() {
  return (
    <div className="relative min-h-screen">
      {/* Background Decor */}
      <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute top-[-10%] right-[-5%] w-[60vw] h-[60vh] bg-primary/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[60vw] h-[60vh] bg-accent/5 blur-[120px] rounded-full" />
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
              Terms of Service
            </h1>
            <p className="text-muted-foreground text-lg">
              Last updated: February 21, 2026
            </p>
          </div>

          <Card className="p-8 md:p-12 bg-card/40 backdrop-blur-xl border-border/50 shadow-2xl">
            <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="text-primary w-6 h-6" />
                  <h2 className="text-2xl font-bold m-0">1. Acceptance of Terms</h2>
                </div>
                <p>
                  By accessing or using <BrandName /> services, you agree to be bound by these Terms. If you do not agree, please do not use our services. We provide professional automation engineering and security consulting services for business entities.
                </p>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Code className="text-primary w-6 h-6" />
                  <h3 className="text-xl font-bold m-0">2. Service Ownership (IP)</h3>
                </div>
                <p>
                  Our value proposition is built on <strong>Ownership</strong>. Unlike traditional SaaS:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Deliverables:</strong> Upon full payment, the client owns 100% of the custom source code, n8n workflows, and configuration scripts developed during the project.</li>
                  <li><strong>License:</strong> <BrandName /> retains the right to use generic libraries and internal frameworks used to build your solution, but the specific business logic remains yours.</li>
                </ul>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <CreditCard className="text-primary w-6 h-6" />
                  <h3 className="text-xl font-bold m-0">3. Payment & Projects</h3>
                </div>
                <p>
                  Projects are generally structured as fixed-fee engagements:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Milestones:</strong> Payments are typically split into a deposit and a final handover payment.</li>
                  <li><strong>No Recurring Fees:</strong> We do not charge "per-task" fees. Any monthly support is optional and governed by a separate Service Level Agreement (SLA).</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-bold mb-4">4. Client Responsibilities</h3>
                <p>
                  To ensure successful automation, the client is responsible for:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Providing necessary API access and environment credentials.</li>
                  <li>Ensuring the legal right to automate the target systems.</li>
                  <li>Maintaining the hosting environment (Cloudflare, AWS, etc.) after handover.</li>
                </ul>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <AlertCircle className="text-destructive w-6 h-6" />
                  <h3 className="text-xl font-bold m-0">5. Limitation of Liability</h3>
                </div>
                <p>
                  <BrandName /> is an engineering agency. While we follow security best practices, we are not liable for:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Outages caused by third-party APIs (e.g., OpenAI, Slack).</li>
                  <li>Data breaches resulting from client-side credential mismanagement.</li>
                  <li>Business losses due to automated workflow logic requested by the client.</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-bold mb-4">6. Termination</h3>
                <p>
                  Either party may terminate an engagement with 7 days written notice. In such cases, the client will be billed for work completed up to the termination date.
                </p>
              </section>

              <div className="pt-8 border-t border-border/50 text-center">
                <p className="text-sm text-muted-foreground">
                  Questions? Reach out to us at <a href="mailto:legal@aimatic.dev" className="text-primary hover:underline">legal@aimatic.dev</a>.
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
