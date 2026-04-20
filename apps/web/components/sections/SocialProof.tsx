"use client";

import { motion } from "framer-motion";

const logos = [
  { name: "Vercel", width: 80 },
  { name: "Stripe", width: 70 },
  { name: "Linear", width: 72 },
  { name: "Figma", width: 65 },
  { name: "Notion", width: 80 },
  { name: "Loom", width: 65 },
];

export default function SocialProof() {
  return (
    <section className="py-14 border-y border-border bg-card/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-muted-foreground mb-8 tracking-widest uppercase"
        >
          Trusted by teams at the world&apos;s best companies
        </motion.p>
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6">
          {logos.map((logo, i) => (
            <motion.div
              key={logo.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="text-muted-foreground/40 hover:text-muted-foreground/70 transition-colors font-bold text-xl tracking-tight"
              style={{ width: logo.width }}
            >
              {logo.name}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
