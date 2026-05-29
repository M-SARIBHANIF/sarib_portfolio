"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const navItems = [
  { id: "about", label: "ABOUT" },
  { id: "skills", label: "SKILLS" },
  { id: "experience", label: "EXPERIENCE" },
  { id: "education", label: "EDUCATION" },
  { id: "projects", label: "PROJECTS" },
  { id: "philosophy", label: "PHILOSOPHY" },
  { id: "contact", label: "CONTACT" },
];

const roles = [
  "Full Stack Developer",
  "API Architect",
  "DevOps Engineer",
  "React Specialist",
  "Backend Engineer",
];

export function Sidebar() {
  const [activeSection, setActiveSection] = useState("about");
  const [roleText, setRoleText] = useState("");
  const [currentRole, setCurrentRole] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const role = roles[currentRole];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (roleText.length < role.length) {
            setRoleText(role.slice(0, roleText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 2500);
          }
        } else {
          if (roleText.length > 0) {
            setRoleText(role.slice(0, roleText.length - 1));
          } else {
            setIsDeleting(false);
            setCurrentRole((prev) => (prev + 1) % roles.length);
          }
        }
      },
      isDeleting ? 40 : 90
    );
    return () => clearTimeout(timeout);
  }, [roleText, isDeleting, currentRole]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.25, rootMargin: "-10% 0px -60% 0px" }
    );
    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <aside
      className="fixed left-0 top-0 h-screen flex flex-col justify-between py-12 px-8 border-r border-[var(--border)] bg-[var(--bg)] z-50 w-80"
    >
      <div className="flex flex-col">
        {/* Header */}
        <p className="font-mono text-xs text-[var(--text-muted)] mb-6 tracking-wider opacity-70">
          <span className="text-[var(--cyan)]">&gt;_</span> /hamza _
        </p>

        {/* Name */}
        <h1 className="text-3xl font-bold text-[var(--text)] leading-tight mb-3">
          Muhammad<br />
          Sarib Hanif
        </h1>

        {/* Role */}
        <div className="font-mono text-sm text-[var(--cyan)] mb-5 h-6 flex items-center border-b border-[var(--cyan)] pb-1 w-fit">
          {roleText}
          <span className="inline-block w-px h-4 bg-[var(--cyan)] ml-0.5 animate-pulse" />
        </div>

        {/* Description */}
        <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-3 max-w-xs opacity-75">
          Building scalable apps and efficient APIs. Clean code, real systems.
        </p>

        {/* Comment */}
        <p className="font-mono text-xs text-[var(--text-muted)] mb-8 opacity-50">
          // available for hire
        </p>

        {/* Social Links */}
        <div className="flex gap-4 mb-8">
          <a href="https://github.com/M-SARIBHANIF" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-[var(--text-muted)] hover:text-[var(--cyan)] transition-colors opacity-60 hover:opacity-100">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
          </a>
          <a href="https://linkedin.com/in/m-sarib-hanif" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-[var(--text-muted)] hover:text-[var(--cyan)] transition-colors opacity-60 hover:opacity-100">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </a>
          <button onClick={() => window.dispatchEvent(new Event("openContact"))} aria-label="Email" className="text-[var(--text-muted)] hover:text-[var(--cyan)] transition-colors opacity-60 hover:opacity-100">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
          </button>
        </div>

        {/* Divider */}
        <div className="w-12 h-px bg-[var(--cyan)] mb-8 opacity-40" />

        {/* Navigation */}
        <nav className="flex flex-col gap-1">
          {navItems.map(({ id, label }) => {
            const isActive = activeSection === id;
            return (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="flex items-center gap-3 py-1.5 px-0 text-left w-full transition-all duration-200"
              >
                <span
                  className="block h-px flex-shrink-0 transition-all duration-300"
                  style={{
                    width: isActive ? "32px" : "16px",
                    backgroundColor: isActive ? "var(--cyan)" : "var(--text-muted)",
                    opacity: isActive ? 1 : 0.35,
                  }}
                />
                <span
                  className="font-mono text-xs transition-all duration-200"
                  style={{
                    color: isActive ? "var(--cyan)" : "var(--text-muted)",
                    fontWeight: isActive ? 600 : 400,
                    opacity: isActive ? 1 : 0.5,
                    letterSpacing: "0.1em",
                  }}
                >
                  {label}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      <SidebarClock />
    </aside>
  );
}

function SidebarClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("en-US", {
          timeZone: "Asia/Karachi",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <p className="font-mono text-[10px] text-[var(--text-muted)] opacity-30">
      PKT {time}
    </p>
  );
}
