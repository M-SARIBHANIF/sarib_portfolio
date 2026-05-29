"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { RevealWrapper } from "./RevealWrapper";
import { TechTicker } from "./TechTicker";

const stats = [
  { label: "Years Experience", value: 3, suffix: "+", color: "blue", icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )},
  { label: "API Efficiency", value: 75, suffix: "% +", color: "green", icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  )},
  { label: "Productivity Boost", value: 60, suffix: "%", color: "purple", icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  )},
  { label: "Projects Shipped", value: 10, suffix: "", color: "cyan", icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  )},
];

function CountUp({
  target,
  suffix,
  inView,
  color,
}: {
  target: number;
  suffix: string;
  inView: boolean;
  color: string;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target, inView]);

  return (
    <motion.span 
      className={`text-4xl md:text-5xl font-bold text-[var(--${color})]`}
      animate={inView ? { textShadow: [`0 0 10px var(--${color}-glow)`, `0 0 25px var(--${color}-glow)`, `0 0 10px var(--${color}-glow)`] } : {}}
      transition={{ duration: 2, repeat: Infinity }}
    >
      {count}
      {suffix}
    </motion.span>
  );
}

export function About() {
  const [inView, setInView] = useState(false);
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const highlightWords = (text: string, highlights: string[]) => {
    let result = text;
    highlights.forEach((word) => {
      result = result.replace(
        new RegExp(`(${word})`, "gi"),
        `<span class="text-[var(--blue)] font-medium" style="text-shadow: 0 0 10px var(--blue-glow)">$1</span>`
      );
    });
    return result;
  };

  return (
    <section id="about" className="py-32 pl-[calc(56px+2rem)] pr-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-20 right-20 w-64 h-64 bg-[var(--blue)] opacity-[0.03] rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.03, 0.05, 0.03] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-20 left-20 w-64 h-64 bg-[var(--purple)] opacity-[0.03] rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.05, 0.03, 0.05] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <RevealWrapper>
        <div className="max-w-6xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="mb-16 text-center md:text-left">
            <motion.span 
              className="text-sm font-mono text-[var(--blue)] mb-2 block"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {"// 01"}
            </motion.span>
            <motion.h2 
              className="text-4xl md:text-6xl font-bold"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              style={{ textShadow: "0 0 30px var(--blue-glow)" }}
            >
              About Me
            </motion.h2>
          </div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-2 gap-16 mb-16">
            {/* Left - Prose */}
            <div className="space-y-6 text-lg text-[var(--text2)] leading-relaxed">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                dangerouslySetInnerHTML={{
                  __html: highlightWords(
                    "I'm a Full Stack Developer based in Islamabad, Pakistan, with over 3 years of experience building web applications and scalable backend systems.",
                    ["Full Stack Developer", "3 years"]
                  ),
                }}
              />
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                dangerouslySetInnerHTML={{
                  __html: highlightWords(
                    "My expertise spans across React, Node.js, FastAPI, and Docker. I'm passionate about writing clean, maintainable code and building systems that can scale.",
                    ["React", "Node.js", "FastAPI", "Docker"]
                  ),
                }}
              />
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                dangerouslySetInnerHTML={{
                  __html: highlightWords(
                    "When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or optimizing development workflows with DevOps practices.",
                    ["DevOps", "open-source"]
                  ),
                }}
              />
            </div>

            {/* Right - Stats Grid */}
            <div ref={ref} className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => {
                const isHovered = hoveredStat === index;
                return (
                  <motion.div
                    key={stat.label}
                    className={`relative p-6 bg-[var(--bg2)] border rounded-2xl overflow-hidden transition-all duration-300 ${
                      isHovered ? `border-[var(--${stat.color})]` : "border-[var(--border)]"
                    } gradient-border-glow`}
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    onHoverStart={() => setHoveredStat(index)}
                    onHoverEnd={() => setHoveredStat(null)}
                    whileHover={{ y: -4, scale: 1.02 }}
                  >
                    {/* Icon */}
                    <motion.div
                      className={`w-12 h-12 rounded-xl bg-[var(--${stat.color}-dim)] flex items-center justify-center mb-4 text-[var(--${stat.color})]`}
                      animate={isHovered ? { 
                        boxShadow: [`0 0 10px var(--${stat.color}-glow)`, `0 0 25px var(--${stat.color}-glow)`, `0 0 10px var(--${stat.color}-glow)`]
                      } : {}}
                      transition={{ duration: 1.5, repeat: isHovered ? Infinity : 0 }}
                    >
                      {stat.icon}
                    </motion.div>

                    <CountUp
                      target={stat.value}
                      suffix={stat.suffix}
                      inView={inView}
                      color={stat.color}
                    />
                    <p className="text-sm text-[var(--text3)] mt-2">
                      {stat.label}
                    </p>

                    {/* Background glow on hover */}
                    <motion.div
                      className={`absolute inset-0 bg-[var(--${stat.color}-dim)] opacity-0 pointer-events-none`}
                      animate={{ opacity: isHovered ? 0.2 : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Tech Ticker */}
          <TechTicker />
        </div>
      </RevealWrapper>
    </section>
  );
}
