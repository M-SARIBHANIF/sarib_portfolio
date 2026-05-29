"use client";

import { motion } from "framer-motion";
import { RevealWrapper } from "./RevealWrapper";

const skillsData = [
  {
    category: "Languages",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    color: "cyan",
    skills: [
      { name: "Python", level: 90 },
      { name: "Java", level: 75 },
      { name: "C#", level: 70 },
      { name: "JavaScript", level: 75 },
    ],
  },
  {
    category: "Testing",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: "green",
    skills: [
      { name: "Playwright", level: 90 },
      { name: "API Testing (REST)", level: 90 },
      { name: "Pytest", level: 85 },
      { name: "Selenium", level: 75 },
    ],
  },
  {
    category: "Tools",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    color: "amber",
    skills: [
      { name: "Git", level: 90 },
      { name: "Linux", level: 90 },
      { name: "Docker", level: 85 },
      { name: "CI/CD", level: 80 },
    ],
  },
  {
    category: "Frameworks",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    color: "purple",
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
                {/* Category Header with Icon */}
                <div className="flex items-center gap-3 mb-6">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ 
                      backgroundColor: `var(--${categoryData.color}-dim)`,
                      color: `var(--${categoryData.color})`,
                      border: `1px solid var(--${categoryData.color})`
                    }}
                  >
                    {categoryData.icon}
                  </div>
                  <h3 className="font-mono text-sm" style={{ color: `var(--${categoryData.color})` }}>
                    // {categoryData.category}
                  </h3>
                </div>

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
                          style={{ backgroundColor: `var(--${categoryData.color})` }}
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
