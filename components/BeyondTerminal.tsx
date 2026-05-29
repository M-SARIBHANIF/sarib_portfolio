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
  { name: "Arch Linux", note: "btw", icon: ">_" },
  { name: "Neovim + VS Code", note: "hybrid", icon: "⚙" },
  { name: "Alacritty", note: "fast", icon: "◇" },
];

const hobbies = [
  {
    title: "Coffee",
    description: "V60 pour-over enthusiast. Flow Coffee Shop is my go-to. Night sessions are fueled by carefully brewed cups.",
    code: "brew('v60', { grind: 'medium-fine' })",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
        <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z" />
      </svg>
    ),
  },
  {
    title: "Gaming",
    description: "Hardcore Soulsborne fan. Started with Demon's Souls PS5 remake. I appreciate games that reward patience.",
    code: "while(!victory) { tryAgain(); }",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <rect x="2" y="6" width="20" height="12" rx="2" />
        <path d="M6 12h4M8 10v4" />
        <circle cx="17" cy="10" r="1" fill="currentColor" />
        <circle cx="17" cy="14" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "Building",
    description: "Currently designing a DIY robotic arm. I like projects that bridge software and hardware.",
    code: "import { servo, sensor } from 'robotics';",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
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
    <section id="beyond" className="py-24 px-8 md:px-12 lg:px-16 bg-[var(--bg)]">
      <RevealWrapper>
        <div className="max-w-4xl">
          {/* Section Header */}
          <div className="section-header">
            <span className="section-number">07.</span>
            <h2 className="section-title">Beyond the Terminal</h2>
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
