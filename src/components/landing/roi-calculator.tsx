"use client";

import { useState, useEffect } from "react";
import CountUp from "react-countup";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
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
    <section id="roi-calculator" className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-slate-900 dark:via-background dark:to-blue-900/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">
            Calculate Your Potential Savings
          </h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
            Quantify the cost of manual work and see your potential ROI in seconds.
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
            <Card className="p-8 h-full">
              <div className="space-y-8">
                <div>
                  <Label htmlFor="hourly-rate" className="text-base font-semibold">
                    Average Hourly Rate: <span className="text-primary font-bold">${hourlyRate}</span>
                  </Label>
                  <Slider
                    id="hourly-rate"
                    value={[hourlyRate]}
                    onValueChange={(val) => setHourlyRate(val[0])}
                    min={15} max={200} step={5}
                    className="mt-3"
                  />
                </div>
                <div>
                  <Label htmlFor="hours-week" className="text-base font-semibold">
                    Manual Hours per Week: <span className="text-primary font-bold">{hoursPerWeek}</span>
                  </Label>
                   <Slider
                    id="hours-week"
                    value={[hoursPerWeek]}
                    onValueChange={(val) => setHoursPerWeek(val[0])}
                    min={1} max={40} step={1}
                    className="mt-3"
                  />
                </div>
                <div>
                  <Label htmlFor="employees" className="text-base font-semibold">
                    Employees Affected: <span className="text-primary font-bold">{employees}</span>
                  </Label>
                   <Slider
                    id="employees"
                    value={[employees]}
                    onValueChange={(val) => setEmployees(val[0])}
                    min={1} max={50} step={1}
                    className="mt-3"
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
            <Card className="bg-gradient-to-br from-primary to-blue-700 text-primary-foreground p-8 shadow-2xl">
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-white/20">
                  <span className="text-lg">Annual Cost of Manual Work:</span>
                  <span className="text-3xl font-bold text-red-300">
                    <CountUp
                      start={0}
                      end={annualCost}
                      duration={1}
                      formattingFn={formatCurrency}
                    />
                  </span>
                </div>

                <div className="flex justify-between items-center pb-4 border-b border-white/20">
                  <span className="text-lg">Average Solution Cost (One-Time):</span>
                  <span className="text-2xl font-bold">
                    {formatCurrency(solutionCost)}
                  </span>
                </div>

                <div className="flex justify-between items-center pb-4 border-b-2 border-green-300">
                  <span className="text-xl font-semibold">Your 1st Year Savings:</span>
                  <span className="text-4xl font-bold text-green-300">
                    <CountUp
                      start={0}
                      end={savings}
                      duration={1.5}
                      formattingFn={formatCurrency}
                    />
                  </span>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-xl font-semibold">Estimated ROI Timeline:</span>
                  <span className="text-3xl font-bold text-yellow-300">
                    <CountUp start={0} end={roiDays} duration={1} /> days
                  </span>
                </div>
              </div>
              <Button asChild size="lg" className="w-full mt-8 bg-yellow-300 text-primary hover:bg-yellow-400">
                <Link href="#contact">
                  Lock In Your Savings
                </Link>
              </Button>
               <p className="text-center text-sm text-primary-foreground/70 mt-3">
                No commitment required • 15-minute call
              </p>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
