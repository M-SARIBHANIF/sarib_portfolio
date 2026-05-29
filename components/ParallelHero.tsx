"use client";

import { useState, useEffect } from "react";

const roles = [
  "Full Stack Developer",
  "Problem Solver",
  "Code Craftsman",
  "Tech Enthusiast",
];

export function ParallelHero() {
  const [roleText, setRoleText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const role = roles[roleIndex];
    const speed = isDeleting ? 50 : 100;

    const timer = setTimeout(() => {
      if (!isDeleting && charIndex < role.length) {
        setRoleText(role.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      } else if (isDeleting && charIndex > 0) {
        setRoleText(role.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else if (!isDeleting && charIndex === role.length) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setRoleIndex((roleIndex + 1) % roles.length);
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, roleIndex]);

  return (
    <div className="h-full flex flex-col justify-between py-16 px-12 border-r border-[var(--border)]">
      {/* Top Section */}
      <div className="flex flex-col">
        {/* Code comment header */}
        <p className="font-mono text-xs text-[var(--text-muted)] mb-8 tracking-wider opacity-70">
          <span className="text-[var(--cyan)]">&gt;_</span> /sarib _
        </p>

        {/* Name */}
        <h1 className="text-5xl font-bold text-[var(--text)] leading-tight mb-4">
          Muhammad<br />
          Sarib Hanif
        </h1>

        {/* Role with blinking cursor */}
        <div className="font-mono text-sm text-[var(--cyan)] mb-6 h-6 flex items-center border-b border-[var(--cyan)] pb-1 w-fit">
          {roleText}
          <span className="inline-block w-px h-4 bg-[var(--cyan)] ml-0.5 animate-pulse" />
        </div>

        {/* Description */}
        <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-4 max-w-sm opacity-80">
          Building scalable apps and efficient APIs. Clean code, real systems.
        </p>

        {/* Comment */}
        <p className="font-mono text-xs text-[var(--text-muted)] mb-10 opacity-50">
          // available for hire
        </p>

        {/* CTA Button */}
        <a
          href="#contact"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--cyan)] text-[var(--bg)] rounded-lg font-mono text-sm font-semibold hover:opacity-90 transition-opacity w-fit mb-12"
        >
          Explore My Work
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </a>

        {/* Divider */}
        <div className="w-12 h-px bg-[var(--cyan)] mb-10 opacity-40" />

        {/* Social Links */}
        <div className="flex gap-6">
          <a
            href="https://github.com/M-SARIBHANIF"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-[var(--text-muted)] hover:text-[var(--cyan)] transition-colors opacity-60 hover:opacity-100"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>
          <a
            href="https://linkedin.com/in/m-sarib-hanif"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-[var(--text-muted)] hover:text-[var(--cyan)] transition-colors opacity-60 hover:opacity-100"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          <a
            href="mailto:contact@example.com"
            aria-label="Email"
            className="text-[var(--text-muted)] hover:text-[var(--cyan)] transition-colors opacity-60 hover:opacity-100"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </a>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-3">
        {[
          { id: "about", label: "ABOUT" },
          { id: "skills", label: "SKILLS" },
          { id: "experience", label: "EXPERIENCE" },
          { id: "projects", label: "PROJECTS" },
          { id: "philosophy", label: "PHILOSOPHY" },
          { id: "contact", label: "CONTACT" },
        ].map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            className="text-xs font-mono text-[var(--text-muted)] hover:text-[var(--cyan)] hover:border-l-2 hover:border-[var(--cyan)] hover:pl-2 transition-all py-1"
          >
            {label}
          </a>
        ))}
      </nav>
    </div>
  );
}
