"use client";

import { useState } from "react";
import { Calendar, Mail, Clock, ShieldCheck, Zap } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Card } from "../ui/card";
import { motion } from "framer-motion";

export default function CtaSection() {
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);

  return (
    <section id="contact" className="bg-transparent text-foreground">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-headline mb-4">
              Ready to Save Hours of Work?
            </h2>
            <p className="text-xl mb-12 text-muted-foreground">
              Let's chat about how we can automate your boring tasks and grow your business.
            </p>
          </motion.div>

          <div className="flex justify-center mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card 
                className="bg-card/40 backdrop-blur-md p-8 rounded-lg shadow-none hover:shadow-xl transition-all hover:scale-[1.02] group border-border hover:border-primary/40 cursor-pointer text-left h-full flex flex-col"
              >
                <Calendar className="w-12 h-12 mb-4 text-primary group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-bold mb-2">Book a Free Call</h3>
                <p className="text-muted-foreground mb-4 flex-grow">
                  A quick 15-minute chat to see if we can help. No sales pitch, just honest advice.
                </p>
                <div className="mt-auto">
                  <span className="btn-custom-glass w-full" onClick={() => setIsCalendlyOpen(true)}>
                    <div className="btn-custom-glass-inner">
                      <div className="btn-custom-glass-text flex items-center justify-center gap-2">Find a Time</div>
                    </div>
                  </span>
                </div>
              </Card>
            </motion.div>
          </div>
          
          <div className="border-t border-border pt-8">
            <p className="text-muted-foreground mb-4">Or send us an email:</p>
            <a href="mailto:hello@secureautomate.com" className="text-xl font-semibold text-primary hover:underline flex items-center justify-center gap-2">
              <Mail className="w-6 h-6" />
              hello@secureautomate.com
            </a>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-6 text-sm text-muted-foreground">
            <div className="flex items-center justify-center gap-2">
              <Clock className="w-5 h-5" />
              <span>Replies in 24 hours</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <ShieldCheck className="w-5 h-5" />
              <span>Your data is safe</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Zap className="w-5 h-5" />
              <span>No commitment</span>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={isCalendlyOpen} onOpenChange={setIsCalendlyOpen}>
        <DialogContent className="bg-background p-0 w-full max-w-4xl h-[90vh] md:h-[700px]">
          <DialogHeader className="p-4 border-b">
            <DialogTitle>Book Your Free Consultation</DialogTitle>
            <DialogDescription>
              Choose a time that works for you.
            </DialogDescription>
          </DialogHeader>
          <div className="h-[calc(100%-78px)]">
            <iframe
              src="https://calendly.com/ylebiane/30-minute-meeting"
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
