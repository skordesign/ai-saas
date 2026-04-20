"use client";

import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import AICopyDemo from "@/components/AICopyDemo";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-16 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-100 bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-100 h-100 bg-fuchsia-900/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left: Text content */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 border border-primary/30 bg-primary/10 text-primary rounded-full px-4 py-2 text-xs font-semibold mb-8"
            >
              <Star className="w-3 h-3 fill-primary" />
              Powered by GPT-4o via Azure OpenAI
              <ArrowRight className="w-3 h-3" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-6"
            >
              Your product idea.
              <br />
              <span className="gradient-text">10-second copy.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-muted-foreground leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0"
            >
              NeuralCopy turns a one-line product description into a complete, conversion-ready
              landing page copy package — headline, tagline, features, and CTA — in real-time.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-10"
            >
              <Button size="lg" className="h-12 px-8 glow text-base" render={<a href="#waitlist" />}>
                Get Early Access
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-8 text-base" render={<a href="#features" />}>
                See How It Works
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-4 justify-center lg:justify-start text-sm text-muted-foreground"
            >
              <div className="flex -space-x-2">
                {["SC", "MW", "PN", "JK"].map((init, i) => (
                  <div
                    key={init}
                    className={`w-8 h-8 rounded-full border-2 border-background flex items-center justify-center text-xs font-bold text-white ${
                      ["bg-violet-500", "bg-blue-500", "bg-fuchsia-500", "bg-indigo-500"][i]
                    }`}
                  >
                    {init}
                  </div>
                ))}
              </div>
              <span>
                <strong className="text-foreground">2,400+</strong> founders on the waitlist
              </span>
            </motion.div>
          </div>

          {/* Right: Live AI Demo */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex-1 w-full"
          >
            <AICopyDemo />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
