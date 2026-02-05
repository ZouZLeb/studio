"use client";

import { useState, useEffect } from "react";
import CountUp from "react-countup";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";
import Link from "next/link";
import { motion } from "framer-motion";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function RoiCalculator() {
  // Input States
  const [hourlyRate, setHourlyRate] = useState(65);
  const [hoursPerWeek, setHoursPerWeek] = useState(15);
  const [employees, setEmployees] = useState(3);
  
  // Cost States
  const [buildCost, setBuildCost] = useState(5000);
  const [monthlyMaintenance, setMonthlyMaintenance] = useState(250);
  const [enhancementBudget, setEnhancementBudget] = useState(1500);

  // Result States
  const [annualManualCost, setAnnualManualCost] = useState(0);
  const [totalFirstYearInvestment, setTotalFirstYearInvestment] = useState(0);
  const [firstYearSavings, setFirstYearSavings] = useState(0);
  const [roiDays, setRoiDays] = useState(0);

  useEffect(() => {
    // 1. Calculate Manual Burden
    const weeklyManualCost = hourlyRate * hoursPerWeek * employees;
    const yearlyManualCost = weeklyManualCost * 52;
    setAnnualManualCost(yearlyManualCost);

    // 2. Calculate Investment
    const annualOngoing = (monthlyMaintenance * 12) + enhancementBudget;
    const totalInvestment = buildCost + annualOngoing;
    setTotalFirstYearInvestment(totalInvestment);

    // 3. Calculate Savings
    const netSavings = yearlyManualCost - totalInvestment;
    setFirstYearSavings(netSavings > 0 ? netSavings : 0);

    // 4. Calculate Breakeven (Upfront cost / (Weekly Savings - Maintenance Burden))
    const weeklySavings = (yearlyManualCost / 52);
    const weeklyMaintenanceCost = (monthlyMaintenance * 12 / 52);
    const netWeeklyBenefit = weeklySavings - weeklyMaintenanceCost;
    
    if (netWeeklyBenefit > 0) {
      const days = Math.ceil((buildCost / netWeeklyBenefit) * 7);
      setRoiDays(days);
    } else {
      setRoiDays(0);
    }
  }, [hourlyRate, hoursPerWeek, employees, buildCost, monthlyMaintenance, enhancementBudget]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <section id="roi-calculator" className="bg-slate-50/50 dark:bg-slate-950/40 border-y dark:border-white/5">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">
            System Precision ROI Calculator
          </h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
            Calculate the exact impact of replacing manual overhead with engineered n8n systems. 
            Account for build, maintenance, and future growth.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 space-y-6"
          >
            <Card className="p-6 border-border shadow-md bg-white dark:bg-slate-900/50">
              <h3 className="text-sm font-black uppercase tracking-widest text-primary mb-6">1. Current Labor Burden</h3>
              <div className="space-y-8">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <Label className="text-xs font-bold text-muted-foreground uppercase">Avg Hourly Rate</Label>
                    <span className="font-black text-lg">${hourlyRate}</span>
                  </div>
                  <Slider
                    value={[hourlyRate]}
                    onValueChange={(val) => setHourlyRate(val[0])}
                    min={20} max={250} step={5}
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <Label className="text-xs font-bold text-muted-foreground uppercase">Hours / Week / Person</Label>
                    <span className="font-black text-lg">{hoursPerWeek}h</span>
                  </div>
                   <Slider
                    value={[hoursPerWeek]}
                    onValueChange={(val) => setHoursPerWeek(val[0])}
                    min={1} max={40} step={1}
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <Label className="text-xs font-bold text-muted-foreground uppercase">Team Size Affected</Label>
                    <span className="font-black text-lg">{employees}</span>
                  </div>
                   <Slider
                    value={[employees]}
                    onValueChange={(val) => setEmployees(val[0])}
                    min={1} max={100} step={1}
                  />
                </div>
              </div>
            </Card>

            <Card className="p-6 border-border shadow-md bg-white dark:bg-slate-900/50">
              <h3 className="text-sm font-black uppercase tracking-widest text-primary mb-6">2. Proposed Build Scope</h3>
              <div className="space-y-8">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <Label className="text-xs font-bold text-muted-foreground uppercase">Upfront Build Cost</Label>
                    <span className="font-black text-lg">{formatCurrency(buildCost)}</span>
                  </div>
                  <Slider
                    value={[buildCost]}
                    onValueChange={(val) => setBuildCost(val[0])}
                    min={999} max={25000} step={500}
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-1">
                        <Label className="text-xs font-bold text-muted-foreground uppercase">Monthly Support</Label>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger><Info className="w-3 h-3 text-muted-foreground" /></TooltipTrigger>
                                <TooltipContent>Includes priority incident response and minor tweaks.</TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    <span className="font-black text-lg">{formatCurrency(monthlyMaintenance)}</span>
                  </div>
                   <Slider
                    value={[monthlyMaintenance]}
                    onValueChange={(val) => setMonthlyMaintenance(val[0])}
                    min={0} max={2500} step={50}
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <Label className="text-xs font-bold text-muted-foreground uppercase">Annual Enhancements</Label>
                    <span className="font-black text-lg">{formatCurrency(enhancementBudget)}</span>
                  </div>
                   <Slider
                    value={[enhancementBudget]}
                    onValueChange={(val) => setEnhancementBudget(val[0])}
                    min={0} max={10000} step={250}
                  />
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <Card className="bg-slate-900 text-white p-8 shadow-2xl h-full flex flex-col justify-between overflow-hidden relative border border-primary/20">
              <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full -mr-40 -mt-40 blur-[100px]"></div>
              
              <div className="space-y-8 relative z-10">
                <div className="space-y-1">
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Annual Projections</span>
                    <h3 className="text-2xl font-black">Financial Summary</h3>
                </div>

                <div className="grid sm:grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <span className="text-sm font-medium opacity-60">Manual Labor Burden (Yearly)</span>
                        <div className="text-2xl font-black text-red-400">
                            <CountUp start={0} end={annualManualCost} duration={1} formattingFn={formatCurrency} />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <span className="text-sm font-medium opacity-60">1st Year Total Investment</span>
                        <div className="text-2xl font-bold">
                             <CountUp start={0} end={totalFirstYearInvestment} duration={1} formattingFn={formatCurrency} />
                        </div>
                        <div className="text-[10px] uppercase font-bold opacity-40">Build + Maintenance + Growth</div>
                    </div>
                </div>

                <div className="p-8 bg-primary/5 border border-primary/20 rounded-xl relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
                        <div>
                            <span className="text-sm font-bold uppercase tracking-widest text-primary mb-1 block">1st Year Net Savings</span>
                            <div className="text-5xl font-black text-accent drop-shadow-sm">
                                <CountUp start={0} end={firstYearSavings} duration={1.5} formattingFn={formatCurrency} />
                            </div>
                        </div>
                        <div className="text-center md:text-right">
                             <span className="text-sm font-bold uppercase tracking-widest text-yellow-400 mb-1 block">Estimated Breakeven</span>
                             <div className="text-4xl font-black text-white">
                                <CountUp start={0} end={roiDays} duration={1} /> <span className="text-lg opacity-60">days</span>
                             </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-[10px] uppercase font-bold tracking-widest opacity-50">
                    <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-primary rounded-full"></div>
                        No Per-Task Fees
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-primary rounded-full"></div>
                        Full IP Ownership
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-primary rounded-full"></div>
                        Privacy Guaranteed
                    </div>
                </div>
              </div>
              
              <div className="relative z-10 mt-12">
                <Button asChild size="lg" className="w-full bg-primary text-white hover:bg-primary/90 font-black text-lg h-16 shadow-xl border-none">
                    <Link href="#contact">
                    Request Architecture Audit & Custom Quote
                    </Link>
                </Button>
                <p className="text-center text-[10px] mt-4 opacity-40">
                    * Projections based on input data. Actual results may vary based on system complexity and API costs.
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
