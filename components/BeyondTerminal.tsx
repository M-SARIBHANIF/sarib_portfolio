"use client";

import { motion } from "framer-motion";
import { RevealWrapper } from "./RevealWrapper";

// Simulated contribution graph data
const generateContributionData = () => {
  const data = [];
  for (let week = 0; week < 52; week++) {
    const weekData = [];
    for (let day = 0; day < 7; day++) {
      // Random contribution level 0-4
      weekData.push(Math.floor(Math.random() * 5));
    }
    data.push(weekData);
  }
  return data;
};

const contributionData = generateContributionData();

const tools = [
  { name: "React + Vite", note: "frontend", icon: "⚛" },
  { name: "Node + FastAPI", note: "backend", icon: ">_" },
  { name: "PostgreSQL + MongoDB", note: "data", icon: "⬡" },
];

const hobbies = [
  {
    title: "Boxing",
    description: "Training boxer. I appreciate the discipline — footwork, combinations, reading your opponent. The ring teaches patience better than anything.",
    code: "while(!knockout) { jab(); cross(); slip(); }",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <path d="M12 4c-1.5 0-3 .5-4 1.5L4 9c-1 1-1 2.5 0 3.5l1 1c.5.5 1 .5 1.5.5H7l4 4h2l5-5c1-1 1-2.5 0-3.5L15 6c-1-1-2-2-3-2z" />
        <path d="M9 9l3 3" />
      </svg>
    ),
  },
  {
    title: "Gym",
    description: "Consistent lifter. Progressive overload, clean form, no shortcuts. The same principles I bring to writing code — show up, do the work, trust the process.",
    code: "lift({ weight: pr, form: 'strict', ego: false })",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <path d="M6 4v16M18 4v16M3 8h4M17 8h4M3 16h4M17 16h4M7 12h10" />
      </svg>
    ),
  },
  {
    title: "Building",
    description: "I build things outside of work too. Building a full e-commerce platform inspired by Amazon — Figma to design, React frontend, Node backend, PostgreSQL underneath.",
    code: "deploy({ stack: 'PERN', status: 'shipping...' })",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" />
      </svg>
    ),
  },
];

const getContributionColor = (level: number) => {
  switch (level) {
    case 0: return "bg-[var(--bg3)]";
    case 1: return "bg-[var(--cyan)] opacity-20";
    case 2: return "bg-[var(--cyan)] opacity-40";
    case 3: return "bg-[var(--cyan)] opacity-60";
    case 4: return "bg-[var(--cyan)]";
    default: return "bg-[var(--bg3)]";
  }
};

export function BeyondTerminal() {
  return (
    <section id="beyond" className="py-16 px-6 md:px-10 lg:px-14 bg-[var(--bg)]">
      <RevealWrapper>
        <div className="max-w-3xl">
          {/* Section Header */}
          <div className="section-header mb-8">
            <span className="section-number text-sm">07.</span>
            <h2 className="section-title text-xl">Beyond the Terminal</h2>
            <div className="section-line" />
          </div>

          {/* Contribution Graph */}
          <motion.div
            className="card mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Git command header */}
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-sm text-[var(--text2)]">
                <span className="text-[var(--cyan)]">$</span> git log --oneline | head -365
              </span>
              <span className="font-mono text-sm text-[var(--text3)]">
                210 contributions
              </span>
            </div>

            {/* Contribution Grid */}
            <div className="overflow-x-auto pb-2">
              <div className="flex gap-1 min-w-fit">
                {contributionData.map((week, weekIndex) => (
                  <div key={weekIndex} className="flex flex-col gap-1">
                    {week.map((day, dayIndex) => (
                      <motion.div
                        key={`${weekIndex}-${dayIndex}`}
                        className={`w-2.5 h-2.5 rounded-sm ${getContributionColor(day)}`}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: weekIndex * 0.01 + dayIndex * 0.005 }}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-end gap-2 mt-4">
              <span className="text-xs text-[var(--text3)]">Less</span>
              <div className="flex gap-1">
                {[0, 1, 2, 3, 4].map((level) => (
                  <div
                    key={level}
                    className={`w-2.5 h-2.5 rounded-sm ${getContributionColor(level)}`}
                  />
                ))}
              </div>
              <span className="text-xs text-[var(--text3)]">More</span>
            </div>
          </motion.div>

          {/* Tools/Stack Badges */}
          <div className="flex flex-wrap gap-3 mb-8">
            {tools.map((tool, index) => (
              <motion.div
                key={tool.name}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border)] bg-[var(--bg2)] hover:border-[var(--cyan)] transition-colors"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <span className="text-[var(--cyan)]">{tool.icon}</span>
                <span className="text-sm text-[var(--text)]">{tool.name}</span>
                <span className="text-xs text-[var(--text3)]">({tool.note})</span>
              </motion.div>
            ))}
          </div>

          {/* Hobby Cards */}
          <div className="grid md:grid-cols-3 gap-4">
            {hobbies.map((hobby, index) => (
              <motion.div
                key={hobby.title}
                className="card group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Icon */}
                <div className="card-icon group-hover:scale-110 transition-transform">
                  {hobby.icon}
                </div>

                {/* Title */}
                <h3 className="text-base font-semibold text-[var(--text)] mb-2 group-hover:text-[var(--cyan)] transition-colors">
                  {hobby.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-[var(--text2)] leading-relaxed mb-4">
                  {hobby.description}
                </p>

                {/* Code snippet */}
                <div className="font-mono text-xs text-[var(--cyan)] bg-[var(--bg3)] px-3 py-2 rounded-md">
                  {hobby.code}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </RevealWrapper>
    </section>
  );
}
