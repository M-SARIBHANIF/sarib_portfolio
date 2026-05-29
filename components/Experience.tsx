"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { RevealWrapper } from "./RevealWrapper";

const experiences = [
  {
    company: "CYMAX TECH",
    role: "Full Stack Developer",
    period: "OCT 2024 — PRESENT",
    startDate: new Date("2024-10-01"),
    current: true,
    url: "https://cymaxtech.com/",
    color: "#d4a855",
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
    color: "#6b8afd",
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
    color: "#4ade80",
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
    <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-[var(--green)] bg-[var(--green-dim)] px-2 py-1 rounded-full border border-[var(--green)]">
      <span className="w-1.5 h-1.5 rounded-full bg-[var(--green)] animate-pulse" />
      {tenure}
    </span>
  );
}

// Custom SVG Icons for each company
const CymaxIcon = ({ color }: { color: string }) => (
  <svg viewBox="0 0 32 32" className="w-full h-full">
    {/* Tech grid pattern representing digital solutions */}
    <rect x="4" y="4" width="6" height="6" rx="1" fill={color} opacity="0.9" />
    <rect x="13" y="4" width="6" height="6" rx="1" fill={color} opacity="0.7" />
    <rect x="22" y="4" width="6" height="6" rx="1" fill={color} opacity="0.5" />
    <rect x="4" y="13" width="6" height="6" rx="1" fill={color} opacity="0.7" />
    <rect x="13" y="13" width="6" height="6" rx="1" fill={color} />
    <rect x="22" y="13" width="6" height="6" rx="1" fill={color} opacity="0.7" />
    <rect x="4" y="22" width="6" height="6" rx="1" fill={color} opacity="0.5" />
    <rect x="13" y="22" width="6" height="6" rx="1" fill={color} opacity="0.7" />
    <rect x="22" y="22" width="6" height="6" rx="1" fill={color} opacity="0.9" />
  </svg>
);

const HorizonIcon = ({ color }: { color: string }) => (
  <svg viewBox="0 0 32 32" className="w-full h-full">
    {/* Abstract horizon/sunrise representing tech services */}
    <path
      d="M4 20 Q16 8, 28 20"
      stroke={color}
      strokeWidth="2.5"
      fill="none"
      strokeLinecap="round"
    />
    <line x1="4" y1="24" x2="28" y2="24" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <circle cx="16" cy="14" r="3" fill={color} opacity="0.8" />
    <line x1="16" y1="8" x2="16" y2="10" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <line x1="10" y1="10" x2="11.5" y2="11.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <line x1="22" y1="10" x2="20.5" y2="11.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const LCCIcon = ({ color }: { color: string }) => (
  <svg viewBox="0 0 32 32" className="w-full h-full">
    {/* Network/connection nodes representing communication */}
    <circle cx="8" cy="8" r="3" fill={color} />
    <circle cx="24" cy="8" r="3" fill={color} opacity="0.8" />
    <circle cx="16" cy="16" r="4" fill={color} />
    <circle cx="8" cy="24" r="3" fill={color} opacity="0.8" />
    <circle cx="24" cy="24" r="3" fill={color} />
    {/* Connection lines */}
    <line x1="10" y1="9" x2="14" y2="14" stroke={color} strokeWidth="1.5" opacity="0.6" />
    <line x1="22" y1="9" x2="18" y2="14" stroke={color} strokeWidth="1.5" opacity="0.6" />
    <line x1="10" y1="23" x2="14" y2="18" stroke={color} strokeWidth="1.5" opacity="0.6" />
    <line x1="22" y1="23" x2="18" y2="18" stroke={color} strokeWidth="1.5" opacity="0.6" />
  </svg>
);

const companyIcons: Record<string, React.FC<{ color: string }>> = {
  "CYMAX TECH": CymaxIcon,
  "Horizon Tech Services": HorizonIcon,
  "LCC Pakistan": LCCIcon,
};

// Check icon component
const CheckIcon = ({ color }: { color: string }) => (
  <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5" opacity="0.3" />
    <path d="M9 12l2 2 4-4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Experience Card with active section glow
function ExperienceCard({ exp, index }: { exp: typeof experiences[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-40% 0px -40% 0px" });
  const IconComponent = companyIcons[exp.company];

  return (
    <motion.div
      ref={ref}
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      {/* Active section glow background */}
      <motion.div
        className="absolute -inset-4 rounded-xl pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, ${exp.color}08 0%, transparent 70%)`,
          border: `1px solid ${isInView ? exp.color + '20' : 'transparent'}`,
        }}
        animate={{
          opacity: isInView ? 1 : 0,
          scale: isInView ? 1 : 0.98,
        }}
        transition={{ duration: 0.3 }}
      />

      <div className="relative grid md:grid-cols-[140px_1fr] gap-4">
        {/* Left: Period */}
        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] font-mono text-[var(--text3)] tracking-wider">
            {exp.period}
          </span>
          {exp.current && exp.startDate && (
            <TenureCalculator startDate={exp.startDate} />
          )}
        </div>

        {/* Right: Details */}
        <div>
          {/* Company and Role with Icon */}
          <div className="mb-3 flex items-start gap-3">
            <div 
              className="w-9 h-9 rounded-lg flex items-center justify-center p-1.5 flex-shrink-0"
              style={{ 
                backgroundColor: exp.color + '15',
                border: `1px solid ${exp.color}30`
              }}
            >
              {IconComponent && <IconComponent color={exp.color} />}
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[var(--text)] flex items-center gap-1.5 flex-wrap">
                <span>{exp.role}</span>
                <span className="text-[var(--text3)]">@</span>
                <a 
                  href={exp.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 transition-colors"
                  style={{ color: exp.color }}
                >
                  {exp.company}
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </h3>
            </div>
          </div>

          {/* Description with checkmarks */}
          <ul className="space-y-2 mb-4 ml-12">
            {exp.description.map((item, i) => (
              <motion.li
                key={i}
                className="flex items-start gap-2 text-xs text-[var(--text2)] leading-relaxed"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + i * 0.05 }}
              >
                <CheckIcon color={exp.color} />
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>

          {/* Technologies */}
          <div className="flex flex-wrap gap-1.5 ml-12">
            {exp.technologies.map((tech) => (
              <span 
                key={tech} 
                className="text-[10px] font-mono px-2 py-0.5 rounded border transition-colors"
                style={{
                  color: exp.color,
                  borderColor: exp.color + '30',
                  backgroundColor: exp.color + '08',
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Experience() {
  return (
    <section id="experience" className="py-16 px-6 md:px-10 lg:px-14 bg-[var(--bg)]">
      <RevealWrapper>
        <div className="max-w-3xl">
          {/* Section Header */}
          <div className="section-header mb-8">
            <span className="section-number text-sm">03.</span>
            <h2 className="section-title text-xl">Experience</h2>
            <div className="section-line" />
          </div>

          {/* Experience Items */}
          <div className="space-y-10">
            {experiences.map((exp, index) => (
              <ExperienceCard key={exp.company} exp={exp} index={index} />
            ))}
          </div>
        </div>
      </RevealWrapper>
    </section>
  );
}
