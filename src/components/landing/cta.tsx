"use client";

import { useState } from "react";
import { Calendar, FileText, Mail, Clock, ShieldCheck, Zap } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { motion } from "framer-motion";

export default function CtaSection() {
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);

  return (
    <section id="contact" className="bg-gradient-to-br from-primary to-blue-700 text-primary-foreground">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-headline mb-4">
              Ready to Eliminate Repetitive Work?
            </h2>
            <p className="text-xl mb-12 text-primary-foreground/80">
              Choose the option that works best for you. Let&apos;s discuss how we can solve your unique challenges.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card 
                className="bg-white/10 text-primary-foreground p-8 rounded-lg shadow-xl hover:shadow-2xl transition-all hover:scale-105 group border-white/20 hover:border-white/40 cursor-pointer text-left h-full flex flex-col"
                onClick={() => setIsCalendlyOpen(true)}
              >
                <Calendar className="w-12 h-12 mb-4 text-yellow-300 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-bold mb-2">Book Free Consultation</h3>
                <p className="text-primary-foreground/80 mb-4 flex-grow">
                  A 15-minute technical discussion about your needs. No sales pitch, no commitment.
                </p>
                <div className="mt-auto">
                  <div className="inline-flex items-center bg-yellow-300 text-primary-foreground px-6 py-3 rounded-lg font-semibold">
                    Schedule Now
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <a
                href="/case-studies.pdf"
                download
                className="bg-white/10 text-primary-foreground p-8 rounded-lg shadow-xl hover:shadow-2xl transition-all hover:scale-105 group border-white/20 hover:border-white/40 cursor-pointer block text-left h-full"
              >
                <FileText className="w-12 h-12 mb-4 text-yellow-300 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-bold mb-2">See Examples First</h3>
                <p className="text-primary-foreground/80 mb-4 flex-grow">
                  Not ready to talk? Download our in-depth case studies and technical examples.
                </p>
                 <div className="mt-auto">
                  <div className="inline-flex items-center bg-yellow-300 text-primary-foreground px-6 py-3 rounded-lg font-semibold">
                    Download PDF
                  </div>
                </div>
              </a>
            </motion.div>
          </div>
          
          <div className="border-t border-white/20 pt-8">
            <p className="text-primary-foreground/80 mb-4">Or prefer a direct line?</p>
            <Button variant="ghost" asChild className="text-xl font-semibold hover:bg-white/10 text-primary-foreground h-auto py-2 px-4">
              <a href="mailto:hello@secureautomate.com">
                <Mail className="w-6 h-6 mr-2" />
                hello@secureautomate.com
              </a>
            </Button>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-6 text-sm text-primary-foreground/70">
            <div className="flex items-center justify-center gap-2">
              <Clock className="w-5 h-5" />
              <span>Response within 24 hours</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <ShieldCheck className="w-5 h-5" />
              <span>Your data is never shared</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Zap className="w-5 h-5" />
              <span>No commitment required</span>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={isCalendlyOpen} onOpenChange={setIsCalendlyOpen}>
        <DialogContent className="bg-background p-0 w-full max-w-4xl h-[90vh] md:h-[700px]">
          <DialogHeader className="p-4 border-b">
            <DialogTitle>Schedule Your Free Consultation</DialogTitle>
            <DialogDescription>
              Find a time that works for you.
            </DialogDescription>
          </DialogHeader>
          <div className="h-[calc(100%-78px)]">
            <iframe
              src="https://calendly.com/d/cnw-qdc-dcy/15-minute-meeting" // Replace with your Calendly link
              width="100%"
              height="100%"
              frameBorder="0"
              title="Calendly"
            />
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
