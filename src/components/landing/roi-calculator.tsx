"use client";

import { useState, useMemo } from "react";
import { Card } from "../ui/card";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";
import Link from "next/link";
import { ShieldCheck, Database, ArrowRight, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const COMPLEXITY_LEVELS = [
  { label: "Simple", multiplier: 1, description: "Standard Connections" },
  { label: "Custom", multiplier: 1.8, description: "Custom Code & Sync" },
  { label: "High-Scale", multiplier: 3.5, description: "Maximum Security" },
];

const MAINTENANCE_LEVELS = [
  { label: "Build Only", multiplier: 0, description: "You manage it" },
  { label: "Priority", multiplier: 1, description: "We help you out" },
  { label: "Managed", multiplier: 2, description: "Full maintenance" },
];

export default function RoiCalculator() {
  const [integrations, setIntegrations] = useState(1);
  const [complexityIdx, setComplexityIdx] = useState(0);
  const [maintenanceIdx, setMaintenanceIdx] = useState(0);
  const [hourlyRate, setHourlyRate] = useState(85);
  const [weeklyHours, setWeeklyHours] = useState(10);

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
    <section id="roi-calculator" className="bg-transparent py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-black font-headline tracking-tight">Estimate Your Savings</h2>
          <p className="text-muted-foreground mt-2">See how quickly a custom system pays for itself.</p>
        </div>

        <Card className="overflow-hidden border border-border/50 shadow-2xl flex flex-col md:flex-row bg-card/40 backdrop-blur-lg">
          <div className="md:w-3/5 p-8 lg:p-10 space-y-12">
            
            <div className="space-y-6">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary/80 border-b border-primary/10 pb-2">1. Your Project Scope</h3>
              
              <div className="grid sm:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Apps to Connect</Label>
                    <span className="text-xl font-black text-primary">{integrations < 12 ? integrations : `${integrations+"+"}` }</span>
                  </div>
                  <Slider 
                    value={[integrations]} 
                    onValueChange={(val) => setIntegrations(val[0])} 
                    min={1} 
                    max={12} 
                    step={1} 
                    className="py-2"
                  />
                </div>

                <div className="space-y-4">
                  <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Level of Customization</Label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {COMPLEXITY_LEVELS.map((level, idx) => (
                      <button
                        key={level.label}
                        onClick={() => setComplexityIdx(idx)}
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
                <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Monthly Support Level</Label>
                <div className="grid grid-cols-3 gap-1.5">
                  {MAINTENANCE_LEVELS.map((level, idx) => (
                    <button
                      key={level.label}
                      onClick={() => setMaintenanceIdx(idx)}
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
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary/80 border-b border-primary/10 pb-2">2. Your Current Manual Work</h3>
              
              <div className="grid sm:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Hours Spent/Week</Label>
                    <span className="text-xl font-black text-primary">{weeklyHours}h</span>
                  </div>
                  <Slider 
                    value={[weeklyHours]} 
                    onValueChange={(val) => setWeeklyHours(val[0])} 
                    min={1} 
                    max={60} 
                    step={1} 
                    className="py-2"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Cost per Hour</Label>
                    <span className="text-xl font-black text-primary">{formatCurrency(hourlyRate)}/h</span>
                  </div>
                  <Slider 
                    value={[hourlyRate]} 
                    onValueChange={(val) => setHourlyRate(val[0])} 
                    min={15} 
                    max={250} 
                    step={5} 
                    className="py-2"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="md:w-2/5 bg-primary/5 p-8 lg:p-10 flex flex-col justify-between border-l border-border/50">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">Initial Investment</span>
                  <div className="text-3xl lg:text-4xl font-black tracking-tighter text-primary">
                    {formatCurrency(calculations.buildCost)}
                  </div>
                  <div className="text-[10px] opacity-70 font-medium">One-time fee to build your system</div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">Monthly Help (Optional)</span>
                  <div className="text-3xl lg:text-4xl font-black tracking-tighter text-foreground">
                    {formatCurrency(calculations.monthlyCost)}
                  </div>
                  <div className="text-[10px] opacity-70 font-medium">Recurring support and updates</div>
                </div>
              </div>

              <div className="space-y-4 pt-8 border-t border-border/50">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold uppercase opacity-60">Total Yearly Cost</span>
                  <span className="font-bold">{formatCurrency(calculations.annualInvestment)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold uppercase opacity-60">Your Current Yearly Cost</span>
                  <span className="font-bold">{formatCurrency(calculations.annualLabor)}</span>
                </div>
                <div className="flex justify-between items-center text-green-600 dark:text-green-400">
                  <span className="text-[10px] font-bold uppercase opacity-60">Yearly Savings</span>
                  <span className="font-bold text-lg">{formatCurrency(calculations.firstYearSavings)}</span>
                </div>
              </div>
            </div>

            <div className="pt-10">
              <Link href="#contact" className="btn-custom-glass w-full">
                <div className="btn-custom-glass-inner">
                  <div className="btn-custom-glass-text flex items-center justify-center gap-2">
                    Get a Free Review
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
