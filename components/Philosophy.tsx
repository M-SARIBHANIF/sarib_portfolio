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
    <section id="philosophy" className="py-32 pl-[calc(56px+2rem)] pr-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-1/3 left-1/4 w-96 h-96 bg-[var(--purple)] opacity-[0.02] rounded-full blur-3xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.02, 0.04, 0.02] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <RevealWrapper>
        <div className="max-w-6xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="mb-16 text-center">
            <motion.span 
              className="text-sm font-mono text-[var(--blue)] mb-2 block"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {"// 05"}
            </motion.span>
            <motion.h2 
              className="text-4xl md:text-6xl font-bold"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              style={{ textShadow: "0 0 30px var(--purple-glow)" }}
            >
              Philosophy
            </motion.h2>
          </div>

          {/* Cards Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {philosophies.map((item, index) => {
              const isHovered = hoveredCard === index;
              return (
                <motion.div
                  key={item.title}
                  className="group relative"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onHoverStart={() => setHoveredCard(index)}
                  onHoverEnd={() => setHoveredCard(null)}
                >
                  <motion.div 
                    className={`relative overflow-hidden p-8 bg-[var(--bg2)] border rounded-2xl h-full transition-all duration-300 ${
                      isHovered ? `border-[var(--${item.color})]` : "border-[var(--border)]"
                    } gradient-border-glow`}
                    whileHover={{ y: -8, scale: 1.02 }}
                    animate={isHovered ? {
                      boxShadow: `0 0 30px var(--${item.color}-glow)`
                    } : {
                      boxShadow: "none"
                    }}
                  >
                    {/* Top Gradient Border on Hover */}
                    <motion.div 
                      className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--${item.color})] via-[var(--purple)] to-[var(--cyan)]`}
                      initial={{ opacity: 0, scaleX: 0 }}
                      animate={{ opacity: isHovered ? 1 : 0, scaleX: isHovered ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ boxShadow: `0 0 15px var(--${item.color}-glow)` }}
                    />

                    {/* Glowing Icon */}
                    <motion.div
                      className={`w-16 h-16 rounded-xl bg-[var(--${item.color}-dim)] flex items-center justify-center mb-6 text-[var(--${item.color})]`}
                      animate={isHovered ? {
                        boxShadow: [`0 0 15px var(--${item.color}-glow)`, `0 0 30px var(--${item.color}-glow)`, `0 0 15px var(--${item.color}-glow)`]
                      } : {}}
                      transition={{ duration: 1.5, repeat: isHovered ? Infinity : 0 }}
                    >
                      {item.icon}
                    </motion.div>

                    <motion.h3 
                      className={`text-xl font-bold mb-3 transition-colors ${isHovered ? `text-[var(--${item.color})]` : "text-[var(--text)]"}`}
                      style={isHovered ? { textShadow: `0 0 15px var(--${item.color}-glow)` } : {}}
                    >
                      {item.title}
                    </motion.h3>
                    <p className="text-[var(--text2)] text-sm leading-relaxed">
                      {item.description}
                    </p>

                    {/* Background glow */}
                    <motion.div
                      className={`absolute inset-0 bg-[var(--${item.color}-dim)] opacity-0 pointer-events-none rounded-2xl`}
                      animate={{ opacity: isHovered ? 0.2 : 0 }}
                    />
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* Terminal Quote */}
          <motion.div
            className="bg-[var(--bg2)] border border-[var(--border)] rounded-2xl overflow-hidden hover:border-[var(--green)] transition-colors gradient-border-glow"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ boxShadow: "0 0 30px var(--green-glow)" }}
          >
            {/* Terminal Header */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--border)] bg-[var(--bg3)]/50">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[var(--red)]" style={{ boxShadow: "0 0 8px var(--red-glow)" }} />
                <div className="w-3 h-3 rounded-full bg-[var(--amber)]" style={{ boxShadow: "0 0 8px var(--amber-glow)" }} />
                <div className="w-3 h-3 rounded-full bg-[var(--green)]" style={{ boxShadow: "0 0 8px var(--green-glow)" }} />
              </div>
              <span className="text-xs font-mono text-[var(--text3)] ml-2">
                ~/philosophy
              </span>
            </div>

            {/* Terminal Content */}
            <div className="p-6 font-mono text-sm">
              <div className="text-[var(--text3)] mb-2">
                <span className="text-[var(--green)]">$</span> echo $DEVELOPMENT_PHILOSOPHY
              </div>
              <motion.div 
                className="text-[var(--green)] mb-4"
                style={{ textShadow: "0 0 10px var(--green-glow)" }}
              >
                &quot;Write code that your future self will thank you for.&quot;
              </motion.div>
              <div className="text-[var(--text3)] mb-2">
                <span className="text-[var(--green)]">$</span> cat mission.txt
              </div>
              <div className="text-[var(--cyan)] mb-4" style={{ textShadow: "0 0 8px var(--cyan-glow)" }}>
                Building software that solves real problems, one commit at a
                time.
              </div>
              <div className="flex items-center">
                <span className="text-[var(--green)]">$</span>
                <motion.span 
                  className="w-2 h-4 bg-[var(--green)] ml-2 cursor-blink"
                  animate={{ boxShadow: ["0 0 5px var(--green-glow)", "0 0 15px var(--green-glow)", "0 0 5px var(--green-glow)"] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </RevealWrapper>
    </section>
  );
}
