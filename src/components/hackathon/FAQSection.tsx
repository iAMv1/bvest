"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FAQS_DATA, FAQItem } from "@/data/faqs";
import { IconChevronDown, IconSparkles } from "@/components/hackathon/Icons";

export const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(FAQS_DATA[0].id);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "General", "Participation", "Hacking & SDGs", "Logistics"];

  const filteredFaqs =
    activeCategory === "All"
      ? FAQS_DATA
      : FAQS_DATA.filter((faq) => faq.category === activeCategory);

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#090D18] border-t border-white/10">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider mb-3">
            <IconSparkles size={14} />
            <span>Clarifications &amp; Protocol</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-black tracking-tight text-white uppercase">
            FREQUENTLY ASKED QUESTIONS.
          </h2>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed mt-4">
            Everything you need to know about eligibility, logistics, SDG scopes, and campus hacking rules.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              data-cursor="button"
              className={`px-4 py-2 rounded-full font-mono text-xs font-bold uppercase tracking-wider transition-all ${
                activeCategory === cat
                  ? "bg-cyan-400 text-black shadow-lg shadow-cyan-400/20"
                  : "bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div
                key={faq.id}
                className="rounded-3xl border bg-white/2 border-white/10 hover:border-white/20 transition-all overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  data-cursor="button"
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 select-none"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-cyan-400">
                      Q.
                    </span>
                    <span className="font-heading text-base sm:text-lg font-bold text-white">
                      {faq.question}
                    </span>
                  </div>

                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-gray-400 shrink-0"
                  >
                    <IconChevronDown size={20} />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-5 sm:px-6 pb-6 pt-1 text-stone-300 text-xs sm:text-sm leading-relaxed border-t border-white/5 font-sans">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
