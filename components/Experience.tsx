"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { RevealWrapper } from "./RevealWrapper";

const experiences = [
  {
    company: "CYMAX TECH",
    role: "Full Stack Developer",
    period: "Oct 2024 - Present",
    startDate: new Date("2024-10-01"),
    current: true,
    color: "green",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    description: [
      "Led development of enterprise-grade web applications using React and Node.js",
      "Implemented microservices architecture improving system scalability by 40%",
      "Established CI/CD pipelines reducing deployment time by 60%",
      "Mentored junior developers on best practices and code review standards",
    ],
    technologies: ["React", "Node.js", "Docker", "PostgreSQL", "AWS"],
    achievements: [
      { metric: "40%", label: "Scalability Increase" },
      { metric: "60%", label: "Faster Deployments" },
    ],
  },
  {
    company: "Horizon Tech Services",
    role: "Backend Developer",
    period: "Aug 2024 - Sep 2024",
    current: false,
    color: "purple",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <rect x="2" y="2" width="20" height="8" rx="2" />
        <rect x="2" y="14" width="20" height="8" rx="2" />
        <circle cx="6" cy="6" r="1" fill="currentColor" />
        <circle cx="6" cy="18" r="1" fill="currentColor" />
      </svg>
    ),
    description: [
      "Developed RESTful APIs for client applications using FastAPI",
      "Optimized database queries improving response times by 75%",
      "Implemented authentication and authorization systems",
    ],
    technologies: ["FastAPI", "Python", "MongoDB", "Redis"],
    achievements: [
      { metric: "75%", label: "Faster Queries" },
    ],
  },
  {
    company: "LCC Pakistan",
    role: "Junior Developer",
    period: "Jun 2023 - Sep 2023",
    current: false,
    color: "blue",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
    description: [
      "Built responsive web interfaces using React and Tailwind CSS",
      "Collaborated with cross-functional teams on project delivery",
      "Participated in agile development processes and sprint planning",
    ],
    technologies: ["React", "JavaScript", "Tailwind CSS", "Git"],
    achievements: [],
  },
];

const getColorClasses = (color: string) => {
  const colors: Record<string, { bg: string; text: string; glow: string; border: string; dim: string }> = {
    blue: { bg: "bg-[var(--blue)]", text: "text-[var(--blue)]", glow: "glow-blue", border: "border-[var(--blue)]", dim: "bg-[var(--blue-dim)]" },
    green: { bg: "bg-[var(--green)]", text: "text-[var(--green)]", glow: "glow-green", border: "border-[var(--green)]", dim: "bg-[var(--green-dim)]" },
    purple: { bg: "bg-[var(--purple)]", text: "text-[var(--purple)]", glow: "glow-purple", border: "border-[var(--purple)]", dim: "bg-[var(--purple-dim)]" },
    cyan: { bg: "bg-[var(--cyan)]", text: "text-[var(--cyan)]", glow: "glow-cyan", border: "border-[var(--cyan)]", dim: "bg-[var(--cyan-dim)]" },
    amber: { bg: "bg-[var(--amber)]", text: "text-[var(--amber)]", glow: "glow-amber", border: "border-[var(--amber)]", dim: "bg-[var(--amber-dim)]" },
    pink: { bg: "bg-[var(--pink)]", text: "text-[var(--pink)]", glow: "glow-pink", border: "border-[var(--pink)]", dim: "bg-[var(--pink-dim)]" },
  };
  return colors[color] || colors.blue;
};

function TenureCalculator({ startDate }: { startDate: Date }) {
  const [tenure, setTenure] = useState("");

  useEffect(() => {
    const calculate = () => {
      const now = new Date();
      const years = now.getFullYear() - startDate.getFullYear();
      const months = now.getMonth() - startDate.getMonth();
      const totalMonths = years * 12 + months;

      if (totalMonths >= 12) {
        const y = Math.floor(totalMonths / 12);
        const m = totalMonths % 12;
        setTenure(`${y}y ${m}m`);
      } else {
        setTenure(`${totalMonths}m`);
      }
    };

    calculate();
    const interval = setInterval(calculate, 60000);
    return () => clearInterval(interval);
  }, [startDate]);

  return (
    <motion.span 
      className="text-xs font-mono text-[var(--green)] bg-[var(--green-dim)] px-3 py-1.5 rounded-full flex items-center gap-2"
      animate={{ boxShadow: ["0 0 10px var(--green-glow)", "0 0 20px var(--green-glow)", "0 0 10px var(--green-glow)"] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <span className="w-2 h-2 rounded-full bg-[var(--green)] animate-pulse" />
      {tenure} and counting
    </motion.span>
  );
}

export function Experience() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="experience" className="py-20 px-8 md:px-12 bg-[var(--bg)] relative overflow-hidden">
      <RevealWrapper>
        <div className="max-w-6xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="mb-16 flex items-baseline gap-4">
            <span className="text-[var(--cyan)] font-mono text-lg font-bold">03.</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text)]">
              Experience
            </h2>
          </div>

          {/* Experience Items */}
          <div className="space-y-6">
              {experiences.map((exp, index) => {
                const isHovered = hoveredIndex === index;
                
                return (
                  <motion.div
                    key={exp.company}
                    className="relative"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    onHoverStart={() => setHoveredIndex(index)}
                    onHoverEnd={() => setHoveredIndex(null)}
                  >
                    {/* Card */}
                    <div className="p-6 rounded-lg border border-[var(--border)] bg-[var(--bg3)] transition-all duration-300 hover:border-[var(--cyan)]">
                      {/* Period */}
                      <div className="text-xs font-mono text-[var(--text-muted)] mb-3 opacity-70">
                        {exp.period}
                      </div>

                      {/* Header */}
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-[var(--text)] mb-1 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[var(--cyan)]" />
                            {exp.company}
                          </h3>
                          <p className="text-sm text-[var(--text-muted)]">
                            {exp.role}
                          </p>
                        </div>
                      </div>

                      {/* Description with checkmarks */}
                      <ul className="space-y-2 mb-4">
                        {exp.description.map((item, i) => (
                          <motion.li
                            key={i}
                            className="text-sm text-[var(--text-muted)] flex items-start gap-3"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 + i * 0.05 }}
                          >
                            <svg className="w-4 h-4 text-[var(--cyan)] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                            </svg>
                            {item}
                          </motion.li>
                        ))}
                      </ul>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="text-xs font-mono px-2.5 py-1 rounded border border-[var(--border)] text-[var(--text-muted)]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
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
