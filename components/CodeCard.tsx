"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const terminalLines = [
  { text: "$ whoami", type: "command", delay: 0 },
  { text: "sarib@portfolio:~$ Full Stack Developer", type: "output", delay: 0.8 },
  { text: "", type: "empty", delay: 0 },
  { text: "$ location --current", type: "command", delay: 1.6 },
  { text: "Islamabad, Pakistan", type: "output", delay: 2.2 },
  { text: "", type: "empty", delay: 0 },
  { text: "$ skills --list", type: "command", delay: 2.8 },
  { text: "React | Node.js | Python | Docker | PostgreSQL", type: "output", delay: 3.4 },
  { text: "", type: "empty", delay: 0 },
  { text: "$ status --availability", type: "command", delay: 4 },
  { text: "AVAILABLE FOR HIRE", type: "success", delay: 4.6 },
];

export function CodeCard() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const startDelay = setTimeout(() => {
      const interval = setInterval(() => {
        setVisibleLines((prev) => {
          if (prev >= terminalLines.length) {
            clearInterval(interval);
            return prev;
          }
          return prev + 1;
        });
      }, 400);

      return () => clearInterval(interval);
    }, 3800);

    return () => clearTimeout(startDelay);
  }, []);

  const getLineStyle = (type: string) => {
    switch (type) {
      case "command":
        return "text-[var(--cyan)]";
      case "output":
        return "text-[var(--text)]";
      case "success":
        return "text-[var(--green)] font-bold glow-green";
      default:
        return "";
    }
  };

  return (
    <motion.div
      className="relative w-full max-w-md float"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 3.6, duration: 0.6 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div 
        className="relative bg-[#0a0a0a]/95 backdrop-blur-xl rounded-2xl border border-[var(--border)] overflow-hidden"
        animate={isHovered ? { 
          borderColor: "var(--cyan)",
          boxShadow: "0 0 40px var(--cyan-glow), inset 0 0 20px rgba(0,255,255,0.03)"
        } : {
          borderColor: "var(--border)",
          boxShadow: "0 0 0 transparent"
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)] bg-[var(--bg3)]/50">
          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              <motion.div 
                className="w-3 h-3 rounded-full bg-[#ff5f56]"
                animate={{ boxShadow: isHovered ? "0 0 10px #ff5f56" : "none" }}
                whileHover={{ scale: 1.2 }}
              />
              <motion.div 
                className="w-3 h-3 rounded-full bg-[#ffbd2e]"
                animate={{ boxShadow: isHovered ? "0 0 10px #ffbd2e" : "none" }}
                whileHover={{ scale: 1.2 }}
              />
              <motion.div 
                className="w-3 h-3 rounded-full bg-[#27c93f]"
                animate={{ boxShadow: isHovered ? "0 0 10px #27c93f" : "none" }}
                whileHover={{ scale: 1.2 }}
              />
            </div>
            <span className="text-xs font-mono text-[var(--text3)]">
              sarib@portfolio ~ bash
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-[var(--text3)]">{currentTime}</span>
            <motion.div
              className="w-2 h-2 rounded-full bg-[var(--green)]"
              animate={{ 
                boxShadow: ["0 0 4px var(--green)", "0 0 12px var(--green)", "0 0 4px var(--green)"],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </div>

        {/* Terminal Content */}
        <div className="p-5 font-mono text-sm min-h-[220px]">
          {terminalLines.map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ 
                opacity: index < visibleLines ? 1 : 0, 
                x: index < visibleLines ? 0 : -10 
              }}
              transition={{ duration: 0.3 }}
              className={`leading-relaxed ${getLineStyle(line.type)} ${line.type === "empty" ? "h-4" : ""}`}
            >
              {line.type === "command" && (
                <span className="text-[var(--green)] mr-1">{">"}</span>
              )}
              {line.type === "output" && (
                <span className="text-[var(--text3)] mr-2">{"  "}</span>
              )}
              {line.type === "success" && (
                <motion.span 
                  className="inline-flex items-center gap-2"
                  animate={{ 
                    textShadow: ["0 0 10px var(--green-glow)", "0 0 20px var(--green-glow)", "0 0 10px var(--green-glow)"]
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {line.text}
                </motion.span>
              )}
              {line.type !== "success" && line.text}
            </motion.div>
          ))}
          
          {/* Blinking cursor */}
          <motion.span
            className="inline-block w-2.5 h-5 bg-[var(--cyan)] mt-2"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: visibleLines >= terminalLines.length ? [1, 0] : 0,
              boxShadow: visibleLines >= terminalLines.length ? "0 0 10px var(--cyan-glow)" : "none"
            }}
            transition={{ duration: 0.6, repeat: Infinity }}
          />
        </div>

        {/* Scan line effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
        >
          <motion.div
            className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--cyan)] to-transparent opacity-40"
            animate={{ top: ["0%", "100%"] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      </motion.div>

      {/* Glow effect */}
      <motion.div 
        className="absolute -inset-3 rounded-2xl -z-10"
        animate={{
          background: isHovered 
            ? "linear-gradient(135deg, var(--cyan-glow), var(--blue-glow), var(--green-glow))"
            : "linear-gradient(135deg, var(--cyan-dim), var(--blue-dim), var(--green-dim))",
          opacity: isHovered ? 0.5 : 0.2,
        }}
        style={{ filter: "blur(25px)" }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}
