"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { RevealWrapper } from "./RevealWrapper";
import Image from "next/image";

const experiences = [
  {
    company: "CYMAX TECH",
    role: "Full Stack Developer",
    period: "OCT 2024 — PRESENT",
    startDate: new Date("2024-10-01"),
    current: true,
    url: "https://cymaxtech.com/",
    icon: "/icons/cymax.svg",
    iconType: "svg",
    color: "accent",
    description: [
      "Led development of enterprise-grade web applications using React and Node.js",
      "Implemented microservices architecture improving system scalability by 40%",
      "Established CI/CD pipelines reducing deployment time by 60%",
      "Mentored junior developers on best practices and code review standards",
    ],
    technologies: ["React", "Node.js", "Docker", "PostgreSQL", "AWS"],
  },
  {
    company: "Horizon Tech Services",
    role: "Backend Developer",
    period: "AUG 2024 — SEP 2024",
    current: false,
    url: "https://www.horizon.com.pk/",
    icon: "/icons/horizon.png",
    iconType: "image",
    color: "blue",
    description: [
      "Developed RESTful APIs for client applications using FastAPI",
      "Optimized database queries improving response times by 75%",
      "Implemented authentication and authorization systems",
    ],
    technologies: ["FastAPI", "Python", "MongoDB", "Redis"],
  },
  {
    company: "LCC Pakistan",
    role: "Junior Developer",
    period: "JUN 2023 — SEP 2023",
    current: false,
    url: "https://talkpool.com/",
    icon: "/icons/lcc-pakistan.svg",
    iconType: "svg",
    color: "green",
    description: [
      "Built responsive web interfaces using React and Tailwind CSS",
      "Collaborated with cross-functional teams on project delivery",
      "Participated in agile development processes and sprint planning",
    ],
    technologies: ["React", "JavaScript", "Tailwind CSS", "Git"],
  },
];

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
    <span className="inline-flex items-center gap-2 text-xs font-mono text-[var(--green)] bg-[var(--green-dim)] px-3 py-1.5 rounded-full border border-[var(--green)]">
      <span className="w-2 h-2 rounded-full bg-[var(--green)] animate-pulse" />
      {tenure} and counting
    </span>
  );
}

// Check icon component
const CheckIcon = () => (
  <svg className="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 12l2 2 4-4" />
    <circle cx="12" cy="12" r="10" />
  </svg>
);

// Company Icon Component
function CompanyIcon({ icon, iconType, company }: { icon: string; iconType: string; company: string }) {
  return (
    <div className="w-12 h-12 rounded-lg bg-[var(--bg3)] border border-[var(--border)] flex items-center justify-content overflow-hidden p-1.5">
      {iconType === "svg" ? (
        <Image
          src={icon}
          alt={`${company} logo`}
          width={40}
          height={40}
          className="w-full h-full object-contain"
        />
      ) : (
        <Image
          src={icon}
          alt={`${company} logo`}
          width={40}
          height={40}
          className="w-full h-full object-contain rounded"
        />
      )}
    </div>
  );
}

export function Experience() {
  return (
    <section id="experience" className="py-24 px-8 md:px-12 lg:px-16 bg-[var(--bg)]">
      <RevealWrapper>
        <div className="max-w-4xl">
          {/* Section Header */}
          <div className="section-header">
            <span className="section-number">03.</span>
            <h2 className="section-title">Experience</h2>
            <div className="section-line" />
          </div>

          {/* Experience Items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.company}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="grid md:grid-cols-[200px_1fr] gap-6">
                  {/* Left: Period */}
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-mono text-[var(--text3)] tracking-wider">
                      {exp.period}
                    </span>
                    {exp.current && exp.startDate && (
                      <TenureCalculator startDate={exp.startDate} />
                    )}
                  </div>

                  {/* Right: Details */}
                  <div>
                    {/* Company and Role with Icon */}
                    <div className="mb-4 flex items-start gap-4">
                      <CompanyIcon icon={exp.icon} iconType={exp.iconType} company={exp.company} />
                      <div>
                        <h3 className="text-lg font-semibold text-[var(--text)] flex items-center gap-2 flex-wrap">
                          <span>{exp.role}</span>
                          <span className="text-[var(--text3)]">@</span>
                          <a 
                            href={exp.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-[var(--accent)] hover:underline inline-flex items-center gap-1"
                          >
                            {exp.company}
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        </h3>
                      </div>
                    </div>

                    {/* Description with checkmarks */}
                    <ul className="space-y-3 mb-6 ml-16">
                      {exp.description.map((item, i) => (
                        <motion.li
                          key={i}
                          className="flex items-start gap-3 text-sm text-[var(--text2)]"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 + i * 0.05 }}
                        >
                          <CheckIcon />
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </ul>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 ml-16">
                      {exp.technologies.map((tech) => (
                        <span key={tech} className="tech-badge">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </RevealWrapper>
    </section>
  );
}
