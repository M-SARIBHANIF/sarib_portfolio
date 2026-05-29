"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";

const navItems = [
  { id: "hero", label: "Home", color: "cyan" },
  { id: "about", label: "About", color: "blue" },
  { id: "skills", label: "Skills", color: "purple" },
  { id: "experience", label: "Work", color: "green" },
  { id: "projects", label: "Projects", color: "pink" },
  { id: "education", label: "Education", color: "amber" },
  { id: "contact", label: "Contact", color: "cyan" },
];

const getIconForId = (id: string) => {
  const icons: Record<string, JSX.Element> = {
    hero: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    about: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4M12 8h.01" />
      </svg>
    ),
    skills: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
      </svg>
    ),
    experience: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
    projects: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
      </svg>
    ),
    education: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
    contact: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  };
  return icons[id] || icons.hero;
};

const getColorVar = (color: string) => `var(--${color})`;
const getGlowVar = (color: string) => `var(--${color}-glow)`;
const getDimVar = (color: string) => `var(--${color}-dim)`;

export function Rail() {
  const [activeSection, setActiveSection] = useState("hero");
  const [time, setTime] = useState("");
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const railRef = useRef<HTMLDivElement>(null);
  
  const mouseY = useMotionValue(0);
  const glowY = useTransform(mouseY, [0, 600], [0, 100]);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 3500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date().toLocaleTimeString("en-US", {
        timeZone: "Asia/Karachi",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      setTime(now);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );
    navItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (railRef.current) {
      const rect = railRef.current.getBoundingClientRect();
      mouseY.set(e.clientY - rect.top);
    }
  };

  if (!isVisible) return null;

  return (
    <motion.div
      ref={railRef}
      className="fixed left-0 top-0 h-screen z-[100] flex"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onHoverStart={() => setIsExpanded(true)}
      onHoverEnd={() => setIsExpanded(false)}
    >
      {/* Main Rail Container */}
      <motion.div
        className="h-full bg-[var(--bg)]/95 backdrop-blur-xl border-r border-[var(--border)] flex flex-col items-center justify-between py-6 relative overflow-hidden"
        animate={{ width: isExpanded ? 180 : 64 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Animated glow follower */}
        <motion.div
          className="absolute left-0 w-full h-32 pointer-events-none"
          style={{ 
            y: glowY,
            background: `radial-gradient(ellipse at center, ${getGlowVar(navItems.find(i => i.id === activeSection)?.color || "cyan")} 0%, transparent 70%)`,
            opacity: 0.15,
            filter: "blur(20px)"
          }}
        />

        {/* Scroll Progress Bar */}
        <motion.div
          className="absolute right-0 top-0 w-[3px] bg-gradient-to-b from-[var(--cyan)] via-[var(--purple)] to-[var(--green)]"
          style={{ height: `${scrollProgress}%` }}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 1,
            boxShadow: "0 0 10px var(--cyan-glow), 0 0 20px var(--purple-glow)"
          }}
        />

        {/* Logo */}
        <motion.div
          className="relative z-10"
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            className="w-11 h-11 rounded-xl bg-gradient-to-br from-[var(--cyan-dim)] to-[var(--blue-dim)] border border-[var(--cyan)] flex items-center justify-center relative overflow-hidden cursor-pointer"
            animate={{ 
              boxShadow: ["0 0 15px var(--cyan-glow)", "0 0 25px var(--cyan-glow)", "0 0 15px var(--cyan-glow)"]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            onClick={() => scrollToSection("hero")}
          >
            <span className="font-mono text-[var(--cyan)] font-bold text-sm relative z-10">SH</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{ x: [-60, 60] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
            />
          </motion.div>
          
          {/* Orbiting particles */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full"
              style={{ 
                background: i === 0 ? "var(--cyan)" : i === 1 ? "var(--purple)" : "var(--green)",
                boxShadow: `0 0 6px ${i === 0 ? "var(--cyan)" : i === 1 ? "var(--purple)" : "var(--green)"}`
              }}
              animate={{
                rotate: 360,
              }}
              transition={{ 
                duration: 3 + i, 
                repeat: Infinity, 
                ease: "linear",
                delay: i * 0.5
              }}
              initial={{ x: 0, y: 0 }}
              style={{
                left: "50%",
                top: "50%",
                marginLeft: -3,
                marginTop: -3,
                transformOrigin: `${20 + i * 5}px ${20 + i * 5}px`
              }}
            />
          ))}
        </motion.div>

        {/* Navigation */}
        <nav className="flex-1 flex flex-col items-center justify-center gap-1 py-4 w-full px-2">
          {navItems.map((item, index) => {
            const isActive = activeSection === item.id;
            const isHovered = hoveredItem === item.id;
            const colorVar = getColorVar(item.color);
            const glowVar = getGlowVar(item.color);
            const dimVar = getDimVar(item.color);
            
            return (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="relative w-full flex items-center rounded-xl overflow-hidden"
                aria-label={`Navigate to ${item.label}`}
                onHoverStart={() => setHoveredItem(item.id)}
                onHoverEnd={() => setHoveredItem(null)}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Background */}
                <motion.div
                  className="absolute inset-0 rounded-xl"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: isActive || isHovered ? 1 : 0,
                    background: isActive ? dimVar : isHovered ? "var(--bg3)" : "rgba(13,14,21,0)"
                  }}
                  transition={{ duration: 0.2 }}
                />

                {/* Active indicator bar */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      className="absolute left-0 top-1/2 w-[3px] h-6 rounded-r-full"
                      style={{ 
                        background: colorVar,
                        boxShadow: `0 0 12px ${glowVar}, 0 0 24px ${glowVar}`
                      }}
                      initial={{ y: "-50%", scaleY: 0, opacity: 0 }}
                      animate={{ y: "-50%", scaleY: 1, opacity: 1 }}
                      exit={{ scaleY: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    />
                  )}
                </AnimatePresence>

                {/* Icon and Label Container */}
                <div className="relative z-10 flex items-center gap-3 py-3 px-3 w-full">
                  {/* Icon with glow */}
                  <motion.div
                    className="relative flex-shrink-0"
                    animate={{ 
                      color: isActive ? colorVar : isHovered ? "var(--text)" : "var(--text3)",
                      filter: isActive ? `drop-shadow(0 0 8px ${glowVar})` : "none"
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {getIconForId(item.id)}
                    
                    {/* Icon pulse on active */}
                    {isActive && (
                      <motion.div
                        className="absolute inset-0"
                        animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        style={{ color: colorVar }}
                      >
                        {getIconForId(item.id)}
                      </motion.div>
                    )}
                  </motion.div>
                  
                  {/* Label */}
                  <AnimatePresence mode="wait">
                    {isExpanded && (
                      <motion.span
                        className="text-sm font-medium whitespace-nowrap overflow-hidden"
                        style={{ 
                          color: isActive ? colorVar : isHovered ? "var(--text)" : "var(--text2)",
                          textShadow: isActive ? `0 0 10px ${glowVar}` : "none"
                        }}
                        initial={{ opacity: 0, width: 0, x: -10 }}
                        animate={{ opacity: 1, width: "auto", x: 0 }}
                        exit={{ opacity: 0, width: 0, x: -10 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>

                {/* Tooltip when collapsed */}
                <AnimatePresence>
                  {isHovered && !isExpanded && (
                    <motion.div
                      className="absolute left-full ml-4 px-3 py-2 rounded-lg whitespace-nowrap z-50 border"
                      style={{ 
                        background: "var(--bg2)",
                        borderColor: colorVar,
                        boxShadow: `0 0 20px ${glowVar}`
                      }}
                      initial={{ opacity: 0, x: -10, scale: 0.9 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -10, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span className="text-sm font-medium" style={{ color: colorVar }}>{item.label}</span>
                      <div 
                        className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 rotate-45 border-l border-b"
                        style={{ background: "var(--bg2)", borderColor: colorVar }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="flex flex-col items-center gap-4 relative z-10">
          {/* Status Indicator */}
          <motion.div className="relative">
            <motion.div 
              className="w-3 h-3 bg-[var(--green)] rounded-full"
              animate={{ 
                boxShadow: ["0 0 8px var(--green)", "0 0 20px var(--green)", "0 0 8px var(--green)"]
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <motion.div 
              className="absolute inset-0 bg-[var(--green)] rounded-full"
              animate={{ scale: [1, 2.5], opacity: [0.6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>

          {/* Time Display */}
          <motion.div className="text-center">
            <AnimatePresence mode="wait">
              {isExpanded ? (
                <motion.div
                  key="expanded"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="flex flex-col items-center"
                >
                  <span className="text-sm font-mono text-[var(--cyan)] glow-cyan">{time}</span>
                  <span className="text-[10px] text-[var(--text3)] mt-1">Pakistan Time</span>
                </motion.div>
              ) : (
                <motion.div
                  key="collapsed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center"
                >
                  <span className="text-[11px] font-mono text-[var(--text3)]" style={{ writingMode: "vertical-rl" }}>
                    {time}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
