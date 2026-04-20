"use client";

import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for trying it out.",
    features: [
      "5 generations / month",
      "Headline + tagline only",
      "1 language",
      "Copy to clipboard",
      "Community support",
    ],
    cta: "Start Free",
    variant: "outline" as const,
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "per month",
    description: "For founders and solo marketers.",
    features: [
      "Unlimited generations",
      "Full copy package",
      "30+ languages",
      "5 tone presets",
      "A/B variant generator",
      "Priority support",
    ],
    cta: "Start 14-Day Trial",
    variant: "default" as const,
    highlighted: true,
    badge: "Most Popular",
  },
  {
    name: "Team",
    price: "$99",
    period: "per month",
    description: "For growing marketing teams.",
    features: [
      "Everything in Pro",
      "Up to 10 seats",
      "Brand voice training",
      "Custom tone profiles",
      "Team workspace & history",
      "Dedicated account manager",
    ],
    cta: "Contact Sales",
    variant: "outline" as const,
    highlighted: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 relative">
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-4 border border-primary/30 bg-primary/10 rounded-full px-3 py-1">
            Pricing
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Simple, <span className="gradient-text">honest pricing</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            No hidden fees. No credit card required to start. Cancel anytime.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-2xl border p-8 flex flex-col transition-all duration-300 ${
                plan.highlighted
                  ? "border-primary bg-card glow scale-[1.02]"
                  : "border-border bg-card hover:border-primary/30"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-4 py-1 text-xs font-semibold">
                    <Sparkles className="w-3 h-3 mr-1" />
                    {plan.badge}
                  </Badge>
                </div>
              )}

              <div className="mb-6">
                <h3 className="font-bold text-xl mb-1">{plan.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>
                <div className="flex items-end gap-1">
                  <span className="text-5xl font-black">{plan.price}</span>
                  <span className="text-muted-foreground mb-2">/{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-3 flex-1 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span className="text-foreground/80">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.highlighted ? "default" : "outline"}
                className={`w-full ${plan.highlighted ? "glow-sm" : ""}`}
                render={<a href="#waitlist" />}
              >
                <a href="#waitlist">{plan.cta}</a>
              </Button>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-muted-foreground text-sm mt-8"
        >
          All plans include a 14-day money-back guarantee. Questions?{" "}
          <a href="#" className="text-primary hover:underline">
            Talk to us
          </a>
          .
        </motion.p>
      </div>
    </section>
  );
}
