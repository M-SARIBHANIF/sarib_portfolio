"use client";

import { motion } from "framer-motion";
import { RevealWrapper } from "./RevealWrapper";

const educationData = {
  degree: "Bachelor's of Science in Computer Sciences",
  university: "Air University, Islamabad",
  period: "SEP 2020 — JUNE 2024",
  url: "https://au.edu.pk",
  achievements: [
    "As my final year project, I worked on a Satellite Imagery Poverty Assessment System using Deep Learning, achieving 85% accuracy in poverty prediction.",
    "Part of Microsoft Learn Student Ambassador Program, where I organized workshops and events to promote Microsoft technologies among students.",
    "Part of the core team (Think Tank) of the first-ever coding bootcamp at Air University, Code Air 1.0.",
    "Ambassador for the NaSCon arranged in NUCES FAST, registering 85+ students from Air University.",
  ],
  courses: [
    "OOP",
    "DSA",
    "Databases",
    "Operating Systems",
    "Computer Networks",
    "Artificial Intelligence",
    "Data Science",
    "Data Encryption",
    "Information Security",
    "Parallel and Distributed Computing",
    "Compiler Construction",
  ],
};

// Check icon component
const CheckIcon = () => (
  <svg className="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 12l2 2 4-4" />
    <circle cx="12" cy="12" r="10" />
  </svg>
);

export function Education() {
  return (
    <section id="education" className="py-16 px-6 md:px-10 lg:px-14 bg-[var(--bg)]">
      <RevealWrapper>
        <div className="max-w-3xl">
          {/* Section Header */}
          <div className="section-header mb-8">
            <span className="section-number text-sm">04.</span>
            <h2 className="section-title text-xl">Education</h2>
            <div className="section-line" />
          </div>

          {/* Education Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Hover Lightup Container 
              Uses negative margin (-mx-6) and padding (p-6) so the text aligns with the rest of the page,
              but the hover effect bleeds outside perfectly.
            */}
            <div className="group relative p-6 -mx-6 rounded-2xl transition-all duration-500 hover:bg-[var(--bg2)] border border-transparent hover:border-[var(--border)] overflow-hidden">
              
              {/* Background Glows (Fades in on hover) */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                {/* Top right amber glow */}
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-[var(--accent)] rounded-full blur-[120px] opacity-10" />
                {/* Bottom left subtle glow */}
                <div className="absolute top-1/2 -left-24 w-64 h-64 bg-[var(--accent)] rounded-full blur-[100px] opacity-[0.05]" />
              </div>

              <div className="relative z-10 grid md:grid-cols-[200px_1fr] gap-6">
                {/* Left: Period */}
                <div>
                  <span className="text-xs font-mono text-[var(--text3)] tracking-wider group-hover:text-[var(--accent)] transition-colors duration-300">
                    {educationData.period}
                  </span>
                </div>

                {/* Right: Details */}
                <div>
                  {/* University Icon and Info */}
                  <div className="flex items-start gap-4 mb-6">
                    {/* University Logo/Icon */}
                    <div className="w-12 h-12 rounded-lg bg-[var(--cyan-dim)] border border-[var(--cyan)] flex items-center justify-center flex-shrink-0 group-hover:shadow-[0_0_20px_var(--accent-glow)] transition-shadow duration-300">
                      <svg className="w-6 h-6 text-[var(--cyan)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                        <path d="M12 14l-9-5v7c0 2.21 3.582 4 8 4h2c4.418 0 8-1.79 8-4v-7l-9 5z" />
                      </svg>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-[var(--text)] mb-1">
                        {educationData.degree} .{" "}
                        <a
                          href={educationData.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[var(--cyan)] hover:underline inline-flex items-center gap-1"
                        >
                          {educationData.university}
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      </h3>
                    </div>
                  </div>

                  {/* Achievements with checkmarks */}
                  <ul className="space-y-4 mb-8">
                    {educationData.achievements.map((item, i) => (
                      <motion.li
                        key={i}
                        className="flex items-start gap-3 text-sm text-[var(--text2)] group-hover:text-[var(--text)] transition-colors duration-300"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <CheckIcon />
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* Course Tags */}
                  <div className="flex flex-wrap gap-2">
                    {educationData.courses.map((course, index) => (
                      <motion.span
                        key={course}
                        className="tech-badge"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.03 }}
                      >
                        {course}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </RevealWrapper>
    </section>
  );
}