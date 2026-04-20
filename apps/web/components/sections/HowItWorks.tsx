"use client";

import { motion } from "framer-motion";
import { PenLine, Cpu, Copy } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: PenLine,
    title: "Describe Your Product",
    description:
      "Enter your product name and a one-line description. No lengthy briefs, no creative prompts — just the basics.",
  },
  {
    number: "02",
    icon: Cpu,
    title: "AI Writes in Real-Time",
    description:
      "Watch GPT-4o stream your headline, tagline, feature bullets, and CTA token by token. Like having a senior copywriter think out loud.",
  },
  {
    number: "03",
    icon: Copy,
    title: "Copy, Customize & Ship",
    description:
      "One click to copy the full package. Paste it into your landing page builder, tweak if needed, and go live.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-4 border border-primary/30 bg-primary/10 rounded-full px-3 py-1">
            How It Works
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            From idea to copy in{" "}
            <span className="gradient-text">3 steps</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            No learning curve. No prompting skills required. Just describe what you&apos;re building
            and let the AI do the rest.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent hidden md:block" />

          <div className="space-y-16">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isEven = i % 2 === 0;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className={`flex-1 ${isEven ? "md:text-right" : "md:text-left"}`}>
                    <div
                      className={`flex items-center gap-4 mb-4 ${
                        isEven ? "md:flex-row-reverse md:justify-end" : ""
                      }`}
                    >
                      <span className="text-6xl font-black text-border select-none">{step.number}</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed max-w-sm mx-auto md:mx-0">
                      {step.description}
                    </p>
                  </div>

                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-primary/20 border border-primary/40 flex items-center justify-center glow-sm">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                  </div>

                  <div className="flex-1 hidden md:block" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
