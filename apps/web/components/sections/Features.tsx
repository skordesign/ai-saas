"use client";

import { motion } from "framer-motion";
import { Zap, Target, Sliders, Globe, TrendingUp, Shield } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Instant Generation",
    description:
      "Get a complete marketing package — headline, tagline, feature bullets, and CTA — in under 10 seconds. No waiting, no writer's block.",
    color: "text-yellow-400",
    bg: "bg-yellow-400/10",
  },
  {
    icon: Target,
    title: "Conversion-Optimized",
    description:
      "Every word is crafted using proven copywriting frameworks (AIDA, PAS, FAB) that drive clicks, signups, and sales.",
    color: "text-violet-400",
    bg: "bg-violet-400/10",
  },
  {
    icon: Sliders,
    title: "Fully Customizable",
    description:
      "Not happy with the first result? Regenerate, tweak the tone (casual, professional, bold), and iterate until it's perfect.",
    color: "text-blue-400",
    bg: "bg-blue-400/10",
  },
  {
    icon: Globe,
    title: "Multi-Language",
    description:
      "Launch globally from day one. Generate copy in 30+ languages while preserving brand voice and cultural nuance.",
    color: "text-green-400",
    bg: "bg-green-400/10",
  },
  {
    icon: TrendingUp,
    title: "A/B Test Ready",
    description:
      "Generate 5 headline variants in seconds. Export directly to your A/B testing tool and let data pick the winner.",
    color: "text-orange-400",
    bg: "bg-orange-400/10",
  },
  {
    icon: Shield,
    title: "Brand Voice Lock",
    description:
      "Train NeuralCopy on your existing content. Every generation matches your unique tone, style, and terminology.",
    color: "text-pink-400",
    bg: "bg-pink-400/10",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 relative">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-4 border border-primary/30 bg-primary/10 rounded-full px-3 py-1">
            Features
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Everything you need to{" "}
            <span className="gradient-text">ship faster</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            NeuralCopy isn&apos;t just a text generator. It&apos;s a full copywriting system built
            for modern SaaS teams.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="p-6 rounded-2xl border border-border bg-card hover:border-primary/40 hover:glow-sm transition-all duration-300 group"
              >
                <div
                  className={`w-11 h-11 rounded-xl ${feature.bg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}
                >
                  <Icon className={`w-5 h-5 ${feature.color}`} />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
