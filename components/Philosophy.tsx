"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { RevealWrapper } from "./RevealWrapper";

const philosophies = [
  {
    title: "Precision Over Speed",
    description:
      "I've been shooting since age 6. At 16, I hit a matchstick from 150 feet with open sights, no support. That kind of discipline — patience, control, focus — carries into how I approach engineering.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
  },
  {
    title: "Systems Thinking",
    description:
      "I don't just test features; I trace problems to their source. Understanding how components interact, where failures cascade, and how to build resilient architectures.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    title: "Ownership & Trust",
    description:
      "The best teams treat QA as engineering, not gatekeeping. I take ownership of the systems I work on — from test strategy to infrastructure to shipping reliable code.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: "Clean & Efficient",
    description:
      "I run Fedora because Windows is bloated. I brew V60 pour-over because instant coffee is lazy. I write clean code because complexity is a liability.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
        <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z" />
        <line x1="6" y1="2" x2="6" y2="4" />
        <line x1="10" y1="2" x2="10" y2="4" />
        <line x1="14" y1="2" x2="14" y2="4" />
      </svg>
    ),
  },
];

export function Philosophy() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section id="philosophy" className="py-24 px-8 md:px-12 lg:px-16 bg-[var(--bg)]">
      <RevealWrapper>
        <div className="max-w-4xl">
          {/* Section Header */}
          <div className="section-header">
            <span className="section-number">06.</span>
            <h2 className="section-title">Philosophy</h2>
            <div className="section-line" />
          </div>

          {/* Intro Text */}
          <p className="text-[var(--text2)] mb-10 max-w-2xl">
            Quality isn&apos;t a phase in the pipeline — it&apos;s a mindset that runs through everything I build.
          </p>

          {/* Cards Grid - 2x2 */}
          <div className="grid md:grid-cols-2 gap-6">
            {philosophies.map((item, index) => {
              const isHovered = hoveredCard === index;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className={`card h-full transition-all duration-300 ${isHovered ? "border-[var(--cyan)]" : ""}`}>
                    {/* Icon */}
                    <div className={`card-icon transition-all ${isHovered ? "scale-110" : ""}`}>
                      {item.icon}
                    </div>

                    {/* Title */}
                    <h3 className={`text-base font-semibold mb-3 transition-colors ${isHovered ? "text-[var(--cyan)]" : "text-[var(--text)]"}`}>
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-[var(--text2)] leading-relaxed">
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
