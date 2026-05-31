"use client";

import { motion } from "framer-motion";
import { RevealWrapper } from "./RevealWrapper";

export function About() {
  return (
    <section id="about" className="py-16 px-6 md:px-10 lg:px-14 bg-[var(--bg)]">
      <RevealWrapper>
        <div className="max-w-3xl">
          {/* Section Header */}
          <div className="section-header mb-8">
            <span className="section-number text-sm">01.</span>
            <h2 className="section-title text-xl">About Me</h2>
            <div className="section-line" />
          </div>

          {/* Terminal Window */}
          <div className="terminal-window mb-6">
            <div className="terminal-header">
              <div className="terminal-dot red" />
              <div className="terminal-dot yellow" />
              <div className="terminal-dot green" />
              <span className="terminal-title">~/sarib</span>
            </div>
            <div className="terminal-body space-y-3 text-xs">
              {/* whoami command */}
              <div className="flex items-center gap-2">
                <span className="text-[var(--green)]">sarib@dev</span>
                <span className="text-[var(--text3)]">in</span>
                <span className="text-[var(--blue)]">~</span>
                <span className="text-[var(--amber)]">$</span>
                <span className="text-[var(--text)]">whoami</span>
              </div>
              <div className="terminal-output pl-4 flex items-center gap-2">
                <span className="text-[var(--cyan)]">sarib_hanif</span>
                <span className="text-[var(--text3)]">//</span>
                <span className="text-[var(--text2)]">Full Stack Developer</span>
              </div>

              {/* cat interests.txt */}
              <div className="flex items-center gap-2 mt-3">
                <span className="text-[var(--green)]">sarib@dev</span>
                <span className="text-[var(--text3)]">in</span>
                <span className="text-[var(--blue)]">~</span>
                <span className="text-[var(--amber)]">$</span>
                <span className="text-[var(--text)]">cat</span>
                <span className="text-[var(--green)]">interests.txt</span>
              </div>
              <div className="terminal-output pl-4">
                <span className="text-[var(--purple)]">[</span>
                <span className="text-[var(--green)]">&quot;Design/Architecture&quot;</span>
                <span className="text-[var(--text3)]">, </span>
                <span className="text-[var(--green)]">&quot;late nights&quot;</span>
                <span className="text-[var(--text3)]">, </span>
                <span className="text-[var(--green)]">&quot;clean code&quot;</span>
                <span className="text-[var(--text3)]">, </span>
                <span className="text-[var(--green)]">&quot;Gym&quot;</span>
                <span className="text-[var(--purple)]">]</span>
              </div>

              {/* echo current role */}
              <div className="flex items-center gap-2 mt-3">
                <span className="text-[var(--green)]">sarib@dev</span>
                <span className="text-[var(--text3)]">in</span>
                <span className="text-[var(--blue)]">~</span>
                <span className="text-[var(--amber)]">$</span>
                <span className="text-[var(--text)]">echo</span>
                <span className="text-[var(--amber)]">$CURRENT_ROLE</span>
              </div>
              <div className="terminal-output pl-4">
                <span className="text-[var(--cyan)]">Full Stack Developer</span>
                <span className="text-[var(--text3)]"> @ </span>
                <span className="text-[var(--amber)]">CYMAX TECH</span>
              </div>

              {/* Blinking cursor */}
              <div className="flex items-center gap-2 mt-3">
                <span className="text-[var(--green)]">sarib@dev</span>
                <span className="text-[var(--text3)]">in</span>
                <span className="text-[var(--blue)]">~</span>
                <span className="text-[var(--amber)]">$</span>
                <span className="w-2 h-5 bg-[var(--cyan)] cursor-blink" />
              </div>
            </div>
          </div>

          {/* About Paragraphs with Highlighted Text */}
          <div className="space-y-4 text-[var(--text2)] leading-relaxed text-sm">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              I didn't stumble into full stack — I grew into it deliberately. I started on the frontend, got curious about what was happening on the other side of the network, and never stopped digging. I wanted to own the whole feature, not just the visible half of it.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Today, I work as a Full Stack Developer at{" "}
              <a href="#" className="text-highlight hover:text-[var(--cyan)] transition-colors">
                CYMAX TECH <span className="inline-block ml-1">&#8599;</span>
              </a>
              , where I build across the entire stack —{" "}
              <span className="text-highlight">React</span> on the client,{" "}
              <span className="text-highlight">Node / FastAPI</span> on the server, and{" "}
              <span className="text-highlight">PostgreSQL</span> underneath. I care about the seam between layers just as much as the layers themselves.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Outside of work, I keep building. My most meaningful project is a{" "}
              <span className="text-highlight">real-time sign language detection system</span>{" "}
              — built with <span className="text-highlight">MediaPipe</span> for hand landmark extraction,{" "}
              <span className="text-highlight">TensorFlow</span> for gesture classification, and a{" "}
              <span className="text-highlight">FastAPI</span> backend serving predictions to a live{" "}
              <span className="text-highlight">React</span> frontend over WebSockets. I run it on{" "}
              <span className="text-highlight">Linux</span> because I like knowing exactly what my machine is doing. Clean tools, clean models, V60 in hand.
            </motion.p>
          </div>
        </div>
      </RevealWrapper>
    </section>
  );
}
