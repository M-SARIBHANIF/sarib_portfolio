"use client";

import { motion } from "framer-motion";

const technologies = [
  { name: "React", color: "cyan", icon: "Re" },
  { name: "Node.js", color: "green", icon: "No" },
  { name: "TypeScript", color: "blue", icon: "TS" },
  { name: "PostgreSQL", color: "blue", icon: "Pg" },
  { name: "Docker", color: "blue", icon: "Dk" },
  { name: "FastAPI", color: "green", icon: "FA" },
  { name: "MongoDB", color: "green", icon: "Mg" },
  { name: "Redis", color: "pink", icon: "Rd" },
  { name: "AWS", color: "amber", icon: "Aw" },
  { name: "GraphQL", color: "pink", icon: "GQ" },
  { name: "Tailwind", color: "cyan", icon: "Tw" },
  { name: "Next.js", color: "purple", icon: "Nx" },
];

const getColorClasses = (color: string) => {
  const colors: Record<string, { bg: string; text: string; glow: string }> = {
    blue: { bg: "bg-[var(--blue)]", text: "text-[var(--blue)]", glow: "var(--blue-glow)" },
    green: { bg: "bg-[var(--green)]", text: "text-[var(--green)]", glow: "var(--green-glow)" },
    purple: { bg: "bg-[var(--purple)]", text: "text-[var(--purple)]", glow: "var(--purple-glow)" },
    cyan: { bg: "bg-[var(--cyan)]", text: "text-[var(--cyan)]", glow: "var(--cyan-glow)" },
    amber: { bg: "bg-[var(--amber)]", text: "text-[var(--amber)]", glow: "var(--amber-glow)" },
    pink: { bg: "bg-[var(--pink)]", text: "text-[var(--pink)]", glow: "var(--pink-glow)" },
  };
  return colors[color] || colors.blue;
};

export function TechTicker() {
  const duplicatedTechs = [...technologies, ...technologies, ...technologies];

  return (
    <div className="relative overflow-hidden py-8 border-y border-[var(--border)]">
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: [0, -50 * technologies.length] }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {duplicatedTechs.map((tech, index) => {
          const colors = getColorClasses(tech.color);
          return (
            <motion.div
              key={`${tech.name}-${index}`}
              className="flex items-center gap-3 px-4 py-2 rounded-xl bg-[var(--bg2)] border border-[var(--border)] hover:border-current transition-colors"
              whileHover={{ 
                scale: 1.1, 
                y: -4,
                boxShadow: `0 0 20px ${colors.glow}`
              }}
            >
              {/* Glowing icon */}
              <motion.div
                className={`w-8 h-8 rounded-lg ${colors.bg}/20 flex items-center justify-center`}
                style={{ boxShadow: `0 0 10px ${colors.glow}` }}
              >
                <span className={`text-xs font-mono font-bold ${colors.text}`}>
                  {tech.icon}
                </span>
              </motion.div>
              <span className={`text-sm font-medium ${colors.text}`}>
                {tech.name}
              </span>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Gradient overlays */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[var(--bg)] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[var(--bg)] to-transparent z-10 pointer-events-none" />
    </div>
  );
}
