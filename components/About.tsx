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
    <section id="about" className="py-20 px-8 md:px-12 bg-[var(--bg)] relative overflow-hidden">
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
          <div className="mb-16 flex items-baseline gap-4">
            <span className="text-[var(--cyan)] font-mono text-lg font-bold">01.</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text)]">
              About Me
            </h2>
          </div>

          {/* Content */}
          <div className="max-w-2xl mb-12">
            <div className="space-y-4 text-[var(--text-muted)]">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="leading-relaxed"
              >
                I&apos;m a Full Stack Developer based in Islamabad, Pakistan, with over 3 years of experience building web applications and scalable backend systems.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="leading-relaxed"
              >
                My expertise spans across React, Node.js, FastAPI, and Docker. I&apos;m passionate about writing clean, maintainable code and building systems that can scale.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="leading-relaxed"
              >
                When I&apos;m not coding, you&apos;ll find me exploring new technologies, contributing to open-source projects, or optimizing development workflows with DevOps practices.
              </motion.p>
            </div>
          </div>

          {/* Tech Stack Terminal Style */}
          <div className="bg-[var(--bg3)] border border-[var(--border)] rounded-lg p-6 mb-12">
            <div className="flex gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="font-mono text-sm text-[var(--text-muted)]">
              <div className="mb-2"><span className="text-[var(--cyan)]">$</span> cat interests.txt</div>
              <div className="text-[var(--text)]">automation, systems, clean code, coffee</div>
            </div>
          </div>


        </div>
      </RevealWrapper>
    </section>
  );
}
