"use client";

import { motion } from "framer-motion";
import { RevealWrapper } from "./RevealWrapper";

const certifications = [
  {
    title: "Lead 360",
    issuer: "Leadership Development Program",
    year: "2024",
  },
  {
    title: "100 Days of Python",
    issuer: "Udemy",
    year: "2023",
  },
  {
    title: ".NET Core MVC",
    issuer: "Microsoft Learn",
    year: "2023",
  },
];

const courses = [
  "Data Structures & Algorithms",
  "Database Systems",
  "Software Engineering",
  "Web Development",
  "Cloud Computing",
  "Machine Learning",
];

export function Education() {
  return (
    <section
      id="education"
      className="py-32 pl-[calc(56px+2rem)] pr-8 bg-[var(--bg2)]"
    >
      <RevealWrapper>
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="mb-16">
            <span className="text-sm font-mono text-blue mb-2 block">
              {"// 06"}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold">Education</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left - University */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="p-8 bg-[var(--bg)] border border-[var(--border)] rounded-xl">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-16 h-16 rounded-xl bg-[var(--blue-dim)] flex items-center justify-center shrink-0">
                    <span className="text-2xl font-bold text-blue">AU</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Air University</h3>
                    <p className="text-[var(--text2)]">
                      B.Sc. Computer Science
                    </p>
                    <p className="text-sm text-[var(--text3)] font-mono">
                      Sep 2020 – Jul 2024
                    </p>
                  </div>
                </div>

                {/* Course Tags */}
                <div className="flex flex-wrap gap-2">
                  {courses.map((course, index) => (
                    <motion.span
                      key={course}
                      className="text-xs font-mono px-3 py-2 bg-[var(--bg2)] text-[var(--text2)] rounded-lg border border-[var(--border)]"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ y: -2 }}
                    >
                      {course}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right - Certifications */}
            <div className="space-y-4">
              <h3 className="text-lg font-mono text-[var(--text3)] mb-6">
                Certifications
              </h3>
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert.title}
                  className="p-6 bg-[var(--bg)] border border-[var(--border)] rounded-xl transition-all duration-300 hover:border-[var(--border2)] hover:-translate-y-1"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-blue">{cert.title}</h4>
                      <p className="text-sm text-[var(--text2)]">
                        {cert.issuer}
                      </p>
                    </div>
                    <span className="text-xs font-mono text-[var(--text3)] bg-[var(--bg2)] px-2 py-1 rounded">
                      {cert.year}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </RevealWrapper>
    </section>
  );
}
