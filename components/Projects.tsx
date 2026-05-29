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
      className="py-32 pl-[calc(56px+2rem)] pr-8 bg-[var(--bg2)] relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--purple)] opacity-[0.02] rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[var(--blue)] opacity-[0.02] rounded-full blur-3xl" />
      </div>

      <RevealWrapper>
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="mb-20 text-center">
            <motion.span 
              className="text-sm font-mono text-[var(--blue)] mb-2 block"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {"// 04"}
            </motion.span>
            <motion.h2 
              className="text-4xl md:text-6xl font-bold text-glow-cyan"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Projects
            </motion.h2>
            <motion.p
              className="text-[var(--text2)] mt-4 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Crafting solutions that make a difference
            </motion.p>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, index) => {
              const colors = getColorClasses(project.color);
              const isHovered = hoveredProject === project.title;
              const isFeatured = project.featured;
              
              return (
                <motion.div
                  key={project.title}
                  className={`relative group ${isFeatured ? "md:col-span-2" : ""}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onHoverStart={() => setHoveredProject(project.title)}
                  onHoverEnd={() => setHoveredProject(null)}
                >
                  <motion.div
                    className={`relative overflow-hidden rounded-2xl border bg-[var(--bg)] transition-all duration-500 ${
                      isHovered ? `${colors.border} ${colors.glow}` : "border-[var(--border)]"
                    } ${isFeatured ? "min-h-[350px]" : "min-h-[300px]"}`}
                    whileHover={{ y: -8, scale: 1.01 }}
                  >
                    {/* Animated gradient border */}
                    <motion.div
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${colors.gradient} opacity-0 -z-10`}
                      animate={{ opacity: isHovered ? 0.1 : 0 }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Circuit Board Background */}
                    <svg
                      className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none"
                      viewBox="0 0 400 300"
                    >
                      <pattern
                        id={`circuit-${index}`}
                        x="0"
                        y="0"
                        width="50"
                        height="50"
                        patternUnits="userSpaceOnUse"
                      >
                        <path
                          d="M0 25h15M25 0v15M35 25h15M25 35v15"
                          stroke="currentColor"
                          strokeWidth="1"
                          fill="none"
                        />
                        <circle cx="25" cy="25" r="4" fill="none" stroke="currentColor" strokeWidth="1" />
                        <circle cx="25" cy="25" r="2" fill="currentColor" />
                      </pattern>
                      <rect
                        width="100%"
                        height="100%"
                        fill={`url(#circuit-${index})`}
                      />
                    </svg>

                    {/* Large Faint Number */}
                    <motion.div 
                      className="absolute -right-4 -bottom-8 text-[180px] font-bold text-[var(--border)] opacity-30 pointer-events-none select-none"
                      animate={{ opacity: isHovered ? 0.5 : 0.3 }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </motion.div>

                    {/* Glowing orbs on hover */}
                    <motion.div
                      className={`absolute -top-20 -right-20 w-40 h-40 rounded-full ${colors.dim}`}
                      animate={{ 
                        scale: isHovered ? 1.5 : 1, 
                        opacity: isHovered ? 0.6 : 0 
                      }}
                      style={{ filter: "blur(60px)" }}
                      transition={{ duration: 0.5 }}
                    />

                    {/* Content */}
                    <div className="relative z-10 p-8 h-full flex flex-col">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-4">
                          {/* Glowing Icon */}
                          <motion.div
                            className={`w-16 h-16 rounded-2xl ${colors.dim} flex items-center justify-center relative border ${colors.border}`}
                            animate={isHovered ? { 
                              boxShadow: [`0 0 15px var(--${project.color}-glow)`, `0 0 30px var(--${project.color}-glow)`, `0 0 15px var(--${project.color}-glow)`]
                            } : {}}
                            transition={{ duration: 1.5, repeat: isHovered ? Infinity : 0 }}
                          >
                            <span className={colors.text}>{project.icon}</span>
                            {/* Icon pulse effect */}
                            <motion.div
                              className={`absolute inset-0 rounded-2xl ${colors.dim}`}
                              animate={isHovered ? { scale: [1, 1.5], opacity: [0.5, 0] } : {}}
                              transition={{ duration: 1, repeat: isHovered ? Infinity : 0 }}
                            />
                          </motion.div>
                          
                          <div>
                            {isFeatured && (
                              <motion.span 
                                className={`inline-block text-xs font-mono ${colors.text} ${colors.dim} px-2 py-1 rounded-full mb-2`}
                                animate={isHovered ? { scale: [1, 1.05, 1] } : {}}
                                transition={{ duration: 1, repeat: isHovered ? Infinity : 0 }}
                              >
                                Featured
                              </motion.span>
                            )}
                            <motion.h3 
                              className={`text-2xl md:text-3xl font-bold transition-all ${isHovered ? colors.text : "text-[var(--text)]"}`}
                              style={isHovered ? { textShadow: `0 0 20px var(--${project.color}-glow)` } : {}}
                            >
                              {project.title}
                            </motion.h3>
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="hidden md:flex gap-3">
                          {Object.entries(project.stats).map(([key, value], i) => (
                            <motion.div
                              key={key}
                              className={`px-3 py-2 rounded-xl ${colors.dim} border ${isHovered ? colors.border : "border-transparent"} text-center transition-all`}
                              initial={{ opacity: 0, y: -10 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.2 + i * 0.1 }}
                            >
                              <span className={`text-lg font-bold ${colors.text} block`}>{value}</span>
                              <span className="text-[10px] text-[var(--text3)] uppercase tracking-wider">{key}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-[var(--text2)] mb-6 max-w-2xl leading-relaxed flex-grow">
                        {project.description}
                      </p>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, i) => (
                          <motion.span
                            key={tech}
                            className={`text-xs font-mono px-4 py-2 rounded-xl transition-all border ${
                              isHovered 
                                ? `${colors.dim} ${colors.text} ${colors.border}` 
                                : "bg-[var(--bg3)] text-[var(--text2)] border-transparent"
                            }`}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.05 * i }}
                            whileHover={{ 
                              scale: 1.1, 
                              y: -4,
                              boxShadow: `0 4px 20px var(--${project.color}-glow)`
                            }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>

                      {/* Bottom decorative line */}
                      <motion.div
                        className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${colors.gradient}`}
                        initial={{ width: 0 }}
                        animate={{ width: isHovered ? "100%" : "0%" }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </RevealWrapper>
    </section>
  );
}
