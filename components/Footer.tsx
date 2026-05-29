"use client";

import { motion } from "framer-motion";

const techStack = ["Next.js", "React", "TypeScript", "Tailwind", "Framer Motion"];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.footer
      className="py-8 pl-[calc(56px+2rem)] pr-8 border-t border-[var(--border)] bg-[var(--bg2)]"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left - Git Commit */}
          <div className="flex items-center gap-2 text-sm font-mono text-[var(--text3)]">
            <span className="text-green">main</span>
            <span className="text-[var(--text3)]">→</span>
            <span className="text-purple">a7f3c92</span>
            <span className="text-[var(--text2)]">
              feat: launched portfolio v2.0
            </span>
            <span className="text-[var(--text3)]">· just now</span>
          </div>

          {/* Middle - Tech Stack */}
          <div className="flex items-center gap-4">
            {techStack.map((tech, index) => (
              <span
                key={tech}
                className="text-xs text-[var(--text3)] hover:text-blue transition-colors"
              >
                {tech}
                {index < techStack.length - 1 && (
                  <span className="ml-4 text-[var(--border)]">·</span>
                )}
              </span>
            ))}
          </div>

          {/* Right - Scroll to Top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-sm font-mono text-[var(--text3)] hover:text-blue transition-colors"
            aria-label="Scroll to top"
          >
            <span className="text-green">$</span>
            <span>cd ~</span>
          </button>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-[var(--border)] text-center">
          <p className="text-sm text-[var(--text3)]">
            © {new Date().getFullYear()} Muhammad Sarib Hanif. All rights reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
