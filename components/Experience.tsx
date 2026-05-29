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
    <section id="experience" className="py-32 pl-[calc(56px+2rem)] pr-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-[var(--blue)] opacity-[0.02] rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-[var(--purple)] opacity-[0.02] rounded-full blur-3xl" />
      </div>

      <RevealWrapper>
        <div className="max-w-5xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="mb-20 text-center">
            <motion.span 
              className="text-sm font-mono text-[var(--blue)] mb-2 block"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {"// 03"}
            </motion.span>
            <motion.h2 
              className="text-4xl md:text-6xl font-bold text-glow-purple"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Experience
            </motion.h2>
            <motion.p
              className="text-[var(--text2)] mt-4 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              My professional journey building impactful digital solutions
            </motion.p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Animated Vertical Line */}
            <motion.div 
              className="absolute left-8 md:left-12 top-0 bottom-0 w-[2px]"
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            >
              <div className="w-full h-full bg-gradient-to-b from-[var(--green)] via-[var(--purple)] to-[var(--blue)]" />
              {/* Glowing orb that travels down */}
              <motion.div
                className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white"
                style={{ boxShadow: "0 0 20px var(--blue), 0 0 40px var(--blue)" }}
                animate={{ top: ["0%", "100%"] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>

            {/* Experience Items */}
            <div className="space-y-8">
              {experiences.map((exp, index) => {
                const colors = getColorClasses(exp.color);
                const isHovered = hoveredIndex === index;
                
                return (
                  <motion.div
                    key={exp.company}
                    className="relative pl-20 md:pl-28"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2, duration: 0.5 }}
                    onHoverStart={() => setHoveredIndex(index)}
                    onHoverEnd={() => setHoveredIndex(null)}
                  >
                    {/* Timeline Node */}
                    <motion.div
                      className={`absolute left-4 md:left-8 top-8 w-8 h-8 md:w-10 md:h-10 rounded-xl ${colors.dim} flex items-center justify-center border ${colors.border} z-10`}
                      animate={isHovered || exp.current ? { 
                        boxShadow: [`0 0 10px var(--${exp.color}-glow)`, `0 0 25px var(--${exp.color}-glow)`, `0 0 10px var(--${exp.color}-glow)`]
                      } : {}}
                      transition={{ duration: 1.5, repeat: isHovered || exp.current ? Infinity : 0 }}
                    >
                      <span className={colors.text}>{exp.icon}</span>
                    </motion.div>

                    {/* Connector line */}
                    <div className={`absolute left-[3.25rem] md:left-[4.25rem] top-12 w-8 md:w-12 h-[2px] ${colors.dim}`} />

                    {/* Card */}
                    <motion.div
                      className={`relative p-6 md:p-8 rounded-2xl border transition-all duration-500 overflow-hidden ${
                        isHovered 
                          ? `border-[var(--${exp.color})] bg-[var(--bg2)]` 
                          : "border-[var(--border)] bg-[var(--bg2)]"
                      } gradient-border-glow`}
                      whileHover={{ y: -4, scale: 1.01 }}
                    >
                      {/* Background glow on hover */}
                      <motion.div
                        className={`absolute inset-0 ${colors.dim} opacity-0`}
                        animate={{ opacity: isHovered ? 0.3 : 0 }}
                        transition={{ duration: 0.3 }}
                      />
                      
                      {/* Card pattern */}
                      <div className="absolute inset-0 opacity-5">
                        <svg className="w-full h-full" viewBox="0 0 100 100">
                          <defs>
                            <pattern id={`dots-${index}`} x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                              <circle cx="2" cy="2" r="1" fill="currentColor" />
                            </pattern>
                          </defs>
                          <rect width="100%" height="100%" fill={`url(#dots-${index})`} />
                        </svg>
                      </div>

                      <div className="relative z-10">
                        {/* Header */}
                        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                          <div>
                            <motion.h3 
                              className={`text-xl md:text-2xl font-bold transition-colors ${isHovered ? colors.text : "text-[var(--text)]"}`}
                              style={isHovered ? { textShadow: `0 0 20px var(--${exp.color}-glow)` } : {}}
                            >
                              {exp.company}
                            </motion.h3>
                            <p className="text-[var(--text2)] mt-1 flex items-center gap-2">
                              <span className={`w-2 h-2 rounded-full ${colors.bg}`} />
                              {exp.role}
                            </p>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <span className="text-sm font-mono text-[var(--text3)] bg-[var(--bg3)] px-3 py-1 rounded-lg">
                              {exp.period}
                            </span>
                            {exp.current && exp.startDate && (
                              <TenureCalculator startDate={exp.startDate} />
                            )}
                          </div>
                        </div>

                        {/* Achievements */}
                        {exp.achievements.length > 0 && (
                          <div className="flex flex-wrap gap-3 mb-6">
                            {exp.achievements.map((achievement, i) => (
                              <motion.div
                                key={i}
                                className={`px-4 py-2 rounded-xl ${colors.dim} border ${colors.border}`}
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 + i * 0.1 }}
                              >
                                <span className={`text-xl font-bold ${colors.text} block`}>{achievement.metric}</span>
                                <span className="text-xs text-[var(--text3)]">{achievement.label}</span>
                              </motion.div>
                            ))}
                          </div>
                        )}

                        {/* Description */}
                        <ul className="space-y-3 mb-6">
                          {exp.description.map((item, i) => (
                            <motion.li
                              key={i}
                              className="text-[var(--text2)] text-sm flex items-start gap-3"
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.1 * i }}
                            >
                              <span className={`${colors.text} mt-1 flex-shrink-0`}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-4 h-4">
                                  <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                              </span>
                              {item}
                            </motion.li>
                          ))}
                        </ul>

                        {/* Technologies */}
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech, i) => (
                            <motion.span
                              key={tech}
                              className={`text-xs font-mono px-3 py-1.5 rounded-lg transition-all ${
                                isHovered 
                                  ? `${colors.dim} ${colors.text} ${colors.border} border` 
                                  : "bg-[var(--bg3)] text-[var(--text2)]"
                              }`}
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.05 * i }}
                              whileHover={{ scale: 1.1, y: -2 }}
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </RevealWrapper>
    </section>
  );
}
