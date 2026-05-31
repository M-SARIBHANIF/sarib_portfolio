"use client";

import { useState, useEffect } from "react";

const roles = [
  "Full Stack Developer",
  "API Architect",
  "DevOps Engineer",
  "Backend Specialist",
  "UI/UX Designer",
];

const navItems = [
  { id: "about", label: "ABOUT" },
  { id: "skills", label: "SKILLS" },
  { id: "experience", label: "EXPERIENCE" },
  { id: "education", label: "EDUCATION" },
  { id: "projects", label: "PROJECTS" },
  { id: "philosophy", label: "PHILOSOPHY" },
  { id: "beyond", label: "BEYOND THE TERMINAL" },
  { id: "contact", label: "CONTACT" },
];

export function ParallelHero() {
  const [roleText, setRoleText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [activeSection, setActiveSection] = useState("about");

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

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="h-full flex flex-col justify-between py-16 px-12 lg:px-16">
      {/* Top Section */}
      <div className="flex flex-col">
        {/* Terminal prompt */}
        <p className="font-mono text-xs text-[var(--text3)] mb-8 tracking-wider flex items-center gap-2">
          <span className="text-[var(--cyan)]">&gt;_</span>
          <span className="text-[var(--text2)]">~</span>
          <span>/sarib</span>
          <span className="w-2 h-4 bg-[var(--cyan)] cursor-blink ml-1" />
        </p>

        {/* Name */}
        <h1 className="text-4xl lg:text-5xl font-bold text-[var(--text)] leading-tight mb-4">
          Muhammad Sarib Hanif
        </h1>

        {/* Role with typewriter */}
        <div className="font-mono text-lg text-[var(--cyan)] mb-6 h-7 flex items-center">
          {roleText}
          <span className="inline-block w-0.5 h-5 bg-[var(--cyan)] ml-1 cursor-blink" />
        </div>

        {/* Description */}
        <p className="text-[var(--text2)] leading-relaxed mb-4 max-w-sm text-sm">
          I turn ideas into products — from database schema to deployment pipeline.
        </p>

        {/* Comment line */}
        <p className="font-mono text-xs text-[var(--text3)] mb-8">
          // turning Pure Will into code since 2020
        </p>

        {/* CTA Button */}
        <a
          href="#projects"
          className="inline-flex items-center gap-3 px-6 py-3 bg-[var(--cyan)] text-[var(--bg)] rounded-lg font-medium text-sm hover:opacity-90 transition-opacity w-fit mb-12"
        >
          Explore My Work
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </a>

        {/* Social Links */}
        <div className="flex gap-5 mb-12">
          <a
            href="https://github.com/M-SARIBHANIF"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-[var(--text3)] hover:text-[var(--cyan)] transition-colors"
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
            className="text-[var(--text3)] hover:text-[var(--cyan)] transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          <button
            onClick={() => window.dispatchEvent(new Event("openContact"))}
            aria-label="Email"
            className="text-[var(--text3)] hover:text-[var(--cyan)] transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Navigation Links with lines */}
      <nav className="flex flex-col gap-1">
        {navItems.map(({ id, label }) => {
          const isActive = activeSection === id;
          return (
            <a
              key={id}
              href={`#${id}`}
              className={`nav-item ${isActive ? "active" : ""}`}
            >
              <span className={`nav-line ${isActive ? "w-14 bg-[var(--cyan)]" : "w-8"}`} />
              <span>{label}</span>
            </a>
          );
        })}
      </nav>
    </div>
  );
}
