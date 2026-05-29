"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { RevealWrapper } from "./RevealWrapper";

const projects = [
  {
    title: "Agile PM Dashboard",
    description:
      "A comprehensive project management tool with real-time collaboration, sprint planning, and analytics dashboard. Built with React, Node.js, and PostgreSQL.",
    technologies: ["React", "Node.js", "PostgreSQL", "Socket.io", "Docker"],
    featured: true,
    color: "blue",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
    stats: { users: "500+", uptime: "99.9%" },
  },
  {
    title: "Relief Insight Pakistan",
    description:
      "Disaster relief coordination platform enabling NGOs to track resources, manage volunteers, and coordinate relief efforts across Pakistan.",
    technologies: ["Next.js", "FastAPI", "MongoDB", "Mapbox", "Redis"],
    featured: true,
    color: "green",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    stats: { impact: "10K+", regions: "15" },
  },
  {
    title: "MERN E-Commerce",
    description:
      "Full-featured e-commerce platform with product management, shopping cart, payment integration, and order tracking.",
    technologies: ["React", "Express", "MongoDB", "Stripe", "Redux"],
    featured: false,
    color: "purple",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8">
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
    ),
    stats: { products: "1000+", orders: "5K+" },
  },
  {
    title: "LIMS System",
    description:
      "Laboratory Information Management System for tracking samples, managing workflows, and generating reports.",
    technologies: ["Laravel", "Vue.js", "MySQL", "Docker"],
    featured: false,
    color: "cyan",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8">
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <line x1="10" y1="9" x2="8" y2="9" />
      </svg>
    ),
    stats: { samples: "50K+", reports: "2K+" },
  },
];

const getColorClasses = (color: string) => {
  const colors: Record<string, { bg: string; text: string; glow: string; border: string; dim: string; gradient: string }> = {
    blue: { 
      bg: "bg-[var(--blue)]", 
      text: "text-[var(--blue)]", 
      glow: "glow-blue", 
      border: "border-[var(--blue)]", 
      dim: "bg-[var(--blue-dim)]",
      gradient: "from-[var(--blue)] to-[var(--cyan)]"
    },
    green: { 
      bg: "bg-[var(--green)]", 
      text: "text-[var(--green)]", 
      glow: "glow-green", 
      border: "border-[var(--green)]", 
      dim: "bg-[var(--green-dim)]",
      gradient: "from-[var(--green)] to-[var(--cyan)]"
    },
    purple: { 
      bg: "bg-[var(--purple)]", 
      text: "text-[var(--purple)]", 
      glow: "glow-purple", 
      border: "border-[var(--purple)]", 
      dim: "bg-[var(--purple-dim)]",
      gradient: "from-[var(--purple)] to-[var(--pink)]"
    },
    cyan: { 
      bg: "bg-[var(--cyan)]", 
      text: "text-[var(--cyan)]", 
      glow: "glow-cyan", 
      border: "border-[var(--cyan)]", 
      dim: "bg-[var(--cyan-dim)]",
      gradient: "from-[var(--cyan)] to-[var(--blue)]"
    },
    amber: { 
      bg: "bg-[var(--amber)]", 
      text: "text-[var(--amber)]", 
      glow: "glow-amber", 
      border: "border-[var(--amber)]", 
      dim: "bg-[var(--amber-dim)]",
      gradient: "from-[var(--amber)] to-[var(--pink)]"
    },
    pink: { 
      bg: "bg-[var(--pink)]", 
      text: "text-[var(--pink)]", 
      glow: "glow-pink", 
      border: "border-[var(--pink)]", 
      dim: "bg-[var(--pink-dim)]",
      gradient: "from-[var(--pink)] to-[var(--purple)]"
    },
  };
  return colors[color] || colors.blue;
};

export function Projects() {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  return (
    <section
      id="projects"
      className="py-20 px-8 md:px-12 bg-[var(--bg)] relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--purple)] opacity-[0.02] rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[var(--blue)] opacity-[0.02] rounded-full blur-3xl" />
      </div>

      <RevealWrapper>
        <div className="max-w-6xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="mb-16 flex items-baseline gap-4">
            <span className="text-[var(--cyan)] font-mono text-lg font-bold">05.</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text)]">
              Projects
            </h2>
          </div>

          {/* Projects Grid */}
          <div className="space-y-6">
            {projects.map((project, index) => {
              const colors = getColorClasses(project.color);
              const isHovered = hoveredProject === project.title;
              const isFeatured = project.featured;
              
              return (
                <motion.div
                  key={project.title}
                  className="relative group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onHoverStart={() => setHoveredProject(project.title)}
                  onHoverEnd={() => setHoveredProject(null)}
                >
                  <div
                    className={`relative overflow-hidden rounded-lg border bg-[var(--bg3)] transition-all duration-300 p-6 ${
                      isHovered ? `${colors.border} border-2` : "border-[var(--border)]"
                    }`}
                  >
                    {/* Header with folder icon */}
                    <div className="flex items-start gap-4 mb-4">
                      {/* Folder Icon */}
                      <div className={`p-3 rounded-lg ${colors.dim} border ${isHovered ? colors.border : "border-[var(--border)]"} flex-shrink-0`}>
                        <svg className={`w-5 h-5 ${colors.text}`} fill="currentColor" viewBox="0 0 24 24">
                          <path d="M10 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/>
                        </svg>
                      </div>

                      <div className="flex-1">
                        {/* Featured Badge */}
                        {isFeatured && (
                          <motion.span 
                            className={`inline-block text-xs font-mono ${colors.text} ${colors.dim} px-2 py-1 rounded border ${colors.border} mb-2`}
                          >
                            Featured
                          </motion.span>
                        )}
                        {/* Title */}
                        <h3 className={`text-xl font-bold transition-all ${isHovered ? colors.text : "text-[var(--text)]"}`}>
                          {project.title}
                        </h3>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-[var(--text-muted)] text-sm mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-[var(--border)]">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className={`text-xs font-mono px-2.5 py-1 rounded border transition-all ${
                            isHovered 
                              ? `${colors.dim} ${colors.text} ${colors.border}` 
                              : "bg-transparent text-[var(--text-muted)] border-[var(--border)]"
                          }`}
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
