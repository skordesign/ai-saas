"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How is NeuralCopy different from ChatGPT?",
    answer:
      "While ChatGPT is a general-purpose assistant, NeuralCopy is purpose-built for conversion copywriting. Our system prompt is tuned on proven frameworks (AIDA, PAS) and outputs structured, ready-to-use landing page packages — not raw prose you need to reformat.",
  },
  {
    question: "Can I use the generated copy commercially?",
    answer:
      "Yes, absolutely. All copy generated through NeuralCopy is 100% yours. There are no licensing restrictions — use it on your website, ads, email campaigns, or anywhere else.",
  },
  {
    question: "Does it work for technical or niche products?",
    answer:
      "Yes. The more specific your description, the better the output. NeuralCopy handles developer tools, B2B SaaS, e-commerce, fintech, and even highly technical products well.",
  },
  {
    question: "What AI model powers NeuralCopy?",
    answer:
      "NeuralCopy is powered by GPT-4o via Azure OpenAI, chosen for its superior instruction-following and nuanced writing quality. All processing happens on Azure infrastructure for enterprise-grade reliability.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "Yes — the Free plan includes 5 generations per month with no credit card required. Pro and Team plans come with a 14-day free trial so you can experience the full feature set risk-free.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes, you can cancel your subscription at any time from your account dashboard. There are no long-term contracts or cancellation fees. You keep access until the end of your billing period.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-4 border border-primary/30 bg-primary/10 rounded-full px-3 py-1">
            FAQ
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Common <span className="gradient-text">questions</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Accordion multiple={false} className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={i}
                className="border border-border rounded-xl bg-card px-6 py-1 data-[state=open]:border-primary/40"
              >
                <AccordionTrigger className="text-left font-medium hover:no-underline hover:text-primary transition-colors py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
