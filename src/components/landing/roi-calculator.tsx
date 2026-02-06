"use client";

import { useState, useEffect, useMemo } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";
import Link from "next/link";
import { motion } from "framer-motion";
import { Zap, ShieldCheck, Database, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const COMPLEXITY_LEVELS = [
  { label: "Standard", multiplier: 1, description: "n8n + Standard Nodes" },
  { label: "Advanced", multiplier: 2.5, description: "Custom JS & API Hooks" },
  { label: "Enterprise", multiplier: 6, description: "High-Security / Scale" },
];

export default function RoiCalculator() {
  const [integrations, setIntegrations] = useState(1);
  const [complexityIdx, setComplexityIdx] = useState(0);
  const [weeklyLabor, setWeeklyLabor] = useState(1500); // Represents Total Team Labor Cost per week

  const calculations = useMemo(() => {
    // Pricing Logic
    const basePrice = 499;
    const pricePerIntegration = 750;
    const complexityMultiplier = COMPLEXITY_LEVELS[complexityIdx].multiplier;
    
    // Build Cost: $499 base + $750 per extra integration, multiplied by complexity
    const build = Math.round((basePrice + (integrations - 1) * pricePerIntegration) * complexityMultiplier);
    
    // Monthly Support: ~5% of build cost
    const monthly = Math.round(build * 0.05);
    
    // Labor Savings: Yearly manual labor vs System cost
    const annualLabor = weeklyLabor * 52;
    const totalFirstYearInvestment = build + (monthly * 12);
    const savings = Math.max(0, annualLabor - totalFirstYearInvestment);
    
    return { build, monthly, annualLabor, savings };
  }, [integrations, complexityIdx, weeklyLabor]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <section id="roi-calculator" className="bg-slate-50/50 dark:bg-slate-950/40 border-y py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-black font-headline tracking-tight">Estimate Your Investment</h2>
          <p className="text-muted-foreground mt-2">See how an engineered system pays for itself in weeks.</p>
        </div>

        <Card className="overflow-hidden border-none shadow-2xl flex flex-col md:flex-row bg-white dark:bg-slate-900">
          {/* Controls - Left Side */}
          <div className="md:w-3/5 p-8 lg:p-12 space-y-10">
            {/* Integrations Slider */}
            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <Label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Number of Integrations</Label>
                <span className="text-2xl font-black text-primary">{integrations}</span>
              </div>
              <Slider 
                value={[integrations]} 
                onValueChange={(val) => setIntegrations(val[0])} 
                min={1} 
                max={12} 
                step={1} 
                className="py-4"
              />
              <div className="flex justify-between text-[10px] font-bold text-muted-foreground/50 uppercase">
                <span>1 Integration</span>
                <span>12+ Enterprise Sync</span>
              </div>
            </div>

            {/* Complexity Toggles */}
            <div className="space-y-4">
              <Label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">System Complexity</Label>
              <div className="grid grid-cols-3 gap-3">
                {COMPLEXITY_LEVELS.map((level, idx) => (
                  <button
                    key={level.label}
                    onClick={() => setComplexityIdx(idx)}
                    className={cn(
                      "flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all text-center group",
                      complexityIdx === idx 
                        ? "border-primary bg-primary/5 text-primary" 
                        : "border-border hover:border-primary/30 text-muted-foreground"
                    )}
                  >
                    <span className="font-bold text-xs md:text-sm">{level.label}</span>
                    <span className="text-[9px] opacity-60 hidden sm:block">{level.description}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Weekly Labor Slider */}
            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <Label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Current Weekly Labor Cost</Label>
                <span className="text-2xl font-black text-foreground">{formatCurrency(weeklyLabor)}</span>
              </div>
              <Slider 
                value={[weeklyLabor]} 
                onValueChange={(val) => setWeeklyLabor(val[0])} 
                min={200} 
                max={10000} 
                step={100} 
                className="py-4"
              />
              <div className="flex justify-between text-[10px] font-bold text-muted-foreground/50 uppercase">
                <span>Part-time</span>
                <span>Large Team Overhead</span>
              </div>
            </div>

            {/* Value Props */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-dashed">
              <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase">
                <ShieldCheck className="w-3 h-3 text-primary" /> Privacy First
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase">
                <Database className="w-3 h-3 text-primary" /> Full Ownership
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase">
                <Zap className="w-3 h-3 text-primary" /> n8n Powered
              </div>
            </div>
          </div>

          {/* Results - Right Side */}
          <div className="md:w-2/5 bg-primary p-8 lg:p-12 text-primary-foreground flex flex-col justify-between relative overflow-hidden">
            {/* Visual background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none"></div>
            
            <div className="relative z-10 space-y-8">
              <div className="space-y-1">
                <span className="text-[11px] font-black uppercase tracking-[0.2em] opacity-80">Estimated Build Cost</span>
                <div className="text-5xl lg:text-6xl font-black tracking-tighter">
                  {formatCurrency(calculations.build)}
                </div>
                <div className="text-sm opacity-70 font-medium">One-time Investment</div>
              </div>

              <div className="space-y-4 pt-8 border-t border-white/20">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold uppercase opacity-60 tracking-wider">Ongoing Support</span>
                  <span className="font-bold">{formatCurrency(calculations.monthly)}<span className="text-[10px] opacity-60">/mo</span></span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold uppercase opacity-60 tracking-wider">Labor Replacement</span>
                  <span className="font-bold text-green-300">{formatCurrency(calculations.annualLabor)}<span className="text-[10px] opacity-60">/yr</span></span>
                </div>
              </div>

              <div className="p-4 bg-white/10 rounded-xl border border-white/20">
                <span className="text-[10px] font-black uppercase tracking-widest block mb-1 opacity-80">1st Year Net Savings</span>
                <div className="text-3xl font-black text-yellow-300">
                  {formatCurrency(calculations.savings)}
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-10">
              <Button asChild className="w-full bg-white text-primary hover:bg-slate-100 font-black text-base h-14 shadow-xl group">
                <Link href="#contact" className="flex items-center justify-center gap-2">
                  Get Your Custom Architecture
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <p className="text-[10px] text-center mt-4 opacity-60 font-bold uppercase tracking-widest">
                System Ownership Included • No Task Fees
              </p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
