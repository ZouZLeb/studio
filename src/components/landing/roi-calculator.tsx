"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "../ui/card";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const COMPLEXITY_LEVELS = [
  { label: "Simple", multiplier: 1, description: "Standard Connections" },
  { label: "Custom", multiplier: 1.8, description: "Custom Code & Sync" },
  { label: "High-Scale", multiplier: 3.5, description: "Maximum Security" },
];

const MAINTENANCE_LEVELS = [
  { label: "Build Only", multiplier: 0, description: "Full documentation & hand-over" },
  { label: "Priority", multiplier: 1, description: "Direct engineer access & emergency support" },
  { label: "Managed", multiplier: 2, description: "Proactive maintenance, hosting & security" },
];

export default function RoiCalculator() {
  const [integrations, setIntegrations] = useState(1);
  const [complexityIdx, setComplexityIdx] = useState(0);
  const [maintenanceIdx, setMaintenanceIdx] = useState(0);
  const [hourlyRate, setHourlyRate] = useState(20);
  const [weeklyHours, setWeeklyHours] = useState(40);

  const calculations = useMemo(() => {
    const baseBuildPrice = 499;
    const pricePerIntegration = 500;
    const complexityMultiplier = COMPLEXITY_LEVELS[complexityIdx].multiplier;
    
    const buildCost = Math.round(
      (baseBuildPrice + ((integrations - 1) * pricePerIntegration)) * complexityMultiplier
    );

    const baseMonthlyPrice = 250;
    const supportMultiplier = MAINTENANCE_LEVELS[maintenanceIdx].multiplier;
    
    const monthlyCost = maintenanceIdx === 0 
      ? 0 
      : Math.round((baseMonthlyPrice + (integrations * 50)) * complexityMultiplier/2 * supportMultiplier);

    const annualLabor = (hourlyRate * weeklyHours) * 52;
    const annualInvestment = buildCost + (monthlyCost * 12);
    const firstYearSavings = annualLabor - annualInvestment;
    
    return { buildCost, monthlyCost, annualLabor, firstYearSavings, annualInvestment };
  }, [integrations, complexityIdx, maintenanceIdx, hourlyRate, weeklyHours]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <section id="roi-calculator" className="bg-transparent py-12" aria-labelledby="roi-title">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-10">
          <h2 id="roi-title" className="text-3xl md:text-4xl font-black font-headline tracking-tight">Business Value Calculator</h2>
          <p className="text-muted-foreground mt-2">See exactly how quickly a custom engineered system pays for itself.</p>
        </div>

        <Card className="overflow-hidden border border-border/50 shadow-2xl flex flex-col md:flex-row bg-card/40 backdrop-blur-lg">
          <div className="md:w-3/5 p-8 lg:p-10 space-y-12">
            
            <div className="space-y-6">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary/80 border-b border-primary/10 pb-2">1. Automation Scope</h3>
              
              <div className="grid sm:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Apps to Connect</Label>
                    <span className="text-xl font-black text-primary" aria-live="polite">{integrations < 12 ? integrations : `${integrations+"+"}` }</span>
                  </div>
                  <Slider 
                    value={[integrations]} 
                    onValueChange={(val) => setIntegrations(val[0])} 
                    min={1} 
                    max={12} 
                    step={1} 
                    className="py-2"
                    aria-label="Number of software applications to integrate"
                  />
                </div>

                <div className="space-y-4">
                  <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Complexity Level</Label>
                  <div className="grid grid-cols-3 gap-1.5" role="radiogroup" aria-label="Level of customization">
                    {COMPLEXITY_LEVELS.map((level, idx) => (
                      <button
                        key={level.label}
                        onClick={() => setComplexityIdx(idx)}
                        aria-checked={complexityIdx === idx}
                        role="radio"
                        className={cn(
                          "flex flex-col items-center justify-center p-2 rounded-lg border transition-all text-center",
                          complexityIdx === idx 
                            ? "border-primary bg-primary/10 text-primary" 
                            : "border-border/50 hover:border-primary/30 text-muted-foreground"
                        )}
                      >
                        <span className="font-bold text-[10px]">{level.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Support Tier</Label>
                <div className="grid grid-cols-3 gap-1.5" role="radiogroup" aria-label="Monthly maintenance level">
                  {MAINTENANCE_LEVELS.map((level, idx) => (
                    <button
                      key={level.label}
                      onClick={() => setMaintenanceIdx(idx)}
                      aria-checked={maintenanceIdx === idx}
                      role="radio"
                      className={cn(
                        "flex flex-col items-center justify-center p-2 rounded-lg border transition-all text-center",
                        maintenanceIdx === idx 
                          ? "border-primary bg-primary/10 text-primary" 
                          : "border-border/50 hover:border-primary/30 text-muted-foreground"
                      )}
                    >
                      <span className="font-bold text-[10px]">{level.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6 pt-4">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary/80 border-b border-primary/10 pb-2">2. Current Operational Costs</h3>
              
              <div className="grid sm:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Manual Work (Hours/Week)</Label>
                    <span className="text-xl font-black text-primary" aria-live="polite">{weeklyHours}h</span>
                  </div>
                  <Slider 
                    value={[weeklyHours]} 
                    onValueChange={(val) => setWeeklyHours(val[0])} 
                    min={1} 
                    max={60} 
                    step={1} 
                    className="py-2"
                    aria-label="Hours spent on manual tasks per week"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Internal Hourly Rate</Label>
                    <span className="text-xl font-black text-primary" aria-live="polite">{formatCurrency(hourlyRate)}/h</span>
                  </div>
                  <Slider 
                    value={[hourlyRate]} 
                    onValueChange={(val) => setHourlyRate(val[0])} 
                    min={15} 
                    max={100} 
                    step={1} 
                    className="py-2"
                    aria-label="Cost per hour of manual labor"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="md:w-2/5 bg-primary/5 p-8 lg:p-10 flex flex-col justify-between border-l border-border/50">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">Initial System Build</span>
                  <div className="text-3xl lg:text-4xl font-black tracking-tighter text-primary" aria-live="polite">
                    {formatCurrency(calculations.buildCost) + (integrations < 12 ? '' : "+")}
                  </div>
                  <div className="text-[10px] opacity-70 font-medium">One-time engineering fee</div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">Monthly Maintenance</span>
                  <div className="text-3xl lg:text-4xl font-black tracking-tighter text-foreground" aria-live="polite">
                    {formatCurrency(calculations.monthlyCost)}
                  </div>
                  <div className="h-4 overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={maintenanceIdx}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.2 }}
                        className="text-[10px] opacity-70 font-medium"
                      >
                        {MAINTENANCE_LEVELS[maintenanceIdx].description}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-8 border-t border-border/50" aria-label="Savings summary">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold uppercase opacity-60">Year 1 Total Cost</span>
                  <span className="font-bold">{formatCurrency(calculations.annualInvestment)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold uppercase opacity-60">Current Manual Cost</span>
                  <span className="font-bold">{formatCurrency(calculations.annualLabor)}</span>
                </div>
                <div className="flex justify-between items-center text-green-600 dark:text-green-400">
                  <span className="text-[10px] font-bold uppercase opacity-60">Net Yearly Savings</span>
                  <span className="font-bold text-lg" aria-live="polite">{formatCurrency(calculations.firstYearSavings)}</span>
                </div>
              </div>
            </div>

            <div className="pt-10">
              <Link href="#contact" className="btn-custom-glass w-full">
                <div className="btn-custom-glass-inner">
                  <div className="btn-custom-glass-text flex items-center justify-center gap-2">
                    Request Strategy Review
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
