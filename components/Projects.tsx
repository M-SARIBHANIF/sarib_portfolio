"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { RevealWrapper } from "./RevealWrapper";

const projects = [
  {
    title: "Pak Relief Radar",
    description:
      "Final year project analyzing satellite imagery to classify poverty zones using CNNs, achieving 78%+ model confidence. Built to help NGOs distribute aid more effectively. Presented at NICAT, placed in the Top 10, and selected for startup incubation. Deployed end-to-end on DigitalOcean with a React frontend and Flask inference API.",
    technologies: ["Machine Learning", "Python", "TensorFlow", "Flask", "React", "MongoDB", "DigitalOcean", "Computer Vision"],
    featured: true,
  },
  {
  title: "Real-Time Sign Language Detection System",
  description:
    "End-to-end computer vision system that detects and classifies sign language gestures in real-time. Built with MediaPipe for hand landmark extraction, a TensorFlow classification model on the backend, and a live React frontend consuming predictions over WebSockets.",
  technologies: ["Python", "TensorFlow", "MediaPipe", "FastAPI", "WebSockets", "React"],
  featured: true,
  },
  {
  title: "Agile Project Management Dashboard",
  description:
    "Azure DevOps-inspired project management system built across two surfaces — a standalone React app for external dashboards and a custom OWL component embedded inside Odoo. FastAPI powers the backend with PostgreSQL handling sprint data, task tracking, and team workflows.",
  technologies: ["React", "OWL", "FastAPI", "PostgreSQL", "Odoo", "Docker"],
  featured: false,
  },
  {
  title: "Amazon-Inspired E-Commerce Platform",
  description:
    "Full-scale e-commerce platform designed in Figma and built end-to-end with a React frontend, Node.js backend, and PostgreSQL database. Features JWT authentication, payment integration, dynamic product filtering, cart state management, and an admin control panel.",
  technologies: ["React", "Node.js", "PostgreSQL", "JWT", "Figma", "Express.js"],
  featured: false,
  },
];

// Folder icon component
const FolderIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M10 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" />
  </svg>
);

export function Projects() {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  return (
    <section id="projects" className="py-16 px-6 md:px-10 lg:px-14 bg-[var(--bg)]">
      <RevealWrapper>
        <div className="max-w-3xl">
          {/* Section Header */}
          <div className="section-header mb-8">
            <span className="section-number text-sm">05.</span>
            <h2 className="section-title text-xl">Projects</h2>
            <div className="section-line" />
          </div>

          {/* Projects List */}
          <div className="space-y-6">
            {projects.map((project, index) => {
              const isHovered = hoveredProject === project.title;

              return (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onMouseEnter={() => setHoveredProject(project.title)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <div
                    className={`card transition-all duration-300 ${
                      isHovered ? "border-[var(--cyan)]" : ""
                    }`}
                  >
                    {/* Header */}
                    <div className="flex items-start gap-3 mb-4">
                      {/* Folder Icon */}
                      <div className={`text-[var(--cyan)] mt-0.5 transition-all ${isHovered ? "scale-110" : ""}`}>
                        <FolderIcon />
                      </div>

                      <div className="flex-1">
                        {/* Featured Badge */}
                        {project.featured && (
                          <span className="badge-featured mb-2 inline-block">
                            Featured
                          </span>
                        )}

                        {/* Title */}
                        <h3 className={`text-lg font-semibold transition-colors ${isHovered ? "text-[var(--cyan)]" : "text-[var(--text)]"}`}>
                          {project.title}
                        </h3>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-[var(--text2)] mb-6 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className={`tech-badge transition-all ${
                            isHovered ? "bg-[var(--cyan-dim)]" : ""
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
