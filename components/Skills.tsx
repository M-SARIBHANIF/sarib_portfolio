"use client";

import { motion } from "framer-motion";
import { RevealWrapper } from "./RevealWrapper";

const skillsData = [
  {
    category: "Languages",
    skills: [
      { name: "Python", level: 90 },
      { name: "Java", level: 75 },
      { name: "C#", level: 70 },
      { name: "JavaScript", level: 75 },
    ],
  },
  {
    category: "Testing",
    skills: [
      { name: "Playwright", level: 90 },
      { name: "API Testing (REST)", level: 90 },
      { name: "Pytest", level: 85 },
      { name: "Selenium", level: 75 },
    ],
  },
  {
    category: "Tools",
    skills: [
      { name: "Git", level: 90 },
      { name: "Linux", level: 90 },
      { name: "Docker", level: 85 },
      { name: "CI/CD", level: 80 },
    ],
  },
  {
    category: "Frameworks",
    skills: [
      { name: "FastAPI", level: 85 },
      { name: "Next.js", level: 75 },
      { name: "React", level: 70 },
      { name: "Node.js", level: 70 },
    ],
  },
];

export function Skills() {
  return (
    <section id="skills" className="py-24 px-8 md:px-12 lg:px-16 bg-[var(--bg)]">
      <RevealWrapper>
        <div className="max-w-4xl">
          {/* Section Header */}
          <div className="section-header">
            <span className="section-number">02.</span>
            <h2 className="section-title">Skills & Tech Stack</h2>
            <div className="section-line" />
          </div>

          {/* Skills Grid - 2x2 */}
          <div className="grid md:grid-cols-2 gap-8">
            {skillsData.map((categoryData, categoryIdx) => (
              <motion.div
                key={categoryData.category}
                className="card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: categoryIdx * 0.1 }}
              >
                {/* Category Header */}
                <h3 className="font-mono text-sm text-[var(--cyan)] mb-6">
                  // {categoryData.category}
                </h3>

                {/* Skills List */}
                <div className="space-y-5">
                  {categoryData.skills.map((skill, idx) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: categoryIdx * 0.1 + idx * 0.05 }}
                    >
                      {/* Skill Name and Level */}
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-[var(--text)]">
                          {skill.name}
                        </span>
                        <span className="text-xs font-mono text-[var(--text3)]">
                          {skill.level}%
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="progress-bar-container">
                        <motion.div
                          className="progress-bar-fill"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ delay: categoryIdx * 0.1 + idx * 0.05 + 0.2, duration: 0.8 }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </RevealWrapper>
    </section>
  );
}
