"use client";

import { motion } from "framer-motion";
import { RevealWrapper } from "./RevealWrapper";

const skillsData = {
  "// Languages": [
    { name: "Python", level: 95 },
    { name: "Java", level: 75 },
    { name: "C#", level: 70 },
    { name: "JavaScript", level: 75 },
  ],
  "// Testing": [
    { name: "Playwright", level: 90 },
    { name: "API Testing (REST)", level: 90 },
    { name: "Pytest", level: 85 },
    { name: "Selenium", level: 75 },
  ],
  "// Tools": [
    { name: "Git", level: 95 },
    { name: "Linux", level: 95 },
    { name: "Docker", level: 85 },
    { name: "CI/CD", level: 85 },
  ],
  "// Frameworks": [
    { name: "FastAPI", level: 85 },
    { name: "Next.js", level: 75 },
    { name: "React", level: 70 },
    { name: "Node.js", level: 70 },
  ],
};

export function Skills() {
  return (
    <section id="skills" className="py-20 px-8 md:px-12 bg-[var(--bg)]">
      <RevealWrapper>
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="mb-16 flex items-baseline gap-4">
            <span className="text-[var(--cyan)] font-mono text-lg font-bold">02.</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text)]">
              Skills & Tech Stack
            </h2>
          </div>

          {/* Skills Grid - 2 columns */}
          <div className="grid md:grid-cols-2 gap-12">
            {Object.entries(skillsData).map(([category, skills], categoryIdx) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: categoryIdx * 0.1 }}
              >
                {/* Category Label */}
                <h3 className="text-sm font-mono text-[var(--cyan)] mb-6 opacity-70">
                  {category}
                </h3>

                {/* Skills List */}
                <div className="space-y-4">
                  {skills.map((skill, idx) => (
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
                        <span className="text-xs font-mono text-[var(--text-muted)] opacity-60">
                          {skill.level}%
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="relative h-1.5 bg-[var(--bg3)] rounded-full overflow-hidden border border-[var(--border)]">
                        <motion.div
                          className="h-full bg-gradient-to-r from-[var(--cyan)] to-[var(--blue)] rounded-full"
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
