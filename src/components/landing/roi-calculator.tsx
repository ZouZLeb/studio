"use client";

import { useState, useMemo } from "react";
import { Card } from "../ui/card";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";
import Link from "next/link";
import { ShieldCheck, Database, ArrowRight, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const COMPLEXITY_LEVELS = [
  { label: "Standard", multiplier: 1, description: "n8n + Standard Nodes" },
  { label: "Advanced", multiplier: 1.8, description: "Custom JS & API Hooks" },
  { label: "Enterprise", multiplier: 3.5, description: "High-Security / Scale" },
];

const MAINTENANCE_LEVELS = [
  { label: "One-Time", multiplier: 0, description: "Build only" },
  { label: "Priority", multiplier: 1, description: "Priority support" },
  { label: "Managed", multiplier: 2, description: "Full lifecycle" },
];

export default function RoiCalculator() {
  const [integrations, setIntegrations] = useState(1);
  const [complexityIdx, setComplexityIdx] = useState(0);
  const [maintenanceIdx, setMaintenanceIdx] = useState(0);
  const [hourlyRate, setHourlyRate] = useState(85);
  const [weeklyHours, setWeeklyHours] = useState(10);

  const calculations = useMemo(() => {
    // 1. Initial Build Cost (One-time)
    const baseBuildPrice = 1500;
    const pricePerIntegration = 500;
    const complexityMultiplier = COMPLEXITY_LEVELS[complexityIdx].multiplier;
    
    const buildCost = Math.round(
      (baseBuildPrice + (integrations * pricePerIntegration)) * complexityMultiplier
    );

    // 2. Monthly Maintenance Cost
    const baseMonthlyPrice = 250;
    const supportMultiplier = MAINTENANCE_LEVELS[maintenanceIdx].multiplier;
    
    // Monthly cost is $0 if One-Time is selected
    const monthlyCost = maintenanceIdx === 0 
      ? 0 
      : Math.round((baseMonthlyPrice + (integrations * 50)) * complexityMultiplier * supportMultiplier);

    // 3. Labor and Savings
    const annualLabor = (hourlyRate * weeklyHours) * 52;
    const annualInvestment = buildCost + (monthlyCost * 12);
    
    // Savings calculation (Labor - 1st Year Total Investment)
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
          <h2 className="text-3xl md:text-4xl font-black font-headline tracking-tight">Estimate Your Investment</h2>
          <p className="text-muted-foreground mt-2">See how an engineered system pays for itself in weeks.</p>
        </div>

        <Card className="overflow-hidden border border-border/50 shadow-2xl flex flex-col md:flex-row bg-card/40 backdrop-blur-lg">
          {/* Inputs Column */}
          <div className="md:w-3/5 p-8 lg:p-10 space-y-12">
            
            {/* Build & Maintenance Group */}
            <div className="space-y-6">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary/80 border-b border-primary/10 pb-2">1. System Scope & Maintenance</h3>
              
              <div className="grid sm:grid-cols-2 gap-8">
                {/* Integrations */}
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Number of Integrations</Label>
                    <span className="text-xl font-black text-primary">{integrations}</span>
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

                {/* Complexity */}
                <div className="space-y-4">
                  <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Build Complexity</Label>
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

              {/* Support Level */}
              <div className="space-y-4">
                <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Support & Maintenance Level</Label>
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

            {/* Labor Cost Group */}
            <div className="space-y-6 pt-4">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary/80 border-b border-primary/10 pb-2">2. Current Manual Labor Costs</h3>
              
              <div className="grid sm:grid-cols-2 gap-8">
                {/* Weekly Hours */}
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Hours Wasted / Week</Label>
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

                {/* Hourly Rate */}
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Internal Hourly Rate</Label>
                    <span className="text-xl font-black text-primary">{formatCurrency(hourlyRate)}/h</span>
                  </div>
                  <Slider 
                    value={[hourlyRate]} 
                    onValueChange={(val) => setHourlyRate(val[0])} 
                    min={20} 
                    max={250} 
                    step={5} 
                    className="py-2"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border/30 border-dashed">
              <div className="flex items-center gap-2 text-[9px] font-bold text-muted-foreground uppercase">
                <ShieldCheck className="w-3 h-3 text-primary" /> Privacy
              </div>
              <div className="flex items-center gap-2 text-[9px] font-bold text-muted-foreground uppercase">
                <Database className="w-3 h-3 text-primary" /> Ownership
              </div>
              <div className="flex items-center gap-2 text-[9px] font-bold text-muted-foreground uppercase">
                <Zap className="w-3 h-3 text-primary" /> n8n Power
              </div>
            </div>
          </div>

          {/* Results Column */}
          <div className="md:w-2/5 bg-primary/5 p-8 lg:p-10 flex flex-col justify-between border-l border-border/50">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">Initial Build Investment</span>
                  <div className="text-3xl lg:text-4xl font-black tracking-tighter text-primary">
                    {formatCurrency(calculations.buildCost)}
                  </div>
                  <div className="text-[10px] opacity-70 font-medium">One-time engineering fee</div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">Monthly Support & Maintenance</span>
                  <div className="text-3xl lg:text-4xl font-black tracking-tighter text-foreground">
                    {formatCurrency(calculations.monthlyCost)}
                  </div>
                  <div className="text-[10px] opacity-70 font-medium">Monthly recurring cost</div>
                </div>
              </div>

              <div className="space-y-4 pt-8 border-t border-border/50">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold uppercase opacity-60">Total Yearly System Cost</span>
                  <span className="font-bold">{formatCurrency(calculations.annualInvestment)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold uppercase opacity-60">Total Yearly Labor Cost</span>
                  <span className="font-bold">{formatCurrency(calculations.annualLabor)}</span>
                </div>
                <div className="flex justify-between items-center text-green-600 dark:text-green-400">
                  <span className="text-[10px] font-bold uppercase opacity-60">Total Yearly Saved</span>
                  <span className="font-bold text-lg">{formatCurrency(calculations.firstYearSavings)}</span>
                </div>
              </div>
            </div>

            <div className="pt-10">
              <Link href="#contact" className="btn-custom-glass w-full">
                <div className="btn-custom-glass-inner">
                  <div className="btn-custom-glass-text flex items-center justify-center gap-2">
                    Get Architecture Audit
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
