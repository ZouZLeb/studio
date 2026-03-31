"use client";

import { useState, useEffect } from "react";
import { X, Sparkles, Gift, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function WelcomePopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Check if user has already seen it in this session to avoid annoyance
    const hasSeenPopup = sessionStorage.getItem("aimatic_welcome_popup");
    
    if (hasSeenPopup) return;

    const timer = setTimeout(() => {
      setShouldRender(true);
      // Small delay for the animation to kick in
      setTimeout(() => setIsVisible(true), 10);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem("aimatic_welcome_popup", "true");
    // Remove from DOM after animation completes
    setTimeout(() => setShouldRender(false), 500);
  };

  if (!shouldRender) return null;

  return (
    <div 
      className={cn(
        "fixed inset-0 z-[100] flex items-center justify-center p-6 bg-background/60 backdrop-blur-sm transition-opacity duration-500 ease-in-out",
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
      onClick={handleClose}
    >
      <Card 
        className={cn(
          "relative w-full max-w-lg overflow-hidden bg-card/90 backdrop-blur-xl border-primary/20 shadow-2xl transition-all duration-500 ease-out transform",
          isVisible ? "scale-100 translate-y-0" : "scale-95 translate-y-8"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative Background Elements */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 blur-[60px] rounded-full" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-fuchsia-500/10 blur-[60px] rounded-full" />

        <button 
          onClick={(e) => {
            e.stopPropagation();
            handleClose();
          }}
          className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground transition-colors z-[110]"
          aria-label="Close welcome message"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8 md:p-10 relative z-10">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 shadow-inner">
              <Sparkles className="w-8 h-8 text-primary animate-pulse" />
            </div>
          </div>

          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold font-headline tracking-tight text-foreground">
              Welcome to <span className="text-primary">AImatic</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Unlock the power of secure AI automation for your business with our exclusive launch offers.
            </p>
          </div>

          <div className="mt-8 space-y-4">
            <div className="flex items-start gap-4 p-4 rounded-xl bg-primary/5 border border-primary/10 group hover:border-primary/30 transition-colors">
              <div className="p-2 rounded-lg bg-primary/20 text-primary">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-foreground">Free Architecture Consultation</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  15-minute strategy session with our expert developers in San Diego.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-orange-500/5 border border-orange-500/10 group hover:border-orange-500/30 transition-colors">
              <div className="p-2 rounded-lg bg-orange-500/20 text-orange-500">
                <Gift className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-foreground">30% Off Your First Build</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Limited time discount for new AI automation or custom script projects.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Button 
              size="sm" 
              className="flex-1 rounded-full text-lg h-12 shadow-lg shadow-primary/20 group"
              asChild
              onClick={handleClose}
            >
              <Link href="/#contact">
                Claim Offers Now <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>

          </div>

          <p className="text-center text-[11px] text-muted-foreground mt-6 uppercase tracking-widest font-semibold">
            Terms & conditions apply • San Diego based
          </p>
        </div>
      </Card>
    </div>
  );
}
