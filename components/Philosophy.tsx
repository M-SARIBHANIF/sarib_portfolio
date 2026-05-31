"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { RevealWrapper } from "./RevealWrapper";

const philosophies = [
  {
    title: "Progressive Overload",
    description:
      "In the gym, you don't max out on day one — you add weight when the form is right. I approach codebases the same way. Nail the fundamentals first, refactor when stable, scale when ready. Shortcuts in reps and shortcuts in code both lead to injury.",
    color: "#d4a855",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <path d="M6 4v16M18 4v16M3 8h4M17 8h4M3 16h4M17 16h4M7 12h10" />
      </svg>
    ),
  },
  {
    title: "Read the Fight",
    description:
      "A good boxer doesn't just throw punches — they read patterns, anticipate counters, and control the ring. I approach systems the same way. I don't just fix the bug in front of me; I trace where the breakdown started, how it cascaded, and what needs to change so it doesn't land again.",
    color: "#6b8afd",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <path d="M12 4c-1.5 0-3 .5-4 1.5L4 9c-1 1-1 2.5 0 3.5l1 1c.5.5 1 .5 1.5.5H7l4 4h2l5-5c1-1 1-2.5 0-3.5L15 6c-1-1-2-2-3-2z" />
        <path d="M9 9l3 3" />
      </svg>
    ),
  },
  {
    title: "Ownership & Trust",
    description:
      "I don't hand off problems at the layer boundary. If something breaks in production, I don't ask whether it's a frontend issue or a backend issue — I just fix it. Full stack means full responsibility.",
    color: "#4ade80",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: "Clean & Efficient",
    description:
      "In boxing, a clean straight punch beats a wild haymaker every time. In the gym, perfect form beats ego-lifting. In code, a simple solution beats a clever one. I cut the fat — in my training and in my systems.",
    color: "#f472b6",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <path d="M20 12V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7" />
        <path d="M15 17h6M18 14v6" />
        <path d="M6 9h8M6 13h5" />
      </svg>
    ),
  },
];

export function Philosophy() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section id="philosophy" className="py-16 px-6 md:px-10 lg:px-14 bg-[var(--bg)]">
      <RevealWrapper>
        <div className="max-w-3xl">
          {/* Section Header */}
          <div className="section-header mb-8">
            <span className="section-number text-sm">06.</span>
            <h2 className="section-title text-xl">Philosophy</h2>
            <div className="section-line" />
          </div>

          {/* Intro Text */}
          <p className="text-[var(--text2)] mb-6 max-w-2xl text-sm">
            Good software isn&apos;t rushed into production — it&apos;s thought through, built clean, and shipped with confidence.
          </p>

          {/* Cards Grid - 2x2 */}
          <div className="grid md:grid-cols-2 gap-4">
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
                  <div 
                    className="card h-full transition-all duration-300"
                    style={{ 
                      borderColor: isHovered ? item.color : undefined,
                    }}
                  >
                    {/* Icon */}
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center mb-3 transition-all"
                      style={{ 
                        backgroundColor: item.color + '15',
                        color: item.color,
                        transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                      }}
                    >
                      {item.icon}
                    </div>

                    {/* Title */}
                    <h3 
                      className="text-sm font-semibold mb-2 transition-colors"
                      style={{ color: isHovered ? item.color : 'var(--text)' }}
                    >
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-[var(--text2)] leading-relaxed">
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
