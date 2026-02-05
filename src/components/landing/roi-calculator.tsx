"use client";

import { useState, useEffect } from "react";
import CountUp from "react-countup";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";
import Link from "next/link";
import { motion } from "framer-motion";

export default function RoiCalculator() {
  const [hourlyRate, setHourlyRate] = useState(50);
  const [hoursPerWeek, setHoursPerWeek] = useState(10);
  const [employees, setEmployees] = useState(5);

  const [annualCost, setAnnualCost] = useState(0);
  const solutionCost = 2500;
  const [savings, setSavings] = useState(0);
  const [roiDays, setRoiDays] = useState(0);

  useEffect(() => {
    const weeklyCost = hourlyRate * hoursPerWeek * employees;
    const currentAnnualCost = weeklyCost * 52;
    setAnnualCost(currentAnnualCost);

    const currentSavings = currentAnnualCost > 0 ? currentAnnualCost - solutionCost : 0;
    setSavings(currentSavings);

    const currentRoiDays = weeklyCost > 0 ? Math.ceil((solutionCost / weeklyCost) * 7) : 0;
    setRoiDays(currentRoiDays);
  }, [hourlyRate, hoursPerWeek, employees]);

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
            Quantify Your Potential ROI
          </h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
            See exactly how much manual overhead is costing your business and how fast our engineered systems pay for themselves.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <Card className="p-8 h-full border-border shadow-md bg-white dark:bg-slate-900/50">
              <div className="space-y-10">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <Label htmlFor="hourly-rate" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      Avg Hourly Rate
                    </Label>
                    <span className="text-primary font-black text-xl">${hourlyRate}</span>
                  </div>
                  <Slider
                    id="hourly-rate"
                    value={[hourlyRate]}
                    onValueChange={(val) => setHourlyRate(val[0])}
                    min={15} max={200} step={5}
                    className="cursor-pointer"
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <Label htmlFor="hours-week" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      Manual Hours / Week
                    </Label>
                    <span className="text-primary font-black text-xl">{hoursPerWeek}h</span>
                  </div>
                   <Slider
                    id="hours-week"
                    value={[hoursPerWeek]}
                    onValueChange={(val) => setHoursPerWeek(val[0])}
                    min={1} max={40} step={1}
                    className="cursor-pointer"
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <Label htmlFor="employees" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      Employees Affected
                    </Label>
                    <span className="text-primary font-black text-xl">{employees}</span>
                  </div>
                   <Slider
                    id="employees"
                    value={[employees]}
                    onValueChange={(val) => setEmployees(val[0])}
                    min={1} max={50} step={1}
                    className="cursor-pointer"
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
            <Card className="bg-primary dark:bg-slate-900 text-primary-foreground dark:text-white p-8 shadow-2xl overflow-hidden relative border-none dark:border dark:border-primary/20">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 dark:bg-primary/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
              <div className="space-y-6 relative z-10">
                <div className="flex justify-between items-center pb-5 border-b border-white/10 dark:border-white/5">
                  <span className="text-lg font-medium opacity-80">Annual Manual Cost:</span>
                  <span className="text-3xl font-black text-red-200 dark:text-red-400">
                    <CountUp
                      start={0}
                      end={annualCost}
                      duration={1}
                      formattingFn={formatCurrency}
                    />
                  </span>
                </div>

                <div className="flex justify-between items-center pb-5 border-b border-white/10 dark:border-white/5">
                  <span className="text-lg font-medium opacity-80">One-Time Build Cost:</span>
                  <span className="text-2xl font-bold">
                    {formatCurrency(solutionCost)}
                  </span>
                </div>

                <div className="flex justify-between items-center pb-6 border-b-2 border-green-400 dark:border-accent">
                  <span className="text-xl font-bold">1st Year Net Savings:</span>
                  <span className="text-4xl font-black text-green-300 dark:text-accent">
                    <CountUp
                      start={0}
                      end={savings}
                      duration={1.5}
                      formattingFn={formatCurrency}
                    />
                  </span>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-xl font-bold">Estimated Breakeven:</span>
                  <span className="text-4xl font-black text-yellow-300 dark:text-yellow-400 drop-shadow-sm">
                    <CountUp start={0} end={roiDays} duration={1} /> days
                  </span>
                </div>
              </div>
              
              <Button asChild size="lg" className="w-full mt-10 bg-white dark:bg-primary text-primary dark:text-primary-foreground hover:bg-slate-100 dark:hover:bg-primary/90 font-black text-lg h-14 shadow-xl border-none">
                <Link href="#contact">
                  Stop the Leak → Schedule Audit
                </Link>
              </Button>
              
              <p className="text-center text-[10px] uppercase tracking-widest font-bold opacity-60 mt-4">
                No monthly per-task fees • You own the source code
              </p>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
