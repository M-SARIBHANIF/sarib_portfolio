"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CodeCard } from "./CodeCard";

const roles = [
  "Full Stack Developer",
  "API Architect",
  "DevOps Engineer",
  "React Specialist",
  "Backend Engineer",
];

const socials = [
  {
    name: "GitHub",
    url: "https://github.com/M-SARIBHANIF",
    color: "purple",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/m-sarib-hanif",
    color: "blue",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "Email",
    url: "mailto:saribraja1998@gmail.com",
    color: "green",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
];

export function Hero() {
  const [terminalText, setTerminalText] = useState("");
  const [currentRole, setCurrentRole] = useState(0);
  const [roleText, setRoleText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const fullTerminal = "> sarib.dev --portfolio --open";

  // Terminal typing effect
  useEffect(() => {
    const startDelay = setTimeout(() => {
      setShowContent(true);
      let i = 0;
      const typeInterval = setInterval(() => {
        if (i <= fullTerminal.length) {
          setTerminalText(fullTerminal.slice(0, i));
          i++;
        } else {
          clearInterval(typeInterval);
        }
      }, 50);
      return () => clearInterval(typeInterval);
    }, 3500);

    return () => clearTimeout(startDelay);
  }, []);

  // Role cycling typewriter
  useEffect(() => {
    if (!showContent) return;

    const role = roles[currentRole];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (roleText.length < role.length) {
            setRoleText(role.slice(0, roleText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 2000);
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
      isDeleting ? 50 : 100
    );

    return () => clearTimeout(timeout);
  }, [roleText, isDeleting, currentRole, showContent]);

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-end pb-20 pl-[calc(56px+2rem)] pr-8 relative"
    >
      <div className="flex flex-col lg:flex-row items-end justify-between gap-12">
        {/* Left Content */}
        <div className="flex-1 max-w-2xl">
          {/* Terminal Line */}
          <motion.div
            className="font-mono text-sm text-[var(--text3)] mb-6 flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: showContent ? 1 : 0 }}
          >
            <motion.span 
              className="text-[var(--green)]"
              animate={{ textShadow: ["0 0 5px var(--green-glow)", "0 0 15px var(--green-glow)", "0 0 5px var(--green-glow)"] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              $
            </motion.span>
            <span>{terminalText}</span>
            <motion.span 
              className="w-2 h-4 bg-[var(--green)] cursor-blink"
              animate={{ boxShadow: ["0 0 5px var(--green-glow)", "0 0 15px var(--green-glow)", "0 0 5px var(--green-glow)"] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </motion.div>

          {/* Name */}
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-4 text-stroke-animate relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: showContent ? 1 : 0 }}
            transition={{ delay: 0.2 }}
            style={{ textShadow: "0 0 40px var(--blue-glow)" }}
          >
            Muhammad Sarib Hanif
            {/* Animated underline */}
            <motion.div
              className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-[var(--blue)] via-[var(--purple)] to-[var(--cyan)]"
              initial={{ width: 0 }}
              animate={{ width: showContent ? "60%" : 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              style={{ boxShadow: "0 0 15px var(--blue-glow)" }}
            />
          </motion.h1>

          {/* Role Cycler */}
          <motion.div
            className="text-2xl md:text-3xl font-mono mb-6 h-10 flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: showContent ? 1 : 0 }}
            transition={{ delay: 0.4 }}
          >
            <motion.span 
              className="text-[var(--cyan)]"
              animate={{ textShadow: ["0 0 10px var(--cyan-glow)", "0 0 25px var(--cyan-glow)", "0 0 10px var(--cyan-glow)"] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {roleText}
            </motion.span>
            <motion.span 
              className="w-[3px] h-8 bg-[var(--cyan)] ml-1 cursor-blink"
              animate={{ boxShadow: ["0 0 5px var(--cyan-glow)", "0 0 20px var(--cyan-glow)", "0 0 5px var(--cyan-glow)"] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </motion.div>

          {/* Tagline */}
          <motion.p
            className="text-lg text-[var(--text2)] mb-8 max-w-lg leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
            transition={{ delay: 0.6 }}
          >
            Building scalable applications and efficient APIs. Passionate about
            clean code, automation, and delivering exceptional user experiences.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
            transition={{ delay: 0.8 }}
          >
            <motion.a
              href="#projects"
              className="relative px-6 py-3 bg-[var(--blue)] text-white font-medium rounded-xl overflow-hidden group"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              animate={{ boxShadow: ["0 0 15px var(--blue-glow)", "0 0 30px var(--blue-glow)", "0 0 15px var(--blue-glow)"] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="relative z-10">View Work</span>
              {/* Shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />
            </motion.a>
            <motion.a
              href="/cv.pdf"
              download
              className="px-6 py-3 border border-[var(--purple)] text-[var(--purple)] font-medium rounded-xl hover:bg-[var(--purple-dim)] transition-colors"
              whileHover={{ 
                scale: 1.05, 
                y: -2,
                boxShadow: "0 0 20px var(--purple-glow)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              Download CV
            </motion.a>
          </motion.div>

          {/* Socials */}
          <motion.div
            className="flex gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: showContent ? 1 : 0 }}
            transition={{ delay: 1 }}
          >
            {socials.map((social, index) => {
              const isEmail = social.name === 'Email';
              const commonProps: any = {
                className: `relative p-3 bg-[var(--bg2)] border rounded-xl text-[var(--text2)] overflow-hidden`,
                style: { borderColor: `var(--${social.color})`, cursor: 'pointer' },
                initial: { opacity: 0, y: 20 },
                animate: { opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 },
                transition: { delay: 1 + index * 0.08 },
                whileHover: { scale: 1.06, y: -2, boxShadow: `0 0 16px var(--${social.color}-glow)` },
                whileTap: { scale: 0.98 },
                'aria-label': social.name,
              };
              if (isEmail) {
                // ensure click works whether user clicks the inner button or outer container
                commonProps.onClick = () => window.dispatchEvent(new Event('openContact'));
              }

              return (
                <motion.div key={social.name} {...commonProps}>
                  {isEmail ? (
                    <button
                      onClick={() => window.dispatchEvent(new Event('openContact'))}
                      className="flex items-center justify-center w-full h-full"
                      aria-label="Open contact form"
                    >
                      <motion.span whileHover={{ scale: 1.12 }} transition={{ type: 'spring', stiffness: 400, damping: 28 }}>
                        {social.icon}
                      </motion.span>
                    </button>
                  ) : (
                    <a href={social.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full h-full">
                      <motion.span whileHover={{ scale: 1.12 }} transition={{ type: 'spring', stiffness: 400, damping: 28 }}>
                        {social.icon}
                      </motion.span>
                    </a>
                  )}
                  <motion.div
                    className={`absolute inset-0 bg-[var(--${social.color}-dim)] opacity-0 pointer-events-none`}
                    whileHover={{ opacity: 0.26 }}
                    transition={{ duration: 0.12 }}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Right Content - Code Card */}
        <div className="flex-1 flex justify-end">
          <CodeCard />
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent ? 1 : 0 }}
        transition={{ delay: 1.5 }}
      >
        <span className="text-xs font-mono text-[var(--text3)]">scroll</span>
        <motion.div
          className="w-5 h-8 border border-[var(--blue)] rounded-full flex items-start justify-center p-1 relative overflow-hidden"
          animate={{ 
            y: [0, 5, 0],
            boxShadow: ["0 0 5px var(--blue-glow)", "0 0 15px var(--blue-glow)", "0 0 5px var(--blue-glow)"]
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <motion.div 
            className="w-1 h-2 bg-[var(--blue)] rounded-full"
            animate={{ y: [0, 8, 0], opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{ boxShadow: "0 0 8px var(--blue)" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
