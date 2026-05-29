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
    title: "AI URL Verification App",
    description:
      "FastAPI application integrating OpenAI and Perplexity APIs for intelligent URL verification and content analysis. Built with clean architecture and comprehensive test coverage.",
    technologies: ["Python", "FastAPI", "OpenAI API", "Perplexity API", "REST"],
    featured: true,
  },
  {
    title: "Agile PM Dashboard",
    description:
      "A comprehensive project management tool with real-time collaboration, sprint planning, and analytics dashboard. Built with React, Node.js, and PostgreSQL.",
    technologies: ["React", "Node.js", "PostgreSQL", "Socket.io", "Docker"],
    featured: false,
  },
  {
    title: "DIY Robotic Arm Project",
    description:
      "Ongoing project designing a robotic arm using 3D-printed and CNC parts. Combines software control systems with real-world hardware, bridging digital and physical systems.",
    technologies: ["Robotics", "CAD", "3D Printing", "Motor Control", "Embedded Systems"],
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
