"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { RevealWrapper } from "./RevealWrapper";

const philosophies = [
  {
    title: "Architect First",
    description:
      "Before writing code, I design systems that scale. Good architecture prevents technical debt and enables rapid iteration.",
    color: "blue",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    title: "Automate Everything",
    description:
      "Manual processes are error-prone. I build pipelines, scripts, and tools that eliminate repetitive tasks and ensure consistency.",
    color: "purple",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    title: "Ship Then Iterate",
    description:
      "Perfect is the enemy of done. I ship functional products quickly, then iterate based on real user feedback and data.",
    color: "green",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8">
        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
      </svg>
    ),
  },
];

export function Philosophy() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section id="philosophy" className="py-20 px-8 md:px-12 bg-[var(--bg)]">
      <RevealWrapper>
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="mb-16 flex items-baseline gap-4">
            <span className="text-[var(--cyan)] font-mono text-lg font-bold">06.</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text)]">
              Philosophy
            </h2>
          </div>

          <p className="text-[var(--text-muted)] mb-12 max-w-2xl">
            Quality isn&apos;t a phase in the pipeline — it&apos;s a mindset that runs through everything I build.
          </p>

          {/* Cards Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {philosophies.map((item, index) => {
              const isHovered = hoveredCard === index;
              return (
                <motion.div
                  key={item.title}
                  className="relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onHoverStart={() => setHoveredCard(index)}
                  onHoverEnd={() => setHoveredCard(null)}
                >
                  <div className="p-6 rounded-lg border border-[var(--border)] bg-[var(--bg3)] transition-all duration-300 hover:border-[var(--cyan)] h-full">
                    {/* Icon */}
                    <div className="w-10 h-10 rounded-lg bg-[var(--cyan)] bg-opacity-10 flex items-center justify-center mb-4 text-[var(--cyan)]">
                      {item.icon}
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-[var(--text)] mb-3">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>


        </div>
      </RevealWrapper>
    </section>
  );
}
